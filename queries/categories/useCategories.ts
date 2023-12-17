import { GetCategoriesType } from "@/lib/categories/getCategories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryCategories() {
  const response = await axios.get<GetCategoriesType>("/api/categories");
  return response.data;
}

export default function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: queryCategories });
}
