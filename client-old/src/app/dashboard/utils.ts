import { NEXT_PUBLIC_DB_API_BASEURL } from "@/config";
import type {
  ExpenseReport,
  SearchFilters,
  UncompleteExpenseReport,
} from "@/types";

export const getAllSubmissions = async (filters: Partial<SearchFilters>) => {
  // * Make a request to the Database API to fetch previous user expense
  // * report submissions
  const params = new URLSearchParams(filters);

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
  })) as ExpenseReport[];

  return userSubmissions;
};
