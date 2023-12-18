import { connectionString } from "@/db/config";
import { category_types } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getCategoryTypes() {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  return await db.select().from(category_types);
}

export type GetCategoriesType = Awaited<ReturnType<typeof getCategoryTypes>>;
