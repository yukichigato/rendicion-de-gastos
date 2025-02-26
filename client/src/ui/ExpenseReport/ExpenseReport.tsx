"use client";

import React, { useLayoutEffect, useState } from "react";
import { RiFileDownloadFill } from "react-icons/ri";
import DataText from "@/ui/ExpenseReport/DataText";
import ExpenseReportHeader from "@/ui/ExpenseReport/ExpenseReportHeader";
import AcceptCloseButtons from "@/ui/ExpenseReport/AcceptCloseButtons";

const ExpenseReport = ({ data }: { data: ExpenseReportData }) => {
  const [color, setColor] = useState("");
  const [opacity, setOpacity] = useState("");
  const [rotation, setRotation] = useState("rotate-0");
  const [hidden, setHidden] = useState("0");
  const [margin, setMargin] = useState("0");

  const toggleRotation = () => {
    setRotation((prev) => (prev === "rotate-0" ? "rotate-90" : "rotate-0"));
  };

  const toggleHidden = () => {
    setMargin(margin === "0" ? "6" : "0");
    setHidden((prev) => (prev === "0" ? "auto" : "0"));
    console.log(hidden, margin);
  };

  const toggleExpenseReport = () => {
    toggleRotation();
    toggleHidden();
  };

  useLayoutEffect(() => {
    switch (data.status) {
      case "Accepted":
        setColor("lime-500");
        setOpacity("opacity-70");
        break;
      case "Pending":
        setColor("yellow-500");
        // Unless I do this, the drop-down menu will render bellow "pending" yellow bars, no idea why.
        // This sucks.
        setOpacity("opacity-[99%]");
        break;
      case "Closed":
        setColor("red-500");
        setOpacity("opacity-70");
        break;
    }
  });

  return (
    <article
      className={`flex flex-col border-[.0625rem] border-gray-300 pb-4 ${opacity} transition-all duration-100`}
    >
      <header
        onClick={toggleExpenseReport}
        className={`relative mb-2 flex cursor-pointer bg-gray-900 pl-4 text-lg text-white before:absolute before:left-0 before:z-10 before:h-full before:w-[1%] before:bg-${color}`}
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
        className={`ml-4 mt-${margin} flex h-${hidden} transition-transition w-full items-center gap-4 self-start overflow-hidden duration-100`}
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
