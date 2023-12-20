import getCities from "@/lib/cities/getCities";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cities = await getCities();
  return NextResponse.json(cities);
}
