import { Link, useLocation } from "wouter";
import { APP_NAME } from "../const";
import { ThemeSelector } from "./ThemeSelector";

export function NavigationHeader() {
  const [location] = useLocation();
  const nav = [
    { path: "/", label: "Home", title: "Orbital Simulator Hub — space, aerospace, and AI learning" },
    { path: "/play", label: "Learn Space", title: "Learn orbits, NASA, and space with the simulator" },
    { path: "/learn/aerospace", label: "Aerospace", title: "Aerospace & NASA reference for students and researchers" },
    { path: "/ai-in-aerospace", label: "AI in Space", title: "How AI is transforming aerospace and space exploration" },
    { path: "/learn/quantum-space", label: "Quantum", title: "Quantum physics and space technology" },
    { path: "/simulator", label: "Simulators", title: "3D satellite orbit simulator — LEO, MEO, GEO" },
    { path: "/learn/experiments", label: "Projects Lab", title: "Space experiments and projects" },
    { path: "/blog", label: "Blog", title: "Daily NASA news, space facts, satellite tutorials" },
    { path: "/astrobot", label: "Ask Astro AI", title: "Ask AstroBot anything about space, orbits, and NASA" },
    { path: "/careers", label: "Space Careers", title: "How to become NASA engineer, astronaut, space scientist" },
    { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
    { path: "/guide", label: "Guide", title: "How to use the simulator" },
  ];

  return (
    <header
      className="border-b-2 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      style={{
        borderColor: "var(--border-accent)",
        background: "var(--bg-header)",
      }}
    >
      <div className="container mx-auto px-4 py-3 max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-lg font-mono-tech transition"
          style={{ color: "var(--text-primary)" }}
        >
          {APP_NAME}
        </Link>

        <nav className="flex flex-wrap gap-1 items-center">
          {nav.map(({ path, label, title }) => (
            <Link
              key={path}
              href={path}
              title={title}
              className="px-3 py-2 rounded-lg font-medium transition text-sm"
              style={
                location === path
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
              onMouseEnter={(e) => {
                if (location !== path) {
                  (e.currentTarget as HTMLElement).style.background = "var(--nav-hover-bg)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (location !== path) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              {label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSelector />
          </div>
        </nav>
      </div>
    </header>
  );
}
