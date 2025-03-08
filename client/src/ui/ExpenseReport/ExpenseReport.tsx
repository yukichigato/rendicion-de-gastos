"use client";

import React, { useRef, useState } from "react";
import { RiFileDownloadFill } from "react-icons/ri";
import DataText from "@/ui/ExpenseReport/DataText";
import ExpenseReportHeader from "@/ui/ExpenseReport/ExpenseReportHeader";
import AcceptCloseButtons from "@/ui/ExpenseReport/AcceptCloseButtons";
import { ExpenseReportOptions } from "@/ui/ExpenseReport/utils";
import ReportStatusIcon from "@/ui/ExpenseReport/ReportStatusIcon";
import { NEXT_PUBLIC_DB_API_BASEURL } from "@/config";
import { ExpenseReport as ExpenseReportType } from "@/types";

const ExpenseReport = ({
  data,
  options,
  location = "",
}: {
  data: ExpenseReportType;
  options: ExpenseReportOptions;
  location?: string;
}) => {
  const [rotation, setRotation] = useState("rotate-0");
  const [hidden, setHidden] = useState("h-0");
  const [margin, setMargin] = useState("mt-0");
  const expenseReportRef = useRef<HTMLElement | null>(null);

  const toggleRotation = () => {
    setRotation((prev) => (prev === "rotate-0" ? "rotate-90" : "rotate-0"));
  };

  const toggleHidden = () => {
    setMargin(margin === "mt-0" ? "mt-6" : "mt-0");
    setHidden((prev) => (prev === "h-0" ? "h-auto" : "h-0"));
  };

  const toggleExpenseReport = () => {
    toggleRotation();
    toggleHidden();
  };

  const acceptReport = async () => {
    try {
      const articleElement = expenseReportRef.current as HTMLElement;
      const data = {
        status: "Approved",
      };

      await fetch(
        `${NEXT_PUBLIC_DB_API_BASEURL}/api/expense_report/${articleElement.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    } // TODO : Better error handling
  };

  const closeReport = async () => {
    try {
      const articleElement = expenseReportRef.current as HTMLElement;
      const data = {
        status: "Denied",
      };

      await fetch(
        `${NEXT_PUBLIC_DB_API_BASEURL}/api/expense_report/${articleElement.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    } // TODO : Better error handling
  };

  return (
    <article
      className={`flex flex-col border-[.0625rem] border-gray-300 pb-4 ${options.opacity} transition-all duration-100`}
      id={data.id}
      ref={expenseReportRef}
    >
      <header
        onClick={toggleExpenseReport}
        className={`relative mb-2 flex cursor-pointer items-center bg-gray-900 bg-gradient-to-r pl-4 text-lg text-white`}
      >
        <span className="mr-4">
          <ReportStatusIcon status={data.status} />
        </span>
        <ExpenseReportHeader dataStatus={data.status} rotation={rotation} />
      </header>

      <section className="ml-4 mr-4 flex justify-between">
        <DataText labelText="Author" dataText={data.name} />
        <DataText labelText="Date" dataText={data.created_at} />
        <DataText labelText="Type" dataText={data.type} />
        <DataText labelText="Amount" dataText={String(data.amount)} />
      </section>

      <section
        className={`transition-transition ${hidden} ${margin} ml-4 flex w-full items-center gap-4 self-start overflow-hidden duration-100`}
      >
        <a
          href={data.backup_url}
          className="cursor-pointer text-4xl"
          title="Download Backup File Of This Report"
          download
        >
          <RiFileDownloadFill />
        </a>
        <AcceptCloseButtons
          status={data.status}
          location={location}
          acceptFunction={acceptReport}
          closeFunction={closeReport}
        />
      </section>
    </article>
  );
};

export default ExpenseReport;
