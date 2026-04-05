import type { WorldPreset } from "../types/sim";

export const WORLD_PRESETS: Record<string, WorldPreset> = {
  ISS: {
    id: "ISS",
    name: "ISS (Microgravity)",
    gravity: 0,
    hasAtmosphere: false,
    fogDensity: 0,
    sunIntensity: 1.2,
    groundColor: "#2a2a3a",
    skyColor: "#050810",
  },
  MOON: {
    id: "MOON",
    name: "Moon",
    gravity: 1.62,
    hasAtmosphere: false,
    fogDensity: 0,
    sunIntensity: 1.0,
    groundColor: "#4a4a5a",
    skyColor: "#050810",
  },
  MARS: {
    id: "MARS",
    name: "Mars",
    gravity: 3.71,
    hasAtmosphere: true,
    fogDensity: 0.02,
    sunIntensity: 0.7,
    groundColor: "#8b4513",
    skyColor: "#1a0a0a",
  },
  CUSTOM: {
    id: "CUSTOM",
    name: "Custom Planet",
    gravity: 3.0,
    hasAtmosphere: false,
    fogDensity: 0.01,
    sunIntensity: 1.0,
    groundColor: "#3a4a5a",
    skyColor: "#0a1018",
  },
};

export function getWorldPreset(id: string): WorldPreset {
  return WORLD_PRESETS[id] ?? WORLD_PRESETS.MOON;
}
