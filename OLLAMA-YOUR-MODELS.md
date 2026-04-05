# Your Ollama models – use in n8n

From `ollama list` you have:

| NAME           | Use in n8n model field |
|----------------|-------------------------|
| llama2:latest  | `llama2`               |
| falcon:latest  | `falcon`               |
| gpt-oss:20b    | `gpt-oss:20b`          |

In the **Select Research Topic** node, set:

```javascript
model: 'llama2',        // or 'falcon' or 'gpt-oss:20b'
```

- **llama2** – good balance of speed and quality.  
- **falcon** – similar.  
- **gpt-oss:20b** – larger, often better for long/structured JSON (may be slower).

In **HTTP Request1** use:
- **URL:** `http://localhost:11434/v1/chat/completions`
- **Authentication:** None
- **Body (expression):** `{{ $json.openAIBody }}`

Run Ollama in the background (or start it before the workflow runs) so the API is available.
