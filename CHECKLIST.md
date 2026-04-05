# OrbitalSimulatorHub — Setup Checklist

Quick verification of your full setup.

---

## ✅ LinkedIn (for auto-posting)

| Item | Status |
|------|--------|
| LinkedIn app created | ✓ |
| Share on LinkedIn product added | ✓ |
| Redirect URL: `http://localhost:3999/callback` | ✓ |
| **Create `.env`** with: | |
| `LINKEDIN_CLIENT_ID=86x2kb7f2pr2tl` | ⬜ |
| `LINKEDIN_CLIENT_SECRET=your_secret` | ⬜ |
| Run `node scripts/linkedin-get-token.js` | ⬜ |
| Add `LINKEDIN_ACCESS_TOKEN=...` to .env | ⬜ |
| Add `POST_TO_SOCIAL=1` to .env | ⬜ |

---

## ✅ OpenClaw (scheduler)

| Item | Status |
|------|--------|
| Gateway running (`openclaw gateway`) | ✓ |
| Cron: News every 6h | ✓ (may show error if agent lacks shell access) |
| Cron: SEO every 2h | ✓ |
| Agent has shell/exec enabled | ⬜ Check `openclaw configure` |

---

## ✅ Content & SEO

| Item | Status |
|------|--------|
| Content agent (4 affiliate products per post) | ✓ |
| Auto SEO (sitemap every 2h) | ✓ |
| Home page shows latest posts | ✓ |
| AI & Space advanced content (MPC, LQR, etc.) | ✓ |

---

## ✅ Deployment

| Item | Status |
|------|--------|
| GitHub connected | ✓ |
| Vercel deploy on push | ✓ |
| Live: www.orbitalsimulatorhub.com | ✓ |

---

## ⚠️ Action required

1. **Create `.env`** in project root (copy from `.env.example`).
2. Add LinkedIn credentials and run token script.
3. Ensure OpenClaw agent can run shell commands (fixes 6h job error).
