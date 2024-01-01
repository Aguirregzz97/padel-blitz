import getPartners from "@/lib/user/getPartners";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const { searchValue } = params;
  const { userId } = getAuth(request);
  const partners = await getPartners(searchValue, userId || "");
  return NextResponse.json(partners);
}
