import { Link } from "wouter";

export function HowNASALaunches() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How NASA Launches a Satellite</h1>
        <p className="subhead">
          Step-by-step guide to how NASA launches satellites into orbit. Learn about rocket stages, launch sequence, orbital insertion, and real mission examples.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Overview</h2>
        <p className="text-slate-700">
          Launching a satellite is a complex process involving multiple rocket stages, precise timing, and careful orbital mechanics. NASA uses the same physics principles you can explore in our <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">3D Simulator</Link>!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📦 Step 1: Rocket Stages</h2>
          <p className="text-slate-700 mb-4">
            Most rockets have multiple stages that drop away as fuel is used up. This makes the rocket lighter and more efficient.
          </p>
          <div className="bg-slate-50 rounded-lg p-5 space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 mb-2">First Stage</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Largest stage with most fuel</li>
                <li>• Provides initial thrust to escape Earth's atmosphere</li>
                <li>• Burns for ~2-3 minutes</li>
                <li>• Drops away when fuel is exhausted</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Second Stage</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Smaller, lighter stage</li>
                <li>• Continues acceleration after first stage separation</li>
                <li>• Can restart engines multiple times</li>
                <li>• Reaches initial orbit or transfer orbit</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Upper Stage / Payload</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Contains the satellite</li>
                <li>• May have its own propulsion</li>
                <li>• Performs final orbital insertion</li>
                <li>• Releases satellite at correct altitude and speed</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⏱️ Launch Sequence</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">T-0</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Liftoff</h3>
                  <p className="text-sm text-slate-700">Rocket engines ignite. Thrust must exceed weight (Newton's 2nd Law: F = ma). Rocket begins climbing vertically.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-purple-600">T+1 min</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Gravity Turn</h3>
                  <p className="text-sm text-slate-700">Rocket tilts slightly eastward (to use Earth's rotation). Begins building horizontal velocity needed for orbit.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-green-600">T+2-3 min</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">First Stage Separation</h3>
                  <p className="text-sm text-slate-700">First stage engines cut off. Stage separates and falls away. Second stage ignites and continues acceleration.</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-[var(--accent-gold)]">T+8-10 min</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Orbital Insertion</h3>
                  <p className="text-sm text-slate-700">Rocket reaches target altitude and speed. Satellite is released into orbit. Mission control confirms successful deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🎯 Orbital Insertion</h2>
          <p className="text-slate-700 mb-4">
            Getting into orbit requires reaching the right altitude AND the right speed. Too slow = falls back. Too fast = escapes Earth. Just right = stable orbit!
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Requirements:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Altitude:</strong> Must reach target height (e.g., 400 km for LEO, 20,200 km for MEO)</li>
              <li><strong>Speed:</strong> Must achieve orbital velocity (~7.8 km/s for LEO, ~3.9 km/s for MEO)</li>
              <li><strong>Direction:</strong> Must be moving horizontally (not just up!)</li>
              <li><strong>Inclination:</strong> Must match desired orbit tilt (e.g., 51.6° for ISS)</li>
            </ul>
          </div>
          <p className="text-sm text-slate-600 mt-4 bg-blue-50 p-3 rounded-lg">
            <strong>💡 Formula:</strong> Orbital velocity v = √(GM/r) where G is gravitational constant, M is Earth's mass, and r is distance from Earth's center. Try calculating orbital speeds in our <Link href="/calculators" className="text-[var(--accent-cyan)] hover:underline font-medium">Orbit Calculator</Link>!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 The Physics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Newton's Laws</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>1st Law:</strong> Rocket stays at rest until engines fire</li>
                <li>• <strong>2nd Law:</strong> F = ma - Thrust accelerates rocket</li>
                <li>• <strong>3rd Law:</strong> Gas pushes down, rocket goes up</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Orbital Mechanics</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Gravity pulls satellite toward Earth</li>
                <li>• Horizontal velocity keeps it moving forward</li>
                <li>• Balance creates circular/elliptical orbit</li>
                <li>• Same physics as our simulator!</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Real Launch Examples</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Falcon 9 (SpaceX)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>First stage:</strong> 9 Merlin engines, reusable</li>
                <li>• <strong>Payload:</strong> Up to 22,800 kg to LEO</li>
                <li>• <strong>Notable:</strong> First stage lands back on Earth!</li>
                <li>• <strong>Used for:</strong> ISS resupply, Starlink launches, commercial satellites</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Atlas V (ULA)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>First stage:</strong> RD-180 engine (Russian design)</li>
                <li>• <strong>Payload:</strong> Up to 20,520 kg to LEO</li>
                <li>• <strong>Used for:</strong> NASA missions, military satellites, Mars rovers</li>
                <li>• <strong>Notable:</strong> Launched Perseverance rover to Mars</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Space Shuttle (Retired)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Unique:</strong> Reusable orbiter + external tank + boosters</li>
                <li>• <strong>Payload:</strong> Up to 27,500 kg to LEO</li>
                <li>• <strong>Used for:</strong> ISS construction, Hubble deployment, science missions</li>
                <li>• <strong>Retired:</strong> 2011 (135 missions total)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Try It Yourself!</h2>
          <p className="text-slate-700 mb-4">
            After launch, satellites orbit Earth using the same physics in our simulator. Add satellites and see how they orbit!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator">
              <a className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </a>
            </Link>
            <Link href="/learn/newton">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Newton's Laws →
              </a>
            </Link>
            <Link href="/formulas-library">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Rocket Formulas →
              </a>
            </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-spacex-lands-rockets">
              <a className="text-[var(--accent-cyan)] hover:underline">How SpaceX Lands Rockets</a>
            </Link>
            <span>·</span>
            <Link href="/learn/newton">
              <a className="text-[var(--accent-cyan)] hover:underline">Newton's Laws</a>
            </Link>
            <span>·</span>
            <Link href="/simulator">
              <a className="text-[var(--accent-cyan)] hover:underline">3D Simulator</a>
            </Link>
            <span>·</span>
            <Link href="/satellites">
              <a className="text-[var(--accent-cyan)] hover:underline">Real Satellite Data</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
