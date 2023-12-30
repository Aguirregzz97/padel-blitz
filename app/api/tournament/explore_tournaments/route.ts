import exploreTournaments from "@/lib/tournament/exploreTournaments";
import getMyTournaments from "@/lib/tournament/getMyTournaments";
import getTournament from "@/lib/tournament/getTournament";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tournaments = await exploreTournaments();
  return NextResponse.json(tournaments);
}
