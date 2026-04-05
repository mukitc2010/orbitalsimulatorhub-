# No "Expression" in Specify Body dropdown – what to do

If your **Specify Body** dropdown only has options like "Using JSON" and "Using Fields Below" (no "Expression"), use one of these.

---

## Option A: Expression toggle next to the JSON box

1. Leave **Specify Body** as **"Using JSON"**.
2. Look **at the JSON text box** (where you type the body):
   - Is there a small **`fx`** icon or **`</>`** icon on the **right side** of the field?
   - Or a **toggle** (e.g. "Fixed" / "Expression") **above or beside** the box?
3. If yes: **click it** so the field is in **Expression** mode, then paste:
   ```
   ={{ JSON.stringify({ model: 'gpt-4', messages: [{ role: 'user', content: $json.prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }], temperature: 0.7, max_tokens: 3000 }) }}
   ```

---

## Option B: Use the Build OpenAI Body Code node again (recommended)

If there is no expression option for the body, build the body in a Code node and pass it as a string. Then the HTTP node only needs to send that string.

### 1. Add back a Code node

1. Between **Select Research Topic** and **HTTP Request1**, add a **Code** node (Code in JavaScript).
2. Name it **Build OpenAI Body**.

### 2. Code node – return without `json` wrapper

Paste this in the Code node (return a **plain** object, no `json:` key):

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

3. **Mode:** Run once for each item.
4. Connect: **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1**.

### 3. HTTP Request1

1. **Specify Body:** **Using JSON**.
2. In the **JSON** box, you must use the value from the previous node. If your version allows **expressions inside** the JSON:
   - Put in the JSON box:  
     `{{ $json.openAIBody }}`  
     (or the full expression if it only accepts expressions and not references).
3. If the JSON box does **not** accept `{{ }}` and gives "valid JSON" error:
   - Try **Using Fields Below** (Option C).

---

## Option C: Specify Body = "Using Fields Below"

1. Set **Specify Body** to **"Using Fields Below"**.
2. Add body parameters one by one. For each, you can often choose "Fixed" or "Expression" for the **value**:

| Name         | Value (Expression) |
|--------------|----------------------|
| model        | `gpt-4` (fixed)      |
| temperature  | `0.7` (fixed)        |
| max_tokens   | `3000` (fixed)       |
| messages     | Expression: `[{"role":"user","content": $json.prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations."}]` |

(If "messages" cannot be one expression, use the Code node in Option B.)

---

## Summary

- **First:** Look for an **fx** or **Expression** toggle **on the JSON body field** (Option A).
- **If that’s not there:** Use **Build OpenAI Body** Code node again and pass **`openAIBody`** into the HTTP node (Option B).
- **If the HTTP node still won’t accept an expression for the body:** Use **Using Fields Below** and set **messages** (and other fields) as expressions where possible (Option C).
