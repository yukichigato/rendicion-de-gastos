"use server";

import {
  NEXT_PUBLIC_AUTH_API_BASEURL,
  NEXT_PUBLIC_DB_API_BASEURL,
} from "@/config";
import { UserHeader } from "@/types";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Cookies from "js-cookie";

export async function uploadReport(formData: FormData) {
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

    revalidatePath("/profile-submissions", "layout");
    window.location.reload();
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
}

export async function login(formData: FormData) {
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(`${NEXT_PUBLIC_AUTH_API_BASEURL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  } catch (error: any) {
    console.error(error.message);
    /*
     *  @todo : Better error handling
     */
  }
}
