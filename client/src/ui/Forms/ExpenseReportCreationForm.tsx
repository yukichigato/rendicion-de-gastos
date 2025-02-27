"use client";
import React, { use, useId, useRef } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";
import TextareaField from "@/ui/TextareaField";
import FileField from "@/ui/FileField";

const ExpenseReportCreationForm = () => {
  const titleInputID = useId();
  const typeInputID = useId();
  const detailsInputID = useId();
  const amountInputID = useId();
  const fileInputID = useId();

  const titleInputRef = useRef(null);
  const typeInputRef = useRef(null);
  const detailsInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const fileInputRef = useRef(null);

  return (
    <form action="" className="flex flex-col">
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
          refHook={typeInputRef}
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
          refHook={amountInputRef}
        />
      </div>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={titleInputID}
          inputType="text"
          inputName="title"
          labelText="Title"
          placeholder="A descriptive title for your expense report"
          required
          refHook={titleInputRef}
        />
      </div>

      <div className="mb-4 flex flex-col">
        <TextareaField
          inputID={detailsInputID}
          rows={4}
          inputName="details"
          labelText="Details"
          placeholder="(Optional)"
          refHook={detailsInputRef}
        />
      </div>

      <div className="mb-4 flex flex-col">
        <FileField
          inputID={fileInputID}
          inputName="backup"
          labelText="Backup"
          required
          refHook={fileInputRef}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <SubmitButton innerText="Submit" />
      </div>
    </form>
  );
};

export default ExpenseReportCreationForm;
