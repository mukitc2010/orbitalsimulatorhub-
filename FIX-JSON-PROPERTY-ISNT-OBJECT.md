# Fix: A 'json' property isn't an object [item 0]

## What it means

Some node is receiving or producing an item where `json` is not an object (e.g. a string). n8n expects each item to have `item.json` as an **object**.

---

## Fix 1: HTTP Request1 – Response format

If the error appears **after** HTTP Request1 (OpenAI), the response may be coming in as a string.

1. Click **HTTP Request1**.
2. Open **Settings** or **Options** (often at the bottom of the node).
3. Look for **"Response"** / **"Response Format"** / **"Put Output In"**.
4. Set it so the response is **parsed as JSON** (e.g. "JSON" or "Parse response as JSON"), not as raw string.
5. Save and run again.

---

## Fix 2: Build OpenAI Body – Return format

The Code node must return items whose `json` is always an **object**.

1. Click **Build OpenAI Body** (Code node).
2. Replace the code with this (safe for both "run once for all" and "run once for each item"):

```javascript
// Ensure we always return items with json as object
const items = $input.all();
const first = items[0];
const item = first && first.json && typeof first.json === 'object' ? first.json : {};
const prompt = item.prompt || 'Return ONLY valid JSON with title, summary, content, keywords, references.';
const body = {
  model: "gpt-4",
  messages: [{ role: "user", content: prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations." }],
  temperature: 0.7,
  max_tokens: 3000
};
const bodyStr = JSON.stringify(body);
return items.map(() => ({ json: { openAIBody: bodyStr } }));
```

3. Save and run again.

---

## Fix 3: Format Research Content – String response

If the OpenAI node returns the response as a **string**, the Format node must treat it as object.

The Format node has been updated so that when `json` is a string it parses it first: `inputData = typeof raw === 'string' ? JSON.parse(raw) : raw`. Re-import the workflow or paste the updated Format node code from the workflow file if you edit manually.

---

## Checklist

- [ ] **HTTP Request1**: Response/options set to return **JSON** (parsed), not raw string.
- [ ] **Build OpenAI Body**: Uses the code above and returns `{ json: { openAIBody: "..." } }` (object).
- [ ] **Format Research Content**: Handles string `json` by parsing it (already in updated workflow).

---

## If it still fails

Note **which node** shows the error (e.g. "Problem in node 'HTTP Request1'" or "Format Research Content"). That tells you whether the issue is the body sent to OpenAI, the OpenAI response, or the Format output.
