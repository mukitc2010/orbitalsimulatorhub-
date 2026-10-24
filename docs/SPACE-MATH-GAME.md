# Orbital Gauntlet

Play at `/games/space-math`. The home page and main navigation link to the game.

Six deterministic, generated numerical missions cover circular speed, elliptical period, two-impulse Hohmann transfers, pure plane changes, ideal rocket propellant sizing, and heliocentric transfer time. Every problem supplies its assumptions, units and constants; solutions explain intermediate steps. These are educational idealized models, not operational flight guidance.

Participation is open without an account. Daily mission codes use the UTC date; invitation links include a mission code and mode so participants receive identical problems. Flight academy allows 20 minutes and 1% relative error; expert allows 12 minutes and 0.25%; practice is untimed and unranked. All six mission types occur in each flight, with seeded numerical variations.

Each problem permits three numerical submissions. Invalid syntax costs no attempt. Correct answers earn 1,000 points minus 150 per miss and 250 if a hint was opened, plus 50 per prior consecutive clear (maximum 200). Skipping or exhausting attempts earns zero and reveals the worked solution. Clearing all six within the deadline earns up to 200 extra based on remaining time. Rounds can be ended early for a debrief.

Active progress and deadlines are saved in browser localStorage when available. Reloading keeps the original deadline. A shared link to a different challenge is honored rather than silently resuming unrelated questions; starting it replaces the saved active flight. Records include an optional call sign and the best 20 timed runs on this device. Practice runs are excluded.

There is no server leaderboard, identity verification, live multiplayer, payment or prize system. Browser records can be edited; they are not trusted tournament results. No player data is sent to a new server endpoint. Share links can be copied manually when clipboard access is unavailable. Storage failures do not prevent playing.

Implementation: `client/src/lib/spaceMath/engine.ts`, `client/src/pages/SpaceMathGame.tsx`, and the associated CSS/tests. Run `npm run test:run` and `npm run build` with the Node version in `.nvmrc`.
