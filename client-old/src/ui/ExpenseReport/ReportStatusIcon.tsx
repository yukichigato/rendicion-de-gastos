import React from "react";
import { FaClock } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const ReportStatusIcon = ({ status }: { status: string }) => {
  if (status === "Pending") {
    return <FaClock />;
  } else if (status === "Accepted") {
    return <MdDone />;
  } else {
    return <IoMdClose />;
  }
};

export default ReportStatusIcon;
