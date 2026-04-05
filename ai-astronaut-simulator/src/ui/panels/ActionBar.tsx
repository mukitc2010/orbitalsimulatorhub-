"use client";

import { useSimStore } from "@/sim/store/simStore";
import { useUIStore } from "@/sim/store/uiStore";
import { HudCard } from "../components/HudCard";
import { KEYMAP } from "@/input/keymap";

const TOOLS = [
  { id: "grab" as const, label: "Grab", key: "1" },
  { id: "drill" as const, label: "Drill", key: "2" },
  { id: "scan" as const, label: "Scan", key: "3" },
  { id: "deploy" as const, label: "Deploy", key: "4" },
];

export function ActionBar() {
  const tool = useSimStore((s) => s.tool);
  const setTool = useSimStore((s) => s.setTool);
  const cycleCameraMode = useUIStore((s) => s.cycleCameraMode);

  return (
    <HudCard className="p-3">
      <div className="mb-2 flex flex-wrap gap-2">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-all ${
              tool === t.id
                ? "border border-accent-cyan bg-accent-cyan/20 text-accent-cyan"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {t.label} <span className="opacity-60">[{t.key}]</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-white/50">
        <span>WASD Move</span>
        <span>Shift Boost</span>
        <span>E Interact</span>
        <button
          onClick={cycleCameraMode}
          className="hover:text-accent-cyan"
        >
          C Camera
        </button>
      </div>
    </HudCard>
  );
}
