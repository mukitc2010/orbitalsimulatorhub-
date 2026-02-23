/**
 * Locale routing — redirect / and /path to /en or /locale/path for SEO
 */

export const VALID_LOCALES = new Set(["en", "es", "fr", "de", "it", "pt", "ru", "ar", "hi", "bn", "zh", "ja", "ko"]);

export function parseLocaleFromPath(path: string): string | null {
  const seg = path.split("/").filter(Boolean)[0];
  return seg && VALID_LOCALES.has(seg) ? seg : null;
}

export function pathWithoutLocale(path: string): string {
  const segs = path.split("/").filter(Boolean);
  if (segs.length > 0 && VALID_LOCALES.has(segs[0])) {
    const rest = segs.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return path || "/";
}

export function pathWithLocale(path: string, locale: string): string {
  const inner = path.replace(/^\//, "") || "";
  if (locale === "en") return inner ? `/${inner}` : "/";
  return inner ? `/${locale}/${inner}` : `/${locale}`;
}
