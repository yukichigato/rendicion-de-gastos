import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="overview" element={<Overview />}></Route>
      </Routes>
    </Router>
  </StrictMode>,
);
