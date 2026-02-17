import { useState } from "react";
import { Link } from "wouter";

type TopicSection = { heading: string; bullets?: string[]; text?: string };

const TOPICS: {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  sections: TopicSection[];
}[] = [
  {
    id: "particles-waves",
    title: "Quantum particles & waves",
    subtitle: "Wave-particle duality",
    desc: "At the quantum level, particles like electrons and photons act as both particles (tiny solid objects) and waves (spread-out energy patterns). This is called wave-particle duality.",
    sections: [
      { heading: "Why it matters for technology", bullets: ["Semiconductors & computer chips", "Lasers", "Solar panels", "Quantum computers", "Satellite sensors"] },
      { text: "Without quantum physics → modern electronics wouldn't exist." },
    ],
  },
  {
    id: "tunneling",
    title: "Quantum tunneling",
    subtitle: "Particles passing through barriers",
    desc: "In classical physics a particle cannot pass a wall without enough energy. In quantum physics, particles can tunnel through barriers even without enough energy.",
    sections: [
      { heading: "Used in real technology", bullets: ["Flash memory (phones & SSD)", "Tunnel diodes", "Scanning tunneling microscopes", "Advanced space sensors"] },
      { heading: "In space systems", bullets: ["Detect tiny signals", "Improve electronic sensitivity", "Enable nano-scale sensors for satellites"] },
    ],
  },
  {
    id: "quantum-sensors",
    title: "Quantum sensors for satellites",
    subtitle: "Future satellites use quantum sensors for extreme precision.",
    desc: "",
    sections: [
      { heading: "1. Quantum gravimeters", bullets: ["Measure gravity changes", "Map Earth underground structures", "Detect water, minerals, oil"] },
      { heading: "2. Quantum magnetometers", bullets: ["Measure magnetic fields", "Space weather detection", "Planetary exploration"] },
      { heading: "3. Atom interferometers", bullets: ["Use cold atoms as sensors", "Ultra-precise navigation", "Detect tiny accelerations"] },
      { heading: "NASA & ESA research", bullets: ["Planet mapping", "Earth climate monitoring", "Deep space navigation"] },
    ],
  },
  {
    id: "atomic-clocks",
    title: "Atomic clocks (GPS accuracy)",
    subtitle: "GPS works only because of quantum atomic clocks.",
    desc: "",
    sections: [
      { heading: "How it works", bullets: ["Atoms vibrate at exact frequencies.", "Example: Cesium atom vibration defines 1 second.", "Atomic clock accuracy: error of 1 second in millions of years.", "Needed for GPS positioning."] },
      { heading: "Why GPS needs it", text: "If clock off by 1 microsecond → position error = 300 meters. So satellites carry atomic clocks to sync time, calculate distance, and give accurate navigation." },
    ],
  },
  {
    id: "quantum-comms",
    title: "Quantum communication in space",
    subtitle: "Future satellites will use quantum encryption.",
    desc: "If someone tries to hack, the quantum state changes and the system detects intrusion immediately.",
    sections: [
      { heading: "Real world", bullets: ["China launched quantum satellite: Micius → quantum secure communication"] },
      { heading: "Future", bullets: ["Global quantum internet", "Hack-proof military communication", "Secure satellite networks"] },
    ],
  },
  {
    id: "quantum-computing",
    title: "Quantum computing for NASA",
    subtitle: "Quantum computers may solve problems classical computers cannot.",
    desc: "Quantum computers use qubits instead of bits and can compute many possibilities simultaneously.",
    sections: [
      { heading: "Possible NASA uses", bullets: ["Trajectory optimization", "Spacecraft routing", "Materials for heat shields", "AI for space exploration", "Protein research in space"] },
    ],
  },
  {
    id: "radiation",
    title: "Space radiation & quantum effects",
    subtitle: "Space is full of radiation: cosmic rays, solar particles, high-energy ions.",
    desc: "",
    sections: [
      { heading: "Problem", bullets: ["Radiation can flip memory bits", "Damage electronics", "Affect quantum sensors"] },
      { heading: "Protection methods", bullets: ["Radiation-hardened chips", "Error correction codes", "Shielding", "Redundant systems"] },
    ],
  },
];

export function QuantumSpace() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const goToTopic = (id: string) => {
    setExpandedId(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">🚀 Quantum Physics & Space Technology</h1>
        <p className="subhead">
          Quantum physics explains how the smallest particles behave — and it powers many of the most advanced technologies used in satellites, GPS, and future space missions.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Why quantum matters in space</h2>
        <p className="text-slate-700 mb-3">
          Quantum physics explains how the universe works at the smallest level.
          Modern satellites, GPS systems, and deep-space missions rely on quantum technology for extreme precision and reliability.
        </p>
        <p className="text-slate-700 font-medium">Learn how:</p>
        <ul className="text-slate-700 mt-2 space-y-1 list-disc pl-5">
          <li>GPS uses atomic clocks</li>
          <li>Quantum sensors detect gravity</li>
          <li>Space agencies explore quantum communication</li>
          <li>Quantum computing may guide future missions</li>
        </ul>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Topics</h2>
        <p className="text-sm text-slate-600 mb-3">Click a tab or card to jump to that topic and expand it.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goToTopic(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition cursor-pointer ${
                expandedId === t.id
                  ? "border-[var(--accent-pink)] bg-[var(--accent-pink)]/10 text-slate-800"
                  : "border-slate-300 bg-white text-slate-600 hover:border-[var(--accent-pink)]/60 hover:bg-pink-50/50"
              }`}
              title={`Go to: ${t.title}`}
            >
              {t.title}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOPICS.map((t) => {
            const isExpanded = expandedId === t.id;
            return (
              <div
                key={t.id}
                id={t.id}
                className="scroll-mt-6 rounded-xl border-2 bg-white shadow-sm transition cursor-pointer hover:border-[var(--accent-pink)] hover:shadow-md"
                style={{ borderColor: isExpanded ? "var(--accent-pink)" : "rgba(236, 72, 153, 0.5)" }}
                onClick={() => setExpandedId(isExpanded ? null : t.id)}
                onKeyDown={(e) => e.key === "Enter" && setExpandedId(isExpanded ? null : t.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-0.5">{t.title}</h3>
                      {t.subtitle && <p className="text-xs text-slate-500 font-medium">{t.subtitle}</p>}
                    </div>
                    <span className="text-slate-400 text-lg flex-shrink-0" aria-hidden>
                      {isExpanded ? "−" : "+"}
                    </span>
                  </div>
                  {t.desc && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.desc}</p>}
                  {isExpanded && t.sections.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      {t.sections.map((sec, i) => (
                        <div key={i}>
                          {sec.heading && <h4 className="text-sm font-bold text-slate-700 mb-1.5">{sec.heading}</h4>}
                          {sec.bullets && (
                            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                              {sec.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                              ))}
                            </ul>
                          )}
                          {sec.text && <p className="text-sm text-slate-600">{sec.text}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-800 mb-2">🧭 Related topics</p>
        <p className="mb-2">
          <Link href="/learn/quantum-physics"><a className="text-[var(--accent-cyan)] hover:underline">Quantum physics basics</a></Link>
          {" · "}
          <Link href="/learn/quantum-physics-nasa"><a className="text-[var(--accent-cyan)] hover:underline">Quantum physics in NASA missions</a></Link>
          {" · "}
          <Link href="/learn/how-gps-works"><a className="text-[var(--accent-cyan)] hover:underline">How GPS works</a></Link>
          {" · "}
          <Link href="/learn/aerospace"><a className="text-[var(--accent-cyan)] hover:underline">Space electronics</a></Link>
          {" · "}
          <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot (AI tutor)</a></Link>
        </p>
      </div>
    </div>
  );
}
