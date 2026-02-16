import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";

const connection = mysql.createPool(process.env.DATABASE_URL || "mysql://root:root@localhost:3306/satellite_sim");

export const db = drizzle(connection, { schema, mode: "default" });

export function randomId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}

// Satellites
export async function createSatellite(data: {
  id: string;
  name: string;
  color: string;
  semiMajorAxisKm: number;
  eccentricity: number;
  inclinationDeg: number;
  raanDeg: number;
  argPerigeeDeg: number;
  trueAnomalyDeg: number;
}) {
  await db.insert(schema.satellites).values(data);
  return data;
}

export async function listSatellites() {
  return db.select().from(schema.satellites).orderBy(desc(schema.satellites.createdAt));
}

export async function getSatellite(id: string) {
  const rows = await db.select().from(schema.satellites).where(eq(schema.satellites.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateSatellite(
  id: string,
  data: Partial<{
    name: string;
    color: string;
    semiMajorAxisKm: number;
    eccentricity: number;
    inclinationDeg: number;
    raanDeg: number;
    argPerigeeDeg: number;
    trueAnomalyDeg: number;
  }>
) {
  await db.update(schema.satellites).set(data).where(eq(schema.satellites.id, id));
  return getSatellite(id);
}

export async function deleteSatellite(id: string) {
  await db.delete(schema.satellites).where(eq(schema.satellites.id, id));
  return { ok: true };
}

// Ground stations
export async function createGroundStation(data: {
  id: string;
  name: string;
  latitudeDeg: number;
  longitudeDeg: number;
  elevationM?: number;
}) {
  await db.insert(schema.groundStations).values({
    ...data,
    elevationM: data.elevationM ?? null,
  });
  return data;
}

export async function listGroundStations() {
  return db.select().from(schema.groundStations).orderBy(desc(schema.groundStations.createdAt));
}

// Simulations (in-memory friendly: we can skip DB for sim state and use it only for persistence if needed)
export async function createSimulation(data: {
  id: string;
  currentTime: Date;
  speedMultiplier?: number;
  satelliteIds?: string[];
  name?: string;
}) {
  await db.insert(schema.simulations).values({
    id: data.id,
    currentTime: data.currentTime,
    speedMultiplier: data.speedMultiplier ?? 1,
    satelliteIds: data.satelliteIds ?? [],
    name: data.name ?? null,
  });
  return data;
}

export async function getSimulation(id: string) {
  const rows = await db.select().from(schema.simulations).where(eq(schema.simulations.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateSimulation(
  id: string,
  data: Partial<{ currentTime: Date; speedMultiplier: number; satelliteIds: string[] }>
) {
  await db.update(schema.simulations).set(data as Record<string, unknown>).where(eq(schema.simulations.id, id));
  return getSimulation(id);
}
