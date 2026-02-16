# How to Develop & Make the Simulator More Understandable

## 1. How to develop the simulator (technical)

### Run and test locally
```bash
cd satellite_simulator_web
npm install --legacy-peer-deps
npm run dev
```
Open http://localhost:3000 → go to **Simulator** or **Play & Learn**.

### Key files
| What | Where |
|------|--------|
| Simulator page (state, play/step, layout) | `client/src/pages/Simulator.tsx` |
| 3D view (Earth, satellites, trails) | `client/src/components/EarthVisualization.tsx` |
| Orbit info panel (height, period, speed) | `client/src/components/SimulatorInfoPanel.tsx` |
| Create-satellite form (presets, inputs) | `client/src/components/SatelliteCreationForm.tsx` |
| Orbital math (Kepler → position, propagate) | `client/src/orbitalClient.ts` |
| Presets (LEO/MEO/GEO), period, speed helpers | `client/src/orbitalUtils.ts` |
| Gravity / “Why it matters” panel | `client/src/components/GravityLearnPanel.tsx` |

### Change behavior
- **Add a new preset:** Edit `getOrbitTemplateClient()` in `orbitalUtils.ts` and the presets list in `const.ts`.
- **Change step size or speeds:** `Simulator.tsx` uses `STEP_SEC = 60` and `SIM_SPEEDS` from `const.ts`.
- **Show more satellites in the info panel:** Right now only the first satellite is shown; change `SimulatorInfoPanel` to accept a selected ID or show a list.
- **New formula or display:** Add fields in `SimulatorInfoPanel` (e.g. apogee/perigee) using `orbitalUtils` and `orbitalClient`.

### Keep it understandable
- When you add a new number (e.g. “apogee”), add a one-line explanation in the panel: what it is and why it matters.
- Use the **ExplainBox** component for short “Why this matters” callouts (see `Simulator.tsx`).
- Link new terms to the **Guide** (`/guide`) or **Formulas** (`/learn/formulas`) where you explain them in depth.

---

## 2. How to make the simulator more understandable (for users)

### Principles
1. **One concept at a time** — Don’t show every parameter at once. Presets (LEO, MEO, GEO) first; advanced numbers second.
2. **Always explain the number** — Next to every value (height, period, speed), add a short “what it is” and “why it matters.”
3. **Connect to the real world** — Use “Like the ISS,” “Like GPS,” “Like weather satellites” so users can relate.
4. **Point to next steps** — “Read the Guide” and “Formulas page” for the math.

### What’s already in place
- **How to use** — 3 steps at the top (Add satellite → Play/Step → Read numbers).
- **Why these numbers matter** — ExplainBox: same physics as NASA, real-world accurate.
- **Orbit info panel** — Height, period, speed each have a short explanation line.
- **Presets** — LEO/MEO/GEO with “click to add” and real-world labels.
- **Mission** — “Add LEO, MEO, GEO and compare” callout.
- **Guide** — `/guide` explains the screen, presets, buttons, and numbers.
- **Formulas** — `/learn/formulas` for gravity and orbital speed.

### Ideas to develop further (understandability)
1. **Tooltips** — On “Height above Earth,” “Orbital period,” etc., add a `title` or a small (?) that shows one sentence when hovered.
2. **“What is LEO?” links** — Next to each preset, add a link to the Guide or a short modal: “LEO = Low Earth Orbit, ~400 km, like the ISS.”
3. **Comparison mode** — When 2+ satellites exist, show a small table: name, height, period, speed side by side so users can compare.
4. **First-time hint** — A dismissible banner: “New? Add LEO, press Play, then read the numbers below.”
5. **Glossary** — A “Simulator glossary” section in the Guide (or a `/simulator/glossary` page): orbit, LEO, MEO, GEO, period, altitude, thrust, etc.
6. **Short video or GIF** — “Watch: add LEO → Play → see the orbit” in the Guide or on the Simulator page.
7. **Simple “story”** — One line above the 3D view: “You’re looking at Earth from space. The dots are satellites; the line is the path each one has taken.”

---

## 3. Quick checklist when you add something

- [ ] Every new number or term has a **one-line explanation** (what it is, why it matters).
- [ ] **Presets** stay the main way to add satellites; advanced form is optional.
- [ ] **Real-world labels** (ISS, GPS, weather) are used where they fit.
- [ ] There’s a **path to learn more** (Guide or Formulas) for users who want detail.
- [ ] **First-time users** can succeed with “Add LEO → Play” and the existing “How to use” steps.

Use this doc as you develop: focus new features on clarity and one-concept-at-a-time, and keep linking to the Guide and Formulas so the simulator stays understandable.
