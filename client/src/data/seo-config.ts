/**
 * SEO Configuration for Pages
 * This file stores SEO meta tags for each page
 * Can be updated via API for n8n automation
 */

export interface SEOConfig {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  lastUpdated: string; // ISO date string
}

export const SEO_CONFIGS: Record<string, SEOConfig> = {
  "/": {
    path: "/",
    title: "Orbital Mechanics Simulator – Free 3D Satellite Orbit Simulator | Orbital Simulator Hub",
    description: "Orbital mechanics simulator: free 3D satellite orbit simulator. Add LEO, MEO, GEO. ISS speed, astronauts, space news. Orbital velocity calculator. Free for students.",
    keywords: "orbital mechanics simulator, free satellite orbit simulator, 3D orbit simulator, space news, ISS, astronauts, Mars rover, SpaceX, orbital mechanics for beginners, how satellites work, LEO MEO GEO, space study guide, astronomy for kids, space quiz, space careers, orbital velocity calculator, space physics, AI in space, James Webb, Artemis",
    ogTitle: "Orbital Simulator Hub – Free 3D Orbit Simulator & Space Education",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/welcome": {
    path: "/welcome",
    title: "Welcome | Community Hub | Orbital Simulator Hub",
    description: "Welcome to Orbital Simulator Hub community. Explore the 3D simulator, Ask AstroBot, space blog, research hub, astronaut database, and planet explorer.",
    keywords: "space community, orbital simulator hub, space learning, simulator, AstroBot, space blog, research hub",
    ogTitle: "Welcome | Orbital Simulator Hub Community",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/learn/aerospace": {
    path: "/learn/aerospace",
    title: "Aerospace Reference | Orbital Simulator Hub — For Students, Scientists & PhD Researchers",
    description: "Comprehensive aerospace reference: space missions, Newton's laws, orbital mechanics, algorithms, rovers, real-life calculations. Resources for students, scientists, and PhD researchers including textbooks, NTRS, SPICE, and Horizons.",
    keywords: "aerospace reference, space missions, Newton laws, orbital mechanics, PhD research, aerospace algorithms, space rovers, space calculations, aerospace textbooks, NTRS, SPICE, Horizons",
    ogTitle: "Aerospace Reference — PhD Research Resources",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/simulator": {
    path: "/simulator",
    title: "Free 3D Satellite Orbit Simulator | LEO, MEO, GEO — Orbital Simulator Hub",
    description: "Free 3D satellite orbit simulator. Add LEO, MEO, GEO satellites and watch orbits in real-time. ISS, Starlink, GPS orbits. Height, speed, period. No download. Best free orbit simulator online.",
    keywords: "satellite orbit simulator, 3D orbit simulator, free orbit simulator, LEO MEO GEO simulator, orbital mechanics simulator, satellite orbit calculator, space simulator, ISS orbit simulator, best orbit simulator online, orbital mechanics simulator free",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/play": {
    path: "/play",
    title: "Play & Learn Space – 3D Simulator, Solar System, Astronauts | Orbital Simulator Hub",
    description: "Play and learn: 3D orbit simulator, space missions, solar system, astronauts, rovers. Fun space learning for kids and students.",
    keywords: "space for kids, play and learn space, orbit simulator, solar system, space learning",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/formulas-library": {
    path: "/formulas-library",
    title: "Orbital Mechanics Formulas – Gravity, Orbital Velocity, Kepler, Rocket Equation",
    description: "Space formulas: orbital velocity v=√(μ/r), escape velocity, Kepler's laws, rocket equation. Orbital period formula. Free calculators. For students and engineers.",
    keywords: "orbital mechanics formulas, gravity formula, escape velocity formula, Kepler laws, rocket equation, orbital velocity formula, orbital period formula, space physics formulas",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/satellites": {
    path: "/satellites",
    title: "ISS, Starlink, GPS Orbit Data | Real Satellite Orbits – Orbital Simulator Hub",
    description: "Real satellite orbits: ISS speed 7.66 km/s, Starlink LEO, GPS MEO. Altitude, period, orbital velocity. How fast does ISS orbit? Free satellite data.",
    keywords: "ISS orbit, ISS speed, Starlink satellites, GPS orbit, satellite altitude, real satellite data, how fast does ISS orbit, satellite orbital period",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/calculators": {
    path: "/calculators",
    title: "How Fast Does the ISS Orbit? – 7.66 km/s | Orbit Calculator",
    description: "How fast does the ISS orbit? 7.66 km/s (27,600 km/h) at 408 km. Orbital period 92 min. Free orbit calculator for any altitude. Orbital velocity, escape velocity.",
    keywords: "orbit calculator, orbital velocity calculator, gravity calculator, escape velocity calculator, how fast does ISS orbit, ISS orbital speed, period calculator, orbital period formula",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/guide": {
    path: "/guide",
    title: "Space & Orbital Mechanics Guide for Beginners | Orbital Simulator Hub",
    description: "Beginner guide to space and orbital mechanics. Learn how satellites orbit, what is LEO, and explore the simulator step by step.",
    keywords: "orbital mechanics guide, space guide for beginners, how to use orbit simulator",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/astrobot": {
    path: "/astrobot",
    title: "Ask AstroBot – Space, Orbits, Satellites Q&A | Orbital Simulator Hub",
    description: "Ask AstroBot anything about space, orbital mechanics, space missions, satellites, and rockets. Free space Q&A for students and curious minds.",
    keywords: "space chatbot, space Q&A, orbital mechanics help, space questions answered",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/research": {
    path: "/research",
    title: "Space Research & PhD Resources – Algorithms, Real Data | Orbital Simulator Hub",
    description: "Research hub: space agency resources, orbital mechanics algorithms, real mission data. For students, PhD researchers, and space scientists.",
    keywords: "space research, orbital mechanics research, PhD aerospace",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/research/future-civilization": {
    path: "/research/future-civilization",
    title: "Future of Space Civilization – From Earth to Interstellar | Orbital Simulator Hub",
    description: "Vision for humanity's space future: lunar presence, Mars, solar system economy, interstellar. Phases of space civilization. Global Space Research Hub.",
    keywords: "future space civilization, space future, interstellar, Mars colonization, lunar base, space habitat",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/research/next-100-years": {
    path: "/research/next-100-years",
    title: "Next 100 Years of Humanity – Space Roadmap 2025–2125 | Orbital Simulator Hub",
    description: "Strategic roadmap for space exploration: Moon, Mars, solar system, interstellar. Decade-by-decade vision. Based on publicly available space agency research.",
    keywords: "next 100 years space, space roadmap, Mars 2030s, interstellar 2100, space future",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/research/neuro-space": {
    path: "/research/neuro-space",
    title: "Light-Speed Constraints, Neuro-Space Cognition & Aerospace Dynamics | Orbital Simulator Hub Research",
    description: "Unified framework for future space navigation: relativistic aerospace, signal delay, neuro-space AI, autonomous spacecraft. OrbitalSimulatorHub Research Division.",
    keywords: "neuro-space, light-speed constraints, autonomous spacecraft, aerospace AI, deep space navigation, relativistic aerospace, quantum space communication",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/careers": {
    path: "/careers",
    title: "Space Careers – How to Become Astronaut, Aerospace Engineer | Free Guide",
    description: "Space careers: how to become astronaut, aerospace engineer, space scientist. NASA, SpaceX, space industry jobs. Salary, requirements, internships.",
    keywords: "space careers, how to become astronaut, aerospace engineer career, space scientist, NASA careers, SpaceX jobs, space industry, astronaut requirements",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/learn/orbital-mechanics": {
    path: "/learn/orbital-mechanics",
    title: "Orbital Mechanics for Beginners – Kepler, Gravity, LEO MEO GEO | Free Guide",
    description: "Orbital mechanics for beginners: Kepler's laws, gravity, LEO MEO GEO. How satellites orbit. For kids, students, engineers. Free 3D orbit simulator.",
    keywords: "orbital mechanics for beginners, orbital mechanics, Kepler laws, how satellites orbit, LEO MEO GEO, orbital velocity, gravity, learn orbital mechanics free",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/blog": {
    path: "/blog",
    title: "Space Blog | Daily Space News, Space Facts, Satellite Tutorials — Orbital Simulator Hub",
    description: "Daily space news, space facts, satellite tutorials, and astronomy lessons. Fresh content about orbital mechanics, space physics, and how satellites work. Updated daily.",
    keywords: "space blog, space news, space facts, satellite tutorials, astronomy lessons, orbital mechanics blog, space physics blog",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/learn/nasa-study-guide": {
    path: "/learn/nasa-study-guide",
    title: "Space Study Guide – Learn Space & Missions | Orbital Simulator Hub",
    description: "Space study guide: missions, orbital mechanics, ISS, Mars rovers, GPS, AI in aerospace. For students and teachers. Free simulator and quiz.",
    keywords: "space study guide, space missions, orbital mechanics study, space for students",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/how-satellites-work": {
    path: "/learn/how-satellites-work",
    title: "How Satellites Work – LEO vs MEO vs GEO | Why Don't Satellites Fall?",
    description: "How satellites work: why they don't fall, LEO MEO GEO explained, ISS, Starlink, GPS. Orbital velocity, gravity. Free 3D orbit simulator.",
    keywords: "how satellites work, why dont satellites fall, LEO MEO GEO, satellite orbit, how GPS works, Starlink orbit, ISS orbit, satellite communications",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/astronomy-for-kids": {
    path: "/learn/astronomy-for-kids",
    title: "Astronomy for Kids – Space Made Fun | Orbital Simulator Hub",
    description: "Astronomy for kids: Solar System, Moon, planets, astronauts. Fun space learning and 3D orbit simulator for kids and families.",
    keywords: "astronomy for kids, space for kids, solar system kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/nasa-for-students": {
    path: "/learn/nasa-for-students",
    title: "Space for Students – Resources & Learning | Orbital Simulator Hub",
    description: "Space for students: free resources, orbital mechanics, AI in space, careers, internships. From high school to PhD.",
    keywords: "space for students, orbital mechanics students, space internships, space careers",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/space-news": {
    path: "/space-news",
    title: "Space News Today – Artemis, ISS, Mars, SpaceX | Daily Space News",
    description: "Space news today: Artemis mission, ISS crew, Mars Perseverance, James Webb, SpaceX Starlink. Daily space news. Free for students and space fans.",
    keywords: "space news, space news today, astronomy news, Artemis, ISS, Mars rover, James Webb, SpaceX, space mission news, daily space news",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/learn/nasa-for-kids": {
    path: "/learn/nasa-for-kids",
    title: "Space for Kids – Space Learning Made Fun | Orbital Simulator Hub",
    description: "Space for kids: astronauts, Moon, Mars rovers, Solar System. Free games, quizzes, and activities for kids and families. Learn space the fun way.",
    keywords: "space for kids, astronomy for kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/ai-in-aerospace": {
    path: "/ai-in-aerospace",
    title: "AI in Aerospace – Satellites, Rovers & SpaceX | Orbital Simulator Hub",
    description: "How AI transforms aerospace: satellite navigation, autonomous spacecraft, Mars rovers, mission planning. Space agencies and SpaceX use AI for space exploration.",
    keywords: "AI in aerospace, AI in space, space AI, autonomous spacecraft, AI satellites, Mars rover AI",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/ai-in-space": {
    path: "/ai-in-space",
    title: "AI in Space – How AI Transforms Aerospace | Orbital Simulator Hub",
    description: "AI in space: satellite navigation, autonomous spacecraft, Mars rovers, mission planning. How space agencies and SpaceX use artificial intelligence.",
    keywords: "AI in space, artificial intelligence space, space AI, autonomous spacecraft, AI satellites",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/satellite-tutorial": {
    path: "/learn/satellite-tutorial",
    title: "Satellite Tutorial – Learn How Satellites Work | Orbital Simulator Hub",
    description: "Free satellite tutorials: how satellites work, GPS, ISS, Starlink, orbital mechanics. Step-by-step guides for students and space fans.",
    keywords: "satellite tutorial, how satellites work, satellite tutorials, learn satellites, GPS tutorial, orbital mechanics tutorial",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/space-quiz": {
    path: "/space-quiz",
    title: "Space Quiz – Test Your Space Knowledge | Orbital Simulator Hub",
    description: "Free space quiz: orbital mechanics, satellites, astronomy. Test your knowledge and learn with our tutorials and 3D simulator.",
    keywords: "space quiz, space quiz for kids, orbital mechanics quiz, astronomy quiz",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/astronauts": {
    path: "/astronauts",
    title: "Astronaut Database – 500+ Profiles | How Many Astronauts Walked on Moon?",
    description: "Astronaut database: 500+ profiles. All 12 moonwalkers – Neil Armstrong, Buzz Aldrin, Pete Conrad. Apollo 11 astronauts. ISS crew. Free space education.",
    keywords: "astronaut database, astronauts, how many astronauts walked on moon, Neil Armstrong, Buzz Aldrin, Apollo 11 astronauts, 12 moonwalkers, ISS astronauts, space missions",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/planets": {
    path: "/planets",
    title: "Planet Study Hub – All 8 Planets with Real Mission Data | Orbital Simulator Hub",
    description: "Explore every planet in our solar system with real mission data. Distance, gravity, temperature, atmosphere, missions. Interactive comparison, weight calculator, AI quiz. Kids, General, and Research modes.",
    keywords: "planet explorer, solar system planets, planet data, Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune, planet comparison, planet gravity, planet distance from Sun",
    ogTitle: "Planet Study Hub — All 8 Planets + Moon + Pluto",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/missions": {
    path: "/missions",
    title: "Space Missions – Apollo, Gemini, Mercury, Space Shuttle | Orbital Simulator Hub",
    description: "Complete database of space missions: Apollo 11–17 lunar landings, Gemini, Mercury, Space Shuttle. Crew details, launch data, surface operations, geology findings, samples returned.",
    keywords: "space missions, Apollo missions, Apollo 11, Moon landing missions, space missions history, Gemini missions, Mercury missions, Space Shuttle missions",
    ogTitle: "Space Mission Database — Apollo, Gemini, Mercury, Shuttle",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/artifacts": {
    path: "/artifacts",
    title: "What Humans Brought Back From Space – Moon Rocks, Asteroid Samples | Orbital Simulator Hub",
    description: "381.7 kg of lunar samples from Apollo missions. Asteroid samples from Hayabusa2 and OSIRIS-REx. Comet dust from Stardust. Explore what astronauts brought back from space and why it matters for science.",
    keywords: "lunar samples, Moon rocks, Apollo samples, what astronauts brought back, Hayabusa2 samples, OSIRIS-REx Bennu, Stardust comet, space samples, lunar geology",
    ogTitle: "What Humans Brought Back From Space — Moon Rocks & Beyond",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/lunar-geology": {
    path: "/learn/lunar-geology",
    title: "Lunar Geology & Fra Mauro Formation – Apollo Landing Sites | Orbital Simulator Hub",
    description: "Complete guide to lunar geology: Fra Mauro formation, all 6 Apollo landing site geologies, rock types (basalt, breccia, anorthosite), geological timeline. The Fra Mauro formation is Imbrium Basin ejecta ~3.85 Ga. Kids, General, and Research modes.",
    keywords: "Fra Mauro formation, lunar geology, Apollo landing sites, Moon geology, Imbrium Basin, lunar breccia, anorthosite, KREEP, Moon rocks, lunar geological timeline, Apollo 14 geology",
    ogTitle: "Lunar Geology & Fra Mauro Formation — Apollo Landing Sites",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/how-solar-system-works": {
    path: "/learn/how-solar-system-works",
    title: "How the Solar System Works – Planets, Orbits, Gravity | Orbital Simulator Hub",
    description: "Learn how the solar system works: planet orbits, gravity, Kepler's laws, tidal forces. Interactive guide for students and space fans.",
    keywords: "how solar system works, planet orbits, solar system gravity, Kepler laws, solar system for students",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/astrophysics": {
    path: "/learn/astrophysics",
    title: "Astrophysics – Stars, Galaxies, Black Holes, Cosmology | Orbital Simulator Hub",
    description: "Learn astrophysics: stars, galaxies, black holes, dark matter, cosmology. From stellar evolution to the expanding universe. For students and researchers.",
    keywords: "astrophysics, stars, galaxies, black holes, dark matter, cosmology, stellar evolution, space physics",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/quantum-physics": {
    path: "/learn/quantum-physics",
    title: "Quantum Physics for Space – Wave-Particle Duality, Entanglement | Orbital Simulator Hub",
    description: "Quantum physics concepts relevant to space: wave-particle duality, quantum entanglement, tunneling. How quantum effects impact GPS, atomic clocks, and satellite navigation.",
    keywords: "quantum physics, quantum mechanics, wave-particle duality, quantum entanglement, quantum space, quantum GPS",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/aerodynamics": {
    path: "/learn/aerodynamics",
    title: "Aerodynamics – Lift, Drag, Bernoulli's Principle, Rocket Design | Orbital Simulator Hub",
    description: "Learn aerodynamics: lift, drag, Bernoulli's principle, rocket design, re-entry physics. From aircraft to spacecraft aerodynamics.",
    keywords: "aerodynamics, lift and drag, Bernoulli principle, rocket aerodynamics, re-entry physics, spacecraft design",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/compare/orbits": {
    path: "/compare/orbits",
    title: "Compare Orbits – LEO vs MEO vs GEO Side by Side | Orbital Simulator Hub",
    description: "Compare satellite orbits side by side: LEO, MEO, GEO. See altitude, speed, period differences. Interactive comparison for students and engineers.",
    keywords: "compare orbits, LEO vs MEO vs GEO, orbit comparison, satellite orbit types, orbit altitude comparison",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/missions/timeline": {
    path: "/missions/timeline",
    title: "Space Mission Timeline – From Sputnik to Artemis | Orbital Simulator Hub",
    description: "Complete timeline of space missions from Sputnik (1957) to Artemis. Apollo, Gemini, Shuttle, ISS, Mars rovers, and future missions. Interactive timeline.",
    keywords: "space mission timeline, Apollo timeline, space history, mission history, Sputnik to Artemis",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
};

export function getSEOConfig(path: string): SEOConfig | null {
  const cleanPath = path.split('#')[0];
  if (SEO_CONFIGS[cleanPath]) return SEO_CONFIGS[cleanPath];

  const astronautMatch = cleanPath.match(/^\/astronauts\/(.+)$/);
  if (astronautMatch) {
    const slug = astronautMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} – Astronaut Profile, Missions & Biography | Orbital Simulator Hub`,
      description: `Explore ${name}'s complete astronaut profile: biography, space missions, EVA details, Moon experience, fun facts. Kids Mode and Research Mode available. Orbital Simulator Hub astronaut database.`,
      keywords: `${name}, astronaut, space missions, astronaut biography, ${name} missions`,
      ogTitle: `${name} — Astronaut Profile & Missions`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const planetMatch = cleanPath.match(/^\/planets\/(.+)$/);
  if (planetMatch) {
    const slug = planetMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} – Planet Facts, Distance, Gravity | Orbital Simulator Hub`,
      description: `Explore ${name} with real mission data: distance from Sun, gravity, temperature, atmosphere, missions. Weight calculator, AI quiz, Kids Mode, Research Mode with orbital equations.`,
      keywords: `${name}, planet, ${name} distance, ${name} gravity, ${name} temperature, ${name} moons, solar system`,
      ogTitle: `${name} — Planet Explorer`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const missionMatch = cleanPath.match(/^\/missions\/(.+)$/);
  if (missionMatch) {
    const slug = missionMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} Mission – Crew, Timeline, Samples, Geology | Orbital Simulator Hub`,
      description: `Complete ${name} mission details: crew, launch data, surface operations, landing site geology, samples returned, highlights. Explore the ${name} mission.`,
      keywords: `${name}, space mission, ${name} crew, ${name} mission details, Apollo mission`,
      ogTitle: `${name} — Mission Details`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const blogMatch = cleanPath.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} | Space Blog – Orbital Simulator Hub`,
      description: `Read about ${name.toLowerCase()} on the Orbital Simulator Hub space blog. Daily space news, space facts, and satellite tutorials.`,
      keywords: `space blog, space news, ${slug.replace(/-/g, ", ")}`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  return null;
}

export function updateSEOConfig(path: string, config: Partial<SEOConfig>): void {
  const cleanPath = path.split('#')[0];
  if (SEO_CONFIGS[cleanPath]) {
    SEO_CONFIGS[cleanPath] = {
      ...SEO_CONFIGS[cleanPath],
      ...config,
      lastUpdated: new Date().toISOString(),
    };
  } else {
    SEO_CONFIGS[cleanPath] = {
      path: cleanPath,
      title: config.title || "",
      description: config.description || "",
      keywords: config.keywords || "",
      ogTitle: config.ogTitle,
      ogDescription: config.ogDescription,
      lastUpdated: new Date().toISOString(),
    };
  }
}
