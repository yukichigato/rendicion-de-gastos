"use client";

import React, { useLayoutEffect, useState } from "react";
import { RiFileDownloadFill } from "react-icons/ri";
import DataText from "@/ui/ExpenseReport/DataText";
import ExpenseReportHeader from "@/ui/ExpenseReport/ExpenseReportHeader";
import AcceptCloseButtons from "@/ui/ExpenseReport/AcceptCloseButtons";
import { ExpenseReportOptions } from "@/ui/ExpenseReport/utils";
import ReportStatusIcon from "@/ui/ExpenseReport/ReportStatusIcon";

const ExpenseReport = ({
  data,
  options,
  location = "",
}: {
  data: any; // TODO : Proper TS typing
  options: ExpenseReportOptions;
  location?: string;
}) => {
  const [rotation, setRotation] = useState("rotate-0");
  const [hidden, setHidden] = useState("h-0");
  const [margin, setMargin] = useState("mt-0");

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

  return (
    <article
      className={`flex flex-col border-[.0625rem] border-gray-300 pb-4 ${options.opacity} transition-all duration-100`}
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
        <AcceptCloseButtons status={data.status} location={location} />
      </section>
    </article>
  );
};

export default ExpenseReport;
