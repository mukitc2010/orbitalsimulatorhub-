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
      { heading: "What does duality mean?", text: "In experiments, the same electron or photon can behave like a particle (hitting one spot on a screen) or like a wave (creating an interference pattern). Which you see depends on how you measure it. This isn't a metaphor—it's how nature works at the smallest scale." },
      { heading: "Famous experiment: double-slit", bullets: ["Shoot particles one by one through two slits.", "Over time, a wave-like interference pattern appears.", "Each particle lands at one point, but the pattern shows wave behavior.", "Proves that each particle has a wave associated with it (wave function)."] },
      { heading: "Why it matters for technology", bullets: ["Semiconductors & computer chips — electrons behave as waves in crystals.", "Lasers — photons in phase create coherent light.", "Solar panels — light as particles (photons) knock electrons free.", "Quantum computers — use superposition (wave-like states).", "Satellite sensors — detect photons and use wave properties for precision."] },
      { heading: "Takeaway", text: "Without quantum physics and wave-particle duality, modern electronics, GPS, and space instruments wouldn't exist. It's the foundation of almost all high-precision technology." },
    ],
  },
  {
    id: "tunneling",
    title: "Quantum tunneling",
    subtitle: "Particles passing through barriers",
    desc: "In classical physics a particle cannot pass a wall without enough energy. In quantum physics, particles can tunnel through barriers even without enough energy.",
    sections: [
      { heading: "Simple idea", text: "A quantum particle has a small probability of being found on the other side of a barrier, even if classically it doesn't have enough energy to get over it. The wave function doesn't drop to zero inside the barrier; it 'leaks' through. This is tunneling." },
      { heading: "Used in real technology", bullets: ["Flash memory (phones & SSD) — electrons tunnel through thin oxide layers to store bits.", "Tunnel diodes — fast switching for oscillators and amplifiers.", "Scanning tunneling microscopes (STM) — image atoms by measuring tunneling current.", "Advanced space sensors — ultra-sensitive detectors that rely on tunneling effects."] },
      { heading: "In space systems", bullets: ["Detect tiny signals from distant stars and spacecraft.", "Improve electronic sensitivity in spectrometers and imagers.", "Enable nano-scale sensors for satellites (e.g. quantum dots, single-photon detectors)."] },
      { heading: "Why it matters for learning", text: "Tunneling shows that quantum mechanics isn't just 'small-scale physics'—it's built into devices we use every day and into the instruments that explore space." },
    ],
  },
  {
    id: "quantum-sensors",
    title: "Quantum sensors for satellites",
    subtitle: "Future satellites use quantum sensors for extreme precision.",
    desc: "Quantum sensors use the wave nature of atoms and particles to measure gravity, magnetic fields, and motion with accuracy that classical sensors cannot match.",
    sections: [
      { heading: "1. Quantum gravimeters", bullets: ["Measure tiny gravity changes from space (mass moving underground, water, ice).", "Map Earth's underground structures and aquifers.", "Detect water, minerals, and oil — useful for climate and resource monitoring.", "ESA's GOCE and future missions aim for ever finer gravity maps."] },
      { heading: "2. Quantum magnetometers", bullets: ["Measure magnetic fields with extreme sensitivity (e.g. SQUIDs, atomic magnetometers).", "Space weather detection — track solar wind and Earth's magnetosphere.", "Planetary exploration — map Mercury's, Mars's, and lunar magnetic fields.", "Used in navigation when GPS is unavailable (e.g. underground or deep space)."] },
      { heading: "3. Atom interferometers", bullets: ["Use clouds of cold atoms; their wave nature creates interference patterns.", "Ultra-precise measurement of acceleration and rotation (inertial navigation).", "Detect tiny accelerations — gravitational waves, dark matter searches.", "Could enable GPS-free navigation for spacecraft and submarines."] },
      { heading: "NASA & ESA research", bullets: ["Planet mapping — gravity and magnetic fields from orbit.", "Earth climate monitoring — ice sheet mass, ocean circulation.", "Deep space navigation — atomic clocks and atom interferometers on future missions."] },
      { heading: "Why precision matters", text: "Better sensors mean better science (e.g. testing general relativity), better Earth observation, and more reliable navigation for missions to the Moon and Mars." },
    ],
  },
  {
    id: "atomic-clocks",
    title: "Atomic clocks (GPS accuracy)",
    subtitle: "GPS works only because of quantum atomic clocks.",
    desc: "Atomic clocks use the fact that atoms absorb and emit radiation at extremely stable frequencies. That stability defines time—and time is what GPS uses to compute your position.",
    sections: [
      { heading: "How it works", bullets: ["Atoms (e.g. cesium, rubidium) have energy levels that differ by very precise amounts.", "The frequency of light that flips an atom between two levels is the same for every atom of that type.", "That frequency defines the 'tick' of the clock — e.g. 9,192,631,770 cycles = 1 second (cesium).", "Atomic clock accuracy: error of about 1 second in millions of years for the best lab clocks.", "Space-qualified atomic clocks are slightly less accurate but still extremely stable."] },
      { heading: "Why GPS needs it", text: "GPS finds your position by measuring how long signals take from several satellites. Time × speed of light = distance. If a satellite's clock is off by 1 microsecond, your position error is about 300 meters. So every GPS satellite carries atomic clocks and is constantly corrected from the ground." },
      { heading: "Cesium vs rubidium", bullets: ["Cesium: used in the official definition of the second; very stable.", "Rubidium: smaller, lighter, used on many GPS satellites and in portable applications.", "Optical clocks (future): use higher frequencies for even better stability; may fly on next-gen navigation satellites."] },
      { heading: "Takeaway", text: "Quantum mechanics isn't optional for GPS—it's what makes precise time and therefore precise navigation possible. Same physics will drive future lunar and Mars navigation." },
    ],
  },
  {
    id: "quantum-comms",
    title: "Quantum communication in space",
    subtitle: "Future satellites will use quantum encryption.",
    desc: "If someone tries to hack, the quantum state changes and the system detects intrusion immediately.",
    sections: [
      { heading: "What is quantum encryption (QKD)?", text: "Quantum key distribution (QKD) uses single photons to share a secret key. Any attempt to read the photon changes it (quantum measurement disturbs the state), so the sender and receiver can detect eavesdropping and discard the key. Result: keys that are provably secure against future computers." },
      { heading: "Real world", bullets: ["China's Micius satellite (2016) — first quantum-communication satellite; demonstrated QKD between ground and space.", "Micius sent entangled photon pairs to ground stations 1,200 km apart.", "Experiments proved that quantum links from space are feasible for a future global quantum internet."] },
      { heading: "Future", bullets: ["Global quantum internet — secure links between continents via satellites.", "Hack-proof military and government communication.", "Secure satellite networks for banking, health, and critical infrastructure.", "NASA, ESA, and other agencies are researching quantum communication for space."] },
      { heading: "Why space?", text: "Quantum signals in optical fibers are absorbed over long distances. In space, photons travel through vacuum with less loss, so satellites can relay quantum keys across the world." },
    ],
  },
  {
    id: "quantum-computing",
    title: "Quantum computing for NASA",
    subtitle: "Quantum computers may solve problems classical computers cannot.",
    desc: "Quantum computers use qubits instead of bits and can compute many possibilities simultaneously.",
    sections: [
      { heading: "Qubits in a nutshell", text: "A classical bit is 0 or 1. A qubit can be in a superposition: a combination of 0 and 1 until measured. Many qubits together can represent a huge number of combinations at once. Quantum algorithms use interference and entanglement to get the 'right' answer out faster for certain problems." },
      { heading: "Possible NASA uses", bullets: ["Trajectory optimization — find best paths for spacecraft and rovers among many options.", "Spacecraft routing — mission design, orbit transfers, multi-body dynamics.", "Materials for heat shields — simulate how molecules behave under extreme heat.", "AI for space exploration — train or run models that benefit from quantum speed-up.", "Protein research in space — understand how proteins fold in microgravity; drug discovery."] },
      { heading: "NASA's interest", bullets: ["NASA QuAIL (Quantum Artificial Intelligence Lab) — early work with quantum annealers.", "Partnerships with industry (e.g. Google, IBM) to test algorithms on real quantum hardware.", "Focus on problems that are hard for classical computers: optimization, simulation, machine learning."] },
      { heading: "Reality check", text: "Quantum computers are still emerging. Not every problem is faster on a quantum machine, but for specific tasks (e.g. certain optimizations, molecular simulation), they could transform how NASA designs missions and analyzes data." },
    ],
  },
  {
    id: "radiation",
    title: "Space radiation & quantum effects",
    subtitle: "Space is full of radiation: cosmic rays, solar particles, high-energy ions.",
    desc: "Space is full of radiation: cosmic rays, solar particles, and high-energy ions. This affects both classical electronics and quantum devices—and we must design for it.",
    sections: [
      { heading: "Types of space radiation", bullets: ["Cosmic rays — high-energy particles from outside the solar system; can penetrate shielding.", "Solar energetic particles (SEPs) — from the Sun during flares and coronal mass ejections.", "Trapped radiation belts — e.g. Van Allen belts around Earth; protons and electrons.", "Galactic cosmic rays (GCRs) — mostly protons and heavier nuclei; constant background."] },
      { heading: "Problem for electronics and quantum systems", bullets: ["Radiation can flip memory bits (single-event upset, SEU) — wrong data or crashes.", "Cumulative damage (total ionizing dose) — degrades chips and sensors over time.", "Affects quantum sensors — e.g. decoherence in qubits, noise in atom interferometers.", "Single-event latchup or burnout can permanently destroy a device."] },
      { heading: "Protection methods", bullets: ["Radiation-hardened chips — designed to tolerate higher doses and single events.", "Error correction codes — detect and correct bit flips in memory and data.", "Shielding — aluminum, polyethylene, or specialized materials; trade-off with mass.", "Redundant systems — multiple computers or sensors so one failure doesn't stop the mission.", "Software — reboot, reconfigurate FPGAs, and scrub memory to recover from upsets."] },
      { heading: "Why it matters for students", text: "Every satellite and rover is designed with radiation in mind. Understanding both quantum physics (how sensors work) and radiation effects (how the environment affects them) is essential for space engineering and mission assurance." },
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
        <p className="text-slate-600 mb-2">Dig deeper: foundations of quantum physics, how NASA uses it in missions, how GPS relies on atomic clocks, and space electronics. Ask AstroBot for quick answers.</p>
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
