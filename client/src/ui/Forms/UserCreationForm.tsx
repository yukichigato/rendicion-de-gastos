"use client";
import React, { useId, useRef } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";

const UserCreationForm = ({
  formAction,
}: {
  formAction: FormActionFunction;
}) => {
  const nameInputID = useId();
  const rutInputID = useId();
  const passwordInputID = useId();
  const telInputID = useId();
  const emailInputID = useId();
  const areaInputID = useId();
  const statusInputID = useId();

  return (
    <form action={formAction} className="flex flex-col">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold text-red-500">
        Employee user account creation form
      </h1>

      <p className="mb-10">
        Please fill out all the required fields marked with{" "}
        <span className="text-red-500">*</span>{" "}
      </p>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={nameInputID}
          inputType="text"
          inputName="name"
          labelText="Name"
          placeholder="Full Name"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={rutInputID}
          inputType="text"
          inputName="rut"
          labelText="RUT"
          placeholder="12.345.678-9"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={passwordInputID}
          inputType="password"
          inputName="password"
          labelText="Password"
          placeholder="Input password here"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={telInputID}
          inputType="tel"
          inputName="tel"
          labelText="Telephone Number"
          placeholder="+56 9 1234 5678"
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={emailInputID}
          inputType="email"
          inputName="email"
          labelText="Email"
          placeholder="email@provider.com"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={areaInputID}
          selectName="area"
          labelText="Asigned Area"
          options={["Otros"]}
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={statusInputID}
          selectName="status"
          labelText="Current employee status"
          options={["Trabajador"]}
          required
        />
      </div>

      <div className="mt-4 flex flex-col">
        <SubmitButton innerText="Submit" />
      </div>
    </form>
  );
};

export default UserCreationForm;
