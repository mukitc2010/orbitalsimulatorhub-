import { Link } from "wouter";

export function Astrophysics() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Astrophysics</h1>
        <p className="subhead">
          Learn about the physics of stars, galaxies, black holes, and the universe. Discover the mathematics behind cosmic phenomena and how NASA studies them.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌌 What is Astrophysics?</h2>
        <p className="text-slate-700">
          Astrophysics applies physics and mathematics to understand the universe: stars, planets, galaxies, black holes, dark matter, and the Big Bang. NASA uses astrophysics to explore and understand our cosmos!
        </p>
      </div>

      <section className="space-y-8">
        {/* Stars */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⭐ Stars: Nuclear Fusion & Stellar Physics</h2>
          <p className="text-slate-700 mb-4">
            Stars are massive balls of plasma powered by nuclear fusion. The same physics that powers stars also explains why they shine!
          </p>

          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">Nuclear Fusion</h3>
            <p className="text-slate-700 mb-3">
              Stars fuse hydrogen into helium, releasing enormous energy:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              4H → He + 2e⁺ + 2ν + energy
            </div>
            <p className="text-sm text-slate-700 mb-3">
              <strong>Mass-Energy Conversion (Einstein):</strong>
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              E = mc²
            </div>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• <strong>E</strong> = energy released</li>
              <li>• <strong>m</strong> = mass converted (mass defect)</li>
              <li>• <strong>c</strong> = speed of light = 3 × 10⁸ m/s</li>
              <li>• <strong>Result:</strong> Sun converts 4 million tons of mass to energy every second!</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Stellar Structure Equations</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Hydrostatic Equilibrium:</p>
                <div className="font-mono text-sm mb-2">dP/dr = -GM(r)ρ/r²</div>
                <p className="text-xs text-slate-600">Pressure balances gravity at each layer</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Mass Continuity:</p>
                <div className="font-mono text-sm mb-2">dM/dr = 4πr²ρ</div>
                <p className="text-xs text-slate-600">Mass distribution in star</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Energy Transport:</p>
                <div className="font-mono text-sm mb-2">dT/dr = -3κρL/(16πacr²T³)</div>
                <p className="text-xs text-slate-600">How energy moves through star (radiation/convection)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Black Holes */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🕳️ Black Holes: General Relativity</h2>
          <p className="text-slate-700 mb-4">
            Black holes are regions where gravity is so strong that nothing, not even light, can escape. NASA studies them using Einstein's theory of general relativity!
          </p>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-lg p-5 border-2 border-slate-700">
            <h3 className="font-bold mb-3">Schwarzschild Radius (Event Horizon)</h3>
            <div className="bg-slate-700 rounded p-3 mb-3 font-mono text-sm">
              R_s = 2GM/c²
            </div>
            <p className="text-sm mb-3">
              The radius of a black hole's event horizon:
            </p>
            <ul className="text-sm space-y-1 mb-3">
              <li>• <strong>G</strong> = gravitational constant</li>
              <li>• <strong>M</strong> = mass of black hole</li>
              <li>• <strong>c</strong> = speed of light</li>
            </ul>
            <div className="bg-slate-700 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="space-y-1">
                <li>• <strong>Solar mass black hole:</strong> R_s ≈ 3 km</li>
                <li>• <strong>Sagittarius A* (Milky Way center):</strong> M ≈ 4 million Suns, R_s ≈ 12 million km</li>
                <li>• <strong>If Earth became black hole:</strong> R_s ≈ 9 mm!</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 mt-4">
            <h3 className="font-bold text-slate-800 mb-3">Hawking Radiation</h3>
            <p className="text-slate-700 mb-3">
              Quantum effects cause black holes to slowly evaporate:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              T = ħc³/(8πGMk_B)
            </div>
            <p className="text-sm text-slate-700">
              Where T = black hole temperature, ħ = Planck's constant, k_B = Boltzmann constant. Smaller black holes are hotter and evaporate faster!
            </p>
          </div>
        </div>

        {/* Dark Matter & Dark Energy */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌑 Dark Matter & Dark Energy</h2>
          <p className="text-slate-700 mb-4">
            Most of the universe is invisible! Dark matter and dark energy make up ~95% of the universe's mass-energy.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Dark Matter (~27%)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Invisible matter that doesn't emit light</li>
                <li>• Detected by gravitational effects</li>
                <li>• Holds galaxies together</li>
                <li>• Composition unknown (WIMPs, axions?)</li>
                <li>• NASA studies via gravitational lensing</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Dark Energy (~68%)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Causes universe expansion to accelerate</li>
                <li>• Repulsive force (opposite of gravity)</li>
                <li>• Discovered via supernova observations</li>
                <li>• Nature unknown</li>
                <li>• NASA studies via Hubble & James Webb</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cosmology */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌌 Cosmology: The Big Bang & Expansion</h2>
          <p className="text-slate-700 mb-4">
            The universe began ~13.8 billion years ago and is still expanding!
          </p>

          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Hubble's Law</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              v = H₀ × d
            </div>
            <p className="text-slate-700 mb-3">
              Galaxies recede from us at speeds proportional to distance:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>v</strong> = recession velocity</li>
              <li>• <strong>H₀</strong> = Hubble constant ≈ 70 km/s/Mpc</li>
              <li>• <strong>d</strong> = distance to galaxy</li>
            </ul>
            <div className="bg-blue-50 rounded p-3 text-sm border border-blue-200">
              <p className="font-semibold mb-1">Example:</p>
              <p className="text-slate-700">Galaxy 100 Mpc away moves at ~7,000 km/s!</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 mt-4">
            <h3 className="font-bold text-slate-800 mb-3">Friedmann Equations</h3>
            <p className="text-slate-700 mb-3">
              Describe universe expansion:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              (ȧ/a)² = (8πG/3)ρ - kc²/a² + Λc²/3
            </div>
            <p className="text-sm text-slate-700">
              Where ȧ = expansion rate, a = scale factor, ρ = density, k = curvature, Λ = cosmological constant (dark energy).
            </p>
          </div>
        </div>

        {/* Exoplanets */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🪐 Exoplanets: Finding Other Worlds</h2>
          <p className="text-slate-700 mb-4">
            NASA has discovered thousands of planets around other stars! Here's the physics behind detection methods:
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Transit Method</h3>
              <p className="text-sm text-slate-700 mb-2">
                Planet passes in front of star, blocking light:
              </p>
              <div className="bg-white rounded p-2 font-mono text-xs mb-2">
                ΔF/F = (R_p/R_s)²
              </div>
              <p className="text-xs text-slate-600">
                Where R_p = planet radius, R_s = star radius. Used by Kepler and TESS missions!
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Radial Velocity Method</h3>
              <p className="text-sm text-slate-700 mb-2">
                Planet's gravity causes star to wobble:
              </p>
              <div className="bg-white rounded p-2 font-mono text-xs mb-2">
                v = K × sin(i) × √(1 - e²)
              </div>
              <p className="text-xs text-slate-600">
                Measures Doppler shift in star's spectrum. Detects massive planets close to stars.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Gravitational Microlensing</h3>
              <p className="text-sm text-slate-700 mb-2">
                Planet's gravity bends light from background star:
              </p>
              <div className="bg-white rounded p-2 font-mono text-xs mb-2">
                θ_E = √(4GM/(c²d))
              </div>
              <p className="text-xs text-slate-600">
                Einstein's general relativity in action! Can detect planets very far away.
              </p>
            </div>
          </div>
        </div>

        {/* NASA Missions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 NASA Astrophysics Missions</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">James Webb Space Telescope (JWST)</h3>
              <p className="text-sm text-slate-700">Infrared telescope studying first stars, galaxies, exoplanets. Launched 2021.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Hubble Space Telescope</h3>
              <p className="text-sm text-slate-700">Visible/UV telescope. Operating since 1990, revolutionized astronomy!</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Chandra X-ray Observatory</h3>
              <p className="text-sm text-slate-700">Studies black holes, neutron stars, supernovae via X-rays.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Kepler & TESS</h3>
              <p className="text-sm text-slate-700">Exoplanet hunters. Discovered thousands of planets!</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">LIGO/Virgo</h3>
              <p className="text-sm text-slate-700">Detects gravitational waves from merging black holes and neutron stars.</p>
            </div>
          </div>
        </div>

        {/* Key Formulas */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Key Astrophysics Formulas</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-5 border-2 border-blue-200">
            <div className="space-y-4">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Stellar Luminosity:</p>
                <div className="font-mono text-sm">L = 4πR²σT⁴</div>
                <p className="text-xs text-slate-600 mt-1">Stefan-Boltzmann law: energy radiated by star</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Planetary Temperature:</p>
                <div className="font-mono text-sm">T = (L_s/(16πσd²))^(1/4)</div>
                <p className="text-xs text-slate-600 mt-1">Equilibrium temperature of planet at distance d</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Schwarzschild Radius:</p>
                <div className="font-mono text-sm">R_s = 2GM/c²</div>
                <p className="text-xs text-slate-600 mt-1">Event horizon of black hole</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Redshift:</p>
                <div className="font-mono text-sm">z = (λ_obs - λ_emit)/λ_emit</div>
                <p className="text-xs text-slate-600 mt-1">Measures cosmic expansion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore More!</h2>
          <p className="text-slate-700 mb-4">
            Astrophysics uses the same orbital mechanics principles! Learn how planets and satellites orbit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/how-solar-system-works">
              <a className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                How Solar System Works →
              </a>
            </Link>
            <Link href="/learn/quantum-physics">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Quantum Physics →
              </a>
            </Link>
            <Link href="/formulas-library">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Formulas →
              </a>
            </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/how-solar-system-works">
              <a className="text-[var(--accent-cyan)] hover:underline">How Solar System Works</a>
            </Link>
            <span>·</span>
            <Link href="/learn/quantum-physics">
              <a className="text-[var(--accent-cyan)] hover:underline">Quantum Physics</a>
            </Link>
            <span>·</span>
            <Link href="/learn/what-is-moon">
              <a className="text-[var(--accent-cyan)] hover:underline">What is the Moon?</a>
            </Link>
            <span>·</span>
            <Link href="/formulas-library">
              <a className="text-[var(--accent-cyan)] hover:underline">Formulas</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
