# How to run the app

## Step 1: Open a terminal in the project folder

```bash
cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
```

## Step 2: Install dependencies (first time only)

```bash
npm install --legacy-peer-deps
```

## Step 3: Start the app

**Recommended – Vite + API (fixes blank page / CSS 404)**

```bash
npm run dev
```

This starts:
- **Frontend** (Vite) at **http://localhost:3000** – open this in your browser. CSS and all assets load correctly.
- **API** at http://localhost:3001 – Vite proxies `/api` to it automatically.

Wait until you see both lines:
- `VITE ready in ...`
- `API at http://localhost:3001/api/trpc`

**Port 3000 already in use?** (e.g. you see FaithSlack or another app)

```bash
npm run dev:3002
```

Then open **http://localhost:3002** — the satellite simulator runs on 3002, API on 3003.

**Other options**

- **Single process** (frontend + API on one port): `npm run dev:single` then open http://localhost:3000
- **Frontend only** (no simulator presets): `npm run dev:vite` then open http://localhost:3000
- **API only** (e.g. for debugging): `npm run dev:api` – API on port 3001

## Step 4: Open in the browser

Go to **http://localhost:3000**

Click **“Start Playing & Learning”** or use the **Play & Learn** menu.

---

## If something’s wrong

- **You see a different app** (e.g. FaithSlack) on localhost:3000 – That app is using port 3000. Run `npm run dev:3002` and open **http://localhost:3002**.
- **Blank or unstyled page** – Use `npm run dev` or `npm run dev:3002`. Hard refresh (Ctrl+Shift+R).
- **Node not found** – Install Node.js from https://nodejs.org (LTS).
- **Port in use** – Use `npm run dev:3002` (app on 3002, API on 3003).
