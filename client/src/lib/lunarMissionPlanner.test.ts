import { describe, expect, it } from 'vitest';
import { optimizeLunarTasks } from './lunarMissionPlanner';
const baseline = { totalEnergy: 10, reserve: 2, hours: 12, riskPenalty: 1, energyPenalty: 1, sampleApproved: false };
describe('lunar research companion', () => {
  it('retains reserve and requires modeled approval for samples', () => {
    const result = optimizeLunarTasks(baseline);
    expect(result.energy + baseline.reserve).toBeLessThanOrEqual(10);
    expect(result.tasks.map(t => t.name)).not.toContain('Sample collection');
    expect(optimizeLunarTasks({ ...baseline, sampleApproved: true }).tasks.map(t => t.name)).toContain('Sample collection');
  });
  it('respects zero usable energy and zero time', () => {
    expect(optimizeLunarTasks({ ...baseline, reserve: 10 }).tasks).toEqual([]);
    expect(optimizeLunarTasks({ ...baseline, hours: 0 }).tasks).toEqual([]);
  });
  it('chooses the highest scoring feasible task in a short window', () => {
    expect(optimizeLunarTasks({ ...baseline, hours: 1.5 }).tasks.map(t => t.name)).toEqual(['Habitat seal inspection']);
  });
  it('rejects malformed budgets', () => {
    expect(() => optimizeLunarTasks({ ...baseline, reserve: 11 })).toThrow();
    expect(() => optimizeLunarTasks({ ...baseline, hours: NaN })).toThrow();
  });
});
