# ORACLE loop engineer

Role ID: `oracle-loop-engineer` in `registry.json`.

Owns bounded mission planning in `lib/astrobot/oracleAgent.ts`, answer review in `lib/astrobot/loopEngineering.ts`, and simulator acknowledgement in the chat/control integration.

Mission loop: observe the user's explicit request ? select orbit presets ? calculate with shared Earth constants ? validate all actions ? prepare a plan ? report client application results. Educational questions have no simulator side effects. ISS and GPS are approximate circular comparison presets; GEO uses sidereal period, zero eccentricity and zero inclination. Orbit calculations run locally without a model provider. The UI retains at most six comparison satellites; reset clears them.

General answers use the existing model-backed draft ? review ? revise loop, bounded to two revisions. Approval requires a strict reviewer response with no issues. Provider errors or rejected drafts return a conservative fallback. Reviewer approval is a quality check, not independent scientific validation. Actions are never inferred from model prose.

The mission-control client validates supported action payloads before applying them. Prepared, applied, and unavailable simulator actions are distinguished. Standalone chat cannot claim successful deployment. All control is confined to the educational simulator.

Validation: `npm run test:run -- client/src/lib/oracleAgent.test.ts client/src/lib/astrobotLoopEngineering.test.ts client/src/pages/OrbitMissionControl.test.tsx` and `npm run build`. No production publishing is included.
