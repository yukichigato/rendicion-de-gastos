import React from "react";
import DashboardFiltersForm from "@/ui/Forms/DashboardFiltersForm";
import ExpenseReport from "@/ui/ExpenseReport/ExpenseReport";
import { expenseReportOptions } from "@/ui/ExpenseReport/utils";

const page = () => {
  const expenseReportData: ExpenseReportData[] = [
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Pending" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Pending" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Closed" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Accepted" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
    {
      author: "Alice Johnson",
      date: "2024-02-10" as DateType,
      type: "Otros" as ExpenseType,
      amount: "450.990",
      status: "Closed" as ExpenseReportStatus,
      backupURL: "https://i.ytimg.com/vi/jAmz1gEAJVY/maxresdefault.jpg",
    },
  ];
  /*
   *  @todo : Remove static data above.
   */

  return (
    <div className="flex h-[calc(100vh-2.25rem)]">
      <aside className="border-r-[.0625rem] border-gray-300 p-8">
        <DashboardFiltersForm />
      </aside>

      <main className="flex w-full flex-col gap-1 p-8">
        <h1 className="mb-10 text-4xl font-semibold text-red-500">
          Submissions list
        </h1>

        <p className="mb-10">
          Explore and accept/close submissions made to the system.
        </p>

        {expenseReportData.map((report, index) => (
          <ExpenseReport
            data={report}
            options={expenseReportOptions(report.status)}
            location="Dashboard"
            key={index}
          />
        ))}
      </main>
    </div>
  );
};

export default page;
