# ORACLE — ASI Mission Control Agent

ORACLE (Orbital Reasoning And Control Engine) is the site's AI agent with **real
tools** — not just a chatbot. It lives at **`/asi-mission-control`**.

## What it can do

| Tool | What happens |
|---|---|
| `orbital_calculator` | Runs the site's actual physics (μ = 398600.4418 km³/s²): speed, period, escape velocity for any altitude |
| `deploy_satellite` | Queues LEO/MEO/GEO deployments — the user gets an **Execute in Simulator** button that opens `/simulator` with those satellites deployed and playing |
| `set_simulation` | Queues playback settings (play, 1×–8× time warp) |
| `search_site_knowledge` | Answers from a curated knowledge base about the site and spaceflight |

The agent runs a multi-step tool loop server-side (up to 6 rounds per message),
so it can calculate, compare, and plan deployments in a single reply.

## Setup (one step)

Add your Anthropic API key in **Vercel → Project → Settings → Environment Variables**:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at https://platform.claude.com. Redeploy after adding it.

## Architecture

- **`api/asi-agent.ts`** — Vercel serverless function. Claude Opus 5
  (`claude-opus-5`) with adaptive thinking, medium effort, prompt caching on the
  system prompt, and server-side refusal fallbacks enabled. Manual tool loop;
  returns `{ reply, actions, toolTrace }`.
- **`client/src/pages/ASIMissionControl.tsx`** — the mission-control HUD chat.
  Renders tool-trace chips and turns queued actions into a
  `/simulator?deploy=LEO,MEO&play=1&speed=4` deep link.
- **`client/src/pages/Simulator.tsx`** — reads those query params on mount and
  auto-deploys/plays, so agent orders execute in the real 3D scene.

The older OpenAI-powered chat (`api/chat.ts`) is untouched and coexists.

## Costs & safety

- Each message is one short Claude conversation (system prompt is cached, so
  repeat traffic is cheap). History is capped at 12 turns, 4,000 chars each.
- The agent has no write access to anything — its only "actions" are simulator
  deployments executed client-side by the visitor's own browser.
- Refusal fallbacks are enabled: if a safety classifier declines a request, the
  API automatically re-serves it with the recommended fallback model.
