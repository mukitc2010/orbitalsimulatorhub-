/**
 * Futuristic neon theme shared by every screen.
 * Deep-space navy background with cyan / violet holographic accents.
 */
export const colors = {
  bg: "#030616",
  bgElevated: "#0a1128",
  panel: "rgba(13, 22, 48, 0.82)",
  panelBorder: "rgba(56, 189, 248, 0.28)",
  cyan: "#22d3ee",
  cyanBright: "#67e8f9",
  violet: "#a78bfa",
  magenta: "#e879f9",
  amber: "#fbbf24",
  green: "#34d399",
  text: "#e2e8f0",
  textDim: "#94a3b8",
  textFaint: "#64748b",
  danger: "#fb7185",
} as const;

export const orbitColors: Record<string, string> = {
  LEO: colors.cyan,
  MEO: colors.violet,
  GEO: colors.amber,
  CUSTOM: colors.magenta,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const glow = (color: string, radiusPx = 12) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: radiusPx,
  elevation: 8,
});
