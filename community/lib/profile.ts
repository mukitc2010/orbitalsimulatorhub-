import type { ThemeSettings } from './theme';

export interface ProfileRow {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  interests: string[] | null;
  level: string | null;
  goals: string[] | null;
  theme_settings: ThemeSettings | null;
  online_status: string | null;
  terms_accepted_at: string | null;
  updated_at: string | null;
  created_at: string | null;
}

export interface ProfileInsert {
  id: string;
  username: string;
  display_name?: string | null;
  bio?: string | null;
  interests?: string[] | null;
  level?: string | null;
  goals?: string[] | null;
  theme_settings?: ThemeSettings | null;
}

export interface ProfileUpdate {
  display_name?: string | null;
  bio?: string | null;
  interests?: string[] | null;
  level?: string | null;
  goals?: string[] | null;
  theme_settings?: ThemeSettings | null;
}
