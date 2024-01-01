import exploreTournaments from "@/lib/tournament/exploreTournaments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tournaments = await exploreTournaments();
  return NextResponse.json(tournaments);
}
