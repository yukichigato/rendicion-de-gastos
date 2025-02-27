import React from "react";

const FileField = ({
  inputID,
  inputName,
  labelText,
  required = false,
  multiple = false,
  refHook = undefined,
}: {
  inputID: string;
  inputName: string;
  labelText: string;
  required?: boolean;
  multiple?: boolean;
  refHook?: any;
}) => {
  return (
    <>
      <label htmlFor={inputID} className="mb-2 ml-[.5rem]">
        {labelText}
        {required ? <span className="text-red-500"> *</span> : ""}
      </label>
      <input
        name={inputName}
        id={inputID}
        type="file"
        className="rounded-lg border-[.0625rem] border-gray-300 file:mr-6 file:border-none file:border-red-500 file:bg-red-500 file:p-4 file:text-sm file:text-white hover:cursor-pointer file:hover:border-red-500 file:hover:bg-white file:hover:text-red-500 file:hover:transition-all file:hover:duration-150"
        required={required}
        multiple={multiple}
        ref={refHook}
      />
      <p className="ml-[.5rem] mt-1 text-sm text-gray-500">
        SVG, PNG, JPG or GIF (MAX. 1mb).
      </p>
    </>
  );
};

export default FileField;
