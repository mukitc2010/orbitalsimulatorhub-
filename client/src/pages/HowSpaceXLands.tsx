import { Link } from "wouter";

export function HowSpaceXLands() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How SpaceX Lands Rockets</h1>
        <p className="subhead">
          Discover the revolutionary technology behind reusable rockets. Learn how SpaceX lands Falcon 9 boosters using grid fins, engines, and precise navigation.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Why Land Rockets?</h2>
        <p className="text-slate-700">
          Traditional rockets are used once and discarded - like throwing away an airplane after one flight! SpaceX's reusable rockets can fly multiple times, dramatically reducing the cost of space travel. This is one of the biggest advances in space technology.
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 The Landing Sequence</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Stage Separation</h3>
                  <p className="text-sm text-slate-700">
                    After first stage completes its job (boosting the second stage), it separates. The second stage continues to orbit with the payload, while the first stage begins its return journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Flip Maneuver</h3>
                  <p className="text-sm text-slate-700">
                    The booster flips around using cold gas thrusters. It reorients so the engines point downward (toward Earth) for landing. This happens while still high in the atmosphere.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Boost-Back Burn</h3>
                  <p className="text-sm text-slate-700">
                    Engines fire briefly to slow down and change direction. This "boost-back" burn sends the booster back toward the landing site (either on land or a drone ship at sea).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <div className="flex items-start gap-3">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Re-Entry Burn</h3>
                  <p className="text-sm text-slate-700">
                    As the booster re-enters the atmosphere, engines fire again to slow down. This prevents the booster from burning up due to atmospheric friction and heat.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Grid Fins Deploy</h3>
                  <p className="text-sm text-slate-700">
                    Large grid fins extend from the sides of the booster. These act like wings, allowing the booster to steer and control its descent. They're crucial for precision landing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">6️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Landing Burn</h3>
                  <p className="text-sm text-slate-700">
                    Final engine burn slows the booster to near-zero velocity just before touchdown. The booster lands vertically on deployable landing legs. Perfect timing is critical - too early = crashes, too late = crashes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🎛️ Key Technologies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Grid Fins</h3>
              <p className="text-sm text-slate-700 mb-2">
                Large, foldable fins that provide aerodynamic control during descent. They can be moved to steer the booster, like rudders on a ship.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Made of titanium</li>
                <li>• Fold flat during ascent</li>
                <li>• Deploy during descent</li>
                <li>• Provide precise control</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Thrust Vectoring</h3>
              <p className="text-sm text-slate-700 mb-2">
                Engines can gimbal (tilt) to change thrust direction. This allows fine control of the booster's orientation and position.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Engines tilt up to 8 degrees</li>
                <li>• Controlled by flight computer</li>
                <li>• Provides precise steering</li>
                <li>• Works with grid fins</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Cold Gas Thrusters</h3>
              <p className="text-sm text-slate-700 mb-2">
                Small thrusters that use compressed nitrogen gas. Used for initial flip maneuver and fine adjustments.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Small but precise</li>
                <li>• Used in space (no air)</li>
                <li>• Help with orientation</li>
                <li>• Low thrust, high control</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Landing Legs</h3>
              <p className="text-sm text-slate-700 mb-2">
                Four deployable legs that extend just before landing. Provide stable base and absorb landing impact.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Folded during flight</li>
                <li>• Deploy before landing</li>
                <li>• Absorb impact</li>
                <li>• Provide stability</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧮 The Math Behind Landing</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Calculations:</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <strong>Trajectory Prediction:</strong> Flight computer calculates exact path needed to reach landing site. Must account for:
                <ul className="ml-4 mt-1 text-sm text-slate-600 space-y-1">
                  <li>• Current position and velocity</li>
                  <li>• Atmospheric drag</li>
                  <li>• Wind conditions</li>
                  <li>• Fuel remaining</li>
                </ul>
              </li>
              <li>
                <strong>Burn Timing:</strong> Each engine burn must happen at exactly the right time:
                <ul className="ml-4 mt-1 text-sm text-slate-600 space-y-1">
                  <li>• Boost-back: ~3 minutes after separation</li>
                  <li>• Re-entry: ~6 minutes after separation</li>
                  <li>• Landing: ~8 minutes after separation</li>
                </ul>
              </li>
              <li>
                <strong>Velocity Control:</strong> Must slow from ~5,000 km/h to ~0 km/h in final seconds. Uses same physics as orbital mechanics - F = ma!
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📊 Landing Success Rate</h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-200">
            <p className="text-slate-700 mb-3">
              <strong>Early attempts:</strong> Many failures as SpaceX perfected the technology
            </p>
            <p className="text-slate-700 mb-3">
              <strong>Current success rate:</strong> Over 90% successful landings!
            </p>
            <p className="text-slate-700">
              <strong>Impact:</strong> Reusable rockets have reduced launch costs by ~70%, making space more accessible.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌊 Landing Sites</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Land Landing</h3>
              <p className="text-sm text-slate-700 mb-2">
                Booster returns to launch site or designated landing zone. Easier to recover and refurbish.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Used when:</strong> Enough fuel for boost-back burn
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Drone Ship Landing</h3>
              <p className="text-sm text-slate-700 mb-2">
                Autonomous drone ship positioned in ocean. Used when payload is heavy and booster can't return to land.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Used when:</strong> Heavy payloads, less fuel available
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Learn More!</h2>
          <p className="text-slate-700 mb-4">
            Rocket landing uses the same physics principles as orbital mechanics. Explore how satellites orbit in our simulator!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </Link>
            <Link href="/learn/newton" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Newton's Laws →
              </Link>
            <Link href="/learn/how-nasa-launches-satellite" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                How NASA Launches →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-nasa-launches-satellite" className="text-[var(--accent-cyan)] hover:underline">How NASA Launches Satellites</Link>
            <span>·</span>
            <Link href="/learn/newton" className="text-[var(--accent-cyan)] hover:underline">Newton's Laws</Link>
            <span>·</span>
            <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Rocket Formulas</Link>
            <span>·</span>
            <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
