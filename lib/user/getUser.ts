import { connectionString } from "@/db/config";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getUser(userId: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return (await db.select().from(users).where(eq(users.id, userId))).at(0);
}

export type GetUserType = Awaited<ReturnType<typeof getUser>>;
