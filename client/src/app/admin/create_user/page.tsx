import React from "react";
import UserCreationForm from "@/ui/Forms/UserCreationForm";
import { SALT_ROUNDS } from "@/config";
import bcrypt from "bcrypt";

const page = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const hashedPassword: string = await bcrypt.hash(
      formData.get("password") as string,
      Number(SALT_ROUNDS),
    );

    const userData = {
      name: formData.get("name"),
      rut: formData.get("rut"),
      password: hashedPassword,
      tel: formData.get("tel"),
      email: formData.get("email"),
      area: formData.get("area"),
      status: formData.get("status"),
    } as UserData;

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json;
      /*
       *  @todo : Do something with responseData
       *  @todo : Use useTransition()
       */
    } catch (error: any) {
      console.error(error.message);

      /*
       *  @todo : Better error handling
       */
    }
  };

  return (
    <main className="flex w-screen justify-center bg-gray-100">
      <div className="max-w-[40rem] border-l-[.0625rem] border-r-[.0625rem] border-l-gray-300 border-r-gray-300 bg-white p-8">
        <UserCreationForm formAction={handleSubmit} />
      </div>
    </main>
  );
};

export default page;
