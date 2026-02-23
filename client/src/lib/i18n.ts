/**
 * i18n configuration for OrbitalSimulatorHub
 * Uses react-i18next (Vite/React compatible; next-intl is Next.js only)
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../messages/en.json";

const SUPPORTED_LOCALES = ["es", "fr", "de", "it", "pt", "ru", "ar", "hi", "bn", "zh", "ja", "ko"] as const;

const resources: Record<string, { translation: typeof en }> = {
  en: { translation: en },
};

for (const locale of SUPPORTED_LOCALES) {
  resources[locale] = { translation: en };
}

const messageModules = import.meta.glob<{ default: typeof en }>("../messages/*.json");
for (const [path, mod] of Object.entries(messageModules)) {
  const match = path.match(/messages\/([a-z]{2,3})\.json$/);
  if (match && match[1] !== "en") {
    mod().then((m) => {
      i18n.addResourceBundle(match[1], "translation", m.default, true, true);
    });
  }
}

const COOKIE_NAME = "osh-locale";
const STORAGE_KEY = "osh-locale";

export function getStoredLocale(): string | null {
  if (typeof document === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY) || document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_NAME}=`))?.split("=")[1] || null;
  } catch {
    return null;
  }
}

export function setStoredLocale(locale: string): void {
  if (typeof document === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
    document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000;samesite=lax`;
  } catch {}
}

export const LOCALES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const RTL_LOCALES = new Set(["ar"]);

export function isRtl(locale: string): boolean {
  return RTL_LOCALES.has(locale);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", ...SUPPORTED_LOCALES],
    interpolation: { escapeValue: false },
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
      lookupCookie: COOKIE_NAME,
      lookupLocalStorage: STORAGE_KEY,
    },
  });

export default i18n;
