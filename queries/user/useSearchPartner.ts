"use client";

import { GetSearchPartnersResultType } from "@/lib/user/getPartners";
import { GetUserType } from "@/lib/user/getUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function querySearchPartners(searchValue: string) {
  const response = await axios.get<GetSearchPartnersResultType>(
    `/api/search_partner/${searchValue}`,
  );
  return response.data;
}

export default function useSearchPartner(
  searchValue: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["search_partner", searchValue],
    enabled,
    queryFn: () => querySearchPartners(searchValue),
  });
}
