import { NEXT_PUBLIC_AUTH_API_BASEURL } from "@/config";
import Cookies from "js-cookie";

export const handleLogIn = async (formData: FormData) => {
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

    const token = await response.json();

    Cookies.set(`auth_cookie`, token, { expires: 7 });
    /*
     *  @todo : Use of React.useTransition()
     */
  } catch (error: any) {
    console.error(error.message);
    /*
     *  @todo : Better error handling
     */
  }
};
