CREATE TABLE IF NOT EXISTS `satellites` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(32) NOT NULL,
  `semi_major_axis_km` double NOT NULL,
  `eccentricity` double NOT NULL,
  `inclination_deg` double NOT NULL,
  `raan_deg` double NOT NULL,
  `arg_perigee_deg` double NOT NULL,
  `true_anomaly_deg` double NOT NULL,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS `ground_stations` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude_deg` double NOT NULL,
  `longitude_deg` double NOT NULL,
  `elevation_m` int,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS `simulations` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `name` varchar(255),
  `current_time` datetime NOT NULL,
  `speed_multiplier` double DEFAULT 1,
  `satellite_ids` json,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS `position_history` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `simulation_id` varchar(36) NOT NULL,
  `satellite_id` varchar(36) NOT NULL,
  `time` datetime NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `z` double NOT NULL,
  `vx` double NOT NULL,
  `vy` double NOT NULL,
  `vz` double NOT NULL
);

CREATE TABLE IF NOT EXISTS `visibility_windows` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `satellite_id` varchar(36) NOT NULL,
  `ground_station_id` varchar(36) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `max_elevation_deg` double NOT NULL,
  `created_at` datetime DEFAULT (now())
);
