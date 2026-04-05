# HTTP Request1: Use expression for body (not fixed JSON)

## What’s wrong

The **JSON** body in HTTP Request1 is **fixed** (literal JSON). So every run sends the same body (old topic, old model) instead of the current `openAIBody` from **Select Research Topic**.

- **Input** has: `openAIBody` with `gpt-3.5-turbo` and "space weather effects".
- **Body sent** is: fixed JSON with `gpt-4` and "materials science for space".

So the request doesn’t use the latest data and can fail (e.g. gpt-4 not found).

---

## Fix: Send body from expression

1. Open **HTTP Request1**.
2. Find the **JSON** body field (where the long fixed JSON is).
3. Switch that field to **expression**:
   - Click the **fx** (or "Expression") button **next to the "JSON" label** so the field becomes an expression, not fixed text.
4. **Delete all** the fixed JSON in the field.
5. In the expression box, enter **only**:
   ```text
   {{ $json.openAIBody }}
   ```
   (or `={{ $json.openAIBody }}` if your UI expects the full form.)
6. Save the node.

After this, the body will be taken from **Select Research Topic**’s **`openAIBody`** (correct model and topic for each run).

---

## Summary

| Before (wrong) | After (correct) |
|----------------|------------------|
| Body = fixed JSON (gpt-4, old topic) | Body = **expression** `{{ $json.openAIBody }}` |
| Same body every run | Body = current run’s prompt + gpt-3.5-turbo |

Use the **fx** on the JSON field and set the value to **`{{ $json.openAIBody }}`**.
