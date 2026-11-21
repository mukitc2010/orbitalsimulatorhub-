import { useState, useMemo } from "react";
import { Link, useRoute } from "wouter";
import {
  ALL_ASTRONAUTS,
  getAstronautBySlug,
  formatSpaceTime,
  type Astronaut,
} from "../data/astronauts";
import { formatDisplayDate } from "../lib/formatDisplayDate";

type ReadingMode = "general" | "kids" | "research";

function formatDate(iso: string): string {
  return formatDisplayDate(iso, "long");
}

function formatMissionId(missionId: string): string {
  const parts = missionId.replace("mission_", "").split("_");
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

function getPrevNext(astronaut: Astronaut): { prev: Astronaut | null; next: Astronaut | null } {
  const idx = ALL_ASTRONAUTS.findIndex((a) => a.id === astronaut.id);
  return {
    prev: idx > 0 ? ALL_ASTRONAUTS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_ASTRONAUTS.length - 1 ? ALL_ASTRONAUTS[idx + 1] : null,
  };
}

export function AstronautProfile() {
  const [match, params] = useRoute<{ slug: string }>("/astronauts/:slug");
  const astronaut = match && params ? getAstronautBySlug(params.slug) : null;
  const [mode, setMode] = useState<ReadingMode>("general");

  const evaCount = useMemo(() => {
    if (!astronaut) return 0;
    return astronaut.missions.reduce((sum, m) => sum + m.eva.length, 0);
  }, [astronaut]);

  const { prev, next } = useMemo(
    () => (astronaut ? getPrevNext(astronaut) : { prev: null, next: null }),
    [astronaut]
  );

  if (!astronaut) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="headline mb-4" style={{ color: "var(--text-primary)" }}>
          Astronaut not found
        </h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          The astronaut you&apos;re looking for doesn&apos;t exist in our database.
        </p>
        <Link href="/astronauts">
          <a
            className="font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            ← Back to Astronaut Explorer
          </a>
        </Link>
      </div>
    );
  }

  const bioContent =
    mode === "general"
      ? astronaut.bioShort
      : mode === "kids"
        ? astronaut.kidsExplanation
        : astronaut.bioLong;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading mode toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { id: "general" as const, label: "General" },
            { id: "kids" as const, label: "Kids Mode 🧒" },
            { id: "research" as const, label: "Research Mode 🎓" },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className="px-4 py-2 rounded-lg font-medium transition"
            style={{
              backgroundColor: mode === id ? "var(--accent-primary)" : "var(--bg-surface)",
              color: mode === id ? "var(--text-on-accent)" : "var(--text-primary)",
              border: `1px solid ${mode === id ? "var(--accent-primary)" : "var(--border-color)"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Header */}
      <header
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          {astronaut.name}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span>{astronaut.nationality}</span>
          <span>·</span>
          <span>{astronaut.agency}</span>
          <span>·</span>
          <span>Born {formatDate(astronaut.birthDate)} in {astronaut.birthPlace}</span>
          {astronaut.deathDate && (
            <>
              <span>·</span>
              <span>Died {formatDate(astronaut.deathDate)}{astronaut.deathPlace ? ` in ${astronaut.deathPlace}` : ""}</span>
            </>
          )}
        </div>
      </header>

      {/* Quick stats */}
      <section
        className="rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {astronaut.missions.length}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Missions
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {formatSpaceTime(astronaut.totalSpaceTimeSeconds)}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            In Space
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {evaCount}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            EVAs
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {astronaut.firsts.length}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Firsts
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Biography
        </h2>
        <p
          className="leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {bioContent}
        </p>
      </section>

      {/* Missions timeline */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Missions Timeline
        </h2>
        <div className="relative pl-6 border-l-2" style={{ borderColor: "var(--border-color)" }}>
          {astronaut.missions.map((mission, i) => (
            <div key={mission.missionId} className="relative mb-6">
              <div
                className="absolute -left-[29px] w-3 h-3 rounded-full"
                style={{ backgroundColor: "var(--accent-primary)", top: 4 }}
              />
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <h3 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {formatMissionId(mission.missionId)}
                </h3>
                <div className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
                  {mission.role} · {formatDate(mission.launchDate)} – {formatDate(mission.landingDate)}
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Duration: {formatSpaceTime(mission.flightTimeSeconds)} · Destinations:{" "}
                  {mission.destinations.join(", ")}
                </div>
                {mission.eva.length > 0 && (
                  <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {mission.eva.length} EVA{mission.eva.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Moon Experience (if moonwalker) */}
      {astronaut.moonExperience?.isMoonwalker && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            🌕 Moon Experience
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "2px solid var(--accent-secondary)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Landing Site
                </div>
                <div style={{ color: "var(--text-primary)" }}>
                  {astronaut.moonExperience.landingSite}
                </div>
              </div>
              <div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Surface Time
                </div>
                <div style={{ color: "var(--text-primary)" }}>
                  {formatSpaceTime(astronaut.moonExperience.surfaceTimeSeconds)}
                </div>
              </div>
              <div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Collected Samples
                </div>
                <div style={{ color: "var(--text-primary)" }}>
                  {astronaut.moonExperience.didCollectSamples ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Deployed Experiments
                </div>
                <div style={{ color: "var(--text-primary)" }}>
                  {astronaut.moonExperience.didDeployExperiments ? "Yes" : "No"}
                </div>
              </div>
            </div>
            {astronaut.moonExperience.notes && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {astronaut.moonExperience.notes}
              </p>
            )}
          </div>
        </section>
      )}

      {/* What They Brought Back (if moonwalker) */}
      {astronaut.moonExperience?.isMoonwalker && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            What They Brought Back
          </h2>
          <Link href="/artifacts">
            <a
              className="inline-flex items-center gap-2 font-medium"
              style={{ color: "var(--accent-primary)" }}
            >
              View lunar samples and artifacts →
            </a>
          </Link>
        </section>
      )}

      {/* Fun Facts */}
      {astronaut.funFacts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Fun Facts
          </h2>
          <ul className="list-disc pl-6 space-y-2" style={{ color: "var(--text-secondary)" }}>
            {astronaut.funFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {astronaut.awards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Awards
          </h2>
          <ul className="list-disc pl-6 space-y-1" style={{ color: "var(--text-secondary)" }}>
            {astronaut.awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Research Notes (Research mode only) */}
      {mode === "research" && astronaut.researchNotes && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Research Notes
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {astronaut.researchNotes}
            </p>
          </div>
        </section>
      )}

      {/* Navigation */}
      <nav
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Link href="/astronauts">
          <a
            className="font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            ← Back to Astronaut Explorer
          </a>
        </Link>
        <div className="flex gap-4">
          {prev && (
            <Link href={`/astronauts/${prev.slug}`}>
              <a
                className="font-medium"
                style={{ color: "var(--accent-primary)" }}
              >
                ← {prev.name}
              </a>
            </Link>
          )}
          {next && (
            <Link href={`/astronauts/${next.slug}`}>
              <a
                className="font-medium"
                style={{ color: "var(--accent-primary)" }}
              >
                {next.name} →
              </a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
