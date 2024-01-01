import getPartners from "@/lib/user/getPartners";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { searchValue } = params;
  const partners = await getPartners(searchValue);
  return NextResponse.json(partners);
}
