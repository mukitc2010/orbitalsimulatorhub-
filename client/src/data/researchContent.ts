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
  },
  {
    id: "research-004",
    date: "2026-03-26",
    title: "ARC-AGI Benchmarks and the Path to Artificial General Intelligence (2026)",
    type: "trend",
    category: "general",
    summary: "2026 ARC-AGI benchmark analysis reveals AI achieves 93% on ARC-AGI-1 but only 13% on ARC-AGI-3, exposing the compositional reasoning gap. Covers transformer reasoning, agent swarm architectures, and Google DeepMind's 10-ability cognitive framework for AGI.",
    content: `# ARC-AGI Benchmarks and the Path to Artificial General Intelligence

## Overview

The ARC-AGI benchmark series (2024-2026) has become the definitive measure of progress toward artificial general intelligence. Unlike narrow benchmarks that reward memorization, ARC tests fluid intelligence — the ability to solve novel abstract reasoning problems. Results from 2026 reveal both remarkable progress and fundamental limitations.

## Performance Across ARC Versions

| Benchmark | Best AI Score | Human Baseline |
|-----------|-------------|---------------|
| ARC-AGI-1 | 93.0% | ~98% |
| ARC-AGI-2 | 68.8% | ~97% |
| ARC-AGI-3 | 13.0% | ~95% |

The consistent 2-3x performance degradation across versions confirms that current approaches struggle with compositional generalization — combining learned primitives in novel configurations.

## Key Technical Approaches

### Transformer-Based Abstract Reasoning
Advanced transformer systems combine neural inference with structure-aware priors, test-time training (TTT), and symmetry-aware decoding. These approaches improve pattern recognition but remain brittle on compositional tasks.

### Agent Swarm Architectures
Multimodal agentic models introduce parallel orchestration frameworks that decompose complex tasks into concurrent sub-problems, achieving up to 4.5x latency reduction over sequential processing.

### Neuro-Symbolic Hybrids
Program synthesis combined with neural pattern recognition shows promise for specific ARC task families but doesn't generalize across the full corpus.

## Google DeepMind Cognitive Framework

DeepMind identified 10 cognitive abilities necessary for AGI: perception, attention, memory, learning, reasoning, problem solving, executive functions, social cognition, metacognition, and generation. The Structural Meta-Model of General Intelligence (SMGI) proposes mathematical foundations through typed meta-models and dynamical systems.

## Implications for Space-AGI

The compositional reasoning measured by ARC-AGI directly maps to capabilities needed for autonomous spacecraft operating under communication delays. Mars missions require genuine novel-problem-solving — exactly the capability gap that ARC-AGI-3 exposes.

## References

See ARC Prize 2025 results, Google DeepMind cognitive framework paper, and SMGI structural theory (arXiv 2603.07896).`,
    keywords: ["AGI", "ARC-AGI", "artificial general intelligence", "compositional reasoning", "transformer", "agent swarm", "DeepMind", "SMGI"],
    references: [
      { title: "ARC-AGI-2 Technical Report", url: "https://arxiv.org/abs/2603.06590", source: "arXiv", type: "paper" },
      { title: "The ARC of Progress towards AGI: A Living Survey", url: "https://arxiv.org/abs/2603.13372", source: "arXiv", type: "paper" },
      { title: "Google DeepMind: Measuring AGI Cognitive Framework", url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/measuring-agi-cognitive-framework/", source: "Google", type: "paper" },
      { title: "SMGI: A Structural Theory of General AI", url: "https://arxiv.org/abs/2603.07896v1", source: "arXiv", type: "paper" }
    ],
    dataPoints: [
      { label: "ARC-AGI-1 Best AI Score", value: "93.0", unit: "%", source: "ARC Prize 2025" },
      { label: "ARC-AGI-2 Best AI Score", value: "68.8", unit: "%", source: "ARC Prize 2025" },
      { label: "ARC-AGI-3 Best AI Score", value: "13.0", unit: "%", source: "ARC Prize 2025" },
      { label: "Agent Swarm Latency Reduction", value: "4.5", unit: "x", source: "Kimi K2.5 paper" }
    ],
    relatedTopics: ["Space-AGI", "machine learning", "compositional reasoning", "transformer architectures"],
    seoKeywords: "AGI 2026, ARC-AGI benchmark, artificial general intelligence progress, compositional reasoning AI, Google DeepMind AGI"
  },
  {
    id: "research-005",
    date: "2026-03-26",
    title: "Humanoid Robot Engineering for Space: NASA Valkyrie, Walking Stability, and Mars Readiness",
    type: "case-study",
    category: "aerospace",
    summary: "Comprehensive analysis of NASA's Valkyrie humanoid robot after a decade at Edinburgh, Georgia Tech's 81% bipedal stability improvement, and the engineering roadmap for Mars surface robotics.",
    content: `# Humanoid Robot Engineering for Space Operations

## Overview

2026 marks a turning point for space robotics. NASA's Valkyrie humanoid completed a decade-long research program at the University of Edinburgh, while Georgia Tech demonstrated an 81% improvement in bipedal walking stability recovery. These advances bring Mars-ready humanoid robots significantly closer to reality.

## NASA Valkyrie (R5)

### Specifications
- Height: 1.8 meters
- Mass: 125 kg
- DOF: 44 (6 per leg, 7 per arm, 3 neck, 3 waist, 6 per hand)
- Sensors: Lidar, stereo cameras, IMU, force/torque sensors
- Power: 2 kWh lithium-ion battery (1.5 hrs operation)

### Decade of Research at Edinburgh (2016-2026)
Researchers dramatically expanded Valkyrie's capabilities through AI and machine learning:
- Whole-body motion planning using trajectory optimization
- Adaptive locomotion on uneven and deformable terrain
- Dexterous manipulation with force feedback
- Sensor fusion for real-time environment mapping
- Safe human-proximate operation protocols

## Walking Stability Breakthrough (Georgia Tech 2026)

### Real-Time Planning and Control Framework
Georgia Tech developed a framework achieving 81% improvement in stability recovery for the Cassie bipedal robot:

**MPC Formulation for Bipedal Balance:**
\\\`
min Σ ||q_k - q_ref||²_Q + ||τ_k||²_R
s.t. q_{k+1} = f(q_k, τ_k)
     ZMP ∈ support_polygon
     τ_min ≤ τ_k ≤ τ_max
\\\`

Key results:
- Autonomous gait adjustment on obstacles and directional changes
- Moving platform navigation (spacecraft/habitat floors)
- Real-time collision avoidance at walking speed
- No pre-programmed response library required

## Robonaut Heritage

Robonaut 2 (R2), deployed to ISS in 2011, validated humanoid operation in space:
- 7 DOF per arm, 20 lb holding capacity
- 2014 upgrade: climbing legs, enhanced processors
- Demonstrated dexterous tool use in microgravity

## Mars Deployment Roadmap

1. Advance robot landing (2+ years before crew)
2. ISRU operations (water extraction, O₂/fuel production)
3. Habitat assembly from pre-fabricated modules
4. Life support maintenance and inspection
5. Scientific sample collection and instrument deployment

## References

See NASA JSC Valkyrie program, Georgia Tech AMBER Lab, IEEE-RAS proceedings.`,
    keywords: ["humanoid robot", "Valkyrie", "Robonaut", "NASA", "bipedal locomotion", "walking stability", "Mars robotics", "robot engineering"],
    references: [
      { title: "NASA Valkyrie (R5) Program", url: "https://nasa.gov/valkyrie", source: "NASA", type: "website" },
      { title: "Robonaut 2 - NASA", url: "https://nasa.gov/robonaut2", source: "NASA", type: "website" },
      { title: "Georgia Tech AMBER Lab - Bipedal Locomotion", url: "https://www.gatech.edu/news/2026/02/18/humanoid-robots-make-confident-strides-toward-walking-stability", source: "Georgia Tech", type: "paper" }
    ],
    dataPoints: [
      { label: "Valkyrie Height", value: "1.8", unit: "m", source: "NASA JSC" },
      { label: "Valkyrie Mass", value: "125", unit: "kg", source: "NASA JSC" },
      { label: "Valkyrie DOF", value: "44", unit: "joints", source: "NASA JSC" },
      { label: "Walking Stability Recovery Improvement", value: "81", unit: "%", source: "Georgia Tech 2026" }
    ],
    relatedTopics: ["Space-AGI", "Mars missions", "humanoid robotics", "locomotion control"],
    seoKeywords: "NASA Valkyrie humanoid robot, robot engineering space 2026, bipedal walking stability, Robonaut ISS, Mars robotics"
  },
  {
    id: "research-006",
    date: "2026-03-26",
    title: "Nuclear Electric Propulsion: NASA SR-1 Freedom and the Future of Deep Space Engineering",
    type: "discovery",
    category: "aerospace",
    summary: "Analysis of NASA's SR-1 Freedom nuclear-propelled Mars mission (launch 2028), closed Brayton cycle power conversion, and how nuclear electric propulsion transforms deep space mission design.",
    content: `# Nuclear Electric Propulsion: SR-1 Freedom Mission Analysis

## Overview

NASA's Space Reactor-1 Freedom (SR-1 Freedom), announced March 2026, will be the first nuclear-propelled spacecraft to exit Earth's sphere of influence. Launching December 2028, it demonstrates Nuclear Electric Propulsion (NEP) — a technology that fundamentally changes the calculus of deep space mission design.

## Mission Architecture

### Power System
- Reactor: 20+ kW HALEU (High-Assay Low-Enriched Uranium) fission reactor
- Power Conversion: Closed Brayton cycle
- Propulsion: Xenon ion thrusters
- Payload: 3x Ingenuity-class helicopters + science instruments

### Brayton Cycle Efficiency
\\\`
η_Brayton = 1 - (T_cold/T_hot)^((γ-1)/γ)
\\\`

The closed Brayton cycle achieves higher efficiency than thermoelectric converters used in RTGs, making it practical for the 20+ kW power range needed for electric propulsion.

## Propulsion Physics

### Specific Impulse Comparison
| System | Isp (seconds) | Thrust (N) |
|--------|--------------|-----------|
| Chemical (LOX/LH2) | 450 | 10⁵-10⁷ |
| Xenon Ion | 3,000-12,000 | 0.01-1 |
| Nuclear Thermal | 800-900 | 10⁴-10⁶ |

### Tsiolkovsky Equation
\\\`
Δv = Isp × g₀ × ln(m₀/m_f)
\\\`

With Isp 10-25x higher than chemical propulsion, ion thrusters achieve equivalent Δv with exponentially less propellant mass.

## Testing Heritage (2025)

NASA completed 100+ cold-flow tests at Marshall Space Flight Center:
- Full-scale nuclear rocket reactor prototype
- First such tests since 1960s NERVA program
- Validated stable hydrogen flow
- Confirmed safe operation without dangerous oscillations
- Produced the most detailed flow data for a flight-like space reactor in 50+ years

## Mission Impact Analysis

### SR-1 Freedom (2028): Unmanned Mars demonstration, 20 kW
### Cargo Precursor (2030s): 100+ kW, pre-position supplies at Mars
### Crewed Transit (2035+): MW-class, potentially reducing Mars transit from 9 to 3-4 months

## Why NEP Changes Deep Space Engineering

1. Distance independence (no solar dependency)
2. Higher payload mass fraction
3. Continuous thrust enables trajectory flexibility
4. Abort capability during transit
5. Outer solar system access with reasonable timelines

## References

See NASA STMD Nuclear Propulsion program, Marshall Space Flight Center test reports, and BWXT reactor development.`,
    keywords: ["nuclear propulsion", "SR-1 Freedom", "NASA", "ion thruster", "Brayton cycle", "NEP", "HALEU", "Mars mission", "space engineering"],
    references: [
      { title: "NASA SR-1 Freedom Mission", url: "https://www.nasaspaceflight.com/2026/03/nasa-sr1-freedom-mars-2028/", source: "NASASpaceFlight", type: "website" },
      { title: "NASA Space Nuclear Propulsion Testing", url: "https://www.nasa.gov/directorates/stmd/tech-demo-missions-program/space-nuclear-propulsion-snp/nasa-testing-advances-space-nuclear-propulsion-capabilities/", source: "NASA", type: "website" },
      { title: "BWXT Nuclear Propulsion Cold-Flow Tests", url: "https://www.executivegov.com/articles/nasa-nuclear-propulsion-cold-flow-test-bwxt", source: "ExecutiveGov", type: "paper" }
    ],
    formulas: [
      { name: "Brayton Cycle Efficiency", equation: "η = 1 - (T_cold/T_hot)^((γ-1)/γ)", description: "Thermal efficiency of the closed Brayton cycle power conversion system" },
      { name: "Tsiolkovsky Rocket Equation", equation: "Δv = Isp × g₀ × ln(m₀/m_f)", description: "Relates velocity change to specific impulse and mass ratio" },
      { name: "Ion Thrust", equation: "F = ṁ × v_exhaust = P_beam × 2 / v_exhaust", description: "Ion thruster force as a function of beam power and exhaust velocity" }
    ],
    dataPoints: [
      { label: "SR-1 Reactor Power", value: "20+", unit: "kW", source: "NASA" },
      { label: "Xenon Ion Isp", value: "3000-12000", unit: "seconds", source: "NASA" },
      { label: "Chemical Rocket Isp", value: "300-450", unit: "seconds", source: "NASA" },
      { label: "Cold-Flow Tests Completed", value: "100+", unit: "tests", source: "Marshall SFC" },
      { label: "Mars Arrival", value: "~1", unit: "year after launch", source: "NASA" }
    ],
    relatedTopics: ["nuclear propulsion", "Mars missions", "ion thrusters", "space reactor", "deep space engineering"],
    seoKeywords: "NASA SR-1 Freedom nuclear propulsion, nuclear electric propulsion Mars 2028, HALEU fission reactor space, xenon ion thruster, Brayton cycle spacecraft"
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
