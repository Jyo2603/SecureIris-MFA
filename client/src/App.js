import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PasswordPage from "./pages/PasswordPage";
import IrisRegisterPage from "./pages/IrisRegisterPage";
import IrisVerifyPage from "./pages/IrisVerifyPage";
import DashboardPage from "./pages/DashboardPage";
import FakePage from "./pages/FakePage";
import FakeDashboardPage from "./pages/FakeDashboardPage";
import UnblockPage from "./pages/UnblockPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Add this to fix "/" blank screen */}
        <Route path="/" element={<RegisterPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/iris-register" element={<IrisRegisterPage />} />
        <Route path="/iris-verify" element={<IrisVerifyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/fake" element={<FakePage />} />
        <Route path="/fake-dashboard" element={<FakeDashboardPage />} />
        <Route path="/unblock" element={<UnblockPage />} />

        {/* Optional: 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
