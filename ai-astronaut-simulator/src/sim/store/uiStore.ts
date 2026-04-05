import { create } from "zustand";
import type { UIState, CameraMode } from "../types/sim";

interface UIStore extends UIState {
  setCameraMode: (mode: CameraMode) => void;
  cycleCameraMode: () => void;
  toggleDebug: () => void;
  setSensorTab: (tab: UIState["sensorTab"]) => void;
  setCommStatus: (status: UIState["commStatus"]) => void;
  setDifficulty: (d: UIState["difficulty"]) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cameraMode: "third",
  showDebug: false,
  sensorTab: "rgb",
  commStatus: "connected",
  difficulty: "normal",
  setCameraMode: (mode) => set({ cameraMode: mode }),
  cycleCameraMode: () =>
    set((s) => ({
      cameraMode: s.cameraMode === "third" ? "first" : s.cameraMode === "first" ? "free" : "third",
    })),
  toggleDebug: () => set((s) => ({ showDebug: !s.showDebug })),
  setSensorTab: (tab) => set({ sensorTab: tab }),
  setCommStatus: (status) => set({ commStatus: status }),
  setDifficulty: (d) => set({ difficulty: d }),
}));
