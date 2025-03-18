import React from "react";
import DataText from "@/ui/ExpenseReport/DataText";

const ExpenseReportHeader = ({
  dataStatus,
  rotation,
}: {
  dataStatus: string;
  rotation: string;
}) => {
  return (
    <>
      <DataText labelText="Status" dataText={dataStatus} />
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className={`ml-4 w-4 fill-white ${rotation} transition-[transform] duration-75`}
      >
        <path d="m10 8-7 6V2l7 6z" />
      </svg>
    </>
  );
};

export default ExpenseReportHeader;
