export type ScenarioType = "SCHWARZSCHILD_FLYBY" | "KERR_TOY" | "WORMHOLE_TOY";

export type SimParams = {
  scenario: ScenarioType;
  M: number;
  r0: number;
  v0: number;
  steps: number;
  dt: number;
  tidalLimit: number;
  horizonMargin: number;
  fuelBudget: number;
  quantumAssist: boolean;
};

export type Vec2 = { x: number; y: number };

export type SimPoint = {
  t: number;
  pos: Vec2;
  vel: Vec2;
  r: number;
  timeDilation: number;
  tidal: number;
  fuelUsed: number;
  safe: boolean;
  violations: string[];
};

export type SimRun = {
  id: string;
  createdAt: string;
  params: SimParams;
  points: SimPoint[];
  summary: {
    minR: number;
    maxTidal: number;
    fuelUsed: number;
    violations: string[];
  };
};

export type CompareResult = {
  classical: SimRun;
  assisted: SimRun;
};
