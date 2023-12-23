import { connectionString } from "@/db/config";
import { tournament_admins, tournaments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getMyAdminTournaments(userId: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return await db
    .select({
      id: tournaments.id,
      owner_id: tournaments.owner_id,
      owner_first_name: users.first_name,
      owner_last_name: users.last_name,
      city_id: tournaments.owner_id,
      name: tournaments.name,
      address: tournaments.address,
      banner_url: tournaments.banner_url,
      registration_start_at: tournaments.registration_start_at,
      registration_end_at: tournaments.registration_end_at,
      tournament_start_at: tournaments.tournament_start_at,
      tournament_end_at: tournaments.tournament_end_at,
      created_at: tournaments.created_at,
      updated_at: tournaments.updated_at,
    })
    .from(tournaments)
    .innerJoin(
      tournament_admins,
      eq(tournaments.id, tournament_admins.tournament_id),
    )
    .innerJoin(users, eq(users.id, tournaments.owner_id))
    .limit(50);
}

export type GetMyAdminTournamentsType = Awaited<
  ReturnType<typeof getMyAdminTournaments>
>;
