"use client";

import LoginForm from "@/ui/Forms/LoginForm";
import React from "react";
import { handleLogIn } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

/*
 * @todo: Enable protected route
 */
const Page = () => {
  const router = useRouter();

  const action = (formData: FormData) => {
    handleLogIn(formData);
    router.push("/profile-submissions");
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="rounded-xl border-[.0625rem] border-gray-300 bg-white p-20 shadow-xl">
        <LoginForm formAction={action} />
      </div>
    </main>
  );
};

export default Page;
