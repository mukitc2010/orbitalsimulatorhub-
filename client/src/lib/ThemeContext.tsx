import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type ThemeId =
  | "light-clean"
  | "space-aurora"
  | "nasa-blue"
  | "deep-purple"
  | "mars-red"
  | "earth-green";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  swatch: string; // representative color for the preview dot
}

export const THEMES: ThemeMeta[] = [
  { id: "space-aurora",  label: "Space Aurora",  swatch: "linear-gradient(135deg, #00d9ff, #4ade80)" },
  { id: "light-clean",   label: "Light Clean",   swatch: "linear-gradient(135deg, #2563eb, #06b6d4)" },
  { id: "nasa-blue",     label: "NASA Blue",     swatch: "linear-gradient(135deg, #3b82f6, #f97316)" },
  { id: "deep-purple",   label: "Deep Purple",   swatch: "linear-gradient(135deg, #a855f7, #ec4899)" },
  { id: "mars-red",      label: "Mars Red",      swatch: "linear-gradient(135deg, #ef4444, #f97316)" },
  { id: "earth-green",   label: "Earth Green",   swatch: "linear-gradient(135deg, #22c55e, #14b8a6)" },
];

const STORAGE_KEY = "osh-theme";
const DEFAULT_THEME: ThemeId = "space-aurora";

function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
}

function loadSavedTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.some((t) => t.id === stored)) return stored as ThemeId;
  } catch { /* noop */ }
  return DEFAULT_THEME;
}

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(loadSavedTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* noop */ }
    applyTheme(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
