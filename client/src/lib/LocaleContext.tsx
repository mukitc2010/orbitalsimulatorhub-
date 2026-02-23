/**
 * Locale context — persists locale to cookie/localStorage and syncs with URL
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import i18n, { getStoredLocale, setStoredLocale } from "./i18n";
import { isRtl } from "./i18n";
import { parseLocaleFromPath, pathWithoutLocale, pathWithLocale, VALID_LOCALES } from "./localeRoutes";

interface LocaleContextValue {
  locale: string;
  setLocale: (code: string) => void;
  isRtl: boolean;
  localizedPath: (path: string) => string;
  localeFromPath: string | null;
  pathWithoutLocale: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  isRtl: false,
  localizedPath: (p) => p,
  localeFromPath: null,
  pathWithoutLocale: (p) => p,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [locale, setLocaleState] = useState<string>(() => i18n.language?.split("-")[0] || "en");
  const localeFromPath = parseLocaleFromPath(location);

  useEffect(() => {
    if (localeFromPath && localeFromPath !== locale) {
      setLocaleState(localeFromPath);
      i18n.changeLanguage(localeFromPath);
      setStoredLocale(localeFromPath);
    }
  }, [localeFromPath]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback(
    (code: string) => {
      const normalized = code.split("-")[0];
      if (!VALID_LOCALES.has(normalized)) return;
      setLocaleState(normalized);
      i18n.changeLanguage(normalized);
      setStoredLocale(normalized);

      const base = pathWithoutLocale(location);
      const newPath = pathWithLocale(base, normalized);
      if (newPath !== location) setLocation(newPath);
    },
    [location, setLocation]
  );

  const localizedPath = useCallback(
    (path: string) => {
      const currentLocale = localeFromPath || locale;
      const normalized = path.startsWith("/") ? path : `/${path}`;
      return pathWithLocale(normalized || "/", currentLocale);
    },
    [locale, localeFromPath]
  );

  return (
    <LocaleContext.Provider
      value={{
        locale: localeFromPath || locale,
        setLocale,
        isRtl: isRtl(localeFromPath || locale),
        localizedPath,
        localeFromPath,
        pathWithoutLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
