import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { connectionString } from "@/db/config";
import { tournaments } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

export default async function createTournament(
  tournament: z.infer<typeof createTournamentFormSchema>,
  owner_id: string,
) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return await db
    .insert(tournaments)
    .values({
      owner_id,
      city_id: Number(tournament.city_id),
      name: tournament.name,
      address: tournament.address,
      tournament_start_at: new Date(tournament.tournament_dates.from),
      tournament_end_at: new Date(tournament.tournament_dates.to),
      registration_start_at: new Date(tournament.registration_dates.from),
      registration_end_at: new Date(tournament.registration_dates.to),
    })
    .returning();
}

export type CreateTournamentType = Awaited<ReturnType<typeof createTournament>>;
