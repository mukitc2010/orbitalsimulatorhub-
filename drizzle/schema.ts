import {
  mysqlTable,
  varchar,
  text,
  int,
  double,
  datetime,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 32 }).default("user"),
  createdAt: datetime("created_at").default(new Date()),
});

export const satellites = mysqlTable("satellites", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 32 }).notNull(),
  semiMajorAxisKm: double("semi_major_axis_km").notNull(),
  eccentricity: double("eccentricity").notNull(),
  inclinationDeg: double("inclination_deg").notNull(),
  raanDeg: double("raan_deg").notNull(),
  argPerigeeDeg: double("arg_perigee_deg").notNull(),
  trueAnomalyDeg: double("true_anomaly_deg").notNull(),
  createdAt: datetime("created_at").default(new Date()),
});

export const groundStations = mysqlTable("ground_stations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  latitudeDeg: double("latitude_deg").notNull(),
  longitudeDeg: double("longitude_deg").notNull(),
  elevationM: int("elevation_m"),
  createdAt: datetime("created_at").default(new Date()),
});

export const simulations = mysqlTable("simulations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  currentTime: datetime("current_time").notNull(),
  speedMultiplier: double("speed_multiplier").default(1),
  satelliteIds: json("satellite_ids").$type<string[]>(),
  createdAt: datetime("created_at").default(new Date()),
});

export const positionHistory = mysqlTable("position_history", {
  id: varchar("id", { length: 36 }).primaryKey(),
  simulationId: varchar("simulation_id", { length: 36 }).notNull(),
  satelliteId: varchar("satellite_id", { length: 36 }).notNull(),
  time: datetime("time").notNull(),
  x: double("x").notNull(),
  y: double("y").notNull(),
  z: double("z").notNull(),
  vx: double("vx").notNull(),
  vy: double("vy").notNull(),
  vz: double("vz").notNull(),
});

export const visibilityWindows = mysqlTable("visibility_windows", {
  id: varchar("id", { length: 36 }).primaryKey(),
  satelliteId: varchar("satellite_id", { length: 36 }).notNull(),
  groundStationId: varchar("ground_station_id", { length: 36 }).notNull(),
  startTime: datetime("start_time").notNull(),
  endTime: datetime("end_time").notNull(),
  maxElevationDeg: double("max_elevation_deg").notNull(),
  createdAt: datetime("created_at").default(new Date()),
});
