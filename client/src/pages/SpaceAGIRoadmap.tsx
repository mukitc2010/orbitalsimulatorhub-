import { Link } from "wouter";

export function SpaceAGIRoadmap() {
  const phases = [
    {
      period: "2025–2030",
      title: "AI Satellites & Autonomous Navigation",
      items: [
        "AI-powered orbit correction",
        "Autonomous collision avoidance",
        "Predictive navigation under delay",
        "Space traffic management AI",
      ],
    },
    {
      period: "2030–2040",
      title: "Mars Autonomous Missions & AI Mission Control",
      items: [
        "Mars rover autonomy",
        "AI mission planning",
        "Autonomous sample return",
        "Human-Mars AI collaboration",
      ],
    },
    {
      period: "2040–2060",
      title: "Self-Repair Spacecraft & Swarm Exploration",
      items: [
        "Self-repair satellites",
        "Swarm exploration",
        "AI space stations",
        "Interplanetary internet",
      ],
    },
    {
      period: "2060+",
      title: "Interstellar Probes & Space AGI Systems",
      items: [
        "Interstellar probes",
        "Space AGI systems",
        "Autonomous deep-space missions",
        "Beyond solar system",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Vision</p>
        <h1 className="headline">Space-AGI Roadmap</h1>
        <p className="subhead max-w-2xl">
          The timeline from AI satellites to interstellar probes. Real engineering future — not fantasy.
        </p>
      </div>

      <div className="space-y-8">
        {phases.map((phase, i) => (
          <section
            key={phase.period}
            className="rounded-xl border-2 p-6"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold" style={{ color: "var(--accent-cyan)" }}>{phase.period}</span>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{phase.title}</h2>
            </div>
            <ul className="space-y-2">
              {phase.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-cyan)" }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
