import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import createTournament from "@/lib/torunament/createTournament";
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
