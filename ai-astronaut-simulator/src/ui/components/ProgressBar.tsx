"use client";

export function ProgressBar({
  value,
  max = 1,
  color = "cyan",
  label,
}: {
  value: number;
  max?: number;
  color?: "cyan" | "violet" | "pink" | "gold";
  label?: string;
}) {
  const pct = Math.min(1, Math.max(0, value / max));
  const colors = {
    cyan: "bg-accent-cyan",
    violet: "bg-accent-violet",
    pink: "bg-accent-pink",
    gold: "bg-accent-gold",
  };

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs">
          <span className="opacity-80">{label}</span>
          <span className="font-mono">{Math.round(pct * 100)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colors[color]}`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}
