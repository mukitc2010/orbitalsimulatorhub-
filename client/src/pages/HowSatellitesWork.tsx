import { Link } from "wouter";

export function HowSatellitesWork() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How Satellites Work – Complete Guide</h1>
        <p className="subhead">
          Satellites orbit Earth (or other bodies) and provide communications, navigation, weather data, and science. Learn how they stay in orbit, what types exist, and how we use them.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Why don&apos;t satellites fall?</h2>
        <p className="text-slate-700">
          Satellites are in free fall — but they move sideways so fast that they keep &quot;missing&quot; Earth. Gravity curves their path into an orbit. The right speed for a given height gives a stable circle or ellipse. Too slow and they fall back; too fast and they escape. Learn the math in <Link href="/learn/orbital-mechanics"><a className="text-[var(--accent-cyan)] hover:underline">orbital mechanics</a></Link> and try it in our <Link href="/simulator"><a className="text-[var(--accent-cyan)] hover:underline">satellite orbit simulator</a></Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Types of orbits</h2>
        <ul className="space-y-2 text-slate-700">
          <li><strong>LEO (Low Earth Orbit)</strong> — 200–2,000 km. ISS, Starlink, many science satellites. Short period (~90 min), low latency. <Link href="/learn/how-iss-works"><a className="text-[var(--accent-cyan)] hover:underline">How ISS works</a></Link> · <Link href="/learn/how-starlink-works"><a className="text-[var(--accent-cyan)] hover:underline">How Starlink works</a></Link></li>
          <li><strong>MEO (Medium Earth Orbit)</strong> — ~20,200 km for GPS. Used for navigation constellations. <Link href="/learn/how-gps-works"><a className="text-[var(--accent-cyan)] hover:underline">How GPS works</a></Link></li>
          <li><strong>GEO (Geostationary)</strong> — ~35,786 km. Satellite appears fixed over one spot. Weather, TV, communications. <Link href="/compare/orbits"><a className="text-[var(--accent-cyan)] hover:underline">Compare orbits</a></Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">How we use satellites</h2>
        <p className="text-slate-700">
          Communications (phone, internet, TV), navigation (GPS), weather forecasting, Earth observation (climate, agriculture), science (telescopes, Mars rovers rely on orbiters to relay data), and national security. Each mission uses the same physics: <Link href="/formulas-library"><a className="text-[var(--accent-cyan)] hover:underline">orbital velocity</a></Link>, launch, and station-keeping.
        </p>
      </div>

      <div className="rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Learn by doing</h2>
        <p className="text-slate-700 mb-4">Add LEO, MEO, and GEO satellites in our <Link href="/simulator"><a className="text-[var(--accent-cyan)] hover:underline font-medium">3D simulator</a></Link>. See <Link href="/satellites"><a className="text-[var(--accent-cyan)] hover:underline font-medium">real satellite data</a></Link> (ISS, Starlink, GPS). <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Ask AstroBot</a></Link> how satellites work.
        </p>
      </div>
    </div>
  );
}
