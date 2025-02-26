"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const navbarRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    if (navbarRef.current) {
      navbarRef.current.removeAttribute("open");
    }
  };

  return (
    <details ref={navbarRef}>
      <summary className="fixed left-0 top-0 z-[990] w-full border-b-[.0625rem] border-b-gray-300 bg-white text-4xl hover:cursor-pointer">
        <MdMenu />
      </summary>
      <ul className="fixed left-0 top-[2.25rem] z-10 flex list-none flex-col">
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:bg-white hover:text-gray-900">
            Profile
          </li>
        </Link>
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:bg-white hover:text-gray-900">
            Your submissions
          </li>
        </Link>

        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:bg-white hover:text-gray-900">
            Dashboard
          </li>
        </Link>
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-gray-900 bg-gray-900 p-2 text-white transition-all duration-200 hover:bg-white hover:text-gray-900">
            Log-out
          </li>
        </Link>
      </ul>
    </details>
  );
};

export default Navbar;
