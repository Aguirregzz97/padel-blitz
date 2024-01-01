import registerTeam from "@/lib/teams/registerTeam";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    playerId1: string;
    playerId2: string;
    categoryTournamentId: number;
  };

  const createdTeam = await registerTeam(
    body.playerId1,
    body.playerId2,
    body.categoryTournamentId,
  );
  return NextResponse.json(createdTeam);
}
