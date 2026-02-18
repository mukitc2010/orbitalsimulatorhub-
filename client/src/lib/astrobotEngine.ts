export type AstroBotMode = "explain" | "math" | "quiz" | "study" | "simulator" | "astronaut" | "planets" | "ai";
export type AstroBotDifficulty = "kids" | "beginner" | "intermediate" | "advanced";

export function generateAstroBotResponse(
  userText: string,
  _mode: AstroBotMode,
  _difficulty: AstroBotDifficulty
): string {
  const q = userText.toLowerCase();

  if (q.includes("kepler")) {
    return `🛰️ **Mission Brief:** Kepler's 3 Laws of Planetary Motion.

✅ **The 3 Laws:**
1. **First Law (Ellipse):** Planets (and satellites) orbit in ellipses, with the central body at one focus.
2. **Second Law (Equal Areas):** A line from the planet to the Sun sweeps equal areas in equal time — meaning planets move **faster when closer**.
3. **Third Law (T² ∝ a³):** The square of the period is proportional to the cube of the semi-major axis.

🧠 **Formula (Third Law for Earth orbit):**
T² = (4π²/μ) × a³
Or simplified: T(years)² = a(AU)³

🔎 **Example:** Earth: a=1 AU, T=1 year. Mars: a=1.52 AU, T=√(1.52³) ≈ 1.87 years.

*Want a quiz on Kepler's laws? Or want a harder version?*`;
  }

  if (q.includes("iss") || q.includes("space station")) {
    return `🛰️ **Mission Brief:** The International Space Station (ISS).

✅ **Key Facts:**
- Altitude: **~408 km** (varies 400–420 km due to drag)
- Orbital velocity: **7.66 km/s** (~27,600 km/h!)
- Period: **92 minutes** — 16 sunrises per day!
- Inclination: **51.6°** (accessible from most launch sites)
- Size: **109 m × 73 m** — as big as a football field
- Continuous human presence since **November 2, 2000**

📌 **Countries involved:** USA, Russia, Europe, Japan, Canada (15 nations)
📌 **Total crew at any time:** 6–7 astronauts

*Want a quiz on ISS systems? Or want a harder version?*`;
  }

  if (q.includes("rocket") || q.includes("tsiolkovsky")) {
    return `🧮 **Mission Brief:** The Tsiolkovsky Rocket Equation.

🧠 **Formula:**
Δv = Isp × g₀ × ln(m₀ / m₁)

📌 **Variables:**
- Δv = change in velocity (m/s)
- Isp = specific impulse (efficiency of engine, seconds)
- g₀ = 9.80665 m/s²
- m₀ = initial mass (fuel + spacecraft)
- m₁ = final mass (spacecraft only)

🔎 **Example (Saturn V):**
- Isp ≈ 421s (J-2 engine)
- m₀/m₁ ≈ 20 (95% fuel!)
- Δv = 421 × 9.81 × ln(20) ≈ **12,200 m/s = 12.2 km/s**

This is why rockets are 90% fuel — every km/s of Δv costs exponentially more propellant!

*Want a harder version? Or try it in the simulator?*`;
  }

  if (q.includes("black hole")) {
    return `🛰️ **Mission Brief:** Black Holes — where gravity wins.

✅ **What is a black hole?**
A region of spacetime where gravity is so strong that **nothing — not even light — can escape**.

📌 **How they form:**
- Stellar black holes: massive stars (>20× Sun) collapse after supernova
- Supermassive black holes: millions–billions of solar masses, center of galaxies
- Milky Way center: **Sagittarius A*** — 4 million solar masses

🧠 **Schwarzschild Radius:**
r_s = 2GM / c²
- For Sun: r_s ≈ **3 km** (the Sun compressed to a 3 km sphere would become a black hole!)
- For Earth: r_s ≈ **9 mm**

📸 **First image:** Event Horizon Telescope captured M87* black hole shadow (2019) — 6.5 billion solar masses, 55 million light-years away.

*Want a quiz on astrophysics? Or want a harder version?*`;
  }

  if (q.includes("debris") || q.includes("kessler")) {
    return `🛰️ **Mission Brief:** Space Debris & the Kessler Syndrome.

✅ **The Problem:**
- **27,000+** tracked objects orbit Earth (>10 cm)
- Millions of smaller untracked fragments
- Relative collision velocity in LEO: **10–15 km/s** (15× faster than a bullet!)

⚠️ **Kessler Syndrome:**
A chain reaction where one collision creates debris, which causes more collisions, eventually making some orbital altitudes unusable. Proposed by Donald Kessler (NASA) in 1978.

📌 **Real incidents:**
- 2009: Iridium 33 + Cosmos 2251 collided — created 1,800+ tracked fragments
- 2007: China ASAT test (Fengyun-1C) — worst single debris event ever

🛡️ **Solutions:**
- Collision avoidance maneuvers (ISS does ~1/year)
- Deorbit requirements (LEO satellites must deorbit within 25 years)
- Active debris removal missions (ClearSpace-1, planned 2026)
- AI for tracking (your site's topic!)

*Want a quiz on space operations? Or want a harder version?*`;
  }

  if (q.includes("newton") || q.includes("gravity law") || q.includes("universal gravitation")) {
    return `🛰️ **Mission Brief:** Newton's Laws & Universal Gravitation.

✅ **Newton's 3 Laws of Motion:**
1. **Inertia:** Object stays at rest or moving unless acted on by a force
2. **F = ma:** Force = mass × acceleration
3. **Action-Reaction:** Every force has an equal and opposite reaction

🧠 **Universal Gravitation:**
F = G × m₁ × m₂ / r²
- G = 6.674 × 10⁻¹¹ N·m²/kg²
- r = distance between centers

🔎 **For satellites:** Gravity provides the centripetal force that curves the path into an orbit.
mg = mv²/r → v = √(GM/r) — there's your orbital velocity formula!

*Want a quiz on Newton's laws? Or want a harder version?*`;
  }

  return "";
}
