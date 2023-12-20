import { GetCitiesType } from "@/lib/cities/getCities";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryCities() {
  const response = await axios.get<GetCitiesType>("/api/cities");
  return response.data;
}

export default function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: queryCities,
  });
}
