import { useState, useRef, useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
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

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        title="Customize theme"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition"
        style={{
          border: `1.5px solid var(--border-accent)`,
          background: "var(--bg-surface)",
          color: "var(--text-primary)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <span className="hidden sm:inline text-xs font-semibold">Theme</span>
      </button>

      {open && (
        <div className="theme-selector-panel">
          <p
            style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, margin: "0 0 0.25rem 0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            Customize theme
          </p>
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option${theme === t.id ? " active" : ""}`}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
            >
              <span
                className="theme-swatch"
                style={{ background: t.swatch }}
              />
              {t.label}
              {theme === t.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
