"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const headersList = req.headers;
  const userData = JSON.parse(headersList.get("x-user-data") as string);

  return NextResponse.json(userData);
}
