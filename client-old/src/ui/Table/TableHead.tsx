import React from "react";

const TableHead = ({ headContent }: { headContent: string[] }) => {
  return (
    <tr>
      {headContent.map((data, index) => (
        <th
          key={index}
          className="border-[.0625rem] border-gray-700 bg-gray-900 text-white"
        >
          {data}
        </th>
      ))}
    </tr>
  );
};

export default TableHead;
