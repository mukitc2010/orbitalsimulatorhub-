import { Link } from "wouter";

export function RealSatelliteData() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">Real Satellite Orbits Around Earth</h1>
        <p className="subhead">
          Real data for the International Space Station, Starlink, GPS satellites, and weather satellites. Altitude, speed, orbital period, and what each is used for.
        </p>
      </div>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">International Space Station (ISS)</h2>
        <p className="text-sm text-slate-600 mb-4">The ISS is in Low Earth Orbit. NASA and partners use it for science and as a stepping stone for deep space.</p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li><strong>Altitude:</strong> ~408 km above Earth</li>
          <li><strong>Orbital speed:</strong> ~7.66 km/s</li>
          <li><strong>Orbit time (period):</strong> ~92.7 minutes (~15.5 orbits per day)</li>
          <li><strong>Inclination:</strong> ~51.6°</li>
        </ul>
        <p className="mt-3 text-xs text-slate-500">Use our <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">orbit simulator</Link> and add LEO to see similar numbers.</p>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Starlink (SpaceX)</h2>
        <p className="text-sm text-slate-600 mb-4">Starlink satellites provide internet from space. They orbit in LEO for low latency.</p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li><strong>Orbit height:</strong> ~550 km (many shells; also ~340 km, ~1150 km)</li>
          <li><strong>Approximate count:</strong> Thousands (constellation growing)</li>
          <li><strong>Purpose:</strong> Global broadband internet</li>
          <li><strong>Orbital period:</strong> ~96 min at 550 km</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">GPS satellites</h2>
        <p className="text-sm text-slate-600 mb-4">GPS (Global Positioning System) satellites are in Medium Earth Orbit so your phone can find your position anywhere on Earth.</p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li><strong>Altitude:</strong> ~20,200 km</li>
          <li><strong>Orbital period:</strong> ~12 hours (half a sidereal day)</li>
          <li><strong>Orbital speed:</strong> ~3.87 km/s</li>
          <li><strong>Constellation:</strong> Dozens of satellites for global coverage</li>
        </ul>
        <p className="mt-3 text-xs text-slate-500">Add MEO in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">simulator</Link> to see GPS-like orbit.</p>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Weather &amp; TV satellites (Geostationary)</h2>
        <p className="text-sm text-slate-600 mb-4">Geostationary satellites sit above one spot on Earth. Orbital period = 24 hours, so they appear fixed in the sky. Used for weather, TV, and communications.</p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li><strong>Altitude:</strong> ~35,786 km (GEO)</li>
          <li><strong>Orbital period:</strong> 24 hours (sidereal)</li>
          <li><strong>Orbital speed:</strong> ~3.07 km/s</li>
          <li><strong>Purpose:</strong> Weather imaging, TV broadcast, communications</li>
        </ul>
        <p className="mt-3 text-xs text-slate-500">Add GEO in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">simulator</Link> to compare with LEO and MEO.</p>
      </section>

      <p className="text-center text-sm text-slate-600">
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Try the 3D satellite orbit simulator</Link>
        {" · "}
        <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Space formulas &amp; calculators</Link>
      </p>
    </div>
  );
}
