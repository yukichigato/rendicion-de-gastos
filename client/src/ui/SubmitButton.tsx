import React from "react";

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="transition-[background-color, scale] rounded-lg border-[.0625rem] border-gray-900 bg-gray-900 p-4 text-white duration-200 hover:scale-[1.005] hover:rounded-lg hover:bg-white hover:text-gray-900"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
