import { createContext } from "react";
import { type User } from "../types";

export interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
