import React from "react";

const InputField = ({
  inputID,
  inputType = "text",
  inputName,
  labelText,
  placeholder = "",
  required = false,
  refHook = undefined,
}: {
  inputID: string;
  inputType?: string;
  inputName: string;
  labelText: string;
  placeholder?: string;
  required?: boolean;
  refHook?: React.Ref<HTMLInputElement> | undefined;
}) => {
  return (
    <>
      <label htmlFor={inputID} className="mb-2 ml-[.5rem]">
        {labelText}
        {required ? <span className="text-red-500"> *</span> : ""}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={inputID}
        placeholder={placeholder}
        className="rounded-md border-[.0625rem] border-gray-300 bg-white p-[.5rem] transition-[border] duration-100 hover:border-gray-500 focus:border-blue-500 focus:outline-none"
        required={required}
        ref={refHook}
      />
    </>
  );
};

export default InputField;
