import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import { ToastProvider } from "../components/Toast.jsx";
import RequireAuth from "./RequireAuth.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

/**
 * Admin sub-app mounted at /admin/*.
 *   /admin/login  -> login screen
 *   /admin        -> dashboard (guarded)
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {/* Any unknown /admin/* path -> dashboard */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
