# Use Ollama Instead of OpenAI (Local, Free, Every 24h)

You can use **Ollama** on your laptop to generate research content and still post it to your website every 24 hours. No OpenAI API key or credits needed.

---

## How it works

1. **Schedule Trigger (Daily)** runs every 24 hours.
2. **Select Research Topic** picks a topic and builds the request body (same as now).
3. **HTTP Request1** calls **Ollama** at `http://localhost:11434/v1/chat/completions` instead of OpenAI.
4. **Format Research Content** and **Post Research Content** stay the same → data goes to your API and site.

Ollama’s API is OpenAI-compatible (same `model` + `messages` body), so the workflow stays almost the same.

---

## Step 1: Have Ollama running

- Install: https://ollama.com
- In a terminal run: `ollama serve` (or start Ollama so it’s running in the background).
- Pull a model, e.g.: `ollama pull llama3.2` or `ollama pull mistral`
- Keep Ollama running whenever you want the workflow to run (e.g. 24h schedule).

---

## Step 2: Use an Ollama model in Select Research Topic

In the **Select Research Topic** Code node, set the **model** in `openAIBody` to an **Ollama model name**, for example:

- `llama3.2` (recommended)
- `mistral`
- `llama2`
- `codellama`
- Or any model you installed with `ollama pull <name>`

**In the code, change the model line to:**

```javascript
model: 'llama3.2',   // or 'mistral', 'llama2', etc.
```

So the block looks like:

```javascript
const openAIBody = JSON.stringify({
  model: 'llama3.2',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
});
```

Save the node.

---

## Step 3: Point HTTP Request1 to Ollama

1. Open **HTTP Request1**.
2. **URL:** change from  
   `https://api.openai.com/v1/chat/completions`  
   to  
   `http://localhost:11434/v1/chat/completions`
3. **Authentication:** set to **None** (Ollama on localhost doesn’t need an API key).
4. **Body:** keep **Using JSON** with expression **`{{ $json.openAIBody }}`** (same as now).

Save the node.

---

## Step 4: Rest of the workflow (unchanged)

- **Format Research Content** → parses Ollama’s response (same shape as OpenAI: `choices[0].message.content`).
- **Post Research Content** → POST to `http://localhost:3001/api/research/content`.
- Your site gets new content every 24 hours from the schedule.

---

## Checklist

| Item | Value |
|------|--------|
| Ollama | Installed and running (`ollama serve` or app running) |
| Model pulled | e.g. `ollama pull llama3.2` |
| Select Research Topic | `model: 'llama3.2'` (or your model name) in `openAIBody` |
| HTTP Request1 URL | `http://localhost:11434/v1/chat/completions` |
| HTTP Request1 Auth | None |
| Body | `{{ $json.openAIBody }}` |

---

## Summary

- **Yes:** Ollama can act like “OpenAI” for this workflow: it generates the data that you then upload to your website.
- **Yes:** With the **Schedule Trigger (Daily)** you get **new topics every 24 hours**.
- **Cost:** Free (runs on your laptop; no OpenAI credits).
- **Requirement:** Ollama must be running (and n8n must run on the same machine or reach `localhost:11434`) when the workflow runs.

If you want, we can add a small “use Ollama” vs “use OpenAI” switch (e.g. one variable in the workflow) so you can flip between them without editing URLs and model names by hand.
