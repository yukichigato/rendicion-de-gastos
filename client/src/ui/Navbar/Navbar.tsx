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
      <summary className="fixed left-0 top-0 z-[990] h-16 w-full bg-white text-6xl text-red-500 shadow-md hover:cursor-pointer">
        <MdMenu />
      </summary>
      <ul className="fixed left-0 top-16 z-10 flex list-none flex-col">
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-white bg-red-500 p-2 text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Profile
          </li>
        </Link>
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-white bg-red-500 p-2 text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Your submissions
          </li>
        </Link>

        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-white bg-red-500 p-2 text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Dashboard
          </li>
        </Link>
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-l-[.0625rem] border-r-[.0625rem] border-t-[.0625rem] border-white bg-red-500 p-2 text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Log-out
          </li>
        </Link>
      </ul>
    </details>
  );
};

export default Navbar;
