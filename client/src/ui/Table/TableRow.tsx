import React from "react";

const TableRow = ({ rowContent }: { rowContent: string[] }) => {
  return (
    <tr>
      {rowContent.map((data, index) => (
        <td
          key={index}
          className="border-[.0625rem] border-gray-300 pb-1 pl-2 pr-2 pt-1"
        >
          {data}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
