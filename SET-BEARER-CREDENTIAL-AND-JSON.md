# Fix HTTP Request1: Bearer Credential + JSON Body

## Issue 1: Select Credential (Red Warning)

You're using **Bearer Auth** but no credential is selected.

### Option A: Create a new Bearer credential

1. **Click** the red **"Select Credential"** dropdown.
2. **Click** **"Create New Credential"** (or similar).
3. **Credential type:** Bearer Auth (or Header Auth).
4. **Name:** e.g. `OpenAI API Key`.
5. **Token / Value:** paste your OpenAI API key (starts with `sk-proj-...`).
   - For **Bearer Auth:** paste only the key, e.g. `sk-proj-...`.
   - For **Header Auth:** Name = `Authorization`, Value = `Bearer sk-proj-...`.
6. **Save** the credential.
7. **Select** this credential in the "Select Credential" dropdown.

### Option B: Use Header Auth instead of Bearer Auth

1. **Generic Auth Type:** change from "Bearer Auth" to **"Header Auth"**.
2. **Create/Select** a Header Auth credential:
   - **Name:** `Authorization`
   - **Value:** `Bearer sk-proj-YOUR_KEY_HERE`
3. **Save** and select it.

---

## Issue 2: JSON Body (Red Dot = Invalid)

The body must be valid JSON. Replace the current value with this entire block.

### Steps

1. **Specify Body:** keep **"Using JSON"**.
2. **Click** in the **JSON** text box.
3. **Delete** everything there (including the "1").
4. **Paste** this exactly:

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "={{ $json.prompt }}\n\nReturn ONLY valid JSON, no markdown, no explanations."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 3000
}
```

5. **Check:** no red dot; JSON is valid.
6. **Save** the node.

---

## Summary

| Item | Action |
|------|--------|
| **Select Credential** | Create/select a Bearer or Header Auth credential with your OpenAI API key. |
| **JSON body** | Replace with the full JSON above (with `={{ $json.prompt }}`). |

After both are set, run the workflow again.
