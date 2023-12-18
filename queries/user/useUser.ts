import { GetUserType } from "@/lib/user/getUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryUser(userId: string) {
  const response = await axios.get<GetUserType>("/api/user");
  return response.data;
}

export default function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => queryUser(userId),
  });
}
