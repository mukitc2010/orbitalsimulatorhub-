import { writeFileSync } from 'node:fs';
import { scenarios, simulate } from './model.js';
const args = process.argv.slice(2);
const value = (flag: string) => { const i = args.indexOf(flag); return i < 0 ? undefined : args[i + 1]; };
try {
  const seed = Number(value('--seed') ?? 42);
  const selected = value('--scenario');
  const cases = scenarios(seed).filter(s => !selected || s.name === selected);
  if (!cases.length) throw new Error(`Unknown scenario: ${selected}`);
  const results = cases.flatMap(s => [simulate(s, 'distributed'), simulate(s, 'centralized')]);
  const report = { seed, model: 'synthetic encounter-plane v1', results };
  const output = value('--output');
  if (output) writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  console.table(results.map(r => ({ scenario: r.scenario, architecture: r.architecture, status: r.status,
    dv: r.recommendation?.dv ?? '-', latencyS: r.metrics.simulatedLatencyS, messages: r.metrics.messages, reasons: r.reasons.join(', ') })));
} catch (error) { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }
