import { Link, useRoute } from "wouter";
import { useState, useMemo } from "react";
import { ALL_PLANETS, getPlanetBySlug, type Planet } from "../data/planets";

function fmtDist(km: number): string {
  if (km >= 1e9) return `${(km / 1e9).toFixed(2)}B km`;
  if (km >= 1e6) return `${(km / 1e6).toFixed(1)}M km`;
  if (km >= 1e3) return `${(km / 1e3).toFixed(1)}K km`;
  return `${km} km`;
}

function fmtOrbit(days: number): string {
  if (days >= 365) return `${(days / 365.25).toFixed(2)} years (${days.toLocaleString()} days)`;
  return `${days.toFixed(1)} days`;
}

function fmtRotation(hours: number): string {
  if (hours >= 24) return `${(hours / 24).toFixed(1)} Earth days (${hours.toLocaleString()} hrs)`;
  return `${hours.toFixed(2)} hours`;
}

function getPrevNext(planet: Planet) {
  const idx = ALL_PLANETS.findIndex((p) => p.id === planet.id);
  return {
    prev: idx > 0 ? ALL_PLANETS[idx - 1] : null,
    next: idx < ALL_PLANETS.length - 1 ? ALL_PLANETS[idx + 1] : null,
  };
}

const EARTH_DATA = ALL_PLANETS.find((p) => p.slug === "earth")!;

type ReadingMode = "general" | "kids" | "research";

interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

function getQuiz(p: Planet): QuizQuestion[] {
  return [
    {
      q: `How far is ${p.name} from the Sun?`,
      options: [fmtDist(p.distanceFromSunKm), fmtDist(p.distanceFromSunKm * 2), fmtDist(p.distanceFromSunKm / 3), fmtDist(p.distanceFromSunKm * 0.6)],
      answer: 0,
    },
    {
      q: `How many moons does ${p.name} have?`,
      options: [String(p.moons), String(p.moons + 5), String(Math.max(0, p.moons - 3)), String(p.moons + 12)],
      answer: 0,
    },
    {
      q: `What is ${p.name}'s surface gravity compared to Earth?`,
      options: [`${p.surfaceGravityG.toFixed(2)}g`, `${(p.surfaceGravityG * 1.5).toFixed(2)}g`, `${(p.surfaceGravityG * 0.5).toFixed(2)}g`, "1.00g"],
      answer: 0,
    },
    {
      q: `Does ${p.name} have rings?`,
      options: [p.hasRings ? "Yes" : "No", p.hasRings ? "No" : "Yes"],
      answer: 0,
    },
    {
      q: `What type of planet is ${p.name}?`,
      options: [p.type.replace(/_/g, " "), "gas giant", "ice giant", "terrestrial"].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
      answer: 0,
    },
  ];
}

export function PlanetDetail() {
  const [match, params] = useRoute<{ slug: string }>("/planets/:slug");
  const planet = match && params ? getPlanetBySlug(params.slug) : null;
  const [mode, setMode] = useState<ReadingMode>("general");
  const [weightKg, setWeightKg] = useState(70);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const quiz = useMemo(() => (planet ? getQuiz(planet) : []), [planet]);

  if (!planet) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Planet not found</h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>The planet you&apos;re looking for doesn&apos;t exist in our database.</p>
        <Link href="/planets"><a className="font-medium" style={{ color: "var(--accent-primary)" }}>← Back to Planet Hub</a></Link>
      </div>
    );
  }

  const { prev, next } = getPrevNext(planet);
  const earthComparison = {
    distanceRatio: planet.distanceFromSunKm / EARTH_DATA.distanceFromSunKm,
    gravityRatio: planet.surfaceGravityG / EARTH_DATA.surfaceGravityG,
    sizeRatio: planet.radiusKm / EARTH_DATA.radiusKm,
    yearRatio: planet.orbitalPeriodDays / EARTH_DATA.orbitalPeriodDays,
    tempDiff: planet.avgTemperatureC - EARTH_DATA.avgTemperatureC,
  };
  const weightOnPlanet = (weightKg * planet.surfaceGravityG).toFixed(1);

  const tabs: { id: ReadingMode; label: string; icon: string }[] = [
    { id: "general", label: "General", icon: "📖" },
    { id: "kids", label: "Kids Mode", icon: "🧒" },
    { id: "research", label: "Research Mode", icon: "🎓" },
  ];

  const toggle = (section: string) => setExpandedSection(expandedSection === section ? null : section);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/"><a style={{ color: "var(--accent-primary)" }}>Home</a></Link>
        <span>/</span>
        <Link href="/planets"><a style={{ color: "var(--accent-primary)" }}>Planets</a></Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{planet.name}</span>
      </nav>

      {/* Reading mode toggle */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setMode(tab.id)} className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: mode === tab.id ? "var(--accent-primary)" : "var(--bg-surface)", color: mode === tab.id ? "var(--text-on-accent)" : "var(--text-secondary)", border: `1px solid ${mode === tab.id ? "var(--accent-primary)" : "var(--border-color)"}` }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Hero header */}
      <header className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "var(--bg-card)", border: `2px solid ${planet.color}` }}>
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-7xl sm:text-8xl">{planet.emoji}</span>
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{planet.name}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg text-sm font-semibold capitalize" style={{ background: `${planet.color}20`, color: planet.color, border: `1px solid ${planet.color}40` }}>{planet.type.replace(/_/g, " ")}</span>
              {planet.humanVisited && <span className="px-3 py-1 rounded-lg text-sm font-semibold" style={{ background: "#22c55e20", color: "#22c55e" }}>✅ Human Visited</span>}
              {planet.hasRings && <span className="px-3 py-1 rounded-lg text-sm font-semibold" style={{ background: "#a855f720", color: "#a855f7" }}>💍 Has Rings</span>}
              <span className="px-3 py-1 rounded-lg text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>🛰 {planet.missionsVisited.length} missions</span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {mode === "kids" ? planet.kidsExplanation : planet.seoDescription}
            </p>
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: "📏", label: "From Sun", value: fmtDist(planet.distanceFromSunKm) },
          { icon: "🧲", label: "Gravity", value: `${planet.surfaceGravityG.toFixed(2)}g` },
          { icon: "🌡", label: "Temperature", value: `${planet.avgTemperatureC}°C` },
          { icon: "🌙", label: "Moons", value: planet.moons.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ─── PHYSICAL CHARACTERISTICS ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <button className="w-full flex items-center justify-between" onClick={() => toggle("physical")}>
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>🔬 Physical Characteristics</h2>
          <span className="text-xl" style={{ color: "var(--text-muted)" }}>{expandedSection === "physical" ? "−" : "+"}</span>
        </button>
        {(expandedSection === "physical" || expandedSection === null) && (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Distance from Sun", value: fmtDist(planet.distanceFromSunKm), sub: `${earthComparison.distanceRatio.toFixed(2)}× Earth's distance` },
              { label: "Distance from Earth", value: fmtDist(planet.distanceFromEarthKm), sub: planet.slug === "earth" ? "You are here!" : "Average distance" },
              { label: "Orbital Period (Year)", value: fmtOrbit(planet.orbitalPeriodDays), sub: `${earthComparison.yearRatio.toFixed(2)}× Earth year` },
              { label: "Rotation Period (Day)", value: fmtRotation(planet.rotationPeriodHours), sub: planet.rotationPeriodHours > 24 ? "Longer than an Earth day" : "Shorter than an Earth day" },
              { label: "Radius", value: `${planet.radiusKm.toLocaleString()} km`, sub: `${earthComparison.sizeRatio.toFixed(2)}× Earth's radius` },
              { label: "Mass", value: planet.massKg + " kg", sub: "Measured by NASA/JPL" },
              { label: "Surface Gravity", value: `${planet.gravityMps2} m/s² (${planet.surfaceGravityG.toFixed(2)}g)`, sub: `${earthComparison.gravityRatio.toFixed(2)}× Earth gravity` },
              { label: "Average Temperature", value: `${planet.avgTemperatureC}°C`, sub: `${earthComparison.tempDiff > 0 ? "+" : ""}${earthComparison.tempDiff}°C vs Earth` },
              { label: "Moons", value: planet.moons.toString(), sub: planet.moons === 0 ? "No natural satellites" : `${planet.moons} known natural satellite${planet.moons > 1 ? "s" : ""}` },
              { label: "Rings", value: planet.hasRings ? "Yes" : "No", sub: planet.hasRings ? "Visible ring system" : "No ring system" },
              { label: "Human Visited", value: planet.humanVisited ? "Yes" : "Not yet", sub: planet.humanVisited ? "Humans have been here!" : "Robotic missions only" },
              { label: "Planet Type", value: planet.type.replace(/_/g, " "), sub: planet.type === "terrestrial" ? "Rocky surface" : planet.type === "gas_giant" ? "No solid surface" : planet.type === "ice_giant" ? "Icy interior" : "" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                <div className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{item.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── ATMOSPHERE ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <button className="w-full flex items-center justify-between" onClick={() => toggle("atmosphere")}>
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>🌫️ Atmosphere</h2>
          <span className="text-xl" style={{ color: "var(--text-muted)" }}>{expandedSection === "atmosphere" ? "−" : "+"}</span>
        </button>
        {(expandedSection === "atmosphere" || expandedSection === null) && (
          <div className="mt-4">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{planet.atmosphere}</p>
            {mode === "kids" && (
              <div className="mt-3 p-4 rounded-lg" style={{ background: `${planet.color}10`, border: `1px solid ${planet.color}30` }}>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                  🧒 <strong>Simple explanation:</strong>{" "}
                  {planet.atmosphere.includes("no") || planet.atmosphere.includes("none") || planet.atmosphere.includes("Exosphere")
                    ? `${planet.name} has almost no air at all! You'd definitely need a space suit.`
                    : planet.atmosphere.includes("CO₂")
                      ? `${planet.name}'s air is mostly carbon dioxide — you couldn't breathe it! It's very different from Earth's air.`
                      : planet.atmosphere.includes("H₂")
                        ? `${planet.name} is wrapped in hydrogen and helium gas — kind of like a giant balloon!`
                        : `${planet.name} has a special atmosphere that's very different from Earth's.`}
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── COMPARISON WITH EARTH ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <button className="w-full flex items-center justify-between" onClick={() => toggle("compare")}>
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>⚖️ {planet.name} vs Earth</h2>
          <span className="text-xl" style={{ color: "var(--text-muted)" }}>{expandedSection === "compare" ? "−" : "+"}</span>
        </button>
        {(expandedSection === "compare" || expandedSection === null) && (
          <div className="mt-4 space-y-4">
            {[
              { label: "Size", planet: `${planet.radiusKm.toLocaleString()} km`, earth: `${EARTH_DATA.radiusKm.toLocaleString()} km`, ratio: earthComparison.sizeRatio, unit: "×" },
              { label: "Gravity", planet: `${planet.surfaceGravityG.toFixed(2)}g`, earth: "1.00g", ratio: earthComparison.gravityRatio, unit: "×" },
              { label: "Distance from Sun", planet: fmtDist(planet.distanceFromSunKm), earth: fmtDist(EARTH_DATA.distanceFromSunKm), ratio: earthComparison.distanceRatio, unit: "×" },
              { label: "Year Length", planet: fmtOrbit(planet.orbitalPeriodDays), earth: "365.25 days", ratio: earthComparison.yearRatio, unit: "×" },
              { label: "Temperature", planet: `${planet.avgTemperatureC}°C`, earth: `${EARTH_DATA.avgTemperatureC}°C`, ratio: 0, unit: `${earthComparison.tempDiff > 0 ? "+" : ""}${earthComparison.tempDiff}°C` },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-4 gap-3 items-center p-3 rounded-lg" style={{ background: "var(--bg-surface)" }}>
                <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{row.label}</div>
                <div className="text-sm text-center" style={{ color: planet.color }}>
                  <div className="font-bold">{planet.emoji} {planet.name}</div>
                  <div>{row.planet}</div>
                </div>
                <div className="text-sm text-center" style={{ color: "#1E90FF" }}>
                  <div className="font-bold">🌍 Earth</div>
                  <div>{row.earth}</div>
                </div>
                <div className="text-center">
                  <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: `${planet.color}20`, color: planet.color }}>
                    {row.ratio !== 0 ? `${row.ratio.toFixed(2)}${row.unit}` : row.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── WEIGHT CALCULATOR ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>⚖️ Your Weight on {planet.name}</h2>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Your weight on Earth (kg):</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value) || 1))}
            className="px-3 py-2 rounded-lg w-28 text-center font-bold"
            style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}
            min={1}
            max={500}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>On Earth 🌍</div>
            <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{weightKg} kg</div>
          </div>
          <div className="rounded-lg p-4 text-center" style={{ background: `${planet.color}10`, border: `2px solid ${planet.color}40` }}>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>On {planet.name} {planet.emoji}</div>
            <div className="text-2xl font-bold" style={{ color: planet.color }}>{weightOnPlanet} kg</div>
          </div>
          <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>Difference</div>
            <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {Number(weightOnPlanet) > weightKg ? "+" : ""}{(Number(weightOnPlanet) - weightKg).toFixed(1)} kg
            </div>
          </div>
        </div>
        {mode === "kids" && (
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            🧒 {Number(weightOnPlanet) < weightKg
              ? `You'd feel super light on ${planet.name}! You could jump ${(1 / planet.surfaceGravityG).toFixed(1)}× higher than on Earth!`
              : `You'd feel heavier on ${planet.name}! Walking would be like carrying a heavy backpack.`}
          </p>
        )}
        {mode === "research" && (
          <p className="mt-3 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
            W = mg, where g = GM/r² = {planet.gravityMps2} m/s². Weight ratio = g_{"{planet}"}/g_Earth = {planet.surfaceGravityG.toFixed(4)}
          </p>
        )}
      </section>

      {/* ─── MISSIONS THAT VISITED ─── */}
      {planet.missionsVisited.length > 0 && (
        <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <button className="w-full flex items-center justify-between" onClick={() => toggle("missions")}>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>🛰 Missions That Visited {planet.name}</h2>
            <span className="text-xl" style={{ color: "var(--text-muted)" }}>{expandedSection === "missions" ? "−" : "+"}</span>
          </button>
          {(expandedSection === "missions" || expandedSection === null) && (
            <div className="mt-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {planet.missionsVisited.map((mission, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                    <span className="text-xl">🚀</span>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{mission}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {mission.includes("Apollo") ? "Crewed lunar mission — NASA" :
                         mission.includes("Voyager") ? "Interplanetary flyby — NASA/JPL" :
                         mission.includes("Pioneer") ? "Early exploration probe — NASA" :
                         mission.includes("Cassini") ? "Orbital mission — NASA/ESA/ASI" :
                         mission.includes("Juno") ? "Jupiter orbiter — NASA" :
                         mission.includes("MESSENGER") ? "Mercury orbiter — NASA" :
                         mission.includes("Magellan") ? "Radar mapping orbiter — NASA" :
                         mission.includes("Viking") ? "Lander & orbiter — NASA" :
                         mission.includes("Curiosity") ? "Mars rover — NASA/JPL" :
                         mission.includes("Perseverance") ? "Mars rover & sample cacher — NASA/JPL" :
                         mission.includes("Ingenuity") ? "First powered flight on another planet — NASA" :
                         mission.includes("New Horizons") ? "Pluto flyby — NASA" :
                         mission.includes("Mariner") ? "Planetary flyby — NASA/JPL" :
                         mission.includes("Venera") ? "Venus lander — Soviet space program" :
                         mission.includes("Akatsuki") ? "Venus orbiter — JAXA" :
                         mission.includes("BepiColombo") ? "Mercury mission — ESA/JAXA" :
                         mission.includes("Luna") ? "Lunar exploration — Soviet space program" :
                         mission.includes("Artemis") ? "Return to Moon — NASA" :
                         mission.includes("Chang") ? "Lunar exploration — CNSA" :
                         mission.includes("LRO") ? "Lunar Reconnaissance Orbiter — NASA" :
                         mission.includes("SLIM") ? "Lunar lander — JAXA" :
                         mission.includes("ISS") ? "International Space Station — Multi-agency" :
                         mission.includes("Hubble") ? "Space telescope — NASA/ESA" :
                         mission.includes("Spirit") ? "Mars rover — NASA/JPL" :
                         mission.includes("Opportunity") ? "Mars rover — NASA/JPL" :
                         mission.includes("Pathfinder") ? "Mars lander & rover — NASA" :
                         mission.includes("Parker") ? "Solar probe (Venus flyby) — NASA" :
                         mission.includes("Venus Express") ? "Venus orbiter — ESA" :
                         "Space exploration mission"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                Total: <strong>{planet.missionsVisited.length}</strong> missions. {planet.humanVisited ? "Humans have visited this body!" : "Only robotic missions so far."}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ─── FUN FACTS ─── */}
      {planet.funFacts.length > 0 && (
        <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🧠 Fun Facts About {planet.name}</h2>
          <div className="space-y-3">
            {planet.funFacts.map((fact, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: "var(--bg-surface)" }}>
                <span className="text-xl flex-shrink-0">{["💡", "⭐", "🔭", "🎯", "✨"][i % 5]}</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{fact}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── KIDS MODE EXTRA ─── */}
      {mode === "kids" && (
        <section className="rounded-xl p-6" style={{ background: "#fef3c720", border: "2px solid #fbbf2440" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🧒 {planet.name} for Kids</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{planet.kidsExplanation}</p>

          <div className="space-y-3">
            <div className="p-4 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>🎒 If You Visited {planet.name}...</h3>
              <ul className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                <li>🏋️ You'd weigh {weightOnPlanet} kg (vs {weightKg} kg on Earth)</li>
                <li>🌡️ The temperature would be {planet.avgTemperatureC}°C — {planet.avgTemperatureC > 40 ? "super hot!" : planet.avgTemperatureC < -50 ? "freezing cold!" : "not bad!"}</li>
                <li>📅 A year would last {planet.orbitalPeriodDays < 365 ? `only ${planet.orbitalPeriodDays.toFixed(0)} Earth days` : `${(planet.orbitalPeriodDays / 365.25).toFixed(1)} Earth years`}</li>
                <li>🌙 You'd see {planet.moons === 0 ? "no moons" : planet.moons === 1 ? "1 moon" : `${planet.moons} moons`} in the sky!</li>
                <li>{planet.hasRings ? "💍 You'd see beautiful rings overhead!" : "💍 No rings to see, but the stars would be amazing!"}</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>🎮 Imagine This!</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {planet.surfaceGravityG < 0.5
                  ? `On ${planet.name}, you could jump ${(1 / planet.surfaceGravityG).toFixed(0)} times higher than on Earth! A basketball player could dunk from half-court!`
                  : planet.surfaceGravityG > 1.5
                    ? `On ${planet.name}, everything feels ${planet.surfaceGravityG.toFixed(1)} times heavier! Running would be like wearing a super heavy backpack.`
                    : `On ${planet.name}, gravity is about ${(planet.surfaceGravityG * 100).toFixed(0)}% of Earth's — pretty similar to home!`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── RESEARCH MODE EXTRA ─── */}
      {mode === "research" && (
        <section className="rounded-xl p-6" style={{ background: "#4ade8010", border: "2px solid #4ade8030" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🎓 Research & Orbital Mechanics</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>📐 Research Notes</h3>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>{planet.researchNotes}</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>🔢 Key Equations</h3>
              <div className="space-y-2 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                <p><strong>Surface gravity:</strong> g = GM/r² = {planet.gravityMps2} m/s²</p>
                <p><strong>Orbital velocity:</strong> v = √(GM☉/a) = {(29.78 / Math.sqrt(planet.distanceFromSunKm / EARTH_DATA.distanceFromSunKm)).toFixed(2)} km/s</p>
                <p><strong>Kepler's 3rd Law:</strong> T² ∝ a³ → T = {fmtOrbit(planet.orbitalPeriodDays)}</p>
                <p><strong>Escape velocity:</strong> v_esc = √(2GM/r) = {(Math.sqrt(2 * planet.gravityMps2 * planet.radiusKm * 1000) / 1000).toFixed(2)} km/s</p>
                <p><strong>Semi-major axis:</strong> a = {(planet.distanceFromSunKm / 149_600_000).toFixed(3)} AU</p>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>📊 Physical Parameters (NASA/JPL)</h3>
              <table className="w-full text-sm font-mono">
                <tbody>
                  {[
                    ["Mass", planet.massKg + " kg"],
                    ["Radius", `${planet.radiusKm.toLocaleString()} km`],
                    ["Volume", `${(4 / 3 * Math.PI * Math.pow(planet.radiusKm, 3) / 1e9).toExponential(3)} × 10⁹ km³`],
                    ["Surface area", `${(4 * Math.PI * Math.pow(planet.radiusKm, 2) / 1e6).toExponential(3)} × 10⁶ km²`],
                    ["Mean density", `≈ ${(planet.gravityMps2 * planet.radiusKm * 1000 / (6.674e-11 * 4 / 3 * Math.PI * Math.pow(planet.radiusKm * 1000, 2)) * 1000).toFixed(0) || "N/A"} kg/m³`],
                    ["Surface gravity", `${planet.gravityMps2} m/s²`],
                    ["Orbital period", `${planet.orbitalPeriodDays.toLocaleString()} days`],
                    ["Sidereal rotation", `${planet.rotationPeriodHours} hours`],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td className="py-1.5 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>{label}</td>
                      <td className="py-1.5" style={{ color: "var(--text-secondary)" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ─── AI QUIZ ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>🎮 Quick Quiz: How Well Do You Know {planet.name}?</h2>
          <button onClick={() => { setShowQuiz(!showQuiz); setQuizAnswers({}); }} className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </button>
        </div>
        {showQuiz && (
          <div className="space-y-4">
            {quiz.map((q, qi) => (
              <div key={qi} className="p-4 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <p className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>{qi + 1}. {q.q}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi;
                    const isCorrect = oi === q.answer;
                    const answered = quizAnswers[qi] !== undefined;
                    return (
                      <button
                        key={oi}
                        onClick={() => setQuizAnswers((a) => ({ ...a, [qi]: oi }))}
                        className="px-3 py-2 rounded-lg text-sm text-left transition"
                        disabled={answered}
                        style={{
                          background: answered
                            ? isCorrect ? "#22c55e20" : selected ? "#ef444420" : "var(--bg-card)"
                            : "var(--bg-card)",
                          border: answered && isCorrect ? "2px solid #22c55e" : selected && !isCorrect ? "2px solid #ef4444" : "1px solid var(--border-color)",
                          color: "var(--text-primary)",
                          opacity: answered && !selected && !isCorrect ? 0.5 : 1,
                        }}
                      >
                        {answered && isCorrect && "✅ "}{answered && selected && !isCorrect && "❌ "}{opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {Object.keys(quizAnswers).length === quiz.length && (
              <div className="p-4 rounded-lg text-center" style={{ background: `${planet.color}10`, border: `2px solid ${planet.color}40` }}>
                <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  Score: {Object.entries(quizAnswers).filter(([qi, ai]) => ai === quiz[Number(qi)].answer).length}/{quiz.length}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  {Object.entries(quizAnswers).filter(([qi, ai]) => ai === quiz[Number(qi)].answer).length === quiz.length
                    ? `🏆 Perfect! You're a ${planet.name} expert!`
                    : `Good try! Review the facts above and try again!`}
                </p>
                <button onClick={() => { setQuizAnswers({}); }} className="mt-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
                  Retry Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── EXPLORE MORE ─── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🔗 Explore More</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={planet.simulatorLink}><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>🛰 Try Orbit Simulator</a></Link>
          <Link href="/astrobot"><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--accent-primary)", border: "1px solid var(--border-color)" }}>🤖 Ask AstroBot about {planet.name}</a></Link>
          <Link href="/astronauts"><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>👨‍🚀 Astronaut Explorer</a></Link>
          <Link href="/artifacts"><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>🪨 Brought From Space</a></Link>
          <Link href="/missions"><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>🚀 All Missions</a></Link>
          <Link href="/research"><a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>📚 Research Hub</a></Link>
        </div>
      </section>

      {/* ─── NAVIGATION ─── */}
      <nav className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
        <Link href="/planets"><a className="font-medium" style={{ color: "var(--accent-primary)" }}>← Back to Planet Hub</a></Link>
        <div className="flex gap-4">
          {prev && <Link href={`/planets/${prev.slug}`}><a className="font-medium flex items-center gap-1" style={{ color: "var(--accent-primary)" }}><span>{prev.emoji}</span> {prev.name}</a></Link>}
          {next && <Link href={`/planets/${next.slug}`}><a className="font-medium flex items-center gap-1" style={{ color: "var(--accent-primary)" }}>{next.name} <span>{next.emoji}</span></a></Link>}
        </div>
      </nav>
    </div>
  );
}
