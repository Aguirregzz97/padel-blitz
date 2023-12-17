import { GetCategoriesType } from "@/lib/category_type/getCategoryTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function queryCategoryTypes() {
  const response = await axios.get<GetCategoriesType>("/api/category_types");
  return response.data;
}

export default function useCategoryTypes() {
  return useQuery({
    queryKey: ["category_types"],
    queryFn: queryCategoryTypes,
  });
}
