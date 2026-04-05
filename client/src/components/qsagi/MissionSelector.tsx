"use client";

import type { ScenarioType } from "../../lib/qsagi/types";

export function MissionSelector({
  value,
  onChange,
}: {
  value: ScenarioType;
  onChange: (v: ScenarioType) => void;
}) {
  const options: { k: ScenarioType; title: string; desc: string }[] = [
    { k: "SCHWARZSCHILD_FLYBY", title: "Schwarzschild Flyby", desc: "Curved spacetime toy near a non-rotating black hole." },
    { k: "KERR_TOY", title: "Kerr Toy (Coming soon)", desc: "Frame dragging visualization placeholder." },
    { k: "WORMHOLE_TOY", title: "Wormhole Toy (Coming soon)", desc: "Concept-only scenario placeholder." },
  ];

  return (
    <div className="grid gap-3">
      {options.map((o) => (
        <button
          key={o.k}
          type="button"
          onClick={() => onChange(o.k)}
          className={`rounded-2xl border p-4 text-left shadow-sm hover:shadow transition
            ${value === o.k ? "border-white/40" : "border-white/15"}`}
          style={{ color: "var(--text-primary)" }}
        >
          <div className="text-lg font-semibold">{o.title}</div>
          <div className="text-sm opacity-80">{o.desc}</div>
        </button>
      ))}
    </div>
  );
}
