"use client";

import { useSimStore } from "@/sim/store/simStore";
import { HudCard } from "../components/HudCard";

export function MiniMap() {
  const position = useSimStore((s) => s.position);

  return (
    <HudCard className="p-2">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
        Map
      </div>
      <div className="relative h-24 w-24 rounded-full border border-accent-cyan/30 bg-black/50">
        <div
          className="absolute h-2 w-2 rounded-full bg-accent-cyan shadow-glow-cyan"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${position[0] * 2}px), calc(-50% + ${position[2] * 2}px))`,
          }}
        />
      </div>
    </HudCard>
  );
}
