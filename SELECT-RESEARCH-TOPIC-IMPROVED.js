// IMPROVED VERSION - Generates blog posts ready for your blog API
// HTTP Request1: URL = http://localhost:11434/v1/chat/completions
// HTTP Request2: URL = http://localhost:3003/api/blog/posts (or your API URL)
// Method: POST, Body: {{ $json.blogPost }}

const contentTypes = ["paper-summary","discovery","methodology","data-source","tool","case-study","trend","formula","documentation"];
const categories = ["nasa","orbital-mechanics","astrophysics","quantum-physics","aerospace","general"];
const topics = ["orbital debris mitigation","precision orbit determination","space weather effects","satellite constellation design","propulsion systems","attitude control","mission design","data analysis techniques","numerical methods","recent NASA discoveries","exoplanet research","black hole physics","quantum computing in space","materials science for space"];

const selectedType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
const today = new Date().toISOString().split('T')[0];

// Map research categories to blog categories
const categoryMap = {
  "nasa": "nasa-news",
  "orbital-mechanics": "satellite-tutorials",
  "astrophysics": "astronomy-lessons",
  "quantum-physics": "space-facts",
  "aerospace": "satellite-tutorials",
  "general": "space-facts"
};

const blogCategory = categoryMap[selectedCategory] || "space-facts";

const prompt = `Generate a blog post about ${selectedTopic} in the ${selectedCategory} category.

Content type: ${selectedType}

Requirements:
1. Write a compelling title (60-70 characters, SEO-friendly)
2. Write a 1-2 sentence excerpt (appears in search results)
3. Write full content (500-1000 words) in markdown format with:
   - Introduction paragraph
   - 3-5 main sections with headers
   - Bullet points and examples
   - Internal links to: /simulator, /learn/orbital-mechanics, /formulas-library, /satellites, /space-news
   - Conclusion paragraph
4. Include 5-8 relevant tags
5. Include SEO keywords (comma-separated, 10-15 keywords)

Format as JSON:
{
  "title": "Your SEO-Friendly Title Here",
  "excerpt": "1-2 sentence description for search results",
  "content": "Full markdown content with headers, bullets, and internal links like [link text](/simulator)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoKeywords": "keyword1, keyword2, keyword3, keyword4, keyword5"
}`;

const openAIBody = JSON.stringify({
  model: 'llama2',
  messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON, no markdown, no explanations.' }],
  temperature: 0.7,
  max_tokens: 3000
});

// Return both the Ollama request body AND the blog post structure
return { 
  json: { 
    openAIBody,
    // This will be populated after HTTP Request1 gets the response
    // In n8n, use a Function node after Request1 to transform the response
    blogPostTemplate: {
      slug: "auto", // Will be auto-generated from title
      category: blogCategory,
      date: today,
      // title, excerpt, content, tags, seoKeywords will come from Ollama response
    }
  } 
}
