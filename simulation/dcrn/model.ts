/** Synthetic encounter-plane decision support. SI units; never emits commands. */
export interface Observation {
  source: string; node: number; producedAt: number; arrivesAt: number;
  missM: number; sigmaM: number; tcaS: number; object: string;
}
export interface Scenario {
  name: string; observations: Observation[]; nodes: number; now: number;
  links: [number, number][]; secondaryMissM?: number; fuelLimit: number;
}
export interface Policy {
  maxAgeS: number; disagreementM: number; riskLimit: number;
  hardBodyM: number; rounds: number; latencyS: number;
  approvedDv: number[];
}
export const defaultPolicy: Policy = {
  maxAgeS: 120, disagreementM: 150, riskLimit: 0.001,
  hardBodyM: 10, rounds: 3, latencyS: 2, approvedDv: [0, -0.2, 0.2, -0.5, 0.5],
};
export interface Candidate {
  dv: number; worstRisk: number; secondaryRisk: number; rejected: string[];
}
export interface Result {
  scenario: string; architecture: 'distributed' | 'centralized';
  status: 'operator-review' | 'recommendation'; reasons: string[];
  recommendation: Candidate | null; candidates: Candidate[];
  estimates: number[]; evidence: Observation[]; audit: string[];
  metrics: { simulatedLatencyS: number; messages: number; bytes: number;
    stale: number; unavailable: number; disagreementM: number; recommendedDv: number | null };
  commandsIssued: 0;
}
const finite = (x: number) => Number.isFinite(x);
// Numerical integration of an isotropic Gaussian over the hard-body disk.
// The signed miss distance is along one encounter-plane axis.
export function collisionRisk(missM: number, sigmaM: number, radiusM: number): number {
  if (![missM, sigmaM, radiusM].every(finite) || sigmaM <= 0 || radiusM <= 0)
    throw new Error('Risk inputs must be finite with positive sigma and radius');
  // Integrate in normalized polar coordinates; fixed quadrature is reproducible.
  let sum = 0;
  const nr = 80, nt = 96, dr = radiusM / nr;
  for (let r = 0; r < nr; r++) {
    const rho = (r + 0.5) * dr;
    for (let t = 0; t < nt; t++) {
      const theta = (t + 0.5) * 2 * Math.PI / nt;
      const d2 = (rho * Math.cos(theta) - missM) ** 2 + (rho * Math.sin(theta)) ** 2;
      sum += Math.exp(-d2 / (2 * sigmaM ** 2)) * rho * dr / (nt * sigmaM ** 2);
    }
  }
  return Math.min(1, Math.max(0, sum));
}
function validate(s: Scenario, p: Policy) {
  if (!Number.isInteger(s.nodes) || s.nodes < 1 || !finite(s.now) || !finite(s.fuelLimit) || s.fuelLimit < 0)
    throw new Error('Invalid scenario limits');
  if (![p.maxAgeS, p.disagreementM, p.hardBodyM, p.latencyS].every(x => finite(x) && x > 0)
    || !finite(p.riskLimit) || p.riskLimit <= 0 || p.riskLimit >= 1
    || !Number.isInteger(p.rounds) || p.rounds < 0 || !p.approvedDv.length || !p.approvedDv.every(finite))
    throw new Error('Invalid policy');
  for (const o of s.observations) {
    if (![o.producedAt, o.arrivesAt, o.missM, o.sigmaM, o.tcaS].every(finite)
      || o.sigmaM <= 0 || o.tcaS <= 0 || o.arrivesAt < o.producedAt
      || !Number.isInteger(o.node) || o.node < 0 || o.node >= s.nodes || !o.source || !o.object)
      throw new Error('Invalid observation');
  }
  if (s.secondaryMissM !== undefined && !finite(s.secondaryMissM)) throw new Error('Invalid secondary encounter');
  for (const [a, b] of s.links) if (![a, b].every(n => Number.isInteger(n) && n >= 0 && n < s.nodes) || a === b)
    throw new Error('Invalid link');
}
export function simulate(s: Scenario, architecture: Result['architecture'] = 'distributed', p: Policy = defaultPolicy): Result {
  validate(s, p);
  const audit: string[] = [], reasons: string[] = [];
  let stale = 0, unavailable = 0, messages = 0, bytes = 0;
  // Observation agent: reject future, delayed, and stale records; retain all in audit.
  const evidence = s.observations.filter(o => {
    if (o.arrivesAt > s.now || o.producedAt > s.now) {
      unavailable++; audit.push(`observation: unavailable ${o.source}/${o.object}`); return false;
    }
    if (s.now - o.producedAt > p.maxAgeS) {
      stale++; audit.push(`observation: stale ${o.source}/${o.object}`); return false;
    }
    audit.push(`observation: accepted ${o.source}/${o.object} sigma=${o.sigmaM}`); return true;
  });
  if (stale) reasons.push('stale-data');
  if (unavailable) reasons.push('delayed-data');
  if (!evidence.length) reasons.push('missing-data');
  // Orbit agent: observations already describe a synthetic common TCA plane.
  // Preserve source estimates; never fuse their uncertainty as independent data.
  const objects = [...new Set(s.observations.map(o => o.object))];
  let spread = 0;
  for (const object of objects) {
    const records = evidence.filter(o => o.object === object);
    if (!records.length) reasons.push(`missing-object:${object}`);
    if (records.length) spread = Math.max(spread, Math.max(...records.map(o => o.missM)) - Math.min(...records.map(o => o.missM)));
  }
  if (spread > p.disagreementM) reasons.push('conflicting-estimates');
  // Coordination agents gossip source-tagged records synchronously over live links.
  let known = Array.from({ length: s.nodes }, (_, n) => new Set(evidence.filter(o => o.node === n)));
  const estimates: number[] = [];
  if (architecture === 'distributed') {
    for (let round = 0; round < p.rounds; round++) {
      const next = known.map(k => new Set(k));
      for (const [a, b] of s.links) for (const [from, to] of [[a, b], [b, a]]) {
        messages++; bytes += JSON.stringify([...known[from]]).length;
        known[from].forEach(o => next[to].add(o));
      }
      known = next;
      audit.push(`coordination: round ${round + 1}, coverage ${known.map(k => k.size).join('/')}`);
    }
    if (known.some(k => k.size !== evidence.length) || known.some(k => !k.size)) reasons.push('communication-gap');
  } else {
    messages = evidence.length; bytes = JSON.stringify(evidence).length;
    known = known.map(() => new Set(evidence));
    audit.push('coordination: centralized collector received identical available inputs');
  }
  for (const k of known) if (k.size) estimates.push([...k].reduce((sum, o) => sum + o.missM, 0) / k.size);
  audit.push(`orbit: retained ${evidence.length} source estimates; spread=${spread}m`);
  // Planning and risk agents: impulsive linear displacement dv * time to encounter.
  const candidates = p.approvedDv.map(dv => {
    const worstRisk = evidence.length ? Math.max(...evidence.map(o => collisionRisk(o.missM - dv * o.tcaS, o.sigmaM, p.hardBodyM))) : 1;
    const secondaryRisk = s.secondaryMissM === undefined ? 0 : Math.max(0, ...evidence.map(o => collisionRisk(s.secondaryMissM! - dv * o.tcaS, o.sigmaM, p.hardBodyM)));
    const rejected: string[] = [];
    if (Math.abs(dv) > s.fuelLimit) rejected.push('fuel-limit');
    if (worstRisk > p.riskLimit) rejected.push('target-risk');
    if (secondaryRisk > p.riskLimit) rejected.push('secondary-risk');
    audit.push(`safety: dv=${dv}, risk=${worstRisk}, secondary=${secondaryRisk}, ${rejected.join(',') || 'passed'}`);
    return { dv, worstRisk, secondaryRisk, rejected };
  });
  const safe = candidates.filter(c => !c.rejected.length).sort((a, b) => Math.abs(a.dv) - Math.abs(b.dv) || a.worstRisk - b.worstRisk);
  if (!safe.length) reasons.push('no-safe-option');
  const simulatedLatencyS = architecture === 'distributed' ? p.rounds * p.latencyS : p.latencyS * 2;
  if (evidence.some(o => o.tcaS <= simulatedLatencyS)) reasons.push('decision-deadline');
  const recommendation = reasons.length ? null : safe[0] ?? null;
  audit.push(`coordination: ${recommendation ? 'recommendation prepared for operator' : 'escalated to operator'}; no command issued`);
  return { scenario: s.name, architecture, status: reasons.length ? 'operator-review' : 'recommendation', reasons,
    recommendation, candidates, estimates, evidence, audit, commandsIssued: 0,
    metrics: { simulatedLatencyS, messages, bytes, stale, unavailable, disagreementM: spread, recommendedDv: recommendation?.dv ?? null } };
}
export function scenarios(seed = 42): Scenario[] {
  if (!Number.isInteger(seed)) throw new Error('Seed must be an integer');
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const observations: Observation[] = [0, 1, 2].map(node => ({ source: `tracker-${node}`, node,
    producedAt: 990, arrivesAt: 995, missM: 15 + random() * 8, sigmaM: 30, tcaS: 600, object: 'debris-a' }));
  const base: Scenario = { name: 'nominal', observations, nodes: 3, now: 1000, links: [[0, 1], [1, 2]], fuelLimit: 0.5 };
  const copy = (name: string, changes: Partial<Scenario>): Scenario => ({ ...structuredClone(base), name, ...changes });
  return [base,
    copy('link-loss', { links: [[0, 1]] }),
    copy('stale-data', { observations: observations.map((o, i) => i === 0 ? { ...o, producedAt: 800 } : o) }),
    copy('delayed-update', { observations: observations.map((o, i) => i === 0 ? { ...o, arrivesAt: 1100 } : o) }),
    copy('incorrect-agent', { observations: observations.map((o, i) => i === 0 ? { ...o, missM: 900 } : o) }),
    copy('limited-fuel', { fuelLimit: 0.01 }),
    copy('low-risk-alert', { observations: observations.map(o => ({ ...o, missM: 900 })) }),
    copy('multiple-conjunctions', { secondaryMissM: 120 }),
    copy('contradictory-objects', { observations: [...observations, ...observations.map(o => ({ ...o, object: 'debris-b', missM: -o.missM }))] }),
  ];
}
