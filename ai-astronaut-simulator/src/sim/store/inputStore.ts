import { create } from "zustand";

interface InputStore {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  setKey: (key: string, down: boolean) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  sprint: false,
  setKey: (key, down) =>
    set((s) => {
      const updates: Partial<InputStore> = {};
      if (key === "KeyW") updates.forward = down;
      if (key === "KeyS") updates.backward = down;
      if (key === "KeyA") updates.left = down;
      if (key === "KeyD") updates.right = down;
      if (key === "ShiftLeft") updates.sprint = down;
      return updates;
    }),
}));
