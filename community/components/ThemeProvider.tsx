'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  applyThemeToDocument,
  loadThemeFromStorage,
  saveThemeToStorage,
  type ThemeSettings,
  type ThemeId,
  type Density,
  DEFAULT_THEME,
  getThemeVariables,
  THEME_PACKS,
} from '@/lib/theme';
import { createClient } from '@/lib/supabase/client';

type ThemeContextValue = {
  settings: ThemeSettings | null;
  setTheme: (id: ThemeId) => void;
  setCustomColors: (colors: Partial<Pick<ThemeSettings, 'primary' | 'bg' | 'card' | 'border' | 'text' | 'muted'>>) => void;
  setDensity: (density: Density) => void;
  saveTheme: (s: ThemeSettings) => void;
  variables: ReturnType<typeof getThemeVariables>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = loadThemeFromStorage();
    return stored ? { ...stored, theme: stored.theme || DEFAULT_THEME } : { theme: DEFAULT_THEME };
  });

  const variables = getThemeVariables(settings);

  const applyAndPersist = useCallback((next: ThemeSettings) => {
    setSettings(next);
    applyThemeToDocument(next);
    saveThemeToStorage(next);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('profiles')
          .update({ theme_settings: next })
          .eq('id', user.id)
          .then(() => {});
      }
    });
  }, []);

  const setTheme = useCallback(
    (id: ThemeId) => {
      const next: ThemeSettings = { ...settings, theme: id };
      if (id !== 'custom') {
        applyAndPersist(next);
      } else {
        next.primary = variables.primary;
        next.bg = variables.bg;
        next.card = variables.card;
        applyAndPersist(next);
      }
    },
    [settings, variables, applyAndPersist]
  );

  const setCustomColors = useCallback(
    (colors: Partial<ThemeSettings>) => {
      const next: ThemeSettings = {
        ...settings,
        theme: 'custom',
        primary: colors.primary ?? settings?.primary ?? THEME_PACKS['space-aurora'].primary,
        bg: colors.bg ?? settings?.bg ?? THEME_PACKS['space-aurora'].bg,
        card: colors.card ?? settings?.card ?? THEME_PACKS['space-aurora'].card,
        cardHover: colors.cardHover ?? settings?.cardHover,
        border: colors.border ?? settings?.border,
        text: colors.text ?? settings?.text,
        muted: colors.muted ?? settings?.muted,
        secondary: colors.secondary ?? settings?.secondary,
      };
      setSettings(next);
      applyThemeToDocument(next);
      saveThemeToStorage(next);
    },
    [settings]
  );

  const setDensity = useCallback(
    (density: Density) => {
      const next: ThemeSettings = { ...settings, density };
      applyAndPersist(next);
    },
    [settings, applyAndPersist]
  );

  const saveTheme = useCallback(
    (s: ThemeSettings) => {
      applyAndPersist(s);
    },
    [applyAndPersist]
  );

  // On mount: apply from localStorage immediately (prevent flash), then sync from Supabase if logged in
  useEffect(() => {
    const stored = loadThemeFromStorage();
    const initial = stored ?? { theme: DEFAULT_THEME };
    setSettings(initial);
    applyThemeToDocument(initial);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('theme_settings')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.theme_settings && typeof data.theme_settings === 'object') {
              const fromDb = data.theme_settings as ThemeSettings;
              setSettings(fromDb);
              applyThemeToDocument(fromDb);
              saveThemeToStorage(fromDb);
            }
          });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const value: ThemeContextValue = {
    settings,
    setTheme,
    setCustomColors,
    setDensity,
    saveTheme,
    variables,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
