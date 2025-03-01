import { NEXT_PUBLIC_DB_API_BASEURL } from "@/config";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import type { ExpenseReport } from "@/types";

type UncompleteExpenseReport = Omit<ExpenseReport, "name" | "created_At">;

export const getProfileSubmissions = async (headersList: ReadonlyHeaders) => {
  // * Getting "x-user-data" header for fetched user data.
  // * No edge case where header doesn't exist.
  const userData = JSON.parse(headersList.get("x-user-data") as string);

  // * Make a request to the Database API to fetch previous user expense
  // * report submissions
  const params = new URLSearchParams({
    author_id: userData.id,
    limit: "10",
  });

  const dbResponse = await fetch(
    `${NEXT_PUBLIC_DB_API_BASEURL}/api/expense_report?${params.toString()}`,
    { method: "GET" },
  );

  // * In case something goes wrong, return an empty list.
  // * If not, complete the data with the name and slice the timestamp.
  if (!dbResponse.ok) {
    // TODO : Handle this properly.
    return [];
  }

  const submissionList: UncompleteExpenseReport[] = await dbResponse.json();

  const userSubmissions: ExpenseReport[] = submissionList.map((submission) => ({
    ...submission,
    created_at: submission.created_at.slice(0, 10),
    name: userData.name,
  })) as ExpenseReport[];

  return userSubmissions;
};
