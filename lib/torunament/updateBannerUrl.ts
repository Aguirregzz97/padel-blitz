import { connectionString } from "@/db/config";
import * as schema from "@/db/schema";
import { tournaments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function updateBannerUrl(
  bannerUrl: string,
  tournamentId: number,
) {
  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client, { schema });

  const tournament = await db
    .update(tournaments)
    .set({ banner_url: bannerUrl })
    .where(eq(tournaments.id, tournamentId))
    .returning();

  return tournament;
}

export type updateBannerUrlType = Awaited<ReturnType<typeof updateBannerUrl>>;
