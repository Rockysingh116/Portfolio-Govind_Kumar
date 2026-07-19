import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { LogIn, Loader2, ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "./AuthContext.jsx";

/**
 * Admin login. Email + password via Supabase Auth. On success,
 * redirects to wherever the user was headed (default /admin).
 */
export default function Login() {
  const { signIn, user, loading, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in -> skip the login screen.
  if (!loading && user) return <Navigate to={from} replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error: err } = await signIn(email.trim(), password);
    setBusy(false);
    if (err) {
      setError(err.message || "Sign-in failed. Check your email and password.");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center surface px-4">
      <div className="w-full max-w-sm">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={16} /> Back to site
        </a>

        <div className="card rounded-2xl p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <LogIn size={22} />
            </div>
            <h1 className="text-xl font-semibold text-[var(--text)]">
              Admin sign in
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Manage your portfolio content
            </p>
          </div>

          {!configured && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <span>
                Supabase isn&apos;t configured yet. Add{" "}
                <code>VITE_SUPABASE_URL</code> and{" "}
                <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code>.
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[var(--text)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[var(--text)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy || !configured}
              className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 disabled:opacity-60"
            >
              {busy ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  <LogIn size={18} /> Sign in
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          Sessions persist, so you stay logged in on this device.
        </p>
      </div>
    </div>
  );
}
