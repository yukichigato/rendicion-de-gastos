import React from "react";
import UserCreationForm from "@/ui/Forms/UserCreationForm";

const page = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const userData = {
      name: formData.get("name"),
      rut: formData.get("rut"),
      password: formData.get("password"),
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

      console.log(responseData);
    } catch (error: any) {
      console.error(error.message);
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
