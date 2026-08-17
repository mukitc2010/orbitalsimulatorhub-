# Orbital Simulator Hub — Mobile App (iOS + Android)

Futuristic 3D-animated satellite orbit simulator for phones and tablets, built with
**Expo (React Native)** and **Three.js** rendered through native OpenGL (`expo-gl`).
One codebase ships to both the Apple App Store and Google Play.

## Features

- 🛰 **3D Simulator** — a procedurally-shaded *holographic Earth* (glowing continents,
  fresnel atmosphere, animated scanlines, city lights) with satellites propagated by
  real Kepler orbital mechanics. Deploy LEO / MEO / GEO satellites, watch glowing
  orbit trails, pause and time-warp up to 3600×, drag to orbit the camera, pinch to zoom.
- 🌌 **Futuristic UI** — deep-space neon theme, animated twinkling starfields,
  glassmorphism panels, glowing orbit emblem on the home screen.
- ∑ **Learn** — Newton's three laws plus a live orbit calculator
  (v = √(μ/r), T = 2π√(a³/μ), escape velocity) using the same constants as the web simulator.
- ★ **Quiz Deck** — rotating space fun facts and an 8-question astronaut quiz with ranks.
- 📴 **Fully offline** — the Earth and all effects are GPU shaders; no textures, no network.

## Physics

The engine in `src/physics/orbital.ts` mirrors the web app (`client/src/orbitalUtils.ts`):
μ = 398 600.4418 km³/s², Earth radius 6371 km, Kepler's equation solved by Newton
iteration, positions computed in perifocal coordinates and rotated to ECI by
RAAN / inclination / argument of perigee.

## Run it locally

```bash
cd mobile
npm install
npm start          # scan the QR code with the Expo Go app (iOS/Android)
```

> The 3D simulator uses `expo-gl`, which runs in Expo Go — no custom native build
> needed for development.

## Project layout

```
mobile/
├── App.tsx                     # Root + futuristic tab bar
├── app.json                    # Expo config: bundle IDs, icons, splash
├── eas.json                    # EAS Build/Submit profiles (App Store & Play Store)
├── assets/                     # icon.png, adaptive-icon.png, splash.png (generated)
├── scripts/generate-assets.js  # Procedural icon/splash generator (pure Node)
└── src/
    ├── theme.ts                # Neon design tokens
    ├── physics/orbital.ts      # Kepler propagation, presets, formulas
    ├── three/OrbitalScene.ts   # Three.js scene: shader Earth, satellites, trails
    ├── components/             # GlassCard, NeonButton, Starfield, ScreenShell
    ├── data/content.ts         # Fun facts + quiz questions
    └── screens/                # Home, Simulator, Learn, Quiz
```

## Ship to the app stores

See **[APP-STORE-PUBLISHING.md](./APP-STORE-PUBLISHING.md)** for the complete
step-by-step guide (EAS Build → TestFlight / Internal testing → production release).
Short version:

```bash
npm install -g eas-cli
eas login
eas build --platform all --profile production
eas submit --platform ios
eas submit --platform android
```

Bundle IDs are already configured: `com.orbitalsimulatorhub.app` on both platforms.

## Regenerating icons

```bash
npm run generate:assets
```
