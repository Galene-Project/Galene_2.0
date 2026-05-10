import { createClient } from "@supabase/supabase-js";

// ─── Supabase connection ────────────────────────────────────────────────────
// On Vercel: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in
// Project → Settings → Environment Variables.
// For local dev: create .env.local with those same two keys.
// ────────────────────────────────────────────────────────────────────────────
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  console.warn(
    "[Galene] Supabase env vars not set — order submission will be disabled.\n" +
    "Create .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase =
  supabaseUrl && supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : null;
