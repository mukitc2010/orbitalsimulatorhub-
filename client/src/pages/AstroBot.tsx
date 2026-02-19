import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { getAstroBotReplyLocal, ASTROBOT_FALLBACK } from "../astrobotKnowledge";
import { generateAstroBotResponse } from "../lib/astrobotEngine";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "explain" | "math" | "quiz" | "study" | "simulator" | "astronaut" | "planets" | "ai";
type Difficulty = "kids" | "beginner" | "intermediate" | "advanced";
type Message = {
  role: "user" | "astrobot";
  text: string;
  mode?: Mode;
  references?: Array<{ title: string; url: string; source: string }>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES: { id: Mode; label: string; icon: string; desc: string }[] = [
  { id: "explain", label: "Explain", icon: "🚀", desc: "Explain any space concept" },
  { id: "math", label: "Solve Math", icon: "🧮", desc: "Calculate orbits & physics" },
  { id: "quiz", label: "Quiz Me", icon: "🎓", desc: "Test your space knowledge" },
  { id: "study", label: "Study Plan", icon: "📚", desc: "Build a learning path" },
  { id: "simulator", label: "Simulator Help", icon: "🛰", desc: "Guide for the simulator" },
  { id: "astronaut", label: "Astronaut Life", icon: "👨‍🚀", desc: "Training, ISS, EVA" },
  { id: "planets", label: "Planets", icon: "🪐", desc: "Solar system & missions" },
  { id: "ai", label: "AI in Space", icon: "🤖", desc: "AI & robotics in aerospace" },
];

const DIFFICULTIES: { id: Difficulty; label: string; color: string }[] = [
  { id: "kids", label: "Kids", color: "#22c55e" },
  { id: "beginner", label: "Beginner", color: "#3b82f6" },
  { id: "intermediate", label: "Intermediate", color: "#f59e0b" },
  { id: "advanced", label: "Advanced", color: "#ef4444" },
];

const EXAMPLE_QUESTIONS: Record<Mode, string[]> = {
  explain: [
    "If I put a satellite at 400 km, what's its orbital period?",
    "Explain eccentricity like I'm 10",
    "What is the difference between LEO, MEO, and GEO?",
    "How does a Hohmann transfer work?",
    "Why doesn't the ISS fall down?",
  ],
  math: [
    "Calculate orbital velocity at 400 km altitude",
    "How fast is a GEO satellite? (35786 km)",
    "What is the escape velocity from Earth?",
    "Calculate delta-v for a Hohmann transfer from LEO to GEO",
    "What is the orbital period at 20200 km (GPS)?",
  ],
  quiz: [
    "Quiz me on Kepler's laws",
    "Make me a 5-question astronaut exam",
    "Test me on orbital mechanics — intermediate level",
    "Give me a quiz about the Apollo missions",
    "Quiz: Newton's laws in space",
  ],
  study: [
    "Make me a 1-week study plan for orbital mechanics",
    "What should I learn first: rockets or satellites?",
    "Create a study plan to understand how GPS works",
    "I'm a PhD student — advanced aerospace study plan",
    "Study path for learning AI in aerospace",
  ],
  simulator: [
    "How do I add a LEO satellite in the simulator?",
    "What do perigee and apogee mean in the simulator?",
    "How do I compare multiple orbits?",
    "What does the orbital period shown mean?",
    "Guide me through using the 3D orbit simulator",
  ],
  astronaut: [
    "How do astronauts sleep on the ISS?",
    "What training is required to become an astronaut?",
    "What happens to the human body in microgravity?",
    "What is an EVA (spacewalk) like?",
    "What are satellite subsystems (EPS, ADCS, OBC)?",
  ],
  planets: [
    "Compare Mars vs Earth for human colonization",
    "Distance from Earth to Mars? (approx)",
    "Which planet has the strongest storms?",
    "Tell me about the Fra Mauro formation on the Moon",
    "Explain eccentricity like I'm 10",
  ],
  ai: [
    "How does AI help navigate spacecraft?",
    "What AI does the Perseverance rover use?",
    "How is machine learning used in satellite imagery?",
    "What is autonomous rendezvous in space?",
    "How does AI help detect space debris?",
  ],
};

const WELCOME = `🛰️ **AstroBot — Global Space Intelligence**

I'm AstroBot, developed for **Orbital Simulator Hub**. I combine the clarity of a space professor with the precision of a mission-control analyst. My purpose: to help you truly understand space, physics, and aerospace—calmly and accurately.

---

**What I can do:**

🚀 **Explain** — Orbits, gravity, black holes, satellites. Clear, layered explanations.
🧮 **Solve Math** — Orbital velocity, escape velocity, delta-v, Hohmann transfers.
🎓 **Quiz Me** — Kepler's laws, Apollo missions, ISS, planets—any level.
📚 **Study Plan** — Structured learning paths from beginner to advanced.
🛰 **Simulator Help** — Guide for the 3D orbit simulator.
👨‍🚀 **Astronaut Life** — Training, EVA, microgravity, ISS operations.
🪐 **Planets** — Solar system data, missions, comparisons.
🤖 **AI in Space** — How AI and robotics transform aerospace.

---

**Try these:**
- *"Calculate orbital velocity at 400 km"*
- *"Quiz me on Kepler's laws — intermediate"*
- *"How do astronauts sleep on the ISS?"*
- *"Compare Mars vs Earth for humans"*
- *"What is the Fra Mauro formation?"*

Pick a mode below or type your question.`;

// ─── AstroBot Engine (local, no API needed) ──────────────────────────────────

function buildResponse(userText: string, mode: Mode, difficulty: Difficulty): string {
  const q = userText.toLowerCase();

  // ── Math mode ──
  if (mode === "math" || q.match(/calculat|velocity|period|delta.?v|escape|altitude|km|orbit.*speed|how fast|how long|force|momentum|energy/)) {
    const altMatch = q.match(/(\d[\d,]*)\s*km/);
    const altKm = altMatch ? parseFloat(altMatch[1].replace(",", "")) : 400;
    const altM = altKm * 1000;
    const R = 6_371_000;
    const mu = 3.986004418e14;
    const r = R + altM;
    const v = Math.sqrt(mu / r);
    const T = 2 * Math.PI * Math.sqrt(Math.pow(r, 3) / mu);
    const v_esc = Math.sqrt(2 * mu / r);
    const Tmin = Math.floor(T / 60);
    const Th = (T / 3600).toFixed(2);

    if (q.includes("period") || q.includes("how long") || q.includes("time")) {
      return `🧮 **Mission Brief:**
We'll calculate the orbital period at ${altKm} km altitude.

📌 **Given:**
- Altitude: h = ${altKm} km
- Earth radius: R = 6,371 km
- Gravitational parameter: μ = 3.986 × 10¹⁴ m³/s²

🧠 **Formula:**
T = 2π × √(r³ / μ), where r = R + h

✅ **Steps:**
1) r = ${(altKm + 6371).toLocaleString()} km = ${(r / 1000).toFixed(0)} km
2) T = 2π × √((${(r / 1000).toFixed(0)} × 10³)³ / 3.986 × 10¹⁴)
3) T = ${Tmin} minutes (${Th} hours)

📣 **Final Answer:**
**T ≈ ${Tmin} minutes** at ${altKm} km altitude

For comparison: ISS (408 km) ≈ 92 min | GPS (20,200 km) ≈ 718 min | GEO (35,786 km) ≈ 1,436 min

🎯 **Try This Next:**
Change the altitude to 35,786 km — that's GEO. What do you get?

*Want a harder version?*`;
    }

    if (q.includes("escape")) {
      return `🧮 **Mission Brief:**
We'll calculate escape velocity at ${altKm} km altitude.

📌 **Given:**
- Altitude: h = ${altKm} km
- μ = 3.986 × 10¹⁴ m³/s²
- r = R + h = ${(r / 1000).toFixed(0)} km

🧠 **Formula:**
v_esc = √(2μ / r)

✅ **Steps:**
1) r = ${(r / 1e6).toFixed(4)} × 10⁶ m
2) v_esc = √(2 × 3.986×10¹⁴ / ${(r / 1e6).toFixed(4)} × 10⁶)
3) v_esc = **${(v_esc / 1000).toFixed(2)} km/s**

📣 **Final Answer:**
**v_esc ≈ ${(v_esc / 1000).toFixed(2)} km/s** at ${altKm} km

Compare to orbital velocity: **${(v / 1000).toFixed(2)} km/s** (escape = √2 × orbital)

🎯 **Try This Next:**
Calculate escape velocity from Mars surface (μ_Mars = 4.28 × 10¹³, r = 3,390 km)

*Want a harder version?*`;
    }

    if (q.includes("delta") || q.includes("dv") || q.includes("hohmann")) {
      const r1 = R + 400_000;
      const r2 = R + 35_786_000;
      const v1 = Math.sqrt(mu / r1);
      const v2 = Math.sqrt(mu / r2);
      const vt1 = Math.sqrt(mu * (2 / r1 - 1 / ((r1 + r2) / 2)));
      const vt2 = Math.sqrt(mu * (2 / r2 - 1 / ((r1 + r2) / 2)));
      const dv1 = Math.abs(vt1 - v1);
      const dv2 = Math.abs(v2 - vt2);
      return `🧮 **Mission Brief:**
We'll calculate Δv for a Hohmann transfer from LEO (400 km) to GEO (35,786 km).

📌 **Given:**
- r₁ = 400 km altitude (LEO) → r₁ = ${(r1 / 1000).toFixed(0)} km from Earth center
- r₂ = 35,786 km altitude (GEO) → r₂ = ${(r2 / 1000).toFixed(0)} km from Earth center
- μ = 3.986 × 10¹⁴ m³/s²

🧠 **Formulas:**
- Vis-viva: v = √(μ × (2/r − 1/a))
- Δv₁ = v_transfer1 − v_LEO
- Δv₂ = v_GEO − v_transfer2

✅ **Steps:**
1) v_LEO = ${(v1 / 1000).toFixed(3)} km/s
2) v_GEO = ${(v2 / 1000).toFixed(3)} km/s
3) Transfer orbit: a = (r₁+r₂)/2
4) Δv₁ = ${(dv1 / 1000).toFixed(3)} km/s (LEO → transfer)
5) Δv₂ = ${(dv2 / 1000).toFixed(3)} km/s (transfer → GEO)

📣 **Final Answer:**
Total **Δv ≈ ${((dv1 + dv2) / 1000).toFixed(3)} km/s**

This is the minimum energy path — used by real satellites!

🎯 **Try This Next:**
What if you transfer from ISS (408 km) to the Moon (384,400 km from Earth center)?

*Want a harder version?*`;
    }

    // Default: orbital velocity
    return `🧮 **Mission Brief:**
We'll calculate orbital velocity at ${altKm} km altitude.

📌 **Given:**
- Altitude: h = ${altKm} km
- Earth radius: R = 6,371 km
- μ (gravitational parameter) = 3.986004418 × 10¹⁴ m³/s²

🧠 **Formula:**
v = √(μ / r), where r = R + h

✅ **Steps:**
1) r = 6,371 + ${altKm} = ${(altKm + 6371).toLocaleString()} km = ${(r / 1e6).toFixed(4)} × 10⁶ m
2) v = √(3.986×10¹⁴ / ${(r / 1e6).toFixed(4)}×10⁶)
3) v = **${(v / 1000).toFixed(3)} km/s**

📣 **Final Answer:**
**v ≈ ${(v / 1000).toFixed(2)} km/s** (${(v / 1000 * 3600).toFixed(0)} km/h!)

Orbital period: **T ≈ ${Tmin} minutes**

For context: ISS flies at ~7.66 km/s | GPS at ~3.87 km/s | GEO at ~3.07 km/s

🎯 **Try This Next:**
Now try altitude = 35,786 km (geostationary orbit) — what speed do you get?

*Want to try it in the simulator?*`;
  }

  // ── Quiz mode ──
  if (mode === "quiz" || q.includes("quiz") || q.includes("test me") || q.includes("question")) {
    if (q.includes("kepler")) {
      return `🎓 **Quiz Time — Kepler's Laws (${difficulty} level)**

**Q1)** What shape is a planetary orbit according to Kepler's First Law?
A) Circle
B) Ellipse ← ✅
C) Parabola
D) Spiral

**Q2)** Kepler's Second Law says a planet sweeps equal areas in equal time. What does this mean about speed?
A) A planet moves faster when farther from the Sun
B) A planet moves slower when closer to the Sun
C) A planet moves **faster when closer** to the Sun ← ✅
D) Speed is always constant

**Q3)** If Earth orbits in 1 year at 1 AU, how long does a planet at 4 AU take?
Formula: T² ∝ a³
A) 4 years
B) **8 years** ← ✅ (T² = 4³ = 64, T = 8)
C) 16 years
D) 2 years

${difficulty === "advanced" ? `
**Bonus (Advanced):**
Q4) In an elliptical orbit with semi-major axis a = 10,000 km from Earth's center, what is the orbital period?
Use: T = 2π √(a³/μ), μ = 3.986×10¹⁴ m³/s²
` : ""}

*Want a harder version? Or quiz me on Apollo missions?*`;
    }
    if (q.includes("apollo") || q.includes("moon")) {
      return `🎓 **Quiz Time — Apollo Missions (${difficulty} level)**

**Q1)** Which Apollo mission was the first to land on the Moon?
A) Apollo 8
B) Apollo 10
C) **Apollo 11** ← ✅
D) Apollo 12

**Q2)** Where did Apollo 14 land on the Moon?
A) Sea of Tranquility
B) Ocean of Storms
C) **Fra Mauro** ← ✅
D) Taurus-Littrow

**Q3)** Who was the last person to walk on the Moon?
A) Buzz Aldrin
B) Alan Shepard
C) John Young
D) **Gene Cernan** ← ✅ (Apollo 17, Dec 1972)

**Q4)** How many kg of lunar samples did Apollo missions bring back total?
A) 150 kg
B) 280 kg
C) **381.7 kg** ← ✅
D) 500 kg

**Q5)** Which mission carried Moon Trees in orbit?
A) Apollo 11
B) Apollo 13
C) **Apollo 14** ← ✅ (Stuart Roosa, CMP)
D) Apollo 16

*Score yourself! Want a harder version, or quiz on orbital mechanics?*`;
    }
    return `🎓 **Quiz Time — Space Science (${difficulty} level)**

**Q1)** What is LEO (Low Earth Orbit) altitude range?
A) 100–200 km
B) **200–2,000 km** ← ✅
C) 2,000–35,786 km
D) 35,786 km

**Q2)** What is the ISS orbital altitude (approximately)?
A) 200 km
B) **408 km** ← ✅
C) 1,200 km
D) 20,000 km

**Q3)** Which equation gives orbital velocity?
A) v = μ/r
B) **v = √(μ/r)** ← ✅
C) v = r/μ
D) v = 2πr/T

**Q4)** What is the approximate escape velocity from Earth's surface?
A) 5.6 km/s
B) 7.9 km/s
C) **11.2 km/s** ← ✅
D) 14.5 km/s

**Q5)** GEO satellites appear stationary because their orbital period equals:
A) 12 hours
B) 16 hours
C) **24 hours** ← ✅
D) 36 hours

*How many did you get right? Want a harder version?*`;
  }

  // ── Study plan mode ──
  if (mode === "study" || q.includes("study plan") || q.includes("learn") && q.includes("plan")) {
    return `📚 **Mission Brief:**
Building your personalized space study plan — ${difficulty} level.

**Week 1 — Foundations**
- Day 1: Newton's laws → Visit /learn/newton
- Day 2: Gravity and orbits (what keeps satellites up?) → /learn/orbital-mechanics
- Day 3: LEO, MEO, GEO differences → /simulator (try all 3)
- Day 4: How satellites work — subsystems → /learn/how-satellites-work
- Day 5: Quiz yourself → /space-quiz
- Weekend: Try the 3D Simulator and explore orbit types

**Week 2 — Going Deeper**
- Day 1: Kepler's laws (T² ∝ a³) → /learn/aerospace
- Day 2: Orbital velocity formula: v = √(μ/r)
- Day 3: Hohmann transfers and delta-v
- Day 4: Real satellites: ISS, Starlink, GPS → /satellites
- Day 5: Space quiz + formulas practice → /formulas-library

**Week 3 — Advanced Topics**
- Astronaut training + ISS life → /astronauts
- Lunar geology + Apollo missions → /learn/lunar-geology
- Planet explorer + solar system → /planets
- AI in aerospace → /ai-in-aerospace
- Research hub for PhD level → /research

**Recommended tools:**
🛰 [3D Simulator](/simulator)
🔢 [Formula Library](/formulas-library)
🧮 [Calculators](/calculators)
🤖 Ask AstroBot any question at any point!

*Want a harder version or a topic-specific plan?*`;
  }

  // ── Simulator help ──
  if (mode === "simulator" || q.includes("simulator") && (q.includes("how") || q.includes("guide") || q.includes("use"))) {
    return `🛰️ **Simulator Help — Mission Brief:**
Here's your step-by-step guide to the Orbital Simulator Hub!

**Step 1: Open the Simulator**
Go to → [/simulator](/simulator)

**Step 2: Add a satellite**
- Click **"Add Satellite"**
- Choose type: **LEO** (200–2000 km) | **MEO** (2000–35786 km) | **GEO** (35786 km)
- Pick a color, name it!

**Step 3: What you'll see**
- **Orbit ring** around Earth
- **Altitude** — how high above Earth
- **Orbital velocity** — how fast (km/s)
- **Period** — time for one full orbit
- **Perigee / Apogee** — closest / farthest point in elliptical orbits

**Step 4: Compare orbits**
- Add multiple satellites
- Notice: higher orbit = slower speed but longer period

**Key numbers to remember:**
| Type | Altitude | Speed | Period |
|------|----------|-------|--------|
| LEO (ISS) | 408 km | 7.66 km/s | 92 min |
| MEO (GPS) | 20,200 km | 3.87 km/s | 12 hours |
| GEO | 35,786 km | 3.07 km/s | 24 hours |

**Pro tip:** Use the **formula v = √(μ/r)** to predict the speed before you add it — then verify in the sim!

*Want to try it in the simulator? Or want a math challenge?*`;
  }

  // ── Astronaut life ──
  if (mode === "astronaut" || q.includes("astronaut") || q.includes("iss") || q.includes("eva") || q.includes("spacewalk") || q.includes("microgravity")) {
    if (q.includes("sleep")) {
      return `🛰️ **Mission Brief:** How astronauts sleep on the ISS.

✅ **Explanation:**
- Astronauts sleep in small **sleep pods** — like a closet in space!
- They use a **sleeping bag** strapped to the wall or floor (direction doesn't matter in microgravity!)
- A ventilation fan must always run — without it, exhaled CO₂ forms a bubble around their head
- They wear **eye masks** because the Sun rises 16 times every 24 hours

🔎 **Quick Facts:**
- Sleep schedule is strictly controlled to maintain circadian rhythm
- Astronauts often report vivid dreams in space
- Sleep on ISS is studied because poor sleep affects cognitive performance for missions to Mars

🎯 **Try This:**
Go to [/astronauts](/astronauts) and read about an ISS crew member's daily routine!

*Want a quiz on astronaut life?*`;
    }
    if (q.includes("train") || q.includes("select") || q.includes("become")) {
      return `🛰️ **Mission Brief:** How to become an astronaut.

✅ **Requirements:**
- US citizenship
- Master's degree in STEM (science, engineering, math, or medicine)
- 2+ years of relevant professional experience OR 1000+ hours as jet pilot
- Pass the physical (near/far vision, blood pressure, height 62–75 inches)

📌 **Training after selection:**
1. **Basic training** — 2 years at Johnson Space Center
2. **Systems training** — ISS modules, robotics, EVA suits
3. **Russian language** — must speak Russian for Soyuz
4. **Survival training** — water, wilderness, parachute
5. **Spacewalk (EVA) training** — Neutral Buoyancy Lab (giant pool!)
6. **Mission-specific training** — assigned mission, 1–3 years

🔎 **Fun stat:** Space agencies typically accept 10–13 astronauts from ~18,000 applicants!

*Want a quiz on astronaut selection?*`;
    }
    return `🛰️ **Mission Brief:** A day on the ISS.

✅ **Daily Schedule (approximately):**
- **6:00 AM** — Wake up, hygiene (no shower — wet wipes + waterless shampoo!)
- **7:30 AM** — Morning planning conference with Mission Control
- **8:00 AM** — Work (experiments, maintenance, exercise)
- **1:00 PM** — Lunch (pouches, tubes, rehydrated food)
- **2:00 PM** — More work / science
- **4:30 PM** — Mandatory 2.5 hours exercise (muscles waste without gravity!)
- **6:30 PM** — Dinner
- **8:00 PM** — Personal time (photos, emails, phone calls to family)
- **9:30 PM** — Sleep (8.5 hours required)

🎯 **Try This:**
Explore astronaut profiles at [/astronauts](/astronauts) — click any moonwalker to see their full story!

*Want a quiz on ISS systems?*`;
  }

  // ── Planets ──
  if (mode === "planets" || q.includes("planet") || q.includes("mars") || q.includes("jupiter") || q.includes("moon") && !q.includes("mission")) {
    if (q.includes("fra mauro")) {
      return `🛰️ **Mission Brief:** Fra Mauro Formation on the Moon.

✅ **What is it?**
Fra Mauro is a hilly geological region on the Moon's near side, formed from ejecta (debris) thrown out by the massive **Imbrium Basin impact ~3.85 billion years ago**. That impact carved a crater over 1,100 km wide — and the material that flew out formed the hummocky Fra Mauro terrain.

📌 **Why Apollo 14 went there:**
- Apollo 13 was supposed to land there first — but had the famous "Houston, we have a problem" oxygen tank failure
- Apollo 14 (February 1971) completed the mission
- **Alan Shepard** and **Edgar Mitchell** collected **42.3 kg** of breccia samples
- They explored **Cone Crater** — which punched through the ejecta layer

🔬 **What they found:**
- **Breccias** (rocks fused by impact heat) that dated the Imbrium event
- **"Big Bertha"** (sample 14321) — may contain Earth-origin material
- **KREEP-rich rocks** from deep inside the Moon

📚 **Full guide:** [/learn/lunar-geology](/learn/lunar-geology)

*Want a quiz on Apollo missions?*`;
    }
    if (q.includes("compare") && (q.includes("mars") || q.includes("earth"))) {
      return `🛰️ **Mission Brief:** Mars vs Earth comparison for humans.

| Feature | Earth | Mars |
|---------|-------|------|
| Gravity | 1.00g | 0.38g |
| Day length | 24 hours | 24h 37m |
| Year | 365 days | 687 days |
| Temperature | avg 15°C | avg -65°C |
| Atmosphere | N₂ 78%, O₂ 21% | CO₂ 95%, thin |
| Pressure | 1 bar | 0.006 bar |
| Distance from Sun | 149.6M km | 227.9M km |
| Moons | 1 (Moon) | 2 (Phobos, Deimos) |

✅ **For humans on Mars:**
👍 Similar day length, some water ice at poles, Olympus Mons to explore
👎 No breathable air, extreme cold, radiation (no magnetic field), dust storms

🎯 **Try This:**
Visit [/planets/mars](/planets/mars) — use the weight calculator to see how much you'd weigh on Mars!

*Want a quiz on Mars exploration?*`;
    }
    return `🛰️ **Mission Brief:** Exploring our solar system.

✅ **Quick Solar System Facts:**

🔵 **Inner planets (terrestrial):** Mercury, Venus, Earth, Mars
- Rocky surfaces, smaller, closer to Sun

🟡 **Gas giants:** Jupiter, Saturn
- Huge, mostly hydrogen/helium, powerful storms

❄️ **Ice giants:** Uranus, Neptune
- Icy interior, tilted axes, far from Sun

🌙 **Special bodies:** Moon (Earth's satellite), Pluto (dwarf planet)

📌 **Most interesting missions:**
- Mars: Perseverance rover (2021) searching for life
- Jupiter: Juno orbiter mapping the interior
- Saturn: Cassini (2004-2017) — 13 years of discoveries!
- Pluto: New Horizons (2015) — first close-up ever

🎯 **Try This:**
Go to [/planets](/planets) — every planet has its own page with real mission data, weight calculator, and quiz!

*Want to explore a specific planet? Or want a quiz?*`;
  }

  // ── AI in Aerospace ──
  if (mode === "ai" || q.includes("ai") || q.includes("machine learning") || q.includes("autonomous") || q.includes("robot")) {
    return `🛰️ **Mission Brief:** How AI is transforming aerospace.

✅ **Key Areas:**

🤖 **Spacecraft Navigation**
- Deep Space 1 (1998) — first AI-controlled spacecraft
- Terrain Relative Navigation — Perseverance used AI to land precisely on Mars by analyzing the ground 20 times/second

🛰 **Satellite Operations**
- AI monitors satellite health, predicts failures before they happen
- Constellation management (Starlink uses AI to avoid collisions)

🔬 **Science Discovery**
- James Webb: AI filters noise from images
- Kepler: Machine learning discovered 2,000+ exoplanets in data
- Mars rovers: AI classifies rocks without waiting for Earth commands

🚁 **Autonomous Vehicles**
- Ingenuity helicopter: First powered flight on another planet (2021)
- AI decides flight path in real-time (3-minute communication delay from Mars!)

📐 **Orbital Mechanics**
- AI optimizes Hohmann transfers, station-keeping burns
- GRACE satellite pair: AI detected groundwater changes from orbit

🎯 **Try This:**
Read more at [/ai-in-aerospace](/ai-in-aerospace)

*Want a quiz on AI in space? Or want to explore specific missions?*`;
  }

  // ── Spacecraft subsystems ──
  if (q.includes("subsystem") || q.includes("eps") || q.includes("adcs") || q.includes("obc") || q.includes("comms") || q.includes("payload") || q.includes("satellite design") || q.includes("spacecraft design")) {
    return `🛰️ **Mission Brief:** Satellite & Spacecraft Subsystems.

✅ **Every satellite has these key subsystems:**

🔋 **EPS — Electrical Power System**
- Solar panels + batteries
- Generates, stores, and distributes power
- Must balance power budget for all modes (eclipse, sunlit, peak)

🧭 **ADCS — Attitude Determination & Control System**
- Keeps the satellite pointing the right way
- Uses star trackers, sun sensors, gyroscopes, magnetometers
- Actuators: reaction wheels, magnetorquers, thrusters

💻 **OBC — On-Board Computer**
- The satellite's brain — runs all software
- Handles commands, data management, fault detection
- Must be radiation-hardened (space radiation flips bits!)

📡 **COMMS — Communications**
- Sends science data to ground, receives commands
- Frequencies: UHF/VHF (low-data), S-band, X-band, Ka-band (high-data)
- Ground stations track satellite passes

🔬 **Payload**
- The mission instrument (camera, radar, spectrometer, etc.)
- Everything else exists to support the payload

🌡️ **Thermal Control**
- Space: -170°C (shadow) to +120°C (sunlight)
- Multi-layer insulation (MLI), heaters, heat pipes, radiators

⚙️ **Propulsion**
- Station-keeping: keeps orbit against atmospheric drag
- Electric propulsion (ion thrusters) or chemical (hydrazine)

🎯 **Try This:**
Go to [/simulator](/simulator) and watch how LEO satellites need more delta-v (more atmospheric drag) than GEO!

*Want a quiz on satellite subsystems? Or want a harder version?*`;
  }

  // ── Eccentricity / orbital concepts ──
  if (q.includes("eccentricity") || q.includes("inclination") || q.includes("perturbation") || q.includes("raan") || q.includes("argument of perigee") || q.includes("keplerian")) {
    if (q.includes("eccentricity")) {
      return `🛰️ **Mission Brief:** What is orbital eccentricity?

✅ **Simple Explanation:**
Eccentricity (e) describes **how stretched** an orbit is.

- **e = 0** → Perfect circle (like a wheel)
- **0 < e < 1** → Ellipse (egg-shaped) — most real orbits!
- **e = 1** → Parabola (escape trajectory)
- **e > 1** → Hyperbola (flyby trajectory)

${difficulty === "kids" ? `
🧒 **Kids Version:**
Think of eccentricity like a pizza! 
- e=0 = perfect round pizza
- e=0.5 = oval pizza (squished)
- e=1 = your pizza falls off the table and escapes! 🍕
` : ""}

🔎 **Real examples:**
- ISS orbit: e ≈ 0.001 (almost perfect circle)
- Molniya orbit: e ≈ 0.74 (very elliptical — used by Russia for high-latitude comms)
- Earth around Sun: e ≈ 0.017 (slightly elliptical)
- Halley's comet: e ≈ 0.97 (very stretched!)

🧠 **Formula:**
e = (r_apogee − r_perigee) / (r_apogee + r_perigee)

🎯 **Try This:**
In the [/simulator](/simulator), add an elliptical orbit. Notice how the satellite speeds up at perigee and slows at apogee — that's Kepler's 2nd Law in action!

*Want a quiz on orbital elements? Or want a harder version?*`;
    }
    if (q.includes("inclination")) {
      return `🛰️ **Mission Brief:** What is orbital inclination?

✅ **Explanation:**
Inclination (i) is the **angle between the orbital plane and Earth's equator**.

- **i = 0°** → Equatorial orbit (flies above the equator — GEO satellites!)
- **i = 90°** → Polar orbit (flies over the poles — great for Earth observation)
- **i = 98°** → Sun-synchronous orbit (SSO) — always at the same local time of day
- **i = 51.6°** → ISS orbit (launched from Kazakhstan, accessible to many countries)

🔎 **Why it matters:**
- Lower inclination = easier to reach from equatorial launch sites (less delta-v)
- Polar orbits cover the whole Earth eventually
- SSO keeps lighting consistent for cameras (Landsat, Sentinel)

🧠 **Key insight:**
Launch sites near the equator (Kennedy Space Center = 28.5°, Baikonur = 45.6°) can't launch directly to inclinations lower than their latitude — but can always go higher.

*Want a quiz on orbital parameters? Or want a harder version?*`;
    }
    return `🛰️ **Mission Brief:** The 6 Keplerian Orbital Elements.

These 6 parameters completely describe any orbit:

1. **a** — Semi-major axis (size of orbit)
2. **e** — Eccentricity (shape: 0=circle, <1=ellipse)
3. **i** — Inclination (tilt vs. equator)
4. **Ω** — RAAN (Right Ascension of Ascending Node — where orbit crosses equator going north)
5. **ω** — Argument of Perigee (orientation of ellipse)
6. **ν** — True Anomaly (where the satellite is right now in its orbit)

🔎 **Perturbations** (things that change these over time):
- J2 effect (Earth's bulge at equator)
- Atmospheric drag (LEO)
- Solar radiation pressure
- Lunar & solar gravity (mainly for GEO)
- Third-body effects

These must be corrected by **station-keeping burns** (delta-v budget).

*Want a quiz on orbital mechanics? Or want a harder version?*`;
  }

  // ── EVA / spacewalk details ──
  if (q.includes("eva") || q.includes("spacewalk") || q.includes("suit") || q.includes("emu") || q.includes("extravehicular")) {
    return `🛰️ **Mission Brief:** Extravehicular Activity (EVA) — the spacewalk.

✅ **What is an EVA?**
An EVA (Extravehicular Activity) is when an astronaut leaves the spacecraft and works in the vacuum of space. Also called a "spacewalk" — though there's no walking involved in zero-g!

📌 **The EMU Suit (Extravehicular Mobility Unit):**
- 18 layers of protective material
- Weighs **130 kg** on Earth (weighs nothing in space!)
- Provides oxygen, pressure, temperature regulation, comms
- Battery lasts ~8.5 hours max
- CO₂ scrubber keeps the astronaut safe
- Built-in drink bag (no bathroom breaks!)

🔢 **Numbers:**
- Temperature in suit: ~21°C (controlled)
- Pressure inside: ~0.3 bar (pure O₂)
- Outside: near-absolute vacuum
- Longest EVA ever: **8h 56min** (Susan Helms & Jim Voss, 2001)

🌙 **Moon EVAs:**
Apollo astronauts had lighter suits (Moon has no atmosphere to protect against, but there IS solar radiation, micrometeoroids, and dust). Apollo 17 EVAs totaled **22h 4min** on the surface.

🎯 **Try This:**
Check out [/astronauts/alan-shepard](/astronauts/alan-shepard) — his Apollo 14 EVAs on the Fra Mauro formation!

*Want a quiz on astronaut life? Or want a harder version?*`;
  }

  // ── Spacecraft navigation / website ──
  if (q.includes("where") || q.includes("navigate") || q.includes("find") || q.includes("page") || q.includes("section")) {
    return `🛰️ **Site Navigation Guide — Orbital Simulator Hub**

Here's where everything lives:

🛰 **[/simulator](/simulator)** — 3D orbit simulator. Add LEO, MEO, GEO satellites.
👨‍🚀 **[/astronauts](/astronauts)** — All astronauts. Click any name for full profile.
🪐 **[/planets](/planets)** — Solar system. Each planet has real mission data + quiz.
🚀 **[/missions](/missions)** — Apollo, Gemini, Shuttle missions with crew & geology.
🪨 **[/artifacts](/artifacts)** — What astronauts brought back from space.
🌙 **[/learn/lunar-geology](/learn/lunar-geology)** — Fra Mauro, Apollo site geology.
📰 **[/blog](/blog)** — Daily space news.
🤖 **[/astrobot](/astrobot)** — You're here!
📚 **[/research](/research)** — PhD-level resources.
🧮 **[/calculators](/calculators)** — Orbit & gravity calculators.
📐 **[/formulas-library](/formulas-library)** — Space physics formulas.
🌍 **[/learn/aerospace](/learn/aerospace)** — Full aerospace reference.

*Want a quiz? Or tell me what you're trying to learn and I'll point you there!*`;
  }

  return "";
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderMarkdown(text: string): JSX.Element {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let key = 0;

  const renderInline = (line: string) => {
    const parts: (string | JSX.Element)[] = [];
    let rest = line;
    let i = 0;
    const patterns: { re: RegExp; render: (m: string) => JSX.Element }[] = [
      { re: /\*\*(.+?)\*\*/g, render: (m) => <strong key={i++} style={{ color: "var(--text-primary)", fontWeight: 700 }}>{m}</strong> },
      { re: /`(.+?)`/g, render: (m) => <code key={i++} style={{ background: "var(--bg-surface)", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace", fontSize: "0.85em" }}>{m}</code> },
      { re: /\[(.+?)\]\((.+?)\)/g, render: (m) => <a key={i++} href={m} style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>{m}</a> },
    ];

    let segments: (string | JSX.Element)[] = [rest];
    for (const { re, render } of patterns) {
      const newSegs: (string | JSX.Element)[] = [];
      for (const seg of segments) {
        if (typeof seg !== "string") { newSegs.push(seg); continue; }
        let last = 0;
        const matches = [...seg.matchAll(re)];
        for (const m of matches) {
          if (m.index! > last) newSegs.push(seg.slice(last, m.index));
          if (re.toString().includes("\\[")) {
            const linkMatch = m[0].match(/\[(.+?)\]\((.+?)\)/);
            if (linkMatch) newSegs.push(<a key={i++} href={linkMatch[2]} style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>{linkMatch[1]}</a>);
          } else {
            newSegs.push(render(m[1]));
          }
          last = m.index! + m[0].length;
        }
        if (last < seg.length) newSegs.push(seg.slice(last));
      }
      segments = newSegs;
      re.lastIndex = 0;
    }
    parts.push(...segments);
    return <>{parts}</>;
  };

  const flushTable = () => {
    if (!tableRows.length) return;
    const header = tableRows[0];
    const body = tableRows.slice(2);
    elements.push(
      <div key={key++} className="overflow-x-auto my-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: "var(--bg-surface)" }}>
              {header.map((cell, ci) => <th key={ci} className="px-3 py-1.5 text-left font-semibold border" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>{cell.trim()}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)" }}>
                {row.map((cell, ci) => <td key={ci} className="px-3 py-1.5 border" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>{cell.trim()}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (const line of lines) {
    if (line.startsWith("|")) {
      inTable = true;
      tableRows.push(line.split("|").filter((_, i, a) => i > 0 && i < a.length - 1));
      continue;
    }
    if (inTable) flushTable();

    if (!line.trim()) { elements.push(<br key={key++} />); continue; }
    if (line.startsWith("## ")) { elements.push(<h3 key={key++} className="text-base font-bold mt-3 mb-1" style={{ color: "var(--text-primary)" }}>{renderInline(line.slice(3))}</h3>); continue; }
    if (line.startsWith("# ")) { elements.push(<h2 key={key++} className="text-lg font-bold mt-3 mb-1" style={{ color: "var(--text-primary)" }}>{renderInline(line.slice(2))}</h2>); continue; }
    if (line.match(/^[-*] /)) { elements.push(<div key={key++} className="flex gap-2 ml-2"><span style={{ color: "var(--accent-primary)" }}>•</span><span style={{ color: "var(--text-secondary)" }}>{renderInline(line.slice(2))}</span></div>); continue; }
    if (line.match(/^\d+[\).] /)) { elements.push(<div key={key++} className="flex gap-2 ml-2"><span style={{ color: "var(--accent-primary)", minWidth: "1.2em" }}>{line.match(/^\d+/)![0]}.</span><span style={{ color: "var(--text-secondary)" }}>{renderInline(line.replace(/^\d+[\).]\s*/, ""))}</span></div>); continue; }
    if (line.startsWith("---")) { elements.push(<hr key={key++} style={{ borderColor: "var(--border-color)", margin: "0.5rem 0" }} />); continue; }
    elements.push(<p key={key++} className="my-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{renderInline(line)}</p>);
  }
  if (inTable) flushTable();
  return <div className="space-y-0.5">{elements}</div>;
}

// ─── CTA buttons at the end of responses ─────────────────────────────────────

function extractCTAs(text: string): { label: string; query: string }[] {
  const ctas: { label: string; query: string }[] = [];
  if (text.includes("Want a quiz?") || text.includes("Want a quiz")) ctas.push({ label: "🎓 Give me a quiz!", query: "Quiz me on this topic" });
  if (text.includes("Want a harder version?") || text.includes("harder version")) ctas.push({ label: "⬆️ Harder version", query: "Give me a harder version" });
  if (text.includes("Want to try it in the simulator?") || text.includes("try it in the simulator")) ctas.push({ label: "🛰 Try in Simulator", query: "How do I try this in the simulator?" });
  if (text.includes("Try This") || text.includes("Try this")) {
    const match = text.match(/🎯.*?Try This.*?:\s*(.+?)(?:\n|$)/s);
    if (match) ctas.push({ label: "🎯 Try this!", query: match[1].trim().replace(/\(.*?\)/g, "").trim() });
  }
  return ctas.slice(0, 3);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AstroBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "astrobot", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode>("explain");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [showExamples, setShowExamples] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (overrideText?: string) => {
    const q = (overrideText ?? input).trim();
    if (!q || loading) return;
    setInput("");
    setShowExamples(false);
    setMessages((m) => [...m, { role: "user", text: q, mode: activeMode }]);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    // 1. Try the engine first
    const engineReply = buildResponse(q, activeMode, difficulty);
    if (engineReply) {
      setMessages((m) => [...m, { role: "astrobot", text: engineReply, mode: activeMode }]);
      setLoading(false);
      return;
    }

    // 2. Try local knowledge base
    const localReply = getAstroBotReplyLocal(q);
    if (localReply) {
      setMessages((m) => [...m, {
        role: "astrobot",
        text: localReply.answer,
        references: localReply.references,
        mode: activeMode,
      }]);
      setLoading(false);
      return;
    }

    // 3. Try generated response
    const generatedReply = generateAstroBotResponse(q, activeMode, difficulty);
    if (generatedReply) {
      setMessages((m) => [...m, { role: "astrobot", text: generatedReply, mode: activeMode }]);
      setLoading(false);
      return;
    }

    // 4. Fallback
    setMessages((m) => [...m, { role: "astrobot", text: ASTROBOT_FALLBACK }]);
    setLoading(false);
  };

  const activeModeInfo = MODES.find((m) => m.id === activeMode)!;
  const activeDiff = DIFFICULTIES.find((d) => d.id === difficulty)!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <section className="hero-gradient rounded-2xl px-6 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-primary)" }}>
          Official AI Instructor · Orbital Simulator Hub
        </p>
        <h1 className="headline mb-2">🛰️ AstroBot</h1>
        <p className="subhead max-w-xl mx-auto">
          Your space & orbital mechanics instructor. Ask anything about orbits, missions, planets, math, or how to use the simulator.
        </p>
      </section>

      {/* Mode Selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
          Select Mode
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => { setActiveMode(m.id); setShowExamples(true); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition text-left"
              style={{
                background: activeMode === m.id ? "var(--accent-primary)" : "var(--bg-surface)",
                color: activeMode === m.id ? "var(--text-on-accent)" : "var(--text-secondary)",
                border: `1.5px solid ${activeMode === m.id ? "var(--accent-primary)" : "var(--border-color)"}`,
              }}
            >
              <span className="text-lg">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty + active mode info */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Level:</span>
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            onClick={() => setDifficulty(d.id)}
            className="px-3 py-1 rounded-full text-xs font-bold transition"
            style={{
              background: difficulty === d.id ? d.color : "var(--bg-surface)",
              color: difficulty === d.id ? "#fff" : "var(--text-muted)",
              border: `1.5px solid ${difficulty === d.id ? d.color : "var(--border-color)"}`,
            }}
          >
            {d.label}
          </button>
        ))}
        <span className="ml-2 text-xs px-3 py-1 rounded-full" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
          {activeModeInfo.icon} {activeModeInfo.desc}
        </span>
      </div>

      {/* Example questions */}
      {showExamples && (
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-muted)" }}>
            {activeModeInfo.icon} Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUESTIONS[activeMode].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-1.5 rounded-lg transition text-left"
                style={{
                  background: "var(--bg-surface)",
                  color: "var(--accent-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", minHeight: "400px", maxHeight: "60vh" }}>
        <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            AstroBot · {activeModeInfo.icon} {activeModeInfo.label} Mode · Level: <span style={{ color: activeDiff.color }}>{activeDiff.label}</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "astrobot" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1 text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
                  🛰
                </div>
              )}
              <div className="max-w-[90%] space-y-2">
                <div
                  className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={msg.role === "user"
                    ? { background: "var(--accent-primary)", color: "var(--text-on-accent)" }
                    : { background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }
                  }
                >
                  {msg.role === "astrobot" ? renderMarkdown(msg.text) : <span>{msg.text}</span>}
                  {msg.role === "astrobot" && msg.references && msg.references.length > 0 && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
                      <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>📚 Sources:</p>
                      <div className="space-y-1">
                        {msg.references.map((ref, idx) => (
                          <a key={idx} href={ref.url} target="_blank" rel="noopener noreferrer" className="block text-xs hover:underline" style={{ color: "var(--accent-primary)" }}>
                            · {ref.title} ({ref.source})
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === "astrobot" && (() => {
                  const ctas = extractCTAs(msg.text);
                  return ctas.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pl-1">
                      {ctas.map((cta, ci) => (
                        <button
                          key={ci}
                          onClick={() => send(cta.query)}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium transition"
                          style={{ background: "var(--bg-card)", color: "var(--accent-primary)", border: "1px solid var(--border-color)" }}
                        >
                          {cta.label}
                        </button>
                      ))}
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>🛰</div>
              <div className="rounded-2xl px-4 py-3" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>AstroBot is calculating mission parameters…</span>
                <span className="ml-1 animate-pulse">●●●</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="p-3 border-t" style={{ borderColor: "var(--border-color)", background: "var(--bg-surface)" }}>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${activeModeInfo.icon} ${activeModeInfo.desc}...`}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1.5px solid var(--accent-primary)",
              }}
              disabled={loading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl font-bold px-5 py-2.5 transition"
              style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)", opacity: loading || !input.trim() ? 0.5 : 1 }}
            >
              Launch 🚀
            </button>
          </form>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { href: "/simulator", label: "🛰 Try Simulator", desc: "3D orbit builder" },
          { href: "/astronauts", label: "👨‍🚀 Astronauts", desc: "All moonwalkers" },
          { href: "/planets", label: "🪐 Planet Hub", desc: "Solar system data" },
          { href: "/formulas-library", label: "🧮 Formulas", desc: "Physics equations" },
        ].map((l) => (
          <Link key={l.href} href={l.href}>
            <a className="block rounded-xl p-4 transition hover:-translate-y-0.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{l.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{l.desc}</div>
            </a>
          </Link>
        ))}
      </div>

      {/* Knowledge Pack reference */}
      <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="font-bold text-sm mb-3" style={{ color: "var(--text-primary)" }}>📐 Knowledge Pack — Constants & Formulas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
          <div>
            <p className="font-semibold mb-1 not-italic" style={{ color: "var(--text-primary)", fontFamily: "inherit" }}>🌍 Earth Constants</p>
            <p>μ = 3.986004418 × 10¹⁴ m³/s²</p>
            <p>R_Earth = 6,371 km</p>
            <p>g₀ = 9.80665 m/s²</p>
            <p>M_Earth = 5.972 × 10²⁴ kg</p>
          </div>
          <div>
            <p className="font-semibold mb-1 not-italic" style={{ color: "var(--text-primary)", fontFamily: "inherit" }}>🧮 Key Formulas</p>
            <p>v = √(μ/r) — orbital velocity</p>
            <p>T = 2π√(r³/μ) — period</p>
            <p>v_esc = √(2μ/r) — escape velocity</p>
            <p>Δv = Isp·g₀·ln(m₀/m₁) — Tsiolkovsky</p>
            <p>v² = μ(2/r − 1/a) — vis-viva</p>
          </div>
          <div>
            <p className="font-semibold mb-1 not-italic" style={{ color: "var(--text-primary)", fontFamily: "inherit" }}>🛰 Orbit Benchmarks</p>
            <p>ISS: 408 km, 7.66 km/s, 92 min</p>
            <p>GPS: 20,200 km, 3.87 km/s, 12 h</p>
            <p>GEO: 35,786 km, 3.07 km/s, 24 h</p>
            <p>Moon: 384,400 km from Earth</p>
            <p>Escape: 11.2 km/s from surface</p>
          </div>
        </div>
      </div>

      {/* AstroBot Scope */}
      <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="font-bold text-sm mb-3" style={{ color: "var(--text-primary)" }}>🎯 AstroBot Can Help With</h2>
        <div className="grid sm:grid-cols-2 gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
          {[
            "Orbital Mechanics: Kepler, LEO/MEO/GEO, period, velocity, delta-v, Hohmann",
            "Newton & Physics: gravity, momentum, energy, escape velocity, circular motion",
            "Spacecraft: EPS, ADCS, OBC, COMMS, payloads, mission design, station-keeping",
            "Astronaut Training: selection, fitness, EVA, microgravity, ISS daily life",
            "Solar System: all 8 planets, moons, missions, distances, exploration",
            "AI in Aerospace: autonomous nav, anomaly detection, robotics, Mars rovers",
            "Quizzes & Learning: quizzes, flashcards, practice problems, study plans",
            "Website Guide: explain any section & how to use the simulator",
          ].map((item) => (
            <div key={item} className="flex gap-2">
              <span style={{ color: "var(--accent-primary)" }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3 italic" style={{ color: "var(--text-muted)" }}>
          If AstroBot isn't 100% sure about something, it will say so and suggest verifying via official mission data.
        </p>
      </div>
    </div>
  );
}
