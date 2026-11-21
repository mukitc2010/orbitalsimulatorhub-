import { Link } from "wouter";
import { useState } from "react";
import { ALL_PLANETS, getSolarSystemPlanets, type Planet } from "../data/planets";

function fmtDist(km: number): string {
  if (km >= 1e9) return `${(km / 1e9).toFixed(2)}B km`;
  if (km >= 1e6) return `${(km / 1e6).toFixed(1)}M km`;
  if (km >= 1e3) return `${(km / 1e3).toFixed(1)}K km`;
  return `${km} km`;
}

const solarPlanets = getSolarSystemPlanets();
const allBodies = ALL_PLANETS;

export function PlanetHub() {
  const [filter, setFilter] = useState<"planets" | "all">("planets");
  const displayed = filter === "all" ? allBodies : solarPlanets;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Hero */}
      <section className="hero-gradient rounded-2xl px-6 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-primary)" }}>
          NASA-Level Interactive Database
        </p>
        <h1 className="headline mb-3">Planet Study Hub</h1>
        <p className="subhead max-w-2xl mx-auto text-lg">
          Explore every planet in our solar system with real NASA data — distance, gravity, temperature,
          atmosphere, missions, and more. Switch between Kids, General, and Research modes on each planet.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/astronauts" className="px-5 py-2.5 rounded-xl font-medium transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
              👨‍🚀 Astronaut Explorer
            </Link>
          <Link href="/artifacts" className="px-5 py-2.5 rounded-xl font-medium transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
              🪨 Brought From Space
            </Link>
          <Link href="/simulator" className="px-5 py-2.5 rounded-xl font-medium transition" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              🛰 Open Simulator
            </Link>
        </div>
      </section>

      {/* Solar System visual — fully clickable */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          ☀️ Solar System in Order
        </h2>
        <div className="flex flex-wrap items-end justify-center gap-3 py-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-1">☀️</span>
            <span className="text-[10px] font-bold" style={{ color: "var(--text-muted)" }}>Sun</span>
          </div>
          {solarPlanets.map((p, i) => (
            <Link key={p.id} href={`/planets/${p.slug}`} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition cursor-pointer group" style={{ background: "var(--bg-card)", border: `2px solid ${p.color}40` }}>
                <span className="text-3xl group-hover:scale-125 transition-transform">{p.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{i + 1}{i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}</span>
              </Link>
          ))}
        </div>
      </section>

      {/* Filter */}
      <div className="flex gap-2">
        {(["planets", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: filter === f ? "var(--accent-primary)" : "var(--bg-surface)", color: filter === f ? "var(--text-on-accent)" : "var(--text-secondary)", border: `1px solid ${filter === f ? "var(--accent-primary)" : "var(--border-color)"}` }}>
            {f === "planets" ? "8 Planets" : "All Bodies (+ Moon & Pluto)"}
          </button>
        ))}
      </div>

      {/* Planet grid — entire card is clickable */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map((planet) => (
            <Link key={planet.id} href={`/planets/${planet.slug}`} className="block rounded-xl p-5 transition group cursor-pointer hover:-translate-y-1" style={{ background: "var(--bg-card)", border: `2px solid ${planet.color}50`, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{planet.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{planet.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded capitalize" style={{ background: `${planet.color}20`, color: planet.color }}>{planet.type.replace(/_/g, " ")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>📏 Distance:</span> {fmtDist(planet.distanceFromSunKm)}</div>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>🧲 Gravity:</span> {planet.surfaceGravityG.toFixed(2)}g</div>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>🌡 Temp:</span> {planet.avgTemperatureC}°C</div>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>🌙 Moons:</span> {planet.moons}</div>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>⏳ Year:</span> {planet.orbitalPeriodDays < 365 ? `${planet.orbitalPeriodDays.toFixed(0)} days` : `${(planet.orbitalPeriodDays / 365.25).toFixed(1)} yrs`}</div>
                  <div><span className="font-semibold" style={{ color: "var(--text-primary)" }}>📐 Radius:</span> {planet.radiusKm.toLocaleString()} km</div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {planet.hasRings && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${planet.color}25`, color: planet.color }}>💍 Rings</span>}
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>{planet.humanVisited ? "✅ Human visited" : "❌ Not visited"}</span>
                  {planet.missionsVisited.length > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>🛰 {planet.missionsVisited.length} missions</span>}
                </div>

                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>{planet.funFacts[0]}</p>

                <span className="text-sm font-semibold group-hover:underline" style={{ color: "var(--accent-primary)" }}>
                  Explore {planet.name} →
                </span>
              </Link>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>📊 Compare All Planets</h2>
        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr style={{ background: "var(--bg-surface)" }}>
                {["Planet", "Dist. from Sun", "Gravity", "Temp", "Moons", "Rings", "Year Length", "Radius", "Atmosphere"].map((h) => (
                  <th key={h} className="text-left p-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solarPlanets.map((p, i) => (
                <tr key={p.id} className="transition" style={{ background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)" }}>
                  <td className="p-3" style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <Link href={`/planets/${p.slug}`} className="flex items-center gap-2 font-semibold hover:underline" style={{ color: "var(--accent-primary)" }}>
                        <span>{p.emoji}</span>{p.name}
                      </Link>
                  </td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{fmtDist(p.distanceFromSunKm)}</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.surfaceGravityG.toFixed(2)}g</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.avgTemperatureC}°C</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.moons}</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.hasRings ? "✅" : "—"}</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.orbitalPeriodDays < 365 ? `${p.orbitalPeriodDays.toFixed(0)}d` : `${(p.orbitalPeriodDays / 365.25).toFixed(1)}yr`}</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>{p.radiusKm.toLocaleString()} km</td>
                  <td className="p-3 max-w-[200px] truncate" title={p.atmosphere} style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)" }}>{p.atmosphere.split("—")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fun facts quick section */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🧠 Quick Planet Facts</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {solarPlanets.map((p) => (
            <Link key={p.id} href={`/planets/${p.slug}`} className="flex gap-3 p-3 rounded-lg transition hover:-translate-y-0.5" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{p.name}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.funFacts[0]}</p>
                </div>
              </Link>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="flex flex-wrap gap-3 pb-4">
        {[
          { href: "/simulator", label: "🛰 Orbit Simulator" },
          { href: "/astrobot", label: "🤖 Ask AstroBot" },
          { href: "/learn/how-solar-system-works", label: "🌍 How Solar System Works" },
          { href: "/astronauts", label: "👨‍🚀 Astronauts" },
          { href: "/missions", label: "🚀 Missions" },
          { href: "/artifacts", label: "🪨 Moon Samples" },
          { href: "/learn/astrophysics", label: "⭐ Astrophysics" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>{l.label}</Link>
        ))}
      </section>
    </div>
  );
}
