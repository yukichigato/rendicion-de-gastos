import React, { MouseEventHandler } from "react";

const AcceptCloseButtons = ({
  status,
  location,
  acceptFunction,
  closeFunction,
}: {
  status: string;
  location: string;
  acceptFunction: MouseEventHandler<HTMLButtonElement>;
  closeFunction: MouseEventHandler<HTMLButtonElement>;
}) => {
  if (status === "Pending" && location === "Dashboard") {
    return (
      <>
        <button
          className="rounded-lg border-[.0626rem] border-lime-500 bg-white p-2 text-lime-500 transition-all duration-200 hover:border-gray-900 hover:bg-white hover:text-gray-900"
          onClick={acceptFunction}
        >
          Accept
        </button>
        <button
          className="bg-white-900 rounded-lg border-[.0626rem] border-red-400 p-2 text-red-400 transition-all duration-200 hover:border-gray-900 hover:bg-white hover:text-gray-900"
          onClick={closeFunction}
        >
          Close
        </button>
      </>
    );
  } else return <></>;
};

export default AcceptCloseButtons;
