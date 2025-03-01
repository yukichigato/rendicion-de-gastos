"use client";

import React, { useEffect, useState } from "react";
import DashboardFiltersForm from "@/ui/Forms/DashboardFiltersForm";
import ExpenseReport from "@/ui/ExpenseReport/ExpenseReport";
import { expenseReportOptions } from "@/ui/ExpenseReport/utils";
import type {
  ExpenseReport as ExpenseReportType,
  SearchFilters,
} from "@/types";
import { getAllSubmissions } from "./utils";

const page = () => {
  const [searchFilters, setSearchFilters] = useState<Partial<SearchFilters>>(
    {},
  );
  const [submissions, setSubmissions] = useState<ExpenseReportType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: ExpenseReportType[] = await getAllSubmissions(searchFilters);
      setSubmissions(data);
    };

    fetchData();
  }, [searchFilters]);

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

        {submissions.map((report, index) => (
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
