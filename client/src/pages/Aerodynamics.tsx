import { Link } from "wouter";

const TOPICS = [
  { id: "lift-drag", title: "Lift, drag, thrust, weight", desc: "The four forces of flight and how they govern aircraft and spacecraft." },
  { id: "bernoulli", title: "Bernoulli principle", desc: "How pressure and speed relate in fluids — the basis of wing lift." },
  { id: "supersonic", title: "Supersonic & hypersonic flight", desc: "Beyond the sound barrier: shock waves, heating, and extreme speeds." },
  { id: "reentry", title: "Re-entry physics", desc: "Why spacecraft heat up when returning to Earth and how heat shields work." },
  { id: "rocket-aero", title: "Rocket aerodynamics", desc: "How rockets behave in atmosphere: stability, drag, and max-Q." },
  { id: "shuttle", title: "Space shuttle design", desc: "Orbiter aerodynamics, glide return, and landing like a plane." },
  { id: "heat-shield", title: "Heat shield science", desc: "Ablative and thermal protection systems for re-entry." },
  { id: "cfd", title: "CFD (Computational Fluid Dynamics)", desc: "Simulating airflow and heating with computers — NASA and industry tools." },
];

export function Aerodynamics() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">✈ Aerodynamics & Space Flight</h1>
        <p className="subhead">
          Understand how air and motion affect aircraft, rockets, and spacecraft.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-sky-50 to-slate-50 border-2 border-sky-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Why aerodynamics matters in space</h2>
        <p className="text-slate-700 mb-3">
          Aerodynamics is the science of how objects move through air and space.
          From airplane wings to rockets leaving Earth, aerodynamic forces control motion, stability, and fuel efficiency.
        </p>
        <p className="text-slate-700 font-medium">
          In this section you will learn:
        </p>
        <ul className="text-slate-700 mt-2 space-y-1 list-disc pl-5">
          <li>How rockets survive extreme speeds</li>
          <li>Why spacecraft heat during re-entry</li>
          <li>How NASA designs efficient vehicles</li>
          <li>How AI optimizes aerodynamic design</li>
        </ul>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-5 shadow-sm hover:border-[var(--accent-cyan)]/80 transition"
            >
              <h3 className="font-bold text-slate-800 mb-2">{t.title}</h3>
              <p className="text-sm text-slate-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-700">
        <p className="mb-2">
          <strong>Go deeper:</strong>{" "}
          <Link href="/learn/aerospace"><a className="text-[var(--accent-cyan)] hover:underline">Aerospace & NASA reference</a></Link>
          {" · "}
          <Link href="/learn/how-nasa-launches-satellite"><a className="text-[var(--accent-cyan)] hover:underline">How NASA launches</a></Link>
          {" · "}
          <Link href="/learn/how-spacex-lands-rockets"><a className="text-[var(--accent-cyan)] hover:underline">How SpaceX lands rockets</a></Link>
          {" · "}
          <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot</a></Link>
        </p>
      </div>
    </div>
  );
}
