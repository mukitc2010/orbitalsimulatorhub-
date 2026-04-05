# Fix: A 'json' property isn't an object [item 0]

You have **two** "Code in JavaScript" nodes. The error can come from either. Apply the fix for the one that’s failing (or both).

---

## Which node is failing?

- **Build OpenAI Body** (between Select Research Topic and HTTP Request1) → use **Fix A**
- **Format Research Content** (between HTTP Request1 and Post Research Content) → use **Fix B**

---

## Fix A: Build OpenAI Body

1. Open the **Build OpenAI Body** Code node.
2. Replace all code with this (return one item with `json` as a plain object):

```javascript
const item = $input.item.json;
const prompt = item.prompt || 'Return ONLY valid JSON with title, summary, content, keywords, references.';
const body = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
};
const bodyStr = JSON.stringify(body);
return [{ json: { openAIBody: bodyStr } }];
```

3. In **HTTP Request1**, set the body expression to: **`={{ $json.openAIBody }}`**
4. Save and run.

---

## Fix B: Format Research Content

1. Open the **Format Research Content** Code node.
2. Find this line:
   ```javascript
   metadata = selectTopicNode.first()?.json || selectTopicNode.item?.json || {};
   ```
3. Replace it with (do not use `.first()`):
   ```javascript
   metadata = selectTopicNode.item?.json || {};
   ```
4. Save and run.

---

## If the error persists

1. Run the workflow and note **which node** turns red (Build OpenAI Body or Format Research Content).
2. Click that node and check the **Logs** / error panel for the full message.
3. Ensure **Mode** for that Code node is **"Run once for each item"** (no `.all()` or `.first()` in the code).

The workflow file has been updated: Build OpenAI Body returns `[{ json: { openAIBody: bodyStr } }]`, and Format no longer uses `.first()`.
