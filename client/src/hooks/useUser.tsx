import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Hook useUser must be used within an UserProvider");
  }

  return context;
};
