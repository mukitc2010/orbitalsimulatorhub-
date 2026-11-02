import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ThemeSelector } from "./ThemeSelector";

const MISSION_SUBNAV = [
  { path: "/missions", label: "Missions", title: "Space missions — Apollo, Gemini, Shuttle" },
  { path: "/astronauts", label: "Astronauts", title: "Astronaut Explorer — all astronauts, moonwalkers" },
  { path: "/artifacts", label: "Brought Back", title: "What humans brought back from space" },
];

const SIMULATOR_SUBNAV = [
  { path: "/simulator", label: "Orbit Simulator", title: "3D satellite orbit simulator — LEO, MEO, GEO" },
  { path: "/simulator/swarm", label: "Swarm Simulator", title: "AI swarm collision avoidance — J2, Pc, OSQP" },
  { path: "/simulator/ai-astronaut-robot", label: "AI Robot Lab", title: "Build and train AI space robots — humanoid, rover, vision AI" },
  { path: "/simulator/spacecraft", label: "Spacecraft Ops", title: "3D spacecraft systems, signal delay, and repair modes" },
  { path: "/quantum-space-agi", label: "Quantum Space AGI Lab", title: "Quantum Space AGI Lab — curvature-aware navigation" },
  { path: "/simulator/quantum-space-agi", label: "Quantum Simulator", title: "Quantum-assisted black hole flyby — Schwarzschild, Kerr, wormhole" },
];

const SPACE_AGI_SUBNAV = [
  { path: "/research/space-agi-lab", label: "Engineering Lab", title: "5 pillars: autonomous spacecraft, decision intelligence, orbital math" },
  { path: "/research/space-agi-roadmap", label: "Roadmap", title: "2025–2060+ timeline: AI satellites to interstellar" },
  { path: "/research/space-agi-explanation", label: "Explanation", title: "Plain-language guides — Math Explained tab for teens & college" },
  { path: "/research/space-agi-math", label: "Mathematics", title: "Optimal control, MPC, LQR, Space-AGI framework (graduate level)" },
  { path: "/research/agi-asi-framework", label: "AGI/ASI Framework", title: "Conceptual module for AGI and ASI in future space systems" },
  { path: "/research/asi-astronaut-mathematics", label: "ASI Astronaut Math", title: "15-level AI math foundation and Mars-grade autonomous astronaut equations" },
  { path: "/research/pmp-nmpc-autonomous-control", label: "PMP–NMPC Framework", title: "Hybrid autonomous control: PMP + estimation + NMPC + reachability + CBF safety" },
];

const BLOG_SUBNAV = [
  { path: "/blog", label: "Blog", title: "Daily space news, space facts, satellite tutorials" },
  { path: "/recommended-books", label: "Books", title: "Recommended space & aerospace books" },
  { path: "/space-shop", label: "Space Shop", title: "NASA t-shirts, toys, books — verified Amazon" },
  { path: "/learn/aerospace", label: "Aerospace", title: "Aerospace reference for students and researchers" },
  { path: "/ai-in-aerospace", label: "AI in Space", title: "How AI is transforming aerospace and space exploration" },
  { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
];

const NAV = [
  { path: "/", label: "Home", title: "OrbitalSimulatorHub — Orbital Mechanics • AI in Space • Future Space Intelligence" },
  { path: "/games/space-math", label: "Orbit Score", title: "Orbit Score Lab — space-math challenges and scores" },
  { path: "/planets", label: "Planets", title: "Planet Study Hub — explore every planet in our solar system" },
  { path: "/simulator", label: "Simulator", title: "Orbit & Swarm simulators — LEO, MEO, GEO, AI collision avoidance", subnav: SIMULATOR_SUBNAV },
  { path: "/research/space-agi-lab", label: "🧠 Space-AGI Lab", title: "Space-AGI Engineering Lab — autonomous spacecraft, decision intelligence, orbital math", subnav: SPACE_AGI_SUBNAV },
  { path: "/research/asi-astronaut-mathematics", label: "ASI", title: "ASI Astronaut Mathematics — autonomy, optimal control, and Mars mission systems" },
  { path: "/blog", label: "Blog", title: "Daily space news, aerospace, AI in space, research", subnav: BLOG_SUBNAV },
  { path: "/astrobot", label: "AstroBot", title: "Ask AstroBot anything about space, orbits, and satellites" },
  { path: "/research", label: "Research", title: "NASA, Newton, orbital mechanics — for students and PhD researchers" },
];

function isMissionsActive(location: string) {
  return location === "/missions" || location.startsWith("/missions/") || location === "/astronauts" || location.startsWith("/astronauts/") || location === "/artifacts";
}

function isSimulatorActive(location: string) {
  return location === "/simulator" || location === "/simulator/swarm" || location === "/simulator/ai-astronaut-robot" || location === "/simulator/spacecraft" || location === "/simulator/quantum-space-agi"
    || location === "/quantum-space-agi" || location.startsWith("/quantum-space-agi/");
}

function isSpaceAgiActive(location: string) {
  return location === "/research/space-agi-lab"
    || location === "/research/space-agi-roadmap"
    || location === "/research/space-agi-math"
    || location === "/research/space-agi-explanation"
    || location === "/research/agi-asi-framework"
    || location === "/research/asi-astronaut-mathematics"
    || location === "/research/pmp-nmpc-autonomous-control";
}

function isBlogActive(location: string) {
  return location === "/blog" || location.startsWith("/blog/") || location === "/recommended-books" || location === "/space-shop"
    || location === "/learn/aerospace" || location.startsWith("/learn/aerospace")
    || location === "/ai-in-aerospace" || location === "/ai-in-space" || location === "/research" || location.startsWith("/research/");
}

type SubnavItem = { path: string; label: string; title: string };

function isBlogItemActive(location: string, path: string) {
  if (path === "/blog") return location === "/blog" || location.startsWith("/blog/");
  if (path === "/learn/aerospace") return location.startsWith("/learn/aerospace");
  if (path === "/ai-in-aerospace") return location === "/ai-in-aerospace" || location === "/ai-in-space";
  if (path === "/research") return location === "/research" || (location.startsWith("/research/") && !isSpaceAgiActive(location));
  return location === path;
}

export function NavigationHeader() {
  const [location] = useLocation();
  const [missionsOpen, setMissionsOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [spaceAgiOpen, setSpaceAgiOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  function closeMenus() {
    setMissionsOpen(false);
    setSimulatorOpen(false);
    setSpaceAgiOpen(false);
    setBlogOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeMenus();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenus();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const directLinks = NAV.filter((item) => item.path === "/research/asi-astronaut-mathematics" || item.path === "/astrobot");

  return (
    <header
      ref={headerRef}
      className="site-header border-b-2 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
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
          <Link href="/" className="flex items-center gap-2 transition opacity-90 hover:opacity-100">
            <img
              src="/logo.svg"
              alt="OrbitalSimulatorHub"
              className="h-9 sm:h-10 w-auto max-w-[180px] sm:max-w-none"
            />
          </Link>
        </div>

        <nav className="flex flex-wrap gap-1 items-center" aria-label="Primary">
          <NavLink path="/" label="Home" title={NAV[0].title} location={location} />
          <NavLink path="/games/space-math" label="Orbit Score" title={NAV[1].title} location={location} />
          <NavLink path="/planets" label="Planets" title={NAV[2].title} location={location} />
          <NavMenu
            label="Simulator"
            open={simulatorOpen}
            active={isSimulatorActive(location)}
            items={SIMULATOR_SUBNAV}
            onToggle={() => { setSimulatorOpen((v) => !v); setMissionsOpen(false); setSpaceAgiOpen(false); setBlogOpen(false); }}
            onOpen={() => { setSimulatorOpen(true); setMissionsOpen(false); setSpaceAgiOpen(false); setBlogOpen(false); }}
            onClose={() => setSimulatorOpen(false)}
            isItemActive={(path) => location === path}
          />
          <NavMenu
            label="Missions"
            open={missionsOpen}
            active={isMissionsActive(location)}
            items={MISSION_SUBNAV}
            onToggle={() => { setMissionsOpen((v) => !v); setSimulatorOpen(false); setSpaceAgiOpen(false); setBlogOpen(false); }}
            onOpen={() => { setMissionsOpen(true); setSimulatorOpen(false); setSpaceAgiOpen(false); setBlogOpen(false); }}
            onClose={() => setMissionsOpen(false)}
            isItemActive={(path) => location === path || (path === "/missions" && location.startsWith("/missions"))}
          />
          <NavMenu
            label="🧠 Space-AGI Lab"
            open={spaceAgiOpen}
            active={isSpaceAgiActive(location)}
            items={SPACE_AGI_SUBNAV}
            onToggle={() => { setSpaceAgiOpen((v) => !v); setSimulatorOpen(false); setMissionsOpen(false); setBlogOpen(false); }}
            onOpen={() => { setSpaceAgiOpen(true); setSimulatorOpen(false); setMissionsOpen(false); setBlogOpen(false); }}
            onClose={() => setSpaceAgiOpen(false)}
            isItemActive={(path) => location === path}
          />
          <NavMenu
            label="Blog"
            open={blogOpen}
            active={isBlogActive(location) && !isSpaceAgiActive(location)}
            items={BLOG_SUBNAV}
            onToggle={() => { setBlogOpen((v) => !v); setSimulatorOpen(false); setMissionsOpen(false); setSpaceAgiOpen(false); }}
            onOpen={() => { setBlogOpen(true); setSimulatorOpen(false); setMissionsOpen(false); setSpaceAgiOpen(false); }}
            onClose={() => setBlogOpen(false)}
            isItemActive={(path) => isBlogItemActive(location, path)}
          />
          {directLinks.map(({ path, label, title }) => (
            <NavLink key={path} path={path} label={label} title={title} location={location} />
          ))}
        </nav>
      </div>
      {isSimulatorActive(location) && (
        <nav aria-label="Choose a simulator" className="border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="container mx-auto px-4 py-2 max-w-7xl flex flex-wrap gap-2">
            {SIMULATOR_SUBNAV.map(({ path, label, title }) => (
              <Link
                key={path}
                href={path}
                title={title}
                aria-current={location === path ? "page" : undefined}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={
                  location === path
                    ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
                    : { color: "var(--text-secondary)", background: "transparent" }
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function NavMenu({
  label, open, active, items, onToggle, onOpen, onClose, isItemActive,
}: {
  label: string;
  open: boolean;
  active: boolean;
  items: SubnavItem[];
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  isItemActive: (path: string) => boolean;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
        className="px-3 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1"
        style={
          active
            ? { background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }
            : { color: "var(--text-secondary)" }
        }
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: open ? 1 : 0.7 }} aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-[80] min-w-[200px] pt-1">
          <div className="py-1 rounded-lg shadow-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }} role="menu">
            {items.map(({ path, label: itemLabel, title }) => (
              <Link
                key={path}
                href={path}
                title={title}
                role="menuitem"
                onClick={onClose}
                className="block px-4 py-2 text-sm font-medium transition"
                style={{ color: isItemActive(path) ? "var(--accent-cyan)" : "var(--text-primary)" }}
              >
                {itemLabel}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
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
