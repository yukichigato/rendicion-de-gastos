import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import UserProvider from "./providers/UserProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
