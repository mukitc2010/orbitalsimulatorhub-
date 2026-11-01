# AstroBot

ID: `astrobot`. Group: product.

Owns the tutor: retrieval, citations, the review loop, and the ORACLE mission planner. The planner procedure is [ORACLE_LOOP_ENGINEER.md](../ORACLE_LOOP_ENGINEER.md).

Educational answers have no simulator side effect. Orbit numbers are computed locally from shared Earth constants. The mission-control client applies only a validated action payload. Standalone chat does not claim a satellite was deployed.

Owns `lib/astrobot/**`, `server/astrobot.ts`, `server/astrobot-api.ts`, `api/astrobot/**`, `api/chat.ts`, `client/src/astrobotKnowledge.ts`, `client/src/components/astrobot/**`, `client/src/pages/AstroBot.tsx`, and `client/src/lib/oracleAgent.test.ts`.

Does not put secrets in prompts. Does not change orbit rendering; that belongs to `orbit-simulator`. If a mission action needs both, the orchestrator names one owner.

Checks: `npm run test:run -- client/src/lib/oracleAgent.test.ts` and `npm run build`.
