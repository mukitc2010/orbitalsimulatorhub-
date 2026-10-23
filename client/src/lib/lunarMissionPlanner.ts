/** Exhaustive five-task demonstration of the paper's value/risk/energy objective.
 * Serial task duration, no task dependencies, deterministic illustrative inputs. */
export const LUNAR_TASKS = [
  { name: 'Route mapping', value: 8, hours: 2, energy: 1, risk: 1, platform: 'Scout rover' },
  { name: 'Connector inspection', value: 9, hours: 1.5, energy: 1.2, risk: 2, platform: 'Humanoid' },
  { name: 'Relay installation', value: 10, hours: 2.5, energy: 2, risk: 3, platform: 'Humanoid + scout' },
  { name: 'Sample collection', value: 7, hours: 2, energy: 1.4, risk: 4, platform: 'Human-approved team' },
  { name: 'Habitat seal inspection', value: 10, hours: 1.5, energy: 1, risk: 2, platform: 'Humanoid' },
];
export interface MissionBudget { totalEnergy: number; reserve: number; hours: number; riskPenalty: number; energyPenalty: number; sampleApproved: boolean; }
export function optimizeLunarTasks(budget: MissionBudget) {
  if (![budget.totalEnergy, budget.reserve, budget.hours, budget.riskPenalty, budget.energyPenalty].every(v => Number.isFinite(v) && v >= 0) || budget.reserve > budget.totalEnergy) throw new Error('Invalid mission budget');
  let best = { tasks: [] as typeof LUNAR_TASKS, score: 0, energy: 0, hours: 0, risk: 0 };
  for (let mask = 0; mask < 1 << LUNAR_TASKS.length; mask++) {
    const tasks = LUNAR_TASKS.filter((_, i) => mask & (1 << i));
    if (!budget.sampleApproved && tasks.some(t => t.name === 'Sample collection')) continue;
    const energy = tasks.reduce((n, t) => n + t.energy, 0);
    const hours = tasks.reduce((n, t) => n + t.hours, 0);
    const risk = tasks.reduce((n, t) => n + t.risk, 0);
    const score = tasks.reduce((n, t) => n + t.value, 0) - budget.riskPenalty * risk - budget.energyPenalty * energy;
    if (energy + budget.reserve > budget.totalEnergy + 1e-9 || hours > budget.hours) continue;
    if (score > best.score || (score === best.score && energy < best.energy)) best = { tasks, score, energy, hours, risk };
  }
  return best;
}
