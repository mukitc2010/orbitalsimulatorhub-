import { Link } from "wouter";

const modules = [
  { name: "Astronomy academy", href: "/learn/astrophysics" },
  { name: "Orbital simulator", href: "/simulator" },
  { name: "Spacecraft operations", href: "/simulator/spacecraft" },
  { name: "Swarm simulator", href: "/simulator/swarm" },
  { name: "AstroBot", href: "/astrobot" },
  { name: "Orbit Score Lab", href: "/games/space-math" },
  { name: "Space news", href: "/space-news" },
  { name: "Mission explorer", href: "/missions" },
  { name: "Planet hub", href: "/planets" },
  { name: "Research library", href: "/research" },
  { name: "Rocket lesson", href: "/learn/how-nasa-launches-satellite" },
];

export function PlatformBlueprint() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 py-2">
      <section className="rounded-[30px] border border-cyan-400/30 bg-slate-950/80 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Orbital Simulator Hub</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Explore the simulators</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Open a simulator, a lesson, or the daily space news.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950">Back to home</Link>
      </section>
      <section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <Link key={module.name} href={module.href} className="block rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                {module.name}
              </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
