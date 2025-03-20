import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/authentication",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          setAuthed(false);
        } else {
          setAuthed(true);
        }
        setLoading(false);
      } catch {
        console.log("Error");
        setAuthed(false);
        setLoading(false);
      }
    };

    handleFetch();
  }, []);

  const login = async (formData: FormData): Promise<void> => {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("http://localhost:8001/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.error("Error"); // TODO : Better error handling
      return;
    }

    console.log("User logged in");
    setAuthed(true);
  };

  const logout = async (): Promise<void> => {
    const response = await fetch("http://localhost:8001/api/logout", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Logout unsuccessful");
      return;
    }

    console.log("User logged out");
    setAuthed(false);
  };

  console.log("Current auth state: ", authed);
  console.log("Current loading state", loading);

  return (
    <AuthContext.Provider value={{ authed, setAuthed, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
