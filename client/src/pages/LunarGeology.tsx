import { Link } from "wouter";
import { useState } from "react";
import { ALL_MISSIONS, type Mission } from "../data/missions";

type ReadingMode = "general" | "kids" | "research";

const apolloLandings = ALL_MISSIONS.filter((m) => m.surfaceOps && m.program === "Apollo");

interface LandingSiteData {
  name: string;
  coordinates: string;
  mission: string;
  missionSlug: string;
  type: string;
  ageBillionYears: string;
  keyFindings: string[];
  samplesKg: number;
  color: string;
}

const LANDING_SITES: LandingSiteData[] = [
  {
    name: "Sea of Tranquility",
    coordinates: "0.67°N, 23.47°E",
    mission: "Apollo 11",
    missionSlug: "apollo-11",
    type: "Mare basalt",
    ageBillionYears: "3.5–3.8",
    keyFindings: ["First extraterrestrial radiometric dates", "Confirmed volcanic origin of mare basalts", "Established baseline for lunar chronology"],
    samplesKg: 21.6,
    color: "#3b82f6",
  },
  {
    name: "Ocean of Storms",
    coordinates: "3.01°S, 23.42°W",
    mission: "Apollo 12",
    missionSlug: "apollo-12",
    type: "Mare basalt (younger)",
    ageBillionYears: "3.1–3.3",
    keyFindings: ["Younger basalts than Apollo 11 — volcanism lasted hundreds of millions of years", "KREEP enrichment revealed asymmetric interior", "Collected Surveyor 3 hardware for space weathering study"],
    samplesKg: 34.4,
    color: "#8b5cf6",
  },
  {
    name: "Fra Mauro Formation",
    coordinates: "3.65°S, 17.47°W",
    mission: "Apollo 14",
    missionSlug: "apollo-14",
    type: "Highland breccia (Imbrium ejecta)",
    ageBillionYears: "3.85 (Imbrium impact)",
    keyFindings: [
      "Dated the Imbrium Basin impact to ~3.85 Ga",
      "'Big Bertha' breccia — possibly contains Earth-origin fragments",
      "KREEP-rich rocks revealed deep lunar geochemistry",
      "Cone Crater exposed sub-ejecta material",
      "Confirmed highland surface = impact-processed, not volcanic",
    ],
    samplesKg: 42.3,
    color: "#ef4444",
  },
  {
    name: "Hadley-Apennine",
    coordinates: "26.13°N, 3.63°E",
    mission: "Apollo 15",
    missionSlug: "apollo-15",
    type: "Mountain front + rille",
    ageBillionYears: "4.1 (Genesis Rock)",
    keyFindings: ["'Genesis Rock' (15415) — anorthosite from original lunar crust, ~4.1 Ga", "Hadley Rille — sinuous channel from ancient lava tube", "Evidence for Lunar Magma Ocean hypothesis"],
    samplesKg: 77.3,
    color: "#22c55e",
  },
  {
    name: "Descartes Highlands",
    coordinates: "8.97°S, 15.50°E",
    mission: "Apollo 16",
    missionSlug: "apollo-16",
    type: "Highland breccia",
    ageBillionYears: "3.9–4.2",
    keyFindings: ["Surprise: no volcanic rocks — all impact breccias", "Fundamentally changed understanding of lunar highlands", "Cayley and Descartes formations = impact ejecta"],
    samplesKg: 95.7,
    color: "#f59e0b",
  },
  {
    name: "Taurus-Littrow Valley",
    coordinates: "20.19°N, 30.77°E",
    mission: "Apollo 17",
    missionSlug: "apollo-17",
    type: "Valley floor + massifs",
    ageBillionYears: "3.7 (orange glass)",
    keyFindings: ["Orange volcanic glass beads — explosive lunar volcanism confirmed", "Geologist Harrison Schmitt walked on the Moon", "Cross-section spanning billions of years"],
    samplesKg: 110.5,
    color: "#ec4899",
  },
];

export function LunarGeology() {
  const [mode, setMode] = useState<ReadingMode>("general");
  const [expandedSite, setExpandedSite] = useState<string | null>("Fra Mauro Formation");

  const tabs: { id: ReadingMode; label: string; icon: string }[] = [
    { id: "general", label: "General", icon: "📖" },
    { id: "kids", label: "Kids Mode", icon: "🧒" },
    { id: "research", label: "Research Mode", icon: "🎓" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/"><a style={{ color: "var(--accent-primary)" }}>Home</a></Link>
        <span>/</span>
        <Link href="/planets/moon"><a style={{ color: "var(--accent-primary)" }}>Moon</a></Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>Lunar Geology</span>
      </nav>

      {/* Mode toggle */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setMode(t.id)} className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: mode === t.id ? "var(--accent-primary)" : "var(--bg-surface)", color: mode === t.id ? "var(--text-on-accent)" : "var(--text-secondary)", border: `1px solid ${mode === t.id ? "var(--accent-primary)" : "var(--border-color)"}` }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Hero */}
      <section className="hero-gradient rounded-2xl px-6 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-primary)" }}>Apollo Landing Site Geology</p>
        <h1 className="headline mb-3">Lunar Geology & the Fra Mauro Formation</h1>
        <p className="subhead max-w-3xl mx-auto text-lg">
          {mode === "kids"
            ? "The Moon isn't just a ball of grey dust! It has mountains, craters, ancient lava plains, and rocks that tell the story of our solar system. Let's explore what astronauts found!"
            : "Explore the geological formations of every Apollo landing site — from the basaltic Sea of Tranquility to the highland breccias of Fra Mauro. Understand how each site revealed a different chapter of the Moon's 4.5-billion-year history."}
        </p>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: "🌙", label: "Landing Sites", value: "6" },
          { icon: "🪨", label: "Total Samples", value: "381.7 kg" },
          { icon: "📅", label: "Age Range", value: "3.1–4.5 Ga" },
          { icon: "🔬", label: "Rock Types", value: "Basalt, Breccia, Anorthosite" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ────── FRA MAURO DEEP DIVE ────── */}
      <section className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "2px solid #ef4444" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">🏔️</span>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>The Fra Mauro Formation</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Apollo 14 Landing Site — 3.65°S, 17.47°W</p>
          </div>
        </div>

        {mode === "kids" ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: "#fef3c720", border: "1px solid #fbbf2440" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>🧒 What is the Fra Mauro Formation?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Imagine a <strong>huge asteroid</strong> crashing into the Moon billions of years ago — BOOM! The crash was so big it dug a hole over 1,000 km wide (called the <strong>Imbrium Basin</strong>). All the rocks and dirt that flew out of that hole landed far away, making a big hilly area called the <strong>Fra Mauro formation</strong>.
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
                It's like when you throw a rock into a mud puddle and the mud splatters everywhere — except this "puddle" was the Moon, and the "rock" was the size of a small country!
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#fef3c720", border: "1px solid #fbbf2440" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>🚀 Why Did Astronauts Go There?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Scientists wanted to pick up those "splattered" rocks! By studying them, they could figure out <strong>when</strong> the big crash happened and <strong>what the Moon was like</strong> billions of years ago. It's like being a detective — but instead of fingerprints, you study rocks!
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
                <strong>Apollo 13</strong> was supposed to go there first, but had a scary problem and had to come back. So <strong>Apollo 14</strong> finished the job! Alan Shepard and Edgar Mitchell walked on Fra Mauro and brought back 42 kg of Moon rocks.
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#fef3c720", border: "1px solid #fbbf2440" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>🪨 What Did They Find?</h3>
              <ul className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                <li>🔵 <strong>Breccias</strong> — Rocks made of broken pieces glued back together by the heat of the crash</li>
                <li>🔴 <strong>"Big Bertha"</strong> — A 9 kg rock that might contain a tiny piece of ancient Earth!</li>
                <li>🟢 <strong>KREEP rocks</strong> — Special rocks with rare ingredients from deep inside the Moon</li>
                <li>⭐ The crash happened about <strong>3.85 billion years ago</strong> — that's almost as old as Earth!</li>
              </ul>
            </div>
          </div>
        ) : mode === "research" ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>Geological Context</h3>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The Fra Mauro formation is interpreted as the continuous ejecta blanket of the Imbrium impact basin (D ≈ 1,160 km). Stratigraphically, it overlies pre-Imbrian terrain and is overlain by Eratosthenian and Copernican craters. The formation extends radially from the Imbrium rim for hundreds of kilometers, with thickness decreasing as ~r⁻³ from the basin center.
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>Petrology & Geochemistry</h3>
              <div className="text-sm font-mono leading-relaxed space-y-2" style={{ color: "var(--text-secondary)" }}>
                <p><strong>Dominant lithology:</strong> Polymict breccias (fragmental, granulitic, impact-melt) composed of pre-Imbrian highland clasts in an impact-melt matrix.</p>
                <p><strong>Sample 14321 ("Big Bertha"):</strong> 9 kg clast-rich breccia. Contains zircon + quartz + feldspar assemblage with terrestrial oxygen isotope signature (Bellucci et al. 2019, EPSL), suggesting possible Earth-origin fragment launched to the Moon ~4 Ga.</p>
                <p><strong>KREEP signature:</strong> Apollo 14 samples are the most KREEP-rich of all Apollo sites. KREEP = potassium (K), rare earth elements (REE), phosphorus (P) — residual liquid from the Lunar Magma Ocean (LMO) crystallization. KREEPy basalts indicate the Procellarum KREEP Terrane underlies Fra Mauro.</p>
                <p><strong>Ar-Ar dating:</strong> Impact-melt breccias yield plateau ages of 3.85 ± 0.05 Ga for the Imbrium event. This age anchors the lunar chronology and constrains the Late Heavy Bombardment (LHB) hypothesis.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>Cone Crater Exploration</h3>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Cone Crater (D = 340 m) is a young impact crater that excavated through the Fra Mauro ejecta layer, exposing older sub-Fra Mauro material. Shepard and Mitchell traversed ~3.3 km toward the rim but came within ~20 m without visual confirmation due to terrain slope. Samples from near the rim provided the deepest stratigraphic probe of the Fra Mauro ejecta blanket.
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>Key References</h3>
              <ul className="text-sm font-mono space-y-1" style={{ color: "var(--text-muted)" }}>
                <li>• Swann et al. (1971) "Preliminary Geologic Investigation of the Apollo 14 Landing Site" — USGS</li>
                <li>• Bellucci et al. (2019) "Terrestrial-like zircon in a clast from an Apollo 14 breccia" — EPSL 510, 173–185</li>
                <li>• Stöffler et al. (2006) "Cratering History and Lunar Chronology" — Rev. Mineral. Geochem. 60</li>
                <li>• Snyder et al. (2000) "Apollo 14 KREEPy basalt ages" — GCA 64(21)</li>
                <li>• Wilhelms (1987) "The Geologic History of the Moon" — USGS Prof. Paper 1348</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>What Is It?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The Fra Mauro formation is a widespread, hilly geological region on the Moon's near side, named after the Fra Mauro crater (itself named after a 15th-century Italian monk and cartographer). It is believed to be a thick blanket of <strong>ejecta</strong> — material violently thrown out during the massive impact that created the <strong>Imbrium Basin</strong> roughly 3.85 billion years ago.
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
                The Imbrium impact was one of the largest events in lunar history, carving out a basin over 1,100 km wide. The debris from that collision landed hundreds of kilometers away, forming the ridged, hummocky terrain we call the Fra Mauro formation.
              </p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>The Apollo Connection</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <strong>Apollo 13</strong> (1970) was originally supposed to land at Fra Mauro, but the mission was aborted after the famous oxygen tank explosion ("Houston, we've had a problem"). <strong>Apollo 14</strong> (1971) successfully completed the mission — <strong>Alan Shepard</strong> and <strong>Edgar Mitchell</strong> landed on February 5, 1971, collected <strong>42.3 kg of lunar samples</strong>, and explored Cone Crater — a 340-meter impact crater that punched through the Fra Mauro ejecta, exposing deeper, older material.
              </p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Why It Matters Scientifically</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                By studying Fra Mauro rocks, scientists dated the Imbrium impact and gained insight into the <strong>Late Heavy Bombardment</strong> — a period ~3.8–4.1 billion years ago when the inner solar system was pummeled by asteroids. The rocks brought back were primarily <strong>breccias</strong> (fragments of older rocks fused together by impact heat and pressure).
              </p>
              <ul className="text-sm space-y-1 mt-3 pl-4" style={{ color: "var(--text-secondary)" }}>
                <li>📅 <strong>Dated the Imbrium impact</strong> to ~3.85 billion years ago</li>
                <li>🪨 <strong>"Big Bertha"</strong> (sample 14321) — a 9 kg breccia that may contain fragments originally from Earth</li>
                <li>🧪 <strong>KREEP-rich rocks</strong> — residue from the Moon's original magma ocean crystallization</li>
                <li>🕳️ <strong>Cone Crater</strong> — natural drill hole exposing material from beneath the ejecta layer</li>
                <li>📐 Established the age anchor for lunar geological timescale</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>What the Samples Revealed</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Fra Mauro breccias proved that the lunar highlands are shaped primarily by impacts, not volcanism. The KREEP enrichment showed that the Moon's interior is chemically layered — a remnant of the Lunar Magma Ocean. And "Big Bertha" raised the extraordinary possibility that early Earth material was launched to the Moon by giant impacts, preserved in lunar breccias for billions of years.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/missions/apollo-14"><a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>🚀 Apollo 14 Mission Details</a></Link>
          <Link href="/astronauts/alan-shepard"><a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>👨‍🚀 Alan Shepard</a></Link>
          <Link href="/astronauts/edgar-mitchell"><a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>👨‍🚀 Edgar Mitchell</a></Link>
          <Link href="/artifacts"><a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>🪨 Apollo 14 Samples</a></Link>
        </div>
      </section>

      {/* ────── ALL APOLLO LANDING SITES ────── */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🌙 All Apollo Landing Sites — Geology</h2>
        <div className="space-y-4">
          {LANDING_SITES.map((site) => (
            <div key={site.name} className="rounded-xl overflow-hidden" style={{ border: `2px solid ${site.color}40`, background: "var(--bg-card)" }}>
              <button className="w-full p-5 flex items-center justify-between text-left" onClick={() => setExpandedSite(expandedSite === site.name ? null : site.name)}>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: site.color }} />
                  <div>
                    <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{site.name}</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{site.mission} · {site.type} · {site.ageBillionYears} Ga · {site.samplesKg} kg</p>
                  </div>
                </div>
                <span className="text-xl" style={{ color: "var(--text-muted)" }}>{expandedSite === site.name ? "−" : "+"}</span>
              </button>
              {expandedSite === site.name && (
                <div className="px-5 pb-5 space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-lg p-3" style={{ background: "var(--bg-surface)" }}>
                      <div className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)" }}>Location</div>
                      <div className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>{site.coordinates}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "var(--bg-surface)" }}>
                      <div className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)" }}>Rock Type</div>
                      <div className="text-sm" style={{ color: "var(--text-primary)" }}>{site.type}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "var(--bg-surface)" }}>
                      <div className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)" }}>Samples Returned</div>
                      <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{site.samplesKg} kg</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>Key Geological Findings</h4>
                    <ul className="space-y-1">
                      {site.keyFindings.map((f, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                          <span>•</span><span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {apolloLandings.find((m) => m.slug === site.missionSlug)?.surfaceOps?.geology && (
                    <div className="rounded-lg p-3" style={{ background: `${site.color}08`, border: `1px solid ${site.color}20` }}>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {apolloLandings.find((m) => m.slug === site.missionSlug)!.surfaceOps!.geology}
                      </p>
                    </div>
                  )}
                  <Link href={`/missions/${site.missionSlug}`}>
                    <a className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent-primary)" }}>
                      View full {site.mission} mission details →
                    </a>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ────── LUNAR ROCK TYPES ────── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🪨 Lunar Rock Types Explained</h2>
        {mode === "kids" ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Basalt", emoji: "🌋", desc: "Dark, heavy rocks made from ancient lava flows — like the rocks near volcanoes on Earth!" },
              { name: "Breccia", emoji: "🧩", desc: "Rocks made of smashed-up pieces glued together by heat — like a rocky puzzle! Fra Mauro is full of these." },
              { name: "Anorthosite", emoji: "⬜", desc: "Light-colored rocks from the Moon's original crust — the very first layer that formed when the Moon was a ball of magma!" },
              { name: "Regolith", emoji: "🏖️", desc: "Fine, powdery Moon dust — ground up by billions of years of tiny meteorite impacts. It covers everything!" },
            ].map((r) => (
              <div key={r.name} className="p-4 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <div className="text-2xl mb-1">{r.emoji}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{r.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {[
              { name: "Mare Basalt", formula: "Pyroxene + Plagioclase + Ilmenite", age: "3.1–3.8 Ga", desc: "Dark, fine-grained volcanic rocks from lava flows that flooded impact basins. Rich in iron and titanium. Source: partial melting of the lunar mantle.", sites: "Apollo 11, 12, 15, 17" },
              { name: "Breccia (Impact)", formula: "Polymict clasts in impact-melt matrix", age: "3.85–4.2 Ga", desc: "Rocks composed of angular fragments welded by shock and heat from large impacts. The dominant rock type at highland sites. Fra Mauro breccias constrain the Imbrium event.", sites: "Apollo 14, 16" },
              { name: "Anorthosite", formula: "~90% Plagioclase feldspar (CaAl₂Si₂O₈)", age: "4.1–4.5 Ga", desc: "Light-colored rocks from the primordial lunar crust — flotation cumulates from the Lunar Magma Ocean. The 'Genesis Rock' (Apollo 15) is the most famous example.", sites: "Apollo 15, 16" },
              { name: "KREEP Basalt", formula: "K + REE + P enriched", age: "3.8–4.0 Ga", desc: "Rocks enriched in incompatible elements — the last liquid residue of the Lunar Magma Ocean crystallization. Concentrated in the Procellarum KREEP Terrane beneath Fra Mauro and Oceanus Procellarum.", sites: "Apollo 12, 14, 15" },
              { name: "Orange/Green Glass", formula: "Fe-rich glass beads (pyroclastic)", age: "3.5–3.7 Ga", desc: "Tiny spherical beads from explosive volcanic eruptions (fire fountaining). Harrison Schmitt's discovery at Taurus-Littrow confirmed lunar pyroclastic volcanism.", sites: "Apollo 15, 17" },
              { name: "Regolith", formula: "Ground rock + glass + agglutinates", age: "Continuous", desc: "Fine-grained surface layer (2–15 m deep) produced by ~4 Gyr of micrometeorite bombardment. Contains solar wind implanted gases (He-3), impact glass, and mineral fragments.", sites: "All Apollo sites" },
            ].map((r) => (
              <div key={r.name} className="p-4 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{r.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--accent-primary)15", color: "var(--accent-primary)" }}>{r.age}</span>
                </div>
                {mode === "research" && <p className="text-xs font-mono mb-1" style={{ color: "var(--text-muted)" }}>{r.formula}</p>}
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.desc}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Found at: {r.sites}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ────── TIMELINE ────── */}
      <section className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>📅 Lunar Geological Timeline</h2>
        <div className="space-y-3">
          {[
            { era: "Pre-Nectarian", age: "4.5–3.92 Ga", event: "Moon forms from giant impact; Lunar Magma Ocean crystallizes; primordial anorthosite crust solidifies", color: "#6366f1" },
            { era: "Nectarian", age: "3.92–3.85 Ga", event: "Nectaris Basin impact and other large basin-forming events shape the highlands", color: "#8b5cf6" },
            { era: "Early Imbrian", age: "3.85–3.8 Ga", event: "Imbrium Basin impact (~3.85 Ga) creates Fra Mauro ejecta blanket; Orientale Basin forms", color: "#ef4444" },
            { era: "Late Imbrian", age: "3.8–3.2 Ga", event: "Massive basaltic volcanism floods impact basins, creating the dark maria visible today", color: "#f59e0b" },
            { era: "Eratosthenian", age: "3.2–1.1 Ga", event: "Volcanism wanes; impact rate decreases; surface largely quiet", color: "#22c55e" },
            { era: "Copernican", age: "1.1 Ga–present", event: "Young, bright-rayed craters (Copernicus, Tycho); micrometeorite gardening continues", color: "#3b82f6" },
          ].map((e) => (
            <div key={e.era} className="flex gap-4 items-start">
              <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: e.color }} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{e.era}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${e.color}15`, color: e.color }}>{e.age}</span>
                </div>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>{e.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── EXPLORE MORE ────── */}
      <section className="flex flex-wrap gap-3 pb-4">
        {[
          { href: "/planets/moon", label: "🌙 Moon Overview" },
          { href: "/artifacts", label: "🪨 Brought From Space" },
          { href: "/missions", label: "🚀 All Missions" },
          { href: "/astronauts", label: "👨‍🚀 Astronaut Explorer" },
          { href: "/simulator", label: "🛰 Orbit Simulator" },
          { href: "/astrobot", label: "🤖 Ask AstroBot" },
          { href: "/research", label: "📚 Research Hub" },
        ].map((l) => (
          <Link key={l.href} href={l.href}>
            <a className="px-4 py-2 rounded-lg font-medium text-sm transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>{l.label}</a>
          </Link>
        ))}
      </section>
    </div>
  );
}
