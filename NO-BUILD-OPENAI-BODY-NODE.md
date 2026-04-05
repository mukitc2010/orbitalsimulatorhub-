# Fix: No more "Build OpenAI Body" node (avoids json error)

The **Build OpenAI Body** Code node was removed. The **Select Research Topic** node now builds the OpenAI request body as well, so you don't need a separate node that triggers the "A 'json' property isn't an object" validation.

---

## What changed

1. **Select Research Topic** now:
   - Picks topic and prompt (as before).
   - Builds the full OpenAI request body and adds **`openAIBody`** to its output.
2. **Build OpenAI Body** node was **deleted**.
3. **Connection:** Select Research Topic → **HTTP Request1** (direct).
4. **HTTP Request1** body: keep **`={{ $json.openAIBody }}`** (so the body comes from Select Research Topic).

---

## What you need to do in n8n

### 1. Remove the Build OpenAI Body node (if it’s still there)

- Delete the **Build OpenAI Body** node.
- Connect **Select Research Topic** directly to **HTTP Request1**.

### 2. Update the Select Research Topic code

Replace the entire code in **Select Research Topic** with the version that also builds `openAIBody`. (The workflow file already has this; if you re-import the workflow you get it automatically.)

### 3. HTTP Request1

- **Specify Body:** Using JSON.
- In the JSON field, use **expression** (e.g. via the **fx** icon if you have it): **`={{ $json.openAIBody }}`**
- If you can’t use an expression there, paste this **literal JSON** once to test (static prompt):
   ```json
   {"model":"gpt-4","messages":[{"role":"user","content":"Return ONLY valid JSON with title, summary, content, keywords, references."}],"temperature":0.7,"max_tokens":3000}
   ```

---

## Flow now

**Schedule Trigger** → **Select Research Topic** (topic + prompt + openAIBody) → **HTTP Request1** (body = `$json.openAIBody`) → **Format Research Content** → **Post Research Content** → …

No separate Build OpenAI Body node, so no "json property isn't an object" from that node.
