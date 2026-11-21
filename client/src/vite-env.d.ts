/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly VITE_KOFI_URL?: string;
  readonly VITE_BMC_URL?: string;
  readonly VITE_ADSENSE_ID?: string;
  readonly VITE_COMMUNITY_URL?: string;
  readonly VITE_ENABLE_VERCEL_TELEMETRY?: string;
  readonly VITE_SWARM_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
