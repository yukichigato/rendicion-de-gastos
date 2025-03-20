import { createContext } from "react";

// Define the type for the AuthContext
export interface AuthContextType {
  authed: boolean;
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  login: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
