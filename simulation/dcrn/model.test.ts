import { describe, expect, it } from 'vitest';
import { collisionRisk, defaultPolicy, scenarios, simulate } from './model';
describe('DCRN simulation', () => {
  it('matches the analytic centered Gaussian disk probability', () => {
    expect(collisionRisk(0, 30, 10)).toBeCloseTo(1 - Math.exp(-100 / 1800), 5);
    expect(collisionRisk(300, 30, 10)).toBeLessThan(1e-10);
  });
  it('is reproducible and recommends a screened maneuver', () => {
    expect(scenarios(42)).toEqual(scenarios(42));
    const r = simulate(scenarios()[0]);
    expect(r.status).toBe('recommendation');
    expect(r.recommendation!.dv).not.toBe(0);
    expect(r.recommendation!.rejected).toEqual([]);
    expect(r.commandsIssued).toBe(0);
  });
  it.each(['link-loss', 'stale-data', 'delayed-update', 'incorrect-agent', 'limited-fuel'])('escalates %s', name => {
    const r = simulate(scenarios().find(s => s.name === name)!);
    expect(r.status).toBe('operator-review');
    expect(r.recommendation).toBeNull();
  });
  it('keeps no action for a low-risk alert', () => {
    expect(simulate(scenarios().find(s => s.name === 'low-risk-alert')!).recommendation!.dv).toBe(0);
  });
  it('compares identical inputs and isolates network failures', () => {
    const s = scenarios()[1];
    expect(simulate(s).reasons).toContain('communication-gap');
    expect(simulate(s, 'centralized').reasons).not.toContain('communication-gap');
    expect(simulate(s).evidence).toEqual(simulate(s, 'centralized').evidence);
  });
  it('checks secondary encounters independently', () => {
    const r = simulate(scenarios().find(s => s.name === 'multiple-conjunctions')!);
    expect(r.candidates.find(c => c.dv === 0.2)!.rejected).toContain('secondary-risk');
  });
  it('fails closed on missing data and rejects malformed inputs', () => {
    expect(simulate({ ...scenarios()[0], observations: [] }).recommendation).toBeNull();
    expect(() => simulate(scenarios()[0], 'distributed', { ...defaultPolicy, riskLimit: NaN })).toThrow();
    expect(() => collisionRisk(0, 0, 10)).toThrow();
  });
  it('preserves provenance and escalates when a recommendation misses TCA', () => {
    const s = scenarios()[0];
    s.observations.forEach(o => o.tcaS = 1);
    const r = simulate(s);
    expect(r.reasons).toContain('decision-deadline');
    expect(r.evidence.map(o => o.source)).toHaveLength(3);
    expect(r.audit.length).toBeGreaterThan(8);
  });
});
