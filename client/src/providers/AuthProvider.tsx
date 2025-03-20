import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser } = useUser();
  const navigate = useNavigate();

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
          throw new Error("Error to authenticate"); // TODO : Better error handling
        } else {
          setAuthed(true);
          setLoading(false);
        }

        const data = await response.json(); // TODO : Types
        setUser(data);
        navigate("/user-overview");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log("Error", error.message);
        setAuthed(false);
        setLoading(false);
      }
    };

    handleFetch();
  }, [setUser, navigate]);

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

    const data = await response.json(); // TODO : Types
    setUser(data);

    console.log("User logged in");
    setAuthed(true);
    navigate("/user-overview");
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

    setUser(undefined);
    console.log("User logged out");
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, setAuthed, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
