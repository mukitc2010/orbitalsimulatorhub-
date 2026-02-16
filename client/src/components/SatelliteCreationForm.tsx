import { useState } from "react";
import { SATELLITE_COLORS, ORBIT_PRESETS } from "../const";
import type { OrbitalElements } from "../../../shared/types";

const defaultElements: OrbitalElements = {
  semiMajorAxisKm: 6771,
  eccentricity: 0.0001,
  inclinationDeg: 51.6,
  raanDeg: 0,
  argPerigeeDeg: 0,
  trueAnomalyDeg: 0,
};

interface SatelliteCreationFormProps {
  onSubmit: (data: { name: string; color: string; orbitalElements: OrbitalElements }) => void;
  onLoadPreset?: (preset: "LEO" | "MEO" | "GEO") => void;
}

export function SatelliteCreationForm({ onSubmit, onLoadPreset }: SatelliteCreationFormProps) {
  const [name, setName] = useState("My Satellite");
  const [color, setColor] = useState(SATELLITE_COLORS[0]);
  const [elements, setElements] = useState<OrbitalElements>(defaultElements);

  const update = (k: keyof OrbitalElements, v: number) => {
    setElements((e) => ({ ...e, [k]: v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, color, orbitalElements: elements });
  };

  return (
    <form onSubmit={handleSubmit} className="card-blueprint rounded-lg p-4 space-y-4">
      <h3 className="font-bold text-lg font-mono-tech text-slate-800">Create satellite</h3>
      <p className="text-xs text-slate-600">
        Use a <strong>preset</strong> for a real-world orbit (ISS, GPS, or weather satellite). Or set your own numbers in the form below.
      </p>

      {onLoadPreset && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Presets (recommended)</label>
          <div className="space-y-1.5">
            {ORBIT_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onLoadPreset(p.id)}
                className="w-full text-left px-3 py-2 rounded-lg border-2 border-[var(--accent-cyan)]/50 hover:bg-[var(--accent-cyan)]/10 hover:border-[var(--accent-cyan)] text-sm font-medium transition"
              >
                <span className="block">{p.label}</span>
                <span className="text-xs text-slate-500 font-normal">{p.alt} — click to add</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded px-3 py-2 font-mono-tech text-sm"
          placeholder="e.g. My Satellite"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
        <p className="text-xs text-slate-500 mb-1.5">Color of the satellite and its orbit trail in the 3D view.</p>
        <div className="flex gap-2 flex-wrap">
          {SATELLITE_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-slate-800" : "border-slate-300"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Advanced: orbit parameters</h4>
        <p className="text-xs text-slate-500 mb-2">Change these to customize the orbit shape, tilt, and position.</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {([
          ["semiMajorAxisKm", "Distance from Earth center (km)", "Bigger = higher orbit (e.g. 6771 ≈ ISS)", 6371, 50000],
          ["eccentricity", "Orbit shape (0 = circle)", "0 = circle, 0.5 = oval", 0, 1],
          ["inclinationDeg", "Orbit tilt (°)", "Angle of the orbit plane (e.g. 51.6 ≈ ISS)", 0, 180],
          ["raanDeg", "Orbit rotation (°)", "Where the orbit is pointing", 0, 360],
          ["argPerigeeDeg", "Perigee angle (°)", "Closest point direction", 0, 360],
          ["trueAnomalyDeg", "Position on orbit (°)", "Where the satellite is on the path", 0, 360],
        ] as const).map(([key, label, hint, min, max]) => (
          <div key={key}>
            <label className="block font-mono-tech text-xs text-slate-700">{label}</label>
            <span className="block text-xs text-slate-500 mb-0.5">{hint}</span>
            <input
              type="number"
              min={min}
              max={max}
              step={key === "eccentricity" ? 0.01 : 1}
              value={elements[key]}
              onChange={(e) => update(key, Number(e.target.value))}
              className="w-full border border-slate-300 rounded px-2 py-1 font-mono-tech text-sm"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90 transition"
      >
        Add satellite to simulation
      </button>
    </form>
  );
}
