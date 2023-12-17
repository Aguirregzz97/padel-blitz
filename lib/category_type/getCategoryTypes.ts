import { config } from "@/db/config";
import { category_types } from "@/db/schema";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export default async function getCategoryTypes() {
  const conn = connect(config);
  const db = drizzle(conn);

  return await db.select().from(category_types);
}

export type GetCategoriesType = Awaited<ReturnType<typeof getCategoryTypes>>;
