import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          cyan: "#00d9ff",
          pink: "#ff00d9",
          gold: "#ffd700",
        },
        muted: "#6b7280",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
