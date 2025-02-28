"use client";

import { useId } from "react";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_AUTH_API_BASEURL } from "@/config";
import InputField from "@/ui/InputField";
import SubmitButton from "@/ui/SubmitButton";

const LoginForm = ({ redirectFunction }: { redirectFunction: Function }) => {
  const emailInputID = useId();
  const passwordInputID = useId();

  const handleLogin = async (formData: FormData) => {
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

      redirectFunction();
      /*
       *  @todo : Use of React.useTransition()
       */
    } catch (error: any) {
      console.error(error.message);
      /*
       *  @todo : Better error handling
       */
    }
  };

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
