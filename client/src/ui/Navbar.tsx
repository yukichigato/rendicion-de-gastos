import React from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  return (
    <details>
      <summary className="fixed left-0 top-0 w-full border-b-[.0625rem] border-b-gray-300 bg-white text-4xl hover:cursor-pointer">
        <MdMenu />
      </summary>
      <ul className="fixed left-0 top-[2.25rem] z-10 flex list-none flex-col">
        <li className="boder-b-0 border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-gray-900">
          <Link href="">Profile</Link>
        </li>
        <li className="boder-b-0 border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-gray-900">
          <Link href="">Your submissions</Link>
        </li>
        <li className="boder-b-0 border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-gray-900">
          <Link href="">Dashboard</Link>
        </li>
        <li className="border-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-white hover:text-gray-900">
          <Link href="">Log-out</Link>
        </li>
      </ul>
    </details>
  );
};

export default Navbar;
