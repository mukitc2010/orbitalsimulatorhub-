import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT || 3001}`,
        changeOrigin: true,
      },
    },
  },
});
