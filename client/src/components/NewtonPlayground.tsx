import { useState } from "react";
import { Link } from "wouter";

type Mode = "kid" | "advanced";

const BIG_FORMULAS = [
  {
    id: "first",
    number: "1️⃣",
    title: "First Law: Law of Inertia",
    formula: "F = 0 ⟹ v = constant",
    simple: "If nothing pushes or pulls → it keeps doing what it was doing.",
    examples: "Ball not touched stays still • Rolling ball keeps rolling • Satellite keeps orbiting",
    kidTitle: "Objects Keep Doing What They're Doing",
    kidExamples: [
      { title: "Ball Not Touched → Stays Still", body: "No Force = No Movement. The ball stays where it is!", emoji: "⚽" },
      { title: "Ball Rolling → Keeps Rolling", body: "Force Applied = Movement. Ball keeps rolling until friction stops it!", emoji: "⚽" },
    ],
    funFacts: ["Satellites Never Stop", "Space is Frictionless", "Astronauts in space are in free fall — constantly falling toward Earth but moving sideways so fast they keep missing it."],
  },
  {
    id: "second",
    number: "2️⃣",
    title: "Second Law: Force & Acceleration",
    formula: "F = m × a",
    vars: "F = Force (how hard you push), m = Mass (how heavy), a = Acceleration (how fast it speeds up)",
    simple: "Push light toy → moves fast. Push heavy sofa → moves slow.",
    examples: "Kicking a ball • Pushing a car • Satellite acceleration in orbit",
    kidTitle: "F = m × a (Force = Mass × Acceleration)",
    kidExamples: [
      { title: "Same Push, Light Toy → FAST Movement", body: "Light = Fast! Small mass, big acceleration", emoji: "🧸" },
      { title: "Same Push, Heavy Sofa → SLOW Movement", body: "Heavy = Slow! Large mass, small acceleration", emoji: "🛋️" },
    ],
    funFacts: ["Rocket Power: A rocket's engines push hot gas downward with huge force. The bigger the force, the faster the rocket accelerates!", "Heavy vs Light", "Space Station Speed"],
  },
  {
    id: "third",
    number: "3️⃣",
    title: "Third Law: Action & Reaction",
    formula: "F_action = -F_reaction",
    simple: "Every push has an equal push back. Jump on floor → floor pushes you up. Rocket pushes gas down → rocket goes up! 🚀",
    examples: "Swimming • Rocket thrust • Walking • Orbital mechanics",
    kidTitle: "Action = Reaction (Every Push Has an Equal Push Back)",
    kidExamples: [
      { title: "Jump: You Push Down → Floor Pushes You Up", body: "Person pushes down, floor pushes up. You jump up! 🎉", emoji: "👤" },
      { title: "Rocket: Pushes Gas Down → Rocket Goes Up 🚀", body: "Rocket pushes gas down, gas pushes rocket up. Rocket blasts off! 🌌", emoji: "🚀" },
    ],
    funFacts: ["Rocket Thrust: Rockets work by pushing gas downward. The gas pushes back on the rocket, sending it upward!", "Swimming in Space", "Satellite Collisions"],
  },
  {
    id: "gravity",
    number: "🌍",
    title: "Law of Universal Gravitation",
    formula: "F = G × m₁ × m₂ / r²",
    vars: "G = Gravity constant, m₁ m₂ = Masses of two objects, r = Distance between them",
    simple: "Bigger planets → stronger pull. Farther away → weaker pull.",
    examples: "Why apples fall 🍎 • Planet orbits • Satellite paths • Tides",
    kidTitle: "Gravity: Bigger Planet = Stronger Pull",
    kidExamples: [
      { title: "Small Planet → Weak Gravity", body: "Small = Weak Pull. You can jump high on the Moon!", emoji: "🌙" },
      { title: "Large Planet → Strong Gravity", body: "Large = Strong Pull. You're pulled down hard!", emoji: "🌍" },
    ],
    funFacts: ["Moon Gravity is only 1/6th of Earth's! Astronauts can jump 2 m on the Moon.", "Black Holes", "Tides from the Moon"],
  },
  {
    id: "orbit",
    number: "🛰️",
    title: "Orbital Speed Formula",
    formula: "v = √(GM / r)",
    simple: "How fast a satellite needs to move to stay in orbit. Higher orbits = slower speed.",
    examples: "Satellite speed • Planet motion • Escape velocity calculations",
    kidTitle: "Orbital Speed: Higher Orbit = Slower Speed",
    kidSpeeds: [
      { label: "LEO (Fast!)", value: "~7,900 m/s", emoji: "🛰️" },
      { label: "MEO (Medium)", value: "~3,900 m/s", emoji: "🛰️" },
      { label: "GEO (Slow)", value: "~3,070 m/s", emoji: "🛰️" },
    ],
    funFacts: ["GPS satellites orbit at 14,000 km/h and circle Earth twice per day!", "Geostationary Orbit", "Fastest Satellites"],
  },
];

const QUICK_REFERENCE = [
  { concept: "1st Law", formula: "F = 0 → v = constant", usedFor: "Inertia, satellites" },
  { concept: "2nd Law", formula: "F = ma", usedFor: "Forces, acceleration" },
  { concept: "3rd Law", formula: "F₁ = -F₂", usedFor: "Action-reaction pairs" },
  { concept: "Gravity", formula: "F = Gm₁m₂/r²", usedFor: "Planetary motion" },
  { concept: "Weight", formula: "W = mg", usedFor: "Gravitational force" },
  { concept: "Momentum", formula: "p = mv", usedFor: "Collisions, motion" },
  { concept: "Kinetic Energy", formula: "KE = ½mv²", usedFor: "Moving objects" },
  { concept: "Escape Velocity", formula: "v = √(2GM/r)", usedFor: "Rockets, space travel" },
];

const COOL_FACTS = [
  "Isaac Newton discovered these laws over 350 years ago, and they STILL work perfectly!",
  "He discovered gravity after seeing an apple fall from a tree. One apple changed science forever!",
  "All rockets use Newton's Third Law: push exhaust down → rocket goes up!",
  "GPS satellites use Newton's gravity formula to stay in the right orbit!",
  "The Moon orbits Earth using the same laws that keep satellites in orbit!",
];

export function NewtonPlayground() {
  const [mode, setMode] = useState<Mode>("kid");

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="headline">Newton's Formulas Playground</h1>
          <p className="subhead mt-1">All the math you need to understand satellites, gravity, and motion</p>
          <p className="text-sm text-slate-400 mt-2">Key idea: Newton&apos;s laws and gravity explain why satellites orbit and how rockets work. Use Kid Mode for simple language, Advanced for formulas.</p>
          <p className="text-xs text-[var(--accent-gold)] font-medium mt-1">🍎 One apple changed science forever — same laws run the ISS and your simulator.</p>
        </div>
        <div className="flex gap-2 rounded-xl border-2 border-slate-200 p-1 bg-slate-50">
          <button
            type="button"
            onClick={() => setMode("kid")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${mode === "kid" ? "bg-[var(--accent-cyan)] text-[#0f172a]" : "text-slate-600 hover:bg-slate-100"}`}
          >
            👶 Kid Mode (Simple)
          </button>
          <button
            type="button"
            onClick={() => setMode("advanced")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${mode === "advanced" ? "bg-[var(--accent-cyan)] text-[#0f172a]" : "text-slate-600 hover:bg-slate-100"}`}
          >
            🧪 Advanced Mode (Math)
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">The Big Formulas</h2>
        <div className="space-y-6">
          {BIG_FORMULAS.map((law) => (
            <article key={law.id} className="card-blueprint rounded-xl p-5 bg-white">
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <span className="text-2xl">{law.number}</span>
                <h3 className="font-bold text-lg text-slate-800">
                  {mode === "kid" && law.kidTitle ? law.kidTitle : law.title}
                </h3>
              </div>
              {(mode === "advanced" || !law.kidTitle) && (
                <p className="font-mono text-sm bg-slate-100 rounded-lg px-3 py-2 mb-2">{law.formula}</p>
              )}
              {law.vars && mode === "advanced" && (
                <p className="text-sm text-slate-600 mb-2">{law.vars}</p>
              )}
              <p className="text-slate-700 mb-3">{law.simple}</p>
              {law.examples && (
                <p className="text-xs text-slate-500 mb-3">Examples: {law.examples}</p>
              )}

              {mode === "kid" && law.kidExamples && (
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {law.kidExamples.map((ex, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 p-3 bg-slate-50">
                      <p className="font-medium text-slate-800 text-sm">{ex.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{ex.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {mode === "kid" && law.kidSpeeds && (
                <div className="flex flex-wrap gap-4 mb-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  {law.kidSpeeds.map((s, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-xl">{s.emoji}</span>
                      <span className="block font-medium text-slate-800 text-sm">{s.label}</span>
                      <span className="block font-mono text-sm text-[var(--accent-cyan)]">{s.value}</span>
                    </div>
                  ))}
                  <p className="text-xs text-slate-500 w-full mt-1">The farther from Earth, the slower the satellite must move to stay in orbit!</p>
                </div>
              )}

              {law.funFacts && law.funFacts.length > 0 && (
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Fun Facts 🌟</p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {law.funFacts.slice(0, 3).map((fact, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-slate-400">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-xs text-slate-400 mt-2">
                💡 Tip: Click on any fact to learn more!{" "}
                <Link href="/learn/formulas#quiz" className="text-[var(--accent-cyan)] hover:underline">Test your knowledge → Quiz</Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="calculators">
        <h2 className="text-lg font-bold text-slate-800 mb-2">🧮 Try the Calculators</h2>
        <p className="text-sm text-slate-600 mb-4">F = ma • Weight • Gravity • Orbit Speed</p>
      </section>

      <section id="reference" className="card-blueprint rounded-xl p-5 bg-white">
        <h2 className="font-bold text-lg text-slate-800 mb-4">📋 Quick Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 font-semibold text-slate-700">Concept</th>
                <th className="text-left py-2 font-semibold text-slate-700">Formula</th>
                <th className="text-left py-2 font-semibold text-slate-700">Used For</th>
              </tr>
            </thead>
            <tbody>
              {QUICK_REFERENCE.map((row, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 font-medium text-slate-800">{row.concept}</td>
                  <td className="py-2 font-mono text-slate-700">{row.formula}</td>
                  <td className="py-2 text-slate-600">{row.usedFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-blueprint-pink rounded-xl p-5 bg-white">
        <h2 className="font-bold text-lg text-slate-800 mb-4">🎉 Cool Facts About Newton</h2>
        <ul className="space-y-3 text-slate-700">
          {COOL_FACTS.map((fact, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-lg">{["📚", "🍎", "🚀", "🛰️", "🌙"][i]}</span>
              {fact}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
