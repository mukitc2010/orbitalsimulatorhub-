import { Link, useLocation } from "wouter";
import { APP_NAME } from "../const";

export function NavigationHeader() {
  const [location] = useLocation();
  const nav = [
    { path: "/", label: "Home", title: "Orbital mechanics simulator and space learning" },
    { path: "/simulator", label: "Simulator", title: "3D satellite orbit simulator — LEO, MEO, GEO" },
    { path: "/blog", label: "Blog", title: "Daily NASA news, space facts, satellite tutorials, astronomy lessons" },
    { path: "/formulas-library", label: "Formulas", title: "Space formulas: gravity, orbital velocity, escape velocity, Kepler, rocket equation" },
    { path: "/satellites", label: "Satellites", title: "Real satellite orbits: ISS, Starlink, GPS, weather satellites" },
    { path: "/calculators", label: "Calculators", title: "Orbit calculator, gravity calculator, escape velocity" },
    { path: "/astrobot", label: "AstroBot", title: "Ask AstroBot anything about space and orbits" },
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
