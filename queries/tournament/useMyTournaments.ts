"use client";

import { GetMyTournamentsType } from "@/lib/tournament/getMyTournaments";
import { getTournamentType } from "@/lib/tournament/getTournament";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryMyTournaments() {
  const response = await axios.get<GetMyTournamentsType>(
    `/api/tournament/my_tournaments`,
  );
  return response.data;
}

export default function useMyTournaments() {
  return useQuery({
    queryKey: ["my_tournaments"],
    queryFn: () => queryMyTournaments(),
  });
}
