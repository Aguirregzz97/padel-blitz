import { connectionString } from "@/db/config";
import { tournaments, teams } from "@/db/schema";
import { and, between, ne, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

export default async function exploreTournaments() {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db.query.tournaments.findMany({
    with: {
      city: true,
      categories: {
        with: {
          category: true,
          teams: true,
        },
        orderBy: (category_types, { asc }) => [
          asc(category_types.category_type_id),
        ],
      },
    },
    where: and(
      between(
        sql`CURRENT_DATE`,
        tournaments.registration_start_at,
        tournaments.registration_end_at,
      ),
    ),
    limit: 50,
  });
}

export type GetExploreTournamentsType = Awaited<
  ReturnType<typeof exploreTournaments>
>;
