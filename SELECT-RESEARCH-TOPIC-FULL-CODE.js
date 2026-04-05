// OLLAMA ONLY - Select topic and build request body for Ollama (outputs openAIBody for HTTP Request1)
// HTTP Request1: URL = http://localhost:11434/v1/chat/completions , Auth = None , Body = {{ $json.openAIBody }}
// Paste this ENTIRE code into the "Select Research Topic" Code node. Replace everything.

const contentTypes = ["paper-summary","discovery","methodology","data-source","tool","case-study","trend","formula","documentation"];
const categories = ["nasa","orbital-mechanics","astrophysics","quantum-physics","aerospace","general"];
const topics = ["orbital debris mitigation","precision orbit determination","space weather effects","satellite constellation design","propulsion systems","attitude control","mission design","data analysis techniques","numerical methods","recent NASA discoveries","exoplanet research","black hole physics","quantum computing in space","materials science for space"];

const selectedType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
const today = new Date().toISOString().split('T')[0];
const id = `research-${Date.now()}`;

const prompt = `Generate comprehensive research content for PhD students and researchers about ${selectedTopic} in the ${selectedCategory} category.

Content type: ${selectedType}

Requirements:
1. Provide a detailed summary (2-3 sentences)
2. Write full content suitable for research papers (500-1000 words)
3. Include relevant keywords
4. Provide references to academic papers, NASA documentation, or authoritative sources
5. Include formulas/equations if applicable
6. Include data points if applicable
7. Suggest related topics
8. Include SEO keywords

Format as JSON:
{
  "title": "...",
  "summary": "...",
  "content": "...",
  "keywords": ["..."],
  "references": [{"title": "...", "url": "...", "source": "...", "type": "paper|website|documentation|data|tool"}],
  "formulas": [{"name": "...", "equation": "...", "description": "..."}],
  "dataPoints": [{"label": "...", "value": "...", "unit": "...", "source": "..."}],
  "relatedTopics": ["..."],
  "seoKeywords": "..."
}`;

const openAIBody = JSON.stringify({
  model: 'llama2',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
});

return { json: { id, date: today, type: selectedType, category: selectedCategory, topic: selectedTopic, prompt, openAIBody } }
