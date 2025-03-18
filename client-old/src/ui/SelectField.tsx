import React, { HTMLElementType } from "react";

const SelectField = ({
  selectID,
  selectName,
  labelText,
  options = [],
  required = false,
  refHook = undefined,
}: {
  selectID: string;
  selectName: string;
  labelText: string;
  options: string[];
  required?: boolean;
  refHook?: any;
}) => {
  return (
    <>
      <label htmlFor={selectID} className="mb-2 ml-[.5rem]">
        {labelText}
        {required ? <span className="text-red-500"> *</span> : ""}
      </label>
      <select
        name={selectName}
        id={selectID}
        required={required}
        className="rounded-md border-[.0625rem] border-gray-300 bg-white p-2 hover:cursor-pointer hover:border-gray-400"
        ref={refHook}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;
