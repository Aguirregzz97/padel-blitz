import { connectionString } from "@/db/config";
import { tournaments, category_types } from "@/db/schema";
import { between, eq, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

export default async function exploreTournaments() {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db.query.tournaments.findMany({
    where: between(
      sql`CURRENT_DATE`,
      tournaments.registration_start_at,
      tournaments.registration_end_at,
    ),
    with: {
      city: true,
      categories: {
        with: {
          category: {
            columns: { category_name: true },
          },
        },
        orderBy: (category_types, { asc }) => [
          asc(category_types.category_type_id),
        ],
      },
    },
    limit: 50,
  });
}

export type GetExploreTournamentsType = Awaited<
  ReturnType<typeof exploreTournaments>
>;
