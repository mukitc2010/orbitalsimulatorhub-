import { Link } from "wouter";

export function HowStarlinkWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How Starlink Works</h1>
        <p className="subhead">
          Discover how SpaceX's Starlink constellation provides global internet from space. Learn about satellite constellations, Low Earth Orbit benefits, ground stations, and how it connects you to the internet.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌐 What is Starlink?</h2>
        <p className="text-slate-700">
          Starlink is SpaceX's satellite internet constellation that provides high-speed internet anywhere on Earth. Instead of cables or cell towers, it uses thousands of satellites in Low Earth Orbit to beam internet directly to your home!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛰️ The Starlink Constellation</h2>
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">By the Numbers:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Current satellites:</strong> 5,000+ in orbit (as of 2024)</li>
              <li><strong>Planned total:</strong> 12,000+ satellites (possibly up to 42,000!)</li>
              <li><strong>Orbit:</strong> Low Earth Orbit (LEO) at ~550 km altitude</li>
              <li><strong>Orbital period:</strong> ~95 minutes</li>
              <li><strong>Orbital planes:</strong> Multiple planes at 53° inclination</li>
            </ul>
          </div>
          <p className="text-slate-700 mb-4">
            Starlink satellites orbit in multiple "shells" - groups of satellites at different altitudes and inclinations. This ensures coverage everywhere on Earth, even at the poles!
          </p>
          <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
            <strong>💡 Try it:</strong> Add a LEO satellite in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">Simulator</Link> to see Starlink-like orbit! Check <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline font-medium">Real Satellite Data</Link> for Starlink details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⚡ Why Low Earth Orbit?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">✅ Advantages of LEO</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Low latency:</strong> Signals travel shorter distance (20-40 ms vs 500+ ms for GEO)</li>
                <li>• <strong>High speed:</strong> Can provide fast internet (100+ Mbps)</li>
                <li>• <strong>Global coverage:</strong> Satellites move, covering entire Earth</li>
                <li>• <strong>Easier to launch:</strong> Closer to Earth, less fuel needed</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-slate-800 mb-2">⚠️ Challenges</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Many satellites needed:</strong> Must cover entire Earth</li>
                <li>• <strong>Satellites move:</strong> Need handoff between satellites</li>
                <li>• <strong>Atmospheric drag:</strong> Satellites need periodic boosts</li>
                <li>• <strong>Space debris:</strong> More satellites = more collision risk</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📡 How It Works: The Connection</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 1: Your Request</h3>
              <p className="text-sm text-slate-700">
                You click a link or load a webpage. Your Starlink dish (user terminal) sends the request to the nearest Starlink satellite overhead.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 2: Satellite Relay</h3>
              <p className="text-sm text-slate-700">
                The satellite receives your signal and relays it to other satellites in the constellation. Satellites communicate with each other using laser links (inter-satellite links).
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 3: Ground Station</h3>
              <p className="text-sm text-slate-700">
                A satellite connects to a ground station (gateway) on Earth. Ground stations are connected to the regular internet via fiber optic cables.
              </p>
            </div>

            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <h3 className="font-bold text-slate-800 mb-2">Step 4: Internet & Response</h3>
              <p className="text-sm text-slate-700">
                Your request goes through the internet, gets the webpage, and the response travels back the same way: Ground station → Satellite → Your dish → Your device!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛰️ Starlink Satellites</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Satellite Features:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Mass:</strong> ~260 kg per satellite</li>
              <li><strong>Size:</strong> Flat design, about the size of a table</li>
              <li><strong>Solar panels:</strong> Generate power from sunlight</li>
              <li><strong>Antennas:</strong> Phased array antennas for beam steering</li>
              <li><strong>Lasers:</strong> Inter-satellite links for communication</li>
              <li><strong>Thrusters:</strong> Ion thrusters for orbit adjustments</li>
              <li><strong>Autonomous:</strong> Can avoid collisions automatically</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📡 Your Starlink Dish</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Phased Array Antenna</h3>
              <p className="text-sm text-slate-700 mb-2">
                The dish uses hundreds of small antennas that can electronically steer the beam. No moving parts!
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Automatically finds satellites</li>
                <li>• Tracks satellites as they move</li>
                <li>• Switches between satellites seamlessly</li>
                <li>• Works in any weather</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Setup</h3>
              <p className="text-sm text-slate-700 mb-2">
                Simple installation - just point dish at sky, connect to router, and you're online!
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Self-aligning</li>
                <li>• Works anywhere with clear sky view</li>
                <li>• No cables to run</li>
                <li>• Portable (can move it!)</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Global Coverage</h2>
          <p className="text-slate-700 mb-4">
            Starlink provides internet coverage to areas that traditional internet can't reach:
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="font-bold text-slate-800">Rural Areas</p>
              <p className="text-xs text-slate-600">No cables needed</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="font-bold text-slate-800">Remote Locations</p>
              <p className="text-xs text-slate-600">Mountains, islands</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="font-bold text-slate-800">Moving Vehicles</p>
              <p className="text-xs text-slate-600">Ships, RVs, planes</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 The Science Behind Starlink</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Physics Concepts:</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li><strong>Orbital Mechanics:</strong> Satellites use same physics as our simulator - gravity and velocity keep them in orbit</li>
              <li><strong>Signal Propagation:</strong> Radio waves travel at speed of light (~300,000 km/s). Low altitude = low latency</li>
              <li><strong>Beam Steering:</strong> Phased array antennas use wave interference to steer beams electronically</li>
              <li><strong>Handoff:</strong> As satellites move, your dish switches to new satellites automatically - seamless connection!</li>
              <li><strong>Orbital Debris:</strong> Starlink satellites can autonomously avoid collisions using thrusters</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📊 Starlink vs Traditional Internet</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left">Starlink</th>
                  <th className="px-4 py-3 text-left">Traditional</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-medium">Latency</td>
                  <td className="px-4 py-3">20-40 ms</td>
                  <td className="px-4 py-3">10-50 ms (varies)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-medium">Speed</td>
                  <td className="px-4 py-3">50-200+ Mbps</td>
                  <td className="px-4 py-3">Varies by location</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-medium">Coverage</td>
                  <td className="px-4 py-3">Global (anywhere)</td>
                  <td className="px-4 py-3">Limited to infrastructure</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">Setup</td>
                  <td className="px-4 py-3">Simple (dish + router)</td>
                  <td className="px-4 py-3">Requires cables/installation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore Starlink Orbits!</h2>
          <p className="text-slate-700 mb-4">
            Starlink satellites orbit in Low Earth Orbit - the same type you can simulate! Add a LEO satellite and see how it moves.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </Link>
            <Link href="/satellites" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Starlink Data →
              </Link>
            <Link href="/compare/orbits" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Compare Orbits →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-gps-works" className="text-[var(--accent-cyan)] hover:underline">How GPS Works</Link>
            <span>·</span>
            <Link href="/compare/orbits" className="text-[var(--accent-cyan)] hover:underline">Compare Orbits</Link>
            <span>·</span>
            <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline">Real Satellite Data</Link>
            <span>·</span>
            <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
