"use client";

import { GetMyAdminTournamentsType } from "@/lib/admin_tournament/getMyAdminTournaments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryMyAdminTournaments() {
  const response = await axios.get<GetMyAdminTournamentsType>(
    `/api/admin_tournament/my_admin_tournaments`,
  );
  return response.data;
}

export default function useMyAdminTournaments() {
  return useQuery({
    queryKey: ["admin_tournaments"],
    queryFn: () => queryMyAdminTournaments(),
  });
}
