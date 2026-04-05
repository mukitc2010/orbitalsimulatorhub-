import { create } from "zustand";
import type { SimState, Objective, WorldPresetId, RobotType, ToolId } from "../types/sim";
import { getWorldPreset } from "../presets/worlds";

const defaultObjectives: Objective[] = [
  { id: "1", text: "Deploy to landing zone", status: "complete" },
  { id: "2", text: "Scan surface samples", status: "active" },
  { id: "3", text: "Collect mineral samples", status: "pending" },
  { id: "4", text: "Return to base", status: "pending" },
];

const initialState: SimState = {
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  rotation: [0, 0, 0],
  battery: 0.92,
  thermal: 0.35,
  cpuLoad: 0.42,
  jointStress: 0.18,
  missionTimer: 0,
  currentObjective: 1,
  objectives: defaultObjectives,
  tool: "scan",
  robotType: "rover",
  worldPreset: "MOON",
  isThrusting: false,
  isGrounded: true,
  cameraShake: 0,
};

interface SimStore extends SimState {
  setPosition: (pos: [number, number, number]) => void;
  setVelocity: (vel: [number, number, number]) => void;
  setRotation: (rot: [number, number, number]) => void;
  setBattery: (v: number) => void;
  setThermal: (v: number) => void;
  setCpuLoad: (v: number) => void;
  setJointStress: (v: number) => void;
  tickMissionTimer: (dt: number) => void;
  setObjectiveStatus: (id: string, status: Objective["status"]) => void;
  setTool: (tool: ToolId) => void;
  setRobotType: (type: RobotType) => void;
  setWorldPreset: (preset: WorldPresetId) => void;
  setIsThrusting: (v: boolean) => void;
  setIsGrounded: (v: boolean) => void;
  setCameraShake: (v: number) => void;
  getWorldPreset: () => ReturnType<typeof getWorldPreset>;
  reset: () => void;
}

export const useSimStore = create<SimStore>((set, get) => ({
  ...initialState,
  setPosition: (pos) => set({ position: pos }),
  setVelocity: (vel) => set({ velocity: vel }),
  setRotation: (rot) => set({ rotation: rot }),
  setBattery: (v) => set({ battery: Math.max(0, Math.min(1, v)) }),
  setThermal: (v) => set({ thermal: Math.max(0, Math.min(1, v)) }),
  setCpuLoad: (v) => set({ cpuLoad: Math.max(0, Math.min(1, v)) }),
  setJointStress: (v) => set({ jointStress: Math.max(0, Math.min(1, v)) }),
  tickMissionTimer: (dt) => set((s) => ({ missionTimer: s.missionTimer + dt })),
  setObjectiveStatus: (id, status) =>
    set((s) => ({
      objectives: s.objectives.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
  setTool: (tool) => set({ tool }),
  setRobotType: (type) => set({ robotType: type }),
  setWorldPreset: (preset) => set({ worldPreset: preset }),
  setIsThrusting: (v) => set({ isThrusting: v }),
  setIsGrounded: (v) => set({ isGrounded: v }),
  setCameraShake: (v) => set({ cameraShake: Math.max(0, v) }),
  getWorldPreset: () => getWorldPreset(get().worldPreset),
  reset: () => set(initialState),
}));
