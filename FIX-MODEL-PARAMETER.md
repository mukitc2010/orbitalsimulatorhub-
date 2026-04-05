# Fix: "you must provide a model parameter"

The OpenAI API is not receiving a valid body with `model`. Do this:

---

## Step 1: Use the Build OpenAI Body Code node

So the body is built correctly and passed to HTTP Request1.

1. **Add** a **Code** (JavaScript) node between **Select Research Topic** and **HTTP Request1**.
2. Name it **Build OpenAI Body**.
3. **Mode:** Run once for each item.
4. Paste this code:

```javascript
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

5. Connect: **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1**.

---

## Step 2: HTTP Request1 – send that body

You must send the **string** from the Code node as the request body.

### Option A: Expression on the JSON field

1. Open **HTTP Request1**.
2. **Specify Body:** Using JSON.
3. Look at the **JSON** text box. On the **right** of the box there is often a small **`fx`** or **`</>`** icon.
4. **Click that icon** so the field becomes an **expression** (not literal JSON).
5. In the expression box enter exactly:
   ```
   {{ $json.openAIBody }}
   ```
   (or `={{ $json.openAIBody }}` if your UI expects the full expression.)
6. Save and run.

### Option B: No expression icon – use literal JSON to test

If there is **no** fx/expression on the JSON field:

1. In the **JSON** box, **delete** everything.
2. Paste this **valid JSON** (one line, no expression):

```json
{"model":"gpt-4","messages":[{"role":"user","content":"Return ONLY valid JSON with title, summary, content, keywords, references."}],"temperature":0.7,"max_tokens":3000}
```

3. Save and run.  
   - If the workflow runs and OpenAI responds, the node is fine and the problem was the body before.  
   - Then add the **Build OpenAI Body** Code node and switch the JSON field to expression **`{{ $json.openAIBody }}`** (Option A) when you find the fx icon.

---

## Checklist

- [ ] **Build OpenAI Body** node exists and is connected: Select Research Topic → Build OpenAI Body → HTTP Request1.
- [ ] Code node returns `[{ openAIBody: JSON.stringify(body) }]`.
- [ ] HTTP Request1 **Send Body** = ON, **Body Content Type** = JSON.
- [ ] Body is either: **expression** `{{ $json.openAIBody }}` (Option A) or **literal JSON** (Option B for test).

Once the body sent to OpenAI includes `"model":"gpt-4"`, the "model parameter" error will go away.
