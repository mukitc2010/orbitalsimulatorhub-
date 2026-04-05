# Option 2: Build body in HTTP Request1 (no Code node)

## Step 1: Remove Build OpenAI Body node

1. Open your workflow **"Auto-Generate Research Content Daily"**.
2. Click the **Build OpenAI Body** node (Code in JavaScript).
3. Press **Delete** (or right-click → Delete).
4. Connect **Select Research Topic** directly to **HTTP Request1**:
   - Drag from the output (right side) of **Select Research Topic**
   - To the input (left side) of **HTTP Request1**.

---

## Step 2: Configure HTTP Request1

1. Click **HTTP Request1**.
2. Set:
   - **Method:** POST
   - **URL:** `https://api.openai.com/v1/chat/completions`
   - **Authentication:** Your Bearer credential (as before)
   - **Send Body:** ON
   - **Body Content Type:** JSON

3. **Body – must use Expression (this fixes "JSON parameter needs to be valid JSON"):**
   - Find **"Specify Body"** – it is currently **"Using JSON"** (that causes the error).
   - Click the **"Specify Body"** dropdown and change it to **"Using Expression"** (or "Expression").
   - After you switch to Expression, a field for the expression appears. Paste this **entire** expression there (one line):

```
={{ JSON.stringify({ model: 'gpt-4', messages: [{ role: 'user', content: $json.prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }], temperature: 0.7, max_tokens: 3000 }) }}
```

4. Save the node (and workflow).

---

## Step 3: Run the workflow

1. Click **Execute workflow**.
2. Flow: **Schedule Trigger** → **Select Research Topic** → **HTTP Request1** → **Format Research Content** → **Post Research Content** → …

---

## If you still see "JSON parameter needs to be valid JSON"

The body field is still in **JSON** (fixed) mode instead of **Expression**:

- Do **not** put the expression inside a "Using JSON" / "JSON" text box.
- Find the control that switches that field to **Expression** / **fx** and turn it on, then paste the expression in the expression input.
- If your node has a **"Specify Body"** dropdown, set it to **"Using Expression"** (or similar), then paste the expression there.

---

## Summary

| What | Value |
|------|--------|
| Build OpenAI Body node | **Deleted** |
| Connection | Select Research Topic → HTTP Request1 |
| HTTP Request1 body | **Expression** (not "Using JSON") |
| Expression | `={{ JSON.stringify({ model: 'gpt-4', messages: [{ role: 'user', content: $json.prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }], temperature: 0.7, max_tokens: 3000 }) }}` |

Done. No Code node; body is built in HTTP Request1.
