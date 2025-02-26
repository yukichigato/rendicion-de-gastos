"use client";
import React, { useId, useRef } from "react";
import InputField from "@/ui/InputField";
import SubmitButton from "@/ui/SubmitButton";

const LoginForm = () => {
  const emailInputID = useId();
  const passwordInputID = useId();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  return (
    <form action="" className="flex flex-col">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold">
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
          refHook={emailInputRef}
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
          refHook={passwordInputRef}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <SubmitButton innerText="Log-In" />
      </div>
    </form>
  );
};

export default LoginForm;
