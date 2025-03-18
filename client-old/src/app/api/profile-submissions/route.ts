import { NEXT_PUBLIC_DB_API_BASEURL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headersList = req.headers;
  const userData = JSON.parse(headersList.get("x-user-data") as string);

  const params = new URLSearchParams({
    author_id: userData.id,
    limit: "10",
  });

  const dbResponse = await fetch(
    `${NEXT_PUBLIC_DB_API_BASEURL}/api/expense_report?${params.toString()}`,
    { method: "GET" },
  );

  if (!dbResponse.ok) {
    return NextResponse.json([], { status: 500 });
  }

  const submissionList = await dbResponse.json();

  const userSubmissions = submissionList.map((submission: any) => ({
    ...submission,
    created_at: submission.created_at.slice(0, 10),
  }));

  return NextResponse.json(userSubmissions);
}
