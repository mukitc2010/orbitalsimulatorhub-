# Fix: "JSON parameter needs to be valid JSON"

## What changed

A **"Build OpenAI Body"** Code node was added so the HTTP Request node no longer has to build JSON in its body field. The body is built as valid JSON in the Code node and passed as a string.

---

## Option 1: Re-import the workflow (easiest)

1. In n8n go to **Workflows** → **Import from File**.
2. Select: **`n8n/workflows/auto-research-content.json`** (from the project folder).
3. Import (replace the existing workflow if asked).
4. **Connect your Bearer credential** to the **HTTP Request1** node (Select Credential).
5. Save and run the workflow.

New flow:

- **Schedule Trigger** → **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1** → **Format Research Content** → **Post Research Content** → **HTTP Request** (deploy).

The **Build OpenAI Body** node builds the OpenAI request body (with the prompt from Select Research Topic) and outputs `openAIBody`. **HTTP Request1** uses **body = `={{ $json.openAIBody }}`**, which is a single expression, so you avoid the "JSON parameter needs to be valid JSON" error.

---

## Option 2: Add the node yourself (no re-import)

### Step 1: Add a Code node

1. Between **Select Research Topic** and **HTTP Request1**, add a **Code** node.
2. Name it: **Build OpenAI Body**.
3. Paste this code:

```javascript
// Build OpenAI request body so HTTP Request gets valid JSON
const item = $input.item.json;
const body = {
  model: "gpt-4",
  messages: [{ role: "user", content: item.prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations." }],
  temperature: 0.7,
  max_tokens: 3000
};
return [{ json: { openAIBody: JSON.stringify(body) } }];
```

4. Connect: **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1**.

### Step 2: Change HTTP Request1 body to an expression

1. Open **HTTP Request1**.
2. **Send Body:** ON.
3. **Body Content Type:** JSON.
4. For the **body/JSON** field:
   - If there is a **toggle or dropdown** (e.g. "Fixed" / "Expression" or "Using JSON" / "Using Expression"), switch it to **Expression**.
   - In the **expression** field, set:
   - **`={{ $json.openAIBody }}`**
5. Save.

So the HTTP Request node no longer contains raw JSON with `{{ }}` inside it; it only has one expression that returns a JSON string, which avoids the "JSON parameter needs to be valid JSON" error.

---

## If you still see "JSON parameter needs to be valid JSON"

- The JSON/body field is probably still in **"Using JSON"** (fixed) mode and is validating the text as literal JSON.
- **Fix:** Switch that field to **Expression** mode and use **only**  
  **`={{ $json.openAIBody }}`**  
  (after adding the **Build OpenAI Body** node and connecting the flow as above).

Re-importing the workflow (Option 1) applies all of this in one go.
