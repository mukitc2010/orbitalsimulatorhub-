import { Link } from "wouter";
import { AnimatedSolarSystem3D } from "../components/AnimatedSolarSystem3D";
import { SolarSystemLesson } from "../components/SolarSystemLesson";

export function HowSolarSystemWorks() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How the Solar System Works</h1>
        <p className="subhead">
          Discover the mathematics and physics behind our solar system. Learn about planetary motion, Kepler's laws, orbital mechanics, and how NASA uses these principles for space exploration.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🌌 Overview</h2>
        <p className="text-slate-700">
          Our solar system consists of the Sun, 8 planets, moons, asteroids, comets, and other objects, all governed by the same physics that controls satellite orbits around Earth. Understanding these principles helps NASA plan missions to Mars, Jupiter, and beyond!
        </p>
      </div>

      <AnimatedSolarSystem3D />

      <SolarSystemLesson />

      <section className="space-y-8">
        {/* Kepler's Laws */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Kepler's Laws of Planetary Motion</h2>
          <p className="text-slate-700 mb-4">
            Johannes Kepler discovered three laws that describe how planets move around the Sun. These laws apply to all orbiting objects, including satellites around Earth!
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5 border-l-4 border-blue-500">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">First Law: Elliptical Orbits</h3>
              <p className="text-slate-700 mb-3">
                Planets orbit the Sun in elliptical paths, with the Sun at one focus of the ellipse.
              </p>
              <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
                Ellipse equation: (x²/a²) + (y²/b²) = 1
              </div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>a</strong> = semi-major axis (half the longest diameter)</li>
                <li>• <strong>b</strong> = semi-minor axis (half the shortest diameter)</li>
                <li>• <strong>e</strong> = eccentricity = √(1 - b²/a²)</li>
                <li>• e = 0 → circle, e = 1 → parabola (escape)</li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                <strong>Example:</strong> Earth's orbit has e ≈ 0.017 (nearly circular). Mercury has e ≈ 0.21 (more elliptical).
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Second Law: Equal Areas in Equal Times</h3>
              <p className="text-slate-700 mb-3">
                A line connecting a planet to the Sun sweeps out equal areas in equal time intervals. This means planets move faster when closer to the Sun!
              </p>
              <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
                dA/dt = (1/2) × r² × dθ/dt = constant
              </div>
              <p className="text-sm text-slate-700 mb-2">
                Where:
              </p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>dA/dt</strong> = rate of area swept</li>
                <li>• <strong>r</strong> = distance from Sun</li>
                <li>• <strong>dθ/dt</strong> = angular velocity</li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                <strong>Example:</strong> Earth moves fastest at perihelion (closest to Sun, ~147 million km) and slowest at aphelion (farthest, ~152 million km).
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-5 border-l-4 border-purple-500">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Third Law: Orbital Period vs Distance</h3>
              <p className="text-slate-700 mb-3">
                The square of the orbital period is proportional to the cube of the semi-major axis. This allows NASA to calculate how long missions will take!
              </p>
              <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
                T² = (4π²/GM) × a³
              </div>
              <p className="text-sm text-slate-700 mb-2">
                Where:
              </p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>T</strong> = orbital period (time for one orbit)</li>
                <li>• <strong>a</strong> = semi-major axis</li>
                <li>• <strong>G</strong> = gravitational constant (6.674 × 10⁻¹¹ m³/kg·s²)</li>
                <li>• <strong>M</strong> = mass of central body (Sun for planets)</li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                <strong>Example:</strong> Earth: T = 1 year, a = 1 AU. Mars: T ≈ 1.88 years, a ≈ 1.52 AU. Check: (1.88)² ≈ (1.52)³ ✓
              </p>
            </div>
          </div>
        </div>

        {/* Newton's Universal Law of Gravitation */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Newton's Universal Law of Gravitation</h2>
          <p className="text-slate-700 mb-4">
            Isaac Newton explained why planets orbit the Sun: gravity! The same force that makes apples fall also keeps planets in orbit.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border-2 border-blue-200">
            <div className="bg-white rounded p-4 mb-3 font-mono text-lg text-center">
              F = G × (m₁ × m₂) / r²
            </div>
            <p className="text-slate-700 mb-3">
              <strong>Gravitational force</strong> between two objects:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>F</strong> = gravitational force (Newtons)</li>
              <li>• <strong>G</strong> = 6.674 × 10⁻¹¹ m³/kg·s² (gravitational constant)</li>
              <li>• <strong>m₁, m₂</strong> = masses of the two objects (kg)</li>
              <li>• <strong>r</strong> = distance between centers (meters)</li>
            </ul>
            <div className="bg-slate-100 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Real Examples:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Sun-Earth:</strong> F ≈ 3.5 × 10²² N (keeps Earth in orbit!)</li>
                <li>• <strong>Earth-Moon:</strong> F ≈ 2.0 × 10²⁰ N (keeps Moon in orbit!)</li>
                <li>• <strong>Earth-Satellite:</strong> F ≈ 8.7 × 10³ N (for ISS at 400 km)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Orbital Velocity */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⚡ Orbital Velocity in the Solar System</h2>
          <p className="text-slate-700 mb-4">
            Each planet moves at a specific speed to stay in orbit. Too slow = falls into Sun. Too fast = escapes solar system. Just right = stable orbit!
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              v = √(GM/r)
            </div>
            <p className="text-slate-700 mb-4">
              For circular orbits around the Sun:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-2 text-left">Planet</th>
                    <th className="px-4 py-2 text-left">Distance (AU)</th>
                    <th className="px-4 py-2 text-left">Orbital Velocity (km/s)</th>
                    <th className="px-4 py-2 text-left">Period (years)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium">Mercury</td>
                    <td className="px-4 py-2">0.39</td>
                    <td className="px-4 py-2">47.4</td>
                    <td className="px-4 py-2">0.24</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-2 font-medium">Venus</td>
                    <td className="px-4 py-2">0.72</td>
                    <td className="px-4 py-2">35.0</td>
                    <td className="px-4 py-2">0.62</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium">Earth</td>
                    <td className="px-4 py-2">1.00</td>
                    <td className="px-4 py-2">29.8</td>
                    <td className="px-4 py-2">1.00</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-2 font-medium">Mars</td>
                    <td className="px-4 py-2">1.52</td>
                    <td className="px-4 py-2">24.1</td>
                    <td className="px-4 py-2">1.88</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium">Jupiter</td>
                    <td className="px-4 py-2">5.20</td>
                    <td className="px-4 py-2">13.1</td>
                    <td className="px-4 py-2">11.86</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-2 font-medium">Saturn</td>
                    <td className="px-4 py-2">9.58</td>
                    <td className="px-4 py-2">9.7</td>
                    <td className="px-4 py-2">29.46</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              <strong>Note:</strong> 1 AU (Astronomical Unit) = 149.6 million km = average Earth-Sun distance. Notice: farther planets move slower!
            </p>
          </div>
        </div>

        {/* Escape Velocity */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 Escape Velocity from Planets</h2>
          <p className="text-slate-700 mb-4">
            To leave a planet's gravity, you need escape velocity. NASA uses this to plan missions!
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              v_esc = √(2GM/r)
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-800 mb-2">From Planet Surface:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <strong>Mercury:</strong> 4.3 km/s</li>
                  <li>• <strong>Venus:</strong> 10.4 km/s</li>
                  <li>• <strong>Earth:</strong> 11.2 km/s</li>
                  <li>• <strong>Mars:</strong> 5.0 km/s</li>
                  <li>• <strong>Jupiter:</strong> 59.5 km/s</li>
                  <li>• <strong>Saturn:</strong> 35.5 km/s</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-2">From Solar System:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <strong>From Earth orbit:</strong> ~42.1 km/s</li>
                  <li>• <strong>Voyager 1 & 2:</strong> Used gravity assists to reach escape velocity!</li>
                  <li>• <strong>New Horizons:</strong> Fastest launch ever (~16.2 km/s) to reach Pluto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Hohmann Transfer */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔄 Hohmann Transfer Orbits</h2>
          <p className="text-slate-700 mb-4">
            NASA uses Hohmann transfer orbits to efficiently move spacecraft between planets. This is the most fuel-efficient way to travel!
          </p>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <h3 className="font-bold text-slate-800 mb-3">How It Works:</h3>
            <ol className="text-slate-700 space-y-2 mb-4">
              <li>1. <strong>Start:</strong> Spacecraft in circular orbit around Earth (r₁)</li>
              <li>2. <strong>Transfer burn:</strong> Increase speed to enter elliptical transfer orbit</li>
              <li>3. <strong>Coast:</strong> Travel along ellipse to target planet (r₂)</li>
              <li>4. <strong>Arrival burn:</strong> Match target planet's orbit</li>
            </ol>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              Δv₁ = √(GM/r₁) × (√(2r₂/(r₁+r₂)) - 1)
              <br />
              Δv₂ = √(GM/r₂) × (1 - √(2r₁/(r₁+r₂)))
            </div>
            <p className="text-sm text-slate-700 mb-3">
              Total Δv needed = Δv₁ + Δv₂
            </p>
            <div className="bg-slate-100 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Example: Earth to Mars Transfer:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• r₁ = 1.0 AU (Earth), r₂ = 1.52 AU (Mars)</li>
                <li>• Δv₁ ≈ 2.9 km/s (departure burn)</li>
                <li>• Δv₂ ≈ 2.6 km/s (arrival burn)</li>
                <li>• <strong>Total:</strong> ~5.5 km/s (much less than escape velocity!)</li>
                <li>• <strong>Travel time:</strong> ~8.5 months</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gravity Assists */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌊 Gravity Assists (Slingshot Maneuvers)</h2>
          <p className="text-slate-700 mb-4">
            NASA uses planets' gravity to speed up or slow down spacecraft without using fuel! This is how Voyager reached the outer planets.
          </p>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Physics:</h3>
            <p className="text-slate-700 mb-3">
              When a spacecraft passes behind a planet (in the planet's orbital direction), it gains speed. Passing in front slows it down.
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              v_final = v_spacecraft + 2 × v_planet
            </div>
            <div className="bg-blue-50 rounded p-3 text-sm border border-blue-200">
              <p className="font-semibold mb-2">Real Examples:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Voyager 2:</strong> Used Jupiter, Saturn, Uranus, Neptune gravity assists</li>
                <li>• <strong>Cassini:</strong> Used Venus (twice!), Earth, Jupiter to reach Saturn</li>
                <li>• <strong>Juno:</strong> Used Earth gravity assist to reach Jupiter</li>
                <li>• <strong>New Horizons:</strong> Used Jupiter to reach Pluto faster</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solar System Structure */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌍 Solar System Structure</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Inner Planets (Terrestrial)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Mercury, Venus, Earth, Mars</strong></li>
                <li>• Rocky composition</li>
                <li>• Close to Sun</li>
                <li>• Few or no moons</li>
                <li>• Thin or no atmospheres</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Outer Planets (Gas Giants)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Jupiter, Saturn, Uranus, Neptune</strong></li>
                <li>• Mostly gas (hydrogen, helium)</li>
                <li>• Far from Sun</li>
                <li>• Many moons</li>
                <li>• Thick atmospheres</li>
              </ul>
            </div>
          </div>
        </div>

        {/* NASA Applications */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 How NASA Uses This Math</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Mission Planning</h3>
              <p className="text-sm text-slate-700">
                NASA calculates launch windows using Hohmann transfers. The best time to launch to Mars happens every ~26 months when planets align!
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Trajectory Design</h3>
              <p className="text-sm text-slate-700">
                Using Kepler's laws and orbital mechanics, NASA plans complex multi-planet missions like Voyager and Cassini.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Fuel Efficiency</h3>
              <p className="text-sm text-slate-700">
                Gravity assists save massive amounts of fuel. Without them, missions to outer planets would be impossible or require huge rockets!
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore More!</h2>
          <p className="text-slate-700 mb-4">
            The same physics that governs the solar system also controls satellites around Earth! Try the simulator to see orbits in action.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator">
              <a className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </a>
            </Link>
            <Link href="/formulas-library">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Formula Library →
              </a>
            </Link>
            <Link href="/learn/what-is-moon">
              <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                What is the Moon? →
              </a>
            </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/orbital-mechanics">
              <a className="text-[var(--accent-cyan)] hover:underline">Orbital Mechanics</a>
            </Link>
            <span>·</span>
            <Link href="/learn/what-is-moon">
              <a className="text-[var(--accent-cyan)] hover:underline">What is the Moon?</a>
            </Link>
            <span>·</span>
            <Link href="/learn/astrophysics">
              <a className="text-[var(--accent-cyan)] hover:underline">Astrophysics</a>
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
