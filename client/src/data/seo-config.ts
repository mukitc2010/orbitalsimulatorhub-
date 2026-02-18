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
};

export function getSEOConfig(path: string): SEOConfig | null {
  // Remove hash fragments for matching
  const cleanPath = path.split('#')[0];
  return SEO_CONFIGS[cleanPath] || null;
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
