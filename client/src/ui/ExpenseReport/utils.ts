export interface ExpenseReportOptions {
  bgcolor: string;
  opacity: string;
}

export const expenseReportOptions = (status: string): ExpenseReportOptions => {
  switch (status) {
    case "Accepted":
      return { bgcolor: "before:bg-lime-500", opacity: "opacity-70" };
    case "Pending":
      return { bgcolor: "before:bg-yellow-500", opacity: "opacity-100" };
    case "Closed":
      return { bgcolor: "before:bg-red-500", opacity: "opacity-70" };
    default:
      return { bgcolor: "before:bg-white", opacity: "opacity-100" };
  }
};
