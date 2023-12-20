import { connectionString } from "@/db/config";
import { tournaments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getMyAdminTournaments(userId: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return await db
    .select()
    .from(tournaments)
    .where(eq(tournaments.owner_id, userId))
    .limit(100);
}

export type GetMyAdminTournamentsType = Awaited<
  ReturnType<typeof getMyAdminTournaments>
>;
