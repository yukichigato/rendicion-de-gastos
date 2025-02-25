import React from "react";
import TableHead from "@/ui/TableHead";
import TableRow from "@/ui/TableRow";

const Table = ({
  tableHeadContent,
  tableBodyContent,
}: {
  tableHeadContent: string[];
  tableBodyContent: string[][];
}) => {
  return (
    <table className="border-collapse">
      <thead>
        <TableHead headContent={tableHeadContent} />
      </thead>
      <tbody>
        {tableBodyContent.map((rowContent, index) => (
          <TableRow rowContent={rowContent} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
