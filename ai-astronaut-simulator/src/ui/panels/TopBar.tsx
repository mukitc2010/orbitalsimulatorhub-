"use client";

import { useSimStore } from "@/sim/store/simStore";
import { useUIStore } from "@/sim/store/uiStore";
import { formatTime } from "@/sim/utils/format";
import { Pill } from "../components/Pill";

export function TopBar() {
  const missionTimer = useSimStore((s) => s.missionTimer);
  const worldPreset = useSimStore((s) => s.getWorldPreset());
  const commStatus = useUIStore((s) => s.commStatus);
  const difficulty = useUIStore((s) => s.difficulty);

  const commVariant = commStatus === "connected" ? "success" : commStatus === "degraded" ? "warning" : "error";

  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <span className="font-mono text-lg font-semibold text-accent-cyan">
          {worldPreset.name}
        </span>
        <span className="font-mono text-sm text-white/60">
          {formatTime(missionTimer)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Pill variant={commVariant}>COMM {commStatus.toUpperCase()}</Pill>
        <Pill>{difficulty.toUpperCase()}</Pill>
      </div>
    </div>
  );
}
