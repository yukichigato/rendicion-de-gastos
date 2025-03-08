"use client";

import { useId, useTransition } from "react";
import Cookies from "js-cookie";
// import { NEXT_PUBLIC_AUTH_API_BASEURL } from "@/config";
import InputField from "@/ui/InputField";
import SubmitButton from "@/ui/SubmitButton";
import { useRouter } from "next/navigation";
import { login } from "./actions";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const emailInputID = useId();
  const passwordInputID = useId();

  const handleLogin = async (formData: FormData) => {
    const token = await login(formData);

    startTransition(() => {
      Cookies.set(`auth_cookie`, token, { expires: 7 });
      router.push("/profile-submissions");
    });
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <div className="relative h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-rose-500"></div>
      </div>
    );

  return (
    <form action={handleLogin} className="flex flex-col">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold text-rose-500">
        Good to see you again
      </h1>

      <p className="mb-10 self-center">
        Please fill out the fields with your log-in credentials.
      </p>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={emailInputID}
          inputType="email"
          inputName="email"
          labelText="Email"
          placeholder="Your work email"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={passwordInputID}
          inputType="password"
          inputName="password"
          labelText="Password"
          placeholder="Your password"
          required
        />
      </div>

      <div className="mt-4 flex flex-col">
        <SubmitButton innerText="Log-In" />
      </div>
    </form>
  );
};

export default LoginForm;
