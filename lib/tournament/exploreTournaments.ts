import { connectionString } from "@/db/config";
import { category_types, cities, tournaments } from "@/db/schema";
import { between, eq, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

export default async function exploreTournaments() {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db
    .select({
      id: tournaments.id,
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
    .where(
      between(
        sql`CURRENT_DATE`,
        tournaments.registration_start_at,
        tournaments.registration_end_at,
      ),
    )
    .limit(50);
}

export type GetExploreTournamentsType = Awaited<
  ReturnType<typeof exploreTournaments>
>;
