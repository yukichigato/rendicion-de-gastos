"use client";

import React, { useLayoutEffect, useState } from "react";
import { RiFileDownloadFill } from "react-icons/ri";
import DataText from "@/ui/ExpenseReport/DataText";
import ExpenseReportHeader from "@/ui/ExpenseReport/ExpenseReportHeader";
import AcceptCloseButtons from "@/ui/ExpenseReport/AcceptCloseButtons";
import { ExpenseReportOptions } from "@/ui/ExpenseReport/utils";

const ExpenseReport = ({
  data,
  options,
}: {
  data: ExpenseReportData;
  options: ExpenseReportOptions;
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
    console.log(hidden, margin);
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
        className={`relative mb-2 flex cursor-pointer bg-gray-900 pl-4 text-lg text-white before:absolute before:left-0 before:h-full before:w-[1%] before:content-[''] ${options.bgcolor}`}
      >
        <ExpenseReportHeader dataStatus={data.status} rotation={rotation} />
      </header>

      <section className="ml-4 mr-4 flex justify-between">
        <DataText labelText="Author" dataText={data.author} />
        <DataText labelText="Date" dataText={data.date} />
        <DataText labelText="Type" dataText={data.type} />
        <DataText labelText="Amount" dataText={String(data.amount)} />
      </section>

      <section
        className={`transition-transition ${hidden} ${margin} ml-4 flex w-full items-center gap-4 self-start overflow-hidden duration-100`}
      >
        <a
          href="data.backupURL"
          className="cursor-pointer text-4xl"
          title="Download Backup File Of This Report"
          download=""
        >
          <RiFileDownloadFill />
        </a>
        <AcceptCloseButtons status={data.status} />
      </section>
    </article>
  );
};

export default ExpenseReport;
