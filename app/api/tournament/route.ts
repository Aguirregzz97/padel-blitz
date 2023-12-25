import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { editTournamentFormSchema } from "@/components/Tournaments/ViewEditTournamentForm";
import createTournament from "@/lib/torunament/createTournament";
import updateTournament from "@/lib/torunament/updateTournament";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) throw new Error("Authentication failed");

  const body = (await request.json()) as z.infer<
    typeof createTournamentFormSchema
  >;

  const createdTournament = await createTournament(body, userId);
  return NextResponse.json(createdTournament);
}

export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) throw new Error("Authentication failed");

  const body = (await request.json()) as z.infer<
    typeof editTournamentFormSchema
  > & { tournamentId: number };

  const updatedTournament = await updateTournament(
    body,
    body.tournamentId,
    userId,
  );
  return NextResponse.json(updatedTournament);
}
