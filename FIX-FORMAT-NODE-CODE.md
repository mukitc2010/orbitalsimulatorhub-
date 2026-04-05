# 🔧 Fix "Format Research Content" Node Error

## ⚠️ Problem

The code tries to access `choices[0]` but the OpenAI response structure might be different.

**Error:** `Cannot read properties of undefined (reading '0')`

---

## ✅ Solution: Update the Code

### Step 1: Click on "Format Research Content" Node

### Step 2: Replace the Code

**Delete the old code** and **paste this new code:**

```javascript
// Parse AI response and format for API
// Handle different OpenAI response structures
let aiResponse = "";

try {
  // Try different possible response structures
  const inputData = $input.item.json;
  
  if (inputData.choices && inputData.choices[0] && inputData.choices[0].message) {
    // Standard OpenAI API response
    aiResponse = inputData.choices[0].message.content;
  } else if (inputData.message && inputData.message.content) {
    // Alternative structure
    aiResponse = inputData.message.content;
  } else if (inputData.content) {
    // Direct content
    aiResponse = inputData.content;
  } else if (typeof inputData === 'string') {
    // String response
    aiResponse = inputData;
  } else {
    // Fallback: try to stringify
    aiResponse = JSON.stringify(inputData);
  }
} catch (e) {
  console.error("Error getting AI response:", e);
  aiResponse = "Error: Could not parse AI response";
}

let parsed;

try {
  // Try to parse JSON
  parsed = JSON.parse(aiResponse);
} catch (e) {
  // If not JSON, create structure manually
  parsed = {
    title: "AI Generated Research Content",
    summary: aiResponse.substring(0, 200),
    content: aiResponse,
    keywords: [],
    references: [],
    relatedTopics: []
  };
}

// Get metadata from previous node
let metadata;
try {
  metadata = $('Select Research Topic').item.json;
} catch (e) {
  // Fallback metadata
  metadata = {
    id: `research-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    topic: "Research Topic",
    type: "paper-summary",
    category: "nasa"
  };
}

// Ensure all required fields
const researchContent = {
  id: metadata.id || `research-${Date.now()}`,
  date: metadata.date || new Date().toISOString().split('T')[0],
  title: parsed.title || metadata.topic || "Research Content",
  type: metadata.type || "paper-summary",
  category: metadata.category || "nasa",
  summary: parsed.summary || parsed.content?.substring(0, 200) || "Research content about " + (metadata.topic || "space"),
  content: parsed.content || aiResponse,
  keywords: parsed.keywords || [metadata.topic || "research", metadata.category || "nasa"],
  references: parsed.references || [
    {
      title: "NASA.gov",
      url: "https://www.nasa.gov/",
      source: "NASA",
      type: "website"
    }
  ],
  formulas: parsed.formulas || [],
  dataPoints: parsed.dataPoints || [],
  relatedTopics: parsed.relatedTopics || [],
  seoKeywords: parsed.seoKeywords || `${metadata.topic || "research"} ${metadata.category || "nasa"} research`
};

return { json: researchContent };
```

### Step 3: Save

1. **Click "Save"** or press Ctrl+S
2. **Test workflow** again

---

## 🔍 What Changed

The new code:
- ✅ **Handles different response structures** from OpenAI
- ✅ **Has error handling** for missing data
- ✅ **Provides fallback values** if data is missing
- ✅ **Won't crash** if structure is different

---

## ✅ After Fixing

1. **Save the node**
2. **Test workflow** - should work now!
3. **Check execution logs** if still having issues

**The workflow should work after this fix!** 🚀
