"use client";

import { ReactNode } from "react";

export function HudCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-space-900/80 backdrop-blur-sm ${className}`}
      style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.08)" }}
    >
      {children}
    </div>
  );
}
