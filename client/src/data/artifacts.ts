/**
 * Artifacts — what humans and robots brought back from space.
 * Lunar samples, asteroid material, comet dust, and equipment.
 */

export interface Artifact {
  id: string;
  slug: string;
  label: string;
  category: "sample" | "equipment";
  originBody: string;
  missionId: string;
  massKg: number;
  types: string[];
  whyItMatters: string[];
  scientificFindings: string[];
  whereStored: string;
  seoTitle: string;
  seoDescription: string;
}

// ──── APOLLO LUNAR SAMPLES ────

const APOLLO_11_SAMPLES: Artifact = {
  id: "artifact_apollo_11_samples",
  slug: "apollo-11-lunar-samples",
  label: "Apollo 11 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_11",
  massKg: 21.6,
  types: ["lunar rock", "regolith", "basalt", "breccia", "core tubes"],
  whyItMatters: [
    "First samples ever returned from another celestial body",
    "Proved the Moon formed from the same material as Earth's mantle",
    "Established that the Moon has a differentiated structure",
    "Provided the first direct evidence of lunar volcanic activity",
  ],
  scientificFindings: [
    "Mare Tranquillitatis basalts are 3.6–3.9 billion years old",
    "Lunar soil contains micrometeorite impact glass and solar wind particles",
    "No water detected in initial analyses (later missions found trace amounts)",
    "Laser ranging retroreflector still in use for precise Earth-Moon distance measurements",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 11 Lunar Samples — Sea of Tranquility | Orbital Simulator Hub",
  seoDescription:
    "Explore the 21.6 kg of lunar rock and regolith returned by Apollo 11 from the Sea of Tranquility. First samples from another world.",
};

const APOLLO_12_SAMPLES: Artifact = {
  id: "artifact_apollo_12_samples",
  slug: "apollo-12-lunar-samples",
  label: "Apollo 12 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_12",
  massKg: 34.3,
  types: ["lunar rock", "regolith", "basalt", "breccia", "Surveyor 3 parts"],
  whyItMatters: [
    "First precision landing enabled targeted sample collection",
    "Retrieved parts from Surveyor 3 probe — studied long-duration space exposure",
    "Ocean of Storms samples differ from Sea of Tranquility, revealing lunar diversity",
    "First full ALSEP deployment provided ongoing seismic and solar wind data",
  ],
  scientificFindings: [
    "Oceanus Procellarum basalts are younger than Mare Tranquillitatis (3.2–3.3 Ga)",
    "Surveyor 3 camera showed Streptococcus mitis bacteria survival (later disputed as contamination)",
    "Subsurface core samples revealed layered regolith structure",
    "Solar wind composition measured directly from implanted particles",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 12 Lunar Samples — Ocean of Storms & Surveyor 3 | Orbital Simulator Hub",
  seoDescription:
    "Discover the 34.3 kg of lunar samples from Apollo 12, including parts from the Surveyor 3 probe. Ocean of Storms geology and space exposure studies.",
};

const APOLLO_14_SAMPLES: Artifact = {
  id: "artifact_apollo_14_samples",
  slug: "apollo-14-lunar-samples",
  label: "Apollo 14 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_14",
  massKg: 42.3,
  types: ["lunar rock", "regolith", "breccia", "highland material", "Big Bertha"],
  whyItMatters: [
    "First samples from the lunar highlands (Fra Mauro formation)",
    "Targeted the Imbrium basin ejecta — key to dating the Moon's largest impact",
    "Big Bertha breccia contained a possible Earth-origin fragment (~4 Ga)",
    "Completed science objectives originally planned for Apollo 13",
  ],
  scientificFindings: [
    "Fra Mauro breccias constrain Imbrium impact to ~3.85 billion years ago",
    "Big Bertha (sample 14321) may contain material blasted from Earth by early impacts",
    "Highland material is predominantly anorthositic — supports magma ocean hypothesis",
    "Cone Crater rim approach provided stratigraphic context for samples",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 14 Lunar Samples — Fra Mauro Formation | Orbital Simulator Hub",
  seoDescription:
    "Explore the 42.3 kg of lunar samples from Apollo 14's Fra Mauro landing site. Highland breccias, Big Bertha, and Imbrium basin dating.",
};

const APOLLO_15_SAMPLES: Artifact = {
  id: "artifact_apollo_15_samples",
  slug: "apollo-15-lunar-samples",
  label: "Apollo 15 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_15",
  massKg: 77,
  types: ["lunar rock", "regolith", "anorthosite", "Genesis Rock", "green glass", "Hadley Rille samples"],
  whyItMatters: [
    "Genesis Rock (15415) — 4.1-billion-year-old anorthosite from the primordial lunar crust",
    "First mission to use the Lunar Roving Vehicle — extended exploration range",
    "Hadley Rille samples revealed volcanic vs. impact origin debate",
    "Green glass beads provided evidence of deep lunar mantle composition",
  ],
  scientificFindings: [
    "Genesis Rock dated to ~4.1 Ga — evidence for lunar magma ocean crystallization",
    "Hadley-Apennine site combines mare basalts and highland material",
    "KREEP (potassium, rare-earth, phosphorus) enrichment in some samples",
    "Lunar crust formation models refined by anorthosite chemistry",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 15 Lunar Samples — Genesis Rock & Hadley-Apennine | Orbital Simulator Hub",
  seoDescription:
    "Discover the 77 kg of Apollo 15 lunar samples including the Genesis Rock. Hadley-Apennine geology and early lunar crust formation.",
};

const APOLLO_16_SAMPLES: Artifact = {
  id: "artifact_apollo_16_samples",
  slug: "apollo-16-lunar-samples",
  label: "Apollo 16 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_16",
  massKg: 95.8,
  types: ["lunar rock", "regolith", "breccia", "highland material", "Big Muley"],
  whyItMatters: [
    "Only Apollo mission to land in the lunar highlands",
    "Disproved volcanic origin hypothesis — Descartes was impact-formed",
    "Big Muley — largest single Moon rock ever collected (11.7 kg)",
    "First astronomical observations from the lunar surface (UV spectrograph)",
  ],
  scientificFindings: [
    "Descartes Highlands are impact breccias, not volcanic — revised lunar geological models",
    "Highland samples are predominantly ferroan anorthosite",
    "Cayley Formation and Descartes Formation both impact-related",
    "Deep core samples revealed regolith stratigraphy and gardening history",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 16 Lunar Samples — Descartes Highlands & Big Muley | Orbital Simulator Hub",
  seoDescription:
    "Explore the 95.8 kg of Apollo 16 samples from the Descartes Highlands. Big Muley, impact breccias, and highland geology.",
};

const APOLLO_17_SAMPLES: Artifact = {
  id: "artifact_apollo_17_samples",
  slug: "apollo-17-lunar-samples",
  label: "Apollo 17 Lunar Samples",
  category: "sample",
  originBody: "Moon",
  missionId: "mission_apollo_17",
  massKg: 110.5,
  types: ["lunar rock", "regolith", "orange soil", "volcanic glass", "breccia", "highland material"],
  whyItMatters: [
    "Largest sample return of any Apollo mission",
    "Orange soil (74220) — volcanic glass beads from 3.7-billion-year-old fire fountains",
    "Orange soil contained water — 100× more than previous estimates, challenging 'dry Moon' theory",
    "Only mission with a professional geologist (Harrison Schmitt) on the surface",
  ],
  scientificFindings: [
    "Orange soil beads are titanium-rich volcanic glass from pyroclastic eruptions",
    "Volatile elements (zinc, lead, chlorine) in glass indicate volatile-rich lunar interior",
    "Taurus-Littrow combines old highland and young volcanic deposits",
    "Lunar water discovery reshaped understanding of Moon formation and resource potential",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Apollo 17 Lunar Samples — Orange Soil & Taurus-Littrow | Orbital Simulator Hub",
  seoDescription:
    "Discover the 110.5 kg of Apollo 17 samples including the famous orange soil. Taurus-Littrow geology and lunar water discovery.",
};

// ──── ASTEROID SAMPLE RETURNS ────

const HAYABUSA2_SAMPLES: Artifact = {
  id: "artifact_hayabusa2_samples",
  slug: "hayabusa2-ryugu-samples",
  label: "Hayabusa2 Ryugu Samples",
  category: "sample",
  originBody: "Ryugu",
  missionId: "hayabusa2",
  massKg: 0.0054,
  types: ["asteroid regolith", "carbonaceous material", "organic-rich particles", "hydrous minerals"],
  whyItMatters: [
    "First substantial sample return from a C-type (carbonaceous) asteroid",
    "C-type asteroids are thought to be building blocks of planets and may have delivered water/organics to early Earth",
    "Ryugu is a rubble-pile asteroid — samples reveal formation and evolution of such bodies",
    "JAXA mission demonstrating international capability in sample return",
  ],
  scientificFindings: [
    "Samples are organic-rich with 48% showing carbonate/organic 3.4 μm absorption",
    "Ubiquitous hydrous minerals; bulk density ~1,282 kg/m³ indicates high microporosity",
    "Similarity to CI chondrites — primitive solar system material",
    "Rounded and rough-surfaced particles from millimeter to submillimeter scale",
  ],
  whereStored: "JAXA Sagamihara Campus, Japan; portions shared with NASA and international researchers",
  seoTitle: "Hayabusa2 Ryugu Samples — Asteroid Sample Return | Orbital Simulator Hub",
  seoDescription:
    "Explore the 5.4 grams of material from asteroid Ryugu returned by JAXA's Hayabusa2 in 2020. Organic-rich carbonaceous asteroid samples.",
};

const OSIRIS_REX_SAMPLES: Artifact = {
  id: "artifact_osiris_rex_samples",
  slug: "osiris-rex-bennu-samples",
  label: "OSIRIS-REx Bennu Samples",
  category: "sample",
  originBody: "Bennu",
  missionId: "osiris-rex",
  massKg: 0.1216,
  types: ["asteroid regolith", "carbonaceous material", "organic compounds", "hydrated minerals"],
  whyItMatters: [
    "Largest asteroid sample ever returned — 121.6 grams from Bennu",
    "Bennu is a potentially hazardous asteroid and a B-type (carbonaceous) body",
    "Samples may reveal origins of water and organics on Earth",
    "Mission demonstrated precision touch-and-go sampling technique",
  ],
  scientificFindings: [
    "Early analysis confirms carbon-rich composition with organic molecules",
    "High magnesium-sodium phosphate suggests aqueous alteration on parent body",
    "Samples will be studied for decades; 75% preserved for future generations",
    "Bennu's surface is darker and more porous than expected from remote sensing",
  ],
  whereStored: "NASA Johnson Space Center, Houston, Texas; portions to international partners",
  seoTitle: "OSIRIS-REx Bennu Samples — NASA Asteroid Sample Return 2023 | Orbital Simulator Hub",
  seoDescription:
    "Discover the 121.6 grams of material from asteroid Bennu returned by NASA's OSIRIS-REx in 2023. Carbon-rich asteroid samples and early solar system secrets.",
};

// ──── COMET SAMPLE RETURN ────

const STARDUST_SAMPLES: Artifact = {
  id: "artifact_stardust_samples",
  slug: "stardust-wild-2-samples",
  label: "Stardust Comet Wild 2 Samples",
  category: "sample",
  originBody: "Wild 2",
  missionId: "stardust",
  massKg: 0.000001, // ~1 mg of comet dust; exact mass varies by estimate
  types: ["comet dust", "silicate grains", "crystalline material", "interstellar dust"],
  whyItMatters: [
    "First samples returned from a comet — NASA Stardust mission 2006",
    "Comets preserve primitive solar system material from 4.6 billion years ago",
    "Unexpected finding: crystalline silicates from inner solar system in comet",
    "Also captured interstellar dust particles — material from outside our solar system",
  ],
  scientificFindings: [
    "Comet Wild 2 contains crystalline olivine and pyroxene — formed in inner solar system",
    "Challenged 'pure comet' model — comets are aggregates of material from different regions",
    "Amino acid glycine detected in comet samples",
    "Interstellar dust particles differ in composition from cometary material",
  ],
  whereStored: "NASA Johnson Space Center Lunar Sample Laboratory, Houston, Texas",
  seoTitle: "Stardust Comet Wild 2 Samples — First Comet Sample Return | Orbital Simulator Hub",
  seoDescription:
    "Explore the comet dust returned by NASA's Stardust mission from Comet Wild 2 in 2006. First comet samples and interstellar dust.",
};

// ──── EXPORTS ────

export const ALL_ARTIFACTS: Artifact[] = [
  APOLLO_11_SAMPLES,
  APOLLO_12_SAMPLES,
  APOLLO_14_SAMPLES,
  APOLLO_15_SAMPLES,
  APOLLO_16_SAMPLES,
  APOLLO_17_SAMPLES,
  HAYABUSA2_SAMPLES,
  OSIRIS_REX_SAMPLES,
  STARDUST_SAMPLES,
];

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return ALL_ARTIFACTS.find((a) => a.slug === slug);
}

export function getArtifactsByOrigin(origin: string): Artifact[] {
  return ALL_ARTIFACTS.filter(
    (a) => a.originBody.toLowerCase() === origin.toLowerCase()
  );
}

export function getTotalLunarSampleMass(): number {
  return ALL_ARTIFACTS.filter((a) => a.originBody === "Moon").reduce(
    (sum, a) => sum + a.massKg,
    0
  );
}
