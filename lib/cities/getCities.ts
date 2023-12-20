import { connectionString } from "@/db/config";
import { cities } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getCities() {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return await db.select().from(cities);
}

export type GetCitiesType = Awaited<ReturnType<typeof getCities>>;
