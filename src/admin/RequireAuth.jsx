import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "./AuthContext.jsx";

/**
 * Route guard. Renders children only when a user is signed in;
 * otherwise redirects to /admin/login (remembering where they
 * were headed). Shows a spinner while the session is resolving.
 */
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center surface">
        <Loader2 size={28} className="animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
