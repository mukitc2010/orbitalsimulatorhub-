# How to Add a Code Node in n8n

## Step-by-Step

### 1. Open your workflow
- Go to **Workflows** and open **"Auto-Generate Research Content Daily"** (or the one you use).

### 2. Add a new node
You can do any of these:

**Option A: From the connection**
- Hover over the **line** between **Select Research Topic** and **HTTP Request1**.
- Click the **+** that appears on the line.
- A menu of nodes opens.

**Option B: From the canvas**
- **Double-click** on an empty area of the canvas, **or**
- Click the **+** button (usually top-left or in the toolbar).
- A search/add node menu opens.

**Option C: From the node**
- Click the **+** on the **output** (right side) of **Select Research Topic**.
- A menu of nodes opens.

### 3. Search for "Code"
- In the search box, type: **Code**.
- You should see **"Code"** (icon often looks like `{ }`).
- Click it to add a **Code** node.

### 4. Place and name the node
- The new node appears on the canvas.
- Put it **between** **Select Research Topic** and **HTTP Request1**.
- Click the node name (e.g. "Code") and rename it to: **Build OpenAI Body**.

### 5. Add the code
- Click the **Code** node to open its settings.
- In the **JavaScript Code** (or "Code") box, **delete** any default text.
- Paste this:

```javascript
const item = $input.item.json;
const body = {
  model: "gpt-4",
  messages: [{ role: "user", content: item.prompt + "\n\nReturn ONLY valid JSON, no markdown, no explanations." }],
  temperature: 0.7,
  max_tokens: 3000
};
return [{ json: { openAIBody: JSON.stringify(body) } }];
```

- Click **Execute node** (or Save) to test if you want.

### 6. Connect the nodes
- **From:** **Select Research Topic** (output) → **To:** **Build OpenAI Body** (input).
- **From:** **Build OpenAI Body** (output) → **To:** **HTTP Request1** (input).
- **Remove** the old connection from **Select Research Topic** directly to **HTTP Request1** (if it’s still there).

### 7. Set HTTP Request1 body to expression
- Click **HTTP Request1**.
- Find the **body / JSON** field.
- Switch it to **Expression** (e.g. "Expression" or "Using Expression", or the `fx` / `</>` icon).
- Set the expression to: **`={{ $json.openAIBody }}`**
- Save the workflow (Ctrl+S or Save button).

---

## Quick summary

1. **+** (on connection or canvas) → search **"Code"** → add **Code** node.  
2. Rename to **Build OpenAI Body**.  
3. Paste the JavaScript above into the Code node.  
4. Connect: **Select Research Topic** → **Build OpenAI Body** → **HTTP Request1**.  
5. In **HTTP Request1**, set body to expression: **`={{ $json.openAIBody }}`**.

That’s how you add and use the Code node.
