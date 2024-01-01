import { connectionString } from "@/db/config";
import { teams } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function registerTeam(
  playerId1: string,
  playerId2: string,
  categoryTournamentId: number,
) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  const teamCreated = await db
    .insert(teams)
    .values({
      user_id_1: playerId1,
      user_id_2: playerId2,
      category_tournament_id: categoryTournamentId,
    })
    .returning();

  return teamCreated;
}

export type registerTeamType = Awaited<ReturnType<typeof registerTeam>>;
