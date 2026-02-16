import { useState } from "react";
import { Link } from "wouter";
import { EarthVisualization, type SatelliteState } from "../components/EarthVisualization";
import { SatelliteCreationForm } from "../components/SatelliteCreationForm";
import { keplerianToCartesian } from "../orbitalClient";
import { getOrbitTemplateClient } from "../orbitalUtils";
import { SATELLITE_COLORS, ORBIT_PRESETS } from "../const";
import type { OrbitalElements } from "../../../shared/types";
import { KidsMathGame } from "../components/KidsMathGame";
import { ScienceFun } from "../components/ScienceFun";
import { ChemistryFun } from "../components/ChemistryFun";
import { NASAKidsSection } from "../components/NASAKidsSection";
import { PhysicsPlay } from "../components/PhysicsPlay";

const SCALE = 6371;

export function PlayLearn() {
  const [satellites, setSatellites] = useState<SatelliteState[]>([]);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const addSatellite = (data: { name: string; color: string; orbitalElements: OrbitalElements }) => {
    const state = keplerianToCartesian(data.orbitalElements);
    const id = `sat-${Date.now()}`;
    const posNorm: [number, number, number] = [state.x / SCALE, state.y / SCALE, state.z / SCALE];
    setSatellites((prev) => [
      ...prev,
      { id, name: data.name, color: data.color, position: posNorm, trail: [posNorm], lastCartesian: state },
    ]);
  };

  const loadPreset = (preset: "LEO" | "MEO" | "GEO") => {
    const el = getOrbitTemplateClient(preset);
    addSatellite({ name: preset + " Satellite", color: "#00d9ff", orbitalElements: el });
  };

  const sections = [
    { id: "simulator", label: "🛸 Play Simulator", color: "cyan" },
    { id: "nasa", label: "🌟 Learn NASA", color: "gold" },
    { id: "math", label: "🔢 Space Math", color: "pink" },
    { id: "science", label: "🔬 Science", color: "cyan" },
    { id: "physics", label: "⚡ Physics", color: "gold" },
    { id: "chemistry", label: "🧪 Chemistry", color: "pink" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <section className="text-center py-8 pb-6">
        <h1 className="text-4xl sm:text-5xl font-black text-black mb-3 tracking-tight">
          Learn NASA & Orbital Mechanics
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          One place to run the simulator, explore NASA, and see the science behind every orbit.
        </p>
        <p className="text-sm text-[var(--accent-cyan)] font-medium mt-1">Did you know? The ISS sees 16 sunrises every day — it orbits Earth in ~90 minutes.</p>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
          Each section below explains one topic. Use the simulator to see orbits in action; use the other sections to understand the science behind them.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition shadow-md ${
                s.color === "cyan"
                  ? "bg-[var(--accent-cyan)]/20 text-black hover:bg-[var(--accent-cyan)]/40"
                  : s.color === "pink"
                  ? "bg-[var(--accent-pink)]/20 text-black hover:bg-[var(--accent-pink)]/40"
                  : "bg-[var(--accent-gold)]/30 text-black hover:bg-[var(--accent-gold)]/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Simulator section */}
      <section id="simulator" className="py-6 scroll-mt-6">
        <p className="text-sm text-slate-600 mb-2"><strong>What you&apos;ll understand here:</strong> How satellites orbit Earth (LEO, MEO, GEO), what the 3D view shows, and how height and speed relate.</p>
        <div className="card-blueprint rounded-2xl overflow-hidden bg-white">
          <div className="bg-[var(--accent-cyan)] px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-black text-xl text-black">🛸 Satellite Simulator</h2>
            <span className="text-sm text-black/80">Drag the view, add satellites, watch them orbit!</span>
          </div>
          <div className="p-4 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden border-2 border-[var(--accent-cyan)]">
                <EarthVisualization satellites={satellites} scale={SCALE} />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ORBIT_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => loadPreset(p.id)}
                    className="px-3 py-1.5 rounded-lg bg-[var(--accent-cyan)]/20 font-medium text-sm hover:bg-[var(--accent-cyan)]/40"
                  >
                    Add {p.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSatellites([])}
                  className="px-3 py-1.5 rounded-lg border border-gray-400 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
            <div>
              <SatelliteCreationForm onSubmit={addSatellite} onLoadPreset={loadPreset} />
            </div>
          </div>
        </div>
      </section>

      {/* Learn NASA */}
      <section id="nasa" className="py-6 scroll-mt-6">
        <p className="text-sm text-slate-600 mb-2"><strong>What you&apos;ll understand here:</strong> NASA missions, astronauts, the solar system, rovers, and the Moon — in short, explainable cards.</p>
        <NASAKidsSection />
      </section>

      {/* Math */}
      <section id="math" className="py-6 scroll-mt-6">
        <p className="text-sm text-slate-600 mb-2"><strong>What you&apos;ll understand here:</strong> Orbital period, orbital speed, and gravity (with formulas and explanations so you see why each answer is correct).</p>
        <KidsMathGame />
      </section>

      {/* Science */}
      <section id="science" className="py-6 scroll-mt-6">
        <ScienceFun />
      </section>

      {/* Physics */}
      <section id="physics" className="py-6 scroll-mt-6">
        <PhysicsPlay />
      </section>

      {/* Chemistry */}
      <section id="chemistry" className="py-6 scroll-mt-6">
        <ChemistryFun />
      </section>

      {/* Footer CTA */}
      <section className="py-10 text-center">
        <p className="text-gray-600 mb-4">Want the full simulator with play/pause and speed control?</p>
        <Link href="/simulator">
          <a className="inline-block px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-black shadow-lg hover:opacity-90">
            Open Full Simulator →
          </a>
        </Link>
      </section>
    </div>
  );
}
