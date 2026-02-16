import { Link } from "wouter";

export function HowGPSWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How GPS Works</h1>
        <p className="subhead">
          Learn how GPS satellites help you navigate anywhere on Earth. Discover the science behind trilateration, atomic clocks, and the GPS constellation.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">📍 What is GPS?</h2>
        <p className="text-slate-700 mb-3">
          GPS (Global Positioning System) is a network of satellites that helps you find your exact location anywhere on Earth. Your phone, car, or GPS device talks to these satellites to figure out where you are!
        </p>
        <p className="text-sm text-slate-600">
          <strong>Fun fact:</strong> GPS was originally developed by the U.S. military, but now everyone uses it for navigation, mapping, and even timing!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛰️ The GPS Constellation</h2>
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">How Many Satellites?</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>24 active satellites</strong> (plus spares)</li>
              <li><strong>Orbit:</strong> Medium Earth Orbit (MEO) at ~20,200 km altitude</li>
              <li><strong>Orbital period:</strong> ~12 hours</li>
              <li><strong>Arrangement:</strong> 6 orbital planes, 4 satellites per plane</li>
            </ul>
          </div>
          <p className="text-slate-700 mb-4">
            GPS satellites orbit Earth in a specific pattern so that at least 4 satellites are always visible from anywhere on Earth. You need at least 4 satellites to determine your exact position!
          </p>
          <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
            <strong>💡 Try it:</strong> Add a MEO satellite in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">Simulator</Link> to see GPS-like orbit! Check out <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline font-medium">Real Satellite Data</Link> for GPS details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⏰ Atomic Clocks</h2>
          <p className="text-slate-700 mb-4">
            Each GPS satellite has multiple atomic clocks that are incredibly accurate. These clocks are so precise they lose less than 1 second in 100 million years!
          </p>
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">Why Atomic Clocks Matter</h3>
            <p className="text-slate-700 mb-3">
              GPS works by measuring the time it takes for signals to travel from satellites to your device. Since signals travel at the speed of light (~300,000 km/s), even tiny timing errors cause big location errors!
            </p>
            <ul className="space-y-2 text-slate-700">
              <li><strong>1 microsecond error</strong> = 300 meter location error</li>
              <li><strong>Atomic clocks</strong> keep time accurate to nanoseconds</li>
              <li><strong>Your phone's clock</strong> isn't accurate enough, so it needs 4 satellites</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Trilateration: How GPS Finds You</h2>
          <p className="text-slate-700 mb-4">
            GPS uses a mathematical technique called <strong>trilateration</strong> to find your position. Here's how it works:
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 1: Measure Distance to One Satellite</h3>
              <p className="text-slate-700 text-sm mb-2">
                The satellite sends a signal with the exact time. Your device receives it and calculates how long it took to arrive. Since signals travel at light speed, you can calculate the distance:
              </p>
              <div className="bg-white rounded p-3 font-mono text-sm mb-2">
                Distance = Speed of Light × Time
              </div>
              <p className="text-slate-600 text-xs">
                This tells you: "I'm somewhere on a sphere X kilometers from this satellite"
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 2: Add a Second Satellite</h3>
              <p className="text-slate-700 text-sm mb-2">
                Now you know your distance from two satellites. The two spheres intersect in a circle:
              </p>
              <p className="text-slate-600 text-xs">
                "I'm somewhere on this circle"
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 3: Add a Third Satellite</h3>
              <p className="text-slate-700 text-sm mb-2">
                Three spheres intersect at two points (one above Earth, one below):
              </p>
              <p className="text-slate-600 text-xs">
                "I'm at one of these two points"
              </p>
            </div>

            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <h3 className="font-bold text-slate-800 mb-2">Step 4: Add a Fourth Satellite</h3>
              <p className="text-slate-700 text-sm mb-2">
                The fourth satellite eliminates the wrong point and also helps correct your device's clock error:
              </p>
              <p className="text-slate-600 text-xs font-bold">
                "I'm HERE!" (exact 3D position: latitude, longitude, altitude)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Real-World Applications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Navigation</h3>
              <p className="text-sm text-slate-700">Turn-by-turn directions, finding your way in cities, hiking trails</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Timing</h3>
              <p className="text-sm text-slate-700">Cell phone networks, power grids, financial systems all use GPS for precise timing</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Mapping</h3>
              <p className="text-sm text-slate-700">Google Maps, surveying, construction, agriculture</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Emergency Services</h3>
              <p className="text-sm text-slate-700">911 calls, search and rescue, disaster response</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 The Science Behind GPS</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Physics Concepts:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Speed of Light:</strong> Signals travel at ~300,000 km/s</li>
              <li><strong>Relativity:</strong> GPS must account for Einstein's theory - satellites run slightly faster due to weaker gravity!</li>
              <li><strong>Orbital Mechanics:</strong> Satellites stay in precise MEO orbits using the same physics as our simulator</li>
              <li><strong>Signal Processing:</strong> Your device uses complex math to calculate position from timing data</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Try It Yourself!</h2>
          <p className="text-slate-700 mb-4">
            Explore GPS satellites and orbits in our interactive tools:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator">
              <a className="px-4 py-2 rounded-lg font-medium bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Add MEO Satellite →
              </a>
            </Link>
            <Link href="/satellites">
              <a className="px-4 py-2 rounded-lg font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                GPS Satellite Data →
              </a>
            </Link>
            <Link href="/calculators">
              <a className="px-4 py-2 rounded-lg font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Orbit Calculator →
              </a>
            </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/satellites">
              <a className="text-[var(--accent-cyan)] hover:underline">Real Satellite Orbits</a>
            </Link>
            <span>·</span>
            <Link href="/learn/orbital-mechanics">
              <a className="text-[var(--accent-cyan)] hover:underline">Orbital Mechanics</a>
            </Link>
            <span>·</span>
            <Link href="/simulator">
              <a className="text-[var(--accent-cyan)] hover:underline">3D Simulator</a>
            </Link>
            <span>·</span>
            <Link href="/learn/how-starlink-works">
              <a className="text-[var(--accent-cyan)] hover:underline">How Starlink Works</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
