import React from "react";

const SubmitButton = ({ innerText }: { innerText: string }) => {
  return (
    <button
      type="submit"
      className="transition-[background-color, scale] rounded-lg border-[.0625rem] border-gray-900 bg-gray-900 p-4 text-white duration-200 hover:scale-[1.005] hover:rounded-lg hover:bg-white hover:text-gray-900"
    >
      {innerText}
    </button>
  );
};

export default SubmitButton;
