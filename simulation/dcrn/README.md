# Distributed Conjunction Response Network simulation

From the repository root (uses existing dependencies):

```sh
npx tsx simulation/dcrn/cli.ts
npx tsx simulation/dcrn/cli.ts --seed 42 --scenario link-loss --output dcrn-report.json
npx vitest run --config simulation/dcrn/vitest.config.ts
```

The default run compares distributed and centralized decision support across nine deterministic synthetic scenarios: nominal, dropped link, stale input, delayed input, incorrect agent, fuel shortage, low-risk alert, secondary conjunction, and multiple tracked objects. JSON exports contain source evidence, all candidate rejection reasons, simulated communication metrics, and the decision audit. Both architectures receive identical available observations and use the same safety policy.

Observation agents check timestamps. Orbit agents retain source-tagged signed miss distances and uncertainty at a synthetic common encounter plane. Coordination agents exchange records synchronously over an undirected graph, retaining source identity rather than treating repeated messages as independent measurements. Their reported arithmetic averages are descriptive only; risk screening uses every source estimate. A disconnected or incompletely informed node forces operator review.

Planning evaluates a fixed approved set including no action. A candidate's encounter displacement is `delta-v * time-to-closest-approach` in meters. Risk integrates an isotropic two-dimensional Gaussian over a circular combined hard-body region. Safety rejects candidates violating the example risk threshold, available delta-v budget, or secondary-encounter constraint. Source disagreement, missing/stale/delayed information, insufficient dissemination, and decision deadlines cause escalation, regardless of candidate votes. Recommendations never execute maneuvers; `commandsIssued` is always zero. Fuel is represented by a delta-v budget in m/s, not propellant mass.

Edit `defaultPolicy` or call `simulate(scenario, architecture, policy)` for experiments. Times are simulation seconds; all distances are meters. Seeds change the nominal tracking offsets. Latency is a configured simulation metric, not measured runtime; bytes count serialized ASCII evidence payloads, excluding protocol overhead. Centralized collection uses a fixed two-way link delay and assumes all available sources can reach the collector. Distributed rounds use synchronous per-hop delays. These are explicit comparison assumptions, not evidence of architectural superiority.

This is an initial decision-logic prototype, not high-fidelity orbital dynamics or an operational collision-probability service. It does not model covariance propagation/correlation, full maneuver geometry, propulsion, tracking updates over a time series, or post-maneuver orbit verification. The fixed disk quadrature is intended for the bundled scale (10 m hard-body radius, 30 m uncertainty); extreme radius/uncertainty ratios require adaptive quadrature. Thresholds are illustrative and require mission-specific validation. The separate Python swarm backend is not changed or coupled to this model.
