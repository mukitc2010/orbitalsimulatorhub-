import { Link } from "wouter";
import {
  ALL_ARTIFACTS,
  getArtifactsByOrigin,
  getTotalLunarSampleMass,
  type Artifact,
} from "../data/artifacts";
import { ALL_MISSIONS } from "../data/missions";

const MISSION_YEAR_OVERRIDES: Record<string, number> = {
  hayabusa2: 2020,
  "osiris-rex": 2023,
  stardust: 2006,
};

function getArtifactYear(artifact: Artifact): number {
  if (MISSION_YEAR_OVERRIDES[artifact.missionId]) {
    return MISSION_YEAR_OVERRIDES[artifact.missionId];
  }
  const mission = ALL_MISSIONS.find((m) => m.id === artifact.missionId);
  if (mission) {
    return new Date(mission.launch.date).getFullYear();
  }
  return 0;
}

function getMissionForArtifact(artifact: Artifact) {
  return ALL_MISSIONS.find((m) => m.id === artifact.missionId);
}

export function BroughtFromSpace() {
  const moonSamples = getArtifactsByOrigin("moon");
  const asteroidSamples = ALL_ARTIFACTS.filter((a) =>
    ["Ryugu", "Bennu"].includes(a.originBody)
  );
  const cometSamples = getArtifactsByOrigin("wild 2");
  const totalLunar = getTotalLunarSampleMass();
  const apolloCount = moonSamples.length;
  const asteroidCount = asteroidSamples.length;
  const cometCount = cometSamples.length;

  const timelineItems = [...ALL_ARTIFACTS]
    .map((a) => ({ artifact: a, year: getArtifactYear(a) }))
    .filter((t) => t.year > 0)
    .sort((a, b) => a.year - b.year);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          What Humans Brought Back From Space
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Over 382 kg of Moon rocks, asteroid grains, and comet dust — the most precious
          samples ever collected from beyond Earth. Each gram tells a story of our solar
          system&apos;s origins, from the Apollo landings to the latest robotic sample returns.
        </p>
      </section>

      {/* Stats bar */}
      <section
        className="rounded-xl p-6 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {totalLunar.toFixed(1)} kg
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            From the Moon
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {apolloCount}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Apollo Missions
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {asteroidCount}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Asteroid Samples
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
            {cometCount}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Comet Samples
          </div>
        </div>
      </section>

      {/* Moon Samples */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          🌕 Moon Samples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {moonSamples.map((artifact) => {
            const mission = getMissionForArtifact(artifact);
            return (
              <div
                key={artifact.id}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {artifact.label}
                  </h3>
                  <span
                    className="font-bold text-lg"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {artifact.massKg} kg
                  </span>
                </div>
                {mission && (
                  <Link href={`/missions/${mission.slug}`}>
                    <a
                      className="text-sm font-medium mb-3 block"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {mission.name} →
                    </a>
                  </Link>
                )}
                <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                  {artifact.types.join(", ")}
                </div>
                {artifact.whyItMatters.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                      Why it matters
                    </div>
                    <ul className="list-disc pl-4 text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                      {artifact.whyItMatters.slice(0, 2).map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {artifact.scientificFindings.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                      Scientific findings
                    </div>
                    <ul className="list-disc pl-4 text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                      {artifact.scientificFindings.slice(0, 2).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Asteroid Samples */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          ☄️ Asteroid Samples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {asteroidSamples.map((artifact) => (
            <div
              key={artifact.id}
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {artifact.label}
                </h3>
                <span
                  className="font-bold"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {artifact.massKg < 0.01
                    ? `${(artifact.massKg * 1000).toFixed(2)} g`
                    : `${artifact.massKg} kg`}
                </span>
              </div>
              <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                From {artifact.originBody} · {artifact.types.join(", ")}
              </div>
              {artifact.whyItMatters.length > 0 && (
                <ul className="list-disc pl-4 text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                  {artifact.whyItMatters.slice(0, 2).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comet Samples */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          💫 Comet Samples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cometSamples.map((artifact) => (
            <div
              key={artifact.id}
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {artifact.label}
                </h3>
                <span
                  className="font-bold"
                  style={{ color: "var(--accent-primary)" }}
                >
                  ~{artifact.massKg < 0.01 ? "1 mg" : `${artifact.massKg} kg`}
                </span>
              </div>
              <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                From Comet {artifact.originBody} · {artifact.types.join(", ")}
              </div>
              {artifact.whyItMatters.length > 0 && (
                <ul className="list-disc pl-4 text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                  {artifact.whyItMatters.slice(0, 2).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section
        className="rounded-xl p-6 mb-12"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Why It Matters
        </h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          The samples returned from the Moon, asteroids, and comets have revolutionized our
          understanding of the solar system. Lunar rocks revealed the Moon&apos;s origins, proved
          the magma ocean hypothesis, and showed that the Moon and Earth share a common
          ancestry. Asteroid samples from Ryugu and Bennu contain organic-rich material that
          may have seeded life on Earth. Comet dust from Wild 2 challenged our models of
          how the solar system formed. These samples are still being studied today—and 75%
          of the OSIRIS-REx Bennu material is preserved for future generations with
          technologies we haven&apos;t yet invented.
        </p>
        <p style={{ color: "var(--text-secondary)" }}>
          Every sample represents a piece of human achievement: the courage of Apollo
          astronauts, the precision of robotic missions, and the decades of scientific
          labor that turn rocks into knowledge.
        </p>
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Timeline
        </h2>
        <div className="relative pl-6 border-l-2" style={{ borderColor: "var(--border-color)" }}>
          {timelineItems.map(({ artifact, year }) => (
            <div key={artifact.id} className="relative mb-6">
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
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="font-bold text-lg"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {year}
                  </span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                    {artifact.label}
                  </span>
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {artifact.originBody} · {artifact.massKg < 0.01
                    ? `${(artifact.massKg * 1000).toFixed(2)} g`
                    : `${artifact.massKg} kg`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future */}
      <section
        className="rounded-xl p-6 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "2px solid var(--accent-secondary)",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Coming Soon
        </h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          The next era of sample return is already underway. NASA&apos;s Mars Sample Return
          mission aims to bring the first rocks from Mars back to Earth. China&apos;s Chang&apos;e-6
          returned samples from the Moon&apos;s far side in 2024. Japan&apos;s MMX mission will
          return samples from Phobos, one of Mars&apos;s moons. Europa Clipper and future missions
          may one day bring ice from Europa&apos;s subsurface ocean. The story of what humans
          bring back from space is still being written.
        </p>
      </section>

      {/* Back link */}
      <div className="pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
        <Link href="/missions">
          <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
            ← Explore Missions
          </a>
        </Link>
      </div>
    </div>
  );
}
