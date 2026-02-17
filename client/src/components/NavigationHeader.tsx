import { Link, useLocation } from "wouter";
import { APP_NAME } from "../const";

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
    <header className="border-b-2 border-[var(--accent-cyan)] bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg font-mono-tech text-[#0f172a] hover:text-[var(--accent-cyan)] transition">
          {APP_NAME}
        </Link>
        <nav className="flex flex-wrap gap-1">
          {nav.map(({ path, label, title }) => (
            <Link
              key={path}
              href={path}
              title={title}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                location === path
                  ? "bg-[var(--accent-cyan)] text-[#0f172a]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
