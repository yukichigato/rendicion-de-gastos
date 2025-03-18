import LoginForm from "@/ui/Forms/LoginForm";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="rounded-xl border-[.0625rem] border-gray-300 bg-white p-20 shadow-xl">
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
