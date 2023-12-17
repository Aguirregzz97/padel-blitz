import { config } from "@/db/config";
import { categories } from "@/db/schema";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export default async function getCategories() {
  const conn = connect(config);
  const db = drizzle(conn);

  return await db.select().from(categories);
}

export type GetCategoriesType = Awaited<ReturnType<typeof getCategories>>;
