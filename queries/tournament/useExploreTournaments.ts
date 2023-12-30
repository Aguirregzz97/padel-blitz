"use client";

import { GetExploreTournamentsType } from "@/lib/tournament/exploreTournaments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryExploreTournaments() {
  const response = await axios.get<GetExploreTournamentsType>(
    `/api/tournament/explore_tournaments`,
  );
  return response.data;
}

export default function useExploreTournaments() {
  return useQuery({
    queryKey: ["explore_tournaments"],
    queryFn: () => queryExploreTournaments(),
  });
}
