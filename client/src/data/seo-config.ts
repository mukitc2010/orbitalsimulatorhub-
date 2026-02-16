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
    title: "Orbital Simulator Hub | orbitalsimulatorhub.com — Satellite Orbit Simulator & Space Learning",
    description: "Orbital mechanics simulator and space physics for everyone. 3D satellite orbit simulator, NASA orbit calculator, ISS orbit time, real satellite data. Learn how satellites orbit Earth — formulas, calculators, AstroBot.",
    keywords: "orbital mechanics simulator, satellite orbit simulator, space simulator online, learn orbital mechanics, NASA orbit calculator, ISS orbit time, how satellites orbit earth, space physics for kids, gravity simulator, 3D orbit simulator",
    ogTitle: "Orbital Simulator Hub | orbitalsimulatorhub.com",
    lastUpdated: "2026-02-15T00:00:00Z",
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
  "/blog": {
    path: "/blog",
    title: "Space Blog | Daily NASA News, Space Facts, Satellite Tutorials — Orbital Simulator Hub",
    description: "Daily NASA news, space facts, satellite tutorials, and astronomy lessons. Fresh content about orbital mechanics, space physics, and how satellites work. Updated daily.",
    keywords: "space blog, NASA news, space facts, satellite tutorials, astronomy lessons, orbital mechanics blog, space physics blog",
    lastUpdated: "2026-02-15T00:00:00Z",
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
