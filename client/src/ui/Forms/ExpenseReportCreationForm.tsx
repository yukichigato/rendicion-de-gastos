import React, { useId } from "react";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import SubmitButton from "@/ui/SubmitButton";
import FileField from "@/ui/FileField";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { UserHeader } from "@/types";
import { NEXT_PUBLIC_DB_API_BASEURL } from "@/config";

const ExpenseReportCreationForm = () => {
  const typeInputID = useId();
  const amountInputID = useId();
  const fileInputID = useId();

  async function uploadImage(formData: FormData) {
    "use server";

    // Uploading blob to vercel
    const imageFile = formData.get("backup") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });

    // Uploading expense report to db
    const headersList = await headers();
    const userData: UserHeader = JSON.parse(
      headersList.get("x-user-data") as string,
    );

    const expenseReportData = {
      author_id: userData.id,
      type: formData.get("type"),
      amount: formData.get("amount"),
      backup_url: blob.downloadUrl,
    };

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_DB_API_BASEURL}/api/expense_report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseReportData),
        },
      );

      revalidatePath("/");
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <form action={uploadImage} className="flex flex-col">
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
