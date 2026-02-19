/**
 * Mission database with real mission data for the Orbital Simulator Hub.
 * Includes Apollo lunar landings, historic firsts, and Space Shuttle missions.
 */

export interface MissionCrewMember {
  astronautId: string;
  role: string;
}

export interface MissionLaunch {
  date: string;
  site: string;
  vehicle: string;
}

export interface MissionLanding {
  date: string;
  site: string;
}

export interface SurfaceOps {
  landingSite: string;
  moonwalkers: string[];
  surfaceTimeSeconds: number;
  geology?: string;
}

export interface Mission {
  id: string;
  slug: string;
  name: string;
  program: string;
  agency: string;
  type: "human_spaceflight";
  destinations: string[];
  launch: MissionLaunch;
  landing: MissionLanding;
  crew: MissionCrewMember[];
  surfaceOps?: SurfaceOps;
  samplesReturnedKg?: number;
  highlights: string[];
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

// ──── APOLLO LUNAR LANDING MISSIONS ────

const APOLLO_11: Mission = {
  id: "mission_apollo_11",
  slug: "apollo-11",
  name: "Apollo 11",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1969-07-16T13:32:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-506",
  },
  landing: {
    date: "1969-07-24T16:50:35Z",
    site: "North Pacific Ocean (13°19′N 169°9′W)",
  },
  crew: [
    { astronautId: "astronaut_neil_armstrong", role: "Commander" },
    { astronautId: "astronaut_michael_collins", role: "Command Module Pilot" },
    { astronautId: "astronaut_buzz_aldrin", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Sea of Tranquility (Mare Tranquillitatis)",
    moonwalkers: ["astronaut_neil_armstrong", "astronaut_buzz_aldrin"],
    surfaceTimeSeconds: 78756,
    geology: "Mare Tranquillitatis is a vast lunar mare (dark basaltic plain) formed by ancient volcanic eruptions ~3.5–3.8 billion years ago. The basalt lavas flooded a pre-existing impact basin. Apollo 11 collected basalt and regolith samples that confirmed the volcanic origin, established an absolute age for mare surfaces, and provided the first radiometric dates for any extraterrestrial body.",
  },
  samplesReturnedKg: 21.6,
  highlights: [
    "First crewed Moon landing in human history",
    "Neil Armstrong became the first person to walk on the Moon on July 20, 1969",
    "Armstrong's famous words: 'That's one small step for man, one giant leap for mankind'",
    "Deployed Early Apollo Scientific Experiments Package (EASEP)",
    "Planted the American flag on the lunar surface",
    "Returned 21.6 kg of lunar rock and regolith from Mare Tranquillitatis",
  ],
  seoTitle: "Apollo 11 — First Moon Landing Mission | Orbital Simulator Hub",
  seoDescription:
    "Explore the Apollo 11 mission: the first crewed Moon landing on July 20, 1969. Learn about Neil Armstrong, Buzz Aldrin, Michael Collins, and how NASA fulfilled Kennedy's promise.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const APOLLO_12: Mission = {
  id: "mission_apollo_12",
  slug: "apollo-12",
  name: "Apollo 12",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1969-11-14T16:22:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-507",
  },
  landing: {
    date: "1969-11-24T20:58:24Z",
    site: "South Pacific Ocean (15°47′S 165°9′W)",
  },
  crew: [
    { astronautId: "astronaut_pete_conrad", role: "Commander" },
    { astronautId: "astronaut_richard_gordon", role: "Command Module Pilot" },
    { astronautId: "astronaut_alan_bean", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Ocean of Storms (Oceanus Procellarum)",
    moonwalkers: ["astronaut_pete_conrad", "astronaut_alan_bean"],
    surfaceTimeSeconds: 115668,
    geology: "Oceanus Procellarum is the largest lunar mare — a massive basaltic plain on the Moon's near side. Apollo 12 landed near the Surveyor 3 crater and collected basalts dated ~3.2 billion years — significantly younger than Apollo 11's samples. This established that lunar volcanism persisted over hundreds of millions of years. KREEP (potassium, rare earth elements, phosphorus) enrichment in the region revealed the Moon's asymmetric interior composition.",
  },
  samplesReturnedKg: 34.3,
  highlights: [
    "First precision landing on the Moon, within 185 meters of Surveyor 3",
    "Retrieved parts from the Surveyor 3 probe (landed April 1967)",
    "Deployed the first Apollo Lunar Surface Experiments Package (ALSEP)",
    "Two moonwalks totaling over 7 hours 45 minutes",
    "Collected 34.3 kg of lunar samples from Ocean of Storms",
    "Saturn V struck by lightning twice during launch at 36.5 and 52 seconds",
  ],
  seoTitle: "Apollo 12 — Precision Moon Landing & Surveyor 3 Visit | Orbital Simulator Hub",
  seoDescription:
    "Discover Apollo 12: the pinpoint Moon landing in the Ocean of Storms near Surveyor 3. Learn how Pete Conrad, Alan Bean, and Richard Gordon overcame lightning strikes during launch.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const APOLLO_14: Mission = {
  id: "mission_apollo_14",
  slug: "apollo-14",
  name: "Apollo 14",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1971-01-31T21:03:02Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-509",
  },
  landing: {
    date: "1971-02-09T21:05:00Z",
    site: "South Pacific Ocean (27°1′S 172°39′W)",
  },
  crew: [
    { astronautId: "astronaut_alan_shepard", role: "Commander" },
    { astronautId: "astronaut_stuart_roosa", role: "Command Module Pilot" },
    { astronautId: "astronaut_edgar_mitchell", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Fra Mauro",
    moonwalkers: ["astronaut_alan_shepard", "astronaut_edgar_mitchell"],
    surfaceTimeSeconds: 120060,
    geology: "The Fra Mauro formation is a widespread hilly geological region on the Moon, believed to be a thick blanket of ejecta (debris) from the massive Imbrium Basin impact ~3.85 billion years ago. The Imbrium impact — one of the largest events in lunar history — carved a basin over 1,100 km wide, hurling material hundreds of kilometers across the surface to form the ridged, hummocky Fra Mauro terrain. Apollo 14 targeted this site specifically to collect breccia samples (older rocks fused by impact heat and pressure) that would date the Imbrium event and illuminate the Late Heavy Bombardment period. The crew explored near Cone Crater, a 340-meter impact crater that punched through the Fra Mauro ejecta, exposing deeper, older material. Samples included 'Big Bertha' — a 9 kg breccia containing fragments possibly originating from Earth, and KREEP-rich rocks that revealed the Moon's internal geochemistry.",
  },
  samplesReturnedKg: 42.3,
  highlights: [
    "Alan Shepard became the oldest person to walk on the Moon at age 47",
    "Shepard hit two golf balls on the lunar surface with a makeshift 6-iron",
    "First mission to land in the lunar highlands — the Fra Mauro formation",
    "Fra Mauro ejecta blanket dates Imbrium Basin impact to ~3.85 billion years ago",
    "Collected 42.3 kg of breccia and regolith samples from Fra Mauro",
    "'Big Bertha' sample (14321) — 9 kg breccia, possibly contains Earth-origin fragments",
    "Explored Cone Crater — exposing material from beneath the Fra Mauro ejecta layer",
    "Deployed ALSEP experiments including seismometer and laser retroreflector",
    "Stuart Roosa carried tree seeds in orbit — later planted as 'Moon Trees'",
    "Completed the science objectives originally planned for Apollo 13",
  ],
  seoTitle: "Apollo 14 — Fra Mauro Formation, Shepard's Golf Shot | Orbital Simulator Hub",
  seoDescription:
    "Learn about Apollo 14: the Fra Mauro formation geology, Alan Shepard's return to space, the golf shot on the Moon, breccia samples, and the Imbrium Basin dating.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const APOLLO_15: Mission = {
  id: "mission_apollo_15",
  slug: "apollo-15",
  name: "Apollo 15",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1971-07-26T13:34:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-510",
  },
  landing: {
    date: "1971-08-07T20:45:53Z",
    site: "North Pacific Ocean (26°7′N 158°8′W)",
  },
  crew: [
    { astronautId: "astronaut_david_scott", role: "Commander" },
    { astronautId: "astronaut_alfred_worden", role: "Command Module Pilot" },
    { astronautId: "astronaut_james_irwin", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Hadley-Apennine",
    moonwalkers: ["astronaut_david_scott", "astronaut_james_irwin"],
    surfaceTimeSeconds: 238336,
    geology: "The Hadley-Apennine region sits at the base of the Apennine Mountains — the rim of the Imbrium Basin — beside Hadley Rille, a 1.5 km wide sinuous channel carved by ancient lava flows. Apollo 15 discovered the 'Genesis Rock' (anorthosite sample 15415), dated at ~4.1 billion years — one of the oldest lunar samples ever found, likely from the original lunar crust. The site provided critical evidence for the Lunar Magma Ocean hypothesis.",
  },
  samplesReturnedKg: 77,
  highlights: [
    "First mission to use the Lunar Roving Vehicle (LRV), driven 27.9 km",
    "Discovered the 'Genesis Rock' (sample 15415) — 4.1-billion-year-old anorthosite",
    "David Scott performed the hammer-and-feather experiment on live TV",
    "Explored Hadley Rille, a 1.5 km wide meandering channel",
    "Collected 77 kg of lunar samples including Genesis Rock",
    "First mission to deploy a subsatellite into lunar orbit",
  ],
  seoTitle: "Apollo 15 — First Lunar Rover & Genesis Rock Discovery | Orbital Simulator Hub",
  seoDescription:
    "Discover Apollo 15: the first Lunar Roving Vehicle, the Genesis Rock, and the hammer-and-feather experiment. Explore the Hadley-Apennine landing site and the crew's scientific discoveries.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const APOLLO_16: Mission = {
  id: "mission_apollo_16",
  slug: "apollo-16",
  name: "Apollo 16",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1972-04-16T17:54:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-511",
  },
  landing: {
    date: "1972-04-27T19:45:05Z",
    site: "South Pacific Ocean (0°43′S 156°13′W)",
  },
  crew: [
    { astronautId: "astronaut_john_young", role: "Commander" },
    { astronautId: "astronaut_thomas_mattingly", role: "Command Module Pilot" },
    { astronautId: "astronaut_charles_duke", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Descartes Highlands",
    moonwalkers: ["astronaut_john_young", "astronaut_charles_duke"],
    surfaceTimeSeconds: 259208,
    geology: "The Descartes Highlands were expected to contain volcanic rocks, but Apollo 16 surprised scientists by finding impact breccias instead — proving the highlands are primarily shaped by impacts, not volcanism. The 'Descartes formation' consists of material ejected from the Nectaris and Imbrium impacts. This fundamentally changed understanding of lunar highland geology.",
  },
  samplesReturnedKg: 95.8,
  highlights: [
    "First and only mission to land in the lunar highlands",
    "Charles Duke became the youngest moonwalker at age 36",
    "Drove the LRV 26.7 km across the Descartes highlands",
    "Collected 95.8 kg of lunar samples including Big Muley (largest Moon rock)",
    "Disproved the volcanic hypothesis — Descartes region was impact breccias",
    "First astronomical observatory on the Moon (UV camera/spectrograph)",
  ],
  seoTitle: "Apollo 16 — Descartes Highlands Exploration | Orbital Simulator Hub",
  seoDescription:
    "Explore Apollo 16: the only Apollo mission to land in the lunar highlands. Learn about John Young, Charles Duke, and how their discoveries changed our understanding of the Moon.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const APOLLO_17: Mission = {
  id: "mission_apollo_17",
  slug: "apollo-17",
  name: "Apollo 17",
  program: "Apollo",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["moon"],
  launch: {
    date: "1972-12-07T05:33:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Saturn V SA-512",
  },
  landing: {
    date: "1972-12-19T19:24:59Z",
    site: "South Pacific Ocean (17°53′S 166°7′W)",
  },
  crew: [
    { astronautId: "astronaut_gene_cernan", role: "Commander" },
    { astronautId: "astronaut_ronald_evans", role: "Command Module Pilot" },
    { astronautId: "astronaut_harrison_schmitt", role: "Lunar Module Pilot" },
  ],
  surfaceOps: {
    landingSite: "Taurus-Littrow Valley",
    moonwalkers: ["astronaut_gene_cernan", "astronaut_harrison_schmitt"],
    surfaceTimeSeconds: 270014,
    geology: "Taurus-Littrow Valley sits between massive mountain blocks (South Massif, North Massif) at the edge of Mare Serenitatis. Harrison Schmitt — the only geologist to walk on the Moon — discovered orange volcanic glass beads (sample 74220) dated at 3.7 billion years, proving explosive volcanism on the Moon. The valley floor contains both ancient highland material and younger mare basalts, providing a geological cross-section spanning billions of years.",
  },
  samplesReturnedKg: 110.5,
  highlights: [
    "Last crewed Moon landing and final Apollo lunar mission",
    "Only night launch of a Saturn V rocket",
    "Harrison Schmitt — first and only professional geologist to walk on the Moon",
    "Discovery of orange soil at Shorty Crater — volcanic glass beads 3.7 billion years old",
    "Gene Cernan remains the last person to have walked on the Moon",
    "Most lunar samples returned: 110.5 kg; longest total EVA: 22 hours 4 minutes",
  ],
  seoTitle: "Apollo 17 — Last Moon Landing & Orange Soil Discovery | Orbital Simulator Hub",
  seoDescription:
    "Explore Apollo 17: the final crewed Moon landing, Harrison Schmitt's orange soil discovery, and Gene Cernan's last steps on the lunar surface at Taurus-Littrow valley.",
  updatedAt: "2026-02-18T00:00:00Z",
};

// ──── HISTORIC FIRSTS ────

const GEMINI_8: Mission = {
  id: "mission_gemini_8",
  slug: "gemini-8",
  name: "Gemini 8",
  program: "Gemini",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["leo"],
  launch: {
    date: "1966-03-16T16:41:02Z",
    site: "Cape Kennedy, LC-19, Florida",
    vehicle: "Titan II GLV",
  },
  landing: {
    date: "1966-03-17T03:22:28Z",
    site: "Western Pacific Ocean, south of Japan (25°13′N 136°0′E)",
  },
  crew: [
    { astronautId: "astronaut_neil_armstrong", role: "Command Pilot" },
    { astronautId: "astronaut_david_scott", role: "Pilot" },
  ],
  highlights: [
    "First docking of two spacecraft in orbit — Gemini 8 docked with Agena Target Vehicle",
    "After docking, a stuck thruster caused uncontrolled roll; Armstrong used RCS to stabilize",
    "Demonstrated Armstrong's exceptional piloting skill under extreme pressure",
    "Mission aborted early due to emergency; splashed down safely in the Pacific",
  ],
  seoTitle: "Gemini 8 — First Space Docking & Armstrong's Emergency | Orbital Simulator Hub",
  seoDescription:
    "Learn about Gemini 8: the first orbital docking in history and the in-flight emergency that tested Neil Armstrong's piloting skills. Explore how this 1966 mission paved the way for Apollo.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const VOSTOK_1: Mission = {
  id: "mission_vostok_1",
  slug: "vostok-1",
  name: "Vostok 1",
  program: "Vostok",
  agency: "Soviet Space Program",
  type: "human_spaceflight",
  destinations: ["leo"],
  launch: {
    date: "1961-04-12T06:07:00Z",
    site: "Baikonur Cosmodrome, Site 1, Kazakhstan",
    vehicle: "Vostok-K 8K72K",
  },
  landing: {
    date: "1961-04-12T07:55:00Z",
    site: "Near Engels, Saratov Oblast, Russia (51°16′N 45°59′E)",
  },
  crew: [{ astronautId: "astronaut_yuri_gagarin", role: "Pilot" }],
  highlights: [
    "First human spaceflight in history — April 12, 1961",
    "Yuri Gagarin became the first human to orbit the Earth",
    "Single orbit of Earth in 108 minutes at maximum altitude of 327 km",
    "Gagarin famously exclaimed 'Poyekhali!' ('Let's go!') at liftoff",
    "The flight made Gagarin an international hero and intensified the Space Race",
  ],
  seoTitle: "Vostok 1 — Yuri Gagarin, First Human in Space | Orbital Simulator Hub",
  seoDescription:
    "Explore Vostok 1: Yuri Gagarin's historic flight on April 12, 1961 — the first human spaceflight. Learn about the mission, the spacecraft, and how this 108-minute flight changed the world.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const FREEDOM_7: Mission = {
  id: "mission_freedom_7",
  slug: "freedom-7",
  name: "Mercury-Redstone 3 (Freedom 7)",
  program: "Mercury",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["suborbital"],
  launch: {
    date: "1961-05-05T14:34:00Z",
    site: "Cape Canaveral, LC-5, Florida",
    vehicle: "Mercury-Redstone (MR-3)",
  },
  landing: {
    date: "1961-05-05T14:49:28Z",
    site: "Western Atlantic Ocean",
  },
  crew: [{ astronautId: "astronaut_alan_shepard", role: "Pilot" }],
  highlights: [
    "First American in space — May 5, 1961",
    "Alan Shepard's 15-minute suborbital flight reached 187.5 km altitude",
    "Less than a month after Gagarin's orbital flight",
    "Shepard famously radioed: 'Why don't you just fix your little problem and light this candle?'",
    "Restored American confidence in the Space Race",
  ],
  seoTitle: "Freedom 7 — Alan Shepard, First American in Space | Orbital Simulator Hub",
  seoDescription:
    "Explore Freedom 7: Alan Shepard's historic suborbital flight on May 5, 1961 — the first American in space. Learn about Mercury-Redstone 3 and the dawn of American crewed spaceflight.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const FRIENDSHIP_7: Mission = {
  id: "mission_friendship_7",
  slug: "friendship-7",
  name: "Mercury-Atlas 6 (Friendship 7)",
  program: "Mercury",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["leo"],
  launch: {
    date: "1962-02-20T14:47:39Z",
    site: "Cape Canaveral, LC-14, Florida",
    vehicle: "Atlas LV-3B (Atlas 109-D)",
  },
  landing: {
    date: "1962-02-20T19:43:02Z",
    site: "North Atlantic Ocean, near Grand Turk Island (21°26′N 68°41′W)",
  },
  crew: [{ astronautId: "astronaut_john_glenn", role: "Pilot" }],
  highlights: [
    "First American to orbit the Earth — three orbits in 4 hours 55 minutes 23 seconds",
    "John Glenn named his spacecraft 'Friendship 7'",
    "A potentially loose heat shield triggered a tense re-entry; retropack kept attached as precaution",
    "Glenn observed luminous 'fireflies' outside the spacecraft — later identified as frost particles",
    "Restored American confidence in the Space Race after Soviet orbital achievements",
  ],
  seoTitle: "Friendship 7 — John Glenn's First American Orbital Flight | Orbital Simulator Hub",
  seoDescription:
    "Discover Mercury-Atlas 6 Friendship 7: John Glenn's historic three-orbit flight on February 20, 1962. Learn about the first American to orbit Earth and the tense heat shield drama.",
  updatedAt: "2026-02-18T00:00:00Z",
};

// ──── SPACE SHUTTLE ────

const STS_1: Mission = {
  id: "mission_sts_1",
  slug: "sts-1",
  name: "STS-1",
  program: "Space Shuttle",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["leo"],
  launch: {
    date: "1981-04-12T12:00:03Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Space Shuttle Columbia (OV-102)",
  },
  landing: {
    date: "1981-04-14T18:20:57Z",
    site: "Edwards Air Force Base, Runway 23, California",
  },
  crew: [
    { astronautId: "astronaut_john_young", role: "Commander" },
    { astronautId: "astronaut_robert_crippen", role: "Pilot" },
  ],
  highlights: [
    "First flight of NASA's Space Shuttle program — a new era of reusable spacecraft",
    "Columbia was the first orbital spacecraft to return and land on a runway",
    "Launched exactly 20 years to the day after Gagarin's Vostok 1 flight (April 12)",
    "John Young's fifth spaceflight; Robert Crippen's first",
    "First crewed American space mission since Apollo-Soyuz Test Project in 1975",
    "37 orbits of Earth over 2 days 6 hours 20 minutes",
  ],
  seoTitle: "STS-1 — First Space Shuttle Flight | Orbital Simulator Hub",
  seoDescription:
    "Discover STS-1: the maiden voyage of Space Shuttle Columbia on April 12, 1981. Learn about John Young, Robert Crippen, and how the first reusable spacecraft changed space travel.",
  updatedAt: "2026-02-18T00:00:00Z",
};

const STS_7: Mission = {
  id: "mission_sts_7",
  slug: "sts-7",
  name: "STS-7",
  program: "Space Shuttle",
  agency: "NASA",
  type: "human_spaceflight",
  destinations: ["leo"],
  launch: {
    date: "1983-06-18T11:33:00Z",
    site: "Kennedy Space Center, LC-39A, Florida",
    vehicle: "Space Shuttle Challenger (OV-099)",
  },
  landing: {
    date: "1983-06-24T13:56:59Z",
    site: "Edwards Air Force Base, Runway 15, California",
  },
  crew: [
    { astronautId: "astronaut_robert_crippen", role: "Commander" },
    { astronautId: "astronaut_frederick_hauck", role: "Pilot" },
    { astronautId: "astronaut_sally_ride", role: "Mission Specialist" },
    { astronautId: "astronaut_john_fabian", role: "Mission Specialist" },
    { astronautId: "astronaut_norman_thagard", role: "Mission Specialist" },
  ],
  highlights: [
    "Sally Ride became the first American woman in space on June 18, 1983",
    "Ride was also the youngest American astronaut in space at age 32",
    "First five-person crew on an American spacecraft",
    "Deployed two communications satellites: Anik C-2 (Canada) and Palapa B-1 (Indonesia)",
    "First use of the Shuttle's robotic arm (Canadarm) to deploy and retrieve SPAS-01",
    "Sally Ride operated the Canadarm to deploy and retrieve the SPAS-01 free-flyer",
  ],
  seoTitle: "STS-7 — Sally Ride, First American Woman in Space | Orbital Simulator Hub",
  seoDescription:
    "Explore STS-7: Sally Ride's historic flight on Space Shuttle Challenger as the first American woman in space. Learn about the mission, Canadarm operations, and satellite deployments.",
  updatedAt: "2026-02-18T00:00:00Z",
};

// ──── EXPORTS ────

export const ALL_MISSIONS: Mission[] = [
  VOSTOK_1,
  FREEDOM_7,
  FRIENDSHIP_7,
  GEMINI_8,
  APOLLO_11,
  APOLLO_12,
  APOLLO_14,
  APOLLO_15,
  APOLLO_16,
  APOLLO_17,
  STS_1,
  STS_7,
];

export function getMissionBySlug(slug: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.slug === slug);
}
