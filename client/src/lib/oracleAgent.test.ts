import { describe, expect, it } from 'vitest';
import { planOracleMission, validOracleAction } from '../../../lib/astrobot/oracleAgent';
describe('ORACLE mission loop agent', () => {
  it('prepares ISS and GPS as distinct circular orbits', () => {
    const plan = planOracleMission('Deploy an ISS-like satellite and a GPS orbit so I can compare them')!;
    expect(plan.actions).toHaveLength(2);
    expect(plan.actions.map(a => a.payload.i)).toEqual([51.6, 55]);
    expect(plan.actions.every(validOracleAction)).toBe(true);
  });
  it('calculates comma-separated altitude without mutating simulation', () => {
    const plan = planOracleMission('How fast would I orbit at 1,000 km altitude?')!;
    expect(plan.reply).toContain('7.354 km/s');
    expect(plan.actions).toEqual([]);
  });
  it('explains GEO with its required geometry and no actions', () => {
    const plan = planOracleMission('Why do geostationary satellites never move in the sky?')!;
    expect(plan.reply).toContain('equator');
    expect(plan.actions).toEqual([]);
  });
  it('prepares all three regimes and 8x playback', () => {
    const plan = planOracleMission('Plan a demo: one LEO, one MEO and one GEO satellite, playing at 8x speed')!;
    expect(plan.actions).toHaveLength(4);
    expect(plan.actions[2].payload).toMatchObject({ e: 0, i: 0 });
    expect(plan.actions[3]).toEqual({ type: 'SIM_SET_PLAYBACK', payload: { speed: 8, playing: true } });
  });
  it.each(['Deploy a satellite at -100 km', 'Deploy a satellite at 999999 km', 'Deploy LEO at 999x speed'])('rejects invalid plan: %s', request => {
    expect(planOracleMission(request)!.actions).toEqual([]);
  });
  it('does not accept invalid runtime actions', () => {
    expect(validOracleAction({ type: 'SIM_ADD_SATELLITE', payload: { a: NaN, e: 0, i: 0, name: 'bad' } })).toBe(false);
    expect(validOracleAction({ type: 'SIM_SET_PLAYBACK', payload: { speed: 8, playing: 'yes' } })).toBe(false);
  });
});
