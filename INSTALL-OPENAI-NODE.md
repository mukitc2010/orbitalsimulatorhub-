# 🔧 Install OpenAI Node in n8n

## ⚠️ Problem

You're seeing: **"Install this node to use it - This node is not currently installed"**

This means the OpenAI node package isn't installed in your n8n instance.

---

## ✅ Solution 1: Install OpenAI Node Package

### Step 1: Stop n8n

1. **Close n8n** (if running)
2. **Or press Ctrl+C** in the terminal where n8n is running

### Step 2: Install OpenAI Node

**Open PowerShell/Terminal and run:**

```powershell
npm install -g n8n@latest
```

**OR if n8n is installed locally:**

```powershell
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npm install n8n-nodes-base@latest
```

### Step 3: Restart n8n

```powershell
npx n8n start
```

### Step 4: Verify Node is Available

1. **Open n8n:** http://localhost:5678
2. **Create new workflow** (or open existing)
3. **Click "+" to add node**
4. **Search:** "OpenAI"
5. **Should see:** "OpenAI" node option

---

## ✅ Solution 2: Use HTTP Request Instead (Alternative)

If installing the node doesn't work, we can replace the OpenAI node with an HTTP Request node that calls OpenAI API directly.

### Replace OpenAI Node with HTTP Request

**In your workflow:**

1. **Delete** the "Generate Research Content" (OpenAI) node
2. **Add new node:** "HTTP Request"
3. **Configure it:**

**Settings:**
- **Method:** POST
- **URL:** `https://api.openai.com/v1/chat/completions`
- **Authentication:** Generic Credential Type → Header Auth
  - **Name:** `Authorization`
  - **Value:** `Bearer YOUR_API_KEY_HERE`
- **Send Body:** ✅ Yes
- **Body Content Type:** JSON
- **JSON Body:**
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

4. **Connect:** "Select Research Topic" → "HTTP Request" → "Format Research Content"

5. **Update Format Node** to handle HTTP response:
   - HTTP Request returns: `response.choices[0].message.content`
   - Same structure as OpenAI node!

---

## 🔍 Check n8n Version

**Run this to check your n8n version:**

```powershell
npx n8n --version
```

**Should be:** 1.0+ for OpenAI node support

**If older version:**
```powershell
npm install -g n8n@latest
```

---

## 🎯 Quick Fix: Use HTTP Request (Recommended)

Since the OpenAI node isn't installed, let's use HTTP Request instead. This is actually more flexible!

### Step-by-Step:

1. **Delete "Generate Research Content" node**
2. **Add "HTTP Request" node** between "Select Research Topic" and "Format Research Content"
3. **Configure HTTP Request:**

**URL:** `https://api.openai.com/v1/chat/completions`

**Method:** POST

**Headers:**
- `Authorization`: `Bearer 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`

**Body (JSON):**
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

4. **The Format node will work the same** - it expects `choices[0].message.content` which HTTP Request returns!

---

## 📝 Which Solution to Use?

**Option 1 (Install Node):**
- ✅ Cleaner workflow
- ✅ Built-in credential management
- ❌ Requires npm install

**Option 2 (HTTP Request):**
- ✅ Works immediately
- ✅ More control
- ✅ No installation needed
- ❌ API key in workflow (less secure)

**Recommendation:** Try Option 1 first, if it doesn't work, use Option 2!

---

## 🚀 Next Steps

1. **Try installing the node** (Solution 1)
2. **If that doesn't work**, use HTTP Request (Solution 2)
3. **Test the workflow**
4. **Share results!**

---

**Let me know which solution works for you!** 🎯
