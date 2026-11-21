import { Link } from "wouter";

const CAREERS = [
  {
    id: "nasa-engineer",
    icon: "🔧",
    title: "NASA engineer",
    short: "Aerospace, systems, software, or mission design.",
    bullets: [
      "Degree in aerospace, mechanical, electrical, or computer engineering (or physics).",
      "Internships at NASA (OSSI), JPL, or aerospace companies.",
      "US citizenship required for most NASA civil service positions.",
      "Pathways Program and contractor roles are common entry points.",
    ],
  },
  {
    id: "astronaut",
    icon: "👨‍🚀",
    title: "Astronaut",
    short: "Pilots, mission specialists, and now commercial crew.",
    bullets: [
      "NASA: STEM degree + 3+ years experience or 1,000+ hours jet pilot-in-command.",
      "Physical and psychological screening; US citizenship.",
      "SpaceX/Commercial: Varies; often test pilots or specialists.",
      "International partners (ESA, JAXA, etc.) have their own selection.",
    ],
  },
  {
    id: "space-scientist",
    icon: "🔬",
    title: "Space scientist",
    short: "Planetary science, astrophysics, Earth science, instrumentation.",
    bullets: [
      "PhD common for research roles; master's for applied or support.",
      "Postdocs and fellowships at NASA centers, universities, or APL.",
      "Proposal writing and publication record matter.",
      "Mission teams (rovers, telescopes, ISS science) hire scientists.",
    ],
  },
  {
    id: "ai-space-engineer",
    icon: "🤖",
    title: "AI space engineer",
    short: "Autonomy, ML, computer vision, and mission planning.",
    bullets: [
      "CS, robotics, or aerospace with focus on autonomy and ML.",
      "Skills: Python, C++, computer vision, reinforcement learning, GNC.",
      "NASA AI roles (e.g. autonomous systems, Mars rovers); SpaceX, Blue Origin, startups.",
      "Growing demand for AI in navigation, anomaly detection, and mission planning.",
    ],
  },
];

export function SpaceCareers() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">👨‍🚀 Space Career Guide</h1>
        <p className="subhead">
          How to become a NASA engineer, astronaut, space scientist, or AI space engineer.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-slate-50 border-2 border-indigo-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Your path to space</h2>
        <p className="text-slate-700">
          Space careers span engineering, science, piloting, and AI. Below are practical steps and requirements for roles at NASA, SpaceX, and other space agencies and companies.
        </p>
      </div>

      <section className="space-y-6">
        {CAREERS.map((c) => (
          <div
            key={c.id}
            id={c.id}
            className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm"
          >
            <span className="text-3xl block mb-2">{c.icon}</span>
            <h2 className="text-xl font-bold text-slate-800 mb-1">How to become a {c.title}</h2>
            <p className="text-slate-600 mb-4">{c.short}</p>
            <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
              {c.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-700">
        <p className="mb-2">
          <strong>Learn more:</strong>{" "}
          <Link href="/learn/aerospace" className="text-[var(--accent-cyan)] hover:underline">Aerospace reference</Link>
          {" · "}
          <Link href="/ai-in-aerospace" className="text-[var(--accent-cyan)] hover:underline">AI in Aerospace</Link>
          {" · "}
          <Link href="/research" className="text-[var(--accent-cyan)] hover:underline">Research hub</Link>
          {" · "}
          <Link href="/astrobot" className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot</Link>
        </p>
        <p className="text-xs text-slate-500">
          Official hiring: <a href="https://www.usajobs.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">USAJobs (NASA)</a>, <a href="https://www.nasa.gov/careers" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">nasa.gov/careers</a>, <a href="https://www.spacex.com/careers" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">SpaceX careers</a>.
        </p>
      </div>
    </div>
  );
}
