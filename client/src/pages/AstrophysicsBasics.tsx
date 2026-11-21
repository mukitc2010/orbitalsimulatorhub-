import { Link } from "wouter";

export function AstrophysicsBasics() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Astrophysics Basics</h1>
        <p className="subhead">
          Learn the fundamentals of astrophysics: stars, galaxies, black holes, cosmic distances, and how NASA studies the universe. Real science behind space exploration.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌌 What is Astrophysics?</h2>
        <p className="text-slate-700">
          Astrophysics is the branch of astronomy that uses physics and mathematics to understand how the universe works. It explains stars, planets, galaxies, black holes, and the cosmos itself!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⭐ Stars: The Building Blocks</h2>
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">How Stars Work:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Nuclear Fusion:</strong> Stars fuse hydrogen into helium, releasing enormous energy (E = mc²)</li>
              <li><strong>Balance:</strong> Gravity pulls inward, fusion pressure pushes outward - perfect balance!</li>
              <li><strong>Life Cycle:</strong> Nebula → Protostar → Main Sequence → Red Giant → White Dwarf/Neutron Star/Black Hole</li>
              <li><strong>Our Sun:</strong> A medium-sized star, ~4.6 billion years old, will live ~10 billion years total</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-slate-800 mb-2">The Math: Stellar Mass-Luminosity Relation</h3>
            <p className="font-mono text-sm bg-white p-2 rounded mb-2">L ∝ M^3.5</p>
            <p className="text-sm text-slate-700">
              A star's brightness (luminosity) increases dramatically with mass. A star 2× more massive is ~11× brighter!
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌌 Galaxies: Cities of Stars</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Types of Galaxies</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Spiral:</strong> Like our Milky Way - rotating disk with arms</li>
                <li>• <strong>Elliptical:</strong> Round or oval, older stars</li>
                <li>• <strong>Irregular:</strong> No defined shape</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Milky Way Facts</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Stars:</strong> ~100-400 billion</li>
                <li>• <strong>Diameter:</strong> ~100,000 light-years</li>
                <li>• <strong>Our position:</strong> ~27,000 light-years from center</li>
                <li>• <strong>Rotation:</strong> Takes ~225 million years for one orbit!</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🕳️ Black Holes: Gravity's Ultimate Victory</h2>
          <p className="text-slate-700 mb-4">
            Black holes are regions where gravity is so strong that nothing, not even light, can escape!
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Concepts:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Event Horizon:</strong> The "point of no return" - boundary where escape velocity = speed of light</li>
              <li><strong>Schwarzschild Radius:</strong> r_s = 2GM/c² - size of event horizon</li>
              <li><strong>Formation:</strong> When massive stars collapse (supernova) or merge</li>
              <li><strong>Supermassive:</strong> Black holes at galaxy centers, millions to billions times Sun's mass!</li>
            </ul>
            <div className="bg-purple-50 rounded-lg p-3 mt-3 border border-purple-200">
              <p className="font-mono text-sm bg-white p-2 rounded mb-2">r_s = 2GM / c²</p>
              <p className="text-xs text-slate-700">
                For a black hole with Sun's mass: r_s ≈ 3 km. For Earth: r_s ≈ 9 mm!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📏 Cosmic Distances & Scales</h2>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Light-Year</h3>
              <p className="text-sm text-slate-700 mb-2">
                Distance light travels in one year = 9.46 × 10¹² km (about 6 trillion miles!)
              </p>
              <p className="font-mono text-xs bg-white p-2 rounded">1 light-year = c × 1 year = 9.46 × 10¹² km</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Parsec</h3>
              <p className="text-sm text-slate-700 mb-2">
                Astronomical unit of distance: 1 parsec = 3.26 light-years = 3.09 × 10¹³ km
              </p>
              <p className="text-xs text-slate-600">
                Used for measuring distances to stars. Nearest star (Proxima Centauri) = 1.3 parsecs = 4.2 light-years away!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌠 Dark Matter & Dark Energy</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Dark Matter (~27% of universe)</h3>
              <p className="text-sm text-slate-700 mb-2">
                Invisible matter that doesn't emit light but has gravity. We know it exists because galaxies rotate faster than visible matter allows!
              </p>
              <p className="text-xs text-slate-600">
                <strong>Evidence:</strong> Galaxy rotation curves show stars moving too fast - must be extra mass we can't see!
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Dark Energy (~68% of universe)</h3>
              <p className="text-sm text-slate-700 mb-2">
                Mysterious force causing universe expansion to accelerate. Discovered in 1998 by observing distant supernovae.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Impact:</strong> Universe is expanding faster and faster - galaxies moving apart at increasing speed!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔭 How NASA Studies the Universe</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">James Webb Space Telescope (JWST)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Launched:</strong> 2021, operating at L2 point (1.5 million km from Earth)</li>
                <li>• <strong>Purpose:</strong> See first stars and galaxies, study exoplanet atmospheres</li>
                <li>• <strong>Wavelength:</strong> Infrared - can see through dust clouds</li>
                <li>• <strong>Discoveries:</strong> Oldest galaxies ever seen (13+ billion years old!)</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Hubble Space Telescope</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Launched:</strong> 1990, still operating</li>
                <li>• <strong>Discoveries:</strong> Age of universe, dark energy, exoplanets, black holes</li>
                <li>• <strong>Images:</strong> Deep Field images showing thousands of galaxies</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Chandra X-ray Observatory</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Purpose:</strong> Study X-rays from black holes, neutron stars, supernovae</li>
                <li>• <strong>Reveals:</strong> High-energy processes invisible to optical telescopes</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧮 Key Formulas</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Escape Velocity</h3>
              <p className="font-mono text-lg bg-white p-3 rounded-lg mb-2">v_esc = √(2GM/r)</p>
              <p className="text-sm text-slate-700">
                Speed needed to escape a massive object's gravity. For black holes, this equals speed of light at event horizon!
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Schwarzschild Radius (Black Hole)</h3>
              <p className="font-mono text-lg bg-white p-3 rounded-lg mb-2">r_s = 2GM/c²</p>
              <p className="text-sm text-slate-700">
                Size of event horizon for a non-rotating black hole. Everything inside is trapped forever!
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Hubble's Law</h3>
              <p className="font-mono text-lg bg-white p-3 rounded-lg mb-2">v = H₀ × d</p>
              <p className="text-sm text-slate-700">
                Galaxies move away at speed proportional to distance. H₀ ≈ 70 km/s per megaparsec - universe is expanding!
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore More!</h2>
          <p className="text-slate-700 mb-4">
            Astrophysics uses the same physics as orbital mechanics! Learn about orbits and gravity:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/how-solar-system-works" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Solar System →
              </Link>
            <Link href="/learn/orbital-mechanics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Orbital Mechanics →
              </Link>
            <Link href="/formulas-library" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Formulas →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-solar-system-works" className="text-[var(--accent-cyan)] hover:underline">Solar System</Link>
            <span>·</span>
            <Link href="/learn/quantum-physics-basics" className="text-[var(--accent-cyan)] hover:underline">Quantum Physics</Link>
            <span>·</span>
            <Link href="/learn/newton" className="text-[var(--accent-cyan)] hover:underline">Newton's Laws</Link>
            <span>·</span>
            <Link href="/research" className="text-[var(--accent-cyan)] hover:underline">Research Hub</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
