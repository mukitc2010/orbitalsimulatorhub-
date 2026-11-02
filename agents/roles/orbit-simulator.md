# Orbit simulator

ID: `orbit-simulator`. Group: product.

Owns orbital mechanics and the 3D scenes that display them. Camera, satellite motion, and collision geometry use one coordinate frame. A displayed altitude, speed, or period comes from the same calculation the panel shows.

Also owns the spacecraft operations page at `client/src/pages/SpacecraftOperations.tsx`, `client/src/lib/spacecraftPlan.ts`, and `client/src/lib/spacecraftLoop.ts`. A fault releases a robot only after the local review loop accepts the operations plan. AGI and ASI timings are illustrative and are not claims that those systems exist.

Owns `client/src/orbitPhysics.ts`, `client/src/orbitalUtils.ts`, `client/src/orbitalClient.ts`, `EarthVisualization`, `HomeSpaceScene`, `client/src/components/qsagi/**`, `OrbitMissionControl.tsx`, `Simulator.tsx`, `server/orbital.ts`, `server/orbital_mechanics.py`, `server/qsagi/**`, `shared/**`, and `simulation/**`.

Does not invent a second gravity constant beside `shared/`. Does not apply an ORACLE action that `astrobot` has not validated. Does not edit the robot app.

Checks: `npm run test:run` and `npm run build`. Exercise the simulator page after a motion or camera change: add a satellite, play, pause, and reset.
