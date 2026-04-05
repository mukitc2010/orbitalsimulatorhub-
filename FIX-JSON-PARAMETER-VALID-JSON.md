# Fix: "JSON parameter needs to be valid JSON"

## Why This Happens

n8n treats the JSON body as literal JSON. If you use `={{ $json.prompt }}` inside the text, the editor can see invalid JSON (e.g. unquoted expression), so it throws "JSON parameter needs to be valid JSON".

## Fix: Use One Expression for the Whole Body

Build the whole body with a single expression so n8n always sends valid JSON.

---

## Step-by-Step

1. Open **HTTP Request1**.
2. **Send Body:** ON.
3. **Body Content Type:** JSON.
4. **Specify Body:** choose **"Using JSON"** (or **"Using Expression"** if you have it).
5. In the **JSON** (or expression) field, **delete everything** and paste **only one of the options below**.

---

## Option A: Expression (recommended)

Use this so the prompt from the previous node is included:

**Paste this exactly (one line):**

```
={{ JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: $json.prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations." }], temperature: 0.7, max_tokens: 3000 }) }}
```

- If n8n has a **"Expression"** or **"Using Expression"** toggle for the body, turn it **on** and paste the line above in the expression field.
- If there is only one body field, paste the line above there (n8n will treat `={{ ... }}` as an expression).

---

## Option B: Literal JSON (no dynamic prompt)

Use this only to test that the node runs (prompt will be fixed text):

1. **Specify Body:** **Using JSON**.
2. Paste this **exactly** (no expression, no extra spaces):

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "Return ONLY valid JSON with title, summary, content, keywords, references."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 3000
}
```

- No `={{ }}`, no `$json.prompt` — then the JSON is always valid.
- After you confirm the node runs, switch back to **Option A** so the real prompt from "Select Research Topic" is used.

---

## If Your UI Has "Specify Body: Using Expression"

1. Set **Specify Body** to **Using Expression**.
2. In the expression field paste:

```
={{ JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: $json.prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations." }], temperature: 0.7, max_tokens: 3000 }) }}
```

3. Save and run the workflow.

---

## Checklist

- No mix of raw JSON and `={{ $json.prompt }}` in the same JSON string (that often causes "needs to be valid JSON").
- Either: **full literal JSON** (Option B) or **one expression that returns a JSON string** (Option A).
- No extra commas, missing quotes, or spaces before/after the pasted text.

Using **Option A** (single expression) fixes the error and keeps the dynamic prompt.
