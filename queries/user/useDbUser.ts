"use client";

import { GetUserType } from "@/lib/user/getUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryCurrentUser() {
  const response = await axios.get<GetUserType>(`/api/current_user`);
  return response.data;
}

export default function useDbUser() {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: () => queryCurrentUser(),
  });
}
