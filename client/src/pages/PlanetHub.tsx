import { Link } from "wouter";
import {
  getSolarSystemPlanets,
  type Planet,
} from "../data/planets";

function formatDistanceKm(km: number): string {
  if (km >= 1_000_000_000) return `${(km / 1_000_000_000).toFixed(2)}B km`;
  if (km >= 1_000_000) return `${(km / 1_000_000).toFixed(1)}M km`;
  if (km >= 1_000) return `${(km / 1_000).toFixed(1)}K km`;
  return `${km} km`;
}

function formatGravity(g: number): string {
  return `${g.toFixed(2)}g`;
}

const solarPlanets = getSolarSystemPlanets();

export function PlanetHub() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero */}
      <section className="hero-gradient rounded-2xl px-6 py-12 sm:py-14 text-center">
        <h1 className="headline mb-3">Planet Study Hub — Explore Our Solar System</h1>
        <p className="subhead max-w-2xl mx-auto text-lg">
          Discover real NASA data for every planet: distance, gravity, temperature, moons, and missions. Compare stats and dive into orbital mechanics.
        </p>
      </section>

      {/* Solar System visual */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Solar System in Order
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-4 px-2">
          <span className="text-2xl sm:text-3xl" title="Sun">☀️</span>
          {solarPlanets.map((planet) => (
            <Link key={planet.id} href={`/planets/${planet.slug}`}>
              <a
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition min-w-[4rem]"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "2px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = planet.color;
                  e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.backgroundColor = "var(--bg-card)";
                }}
              >
                <span className="text-2xl sm:text-3xl">{planet.emoji}</span>
                <span className="text-xs font-medium truncate max-w-full">{planet.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Planet grid */}
      <section>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Planet Cards
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solarPlanets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Compare All 8 Planets
        </h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border-color)" }}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--bg-surface)" }}>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Planet</th>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Distance from Sun</th>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Gravity</th>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Temperature</th>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Moons</th>
                <th className="text-left p-3 font-semibold" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>Rings</th>
              </tr>
            </thead>
            <tbody>
              {solarPlanets.map((planet, i) => (
                <tr
                  key={planet.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                    <span className="mr-2">{planet.emoji}</span>
                    <Link href={`/planets/${planet.slug}`}>
                      <a className="font-medium hover:underline" style={{ color: "var(--accent-primary)" }}>
                        {planet.name}
                      </a>
                    </Link>
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                    {formatDistanceKm(planet.distanceFromSunKm)}
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                    {formatGravity(planet.surfaceGravityG)}
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                    {planet.avgTemperatureC}°C
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                    {planet.moons}
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                    {planet.hasRings ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick links */}
      <section
        className="rounded-xl p-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Quick Links
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/simulator">
            <a
              className="px-4 py-2 rounded-lg font-medium transition"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--text-on-accent)",
              }}
            >
              Orbit Simulator →
            </a>
          </Link>
          <Link href="/astrobot">
            <a
              className="px-4 py-2 rounded-lg font-medium transition"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            >
              Ask AstroBot →
            </a>
          </Link>
          <Link href="/learn/how-solar-system-works">
            <a
              className="px-4 py-2 rounded-lg font-medium transition"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            >
              How Solar System Works →
            </a>
          </Link>
          <Link href="/missions">
            <a
              className="px-4 py-2 rounded-lg font-medium transition"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            >
              Missions →
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

function PlanetCard({ planet }: { planet: Planet }) {
  return (
    <div
      className="rounded-xl p-6 transition"
      style={{
        backgroundColor: "var(--bg-card)",
        border: `2px solid ${planet.color}`,
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">{planet.emoji}</span>
        <div>
          <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {planet.name}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded capitalize"
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
          >
            {planet.type.replace("_", " ")}
          </span>
        </div>
      </div>
      <ul className="space-y-1.5 text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        <li>Distance: {formatDistanceKm(planet.distanceFromSunKm)}</li>
        <li>Gravity: {formatGravity(planet.surfaceGravityG)}</li>
        <li>Temp: {planet.avgTemperatureC}°C</li>
        <li>Moons: {planet.moons}</li>
      </ul>
      <div className="flex flex-wrap gap-2 mb-4">
        {planet.hasRings && (
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: "var(--accent-secondary)",
              color: "var(--text-on-accent)",
            }}
          >
            Has rings
          </span>
        )}
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-secondary)",
          }}
        >
          Human visited: {planet.humanVisited ? "✅" : "❌"}
        </span>
      </div>
      <Link href={`/planets/${planet.slug}`}>
        <a
          className="inline-flex items-center gap-1 font-medium text-sm"
          style={{ color: "var(--accent-primary)" }}
        >
          Explore →
        </a>
      </Link>
    </div>
  );
}
