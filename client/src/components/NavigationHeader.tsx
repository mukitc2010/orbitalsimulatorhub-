import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { APP_NAME } from "../const";
import { ThemeSelector } from "./ThemeSelector";

const MISSION_SUBNAV = [
  { path: "/missions", label: "Missions", title: "Space missions — Apollo, Gemini, Shuttle" },
  { path: "/astronauts", label: "Astronauts", title: "Astronaut Explorer — all astronauts, moonwalkers" },
  { path: "/artifacts", label: "Brought Back", title: "What humans brought back from space" },
];

const SPACE_AGI_SUBNAV = [
  { path: "/research/space-agi-lab", label: "Engineering Lab", title: "5 pillars: autonomous spacecraft, decision intelligence, orbital math" },
  { path: "/research/space-agi-roadmap", label: "Roadmap", title: "2025–2060+ timeline: AI satellites to interstellar" },
];

const NAV = [
  { path: "/", label: "Home", title: "OrbitalSimulatorHub — Orbital Mechanics • AI in Space • Future Space Intelligence" },
  { path: "/planets", label: "Planets", title: "Planet Study Hub — explore every planet in our solar system" },
  { path: "/simulator", label: "Simulator", title: "3D satellite orbit simulator — LEO, MEO, GEO" },
  { path: "/research/space-agi-lab", label: "🧠 Space-AGI Lab", title: "Space-AGI Engineering Lab — autonomous spacecraft, decision intelligence, orbital math", subnav: SPACE_AGI_SUBNAV },
  { path: "/learn/aerospace", label: "Aerospace", title: "Aerospace reference for students and researchers" },
  { path: "/ai-in-aerospace", label: "AI in Space", title: "How AI is transforming aerospace and space exploration" },
  { path: "/blog", label: "Blog", title: "Daily space news, space facts, satellite tutorials" },
  { path: "/astrobot", label: "AstroBot", title: "Ask AstroBot anything about space, orbits, and satellites" },
  { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
];

function isMissionsActive(location: string) {
  return location === "/missions" || location.startsWith("/missions/") || location === "/astronauts" || location.startsWith("/astronauts/") || location === "/artifacts";
}

function isSpaceAgiActive(location: string) {
  return location === "/research/space-agi-lab" || location === "/research/space-agi-roadmap";
}

export function NavigationHeader() {
  const [location] = useLocation();
  const [missionsOpen, setMissionsOpen] = useState(false);
  const [spaceAgiOpen, setSpaceAgiOpen] = useState(false);
  const missionsRef = useRef<HTMLDivElement>(null);
  const spaceAgiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (missionsRef.current && !missionsRef.current.contains(e.target as Node)) {
        setMissionsOpen(false);
      }
      if (spaceAgiRef.current && !spaceAgiRef.current.contains(e.target as Node)) {
        setSpaceAgiOpen(false);
      }
    }
    if (missionsOpen || spaceAgiOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [missionsOpen, spaceAgiOpen]);

  return (
    <header
      className="border-b-2 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      style={{
        borderColor: "var(--border-accent)",
        background: "var(--bg-header)",
      }}
    >
      <div className="container mx-auto px-4 py-3 max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <ThemeSelector />
          </div>
          <Link
            href="/"
            className="font-bold text-lg font-mono-tech transition"
            style={{ color: "var(--text-primary)" }}
          >
            {APP_NAME}
          </Link>
        </div>

        <nav className="flex flex-wrap gap-1 items-center">
          {NAV.slice(0, 2).map(({ path, label, title }) => (
            <NavLink key={path} path={path} label={label} title={title} location={location} />
          ))}
          <div ref={missionsRef} className="relative">
            <button
              onClick={() => setMissionsOpen((v) => !v)}
              onMouseEnter={() => setMissionsOpen(true)}
              className="px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1"
              style={
                isMissionsActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              Missions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: missionsOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {missionsOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[160px]"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setMissionsOpen(false)}
              >
                {MISSION_SUBNAV.map(({ path, label, title }) => (
                  <Link key={path} href={path} onClick={() => setMissionsOpen(false)}>
                    <a
                      className="block px-4 py-2 text-sm font-medium transition"
                      style={{
                        color: location === path || (path === "/missions" && location.startsWith("/missions")) ? "var(--accent-cyan)" : "var(--text-primary)",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div ref={spaceAgiRef} className="relative">
            <button
              onClick={() => setSpaceAgiOpen((v) => !v)}
              onMouseEnter={() => setSpaceAgiOpen(true)}
              className="px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1"
              style={
                isSpaceAgiActive(location)
                  ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              🧠 Space-AGI Lab
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: spaceAgiOpen ? 1 : 0.7 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {spaceAgiOpen && (
              <div
                className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg min-w-[180px]"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                onMouseLeave={() => setSpaceAgiOpen(false)}
              >
                {SPACE_AGI_SUBNAV.map(({ path, label, title }) => (
                  <Link key={path} href={path} onClick={() => setSpaceAgiOpen(false)}>
                    <a
                      className="block px-4 py-2 text-sm font-medium transition"
                      style={{
                        color: location === path ? "var(--accent-cyan)" : "var(--text-primary)",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV.slice(2).filter((n) => n.path !== "/research/space-agi-lab").map(({ path, label, title }) => (
            <NavLink key={path} path={path} label={label} title={title} location={location} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({ path, label, title, location }: { path: string; label: string; title: string; location: string }) {
  const active = location === path || (path !== "/" && location.startsWith(path)) || (path === "/research/space-agi-lab" && location === "/research/space-agi-roadmap");
  return (
    <Link href={path} title={title}>
      <a
        className="px-3 py-2 rounded-lg font-medium transition text-sm"
        style={
          active
            ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
            : { color: "var(--text-secondary)" }
        }
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = "var(--nav-hover-bg)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }
        }}
      >
        {label}
      </a>
    </Link>
  );
}
