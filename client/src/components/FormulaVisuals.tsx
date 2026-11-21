import { useState } from "react";

const FORMULAS = [
  {
    id: "force",
    name: "F = ma (Force)",
    formula: "F = m × a",
    kid: "Force = mass × acceleration. Try changing mass and acceleration to see how force changes!",
    vars: [
      { key: "m", label: "Mass (kg)", min: 0.1, max: 10000, default: 10, scale: "1", step: 0.1 },
      { key: "a", label: "Acceleration (m/s²)", min: 0, max: 100, default: 5, scale: "1", step: 0.1 },
    ],
    compute: (m: number, a: number) => m * a,
    unit: "N",
  },
  {
    id: "gravity",
    name: "Gravity",
    formula: "F = G × (m₁ × m₂) / r²",
    kid: "The bigger the masses and the closer they are, the stronger the pull.",
    vars: [
      { key: "m1", label: "Mass 1 (kg)", min: 1, max: 1e30, default: 6e24, scale: "e24" },
      { key: "m2", label: "Mass 2 (kg)", min: 1, max: 1e6, default: 1000, scale: "1" },
      { key: "r", label: "Distance (m)", min: 1e6, max: 1e9, default: 6.4e6, scale: "e6" },
    ],
    compute: (m1: number, m2: number, r: number) => (6.67e-11 * m1 * m2) / (r * r),
    unit: "N",
  },
  {
    id: "orbital",
    name: "Orbital speed (circular)",
    formula: "v = √(G × M / r)",
    kid: "How fast something must go to stay in a circular orbit.",
    vars: [
      { key: "M", label: "Planet mass (kg)", min: 1e22, max: 1e30, default: 5.97e24, scale: "e24" },
      { key: "r", label: "Orbit radius (m)", min: 6e6, max: 50e6, default: 6.7e6, scale: "e6" },
    ],
    compute: (M: number, r: number) => Math.sqrt((6.67e-11 * M) / r),
    unit: "m/s",
  },
  {
    id: "weight",
    name: "Weight",
    formula: "W = m × g",
    kid: "Your weight is your mass times the local gravity.",
    vars: [
      { key: "m", label: "Mass (kg)", min: 1, max: 500, default: 40, scale: "1" },
      { key: "g", label: "g (m/s²)", min: 0, max: 30, default: 9.8, scale: "1", step: 0.1 },
    ],
    compute: (m: number, g: number) => m * g,
    unit: "N",
  },
  {
    id: "escape",
    name: "Escape velocity",
    formula: "v = √(2 × G × M / r)",
    kid: "Minimum speed to escape a planet's gravity (no thrust).",
    vars: [
      { key: "M", label: "Planet mass (kg)", min: 1e22, max: 1e30, default: 5.97e24, scale: "e24" },
      { key: "r", label: "Radius (m)", min: 1e6, max: 1e8, default: 6.37e6, scale: "e6" },
    ],
    compute: (M: number, r: number) => Math.sqrt((2 * 6.67e-11 * M) / r),
    unit: "m/s",
  },
];

export function FormulaVisuals() {
  const [active, setActive] = useState(0);
  const f = FORMULAS[active];
  const [values, setValues] = useState<Record<string, number>>(() => {
    const o: Record<string, number> = {};
    f.vars.forEach((v) => (o[v.key] = v.default));
    return o;
  });

  const result = (() => {
    const nums = f.vars.map((v) => values[v.key] ?? v.default);
    const compute = f.compute as (...args: number[]) => number;
    return compute(...nums);
  })();

  return (
    <div className="card-blueprint rounded-lg p-6">
      <h2 className="font-bold text-lg font-mono-tech mb-4">{f.name}</h2>
      <h3 className="sr-only">Calculators</h3>
      <div className="flex gap-2 flex-wrap mb-4">
        {FORMULAS.map((form, i) => (
          <button
            key={form.id}
            type="button"
            onClick={() => {
              setActive(i);
              const o: Record<string, number> = {};
              form.vars.forEach((v) => (o[v.key] = v.default));
              setValues(o);
            }}
            className={`px-3 py-1.5 rounded text-sm ${i === active ? "bg-[var(--accent-cyan)]" : "border"}`}
          >
            {form.name}
          </button>
        ))}
      </div>
      <p className="font-mono-tech text-sm bg-gray-100 p-2 rounded mb-2">{f.formula}</p>
      <p className="subhead text-sm mb-4">{f.kid}</p>
      <div className="space-y-2 mb-4">
        {f.vars.map((v) => (
          <label key={v.key} className="flex items-center gap-2 flex-wrap">
            <span className="font-mono-tech text-sm w-40">{v.label}</span>
            <input
              type="number"
              min={v.min}
              max={v.max}
              step={(v as { step?: number }).step ?? 1}
              value={values[v.key] ?? v.default}
              onChange={(e) => setValues((prev) => ({ ...prev, [v.key]: Number(e.target.value) }))}
              className="border rounded px-2 py-1 font-mono-tech w-32"
            />
          </label>
        ))}
      </div>
      <p className="font-mono-tech text-lg">
        Result: <strong>{typeof result === "number" ? result.toFixed(4) : result}</strong> {f.unit}
      </p>
    </div>
  );
}
