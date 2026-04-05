# Fix: "Every key named 'json' must point to an object"

n8n is strict: **any value under `json` must be an object**, so a string like `openAIBody: bodyStr` triggers the error.

---

## Option 1: Return without `json` wrapper (try this first)

Let the Code node return a **plain** object (no `json:`). n8n may auto-wrap it and skip the strict check.

**In the Build OpenAI Body Code node, use exactly:**

```javascript
// No 'json' wrapper - let n8n auto-wrap
const item = $input.item.json;
const prompt = item.prompt || 'Return ONLY valid JSON with title, summary, content, keywords, references.';
const body = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
};
return [{ openAIBody: JSON.stringify(body) }];
```

- **HTTP Request1** body expression: **`={{ $json.openAIBody }}`**
- Save and run. If you still get the same error, use Option 2.

---

## Option 2: No Code node – build body in HTTP Request1

Remove the **Build OpenAI Body** node and build the body in the HTTP Request node.

### Step 1: Remove Build OpenAI Body

1. Delete the **Build OpenAI Body** node.
2. Connect **Select Research Topic** → **HTTP Request1**.

### Step 2: Set body in HTTP Request1

1. Open **HTTP Request1**.
2. **Send Body:** ON.
3. **Body Content Type:** JSON.
4. Find how the body is specified (e.g. **Specify Body** / **Body**).
5. Switch the body field to **Expression** (e.g. "Expression" or "Using Expression", or the `fx` icon).
6. In the expression field, paste:

```javascript
={{ JSON.stringify({ model: 'gpt-4', messages: [{ role: 'user', content: $json.prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }], temperature: 0.7, max_tokens: 3000 }) }}
```

7. Save and run.

If your n8n version doesn’t have an expression mode for the body, use a **Rename** or **Edit Fields** node to build the body from `$json.prompt` and then reference that in the HTTP Request.

---

## Summary

- **Option 1:** Code node returns `[{ openAIBody: JSON.stringify(body) }]` (no `json:`). HTTP Request1 uses `={{ $json.openAIBody }}`.
- **Option 2:** No Build OpenAI Body; **Select Research Topic** → **HTTP Request1** and body = expression above.

Try Option 1 first; if the error persists, use Option 2.
