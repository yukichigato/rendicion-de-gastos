"use client";

import React from "react";
import ExpenseReport from "@/ui/ExpenseReport/ExpenseReport";
import ExpenseReportCreationForm from "@/ui/Forms/ExpenseReportCreationForm";
import { expenseReportOptions } from "@/ui/ExpenseReport/utils";
// import { headers } from "next/headers";
// import { getProfileSubmissions } from "./utils";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  // const userSubmissions = await getProfileSubmissions(await headers());
  const {
    data = [],
    error,
    isLoading,
  } = useSWR("/api/profile-submissions", fetcher);

  return (
    <div className="flex h-[calc(100vh-2.25rem)]">
      <aside className="border-r-[.0625rem] border-gray-300 p-8">
        <ExpenseReportCreationForm />
      </aside>

      <main className="flex w-full flex-col gap-1 p-8">
        <h1 className="mb-10 text-4xl font-semibold text-red-500">
          Your submissions
        </h1>

        <p className="mb-10">Here's the submissions you've made in the past.</p>

        {data.map((report, index) => (
          <ExpenseReport
            data={report}
            options={expenseReportOptions(report.status)}
            location="Profile_submissions"
            key={index}
          />
        ))}
      </main>
    </div>
  );
};

export default Page;
