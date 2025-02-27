"use client";

import React, { useId, useRef } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";

const DashboardFiltersForm = () => {
  const authorFieldID = useId();
  const orderFieldID = useId();
  const minAmountFieldID = useId();
  const maxAmountFieldID = useId();
  const typeFieldID = useId();
  const authorFieldHook = useRef(null);
  const orderFieldHook = useRef(null);
  const minAmountFieldHook = useRef(null);
  const maxAmountFieldHook = useRef(null);
  const typeFieldHook = useRef(null);

  return (
    <form action="" className="flex flex-col">
      <h1 className="mb-10 justify-center self-center text-4xl font-semibold text-rose-500">
        Filter reports by
      </h1>

      <p className="mb-10">
        You can have more than one filter applied at a time.
      </p>

      <div className="mb-4 flex flex-col">
        <InputField
          inputID={authorFieldID}
          inputType="text"
          inputName="reportAuthor"
          labelText="Author name"
          placeholder="John Doe"
          refHook={authorFieldHook}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={orderFieldID}
          selectName="sortOrder"
          labelText="Order"
          options={["Newest", "Oldest"]}
          refHook={orderFieldHook}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <InputField
          inputID={minAmountFieldID}
          inputType="number"
          inputName="minAmounr"
          labelText="Minimum Amount"
          placeholder="0 CLP"
          refHook={minAmountFieldHook}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <InputField
          inputID={maxAmountFieldID}
          inputType="number"
          inputName="maxAmount"
          labelText="Maximum Amount"
          placeholder="1000000 CLP"
          refHook={maxAmountFieldHook}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={typeFieldID}
          selectName="type"
          labelText="Type"
          options={[
            "Otros",
            "Materiales",
            "Social",
            "Estadías",
            "Necesidades",
            "Alimentación",
          ]}
          refHook={typeFieldHook}
        />
      </div>

      <div className="mt-4 grid w-full grid-cols-2 gap-2">
        <SubmitButton innerText="Filter" />
        <button className="rounded-lg border-[.0625rem] border-red-500 p-4 text-red-500">
          Reset filters
        </button>
      </div>
    </form>
  );
};

export default DashboardFiltersForm;
