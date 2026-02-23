/**
 * Redirects paths without locale prefix to locale-prefixed URLs for SEO
 * e.g. / -> /en, /simulator -> /en/simulator (or detected locale)
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { parseLocaleFromPath, pathWithLocale, VALID_LOCALES } from "../lib/localeRoutes";
import { getStoredLocale } from "../lib/i18n";

export function LocaleRedirect() {
  const [location, setLocation] = useLocation();
  const localeInPath = parseLocaleFromPath(location);

  useEffect(() => {
    if (localeInPath) return;
    const stored = getStoredLocale();
    const targetLocale = stored && VALID_LOCALES.has(stored) ? stored : "en";
    const newPath = pathWithLocale(location || "/", targetLocale);
    if (newPath !== location) setLocation(newPath);
  }, [location, localeInPath, setLocation]);

  return null;
}
