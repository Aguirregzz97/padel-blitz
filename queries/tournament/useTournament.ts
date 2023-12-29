"use client";

import { getTournamentType } from "@/lib/tournament/getTournament";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryTournament(tournamentId: string) {
  const response = await axios.get<getTournamentType>(
    `/api/tournament/${tournamentId}`,
  );
  return response.data;
}

export default function useTournament(tournamentId: string) {
  return useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => queryTournament(tournamentId),
  });
}
