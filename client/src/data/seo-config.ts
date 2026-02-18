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
    title: "Orbital Simulator Hub – Learn Space, Satellites & NASA Science | Interactive Simulator",
    description: "Learn orbital mechanics, satellites, aerospace engineering, AI in space, NASA missions, and real simulations. Interactive space simulator for students, engineers, and researchers.",
    keywords: "orbital mechanics for beginners, satellite orbit simulator, learn aerospace engineering, NASA study guide, how satellites work, space physics course, AI in space technology, astronomy for kids, space engineering course, NASA for students",
    ogTitle: "Orbital Simulator Hub – Learn Space, Satellites & NASA Science",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/aerospace": {
    path: "/learn/aerospace",
    title: "Aerospace & NASA Reference | Orbital Simulator Hub — For Students, Scientists & PhD Researchers",
    description: "Comprehensive aerospace reference: NASA missions, Newton's laws, orbital mechanics, algorithms, rovers, real-life calculations. Resources for students, scientists, and PhD researchers including textbooks, NTRS, SPICE, and Horizons.",
    keywords: "aerospace reference, NASA missions, Newton laws, orbital mechanics, PhD research, aerospace algorithms, NASA rovers, space calculations, aerospace textbooks, NTRS, SPICE, Horizons",
    ogTitle: "Aerospace & NASA Reference — PhD Research Resources",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/simulator": {
    path: "/simulator",
    title: "3D Satellite Orbit Simulator | LEO, MEO, GEO — Orbital Simulator Hub",
    description: "Interactive 3D satellite orbit simulator. Add LEO, MEO, GEO satellites and watch orbits in real-time. See height, speed, period, perigee, apogee. Compare multiple satellites side-by-side.",
    keywords: "satellite orbit simulator, 3D orbit simulator, LEO MEO GEO simulator, orbital mechanics simulator, satellite orbit calculator, space simulator",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/play": {
    path: "/play",
    title: "Play & Learn NASA – 3D Simulator, Solar System, Astronauts | Orbital Simulator Hub",
    description: "Play and learn: 3D orbit simulator, NASA missions, solar system, astronauts, rovers. Fun space learning for kids and students.",
    keywords: "NASA for kids, play and learn space, orbit simulator, solar system, space learning",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/formulas-library": {
    path: "/formulas-library",
    title: "Space Formulas – Gravity, Orbital Velocity, Kepler, Rocket Equation | Orbital Simulator Hub",
    description: "Space physics formulas: gravity, orbital velocity, escape velocity, Kepler's laws, rocket equation. With calculators for students and engineers.",
    keywords: "orbital mechanics formulas, gravity formula, escape velocity, Kepler laws, rocket equation, space physics",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/satellites": {
    path: "/satellites",
    title: "Real Satellite Orbits – ISS, Starlink, GPS, Weather | Orbital Simulator Hub",
    description: "Real satellite data: ISS, Starlink, GPS, weather satellites. Altitude, speed, orbit period. Learn how satellites work in practice.",
    keywords: "ISS orbit, Starlink satellites, GPS orbit, satellite altitude, real satellite data",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/calculators": {
    path: "/calculators",
    title: "Orbit Calculator – Gravity, Escape Velocity, NASA-Style | Orbital Simulator Hub",
    description: "Orbit and gravity calculators: orbital velocity, escape velocity, period. NASA-style calculations for students and engineers.",
    keywords: "orbit calculator, gravity calculator, escape velocity calculator, orbital velocity",
    lastUpdated: "2026-02-17T00:00:00Z",
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
    title: "Ask AstroBot – Space, Orbits, NASA, Satellites Q&A | Orbital Simulator Hub",
    description: "Ask AstroBot anything about space, orbital mechanics, NASA missions, satellites, and rockets. Free space Q&A for students and curious minds.",
    keywords: "space chatbot, NASA Q&A, orbital mechanics help, space questions answered",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/research": {
    path: "/research",
    title: "Space Research & PhD Resources – NASA, Algorithms, Real Data | Orbital Simulator Hub",
    description: "Research hub: NASA resources, orbital mechanics algorithms, real mission data. For students, PhD researchers, and space scientists.",
    keywords: "space research, NASA research, orbital mechanics research, PhD aerospace",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/careers": {
    path: "/careers",
    title: "Space Careers – NASA Engineer, Astronaut, Space Scientist | Orbital Simulator Hub",
    description: "How to become a NASA engineer, astronaut, or space scientist. Careers in aerospace, AI in space, and space industry.",
    keywords: "NASA careers, space careers, astronaut career, aerospace engineer, space scientist",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/orbital-mechanics": {
    path: "/learn/orbital-mechanics",
    title: "Orbital Mechanics for Beginners – Learn How Satellites Orbit | Orbital Simulator Hub",
    description: "Orbital mechanics for beginners: what is an orbit, LEO MEO GEO, gravity and velocity. For kids, students, and engineers. With 3D simulator.",
    keywords: "orbital mechanics for beginners, how satellites orbit, learn orbital mechanics, LEO MEO GEO",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/blog": {
    path: "/blog",
    title: "Space Blog | Daily NASA News, Space Facts, Satellite Tutorials — Orbital Simulator Hub",
    description: "Daily NASA news, space facts, satellite tutorials, and astronomy lessons. Fresh content about orbital mechanics, space physics, and how satellites work. Updated daily.",
    keywords: "space blog, NASA news, space facts, satellite tutorials, astronomy lessons, orbital mechanics blog, space physics blog",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/learn/nasa-study-guide": {
    path: "/learn/nasa-study-guide",
    title: "NASA Study Guide – Learn Space & Missions | Orbital Simulator Hub",
    description: "NASA study guide: missions, orbital mechanics, ISS, Mars rovers, GPS, AI in aerospace. For students and teachers. Free simulator and quiz.",
    keywords: "NASA study guide, NASA missions, space study guide, orbital mechanics study, NASA for students",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/how-satellites-work": {
    path: "/learn/how-satellites-work",
    title: "How Satellites Work – Complete Guide | Orbital Simulator Hub",
    description: "How satellites work: why they don't fall, LEO MEO GEO, communications, GPS, Starlink, ISS. Learn with our 3D satellite orbit simulator.",
    keywords: "how satellites work, satellite orbit, LEO MEO GEO, how GPS works, satellite communications",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/astronomy-for-kids": {
    path: "/learn/astronomy-for-kids",
    title: "Astronomy for Kids – Space Made Fun | Orbital Simulator Hub",
    description: "Astronomy for kids: Solar System, Moon, planets, astronauts. Fun space learning and 3D orbit simulator for kids and families.",
    keywords: "astronomy for kids, space for kids, solar system kids, NASA for kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/nasa-for-students": {
    path: "/learn/nasa-for-students",
    title: "NASA for Students – Resources & Learning | Orbital Simulator Hub",
    description: "NASA for students: free resources, orbital mechanics, AI in space, careers, internships. From high school to PhD.",
    keywords: "NASA for students, space for students, orbital mechanics students, NASA internships, space careers",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/space-news": {
    path: "/space-news",
    title: "Space News – Daily NASA, Missions & Astronomy | Orbital Simulator Hub",
    description: "Latest space news: NASA missions, Artemis, Mars rovers, James Webb, SpaceX. Daily space news for students, teachers, and space fans. Updated daily.",
    keywords: "space news, NASA news, space news today, astronomy news, space mission news, daily space news",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/nasa-for-kids": {
    path: "/learn/nasa-for-kids",
    title: "NASA for Kids – Space Learning Made Fun | Orbital Simulator Hub",
    description: "NASA for kids: astronauts, Moon, Mars rovers, Solar System. Free games, quizzes, and activities for kids and families. Learn space the fun way.",
    keywords: "NASA for kids, space for kids, NASA kids, astronomy for kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/ai-in-aerospace": {
    path: "/ai-in-aerospace",
    title: "AI in Aerospace – Satellites, Rovers, NASA & SpaceX | Orbital Simulator Hub",
    description: "How AI transforms aerospace: satellite navigation, autonomous spacecraft, Mars rovers, mission planning. NASA and SpaceX use AI for space exploration.",
    keywords: "AI in aerospace, AI in space, NASA AI, space AI, autonomous spacecraft, AI satellites, Mars rover AI",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/ai-in-space": {
    path: "/ai-in-space",
    title: "AI in Space – How AI Transforms Aerospace | Orbital Simulator Hub",
    description: "AI in space: satellite navigation, autonomous spacecraft, Mars rovers, mission planning. How NASA and SpaceX use artificial intelligence.",
    keywords: "AI in space, artificial intelligence space, NASA AI, space AI, autonomous spacecraft, AI satellites",
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
    description: "Free space quiz: orbital mechanics, satellites, NASA, astronomy. Test your knowledge and learn with our tutorials and 3D simulator.",
    keywords: "space quiz, space quiz for kids, orbital mechanics quiz, NASA quiz, astronomy quiz",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/astronauts": {
    path: "/astronauts",
    title: "Astronaut Explorer – All Astronauts, Moonwalkers, Apollo Missions | Orbital Simulator Hub",
    description: "Explore 500+ astronaut profiles. All 12 moonwalkers from Apollo 11–17. Biography, missions, EVA details, lunar samples, fun facts. Kids Mode and Research Mode for every astronaut.",
    keywords: "astronaut database, moonwalkers, Apollo astronauts, Neil Armstrong, Buzz Aldrin, astronaut profiles, NASA astronauts, who walked on the Moon, all astronauts list",
    ogTitle: "Astronaut Explorer — Every Astronaut Who Traveled to Space",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/planets": {
    path: "/planets",
    title: "Planet Study Hub – All 8 Planets with NASA Data | Orbital Simulator Hub",
    description: "Explore every planet in our solar system with real NASA/JPL data. Distance, gravity, temperature, atmosphere, missions. Interactive comparison, weight calculator, AI quiz. Kids, General, and Research modes.",
    keywords: "planet explorer, solar system planets, planet data NASA, Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune, planet comparison, planet gravity, planet distance from Sun",
    ogTitle: "Planet Study Hub — All 8 Planets + Moon + Pluto",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/missions": {
    path: "/missions",
    title: "NASA Missions – Apollo, Gemini, Mercury, Space Shuttle | Orbital Simulator Hub",
    description: "Complete database of NASA missions: Apollo 11–17 lunar landings, Gemini, Mercury, Space Shuttle. Crew details, launch data, surface operations, geology findings, samples returned.",
    keywords: "NASA missions, Apollo missions, Apollo 11, Moon landing missions, space missions history, Gemini missions, Mercury missions, Space Shuttle missions",
    ogTitle: "NASA Mission Database — Apollo, Gemini, Mercury, Shuttle",
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
    keywords: "space mission timeline, NASA timeline, Apollo timeline, space history, mission history, Sputnik to Artemis",
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
      keywords: `${name}, astronaut, NASA, space missions, astronaut biography, ${name} missions`,
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
      title: `${name} – Planet Facts, NASA Data, Distance, Gravity | Orbital Simulator Hub`,
      description: `Explore ${name} with real NASA/JPL data: distance from Sun, gravity, temperature, atmosphere, missions. Weight calculator, AI quiz, Kids Mode, Research Mode with orbital equations.`,
      keywords: `${name}, planet, NASA data, ${name} distance, ${name} gravity, ${name} temperature, ${name} moons, solar system`,
      ogTitle: `${name} — Planet Explorer with NASA Data`,
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
      description: `Complete ${name} mission details: crew, launch data, surface operations, landing site geology, samples returned, highlights. Explore NASA's ${name} mission.`,
      keywords: `${name}, NASA mission, ${name} crew, ${name} mission details, space mission, Apollo mission`,
      ogTitle: `${name} — NASA Mission Details`,
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
      description: `Read about ${name.toLowerCase()} on the Orbital Simulator Hub space blog. Daily NASA news, space facts, and satellite tutorials.`,
      keywords: `space blog, NASA news, ${slug.replace(/-/g, ", ")}`,
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
