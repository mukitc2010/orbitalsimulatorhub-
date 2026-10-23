import { Link } from "wouter";

const HIGHLIGHTS = [
  { label: "Real-time mission telemetry", value: "24/7" },
  { label: "AI tutoring depth", value: "NASA + SpaceX" },
  { label: "Physics fidelity", value: "N-body" },
];

const PILLARS = [
  "Mission Control",
  "AstroBot AI",
  "Orbital Simulator",
  "Rocket Builder",
  "Learning Academy",
];

export function PremiumOrbitalHero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/30 bg-slate-950/80 px-6 py-8 shadow-[0_20px_80px_rgba(0,217,255,0.18)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,217,255,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(167,139,250,0.2),_transparent_35%)]" />
      <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full border border-cyan-400/20" />
      <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full border border-cyan-300/10" />
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full border border-fuchsia-400/10" />
      <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full border border-white/5" />
      <div className="absolute left-[58%] top-[44%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(0,217,255,0.9)]" />
      <div className="absolute left-[44%] top-[37%] h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
      <div className="absolute left-[50%] top-[50%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300">
            ORBITALSIMULATORHUB • PREMIER SPACE EDUCATION PLATFORM
          </p>
          {/* h2, not h1 — the page's SEO h1 is the "Intelligence for the Space Age" hero below */}
          <h2 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            The most cinematic space learning experience ever built.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            From live satellite telemetry to AI-guided missions, this platform blends NASA-grade storytelling, realistic orbital mechanics, and premium interactive design into one unforgettable experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/simulator">
              <a className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                Launch the simulator
              </a>
            </Link>
            <Link href="/astrobot">
              <a className="rounded-full border border-cyan-400/50 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300">
                Meet AstroBot
              </a>
            </Link>
            <Link href="/platform-blueprint">
              <a className="rounded-full border border-fuchsia-400/40 px-5 py-2.5 text-sm font-semibold text-fuchsia-200 transition hover:border-fuchsia-300">
                View platform blueprint
              </a>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {PILLARS.map((pillar) => (
              <span key={pillar} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
                {pillar}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Nominal mission profile</p>
              <h3 className="text-xl font-semibold text-white">ISS orbit window</h3>
            </div>
            {/* Static reference values, not a live feed — relabel only when wired to real telemetry */}
            <div className="rounded-full border border-slate-400/40 bg-slate-400/10 px-3 py-1 text-xs font-semibold text-slate-300">
              SAMPLE
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Altitude</span>
              <span className="font-semibold text-white">417 km</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
              <span>Signal quality</span>
              <span className="font-semibold text-white">98.4%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
