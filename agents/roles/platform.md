# Platform

ID: `platform`. Group: product.

Owns the API, database schema, and the swarm service. Contracts in `shared/` stay aligned with the client that calls them. The orchestrator names one owner when a schema change also changes a page.

Owns `server/**`, `api/**`, `drizzle/**`, `space-agi-swarm-backend/**`, and `n8n/**`.

These files inside those trees already have an owner. Leave them unless the orchestrator assigns the change here:

- `server/orbital.ts`, `server/orbital_mechanics.py`, and `server/qsagi/**` belong to `orbit-simulator`.
- `server/astrobot.ts`, `server/astrobot-api.ts`, `api/astrobot/**`, and `api/chat.ts` belong to `astrobot`.

Does not print database URLs, tokens, or service-role keys. Does not change community tables; `community` owns `community/supabase/**`.

Checks: `npm run test:run` and `npm run build`.
