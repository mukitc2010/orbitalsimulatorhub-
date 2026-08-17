# Publishing to the Apple App Store & Google Play

Everything in this folder is store-ready: bundle identifiers, icons, splash screen and
EAS build profiles are configured. Publishing itself requires **your** developer
accounts (Apple and Google review every app and sign it against your identity), so the
final submission steps below are run by you — each one is a single command.

## 0. One-time prerequisites

| What | Where | Cost |
|---|---|---|
| Apple Developer account | https://developer.apple.com/programs/enroll/ | $99/year |
| Google Play Console account | https://play.google.com/console/signup | $25 once |
| Expo account (free) | https://expo.dev/signup | free |

Install the EAS CLI and log in:

```bash
npm install -g eas-cli
cd mobile
eas login
eas init   # links this project to your Expo account (writes projectId into app.json)
```

## 1. Build both apps in the cloud

No Mac or Android Studio needed — EAS builds in the cloud:

```bash
eas build --platform all --profile production
```

- **iOS**: on first run EAS asks for your Apple ID and automatically creates the
  signing certificate + provisioning profile for `com.orbitalsimulatorhub.app`.
- **Android**: EAS generates and stores the upload keystore for you.

The result is an `.ipa` (iOS) and an `.aab` (Android app bundle).

## 2. Test on real devices first (recommended)

```bash
eas build --platform android --profile preview   # installable .apk
```

For iOS, upload the production build to **TestFlight** (step 3 does this) and invite
yourself as a tester.

## 3. Submit — iOS (App Store)

1. Create the app record once in [App Store Connect](https://appstoreconnect.apple.com):
   **My Apps → + → New App**, bundle ID `com.orbitalsimulatorhub.app`.
2. Upload the build:
   ```bash
   eas submit --platform ios
   ```
3. In App Store Connect fill in the listing:
   - **Name**: Orbital Simulator Hub
   - **Subtitle**: 3D Satellite Orbit Simulator
   - **Category**: Education (secondary: Reference)
   - **Description**: use the store copy below
   - **Screenshots**: run the app in the iOS Simulator (or a device) and capture the
     Home, Simulator, Learn and Quiz screens (6.7" and 6.5" sizes required)
   - **Age rating**: 4+ · **Privacy**: “Data not collected” (the app is fully offline)
4. Click **Submit for Review**. Approval typically takes 1–3 days.

## 4. Submit — Android (Google Play)

1. Create the app once in [Play Console](https://play.google.com/console):
   **Create app**, package `com.orbitalsimulatorhub.app`, Free, Education.
2. Complete the *App content* checklist (privacy, ads = none, data safety = no data
   collected, target audience).
3. Upload the build:
   ```bash
   eas submit --platform android
   ```
   (First time: Play Console requires the very first `.aab` to be uploaded manually
   through **Internal testing → Create release**; after that `eas submit` works with a
   [service-account key](https://docs.expo.dev/submit/android/).)
4. Promote Internal testing → Production and roll out. First review takes a few days.

## 5. Store listing copy (ready to paste)

**Short description** (Google Play, ≤80 chars)

> Launch satellites around a 3D holographic Earth with real orbital physics.

**Full description**

> **Orbital Simulator Hub** puts a futuristic mission-control deck in your pocket.
>
> 🛰 **3D Orbit Simulator** — Deploy satellites into Low Earth Orbit, GPS-style Medium
> Earth Orbit, or geostationary orbit around a glowing holographic Earth. Watch neon
> orbit trails, time-warp up to 3600×, drag to orbit the camera and pinch to zoom.
> Every orbit is computed with real Kepler orbital mechanics — the same equations
> mission planners use.
>
> ∑ **Learn** — Newton's three laws explained simply, plus a live calculator for
> orbital speed, period and escape velocity at any altitude.
>
> ★ **Quiz Deck** — Space fun facts and an astronaut-training quiz. Can you reach
> Mission Commander rank?
>
> 📴 Works fully offline. No ads, no accounts, no data collection.

**Keywords (iOS)**: satellite, orbit, space, simulator, physics, NASA, 3D, astronomy,
education, kepler

## 6. Updating the app later

Bump `version` in `app.json` (EAS auto-increments build numbers), then:

```bash
eas build --platform all --profile production
eas submit --platform ios
eas submit --platform android
```

## Troubleshooting

- **Build fails on dependency resolution** — delete `node_modules` and `package-lock.json`, then `npm install`.
- **iOS signing issues** — run `eas credentials` and choose *reset* for the profile.
- **Play Console rejects first submit via CLI** — upload the first `.aab` manually (see step 4.3).
- Docs: https://docs.expo.dev/build/introduction/ · https://docs.expo.dev/submit/introduction/
