# Orbital Mechanics Satellite Simulator

Interactive web-based satellite simulator with 3D visualization, educational content, and real-time orbital mechanics. For everyone who wants to learn about NASA and orbital mechanics.

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm or npm
- (Optional) Python 3.11+ for `server/orbital_mechanics.py`
- (Optional) MySQL/TiDB for saving satellites and ground stations

### Installation

```bash
cd satellite_simulator_web
npm install --legacy-peer-deps
```

### Run development server

```bash
npm run dev
```

This starts **Vite** (frontend) at **http://localhost:3000** and the **API** on port 3001. Open http://localhost:3000 in your browser. CSS and all assets load correctly (no blank page). For more options see **HOW-TO-RUN.md**.

### Environment (optional)

Create a `.env` file for database and config:

```
DATABASE_URL=mysql://user:password@localhost:3306/satellite_sim
PORT=3000
NODE_ENV=development
```

If `DATABASE_URL` is not set, the app still runs; satellite/ground-station persistence will use in-memory behavior when the DB is unavailable.

### Database (optional)

```bash
pnpm db:generate
pnpm db:migrate
```

### Build and run production

```bash
pnpm build
NODE_ENV=production pnpm start
```

## Project structure

- **client/** — React 19 + Tailwind + Three.js frontend
- **server/** — Express + tRPC backend, orbital logic (TypeScript + optional Python)
- **shared/** — Shared types and constants
- **drizzle/** — Schema and migrations

## Features

- **3D Simulator** — Add satellites (LEO/MEO/GEO presets or custom elements), play/pause/step, speed control, orbit trails
- **Newton's Laws** — Short explanations of inertia, F=ma, action-reaction
- **Formulas** — Gravity, orbital speed, weight, escape velocity with simple calculators
- **Fun facts & quiz** — Space trivia and multiple-choice quiz
- **Learn NASA** — Missions, astronauts, rovers, solar system; AstroBot Q&A

## Tech stack

- Frontend: React 19, Tailwind CSS 3, Three.js, React Three Fiber, Wouter, tRPC client
- Backend: Express 4, tRPC 11, Drizzle ORM, MySQL 2
- Orbital mechanics: TypeScript (client + server); optional Python script in `server/orbital_mechanics.py`

## License

MIT.
