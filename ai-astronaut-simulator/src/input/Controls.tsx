"use client";

import { useEffect } from "react";
import { useSimStore } from "@/sim/store/simStore";
import { useUIStore } from "@/sim/store/uiStore";
import { useInputStore } from "@/sim/store/inputStore";
import { KEYMAP } from "./keymap";

export function Controls() {
  const setTool = useSimStore((s) => s.setTool);
  const cycleCameraMode = useUIStore((s) => s.cycleCameraMode);
  const setKey = useInputStore((s) => s.setKey);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.repeat) setKey(e.code, true);
      if (e.code === KEYMAP.TOOL_1) setTool("grab");
      if (e.code === KEYMAP.TOOL_2) setTool("drill");
      if (e.code === KEYMAP.TOOL_3) setTool("scan");
      if (e.code === KEYMAP.TOOL_4) setTool("deploy");
      if (e.code === KEYMAP.CAMERA) cycleCameraMode();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.repeat) setKey(e.code, false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setTool, cycleCameraMode, setKey]);

  return null;
}
