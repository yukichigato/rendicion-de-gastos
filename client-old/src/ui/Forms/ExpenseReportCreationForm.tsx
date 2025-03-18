"use client";

import React, { useId } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";
import FileField from "@/ui/FileField";
import { uploadReport } from "./actions";
import { mutate } from "swr";

const ExpenseReportCreationForm = () => {
  const typeInputID = useId();
  const amountInputID = useId();
  const fileInputID = useId();

  const handleSubmit = async (formData: FormData) => {
    await uploadReport(formData);
    mutate("/api/profile-submissions"); // Update the expense report list to show the newest report
  };

  return (
    <form action={handleSubmit} className="flex flex-col">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold text-red-500">
        Expense report submission form
      </h1>

      <p className="mb-10">
        <span className="text-red-500">* </span> Please fill out all the
        required fields.
        <br />
        <br />
        Also ensure to fill out the <strong>Details</strong> field if the
        expense type is selected as <strong>Other</strong>.
      </p>

      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={typeInputID}
          selectName="type"
          labelText="Expense type"
          options={[
            "Otros",
            "Materiales",
            "Social",
            "Estadías",
            "Necesidades",
            "Alimentación",
          ]}
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={amountInputID}
          inputType="number"
          inputName="amount"
          labelText="Expense amount"
          placeholder="ex. 400.990"
          required
        />
      </div>

      <div className="mb-4 flex flex-col">
        <FileField
          inputID={fileInputID}
          inputName="backup"
          labelText="Backup"
          required
        />
      </div>

      <div className="mt-4 flex flex-col">
        <SubmitButton innerText="Submit" />
      </div>
    </form>
  );
};

export default ExpenseReportCreationForm;
