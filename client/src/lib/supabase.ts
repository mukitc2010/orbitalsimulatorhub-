import { createClient } from "@supabase/supabase-js";

// Vite: VITE_SUPABASE_* | Next.js: NEXT_PUBLIC_SUPABASE_*
const url =
  import.meta.env.VITE_SUPABASE_URL ??
  (import.meta.env as Record<string, string>).NEXT_PUBLIC_SUPABASE_URL;
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  (import.meta.env as Record<string, string>).NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = () => createClient(url!, key!);
