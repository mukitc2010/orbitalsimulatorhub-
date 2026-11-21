import { Link, useRoute } from "wouter";
import {
  ALL_MISSIONS,
  getMissionBySlug,
  type Mission,
} from "../data/missions";
import { ALL_ASTRONAUTS } from "../data/astronauts";
import { formatSpaceTime } from "../data/astronauts";
import { formatDisplayDate } from "../lib/formatDisplayDate";

function formatDate(iso: string): string {
  return formatDisplayDate(iso, "long");
}

function formatSurfaceTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const h = hours % 24;
    return `${days}d ${h}h ${mins}m`;
  }
  return `${hours}h ${mins}m`;
}

function getPrevNext(mission: Mission): { prev: Mission | null; next: Mission | null } {
  const idx = ALL_MISSIONS.findIndex((m) => m.id === mission.id);
  return {
    prev: idx > 0 ? ALL_MISSIONS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_MISSIONS.length - 1 ? ALL_MISSIONS[idx + 1] : null,
  };
}

export function MissionDetail() {
  const [match, params] = useRoute<{ slug: string }>("/missions/:slug");
  const mission = match && params ? getMissionBySlug(params.slug) : null;
  const { prev, next } = mission ? getPrevNext(mission) : { prev: null, next: null };

  if (!mission) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Mission not found
        </h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          The mission you&apos;re looking for doesn&apos;t exist in our database.
        </p>
        <Link href="/missions" className="font-medium" style={{ color: "var(--accent-primary)" }}>
            ← Back to Missions
          </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {mission.name}
          </h1>
          <span
            className="px-3 py-1 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: "var(--accent-secondary)",
              color: "var(--text-primary)",
            }}
          >
            {mission.program}
          </span>
        </div>
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {mission.agency} · {mission.destinations.join(", ")}
        </div>
      </header>

      {/* Launch & Landing */}
      <section
        className="rounded-xl p-6 mb-6 grid sm:grid-cols-2 gap-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>
            Launch
          </h3>
          <div style={{ color: "var(--text-primary)" }}>{formatDate(mission.launch.date)}</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {mission.launch.site}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {mission.launch.vehicle}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>
            Landing
          </h3>
          <div style={{ color: "var(--text-primary)" }}>{formatDate(mission.landing.date)}</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {mission.landing.site}
          </div>
        </div>
      </section>

      {/* Crew */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Crew
        </h2>
        <div className="flex flex-wrap gap-4">
          {mission.crew.map((member) => {
            const astronaut = ALL_ASTRONAUTS.find((a) => a.id === member.astronautId);
            return (
              <Link key={member.astronautId} href={astronaut ? `/astronauts/${astronaut.slug}` : "#"} className="block rounded-lg px-4 py-3 transition"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.color = "var(--accent-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}>
                  <span className="font-medium">{astronaut?.name ?? member.astronautId}</span>
                  <span className="block text-sm" style={{ color: "var(--text-muted)" }}>
                    {member.role}
                  </span>
                </Link>
            );
          })}
        </div>
      </section>

      {/* Surface Operations (lunar missions) */}
      {mission.surfaceOps && (
        <section
          className="rounded-xl p-6 mb-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px solid var(--accent-secondary)",
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            🌕 Surface Operations
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Landing Site
              </div>
              <div style={{ color: "var(--text-primary)" }}>
                {mission.surfaceOps.landingSite}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Time on Surface
              </div>
              <div style={{ color: "var(--text-primary)" }}>
                {formatSurfaceTime(mission.surfaceOps.surfaceTimeSeconds)}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
              Moonwalkers
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.surfaceOps.moonwalkers.map((id) => {
                const astronaut = ALL_ASTRONAUTS.find((a) => a.id === id);
                return astronaut ? (
                  <Link key={id} href={`/astronauts/${astronaut.slug}`} className="px-3 py-1 rounded font-medium"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        color: "var(--accent-primary)",
                        border: "1px solid var(--border-color)",
                      }}>
                      {astronaut.name}
                    </Link>
                ) : (
                  <span key={id} style={{ color: "var(--text-secondary)" }}>{id}</span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Landing Site Geology */}
      {mission.surfaceOps?.geology && (
        <section
          className="rounded-xl p-6 mb-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            🪨 Landing Site Geology
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {mission.surfaceOps.geology}
          </p>
          <Link href="/learn/lunar-geology" className="inline-block mt-3 text-sm font-semibold" style={{ color: "var(--accent-primary)" }}>
              Read full Lunar Geology guide →
            </Link>
        </section>
      )}

      {/* Samples Returned */}
      {mission.samplesReturnedKg != null && mission.samplesReturnedKg > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Samples Returned
          </h2>
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <span className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
              {mission.samplesReturnedKg} kg
            </span>
            <span className="ml-2" style={{ color: "var(--text-secondary)" }}>
              of lunar samples
            </span>
            <Link href="/artifacts" className="block mt-2 font-medium"
                style={{ color: "var(--accent-primary)" }}>
                View all samples brought from space →
              </Link>
          </div>
        </section>
      )}

      {/* Highlights */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Highlights
        </h2>
        <ul className="list-disc pl-6 space-y-2" style={{ color: "var(--text-secondary)" }}>
          {mission.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      {/* Navigation */}
      <nav
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Link href="/missions" className="font-medium" style={{ color: "var(--accent-primary)" }}>
            ← Back to Missions
          </Link>
        <div className="flex gap-4">
          {prev && (
            <Link href={`/missions/${prev.slug}`} className="font-medium" style={{ color: "var(--accent-primary)" }}>
                ← {prev.name}
              </Link>
          )}
          {next && (
            <Link href={`/missions/${next.slug}`} className="font-medium" style={{ color: "var(--accent-primary)" }}>
                {next.name} →
              </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
