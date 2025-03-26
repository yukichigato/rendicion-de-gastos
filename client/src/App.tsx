import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import UserOverview from "./pages/UserOverview";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import { type AuthContextType } from "./context/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  const { loading } = useAuth() as AuthContextType;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/overview"
        element={
          loading ? (
            <p>Loading</p>
          ) : (
            <ProtectedRoute>
              <Navbar />
              <div className="h-16"></div>
              <Overview />
            </ProtectedRoute>
          )
        }
      />
      <Route
        path="/user-overview"
        element={
          loading ? (
            <p>Loading</p>
          ) : (
            <ProtectedRoute>
              <Navbar />
              <div className="h-16"></div>
              <UserOverview />
            </ProtectedRoute>
          )
        }
      />
    </Routes>
  );
};

export default App;
