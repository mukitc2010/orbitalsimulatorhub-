# Post Everywhere — Get More Views

When `npm run openclaw:update` runs (every 6h), it can post your latest blog to:

- **LinkedIn** — Direct API (LINKEDIN_ACCESS_TOKEN)
- **Twitter, Medium, Reddit, etc.** — Via webhook → Zapier/Make

---

## 1. LinkedIn (Direct)

See `LINKEDIN-SETUP.md`. Add to `.env`:

```
POST_TO_SOCIAL=1
LINKEDIN_ACCESS_TOKEN=your_token
```

---

## 2. Twitter, Medium, Reddit via Zapier

### Step 1: Create a Zapier Webhook

1. Go to [Zapier](https://zapier.com) → Create Zap
2. **Trigger:** Webhooks by Zapier → Catch Hook
3. Copy the webhook URL (e.g. `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)

### Step 2: Add to .env

```
POST_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY/
```

### Step 3: Add Actions in Zapier

The webhook receives this JSON:

```json
{
  "title": "Blog post title",
  "excerpt": "Short description...",
  "url": "https://www.orbitalsimulatorhub.com/blog/slug",
  "slug": "slug",
  "text": "Full post text with hashtags",
  "platform": "orbitalsimulatorhub"
}
```

Add actions to post to:
- **Twitter/X** — Use `text` (max 280 chars; Zapier will truncate or you can use `excerpt` + `url`)
- **Medium** — Create story with `title`, `excerpt`, `url`
- **Reddit** — Submit link with `url` and `title`
- **Facebook** — Link post
- **Pinterest** — Pin with image + link

### Step 4: Test

Run manually:
```powershell
cd c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web
$env:POST_TO_SOCIAL="1"
npm run openclaw:update
```

Check Zapier to see the webhook fire, then publish your Zap.

---

## 3. Make.com (Alternative to Zapier)

Same idea: create a webhook scenario, add the URL to `POST_WEBHOOK_URL`, then add HTTP/API modules to post to each platform.

---

## Summary

| Platform | How |
|----------|-----|
| LinkedIn | `LINKEDIN_ACCESS_TOKEN` in .env |
| Twitter, Medium, Reddit, etc. | `POST_WEBHOOK_URL` → Zapier/Make |

Both run automatically every 6 hours when the News Update task runs.
