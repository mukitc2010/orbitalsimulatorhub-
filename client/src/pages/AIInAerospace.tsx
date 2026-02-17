import { Link } from "wouter";

const SECTIONS = [
  { id: "sat-nav", icon: "🛰", title: "AI for satellite navigation", desc: "Autonomous orbit determination, collision avoidance, and station-keeping." },
  { id: "autonomous", icon: "🤖", title: "Autonomous spacecraft", desc: "Spacecraft that make decisions without constant ground contact." },
  { id: "mission-planning", icon: "📋", title: "AI mission planning", desc: "Optimizing trajectories, launch windows, and resource allocation." },
  { id: "robotics", icon: "🦾", title: "Space robotics", desc: "Rovers, arms, and robots that see, plan, and act in space." },
  { id: "anomaly", icon: "⚠", title: "AI anomaly detection", desc: "Predicting and diagnosing failures before they happen." },
  { id: "nasa-spacex", icon: "🚀", title: "AI in NASA & SpaceX", desc: "How NASA and SpaceX use AI in launch, landing, and operations." },
  { id: "mars", icon: "🔴", title: "AI for Mars missions", desc: "Mars rovers, helicopters, and future crewed mission support." },
  { id: "data-ml", icon: "📊", title: "Space data analysis with ML", desc: "Image recognition, telemetry analysis, and scientific discovery." },
];

export function AIInAerospace() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">🤖 How AI is Transforming Aerospace</h1>
        <p className="subhead">
          Artificial Intelligence is now the brain of modern space systems.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-violet-50 to-slate-50 border-2 border-[var(--accent-gold)]/60 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Why this page matters</h2>
        <p className="text-slate-700 mb-3">
          Artificial Intelligence is revolutionizing aerospace and space exploration.
        </p>
        <p className="text-slate-700 font-medium mb-2">AI helps:</p>
        <ul className="text-slate-700 space-y-1 list-disc pl-5">
          <li>Control satellites automatically</li>
          <li>Predict spacecraft failures</li>
          <li>Navigate Mars rovers</li>
          <li>Analyze space images</li>
          <li>Plan deep space missions</li>
          <li>Optimize rocket design</li>
        </ul>
        <p className="text-slate-700 mt-3">
          Future spacecraft will be fully AI-driven.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Sections</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-gold)]/50 bg-white p-5 shadow-sm hover:border-[var(--accent-gold)]/80 transition"
            >
              <span className="text-2xl block mb-2">{s.icon}</span>
              <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-700">
        <p className="mb-2">
          <strong>Explore more:</strong>{" "}
          <Link href="/learn/how-mars-rovers-work"><a className="text-[var(--accent-cyan)] hover:underline">How Mars rovers work</a></Link>
          {" · "}
          <Link href="/learn/how-spacex-lands-rockets"><a className="text-[var(--accent-cyan)] hover:underline">How SpaceX lands rockets</a></Link>
          {" · "}
          <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot (AI)</a></Link>
          {" · "}
          <Link href="/research"><a className="text-[var(--accent-cyan)] hover:underline">Research hub</a></Link>
        </p>
      </div>
    </div>
  );
}
