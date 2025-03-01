import React from "react";
import ExpenseReport from "@/ui/ExpenseReport/ExpenseReport";
import ExpenseReportCreationForm from "@/ui/Forms/ExpenseReportCreationForm";
import { expenseReportOptions } from "@/ui/ExpenseReport/utils";
import { headers } from "next/headers";
import { getProfileSubmissions } from "./utils";

const page = async () => {
  const userSubmissions = await getProfileSubmissions(await headers());

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

        {userSubmissions.map((submission, index) => (
          <ExpenseReport
            data={submission}
            options={expenseReportOptions(submission.status)}
            location="Profile_submissions"
            key={index}
          />
        ))}
      </main>
    </div>
  );
};

export default page;
