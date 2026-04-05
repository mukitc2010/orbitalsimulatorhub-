# 🔧 Configure HTTP Request Node for OpenAI

## ⚠️ Issues to Fix

Looking at your configuration:
1. ❌ **Method is GET** → Should be **POST**
2. ❌ **Body Parameters empty** → Need JSON body
3. ⚠️ **Authentication** → Need to configure Authorization header

---

## ✅ Step-by-Step Fix

### Step 1: Change Method to POST

1. **Find "Method" dropdown** (top of the node)
2. **Click dropdown** - currently shows "GET"
3. **Select:** "POST"

---

### Step 2: Configure Authentication

**Option A: Use Generic Credential Type (Current)**

1. **Keep "Authentication"** set to "Generic Credential Type"
2. **Click on "Generic Credential Type"** dropdown
3. **Select:** "Header Auth"
4. **Configure:**
   - **Name:** `Authorization`
   - **Value:** `Bearer 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`

**Option B: Use Manual Headers (Easier)**

1. **Change "Authentication"** to **"None"**
2. **Scroll down** to find "Send Headers" section
3. **Enable "Send Headers"** ✅
4. **Add Header:**
   - **Name:** `Authorization`
   - **Value:** `Bearer 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`

---

### Step 3: Configure JSON Body

**You have two options:**

#### Option A: Using Fields Below (What you have now)

1. **Keep "Specify Body"** as "Using Fields Below"
2. **In "Body Parameters" section**, add these fields:

**Field 1:**
- **Name:** `model`
- **Value:** `gpt-4`

**Field 2:**
- **Name:** `messages`
- **Value:** 
```json
[{"role": "user", "content": "={{$json.prompt}}\n\nReturn ONLY valid JSON, no markdown, no explanations."}]
```

**Field 3:**
- **Name:** `temperature`
- **Value:** `0.7`

**Field 4:**
- **Name:** `max_tokens`
- **Value:** `3000`

---

#### Option B: Using JSON (Easier - Recommended!)

1. **Change "Specify Body"** dropdown to **"Using JSON"**
2. **In the JSON field**, paste this:

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

**This is easier!** ✅

---

## 📋 Complete Configuration Summary

**Method:** POST ✅  
**URL:** `https://api.openai.com/v1/chat/completions` ✅  
**Authentication:** None (or Header Auth with Authorization header)  
**Send Headers:** ✅ Yes  
**Header:** `Authorization: Bearer YOUR_API_KEY`  
**Send Body:** ✅ Yes  
**Body Content Type:** JSON ✅  
**Specify Body:** Using JSON ✅  
**JSON Body:**
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

---

## 🎯 Quick Fix Checklist

- [ ] Change Method: GET → **POST**
- [ ] Set Authentication: None (or configure Header Auth)
- [ ] Add Header: `Authorization: Bearer YOUR_API_KEY`
- [ ] Change "Specify Body": Using Fields Below → **Using JSON**
- [ ] Paste JSON body (see above)
- [ ] Save node
- [ ] Test workflow

---

## ✅ After Configuration

1. **Save the node** (Ctrl+S or click Save)
2. **Test the workflow:**
   - Click "Execute Workflow"
   - Watch HTTP Request node execute
   - Should call OpenAI API successfully
   - Should return AI response

---

## 🔍 If It Still Doesn't Work

**Check:**
1. ✅ Method is POST (not GET)
2. ✅ Authorization header is correct
3. ✅ JSON body is valid JSON
4. ✅ API key is active (check OpenAI dashboard)
5. ✅ You have OpenAI credits

**Test the node:**
- Click "Test step" button on the HTTP Request node
- See if it returns data

---

**The main issue is Method = GET. Change it to POST!** 🚀
