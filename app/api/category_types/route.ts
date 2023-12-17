import getCategoryTypes from "@/lib/category_type/getCategoryTypes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await getCategoryTypes();
  return NextResponse.json(categories);
}
