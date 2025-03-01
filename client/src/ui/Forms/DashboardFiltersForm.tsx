"use client";

import React, { useId, useRef } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";
import { SearchFilters } from "@/types";
import { getAllSubmissions } from "@/app/dashboard/utils";

const DashboardFiltersForm = ({
  setSearchFilters,
}: {
  setSearchFilters: Function;
}) => {
  const authorFieldID = useId();
  const orderFieldID = useId();
  const minAmountFieldID = useId();
  const maxAmountFieldID = useId();
  const typeFieldID = useId();

  const handleSubmit = async (formData: FormData) => {
    // * Converts the filtesr into an array (Object.entries) then
    // * reduces it with Array.filter(...), and finally turns it back
    // * into an Object with Object.fromEntries
    const filterData = Object.fromEntries(
      Object.entries({
        name: formData.get("name"),
        order: formData.get("order"),
        minAmount: formData.get("minAmount"),
        maxAmount: formData.get("maxAmount"),
        type: formData.get("type"),
      }).filter(([_, value]) => value !== null && value !== ""),
    ) as Partial<SearchFilters>;

    setSearchFilters(filterData);
  };

  return (
    <form action={handleSubmit} className="flex flex-col">
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
          inputName="name"
          labelText="Author name"
          placeholder="John Doe"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <SelectField
          selectID={orderFieldID}
          selectName="order"
          labelText="Order"
          options={["Newest", "Oldest"]}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <InputField
          inputID={minAmountFieldID}
          inputType="number"
          inputName="minAmount"
          labelText="Minimum Amount"
          placeholder="0 CLP"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <InputField
          inputID={maxAmountFieldID}
          inputType="number"
          inputName="maxAmount"
          labelText="Maximum Amount"
          placeholder="1000000 CLP"
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
        />
      </div>

      <div className="mt-4">
        <SubmitButton innerText="Filter" />
      </div>
    </form>
  );
};

export default DashboardFiltersForm;
