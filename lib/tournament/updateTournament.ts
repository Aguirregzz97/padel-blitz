import { editTournamentFormSchema } from "@/components/Tournaments/ViewEditTournamentForm";
import { connectionString } from "@/db/config";
import {
  category_tournaments,
  tournament_admins,
  tournaments,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import * as schema from "@/db/schema";

export default async function updateTournament(
  tournament: z.infer<typeof editTournamentFormSchema>,
  tournamentId: number,
  owner_id: string,
) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  const tournamentUpdated = await db
    .update(tournaments)
    .set({
      owner_id,
      city_id: Number(tournament.city_id),
      name: tournament.name,
      address: tournament.address,
      tournament_start_at: new Date(tournament.tournament_dates.from),
      tournament_end_at: new Date(tournament.tournament_dates.to),
      registration_start_at: new Date(tournament.registration_dates.from),
      registration_end_at: new Date(tournament.registration_dates.to),
      updated_at: new Date(),
    })
    .where(eq(tournaments.id, tournamentId))
    .returning();

  const oldTournamentCategories = await db.query.tournaments.findFirst({
    where: eq(tournaments.id, tournamentId),
    with: {
      categories: true,
    },
  });

  // check if there are any new categories
  tournament.categories.forEach(async (ct) => {
    const newlyAddedCategory = !oldTournamentCategories?.categories.find(
      (cat) => cat.category_type_id === Number(ct.value),
    );

    if (newlyAddedCategory) {
      await db.insert(category_tournaments).values({
        category_type_id: Number(ct.value),
        tournament_id: tournamentUpdated[0].id,
      });
    }
  });

  // check if there are any deleted categories
  oldTournamentCategories?.categories.forEach(async (ct) => {
    const deletedCategory = !tournament.categories.find(
      (cat) => cat.value === ct.category_type_id.toString(),
    );

    if (deletedCategory) {
      await db
        .delete(category_tournaments)
        .where(
          and(
            eq(category_tournaments.category_type_id, ct.category_type_id),
            eq(category_tournaments.tournament_id, ct.tournament_id),
          ),
        );
    }
  });

  return tournamentUpdated[0];
}

export type CreateTournamentType = Awaited<ReturnType<typeof updateTournament>>;
