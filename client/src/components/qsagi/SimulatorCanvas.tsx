"use client";

import { useEffect, useRef } from "react";
import type { SimRun } from "../../lib/qsagi/types";

export function SimulatorCanvas({ run }: { run: SimRun | null }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!run || run.points.length < 2) {
      ctx.font = "14px system-ui";
      ctx.fillStyle = "rgba(148,163,184,0.9)";
      ctx.fillText("Run simulation to view orbit path.", 20, 30);
      return;
    }

    const xs = run.points.map((p) => p.pos.x);
    const ys = run.points.map((p) => p.pos.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const pad = 30;
    const w = canvas.width;
    const h = canvas.height;
    const sx = (w - pad * 2) / Math.max(1e-6, maxX - minX);
    const sy = (h - pad * 2) / Math.max(1e-6, maxY - minY);
    const s = Math.min(sx, sy);

    const tx = (x: number) => pad + (x - minX) * s;
    const ty = (y: number) => h - pad - (y - minY) * s;

    const cx = tx(0);
    const cy = ty(0);
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(tx(run.points[0].pos.x), ty(run.points[0].pos.y));
    for (const p of run.points) ctx.lineTo(tx(p.pos.x), ty(p.pos.y));
    ctx.strokeStyle = run.points.every((p) => p.safe) ? "rgba(0,217,255,0.8)" : "rgba(239,68,68,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    for (const p of run.points) {
      if (p.violations.length > 0) {
        const x = tx(p.pos.x);
        const y = ty(p.pos.y);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    }

    ctx.font = "12px system-ui";
    ctx.fillStyle = "rgba(148,163,184,0.9)";
    ctx.fillText("Center (BH proxy)", cx + 10, cy - 10);
  }, [run]);

  return (
    <div className="rounded-2xl border border-white/10 p-3">
      <div className="mb-2 text-lg font-semibold">Spacetime Visualizer (Toy)</div>
      <canvas ref={ref} width={700} height={420} className="w-full rounded-xl border border-white/10" />
      <div className="mt-2 text-xs opacity-70">
        Educational toy: Newtonian + bounded curvature correction. Squares mark any safety violations.
      </div>
    </div>
  );
}
