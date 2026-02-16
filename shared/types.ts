// Keplerian orbital elements
export interface OrbitalElements {
  semiMajorAxisKm: number;
  eccentricity: number;
  inclinationDeg: number;
  raanDeg: number;
  argPerigeeDeg: number;
  trueAnomalyDeg: number;
}

// Cartesian state (position km, velocity km/s)
export interface CartesianState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export interface Satellite {
  id: string;
  name: string;
  color: string;
  orbitalElements: OrbitalElements;
  createdAt?: string;
}

export interface GroundStation {
  id: string;
  name: string;
  latitudeDeg: number;
  longitudeDeg: number;
  elevationM?: number;
}

export interface VisibilityWindow {
  startTime: string;
  endTime: string;
  maxElevationDeg: number;
  durationMinutes: number;
}

export interface PositionRecord {
  time: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export type OrbitPreset = "LEO" | "MEO" | "GEO";

export const SATELLITE_COLORS = [
  "#00d9ff",
  "#ff00d9",
  "#ffd700",
  "#00ff88",
  "#ff6600",
] as const;
