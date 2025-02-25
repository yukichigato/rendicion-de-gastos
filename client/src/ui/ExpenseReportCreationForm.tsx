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

  //   CREATE TABLE IF NOT EXISTS expense_report (
  //     id UUID DEFAULT gen_random_uuid(),
  //     author_id UUID NOT NULL,
  //     title TEXT NOT NULL,
  //     details TEXT,
  //     "type" expense_type NOT NULL DEFAULT 'Otros',
  //     amount INTEGER NOT NULL CHECK (amount >= 0),
  //     backup_url TEXT NOT NULL,
  //     created_at TIMESTAMP DEFAULT NOW(),
  //     FOREIGN KEY (author_id) REFERENCES users(id)
  // );

  return (
    <form action="" className="flex flex-col p-8">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold">
        Expense report submission creation form
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
          options={["Otros"]}
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
        <SubmitButton />
      </div>
    </form>
  );
};

export default ExpenseReportCreationForm;
