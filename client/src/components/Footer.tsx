import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t-2 border-slate-200 mt-auto py-8 bg-slate-50/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Home</Link>
          <Link href="/simulator" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Simulator</Link>
          <Link href="/formulas-library" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Formulas</Link>
          <Link href="/satellites" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Satellites</Link>
          <Link href="/calculators" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Calculators</Link>
          <Link href="/astrobot" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">AstroBot</Link>
          <Link href="/learn/orbital-mechanics" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Orbital mechanics</Link>
          <Link href="/learn/space-questions" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Space Q&amp;A</Link>
          <Link href="/research" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Research</Link>
          <Link href="/guide" className="text-slate-600 hover:text-[var(--accent-cyan)] font-medium transition">Guide</Link>
        </div>
        <p className="mt-2 text-center text-slate-600 text-sm font-medium">PhD researchers: <Link href="/learn/aerospace#phd" className="text-[var(--accent-cyan)] hover:underline">Advanced resources</Link>. <Link href="/research" className="text-[var(--accent-cyan)] hover:underline">Research & topics</Link> · <Link href="/learn/aerospace" className="text-[var(--accent-cyan)] hover:underline">Aerospace reference</Link>. New here? <Link href="/guide" className="text-[var(--accent-cyan)] hover:underline">Guide</Link> · <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Simulator</Link>.</p>
        <p className="mt-4 text-center text-slate-500 text-sm">Orbital Simulator Hub — orbitalsimulatorhub.com — aerospace study for students, scientists &amp; PhD researchers</p>
      </div>
    </footer>
  );
}
