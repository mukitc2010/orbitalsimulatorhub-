# 🔍 Check OpenAI Node Configuration

## ⚠️ Issue: Generate Research Content Node Not Executing

Looking at your workflow, the **"Generate Research Content"** node (OpenAI node) is not executing after "Select Research Topic" succeeds.

---

## ✅ Check These Settings

### 1. OpenAI Credential Connected?

1. **Click on "Generate Research Content" node**
2. **Check "Credential" dropdown**
3. **Make sure:**
   - ✅ OpenAI credential is selected
   - ✅ Credential name shows (not "None")
   - ✅ No red error icon

**If no credential:**
- Click "Credential" dropdown
- Select your OpenAI credential
- Or create new one with your API key

---

### 2. OpenAI Node Settings

**Click on "Generate Research Content" node and verify:**

- **Resource:** `text`
- **Operation:** `completion`
- **Model:** `gpt-4` (or `gpt-3.5-turbo`)
- **Prompt:** `={{$json.prompt}}`
- **Temperature:** `0.7`
- **Max Tokens:** `3000`

---

### 3. Check Node Connection

1. **Make sure arrow connects:**
   - "Select Research Topic" → "Generate Research Content"
2. **If broken:**
   - Drag from right side of "Select Research Topic"
   - To left side of "Generate Research Content"

---

### 4. Test OpenAI Node Manually

1. **Click "Execute Workflow"**
2. **Watch execution:**
   - Should see Schedule Trigger execute ✅
   - Should see Select Topic execute ✅
   - **Watch Generate Content node:**
     - Does it turn yellow (executing)?
     - Does it turn red (error)?
     - Does it stay gray (not receiving input)?

---

### 5. Check Execution Logs

1. **Click on "Generate Research Content" node**
2. **Look at bottom panel** - "Logs" or "Execution"
3. **See error messages:**
   - "Invalid API key" → Check credential
   - "No input data" → Check connection
   - "Rate limit exceeded" → Wait or check billing

---

## 🔧 Common Fixes

### Fix 1: Reconnect Credential

1. Click "Generate Research Content" node
2. Click "Credential" dropdown
3. Select your OpenAI credential again
4. Save workflow
5. Test again

### Fix 2: Check API Key

1. Go to OpenAI dashboard: https://platform.openai.com/api-keys
2. Verify your API key is active
3. Check you have credits/billing set up
4. Copy fresh API key if needed
5. Update credential in n8n

### Fix 3: Test Prompt Field

**In "Generate Research Content" node, check:**

- **Prompt field should be:** `={{$json.prompt}}`
- This gets the prompt from "Select Research Topic" node
- If wrong, change to: `={{$json.prompt}}`

---

## 🧪 Debug Steps

1. **Click "Execute Workflow"**
2. **Watch each node:**
   - Schedule Trigger → ✅ Should execute
   - Select Topic → ✅ Should execute, check OUTPUT tab
   - **Generate Content → ⚠️ Watch this one closely**
3. **If Generate Content fails:**
   - Click on it
   - Check OUTPUT tab (should have AI response)
   - Check Logs tab (should show errors)
   - Share error message

---

## 📝 Expected Output

**"Select Research Topic" should output:**
```json
{
  "id": "research-1234567890",
  "date": "2026-02-14",
  "type": "paper-summary",
  "category": "nasa",
  "topic": "orbital debris mitigation",
  "prompt": "Generate comprehensive research content..."
}
```

**"Generate Research Content" should receive:**
- Input: `$json.prompt` = the prompt string
- Output: AI-generated JSON content

---

## ✅ Quick Test

**Try executing just the OpenAI node:**

1. Click "Generate Research Content" node
2. Click "Test step" or "Execute node"
3. If it works → connection issue
4. If it fails → credential/API issue

---

**Share what you see when you click on "Generate Research Content" node - especially any error messages!** 🔍
