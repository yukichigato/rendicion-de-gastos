import React from "react";

const SubmitButton = ({ innerText }: { innerText: string }) => {
  return (
    <button
      type="submit"
      className="group relative overflow-hidden rounded-lg border-[.0625rem] border-red-500 p-4 text-white transition-all duration-300"
    >
      <span className="absolute inset-0 border-[.0625rem] border-red-500 bg-gradient-to-r from-red-500 to-rose-500 transition-opacity duration-500 group-hover:opacity-0"></span>
      <span className="relative z-10 font-bold transition-all duration-500 group-hover:text-red-500">
        {innerText}
      </span>
    </button>
  );
};

export default SubmitButton;
