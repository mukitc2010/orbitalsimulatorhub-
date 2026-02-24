/**
 * Research Content for PhD Students and Researchers
 * Auto-updated daily via n8n workflow
 * Provides valuable content for research papers and scientific work
 */

export interface ResearchContent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: "paper-summary" | "discovery" | "methodology" | "data-source" | "tool" | "case-study" | "trend" | "formula" | "documentation";
  category: "nasa" | "orbital-mechanics" | "astrophysics" | "quantum-physics" | "aerospace" | "general";
  summary: string;
  content: string; // Full content
  keywords: string[];
  references: Array<{
    title: string;
    url: string;
    source: string;
    type: "paper" | "website" | "documentation" | "data" | "tool";
  }>;
  formulas?: Array<{
    name: string;
    equation: string;
    description: string;
  }>;
  dataPoints?: Array<{
    label: string;
    value: string;
    unit?: string;
    source: string;
  }>;
  relatedTopics?: string[];
  seoKeywords?: string;
}

export const RESEARCH_CONTENT: ResearchContent[] = [
  {
    id: "research-003",
    date: "2026-02-23",
    title: "MDP and MPC for Autonomous Satellite Collision Avoidance",
    type: "paper-summary",
    category: "orbital-mechanics",
    summary: "2025–2026 research on Markov Decision Process (MDP) and Model Predictive Control (MPC) for autonomous satellite collision avoidance. Covers reinforcement learning, decentralized control, and propellant-optimal maneuvers.",
    content: `# MDP and MPC for Autonomous Satellite Collision Avoidance

## Overview

Recent research (2025–2026) advances autonomous satellite collision avoidance using Markov Decision Processes (MDPs), Model Predictive Control (MPC), and reinforcement learning. These methods enable scalable, fuel-efficient collision avoidance for mega-constellations like Starlink.

## Key Approaches

### 1. MDP with Reinforcement Learning

MDP frameworks optimize early maneuver decisions for collision avoidance maneuvers (CAMs). Policy gradient algorithms minimize propellant consumption while maintaining acceptable collision risk. Compared to conventional cut-off policies, MDP-based approaches show significant propellant savings.

### 2. Decentralized MPC

Decentralized MDP-based approaches generate optimal maneuver policies online with low computational cost—critical for large satellite constellations. They compare favorably to traditional rule-based collision avoidance.

### 3. Swarm Intelligence

Multi-agent systems and distributed algorithms address collision-free trajectory planning in satellite constellations. Decentralized control improves scalability and resilience over centralized systems.

## Mathematical Framework

### MPC Formulation

\`\`\`
x_{k+1} = A x_k + B u_k
min Σ (x_k - x_ref)^T Q (x_k - x_ref) + u_k^T R u_k
\`\`\`

### MDP State-Action

- **State:** Relative position, velocity, covariance (uncertainty)
- **Action:** Thrust magnitude and direction
- **Reward:** -propellant_used - collision_risk_penalty

## Applications

- Starlink and mega-constellation operations
- Space traffic management
- On-orbit servicing and debris avoidance
- Space-AGI autonomous navigation

## References

See NASA Orbital Debris Program, ESA Space Debris Office, and recent arXiv/IEEE publications on autonomous collision avoidance.`,
    keywords: ["MDP", "MPC", "collision avoidance", "satellite", "reinforcement learning", "autonomous", "Starlink", "space traffic"],
    references: [
      { title: "NASA Orbital Debris Program Office", url: "https://orbitaldebris.jsc.nasa.gov/", source: "NASA.gov", type: "website" },
      { title: "ESA Space Debris Office", url: "https://www.esa.int/Safety_Security/Space_Debris", source: "ESA", type: "website" }
    ],
    relatedTopics: ["Space-AGI", "orbital mechanics", "MPC", "collision probability"],
    seoKeywords: "satellite collision avoidance MDP MPC, autonomous collision avoidance, reinforcement learning space, Starlink collision avoidance",
  },
  {
    id: "research-001",
    date: "2026-02-14",
    title: "Recent Advances in Orbital Debris Mitigation Strategies",
    type: "paper-summary",
    category: "orbital-mechanics",
    summary: "A comprehensive review of current orbital debris mitigation techniques and their effectiveness in maintaining sustainable space operations.",
    content: `# Recent Advances in Orbital Debris Mitigation Strategies

## Overview
This research examines current strategies for mitigating orbital debris, including active debris removal, collision avoidance, and end-of-life disposal protocols.

## Key Findings
- Active debris removal technologies show promise but require international cooperation
- Collision avoidance systems have improved significantly with better tracking
- End-of-life disposal protocols vary by orbit type (LEO vs GEO)

## Methodology
The study analyzed data from NASA's Orbital Debris Program Office and ESA's Space Debris Office, comparing mitigation strategies across different orbital regimes.

## Applications
- Space mission planning
- Satellite constellation design
- International space policy development

## References
See reference links below for full paper and data sources.`,
    keywords: ["orbital debris", "space debris", "mitigation", "collision avoidance", "LEO", "GEO"],
    references: [
      {
        title: "NASA Orbital Debris Program Office",
        url: "https://orbitaldebris.jsc.nasa.gov/",
        source: "NASA.gov",
        type: "website"
      },
      {
        title: "ESA Space Debris Office",
        url: "https://www.esa.int/Safety_Security/Space_Debris",
        source: "ESA",
        type: "website"
      }
    ],
    relatedTopics: ["orbital mechanics", "space sustainability", "satellite operations"],
    seoKeywords: "orbital debris, space debris mitigation, collision avoidance, LEO GEO debris"
  },
  {
    id: "research-002",
    date: "2026-02-14",
    title: "Precision Orbit Determination Using GPS Data",
    type: "methodology",
    category: "orbital-mechanics",
    summary: "Methodology for high-precision orbit determination using GPS measurements, applicable to research satellites and space missions.",
    content: `# Precision Orbit Determination Using GPS Data

## Methodology Overview
This methodology describes the process of determining satellite orbits with centimeter-level accuracy using GPS measurements.

## Key Steps
1. GPS measurement collection
2. Data preprocessing and quality control
3. Orbit determination using least-squares estimation
4. Validation against independent measurements

## Mathematical Framework
The orbit determination process uses the following key equations:

### Observation Model
\`\`\`
ρ = ||r_satellite - r_GPS|| + c·δt + errors
\`\`\`

### Least-Squares Solution
\`\`\`
x = (H^T·W·H)^(-1)·H^T·W·y
\`\`\`

Where:
- ρ = pseudorange measurement
- H = observation matrix
- W = weight matrix
- y = measurement vector

## Applications
- Research satellite missions
- Earth observation satellites
- Space science missions

## Data Sources
GPS data available from:
- NASA CDDIS (Crustal Dynamics Data Information System)
- IGS (International GNSS Service)
- Mission-specific GPS receivers`,
    keywords: ["orbit determination", "GPS", "precision", "measurement", "least squares"],
    formulas: [
      {
        name: "Pseudorange Observation",
        equation: "ρ = ||r_satellite - r_GPS|| + c·δt",
        description: "Basic GPS pseudorange measurement equation"
      },
      {
        name: "Least-Squares Solution",
        equation: "x = (H^T·W·H)^(-1)·H^T·W·y",
        description: "Weighted least-squares solution for orbit parameters"
      }
    ],
    references: [
      {
        title: "NASA CDDIS",
        url: "https://cddis.nasa.gov/",
        source: "NASA",
        type: "data"
      },
      {
        title: "IGS Data Center",
        url: "https://www.igs.org/",
        source: "IGS",
        type: "data"
      }
    ],
    relatedTopics: ["GPS", "orbit determination", "measurement theory"],
    seoKeywords: "precision orbit determination, GPS, satellite navigation, least squares"
  }
];

/**
 * Get research content by category
 */
export function getResearchContentByCategory(category: ResearchContent["category"]): ResearchContent[] {
  return RESEARCH_CONTENT.filter(content => content.category === category);
}

/**
 * Get research content by type
 */
export function getResearchContentByType(type: ResearchContent["type"]): ResearchContent[] {
  return RESEARCH_CONTENT.filter(content => content.type === type);
}

/**
 * Get latest research content
 */
export function getLatestResearchContent(limit: number = 10): ResearchContent[] {
  return RESEARCH_CONTENT
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Search research content by keywords
 */
export function searchResearchContent(query: string): ResearchContent[] {
  const lowerQuery = query.toLowerCase();
  return RESEARCH_CONTENT.filter(content =>
    content.title.toLowerCase().includes(lowerQuery) ||
    content.summary.toLowerCase().includes(lowerQuery) ||
    content.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
}
