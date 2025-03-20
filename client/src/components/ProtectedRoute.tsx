import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { type AuthContextType } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authed } = useAuth() as AuthContextType;

  console.log(authed);

  return authed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
