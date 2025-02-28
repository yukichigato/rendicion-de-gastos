"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const navbarRef = useRef<HTMLDetailsElement>(null);
  const [rotation, setRotation] = useState("rotate-0");

  const toggleRotation = () => {
    setRotation((prev) => (prev === "rotate-0" ? "rotate-90" : "rotate-0"));
  };

  const closeMenu = () => {
    if (navbarRef.current) {
      navbarRef.current.removeAttribute("open");
    }
  };

  return (
    <details ref={navbarRef}>
      <summary
        className="fixed left-0 top-0 z-[990] flex h-16 w-full bg-white shadow-md hover:cursor-pointer"
        onClick={toggleRotation}
      >
        <div className="h-full w-fit text-6xl text-red-500">
          <MdMenu />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className={`ml-4 w-6 fill-red-500 ${rotation} transition-[transform] duration-75`}
        >
          <path d="m10 8-7 6V2l7 6z" />
        </svg>
        <p className="ml-8 flex items-center text-xl text-red-500">
          Hello, user
        </p>
      </summary>
      <ul className="fixed left-0 top-16 z-10 flex list-none flex-col shadow-md">
        <Link href="" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-b-[.0625rem] border-white bg-red-500 p-2 text-xl text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Profile
          </li>
        </Link>
        <Link
          href="profile-submissions"
          onClick={closeMenu}
          className="hover:cursor-pointer"
        >
          <li className="boder-b-0 items-center border-b-[.0625rem] border-white bg-red-500 p-2 text-xl text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Your submissions
          </li>
        </Link>

        <Link
          href="dashboard"
          onClick={closeMenu}
          className="hover:cursor-pointer"
        >
          <li className="boder-b-0 items-center border-b-[.0625rem] border-white bg-red-500 p-2 text-xl text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Dashboard
          </li>
        </Link>
        <Link href="login" onClick={closeMenu} className="hover:cursor-pointer">
          <li className="boder-b-0 items-center border-b-[.0625rem] border-white bg-red-500 p-2 text-xl text-white transition-all duration-200 hover:bg-white hover:text-red-500">
            Log-out
            {/*
             *  @todo : Adding function that clears the "auth_cookie" cookie.
             */}
          </li>
        </Link>
      </ul>
    </details>
  );
};

export default Navbar;
