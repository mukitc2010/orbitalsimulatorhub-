import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  ALL_ASTRONAUTS,
  MOONWALKERS,
  formatSpaceTime,
  type Astronaut,
} from "../data/astronauts";

function getFlagEmoji(nationality: string): string {
  if (nationality.includes("United States")) return "🇺🇸";
  if (nationality.includes("Soviet")) return "🇷🇺";
  if (nationality.includes("Canada")) return "🇨🇦";
  return "🌍";
}

function formatMissionId(missionId: string): string {
  const parts = missionId.replace("mission_", "").split("_");
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

export function AstronautExplorer() {
  const [filter, setFilter] = useState<"all" | "moonwalkers" | "nasa" | "international">("all");
  const [search, setSearch] = useState("");

  const filteredAstronauts = useMemo(() => {
    let list: Astronaut[] = [];
    if (filter === "all") list = ALL_ASTRONAUTS;
    else if (filter === "moonwalkers") list = MOONWALKERS;
    else if (filter === "nasa") list = ALL_ASTRONAUTS.filter((a) => a.agency === "NASA");
    else list = ALL_ASTRONAUTS.filter((a) => a.agency !== "NASA");

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.givenName.toLowerCase().includes(q) ||
          a.familyName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  const totalMissions = useMemo(
    () => ALL_ASTRONAUTS.reduce((sum, a) => sum + a.missions.length, 0),
    []
  );
  const countries = useMemo(
    () => new Set(ALL_ASTRONAUTS.map((a) => a.nationality)).size,
    []
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <section className="hero-gradient rounded-2xl px-6 py-12 text-center mb-8">
        <h1 className="headline mb-2" style={{ color: "var(--text-primary)" }}>
          Astronaut Explorer Database
        </h1>
        <p className="subhead text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          The world&apos;s largest interactive astronaut database. Explore every human who has ventured beyond Earth.
        </p>
      </section>

      {/* Stats bar */}
      <section
        className="rounded-xl p-4 mb-6 flex flex-wrap gap-6 justify-center"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {ALL_ASTRONAUTS.length}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Total Astronauts
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            12
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Moonwalkers
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {totalMissions}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Total Missions
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {countries}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Countries
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "moonwalkers", "nasa", "international"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg font-medium transition"
            style={{
              backgroundColor: filter === f ? "var(--accent-primary)" : "var(--bg-surface)",
              color: filter === f ? "var(--text-on-accent)" : "var(--text-primary)",
              border: `1px solid ${filter === f ? "var(--accent-primary)" : "var(--border-color)"}`,
            }}
          >
            {f === "all" ? "All" : f === "moonwalkers" ? "Moonwalkers" : f === "nasa" ? "U.S. Space Agency" : "International"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
          }}
        />
      </div>

      {/* Astronaut grid */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Astronauts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAstronauts.map((astronaut) => (
            <div
              key={astronaut.id}
              className="rounded-xl p-5 transition"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
                {astronaut.name}
              </h3>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent-primary) 15%, transparent)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {astronaut.agency}
                </span>
                <span className="text-lg">{getFlagEmoji(astronaut.nationality)}</span>
                {astronaut.moonExperience?.isMoonwalker && (
                  <span title="Moon walker">🌕</span>
                )}
              </div>
              <div className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                {astronaut.missions.length} mission{astronaut.missions.length !== 1 ? "s" : ""} ·{" "}
                {formatSpaceTime(astronaut.totalSpaceTimeSeconds)} in space
              </div>
              <Link href={`/astronauts/${astronaut.slug}`} className="text-sm font-medium"
                  style={{ color: "var(--accent-primary)" }}>
                  View Profile →
                </Link>
            </div>
          ))}
        </div>
        {filteredAstronauts.length === 0 && (
          <p style={{ color: "var(--text-muted)" }}>No astronauts match your filters.</p>
        )}
      </section>

      {/* Moon Explorers section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🌕 Moon Explorers
        </h2>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          All 12 humans who have walked on the Moon, from Apollo 11 (1969) to Apollo 17 (1972).
        </p>
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px solid var(--accent-secondary)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOONWALKERS.map((astronaut) => (
              <div
                key={astronaut.id}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <h3 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {astronaut.name}
                </h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {astronaut.missions
                    .filter((m) => m.isMoonMission)
                    .map((m) => (
                      <span
                        key={m.missionId}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--accent-secondary) 20%, transparent)",
                          color: "var(--accent-secondary)",
                        }}
                      >
                        {formatMissionId(m.missionId)}
                      </span>
                    ))}
                </div>
                <Link href={`/astronauts/${astronaut.slug}`} className="text-sm font-medium"
                    style={{ color: "var(--accent-primary)" }}>
                    View Profile →
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className="prose max-w-none" style={{ color: "var(--text-secondary)" }}>
        <p className="text-sm leading-relaxed">
          The Astronaut Explorer Database is a comprehensive resource for space enthusiasts, students, and researchers.
          It includes detailed profiles of every astronaut who has flown in space, from Yuri Gagarin&apos;s historic first orbit
          in 1961 to the International Space Station crews of today. Explore mission timelines, moonwalk experiences,
          awards, and fun facts. Use filters to find U.S. space agency astronauts, international space agency crew members, or the
          exclusive group of 12 moonwalkers who set foot on the lunar surface between 1969 and 1972.
        </p>
      </section>
    </div>
  );
}
