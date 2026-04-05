# 🔧 Fix HTTP Request1 (OpenAI) Red Error

## ⚠️ What’s Wrong

**HTTP Request1** (POST to `https://api.openai.com/...`) has a **red error icon**.  
That node is failing; the rest of the workflow can’t run until it’s fixed.

---

## 🔍 Step 1: See the Exact Error

1. **Click** the **HTTP Request1** node (the one with the red icon).
2. Check the **bottom panel** for:
   - **Error** or **Logs** tab
   - The exact error message (e.g. 401, 403, 404, invalid JSON, etc.)
3. **Note the message** (e.g. "401 Unauthorized", "Invalid API key", "Method not allowed").

That message tells us what to fix.

---

## ✅ Step 2: Check These Settings

### 1. Method

- Must be **POST**, not GET.
- If it’s GET, change it to **POST**.

### 2. URL

- Should be: `https://api.openai.com/v1/chat/completions`
- No typo, no extra space.

### 3. Authentication / Headers

- Either:
  - **Generic Credential Type** → **Header Auth**  
    - Name: `Authorization`  
    - Value: `Bearer YOUR_OPENAI_API_KEY`
- Or:
  - **Authentication:** None  
  - **Send Headers:** ON  
  - Header: `Authorization` = `Bearer YOUR_OPENAI_API_KEY`

Use the same API key you use in the OpenAI dashboard. No extra spaces in the key.

### 4. Body

- **Send Body:** ON  
- **Body Content Type:** JSON  
- **Specify Body:** “Using JSON” (recommended)  
- **JSON Body** (replace `YOUR_PROMPT` only if you’re testing with a fixed prompt; in the workflow keep the expression below):

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "={{$json.prompt}}\n\nReturn ONLY valid JSON, no markdown, no explanations."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 3000
}
```

- If you use “Using Fields Below”, make sure the `messages` value is valid JSON and includes the `={{$json.prompt}}` part.

---

## 🎯 Step 3: Match Error to Fix

| What you see | What to do |
|--------------|------------|
| **401 Unauthorized** | Wrong or missing API key. Fix **Authorization** header (Bearer + key). |
| **404 Not Found** | Wrong URL. Use `https://api.openai.com/v1/chat/completions`. |
| **405 Method Not Allowed** | Method is GET. Change to **POST**. |
| **400 Bad Request** | Body is wrong or not JSON. Use the JSON above and “Using JSON”. |
| **429 Rate limit** | Too many requests or no credits. Wait or check billing/credits. |
| **No input / no items** | Previous node didn’t run. Run from “Select Research Topic” or from the trigger. |

---

## ✅ Quick Checklist

- [ ] Method = **POST**
- [ ] URL = `https://api.openai.com/v1/chat/completions`
- [ ] Header: `Authorization` = `Bearer YOUR_OPENAI_API_KEY`
- [ ] Send Body = ON, Content Type = JSON
- [ ] Body = the JSON above (with `={{$json.prompt}}` in `messages[0].content`)
- [ ] API key is valid and has credits (check platform.openai.com)

---

## 🧪 Test Only This Node

1. Click **HTTP Request1**.
2. Use **Test step** / **Execute node** (if your n8n version has it).
3. If the run uses data from “Select Research Topic”, run the workflow once so that node has output, then test HTTP Request1 again.

---

**First step: click HTTP Request1 and tell me the exact error message shown (e.g. 401, 405, or the text in the error/log).** Then we can fix it precisely.
