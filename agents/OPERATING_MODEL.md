# Orbitalsimulatorhub Agent Operating Model

## Purpose

This registry defines 10 agents. Each agent is one owner for one part of the product. The machine-readable source of truth is [`registry.json`](registry.json). A change that touches two owners needs the chief orchestrator to name a single implementation owner before the edit starts.

The previous registry listed 139 roles. Two of those roles had a written procedure. The prose totals (1 + 12 + 108 + 20 + 8) added up to 149, while `totalAgents` said 139. That list is retired.

## Why 10

The site is one public app, one orbital simulator, one tutor, one publishing pipeline, one API, one community app, and one robot simulator. Quality and release stay independent of the person who built the change. Adding a seat for typography, shaders, or changelog created a name with no path and no check.

| Group | Agents | Count |
|---|---|---|
| Orchestration | chief-orchestrator | 1 |
| Product | public-site, orbit-simulator, astrobot, content, platform, community, astronaut-robot | 7 |
| Control | quality-security, release | 2 |
| **Total** | | **10** |

## Delivery flow

1. The chief orchestrator writes a scoped work item and names one implementation owner.
2. That owner works on a feature branch or `pre-production`, inside the paths in its charter.
3. Quality and security review the change. The reviewer is not the implementation owner.
4. `.github/workflows/pre-production.yml` runs the test and build checks and deploys a Vercel preview.
5. The release agent promotes only that tested commit to `main`.
6. Vercel deploys production from `main`. Rollback uses a known-good production commit.

## Non-negotiable controls

- No agent pushes directly to `main`.
- No agent may access, print, or commit secrets.
- Each agent stays inside its assigned paths unless the orchestrator names it as the owner of a cross-path change.
- Research and news copy cites the source. The daily news procedure is [DAILY_SPACE_NEWS_EDITOR.md](DAILY_SPACE_NEWS_EDITOR.md). It does not claim to verify the reporting.
- The ORACLE mission procedure is [ORACLE_LOOP_ENGINEER.md](ORACLE_LOOP_ENGINEER.md). It belongs to the astrobot agent.
- Browser APIs, live orbital data, voice, WebXR, analytics, and external publishing need explicit consent and credentials.

## Required evidence for promotion

- `npm run agents:check`
- `npm run test:run`
- `npm run build`
- Vercel preview status when the public site changed
- Review of UI, accessibility, security, and source claims where the change touches them
- A short release note and a rollback commit

`npm run agents:check` fails if `totalAgents`, the group counts, and the charter files disagree.
