import getMyTournaments from "@/lib/tournament/getMyTournaments";
import getTournament from "@/lib/tournament/getTournament";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { userId } = getAuth(request);
  const tournaments = await getMyTournaments(userId || "");
  return NextResponse.json(tournaments);
}
