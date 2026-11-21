import { Link } from "wouter";

export function WhatIsMoon() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">What is the Moon?</h1>
        <p className="subhead">
          Scientific and realistic information about Earth's Moon. Learn about its formation, composition, orbit, phases, tides, and how NASA studies it.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌙 The Moon: Earth's Natural Satellite</h2>
        <p className="text-slate-700">
          The Moon is Earth's only natural satellite, orbiting our planet at an average distance of 384,400 km. It's the 5th largest moon in the solar system and plays a crucial role in Earth's tides, climate, and even the length of our day!
        </p>
      </div>

      <section className="space-y-8">
        {/* Basic Facts */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📊 Moon Facts & Data</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-3">Physical Properties</h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Diameter:</strong> 3,474 km (about 1/4 Earth's diameter)</li>
                <li>• <strong>Mass:</strong> 7.342 × 10²² kg (1.2% of Earth's mass)</li>
                <li>• <strong>Density:</strong> 3.34 g/cm³ (less dense than Earth's 5.51 g/cm³)</li>
                <li>• <strong>Surface gravity:</strong> 1.62 m/s² (16.6% of Earth's gravity)</li>
                <li>• <strong>Surface area:</strong> 37.9 million km² (about size of Africa)</li>
                <li>• <strong>Volume:</strong> 2.195 × 10¹⁰ km³</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-3">Orbital Properties</h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Average distance:</strong> 384,400 km</li>
                <li>• <strong>Perigee (closest):</strong> 363,300 km</li>
                <li>• <strong>Apogee (farthest):</strong> 405,500 km</li>
                <li>• <strong>Orbital period:</strong> 27.3 days (sidereal month)</li>
                <li>• <strong>Synodic period:</strong> 29.5 days (full cycle of phases)</li>
                <li>• <strong>Orbital speed:</strong> ~1.0 km/s</li>
                <li>• <strong>Inclination:</strong> 5.1° to Earth's equator</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formation */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 How the Moon Formed</h2>
          <p className="text-slate-700 mb-4">
            The leading theory is the <strong>Giant Impact Hypothesis</strong>, supported by NASA research:
          </p>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-5 border-2 border-orange-200">
            <h3 className="font-bold text-slate-800 mb-3">The Giant Impact (4.5 billion years ago)</h3>
            <ol className="text-slate-700 space-y-2 mb-4">
              <li>1. <strong>Collision:</strong> Mars-sized object (Theia) collided with early Earth</li>
              <li>2. <strong>Debris:</strong> Massive impact ejected material into orbit</li>
              <li>3. <strong>Accretion:</strong> Debris coalesced to form the Moon</li>
              <li>4. <strong>Cooling:</strong> Moon cooled and solidified over millions of years</li>
            </ol>
            <div className="bg-white rounded p-3 text-sm">
              <p className="font-semibold mb-2">Evidence:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• Moon's composition matches Earth's mantle (not core)</li>
                <li>• Moon has less iron than Earth (core stayed with Earth)</li>
                <li>• Computer simulations match this scenario</li>
                <li>• Moon rocks from Apollo missions support this theory</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧪 Moon Composition</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Surface (Crust)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Regolith:</strong> Fine dust and rocky debris (meters deep)</li>
                <li>• <strong>Rocks:</strong> Basalt (dark areas) and anorthosite (light areas)</li>
                <li>• <strong>Minerals:</strong> Silicates, oxides, metals</li>
                <li>• <strong>No atmosphere:</strong> No protection from space weather</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Interior Structure</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Crust:</strong> 50-60 km thick</li>
                <li>• <strong>Mantle:</strong> ~1,000 km thick (solid rock)</li>
                <li>• <strong>Core:</strong> Small iron core (~350 km radius)</li>
                <li>• <strong>No magnetic field:</strong> Core is too small</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Orbital Mechanics */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Moon's Orbit: The Math</h2>
          <p className="text-slate-700 mb-4">
            The Moon orbits Earth following the same physics as satellites! Here's the math:
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Orbital Velocity</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              v = √(GM/r)
            </div>
            <p className="text-slate-700 mb-3">
              For the Moon:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• G = 6.674 × 10⁻¹¹ m³/kg·s²</li>
              <li>• M = Earth's mass = 5.972 × 10²⁴ kg</li>
              <li>• r = 384,400 km = 3.844 × 10⁸ m</li>
              <li>• <strong>v ≈ 1.02 km/s</strong> (much slower than satellites!)</li>
            </ul>
            <div className="bg-blue-50 rounded p-3 text-sm border border-blue-200">
              <p className="font-semibold mb-1">Comparison:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>ISS:</strong> ~7.66 km/s at 400 km altitude</li>
                <li>• <strong>Moon:</strong> ~1.02 km/s at 384,400 km</li>
                <li>• <strong>Why slower?</strong> Farther from Earth = less gravity = slower speed needed!</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 mt-4">
            <h3 className="font-bold text-slate-800 mb-3">Orbital Period (Kepler's Third Law)</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              T² = (4π²/GM) × a³
            </div>
            <p className="text-slate-700 mb-3">
              For the Moon:
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• a = semi-major axis = 384,400 km</li>
              <li>• <strong>T ≈ 27.3 days</strong> (sidereal month)</li>
              <li>• This matches observations perfectly!</li>
            </ul>
          </div>
        </div>

        {/* Phases */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌓 Moon Phases</h2>
          <p className="text-slate-700 mb-4">
            The Moon appears to change shape because we see different amounts of its sunlit side as it orbits Earth.
          </p>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <h3 className="font-bold text-slate-800 mb-3">The Cycle (29.5 days):</h3>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white rounded p-3 text-center">
                <p className="font-bold text-lg mb-1">🌑</p>
                <p className="font-semibold text-sm">New Moon</p>
                <p className="text-xs text-slate-600">Moon between Earth & Sun</p>
              </div>
              <div className="bg-white rounded p-3 text-center">
                <p className="font-bold text-lg mb-1">🌓</p>
                <p className="font-semibold text-sm">First Quarter</p>
                <p className="text-xs text-slate-600">Half lit (right side)</p>
              </div>
              <div className="bg-white rounded p-3 text-center">
                <p className="font-bold text-lg mb-1">🌕</p>
                <p className="font-semibold text-sm">Full Moon</p>
                <p className="text-xs text-slate-600">Fully lit face</p>
              </div>
              <div className="bg-white rounded p-3 text-center">
                <p className="font-bold text-lg mb-1">🌗</p>
                <p className="font-semibold text-sm">Last Quarter</p>
                <p className="text-xs text-slate-600">Half lit (left side)</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-4">
              <strong>Why 29.5 days?</strong> Moon orbits in 27.3 days, but Earth also moves around Sun, so it takes 29.5 days to return to same phase (synodic period).
            </p>
          </div>
        </div>

        {/* Tides */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌊 Tides: Moon's Gravitational Effect</h2>
          <p className="text-slate-700 mb-4">
            The Moon's gravity creates tides on Earth. This is a real-world application of Newton's law of gravity!
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">The Physics:</h3>
            <p className="text-slate-700 mb-3">
              Moon's gravity pulls on Earth's oceans. The side facing the Moon experiences high tide, and the opposite side also has high tide (due to Earth being pulled away from water).
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              Tidal force ∝ (2GM × m × r) / d³
            </div>
            <p className="text-sm text-slate-700 mb-3">
              Where:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>M</strong> = Moon's mass</li>
              <li>• <strong>m</strong> = mass of water</li>
              <li>• <strong>r</strong> = Earth's radius</li>
              <li>• <strong>d</strong> = Earth-Moon distance</li>
            </ul>
            <div className="bg-blue-50 rounded p-3 text-sm border border-blue-200">
              <p className="font-semibold mb-2">Tidal Effects:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>High tide:</strong> ~12 hours apart (twice daily)</li>
                <li>• <strong>Spring tides:</strong> New/Full Moon (Sun + Moon aligned)</li>
                <li>• <strong>Neap tides:</strong> Quarter Moon (Sun + Moon at 90°)</li>
                <li>• <strong>Tidal locking:</strong> Moon's rotation matches its orbit (we only see one side!)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* NASA Moon Missions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 NASA Moon Missions</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Apollo Program (1969-1972)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Apollo 11:</strong> First humans on Moon (Neil Armstrong, Buzz Aldrin)</li>
                <li>• <strong>6 landings:</strong> Apollo 11, 12, 14, 15, 16, 17</li>
                <li>• <strong>382 kg:</strong> Moon rocks brought back to Earth</li>
                <li>• <strong>12 astronauts:</strong> Walked on the Moon</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Artemis Program (2024+)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Goal:</strong> Return humans to Moon, establish permanent base</li>
                <li>• <strong>Artemis I:</strong> Uncrewed test flight (2022)</li>
                <li>• <strong>Artemis II:</strong> Crewed orbit around Moon (planned 2025)</li>
                <li>• <strong>Artemis III:</strong> First woman and next man on Moon (planned 2026)</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Lunar Reconnaissance Orbiter (LRO)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Launched:</strong> 2009, still operating!</li>
                <li>• <strong>Purpose:</strong> High-resolution mapping of Moon</li>
                <li>• <strong>Data:</strong> Water ice at poles, detailed surface maps</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Moon Matters */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Why the Moon Matters</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Stabilizes Earth</h3>
              <p className="text-sm text-slate-700">
                Moon's gravity stabilizes Earth's axial tilt, preventing extreme climate variations. Without the Moon, Earth's tilt would vary wildly!
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Creates Tides</h3>
              <p className="text-sm text-slate-700">
                Tides mix ocean waters, affecting marine life and ocean currents. Tidal energy is also a renewable resource.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-slate-800 mb-2">Slows Earth's Rotation</h3>
              <p className="text-sm text-slate-700">
                Tidal friction gradually slows Earth's rotation, lengthening our day. Billions of years ago, a day was only ~18 hours!
              </p>
            </div>
            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <h3 className="font-bold text-slate-800 mb-2">Future Exploration</h3>
              <p className="text-sm text-slate-700">
                Moon could be a stepping stone to Mars, source of resources (water, helium-3), and base for deep space missions.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Learn More!</h2>
          <p className="text-slate-700 mb-4">
            The Moon orbits Earth using the same physics as satellites. Explore orbital mechanics and see how it all connects!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/how-solar-system-works" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                How Solar System Works →
              </Link>
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                3D Simulator →
              </Link>
            <Link href="/formulas-library" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Formulas →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-solar-system-works" className="text-[var(--accent-cyan)] hover:underline">How Solar System Works</Link>
            <span>·</span>
            <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">Orbital Mechanics</Link>
            <span>·</span>
            <Link href="/learn/astrophysics" className="text-[var(--accent-cyan)] hover:underline">Astrophysics</Link>
            <span>·</span>
            <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formulas</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
