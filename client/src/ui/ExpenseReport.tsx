import React from "react";

const ExpenseReport = ({ data }: { data: ExpenseReportData }) => {
  const color = data.status === "Accepted" ? "lime-500" : "red-700";

  if (data.status === "Pending") {
    return (
      <article className="flex flex-col border-[.0625rem] border-gray-300 pb-4">
        <p className="relative mb-2 bg-gray-900 pl-4 text-lg text-white before:absolute before:left-0 before:z-30 before:h-full before:w-[1%] before:bg-yellow-400">
          <strong>Status:</strong> {data.status}
        </p>

        <div className="ml-4 mr-4 flex justify-between">
          <p>
            <strong>Author:</strong>{" "}
            <span className="text-gray-6">{data.author}</span>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <span className="text-gray-6">{data.date}</span>
          </p>
          <p>
            <strong>Type:</strong>{" "}
            <span className="text-gray-6">{data.type}</span>
          </p>
          <p>
            <strong>Amount:</strong>{" "}
            <span className="text-gray-6">{data.amount}</span> CLP
          </p>
        </div>

        <button className="ml-4 mt-6 self-start">
          <a
            href={data.backupURL}
            className="rounded-lg border-[.0626rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:border-gray-900 hover:bg-white hover:text-gray-900"
          >
            Download
          </a>
        </button>
      </article>
    );
  } else {
    return (
      <article className="flex flex-col border-[.0625rem] border-gray-300 pb-4 opacity-70">
        <p
          className={`relative mb-2 bg-gray-900 pl-4 text-lg text-white before:absolute before:left-0 before:z-30 before:h-full before:w-[1%] before:bg-${color}`}
        >
          <strong>Status:</strong> {data.status}
        </p>

        <div className="ml-4 mr-4 flex justify-between">
          <p>
            <strong>Author:</strong>{" "}
            <span className="text-gray-6">{data.author}</span>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <span className="text-gray-6">{data.date}</span>
          </p>
          <p>
            <strong>Type:</strong>{" "}
            <span className="text-gray-6">{data.type}</span>
          </p>
          <p>
            <strong>Amount:</strong>{" "}
            <span className="text-gray-6">{data.amount}</span> CLP
          </p>
        </div>

        <button className="ml-4 mt-6 self-start">
          <a
            href={data.backupURL}
            className="rounded-lg border-[.0626rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:border-gray-900 hover:bg-white hover:text-gray-900"
          >
            Download
          </a>
        </button>
      </article>
    );
  }
};

export default ExpenseReport;
