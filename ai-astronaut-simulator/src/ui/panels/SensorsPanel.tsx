"use client";

import { useUIStore } from "@/sim/store/uiStore";
import { HudCard } from "../components/HudCard";

const TABS = ["rgb", "depth", "segmentation", "lidar"] as const;

export function SensorsPanel() {
  const sensorTab = useUIStore((s) => s.sensorTab);
  const setSensorTab = useUIStore((s) => s.setSensorTab);

  return (
    <HudCard className="p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
        Sensors
      </div>
      <div className="flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSensorTab(tab)}
            className={`rounded px-2 py-1 text-xs uppercase ${
              sensorTab === tab
                ? "bg-accent-cyan/20 text-accent-cyan"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-2 h-16 rounded bg-black/50 flex items-center justify-center text-xs text-white/40">
        {sensorTab} placeholder
      </div>
    </HudCard>
  );
}
