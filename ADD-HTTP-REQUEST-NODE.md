# 🔧 How to Add HTTP Request Node in n8n

## ✅ Correct Way to Add Node

You don't search for "Post Research Content" - you add a NEW node!

---

## 📋 Step-by-Step Instructions

### Method 1: Click the "+" Button on Connection Line

1. **Look at your workflow**
2. **Find the arrow/line** coming OUT of "Post Research Content" node
3. **Click the small "+" button** that appears on that line
   - It's usually a small circle or plus icon on the connection line
4. **A search box will appear** - type: `HTTP Request`
5. **Click on "HTTP Request"** from the results
6. **The node will be added** automatically connected!

---

### Method 2: Use the Toolbar "+" Button

1. **Look at the right side** of your screen
2. **Find the vertical toolbar** with icons
3. **Click the "+" button** (usually at the top)
4. **A search box appears** - type: `HTTP Request`
5. **Click on "HTTP Request"** to add it
6. **Drag it** to position it after "Post Research Content"
7. **Connect:** Drag from "Post Research Content" output → to "HTTP Request" input

---

### Method 3: Right-Click Menu

1. **Right-click** on the connection line (arrow) after "Post Research Content"
2. **Select:** "Add node" or "Insert node"
3. **Search:** `HTTP Request`
4. **Click** to add

---

## 🎯 What to Search For

**In the search box, type:**
- `HTTP Request` ✅ (correct)
- `http` ✅ (will show HTTP Request)
- `request` ✅ (will show HTTP Request)

**NOT:**
- ❌ "Post Research Content" (that's your existing node)
- ❌ "Research" (won't find HTTP Request)

---

## 📝 After Adding HTTP Request Node

1. **The node appears** on your canvas
2. **Click on it** to configure
3. **Set these settings:**

**Method:** POST
**URL:** `http://localhost:3001/api/git/deploy`
**Authentication:** None
**Send Body:** Yes
**Body Content Type:** JSON
**JSON Body:**
```json
{
  "message": "Auto-update: Research content",
  "type": "research-content"
}
```

4. **Connect it:**
   - Drag from "Post Research Content" output (right side)
   - To "HTTP Request" input (left side)

5. **Save:** Ctrl+S

---

## 🔍 Visual Guide

**Your workflow should look like:**

```
Schedule Trigger → Select Topic → Generate Content → Format → Post Research Content → [NEW HTTP Request Node]
```

**The HTTP Request node is a NEW node you're adding, not finding an existing one!**

---

## ✅ Quick Steps Summary

1. ✅ **Click "+"** on connection line OR toolbar
2. ✅ **Search:** `HTTP Request`
3. ✅ **Add** the node
4. ✅ **Configure** it (see settings above)
5. ✅ **Connect** to "Post Research Content"
6. ✅ **Save** workflow

**Try clicking the "+" button on the connection line - that's the easiest way!** 🚀
