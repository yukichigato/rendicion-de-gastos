import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import UserOverview from "./pages/UserOverview";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import { type AuthContextType } from "./context/AuthContext";

const App = () => {
  const { loading } = useAuth() as AuthContextType;

  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>

      <Route
        path="overview"
        element={
          loading ? (
            <p>Loading</p>
          ) : (
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          )
        }
      ></Route>

      <Route
        path="user-overview"
        element={
          <ProtectedRoute>
            <UserOverview />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default App;
