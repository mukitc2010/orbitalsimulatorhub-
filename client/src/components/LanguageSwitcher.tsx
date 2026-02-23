/**
 * LanguageSwitcher — Globe icon + searchable dropdown, sits next to Theme toggle
 */

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../lib/LocaleContext";
import { LOCALES } from "../lib/i18n";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const currentName = LOCALES.find((l) => l.code === locale)?.name ?? "English";
  const filtered = search.trim()
    ? LOCALES.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.code.toLowerCase().includes(search.toLowerCase())
      )
    : LOCALES;

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        title={t("lang.label")}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition"
        style={{
          border: "1.5px solid var(--border-accent)",
          background: "var(--bg-surface)",
          color: "var(--text-primary)",
        }}
      >
        <GlobeIcon />
        <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate">
          {currentName}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: open ? 1 : 0.7 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 py-2 rounded-lg shadow-lg min-w-[200px] max-h-[320px] flex flex-col"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <div className="px-3 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("lang.searchPlaceholder")}
              className="w-full rounded-lg px-3 py-1.5 text-sm border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-[260px] py-1">
            {filtered.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium flex items-center gap-2 transition"
                style={{
                  color: locale === l.code ? "var(--accent-cyan)" : "var(--text-primary)",
                  background: locale === l.code ? "var(--nav-active-bg)" : "transparent",
                }}
              >
                {l.name}
                {locale === l.code && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-2 text-sm" style={{ color: "var(--text-muted)" }}>
                No language found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
