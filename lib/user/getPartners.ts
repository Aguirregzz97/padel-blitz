import { connectionString } from "@/db/config";
import * as schema from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getPartners(searchValue: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db.query.users.findMany({
    where: sql.raw(
      `concat(lower(first_name), ' ', lower(last_name)) like '%${searchValue.toLowerCase()}%'`,
    ),
    limit: 15,
  });
}

export type GetSearchPartnersResultType = Awaited<
  ReturnType<typeof getPartners>
>;
