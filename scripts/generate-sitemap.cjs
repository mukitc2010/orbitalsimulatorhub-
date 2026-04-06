const fs = require("fs");
const path = require("path");

const SITE = "https://www.orbitalsimulatorhub.com";
const TODAY = new Date().toISOString().split("T")[0];

// Extract slugs and dates from blogPosts.ts
const blogSrc = fs.readFileSync(
  path.join(__dirname, "..", "client", "src", "data", "blogPosts.ts"),
  "utf-8"
);

const posts = [];
const slugRe = /slug:\s*"([^"]+)"/g;
const dateRe = /date:\s*"([^"]+)"/g;
let m;
const slugs = [];
const dates = [];
while ((m = slugRe.exec(blogSrc)) !== null) slugs.push(m[1]);
while ((m = dateRe.exec(blogSrc)) !== null) dates.push(m[1]);
for (let i = 0; i < slugs.length; i++) {
  posts.push({ slug: slugs[i], date: dates[i] || TODAY });
}

// Static pages with priority and changefreq
const staticPages = [
  // Core
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/simulator", priority: "0.95", changefreq: "weekly" },
  { loc: "/simulator/swarm", priority: "0.9", changefreq: "weekly" },
  { loc: "/simulator/ai-astronaut-robot", priority: "0.9", changefreq: "weekly" },
  { loc: "/astronauts", priority: "0.95", changefreq: "weekly" },
  { loc: "/planets", priority: "0.95", changefreq: "weekly" },
  { loc: "/missions", priority: "0.95", changefreq: "weekly" },
  { loc: "/artifacts", priority: "0.9", changefreq: "monthly" },
  { loc: "/blog", priority: "0.95", changefreq: "daily" },
  { loc: "/space-news", priority: "0.9", changefreq: "daily" },
  { loc: "/astrobot", priority: "0.85", changefreq: "monthly" },
  { loc: "/recommended-books", priority: "0.8", changefreq: "monthly" },
  { loc: "/space-shop", priority: "0.8", changefreq: "monthly" },

  // Research
  { loc: "/research", priority: "0.85", changefreq: "monthly" },
  { loc: "/research/space-agi-lab", priority: "0.85", changefreq: "monthly" },
  { loc: "/research/space-agi-roadmap", priority: "0.8", changefreq: "monthly" },
  { loc: "/research/space-agi-math", priority: "0.8", changefreq: "monthly" },
  { loc: "/research/space-agi-explanation", priority: "0.8", changefreq: "monthly" },
  { loc: "/research/space-agi-doctrine", priority: "0.8", changefreq: "monthly" },
  { loc: "/research/neuro-space", priority: "0.8", changefreq: "monthly" },
  { loc: "/research/future-civilization", priority: "0.85", changefreq: "monthly" },
  { loc: "/research/next-100-years", priority: "0.85", changefreq: "monthly" },

  // Simulators
  { loc: "/quantum-space-agi", priority: "0.85", changefreq: "monthly" },
  { loc: "/quantum-space-agi/scenario", priority: "0.75", changefreq: "monthly" },
  { loc: "/quantum-space-agi/sim", priority: "0.8", changefreq: "monthly" },
  { loc: "/simulator/quantum-space-agi", priority: "0.8", changefreq: "monthly" },

  // Learn
  { loc: "/learn/orbital-mechanics", priority: "0.9", changefreq: "monthly" },
  { loc: "/learn/aerospace", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/lunar-geology", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/how-satellites-work", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/nasa-study-guide", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/satellite-tutorial", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/nasa-for-kids", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/astronomy-for-kids", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/nasa-for-students", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/what-is-moon", priority: "0.75", changefreq: "monthly" },
  { loc: "/learn/how-solar-system-works", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/how-gps-works", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/how-iss-works", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/how-starlink-works", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/how-nasa-launches-satellite", priority: "0.8", changefreq: "monthly" },
  { loc: "/learn/how-spacex-lands-rockets", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/how-mars-rovers-work", priority: "0.85", changefreq: "monthly" },
  { loc: "/learn/astrophysics", priority: "0.75", changefreq: "monthly" },
  { loc: "/learn/quantum-physics", priority: "0.75", changefreq: "monthly" },
  { loc: "/learn/quantum-physics-nasa", priority: "0.7", changefreq: "monthly" },
  { loc: "/learn/aerodynamics", priority: "0.75", changefreq: "monthly" },
  { loc: "/learn/quantum-space", priority: "0.7", changefreq: "monthly" },
  { loc: "/learn/experiments", priority: "0.7", changefreq: "monthly" },
  { loc: "/learn/space-questions", priority: "0.75", changefreq: "monthly" },
  { loc: "/learn/newton", priority: "0.7", changefreq: "monthly" },
  { loc: "/learn/formulas", priority: "0.7", changefreq: "monthly" },

  // Tools
  { loc: "/formulas-library", priority: "0.85", changefreq: "monthly" },
  { loc: "/calculators", priority: "0.8", changefreq: "monthly" },
  { loc: "/satellites", priority: "0.8", changefreq: "monthly" },
  { loc: "/compare/orbits", priority: "0.75", changefreq: "monthly" },
  { loc: "/missions/timeline", priority: "0.75", changefreq: "monthly" },

  // Other
  { loc: "/ai-in-aerospace", priority: "0.85", changefreq: "weekly" },
  { loc: "/ai-in-space", priority: "0.85", changefreq: "weekly" },
  { loc: "/space-quiz", priority: "0.75", changefreq: "monthly" },
  { loc: "/quiz/orbital-mechanics", priority: "0.7", changefreq: "monthly" },
  { loc: "/careers", priority: "0.75", changefreq: "monthly" },
  { loc: "/guide", priority: "0.7", changefreq: "monthly" },
  { loc: "/play", priority: "0.7", changefreq: "monthly" },
  { loc: "/welcome", priority: "0.7", changefreq: "monthly" },
  { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
];

// Blog categories
const categories = [
  "space-agi", "agi-research", "robot-engineering", "space-engineering",
  "nasa-news", "space-facts", "satellite-tutorials", "astronomy-lessons",
  "aerodynamics", "quantum-physics",
];

// Astronaut profiles
const astronauts = [
  "neil-armstrong", "buzz-aldrin", "pete-conrad", "alan-bean",
  "alan-shepard", "edgar-mitchell", "david-scott", "james-irwin",
  "john-young", "charles-duke", "gene-cernan", "harrison-schmitt",
  "michael-collins", "yuri-gagarin", "sally-ride", "chris-hadfield",
  "mae-jemison", "john-glenn",
];

// Planets
const planets = [
  "mercury", "venus", "earth", "moon", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto",
];

// Missions
const missions = [
  "apollo-11", "apollo-12", "apollo-14", "apollo-15",
  "apollo-16", "apollo-17", "gemini-8", "vostok-1",
  "freedom-7", "friendship-7", "sts-1", "sts-7",
];

// Build XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static pages
for (const p of staticPages) {
  xml += `  <url><loc>${SITE}${p.loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>\n`;
}

// Blog categories
xml += `\n  <!-- BLOG CATEGORIES -->\n`;
for (const cat of categories) {
  xml += `  <url><loc>${SITE}/blog/category/${cat}</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>0.85</priority></url>\n`;
}

// Astronaut profiles
xml += `\n  <!-- ASTRONAUT PROFILES -->\n`;
for (const a of astronauts) {
  xml += `  <url><loc>${SITE}/astronauts/${a}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
}

// Planets
xml += `\n  <!-- PLANETS -->\n`;
for (const p of planets) {
  const pri = ["mars", "moon", "earth"].includes(p) ? "0.85" : "0.8";
  xml += `  <url><loc>${SITE}/planets/${p}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${pri}</priority></url>\n`;
}

// Missions
xml += `\n  <!-- MISSIONS -->\n`;
for (const m of missions) {
  const pri = m === "apollo-11" ? "0.9" : "0.8";
  xml += `  <url><loc>${SITE}/missions/${m}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${pri}</priority></url>\n`;
}

// ALL blog posts
xml += `\n  <!-- ALL ${posts.length} BLOG POSTS -->\n`;
const seen = new Set();
for (const p of posts) {
  if (seen.has(p.slug)) continue;
  seen.add(p.slug);
  xml += `  <url><loc>${SITE}/blog/${p.slug}</loc><lastmod>${p.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
}

xml += `</urlset>\n`;

const outPath = path.join(__dirname, "..", "client", "public", "sitemap.xml");
fs.writeFileSync(outPath, xml);
console.log(`Sitemap generated: ${seen.size} blog posts + ${staticPages.length} static + ${categories.length} categories + ${astronauts.length} astronauts + ${planets.length} planets + ${missions.length} missions`);
console.log(`Total URLs: ${seen.size + staticPages.length + categories.length + astronauts.length + planets.length + missions.length}`);
