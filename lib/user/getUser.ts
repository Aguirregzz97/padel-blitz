import { connectionString } from "@/db/config";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function getUser(userId: string) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  return await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      team_player_1: {
        with: {
          player_1: true,
        },
      },
      team_player_2: {
        with: {
          player_2: true,
        },
      },
    },
  });
}

export type GetUserType = Awaited<ReturnType<typeof getUser>>;
