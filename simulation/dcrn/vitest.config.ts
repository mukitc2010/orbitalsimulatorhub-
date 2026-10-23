import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node', include: ['simulation/dcrn/**/*.test.ts'] } });
