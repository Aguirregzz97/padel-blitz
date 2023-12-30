import { connectionString } from "@/db/config";
import {
  category_tournaments,
  category_types,
  cities,
  teams,
  tournaments,
} from "@/db/schema";
import { and, between, eq, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

export default async function getMyTournaments(userId: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db
    .select({
      id: tournaments.id,
      category_name: category_types.category_name,
      name: tournaments.name,
      address: tournaments.address,
      banner_url: tournaments.banner_url,
      registration_start_at: tournaments.registration_start_at,
      registration_end_at: tournaments.registration_end_at,
      tournament_start_at: tournaments.tournament_start_at,
      tournament_end_at: tournaments.tournament_end_at,
      created_at: tournaments.created_at,
      updated_at: tournaments.updated_at,
      city_name: cities.name,
    })
    .from(tournaments)
    .innerJoin(cities, eq(cities.id, tournaments.city_id))
    .innerJoin(
      category_tournaments,
      eq(tournaments.id, category_tournaments.tournament_id),
    )
    .innerJoin(
      category_types,
      eq(category_types.id, category_tournaments.category_type_id),
    )
    .innerJoin(teams, eq(category_tournaments.id, teams.category_tournament_id))
    .where(
      and(
        or(
          between(
            sql`CURRENT_DATE`,
            tournaments.registration_start_at,
            tournaments.registration_end_at,
          ),
          between(
            sql`CURRENT_DATE`,
            tournaments.tournament_start_at,
            tournaments.tournament_end_at,
          ),
        ),
        or(eq(teams.user_id_1, userId), eq(teams.user_id_2, userId)),
      ),
    )
    .limit(50);
}

export type GetMyTournamentsType = Awaited<ReturnType<typeof getMyTournaments>>;
