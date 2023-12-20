import getMyAdminTournaments from "@/lib/admin_tournament/getMyAdminTournaments";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const adminTournaments = await getMyAdminTournaments(userId || "");
  return NextResponse.json(adminTournaments);
}
