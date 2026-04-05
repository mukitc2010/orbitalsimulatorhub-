# 🔑 How to Add OpenAI Credential in n8n

## ✅ Correct Credential Type: "OpenAI" (not "OpenAI API")

The workflows use the **"OpenAI"** credential type. Here's how to add it:

---

## 📋 Step-by-Step Instructions

### Step 1: Open n8n
1. Go to: http://localhost:5678
2. Make sure you're logged in

### Step 2: Go to Credentials
1. Click **"Credentials"** in the left sidebar
2. Or click your profile icon → **"Credentials"**

### Step 3: Add OpenAI Credential
1. Click **"Add Credential"** button (usually top right, or "+" button)
2. In the search box, type: **"OpenAI"**
3. You should see **"OpenAI"** as an option (not "OpenAI API")
4. Click on **"OpenAI"**

### Step 4: Enter Your API Key
1. You'll see a form with fields:
   - **API Key** (required)
   - **Organization ID** (optional - leave blank if you don't have one)
   
2. **Paste your OpenAI API key** in the "API Key" field:
   ```
   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
   ```

3. **Leave Organization ID blank** (unless you have one)

4. **Name your credential** (optional but helpful):
   - Example: "OpenAI Main" or "OpenAI GPT-4"

5. Click **"Save"** or **"Create"**

---

## ✅ Verify Credential is Added

After saving, you should see:
- ✅ "OpenAI" in your credentials list
- ✅ Status shows as active/configured
- ✅ You can use it in workflows

---

## 🔧 Connect Credential to Workflows

### After Importing Workflows:

1. **Open a workflow** (e.g., "Auto-Generate Research Content Daily")

2. **Click on the OpenAI node** (e.g., "Generate Research Content")

3. **In the node settings**, look for **"Credential"** dropdown

4. **Select your OpenAI credential** from the dropdown

5. **Save the workflow** (Ctrl+S)

6. **Repeat for all OpenAI nodes** in all workflows

---

## 🎯 Workflows That Need OpenAI Credential

### Workflow 1: Auto-Generate Research Content Daily
- Node: **"Generate Research Content"** (OpenAI node)
- Needs: OpenAI credential

### Workflow 2: AI Topic Generator - Blog Posts
- Node: **"OpenAI Generate Topics"** (OpenAI node)
- Needs: OpenAI credential

---

## 🔍 If You Don't See "OpenAI" Option

### Option 1: Update n8n
The OpenAI node might need n8n to be updated:
```bash
npm install -g n8n@latest
```

### Option 2: Install OpenAI Node
Make sure the OpenAI node is installed:
```bash
npm install -g n8n
```

### Option 3: Check n8n Version
```bash
n8n --version
```
Should be version 1.0+ for OpenAI support.

---

## 📝 Alternative: Manual API Key Entry

If credential doesn't work, you can also:

1. **Open workflow**
2. **Click OpenAI node**
3. **Look for "API Key" field** directly in node
4. **Paste API key** there
5. **Save workflow**

**Note:** This is less secure but works if credentials don't work.

---

## 🆘 Troubleshooting

### "OpenAI" Not in Credentials List?
- Make sure n8n is updated: `npm install -g n8n@latest`
- Restart n8n
- Check n8n version: `n8n --version`

### Credential Not Working?
- Verify API key is correct
- Check API key has credits/quota
- Test API key at: https://platform.openai.com/api-keys
- Check n8n logs for errors

### Workflow Can't Find Credential?
- Make sure credential is saved
- Check credential name matches what workflow expects
- Try re-selecting credential in workflow node

---

## ✅ Quick Checklist

- [ ] ✅ Opened n8n: http://localhost:5678
- [ ] ✅ Went to Credentials
- [ ] ✅ Added "OpenAI" credential (not "OpenAI API")
- [ ] ✅ Pasted API key
- [ ] ✅ Saved credential
- [ ] ✅ Connected credential to workflow nodes
- [ ] ✅ Saved workflows

---

## 🎯 Summary

**Use "OpenAI" credential type** (not "OpenAI API"):

1. Credentials → Add Credential
2. Search: "OpenAI"
3. Select: "OpenAI"
4. Paste API key
5. Save
6. Connect to workflow nodes

**That's it!** Your workflows will now use OpenAI to generate content! 🚀
