export const APP_NAME = "OrbitalSimulatorHub";
export const SITE_DOMAIN = "orbitalsimulatorhub.com";

export const SATELLITE_COLORS = [
  "#00d9ff",
  "#ff00d9",
  "#ffd700",
  "#00ff88",
  "#ff6600",
] as const;

export const ORBIT_PRESETS = [
  { id: "LEO" as const, label: "LEO (ISS-like)", alt: "~400 km" },
  { id: "MEO" as const, label: "MEO (GPS-like)", alt: "~20,200 km" },
  { id: "GEO" as const, label: "GEO (Weather)", alt: "~35,786 km" },
];

export const SIM_SPEEDS = [1, 2, 4, 8] as const;
