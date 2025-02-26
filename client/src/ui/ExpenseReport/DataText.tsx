import React from "react";

const DataText = ({
  labelText,
  dataText,
}: {
  labelText: string;
  dataText: string;
}) => {
  return (
    <p>
      <strong>{labelText}:</strong>{" "}
      <span className="text-gray-6">{dataText}</span>
    </p>
  );
};

export default DataText;
