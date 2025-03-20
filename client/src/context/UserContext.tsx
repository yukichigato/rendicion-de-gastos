import { createContext } from "react";

export interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface User {
  id: string;
  name: string;
  rut: string;
  status: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
