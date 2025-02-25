import React from "react";

const TextareaField = ({
  inputID,
  rows = 3,
  inputName,
  labelText,
  placeholder = "",
  required = false,
  refHook = undefined,
}: {
  inputID: string;
  rows?: number;
  inputName: string;
  labelText: string;
  placeholder?: string;
  required?: boolean;
  refHook?: any;
}) => {
  return (
    <>
      <label htmlFor={inputID} className="mb-2 ml-[.5rem]">
        {labelText}
        {required ? <span className="text-red-500"> *</span> : ""}
      </label>
      <textarea
        name={inputName}
        id={inputID}
        placeholder={placeholder}
        className="rounded-md border-[.0625rem] border-gray-300 bg-white p-[.5rem] transition-[border] duration-100 hover:border-gray-500 focus:border-blue-500 focus:outline-none"
        required={required}
        rows={rows}
        ref={refHook}
      />
    </>
  );
};

export default TextareaField;
