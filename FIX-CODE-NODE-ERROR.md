# Fix: Error running node 'Code in JavaScript'

## What’s wrong

The **Build OpenAI Body** (Code in JavaScript) node is failing, so **HTTP Request1** gets no input and shows "No output data".

---

## Fix: Use this code in the Code node

1. Open the **Build OpenAI Body** node (the one named "Code in JavaScript" or "Build OpenAI Body").
2. **Delete all code** in the code editor.
3. **Paste this exactly:**

```javascript
// Build OpenAI request body - works with Run once per item or Run once for all
let item = {};
try {
  if ($input.item && $input.item.json) {
    item = $input.item.json;
  } else if ($input.all && $input.all()[0] && $input.all()[0].json) {
    item = $input.all()[0].json;
  }
} catch (e) {}
const prompt = (item && item.prompt) ? item.prompt : 'Return ONLY valid JSON with title, summary, content, keywords, references.';
const body = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
};
return [{ json: { openAIBody: JSON.stringify(body) } }];
```

4. **Save** the node (and workflow).
5. Run the workflow again.

---

## Check these as well

- **Mode:** Use **"Run once for each item"** for this node.
- **Input:** The node must get input from **Select Research Topic**. Connect: **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1**.
- **Error details:** Click the **Code** node (the one that failed), then open the **Logs** or error panel at the bottom to see the exact error message. That can show if the problem is something else (e.g. missing input).

---

## Summary

- The new code safely reads from both `$input.item` and `$input.all()[0]`.
- It always returns one item with `json: { openAIBody: "..." }` (an object).
- After updating the code and saving, run the workflow again.
