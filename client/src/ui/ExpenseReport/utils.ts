export interface ExpenseReportOptions {
  opacity: string;
}

export const expenseReportOptions = (status: string): ExpenseReportOptions => {
  switch (status) {
    case "Accepted":
      return { opacity: "opacity-60" };
    case "Pending":
      return { opacity: "opacity-100" };
    case "Closed":
      return { opacity: "opacity-60" };
    default:
      return { opacity: "opacity-100" };
  }
};
