"use client";

import { NEXT_PUBLIC_AUTH_API_BASEURL } from "@/config";
import LoginForm from "@/ui/Forms/LoginForm";
import React from "react";
import Cookies from "js-cookie";

const Page = () => {
  const handleLogIn = async (formData: FormData) => {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_AUTH_API_BASEURL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const token = await response.json();

      Cookies.set(`auth_cookie`, token, { expires: 7 });
    } catch (error: any) {
      console.error(NEXT_PUBLIC_AUTH_API_BASEURL);
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="rounded-xl border-[.0625rem] border-gray-300 bg-white p-20 shadow-xl">
        <LoginForm formAction={handleLogIn} />
      </div>
    </main>
  );
};

export default Page;
