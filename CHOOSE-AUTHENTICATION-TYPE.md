# 🔐 Which Authentication Type to Choose?

## ✅ Choose: **Generic Credential Type**

**Why?**
- ✅ Fully customizable
- ✅ Can add custom Authorization header
- ✅ Works with OpenAI API (Bearer token)
- ✅ More control

**Predefined Credential Type:**
- ❌ Might not have OpenAI configured
- ❌ Less flexible
- ❌ Limited options

---

## 📋 Step-by-Step Setup

### Step 1: Select Generic Credential Type

1. **Click "Authentication" dropdown**
2. **Select:** "Generic Credential Type"
3. **A new dropdown will appear** below it

### Step 2: Choose Header Auth

1. **In the new dropdown**, you'll see options like:
   - Basic Auth
   - Header Auth ← **Choose this!**
   - OAuth2
   - etc.

2. **Select:** "Header Auth"

### Step 3: Configure Header

**You'll see fields:**
- **Name:** `Authorization`
- **Value:** `Bearer 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`

**Paste your API key in the Value field**

---

## 🎯 Complete Setup

**Authentication:**
- ✅ Generic Credential Type
- ✅ Header Auth
- ✅ Name: `Authorization`
- ✅ Value: `Bearer YOUR_API_KEY`

**That's it!** ✅

---

## 🔄 Alternative: Use "None" + Manual Headers

**If Generic Credential Type is confusing:**

1. **Select:** "None" for Authentication
2. **Scroll down** to find "Send Headers" section
3. **Enable "Send Headers"** ✅
4. **Add Header:**
   - **Name:** `Authorization`
   - **Value:** `Bearer YOUR_API_KEY`

**This works the same way!** ✅

---

## ✅ Summary

**Choose:** **Generic Credential Type** → **Header Auth**

**Then configure:**
- Name: `Authorization`
- Value: `Bearer YOUR_API_KEY`

**Or use:** "None" + Manual Headers (easier!)

---

**Both methods work - choose whichever is easier for you!** 🚀
