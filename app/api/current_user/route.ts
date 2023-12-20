import getUser from "@/lib/user/getUser";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const user = await getUser(userId || "");
  return NextResponse.json(user);
}
