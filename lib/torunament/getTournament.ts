import { connectionString } from "@/db/config";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getTournament(tournamentId: number) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  const tournament = await db.query.tournaments.findFirst({
    where: eq(schema.tournaments.id, tournamentId),
    with: {
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
  });

  return tournament;
}

export type getTournamentType = Awaited<ReturnType<typeof getTournament>>;
