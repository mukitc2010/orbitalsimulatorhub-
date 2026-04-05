"use client";

import { useSimStore } from "@/sim/store/simStore";
import { HudCard } from "../components/HudCard";

const statusIcons: Record<string, string> = {
  pending: "○",
  active: "●",
  complete: "✓",
  failed: "✗",
};

export function ObjectivesPanel() {
  const objectives = useSimStore((s) => s.objectives);

  return (
    <HudCard className="max-h-48 overflow-hidden p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
        Objectives
      </div>
      <div className="space-y-1.5 overflow-y-auto">
        {objectives.map((obj) => (
          <div
            key={obj.id}
            className={`flex items-center gap-2 text-sm ${
              obj.status === "complete" ? "text-white/50 line-through" : ""
            } ${obj.status === "active" ? "text-accent-cyan" : ""}`}
          >
            <span className="w-4 opacity-70">{statusIcons[obj.status] ?? "○"}</span>
            {obj.text}
          </div>
        ))}
      </div>
    </HudCard>
  );
}
