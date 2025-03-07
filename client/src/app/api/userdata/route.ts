import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userDataHeader = req.headers.get("x-user-data");

  if (!userDataHeader) {
    return NextResponse.json({ error: "Header not found" }, { status: 400 });
  }

  try {
    const userData = JSON.parse(userDataHeader);
    return NextResponse.json({ userData });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in header" },
      { status: 400 },
    );
  }
}
