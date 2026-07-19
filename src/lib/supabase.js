import { createClient } from "@supabase/supabase-js";

// ============================================================
//  SUPABASE CLIENT
//  Reads credentials from Vite env vars (safe for the frontend):
//    VITE_SUPABASE_URL       — your Project URL
//    VITE_SUPABASE_ANON_KEY  — your anon public key
//  Put these in a local `.env` file (already gitignored) and in
//  your Vercel/Netlify project settings for production.
// ============================================================

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// `isSupabaseConfigured` lets the rest of the app degrade gracefully:
// the public site falls back to the static portfolio.js data, and the
// admin shows a clear "not configured" message instead of crashing.
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "The public site will use static fallback data and the admin panel " +
      "will be disabled until you add them to your .env file."
  );
}

// When not configured we still export a client-shaped object of `null`
// so imports don't throw; callers must guard with `isSupabaseConfigured`.
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true, // "stay logged in"
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
