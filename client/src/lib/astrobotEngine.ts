export type AstroBotMode = "explain" | "math" | "quiz" | "study" | "simulator" | "astronaut" | "planets" | "ai";
export type AstroBotDifficulty = "kids" | "beginner" | "intermediate" | "advanced";

export function generateAstroBotResponse(
  userText: string,
  _mode: AstroBotMode,
  _difficulty: AstroBotDifficulty
): string {
  const q = userText.toLowerCase();

  if (q.includes("kepler")) {
    return `**Kepler's Three Laws of Planetary Motion**

**First Law (Ellipse):** Planets and satellites orbit in ellipses, with the central body at one focus.

**Second Law (Equal Areas):** A line from the planet to the Sun sweeps equal areas in equal time—planets move faster when closer.

**Third Law (T² ∝ a³):** The square of the period is proportional to the cube of the semi-major axis.

**Formula (Earth orbit):** T² = (4π²/μ) × a³. For the solar system: T(years)² = a(AU)³.

**Example:** Earth: a=1 AU, T=1 year. Mars: a=1.52 AU, T≈1.87 years.

You might enjoy exploring the [orbital mechanics guide](/learn/orbital-mechanics) or trying the [simulator](/simulator). Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  if (q.includes("iss") || q.includes("space station")) {
    return `**The International Space Station (ISS)**

**Key parameters:**
- Altitude: ~408 km (varies 400–420 km due to atmospheric drag)
- Orbital velocity: 7.66 km/s (~27,600 km/h)
- Period: 92 minutes—astronauts see 16 sunrises per day
- Inclination: 51.6° (enables access from most launch sites)
- Size: 109 m × 73 m
- Continuous human presence since November 2, 2000

**Partners:** USA, Russia, Europe, Japan, Canada (15 nations). Crew: 6–7 astronauts.

Try the [simulator](/simulator) at 408 km to see the ISS orbit. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  if (q.includes("rocket") || q.includes("tsiolkovsky")) {
    return `**Tsiolkovsky Rocket Equation**

**Formula:** Δv = Isp × g₀ × ln(m₀ / m₁)

**Variables:**
- Δv = change in velocity (m/s)
- Isp = specific impulse (seconds)
- g₀ = 9.80665 m/s²
- m₀ = initial mass (fuel + spacecraft)
- m₁ = final mass (spacecraft only)

**Example (Saturn V):** Isp≈421s, m₀/m₁≈20 → Δv ≈ 12.2 km/s.

Rockets are mostly fuel because each km/s of Δv requires exponentially more propellant. See the [formulas library](/formulas-library) for more. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  if (q.includes("black hole")) {
    return `**Black Holes**

A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape.

**Formation:** Stellar black holes form when massive stars (>20× Sun) collapse. Supermassive black holes (millions–billions of solar masses) reside at galaxy centers. Milky Way center: Sagittarius A* (~4 million solar masses).

**Schwarzschild radius:** r_s = 2GM/c². For the Sun: r_s ≈ 3 km. For Earth: r_s ≈ 9 mm.

**First image:** Event Horizon Telescope captured M87* (2019)—6.5 billion solar masses, 55 million light-years away.

Explore [astrophysics](/learn/astrophysics) for more. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  if (q.includes("debris") || q.includes("kessler")) {
    return `**Space Debris & Kessler Syndrome**

**The problem:** 27,000+ tracked objects orbit Earth (>10 cm). Millions of smaller fragments exist. Relative collision velocity in LEO: 10–15 km/s.

**Kessler Syndrome:** A chain reaction where collisions create debris that causes more collisions, potentially making some altitudes unusable. Proposed by Donald Kessler (1978).

**Notable incidents:** 2009—Iridium 33 and Cosmos 2251 collided (1,800+ fragments). 2007—China ASAT test on Fengyun-1C (worst single debris event).

**Mitigation:** Collision avoidance (ISS does ~1/year), deorbit requirements (LEO: 25 years), active debris removal (ClearSpace-1, planned 2026).

See [research hub](/research) for orbital debris topics. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  if (q.includes("newton") || q.includes("gravity law") || q.includes("universal gravitation")) {
    return `**Newton's Laws & Universal Gravitation**

**Three Laws of Motion:**
1. Inertia: Object stays at rest or in motion unless acted on by a force.
2. F = ma: Force equals mass times acceleration.
3. Action-Reaction: Every force has an equal and opposite reaction.

**Universal Gravitation:** F = G × m₁ × m₂ / r² (G = 6.674×10⁻¹¹ N·m²/kg²)

For satellites, gravity provides the centripetal force: v = √(GM/r) gives orbital velocity.

See [formulas library](/formulas-library) and [orbital mechanics](/learn/orbital-mechanics). Continue exploring with AstroBot on OrbitalSimulatorHub 🚀`;
  }

  return "";
}
