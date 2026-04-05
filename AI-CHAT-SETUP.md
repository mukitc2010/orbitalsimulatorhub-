# AI Chat — Your Own Platform

The floating chat widget uses **your** infrastructure. No ChatGPT or third-party chat UI — you control everything.

## How It Works

1. **ChatWidget** — Floating button (bottom-right) on every page. Click to open.
2. **API Route** — `api/chat.ts` (Vercel serverless) calls OpenAI on your behalf.
3. **Your API Key** — Stored securely in Vercel; never exposed to the browser.

## Setup (One-Time)

### 1. Get an OpenAI API Key

- Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Create a new key
- Add billing if needed ([platform.openai.com/account/billing](https://platform.openai.com/account/billing))

### 2. Add to Vercel

1. Open your project on [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** your key (e.g. `sk-...`)
   - **Environment:** Production (and Preview if you want)
4. **Save**
5. **Redeploy** (Deployments → ⋮ → Redeploy)

### 3. Local Development

Create `.env` in the project root:

```
OPENAI_API_KEY=sk-your-key-here
```

Run:

```bash
npm run dev
```

Vite + the API server run together. The chat uses `/api/chat` (proxied to Express locally, serverless on Vercel).

## Customize

- **System prompt:** Edit `api/chat.ts` → `SYSTEM_PROMPT` to change the AI's personality and focus.
- **Model:** Change `model: "gpt-4o-mini"` to `gpt-4o` for higher quality (more cost).
- **Widget style:** Edit `client/src/components/ChatWidget.tsx` — colors, position, suggestions.

## Cost

- **gpt-4o-mini:** ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Typical chat: ~500–1000 tokens per exchange ≈ $0.001–0.002 per message
- Monitor usage at [platform.openai.com/usage](https://platform.openai.com/usage)
