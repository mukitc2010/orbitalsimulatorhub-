import type { Vector3 } from "three";

export type WorldPresetId = "ISS" | "MOON" | "MARS" | "CUSTOM";

export type RobotType = "rover" | "drone" | "humanoid";

export type CameraMode = "third" | "first" | "free";

export type ToolId = "grab" | "drill" | "scan" | "deploy" | "none";

export type ObjectiveStatus = "pending" | "active" | "complete" | "failed";

export interface WorldPreset {
  id: WorldPresetId;
  name: string;
  gravity: number;
  hasAtmosphere: boolean;
  fogDensity: number;
  sunIntensity: number;
  groundColor: string;
  skyColor: string;
}

export interface Objective {
  id: string;
  text: string;
  status: ObjectiveStatus;
}

export interface SimState {
  position: [number, number, number];
  velocity: [number, number, number];
  rotation: [number, number, number];
  battery: number;
  thermal: number;
  cpuLoad: number;
  jointStress: number;
  missionTimer: number;
  currentObjective: number;
  objectives: Objective[];
  tool: ToolId;
  robotType: RobotType;
  worldPreset: WorldPresetId;
  isThrusting: boolean;
  isGrounded: boolean;
  cameraShake: number;
}

export interface UIState {
  cameraMode: CameraMode;
  showDebug: boolean;
  sensorTab: "rgb" | "depth" | "segmentation" | "lidar";
  commStatus: "connected" | "degraded" | "offline";
  difficulty: "easy" | "normal" | "hard";
}
