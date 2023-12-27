import updateBannerUrl from "@/lib/torunament/updateBannerUrl";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) throw new Error("Authentication failed");

  const body = (await request.json()) as {
    bannerUrl: string;
    tournamentId: number;
  };

  const updatedTournament = await updateBannerUrl(
    body.bannerUrl,
    body.tournamentId,
  );
  return NextResponse.json(updatedTournament);
}
