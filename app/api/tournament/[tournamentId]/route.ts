import getTournament from "@/lib/torunament/getTournament";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const { tournamentId } = params;
  const tournament = await getTournament(tournamentId);
  return NextResponse.json(tournament);
}
