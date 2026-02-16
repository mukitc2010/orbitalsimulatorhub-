import { Link } from "wouter";
import { useState } from "react";

interface Mission {
  year: string;
  name: string;
  description: string;
  achievement: string;
  category: "launch" | "exploration" | "station" | "telescope" | "rover";
}

const MISSIONS: Mission[] = [
  {
    year: "1957",
    name: "Sputnik 1",
    description: "First artificial satellite",
    achievement: "Started the Space Age",
    category: "launch"
  },
  {
    year: "1961",
    name: "Vostok 1",
    description: "First human in space (Yuri Gagarin)",
    achievement: "Proved humans could survive in space",
    category: "exploration"
  },
  {
    year: "1969",
    name: "Apollo 11",
    description: "First humans on the Moon",
    achievement: "Neil Armstrong and Buzz Aldrin walk on Moon",
    category: "exploration"
  },
  {
    year: "1971",
    name: "Salyut 1",
    description: "First space station",
    achievement: "First long-duration space habitation",
    category: "station"
  },
  {
    year: "1977",
    name: "Voyager 1 & 2",
    description: "Interplanetary probes",
    achievement: "Still transmitting from interstellar space!",
    category: "exploration"
  },
  {
    year: "1981",
    name: "Space Shuttle",
    description: "First reusable spacecraft",
    achievement: "Flew 135 missions over 30 years",
    category: "launch"
  },
  {
    year: "1990",
    name: "Hubble Space Telescope",
    description: "Space telescope",
    achievement: "Revolutionized astronomy, still operating",
    category: "telescope"
  },
  {
    year: "1998",
    name: "ISS Assembly Begins",
    description: "International Space Station",
    achievement: "Largest human-made object in space",
    category: "station"
  },
  {
    year: "2004",
    name: "Spirit & Opportunity",
    description: "Mars rovers",
    achievement: "Opportunity operated 15 years (designed for 90 days!)",
    category: "rover"
  },
  {
    year: "2012",
    name: "Curiosity Rover",
    description: "Mars Science Laboratory",
    achievement: "Nuclear-powered rover, still exploring Mars",
    category: "rover"
  },
  {
    year: "2020",
    name: "Perseverance Rover",
    description: "Mars 2020 mission",
    achievement: "First helicopter (Ingenuity) on Mars",
    category: "rover"
  },
  {
    year: "2021",
    name: "James Webb Space Telescope",
    description: "Most powerful space telescope",
    achievement: "Sees the oldest light in the universe",
    category: "telescope"
  }
];

const CATEGORY_COLORS: Record<Mission["category"], string> = {
  launch: "bg-blue-100 border-blue-300",
  exploration: "bg-purple-100 border-purple-300",
  station: "bg-green-100 border-green-300",
  telescope: "bg-yellow-100 border-yellow-300",
  rover: "bg-red-100 border-red-300"
};

const CATEGORY_ICONS: Record<Mission["category"], string> = {
  launch: "🚀",
  exploration: "🌌",
  station: "🏠",
  telescope: "🔭",
  rover: "🤖"
};

export function MissionTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<Mission["category"] | "all">("all");

  const filteredMissions = selectedCategory === "all" 
    ? MISSIONS 
    : MISSIONS.filter(m => m.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Space Mission Timeline</h1>
        <p className="subhead">
          Explore the history of space exploration from Sputnik to James Webb. Discover key missions, achievements, and milestones in human spaceflight.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4 mb-6">
        <p className="text-sm text-slate-700">
          <strong>💡 Tip:</strong> Click on mission categories below to filter. Each mission used orbital mechanics - the same physics in our <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">3D Simulator</Link>!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === "all"
              ? "bg-[var(--accent-cyan)] text-[#0f172a]"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Missions
        </button>
        {(["launch", "exploration", "station", "telescope", "rover"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat
                ? "bg-[var(--accent-cyan)] text-[#0f172a]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {CATEGORY_ICONS[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-[var(--accent-cyan)]"></div>

        <div className="space-y-8">
          {filteredMissions.map((mission, idx) => (
            <div key={idx} className="relative flex items-start gap-6">
              {/* Year Badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent-cyan)] text-white font-bold text-lg flex items-center justify-center z-10">
                {mission.year}
              </div>

              {/* Mission Card */}
              <div className={`flex-1 rounded-xl border-2 p-5 ${CATEGORY_COLORS[mission.category]} hover:shadow-lg transition`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">
                      {CATEGORY_ICONS[mission.category]} {mission.name}
                    </h2>
                    <p className="text-sm text-slate-600 mb-2">{mission.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/80 rounded font-medium text-slate-700">
                    {mission.category}
                  </span>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm text-slate-700">
                    <strong>Achievement:</strong> {mission.achievement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Eras */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">1950s-1960s</h3>
          <p className="text-sm text-slate-700">
            Space Race era. First satellites, first humans in space, Moon landing. Competition between USA and USSR drove rapid progress.
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">1970s-1990s</h3>
          <p className="text-sm text-slate-700">
            Space stations, reusable Space Shuttle, interplanetary probes. Focus shifted to long-duration missions and scientific exploration.
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">2000s-Present</h3>
          <p className="text-sm text-slate-700">
            ISS operations, Mars rovers, space telescopes, commercial spaceflight. International cooperation and private companies driving innovation.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore Space Missions!</h2>
        <p className="text-slate-700 mb-4">
          All these missions used orbital mechanics to reach their destinations. Try simulating orbits in our 3D simulator!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/simulator">
            <a className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
              Open 3D Simulator →
            </a>
          </Link>
          <Link href="/learn/orbital-mechanics">
            <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
              Learn Orbital Mechanics →
            </a>
          </Link>
          <Link href="/learn/aerospace#nasa">
            <a className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
              NASA Missions →
            </a>
          </Link>
        </div>
      </div>

      <div className="text-sm text-slate-600 space-y-2">
        <p><strong>Related Topics:</strong></p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/aerospace#nasa">
            <a className="text-[var(--accent-cyan)] hover:underline">NASA Missions</a>
          </Link>
          <span>·</span>
          <Link href="/learn/how-mars-rovers-work">
            <a className="text-[var(--accent-cyan)] hover:underline">Mars Rovers</a>
          </Link>
          <span>·</span>
          <Link href="/learn/how-iss-works">
            <a className="text-[var(--accent-cyan)] hover:underline">International Space Station</a>
          </Link>
          <span>·</span>
          <Link href="/simulator">
            <a className="text-[var(--accent-cyan)] hover:underline">3D Simulator</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
