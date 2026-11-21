import { Link } from "wouter";

export function HowISSWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How the International Space Station Works</h1>
        <p className="subhead">
          Discover how the ISS orbits Earth, how astronauts live and work in space, and how this incredible space laboratory operates 24/7.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌍 What is the ISS?</h2>
        <p className="text-slate-700">
          The International Space Station (ISS) is a massive spacecraft orbiting Earth at ~400 km altitude. It's a joint project of NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada). Astronauts live and work there, conducting scientific experiments in microgravity!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛰️ ISS Orbit</h2>
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">Orbital Details:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Altitude:</strong> ~408 km (253 miles) - Low Earth Orbit</li>
              <li><strong>Orbital period:</strong> ~92.7 minutes (1.5 hours)</li>
              <li><strong>Speed:</strong> ~7.66 km/s (27,600 km/h or 17,100 mph!)</li>
              <li><strong>Inclination:</strong> 51.6° (enables launches from USA and Russia)</li>
              <li><strong>Orbits per day:</strong> ~15.5 orbits</li>
            </ul>
          </div>
          <p className="text-slate-700 mb-4">
            The ISS orbits Earth every 90 minutes, traveling at incredible speed. Astronauts see 16 sunrises and sunsets every day!
          </p>
          <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
            <strong>💡 Try it:</strong> Add a LEO satellite in the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">Simulator</Link> to see ISS-like orbit! Check <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline font-medium">Real Satellite Data</Link> for ISS details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🏗️ Assembly in Space</h2>
          <p className="text-slate-700 mb-4">
            The ISS wasn't built on Earth - it was assembled piece by piece in space! Construction took over 10 years and required more than 40 spaceflights.
          </p>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">1998-2000: Core Modules</h3>
              <p className="text-sm text-slate-700">First modules launched and connected. Russian Zarya and Unity modules formed the foundation.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">2000-2011: Expansion</h3>
              <p className="text-sm text-slate-700">More modules added, solar arrays installed, laboratories added. Space Shuttle was key for assembly.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">2011-Present: Completion & Operations</h3>
              <p className="text-sm text-slate-700">ISS completed. Continuous operations, experiments, and crew rotations. Regular resupply missions.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">👨‍🚀 Life on the ISS</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Living in Microgravity</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Astronauts float - no "up" or "down"</li>
                <li>• Sleep in sleeping bags tied to walls</li>
                <li>• Food floats - must be secured</li>
                <li>• Exercise 2+ hours daily to prevent muscle/bone loss</li>
                <li>• See 16 sunrises/sunsets per day!</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Daily Activities</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Science experiments</li>
                <li>• Maintenance and repairs</li>
                <li>• Exercise (treadmill, bike, weights)</li>
                <li>• Communication with Earth</li>
                <li>• Spacewalks (EVAs) for repairs</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⚡ Power Generation</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Solar Arrays:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Size:</strong> 8 solar array wings, each 35 meters long</li>
              <li><strong>Total area:</strong> ~2,500 square meters (about 6 basketball courts!)</li>
              <li><strong>Power:</strong> ~84-120 kilowatts (enough for 40+ homes)</li>
              <li><strong>Batteries:</strong> Store power for when ISS is in Earth's shadow</li>
              <li><strong>Efficiency:</strong> Arrays rotate to face the Sun as ISS orbits</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 Science on the ISS</h2>
          <p className="text-slate-700 mb-4">
            The ISS is a unique laboratory where scientists can study things impossible on Earth:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Microgravity Research</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• How fluids behave without gravity</li>
                <li>• Crystal growth (better crystals in space!)</li>
                <li>• Combustion studies</li>
                <li>• Materials science</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Biology & Medicine</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• How human body adapts to space</li>
                <li>• Plant growth experiments</li>
                <li>• Protein crystallization</li>
                <li>• Drug development</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-slate-800 mb-2">Earth Observation</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Climate monitoring</li>
                <li>• Disaster response</li>
                <li>• Ocean studies</li>
                <li>• Weather patterns</li>
              </ul>
            </div>
            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <h3 className="font-bold text-slate-800 mb-2">Astronomy</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Cosmic ray detection</li>
                <li>• Dark matter research</li>
                <li>• Exoplanet studies</li>
                <li>• Space telescope operations</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 Getting to the ISS</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">SpaceX Dragon</h3>
              <p className="text-sm text-slate-700">Currently the primary way astronauts get to ISS. Reusable spacecraft launched on Falcon 9 rocket.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Soyuz (Russia)</h3>
              <p className="text-sm text-slate-700">Long-serving spacecraft. Used for crew transport and emergency escape vehicle.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Resupply Missions</h3>
              <p className="text-sm text-slate-700">Regular cargo missions bring food, water, experiments, and supplies. SpaceX Dragon, Northrop Grumman Cygnus, and others.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔧 Life Support Systems</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Critical Systems:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Oxygen Generation:</strong> Electrolysis splits water into oxygen and hydrogen</li>
              <li><strong>CO₂ Removal:</strong> Filters remove carbon dioxide from air</li>
              <li><strong>Water Recycling:</strong> Recycles urine and sweat into drinking water (95% efficiency!)</li>
              <li><strong>Temperature Control:</strong> Radiators reject heat into space</li>
              <li><strong>Atmosphere:</strong> Maintains Earth-like pressure and composition</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 ISS Specifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Size</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Length: 109 meters (357 feet)</li>
                <li>• Width: 73 meters (240 feet)</li>
                <li>• Mass: ~450,000 kg (1 million pounds!)</li>
                <li>• Volume: ~916 m³ (32,333 cubic feet)</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Crew</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Normal crew: 6-7 astronauts</li>
                <li>• Maximum: 13 (during crew handovers)</li>
                <li>• Continuous occupation since 2000</li>
                <li>• Crew rotations every 6 months</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧮 The Physics</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Orbital Mechanics:</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li><strong>Orbital Velocity:</strong> v = √(GM/r) ≈ 7.66 km/s for ISS altitude</li>
              <li><strong>Orbital Period:</strong> T = 2π√(a³/μ) ≈ 92.7 minutes</li>
              <li><strong>Why it doesn't fall:</strong> Horizontal velocity balances gravity - same physics as our simulator!</li>
              <li><strong>Orbital Decay:</strong> ISS loses ~2 km altitude per month due to atmospheric drag. Needs periodic boosts.</li>
              <li><strong>Reboost:</strong> Visiting spacecraft (like Progress) fire engines to raise ISS altitude</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 See ISS Orbit!</h2>
          <p className="text-slate-700 mb-4">
            The ISS orbits in Low Earth Orbit - add a LEO satellite in our simulator to see how it moves!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </Link>
            <Link href="/satellites" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                ISS Data →
              </Link>
            <Link href="/learn/orbital-mechanics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Orbital Mechanics →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/satellites" className="text-[var(--accent-cyan)] hover:underline">Real Satellite Data</Link>
            <span>·</span>
            <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">Orbital Mechanics</Link>
            <span>·</span>
            <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
            <span>·</span>
            <Link href="/learn/space-questions" className="text-[var(--accent-cyan)] hover:underline">Why Astronauts Float</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
