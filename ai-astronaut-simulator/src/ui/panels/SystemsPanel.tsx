"use client";

import { useSimStore } from "@/sim/store/simStore";
import { HudCard } from "../components/HudCard";
import { ProgressBar } from "../components/ProgressBar";

export function SystemsPanel() {
  const battery = useSimStore((s) => s.battery);
  const thermal = useSimStore((s) => s.thermal);
  const cpuLoad = useSimStore((s) => s.cpuLoad);
  const jointStress = useSimStore((s) => s.jointStress);

  return (
    <HudCard className="p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
        Robot Systems
      </div>
      <div className="space-y-3">
        <ProgressBar value={battery} color="cyan" label="Battery" />
        <ProgressBar value={thermal} color="pink" label="Thermal" />
        <ProgressBar value={cpuLoad} color="violet" label="CPU" />
        <ProgressBar value={jointStress} color="gold" label="Joint Stress" />
      </div>
    </HudCard>
  );
}
