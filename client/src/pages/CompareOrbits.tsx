import { Link } from "wouter";

interface OrbitComparison {
  name: string;
  fullName: string;
  altitude: string;
  period: string;
  speed: string;
  uses: string[];
  examples: string[];
  color: string;
}

const ORBITS: OrbitComparison[] = [
  {
    name: "LEO",
    fullName: "Low Earth Orbit",
    altitude: "200 - 2,000 km",
    period: "~90 minutes",
    speed: "~7.8 km/s",
    uses: ["Earth observation", "Space station", "Internet satellites", "Imaging"],
    examples: ["International Space Station (ISS)", "Hubble Space Telescope", "Starlink satellites"],
    color: "cyan"
  },
  {
    name: "MEO",
    fullName: "Medium Earth Orbit",
    altitude: "2,000 - 35,786 km",
    period: "~12 hours",
    speed: "~3.9 km/s",
    uses: ["Navigation", "GPS", "Communication"],
    examples: ["GPS satellites", "GLONASS", "Galileo"],
    color: "purple"
  },
  {
    name: "GEO",
    fullName: "Geostationary Orbit",
    altitude: "35,786 km",
    period: "24 hours",
    speed: "~3.1 km/s",
    uses: ["Weather monitoring", "TV broadcasting", "Communication", "Earth observation"],
    examples: ["Weather satellites", "TV satellites", "Communication satellites"],
    color: "gold"
  }
];

export function CompareOrbits() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Compare Orbits: LEO vs MEO vs GEO</h1>
        <p className="subhead">
          Side-by-side comparison of Low Earth Orbit, Medium Earth Orbit, and Geostationary Orbit. See the differences in altitude, speed, period, and uses.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4 mb-6">
        <p className="text-sm text-slate-700">
          <strong>💡 Tip:</strong> Add all three orbit types in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">3D Simulator</Link> to see them side-by-side! The comparison table below will help you understand the differences.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-4 py-3 text-left font-bold">Orbit Type</th>
              <th className="px-4 py-3 text-left font-bold">Altitude</th>
              <th className="px-4 py-3 text-left font-bold">Orbital Period</th>
              <th className="px-4 py-3 text-left font-bold">Speed</th>
              <th className="px-4 py-3 text-left font-bold">Common Uses</th>
              <th className="px-4 py-3 text-left font-bold">Examples</th>
            </tr>
          </thead>
          <tbody>
            {ORBITS.map((orbit, idx) => (
              <tr
                key={orbit.name}
                className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-4 py-4">
                  <div className="font-bold text-lg text-slate-800">{orbit.name}</div>
                  <div className="text-sm text-slate-600">{orbit.fullName}</div>
                </td>
                <td className="px-4 py-4 text-slate-700 font-medium">{orbit.altitude}</td>
                <td className="px-4 py-4 text-slate-700 font-medium">{orbit.period}</td>
                <td className="px-4 py-4 text-slate-700 font-medium">{orbit.speed}</td>
                <td className="px-4 py-4">
                  <ul className="text-sm text-slate-700 space-y-1">
                    {orbit.uses.map((use, i) => (
                      <li key={i}>• {use}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4">
                  <ul className="text-sm text-slate-700 space-y-1">
                    {orbit.examples.map((example, i) => (
                      <li key={i}>• {example}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Comparisons */}
      <div className="grid md:grid-cols-3 gap-6">
        {ORBITS.map((orbit) => (
          <div
            key={orbit.name}
            className={`rounded-xl border-2 p-5 ${
              orbit.color === "cyan"
                ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5"
                : orbit.color === "purple"
                ? "border-purple-400 bg-purple-50"
                : "border-[var(--accent-gold)] bg-[var(--accent-gold)]/15"
            }`}
          >
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              {orbit.name}: {orbit.fullName}
            </h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-slate-700">Altitude:</strong>
                <p className="text-slate-600">{orbit.altitude}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {orbit.name === "LEO"
                    ? "Close to Earth - easy to reach, but experiences atmospheric drag"
                    : orbit.name === "MEO"
                    ? "Middle distance - balanced for navigation systems"
                    : "Very far - appears fixed in sky, no atmospheric drag"}
                </p>
              </div>

              <div>
                <strong className="text-slate-700">Period:</strong>
                <p className="text-slate-600">{orbit.period}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {orbit.name === "LEO"
                    ? "Fast orbit - sees Earth rotate beneath it"
                    : orbit.name === "MEO"
                    ? "Medium period - good for global coverage"
                    : "Matches Earth's rotation - stays over same spot"}
                </p>
              </div>

              <div>
                <strong className="text-slate-700">Speed:</strong>
                <p className="text-slate-600">{orbit.speed}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {orbit.name === "LEO"
                    ? "Fastest - needs high speed to stay in orbit"
                    : orbit.name === "MEO"
                    ? "Medium speed - balanced for navigation"
                    : "Slowest - far from Earth, less gravity"}
                </p>
              </div>

              <div>
                <strong className="text-slate-700">Why This Orbit?</strong>
                <ul className="text-slate-600 space-y-1 mt-1">
                  {orbit.uses.map((use, i) => (
                    <li key={i}>✓ {use}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Comparison */}
      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">📊 Visual Comparison</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent-cyan)] flex items-center justify-center text-white font-bold">
              LEO
            </div>
            <div className="flex-1">
              <div className="h-2 bg-[var(--accent-cyan)] rounded-full" style={{ width: "15%" }}></div>
              <p className="text-xs text-slate-600 mt-1">Closest to Earth - 200-2,000 km</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              MEO
            </div>
            <div className="flex-1">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: "50%" }}></div>
              <p className="text-xs text-slate-600 mt-1">Middle distance - 2,000-35,786 km</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)] flex items-center justify-center text-black font-bold">
              GEO
            </div>
            <div className="flex-1">
              <div className="h-2 bg-[var(--accent-gold)] rounded-full" style={{ width: "100%" }}></div>
              <p className="text-xs text-slate-600 mt-1">Farthest - 35,786 km (matches Earth's rotation)</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Scale: Distance from Earth center (Earth radius = 6,371 km)
        </p>
      </div>

      {/* Try It Section */}
      <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 See It in Action!</h2>
        <p className="text-slate-700 mb-4">
          Add all three orbit types in the simulator and watch them orbit side-by-side. Notice the differences in speed and period!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/simulator" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
              Open 3D Simulator →
            </Link>
          <Link href="/learn/orbital-mechanics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
              Learn Orbital Mechanics →
            </Link>
          <Link href="/satellites" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
              Real Satellite Data →
            </Link>
        </div>
      </div>

      <div className="text-sm text-slate-600 space-y-2">
        <p><strong>Related Topics:</strong></p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">What is Orbital Mechanics?</Link>
          <span>·</span>
          <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline">Real Satellite Orbits</Link>
          <span>·</span>
          <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
          <span>·</span>
          <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Orbital Formulas</Link>
        </div>
      </div>
    </div>
  );
}
