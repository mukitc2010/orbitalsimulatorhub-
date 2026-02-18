import { Link, useRoute } from "wouter";
import { useState } from "react";
import {
  ALL_PLANETS,
  getPlanetBySlug,
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

function formatOrbitalPeriod(days: number): string {
  if (days >= 365) return `${(days / 365).toFixed(1)} years`;
  return `${days.toFixed(1)} days`;
}

function formatRotationPeriod(hours: number): string {
  if (hours >= 24) return `${(hours / 24).toFixed(1)} days`;
  return `${hours.toFixed(1)} hours`;
}

function getPrevNext(planet: Planet): { prev: Planet | null; next: Planet | null } {
  const idx = ALL_PLANETS.findIndex((p) => p.id === planet.id);
  return {
    prev: idx > 0 ? ALL_PLANETS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_PLANETS.length - 1 ? ALL_PLANETS[idx + 1] : null,
  };
}

type ReadingMode = "general" | "kids" | "research";

export function PlanetDetail() {
  const [match, params] = useRoute<{ slug: string }>("/planets/:slug");
  const planet = match && params ? getPlanetBySlug(params.slug) : null;
  const [mode, setMode] = useState<ReadingMode>("general");

  if (!planet) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Planet not found
        </h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          The planet you&apos;re looking for doesn&apos;t exist in our database.
        </p>
        <Link href="/planets">
          <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
            ← Back to Planet Hub
          </a>
        </Link>
      </div>
    );
  }

  const { prev, next } = getPrevNext(planet);

  const description =
    mode === "kids"
      ? planet.kidsExplanation
      : mode === "research"
        ? planet.researchNotes
        : planet.seoDescription;

  const tabs: { id: ReadingMode; label: string }[] = [
    { id: "general", label: "General" },
    { id: "kids", label: "Kids Mode 🧒" },
    { id: "research", label: "Research Mode 🎓" },
  ];

  const factItems = [
    { label: "Distance from Sun", value: formatDistanceKm(planet.distanceFromSunKm) },
    { label: "Distance from Earth", value: formatDistanceKm(planet.distanceFromEarthKm) },
    { label: "Orbital period", value: formatOrbitalPeriod(planet.orbitalPeriodDays) },
    { label: "Rotation period", value: formatRotationPeriod(planet.rotationPeriodHours) },
    { label: "Radius", value: `${planet.radiusKm.toLocaleString()} km` },
    { label: "Mass", value: planet.massKg },
    { label: "Gravity", value: formatGravity(planet.surfaceGravityG) },
    { label: "Temperature", value: `${planet.avgTemperatureC}°C` },
    { label: "Atmosphere", value: planet.atmosphere },
    { label: "Moons", value: planet.moons.toString() },
    { label: "Rings", value: planet.hasRings ? "Yes" : "No" },
    { label: "Human visited", value: planet.humanVisited ? "Yes" : "No" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading mode toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className="px-4 py-2 rounded-lg font-medium text-sm transition"
            style={{
              backgroundColor: mode === tab.id ? "var(--accent-primary)" : "var(--bg-surface)",
              color: mode === tab.id ? "var(--text-on-accent)" : "var(--text-secondary)",
              border: `1px solid ${mode === tab.id ? "var(--accent-primary)" : "var(--border-color)"}`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Planet header */}
      <header
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: `2px solid ${planet.color}`,
        }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-6xl sm:text-7xl">{planet.emoji}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {planet.name}
            </h1>
            <span
              className="inline-block px-3 py-1 rounded-lg text-sm font-medium capitalize"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: `1px solid ${planet.color}`,
              }}
            >
              {planet.type.replace("_", " ")}
            </span>
          </div>
        </div>
      </header>

      {/* Key facts grid */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Key Facts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factItems.map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-4"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </div>
              <div className="font-medium" style={{ color: "var(--text-primary)" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          {mode === "kids" ? "For Kids" : mode === "research" ? "Research Notes" : "Overview"}
        </h2>
        <div
          className="rounded-xl p-6 prose prose-sm max-w-none"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-secondary)",
          }}
        >
          <p className="leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Missions that visited */}
      {planet.missionsVisited.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Missions That Visited
          </h2>
          <ul
            className="rounded-xl p-6 space-y-2"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            {planet.missionsVisited.map((mission) => (
              <li key={mission} style={{ color: "var(--text-secondary)" }}>
                {mission}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Fun Facts */}
      {planet.funFacts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Fun Facts
          </h2>
          <ul
            className="rounded-xl p-6 list-disc pl-6 space-y-2"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            {planet.funFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interactive links */}
      <section
        className="rounded-xl p-6 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Explore More
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href={planet.simulatorLink}>
            <a
              className="px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--text-on-accent)",
              }}
            >
              Try Orbit Simulator →
            </a>
          </Link>
          <Link href="/astrobot">
            <a
              className="px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--accent-primary)",
                border: "1px solid var(--border-color)",
              }}
            >
              Ask AstroBot about {planet.name}
            </a>
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <nav
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Link href="/planets">
          <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
            ← Back to Planet Hub
          </a>
        </Link>
        <div className="flex gap-4">
          {prev && (
            <Link href={`/planets/${prev.slug}`}>
              <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
                ← {prev.name}
              </a>
            </Link>
          )}
          {next && (
            <Link href={`/planets/${next.slug}`}>
              <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
                {next.name} →
              </a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
