# Fix: Build OpenAI Body error + invalid JSON in HTTP Request

## Issue 1: Remove "Build OpenAI Body" and use Select Research Topic

1. **Delete** the **Build OpenAI Body** node.
2. Connect **Select Research Topic** directly to the **HTTP Request** node.
3. **Update Select Research Topic** so it also builds the request body and outputs **`openAIBody`** (see code in the previous message or in the workflow file).

---

## Issue 2: HTTP Request – one body only

Your **JSON** field currently has **two** JSON objects (two separate `{ ... }` blocks). That is invalid. You must have **either**:

- **One expression** that returns the body, **or**
- **One** literal JSON object.

### Option A: Use expression (recommended)

1. Click the **fx** icon next to the **JSON** label (so the field is in expression mode).
2. **Delete all** current content in the field.
3. Enter **only** this:
   ```
   {{ $json.openAIBody }}
   ```
   (or `={{ $json.openAIBody }}` if your UI expects the full form.)
4. Save.  
   This works only if **Select Research Topic** is updated to output **`openAIBody`** and is connected directly to this HTTP Request (no Build OpenAI Body node).

### Option B: Use one literal JSON object (for testing)

1. **Delete all** content in the JSON field.
2. Paste **only this single** JSON object (one block, no second object after it):

```json
{"model":"gpt-4","messages":[{"role":"user","content":"Return ONLY valid JSON with title, summary, content, keywords, references."}],"temperature":0.7,"max_tokens":3000}
```

3. Save and run.  
   The prompt will be static; for the real workflow use Option A and the updated Select Research Topic.

---

## Checklist

- [ ] Build OpenAI Body node **deleted**.
- [ ] Select Research Topic → **HTTP Request** (direct connection).
- [ ] Select Research Topic code **updated** to set **`openAIBody`** in its output.
- [ ] HTTP Request JSON field: **one** body only – either expression **`{{ $json.openAIBody }}`** (Option A) or the single JSON object above (Option B).
