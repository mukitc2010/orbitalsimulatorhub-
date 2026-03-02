/**
 * SEO Configuration for Pages
 * This file stores SEO meta tags for each page
 * Can be updated via API for n8n automation
 */

import { getPostBySlug } from "./blogPosts";

export interface SEOConfig {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  lastUpdated: string; // ISO date string
}

export const SEO_CONFIGS: Record<string, SEOConfig> = {
  "/": {
    path: "/",
    title: "Orbital Mechanics Simulator — Free 3D Orbit & Swarm Simulator | NASA & Space Study",
    description: "Free orbital mechanics simulator. Orbit Simulator: LEO, MEO, GEO. Swarm Simulator: 500+ AI satellites, collision avoidance. ISS 7.66 km/s, Starlink, GPS. 500+ astronauts, nuclear rockets, Mars. No signup.",
    keywords: "orbital mechanics simulator, free satellite orbit simulator, 3D orbit simulator online, free orbit simulator no download, how to learn orbital mechanics, space simulator free, ISS orbit speed 7.66 km/s, swarm simulator, AI collision avoidance, Starlink simulator, LEO MEO GEO explained, orbital velocity calculator, astronaut database, planet explorer, space for kids, space for students, NASA space study, James Webb, Artemis, SpaceX, Mars mission, nuclear rocket DRACO, satellite orbit visualization, space education free, orbit simulator game",
    ogTitle: "Orbital Mechanics Simulator — Free 3D Orbit & Swarm Simulator",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/welcome": {
    path: "/welcome",
    title: "Welcome | Community Hub | Orbital Simulator Hub",
    description: "Welcome to Orbital Simulator Hub community. Explore the 3D simulator, Ask AstroBot, space blog, research hub, astronaut database, and planet explorer.",
    keywords: "space community, orbital simulator hub, space learning, simulator, AstroBot, space blog, research hub",
    ogTitle: "Welcome | Orbital Simulator Hub Community",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/learn/aerospace": {
    path: "/learn/aerospace",
    title: "Space Study & Aerospace Engineering Reference | NASA, Orbital Mechanics | Orbital Simulator Hub",
    description: "Aerospace engineering reference: space study, NASA missions, orbital mechanics, Newton's laws, algorithms, rovers. For students, scientists, and PhD researchers. NTRS, SPICE, Horizons.",
    keywords: "space study, aerospace engineering, NASA, aerospace reference, space missions, Newton laws, orbital mechanics, PhD research, aerospace algorithms, space rovers, NTRS, SPICE, Horizons",
    ogTitle: "Aerospace Reference — PhD Research Resources",
    lastUpdated: "2026-02-15T00:00:00Z",
  },
  "/simulator": {
    path: "/simulator",
    title: "3D Orbit Simulator & Swarm Simulator — ISS, Starlink, AI Collision Avoidance | Free",
    description: "Orbit Simulator: Add LEO, MEO, GEO satellites. Swarm Simulator: 500+ AI satellites avoiding collisions. J2 propagation, collision probability, OSQP control. Free — no signup.",
    keywords: "satellite orbit simulator, 3D orbit simulator free, orbit simulator online, add ISS Starlink GPS, LEO MEO GEO simulator, how to simulate satellite orbit, swarm simulator, AI collision avoidance, Starlink constellation simulator, ISS orbit 7.66 km/s, satellite collision probability, space traffic management, orbital debris avoidance, free space simulator, orbit visualization tool, satellite tracking simulator",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/simulator/swarm": {
    path: "/simulator/swarm",
    title: "Swarm Simulator — AI Satellite Collision Avoidance | 500+ Satellites, J2, Pc, OSQP",
    description: "World-first AI swarm collision avoidance simulator. 500+ satellites, J2 propagation, covariance, collision probability Pc, OSQP control. Research-grade autonomous space traffic. Free online.",
    keywords: "swarm simulator, satellite collision avoidance, AI space traffic, orbital collision probability, J2 propagation, OSQP satellite control, Starlink constellation simulator, space debris avoidance, autonomous satellite navigation, collision probability Pc, mega-constellation simulator, 500 satellites simulator, space traffic management AI, collision avoidance algorithm, MPC satellite control",
    ogTitle: "Swarm Simulator — AI Collision Avoidance for 500+ Satellites",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/simulator/ai-astronaut-robot": {
    path: "/simulator/ai-astronaut-robot",
    title: "AI Astronaut Robot Simulator — Build & Train Space Robots | Space-AGI Robotics Lab",
    description: "World-first AI Astronaut Robot Simulator. Build humanoid, rover, drone robots. Train vision AI. Simulate ISS, Moon, Mars, deep space. Object detection, navigation, satellite repair. Trusted by engineers, researchers, future space pioneers.",
    keywords: "space ai robot, astronaut robot simulator, ai humanoid in space, space robotics training, build space robot online, space agi robotics, NASA robot, SpaceX robot, AI space robot, humanoid robot space, Mars rover AI, ISS robot, computer vision space",
    ogTitle: "AI Astronaut Robot Simulator — World First Space-AGI Robotics Lab",
    lastUpdated: "2026-03-05T00:00:00Z",
  },
  "/quantum-space-agi": {
    path: "/quantum-space-agi",
    title: "Quantum Space AGI Lab — Curvature-Aware Navigation | OrbitalSimulatorHub",
    description: "Explore curvature-aware navigation with a safety shield and simulated quantum-assist planner. Educational sandbox for OrbitalSimulatorHub.",
    keywords: "quantum space AGI, curvature navigation, quantum assist, OrbitalSimulatorHub, space education",
    ogTitle: "Quantum Space AGI Lab",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/quantum-space-agi/scenario": {
    path: "/quantum-space-agi/scenario",
    title: "Choose Scenario — Quantum Space AGI Lab",
    description: "Select Schwarzschild, Kerr, or Wormhole scenario for the quantum space simulator.",
    keywords: "quantum space scenario, Schwarzschild, Kerr, wormhole",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/quantum-space-agi/sim": {
    path: "/quantum-space-agi/sim",
    title: "Quantum Space AGI Simulator — Black Hole Flyby",
    description: "Quantum-assisted black hole flyby simulator. Schwarzschild, Kerr, wormhole scenarios.",
    keywords: "quantum space simulator, black hole flyby, Schwarzschild, Kerr",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/quantum-space-agi/compare": {
    path: "/quantum-space-agi/compare",
    title: "Compare Runs — Quantum Space AGI Lab",
    description: "Comparison is available inside the Simulator when you run Quantum Assist.",
    keywords: "quantum space compare, classical vs quantum",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/simulator/quantum-space-agi": {
    path: "/simulator/quantum-space-agi",
    title: "Quantum Space AGI Simulator — Black Hole Flyby, Schwarzschild, Kerr, Wormhole",
    description: "Quantum-assisted black hole flyby simulator. Schwarzschild, Kerr, wormhole scenarios. Compare classical vs quantum-optimized trajectories. Tidal limits, horizon margin, fuel budget. GR-inspired toy physics for learning.",
    keywords: "quantum space simulator, black hole flyby, Schwarzschild, Kerr black hole, wormhole simulator, quantum assist space, GR simulator, general relativity toy, tidal limit, event horizon, space AGI",
    ogTitle: "Quantum Space AGI — Black Hole Flyby Simulator",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/play": {
    path: "/play",
    title: "Play & Learn Space – 3D Simulator, Solar System, Astronauts | Orbital Simulator Hub",
    description: "Play and learn: 3D orbit simulator, space missions, solar system, astronauts, rovers. Fun space learning for kids and students.",
    keywords: "space for kids, play and learn space, orbit simulator, solar system, space learning",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/formulas-library": {
    path: "/formulas-library",
    title: "Orbital Mechanics Formulas – Gravity, Orbital Velocity, Kepler, Rocket Equation",
    description: "Space formulas: orbital velocity v=√(μ/r), escape velocity, Kepler's laws, rocket equation. Orbital period formula. Free calculators. For students and engineers.",
    keywords: "orbital mechanics formulas, orbital velocity formula, v equals root mu over r, escape velocity formula, Kepler laws, Kepler third law, rocket equation, Tsiolkovsky equation, orbital period formula, gravity formula space, space physics formulas, orbital mechanics equations",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/satellites": {
    path: "/satellites",
    title: "ISS 7.66 km/s, Starlink, GPS — Real Satellite Orbit Data",
    description: "ISS, Starlink, GPS: real altitude, speed, period. How fast does ISS orbit? Free data. See it in the 3D simulator.",
    keywords: "ISS orbit, ISS speed 7.66 km/s, how fast does ISS orbit, Starlink satellites altitude, GPS orbit altitude, satellite altitude data, real satellite orbit data, ISS orbital period 92 minutes, satellite tracking data, LEO satellite speed",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/calculators": {
    path: "/calculators",
    title: "How Fast Does the ISS Orbit? 7.66 km/s — Free Calculator",
    description: "ISS orbits at 7.66 km/s (27,600 km/h). 92 min per orbit. Calculate orbital velocity for any altitude — free tool. Try it now.",
    keywords: "orbit calculator, orbital velocity calculator, how fast does ISS orbit, ISS speed km/s, orbital period calculator, escape velocity calculator, gravity calculator, Hohmann transfer calculator, collision probability calculator, Mars delay calculator, orbital period formula, v equals root mu over r, free orbit calculator",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/guide": {
    path: "/guide",
    title: "Space & Orbital Mechanics Guide for Beginners | Orbital Simulator Hub",
    description: "Beginner guide to space and orbital mechanics. Learn how satellites orbit, what is LEO, and explore the simulator step by step.",
    keywords: "orbital mechanics guide, space guide for beginners, how to use orbit simulator, space for kids guide, learn space free, satellite guide, LEO MEO GEO guide",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/astrobot": {
    path: "/astrobot",
    title: "Ask AstroBot — Free Space Q&A | Orbits, Satellites, ISS",
    description: "Ask anything about space. Orbits, satellites, ISS, rockets. Get instant answers. Free — try it now.",
    keywords: "space chatbot, ask space questions, space Q&A free, orbital mechanics help, why do satellites fall, how does ISS orbit, space AI assistant, astronaut facts, planet questions, Mars rover questions, space homework help, space quiz answers",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/research": {
    path: "/research",
    title: "Space Research & PhD Resources – Algorithms, Real Data | Orbital Simulator Hub",
    description: "Research hub: space agency resources, orbital mechanics algorithms, real mission data. For students, PhD researchers, and space scientists.",
    keywords: "space research, orbital mechanics research, PhD aerospace, space agency resources, NASA research, orbital mechanics algorithms, space mission data, aerospace research papers, space science resources",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/research/future-civilization": {
    path: "/research/future-civilization",
    title: "Future of Space Civilization – From Earth to Interstellar | Orbital Simulator Hub",
    description: "Vision for humanity's space future: lunar presence, Mars, solar system economy, interstellar. Phases of space civilization. Global Space Research Hub.",
    keywords: "future space civilization, space future, interstellar, Mars colonization, lunar base, space habitat",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/research/next-100-years": {
    path: "/research/next-100-years",
    title: "Next 100 Years of Humanity – Space Roadmap 2025–2125 | Orbital Simulator Hub",
    description: "Strategic roadmap for space exploration: Moon, Mars, solar system, interstellar. Decade-by-decade vision. Based on publicly available space agency research.",
    keywords: "next 100 years space, space roadmap, Mars 2030s, interstellar 2100, space future",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/research/neuro-space": {
    path: "/research/neuro-space",
    title: "Light-Speed Constraints, Neuro-Space Cognition & Aerospace Dynamics | Orbital Simulator Hub Research",
    description: "Unified framework for future space navigation: relativistic aerospace, signal delay, neuro-space AI, autonomous spacecraft. OrbitalSimulatorHub Research Division.",
    keywords: "neuro-space, light-speed constraints, autonomous spacecraft, aerospace AI, deep space navigation, relativistic aerospace, quantum space communication",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/research/space-agi-lab": {
    path: "/research/space-agi-lab",
    title: "Space-AGI Engineering Lab — Autonomous Spacecraft, AI, Orbital Math | Orbital Simulator Hub",
    description: "World-first platform: real simulations, real mathematics, real engineering logic, future AGI for space. 5 pillars: autonomous spacecraft, decision intelligence, orbital math, future systems, live simulation lab.",
    keywords: "Space-AGI, autonomous spacecraft, AI satellites, Mars rover AI, swarm satellites, orbital mechanics AI, space decision intelligence, delayed MDP, Mars delay, autonomous navigation, space AI lab, future spacecraft",
    ogTitle: "Space-AGI Engineering Lab — Intelligence for the Space Age",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/research/space-agi-math": {
    path: "/research/space-agi-math",
    title: "Space-AGI Mathematics — Optimal Control, MPC, LQR, Pontryagin | Orbital Simulator Hub",
    description: "Graduate-level aerospace control: optimal control, Pontryagin's maximum principle, MPC, LQR. Space-AGI framework: knowledge-energy optimization, intelligence growth, safety-constrained cosmic optimization.",
    keywords: "optimal control space, Pontryagin maximum principle, MPC satellites, LQR aerospace, Space-AGI mathematics, orbital control theory",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/research/space-agi-explanation": {
    path: "/research/space-agi-explanation",
    title: "Space-AGI Explanations — Math Explained for Teens & College | Orbital Simulator Hub",
    description: "Plain-language Space-AGI guides. Math Explained tab: optimal control, MPC, LQR, Pontryagin — ISS docking, Starlink, Mars rover examples. No PhD required.",
    keywords: "orbital mechanics for beginners, optimal control explained, MPC LQR explained, Pontryagin explained simply, satellite math easy, space AI for students, Space-AGI for teens, control theory for beginners, how satellites avoid collisions",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/research/space-agi-roadmap": {
    path: "/research/space-agi-roadmap",
    title: "Space-AGI Engineering Roadmap — Future of Autonomous Space Systems | Orbital Simulator Hub",
    description: "Phase 1 (2025–2030): AI orbit correction, collision avoidance, predictive navigation under delay, space traffic AI. Mathematical foundations. Real engineering future.",
    keywords: "Space-AGI roadmap, AI satellites 2025, autonomous Mars missions, self-repair spacecraft, interstellar probes, space AGI future",
    ogTitle: "Space-AGI Roadmap — From AI Satellites to Interstellar",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/careers": {
    path: "/careers",
    title: "Space Careers – How to Become Astronaut, Aerospace Engineer | Free Guide",
    description: "Space careers: how to become astronaut, aerospace engineer, space scientist. NASA, SpaceX, space industry jobs. Salary, requirements, internships.",
    keywords: "space careers, how to become astronaut, aerospace engineer career, NASA careers, SpaceX jobs, astronaut requirements, space industry jobs, space scientist salary, space internships, aerospace engineering degree",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/learn/orbital-mechanics": {
    path: "/learn/orbital-mechanics",
    title: "Orbital Mechanics for Beginners — Free Guide + 3D Simulator",
    description: "Learn orbital mechanics: Kepler, gravity, LEO MEO GEO. How satellites orbit. Kids to engineers. Free guide + try the 3D simulator now.",
    keywords: "orbital mechanics for beginners, learn orbital mechanics free, how satellites orbit, Kepler laws explained, LEO MEO GEO explained, orbital velocity formula, gravity and orbits, why satellites dont fall, orbital mechanics tutorial, space physics for students, how to learn orbital mechanics",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/blog": {
    path: "/blog",
    title: "Space Blog & News — Artemis, ISS, Starlink | Daily Space Updates | Orbital Simulator Hub",
    description: "Daily space blog and news: Artemis, ISS, Starlink, Mars rovers. Space facts, satellite tutorials, astronomy lessons. Fresh content every day. Free — no paywall.",
    keywords: "space blog, space news today, NASA news, Artemis, ISS, Starlink, Mars rover news, James Webb telescope, space facts, satellite tutorials, astronomy lessons, orbital mechanics blog, space physics, space exploration news, daily space updates, space news 2026",
    ogTitle: "Space Blog & News — Daily Space Updates | Orbital Simulator Hub",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/recommended-books": {
    path: "/recommended-books",
    title: "Recommended Space & Aerospace Books — Orbital Mechanics, Astrophysics | Orbital Simulator Hub",
    description: "Curated space, aerospace, and physics books for students and enthusiasts. Orbital mechanics, astrophysics, NASA history, quantum physics. Purchases support OrbitalSimulatorHub.",
    keywords: "space books, orbital mechanics books, astrophysics books, aerospace engineering books, NASA books, space science books, physics books for students, recommended space books",
    ogTitle: "Recommended Space & Aerospace Books | Orbital Simulator Hub",
    lastUpdated: "2026-02-25T00:00:00Z",
  },
  "/space-shop": {
    path: "/space-shop",
    title: "Space Shop — NASA T-Shirts, Toys, Books | Verified Amazon | Orbital Simulator Hub",
    description: "NASA t-shirts, space toys, LEGO rockets, orbital mechanics books. All products verified available on Amazon. Purchases support OrbitalSimulatorHub.",
    keywords: "NASA t-shirt, NASA toy, space toy, LEGO NASA, orbital mechanics book, NASA merchandise, space shop",
    ogTitle: "Space Shop — NASA T-Shirts, Toys, Books | Orbital Simulator Hub",
    lastUpdated: "2026-02-25T00:00:00Z",
  },
  "/learn/nasa-study-guide": {
    path: "/learn/nasa-study-guide",
    title: "Space Study Guide – NASA Missions, Aerospace Engineering | Orbital Simulator Hub",
    description: "Space study guide: NASA missions, aerospace engineering, orbital mechanics, ISS, Mars rovers, GPS. For students and teachers. Free simulator and quiz.",
    keywords: "space study, space study guide, NASA, aerospace engineering, space missions, orbital mechanics study, space for students",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/how-satellites-work": {
    path: "/learn/how-satellites-work",
    title: "Why Don't Satellites Fall? LEO vs MEO vs GEO Explained",
    description: "Why satellites don't fall — simple answer. LEO, MEO, GEO explained. ISS, Starlink, GPS. Try the free 3D simulator and see for yourself.",
    keywords: "why dont satellites fall, how satellites work, LEO MEO GEO explained, satellite orbit explained, how GPS works, Starlink orbit altitude, ISS orbit, gravity and satellites, orbital velocity explained",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/astronomy-for-kids": {
    path: "/learn/astronomy-for-kids",
    title: "Astronomy for Kids – Space Made Fun | Orbital Simulator Hub",
    description: "Astronomy for kids: Solar System, Moon, planets, astronauts. Fun space learning and 3D orbit simulator for kids and families.",
    keywords: "astronomy for kids, space for kids, solar system kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/learn/nasa-for-students": {
    path: "/learn/nasa-for-students",
    title: "Space for Students – Resources & Learning | Orbital Simulator Hub",
    description: "Space for students: free resources, orbital mechanics, AI in space, careers, internships. From high school to PhD.",
    keywords: "space for students, orbital mechanics students, space internships, space careers",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/space-news": {
    path: "/space-news",
    title: "Space News Today — Artemis, ISS, Mars, SpaceX | What's Happening in Space",
    description: "What's happening in space right now. Artemis, ISS, Mars rovers, James Webb, Starlink. Updated daily. Free — no paywall. Orbital Simulator Hub.",
    keywords: "space news, space news today, what is happening in space, Artemis II launch, ISS news, Mars rover news, James Webb discoveries, SpaceX news, NASA news today, space mission updates, daily space news, space exploration 2026, astronomy news",
    ogTitle: "Space News Today — Artemis, ISS, Mars, SpaceX",
    lastUpdated: "2026-02-23T00:00:00Z",
  },
  "/learn/nasa-for-kids": {
    path: "/learn/nasa-for-kids",
    title: "Space for Kids – Space Learning Made Fun | Orbital Simulator Hub",
    description: "Space for kids: astronauts, Moon, Mars rovers, Solar System. Free games, quizzes, and activities for kids and families. Learn space the fun way.",
    keywords: "space for kids, astronomy for kids, space learning kids",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/ai-in-aerospace": {
    path: "/ai-in-aerospace",
    title: "AI in Aerospace – MPC, LQR, Space AGI, Delayed MDP, Autonomous Satellites | Orbital Simulator Hub",
    description: "Mission-grade AI in space: Model Predictive Control (MPC), Linear Quadratic Regulator (LQR), Space AGI five pillars, delayed MDP for Mars. Autonomous orbit determination, collision avoidance, Mars rover AI. ChatGPT, Claude, Ollama. Free learning hub.",
    keywords: "AI in aerospace, AI in space, Space AGI, MPC satellite control, LQR orbital mechanics, delayed MDP Mars, autonomous spacecraft, AI satellites, collision avoidance AI, Mars rover AI, reinforcement learning space, model predictive control orbit, Pontryagin maximum principle, FDIR spacecraft, anomaly detection AI, SpaceX AI, NASA AI missions",
    ogTitle: "AI in Aerospace – MPC, LQR, Space AGI, Autonomous Satellites",
    lastUpdated: "2026-02-25T00:00:00Z",
  },
  "/ai-in-space": {
    path: "/ai-in-space",
    title: "AI in Space – MPC, LQR, Space AGI, Autonomous Satellites | Orbital Simulator Hub",
    description: "AI in space: satellite navigation, autonomous spacecraft, Mars rovers, MPC, LQR, Space AGI. How space agencies and SpaceX use artificial intelligence.",
    keywords: "AI in space, Space AGI, MPC LQR, autonomous spacecraft, AI satellites, Mars rover AI",
    lastUpdated: "2026-02-25T00:00:00Z",
  },
  "/learn/satellite-tutorial": {
    path: "/learn/satellite-tutorial",
    title: "Satellite Tutorial – Learn How Satellites Work | Orbital Simulator Hub",
    description: "Free satellite tutorials: how satellites work, GPS, ISS, Starlink, orbital mechanics. Step-by-step guides for students and space fans.",
    keywords: "satellite tutorial, how satellites work, satellite tutorials, learn satellites, GPS tutorial, orbital mechanics tutorial",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/space-quiz": {
    path: "/space-quiz",
    title: "Space Quiz – Test Your Space Knowledge | Orbital Simulator Hub",
    description: "Free space quiz: orbital mechanics, satellites, astronomy. Test your knowledge and learn with our tutorials and 3D simulator.",
    keywords: "space quiz, space quiz for kids, orbital mechanics quiz, astronomy quiz",
    lastUpdated: "2026-02-17T00:00:00Z",
  },
  "/astronauts": {
    path: "/astronauts",
    title: "12 Moonwalkers + 500 Astronauts — Free Database | Neil Armstrong, Buzz Aldrin",
    description: "All 12 astronauts who walked on the Moon. 500+ profiles. Neil Armstrong, Buzz Aldrin, Apollo 11 crew. Explore free — no signup.",
    keywords: "astronaut database, astronauts list, how many astronauts walked on moon, Neil Armstrong, Buzz Aldrin, Apollo 11 astronauts, 12 moonwalkers, ISS astronauts, space missions, astronaut biography, who walked on moon, astronaut names, NASA astronauts, female astronauts, astronaut facts",
    lastUpdated: "2026-02-19T00:00:00Z",
  },
  "/planets": {
    path: "/planets",
    title: "All 8 Planets — Mercury to Neptune | Real Mission Data, Free",
    description: "Explore every planet: distance, gravity, temperature, missions. Weight calculator, AI quiz. Kids & research modes. Free — no signup.",
    keywords: "planet explorer, solar system planets, all 8 planets, Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune, planet facts, planet distance from Sun, planet gravity, planet comparison, how much would I weigh on Mars, planet quiz, space for kids planets",
    ogTitle: "Planet Study Hub — All 8 Planets + Moon + Pluto",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/missions": {
    path: "/missions",
    title: "Apollo 11 to Artemis — Space Mission Database | Crew, Timeline",
    description: "Apollo 11–17, Gemini, Mercury, Shuttle. Crew, launch data, Moon samples. Complete mission database. Explore free.",
    keywords: "space missions, Apollo missions, Apollo 11, Moon landing missions, space missions history, Gemini missions, Mercury missions, Space Shuttle missions",
    ogTitle: "Space Mission Database — Apollo, Gemini, Mercury, Shuttle",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/artifacts": {
    path: "/artifacts",
    title: "What Humans Brought Back From Space – Moon Rocks, Asteroid Samples | Orbital Simulator Hub",
    description: "381.7 kg of lunar samples from Apollo missions. Asteroid samples from Hayabusa2 and OSIRIS-REx. Comet dust from Stardust. Explore what astronauts brought back from space and why it matters for science.",
    keywords: "lunar samples, Moon rocks, Apollo samples, what astronauts brought back, Hayabusa2 samples, OSIRIS-REx Bennu, Stardust comet, space samples, lunar geology",
    ogTitle: "What Humans Brought Back From Space — Moon Rocks & Beyond",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/lunar-geology": {
    path: "/learn/lunar-geology",
    title: "Lunar Geology & Fra Mauro Formation – Apollo Landing Sites | Orbital Simulator Hub",
    description: "Complete guide to lunar geology: Fra Mauro formation, all 6 Apollo landing site geologies, rock types (basalt, breccia, anorthosite), geological timeline. The Fra Mauro formation is Imbrium Basin ejecta ~3.85 Ga. Kids, General, and Research modes.",
    keywords: "Fra Mauro formation, lunar geology, Apollo landing sites, Moon geology, Imbrium Basin, lunar breccia, anorthosite, KREEP, Moon rocks, lunar geological timeline, Apollo 14 geology",
    ogTitle: "Lunar Geology & Fra Mauro Formation — Apollo Landing Sites",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/how-solar-system-works": {
    path: "/learn/how-solar-system-works",
    title: "How the Solar System Works – Planets, Orbits, Gravity | Orbital Simulator Hub",
    description: "Learn how the solar system works: planet orbits, gravity, Kepler's laws, tidal forces. Interactive guide for students and space fans.",
    keywords: "how solar system works, planet orbits, solar system gravity, Kepler laws, solar system for students",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/astrophysics": {
    path: "/learn/astrophysics",
    title: "Astrophysics – Stars, Galaxies, Black Holes, Cosmology | Orbital Simulator Hub",
    description: "Learn astrophysics: stars, galaxies, black holes, dark matter, cosmology. From stellar evolution to the expanding universe. For students and researchers.",
    keywords: "astrophysics, stars, galaxies, black holes, dark matter, cosmology, stellar evolution, space physics",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/quantum-physics": {
    path: "/learn/quantum-physics",
    title: "Quantum Physics for Space – Wave-Particle Duality, Entanglement | Orbital Simulator Hub",
    description: "Quantum physics concepts relevant to space: wave-particle duality, quantum entanglement, tunneling. How quantum effects impact GPS, atomic clocks, and satellite navigation.",
    keywords: "quantum physics, quantum mechanics, wave-particle duality, quantum entanglement, quantum space, quantum GPS",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/learn/aerodynamics": {
    path: "/learn/aerodynamics",
    title: "Aerodynamics – Lift, Drag, Bernoulli's Principle, Rocket Design | Orbital Simulator Hub",
    description: "Learn aerodynamics: lift, drag, Bernoulli's principle, rocket design, re-entry physics. From aircraft to spacecraft aerodynamics.",
    keywords: "aerodynamics, lift and drag, Bernoulli principle, rocket aerodynamics, re-entry physics, spacecraft design",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/compare/orbits": {
    path: "/compare/orbits",
    title: "Compare Orbits – LEO vs MEO vs GEO Side by Side | Orbital Simulator Hub",
    description: "Compare satellite orbits side by side: LEO, MEO, GEO. See altitude, speed, period differences. Interactive comparison for students and engineers.",
    keywords: "compare orbits, LEO vs MEO vs GEO, orbit comparison, satellite orbit types, orbit altitude comparison",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
  "/missions/timeline": {
    path: "/missions/timeline",
    title: "Space Mission Timeline – From Sputnik to Artemis | Orbital Simulator Hub",
    description: "Complete timeline of space missions from Sputnik (1957) to Artemis. Apollo, Gemini, Shuttle, ISS, Mars rovers, and future missions. Interactive timeline.",
    keywords: "space mission timeline, Apollo timeline, space history, mission history, Sputnik to Artemis",
    lastUpdated: "2026-02-18T00:00:00Z",
  },
};

export function getSEOConfig(path: string): SEOConfig | null {
  const cleanPath = path.split('#')[0];
  if (SEO_CONFIGS[cleanPath]) return SEO_CONFIGS[cleanPath];

  const astronautMatch = cleanPath.match(/^\/astronauts\/(.+)$/);
  if (astronautMatch) {
    const slug = astronautMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} – Astronaut Profile, Missions & Biography | Orbital Simulator Hub`,
      description: `Explore ${name}'s complete astronaut profile: biography, space missions, EVA details, Moon experience, fun facts. Kids Mode and Research Mode available. Orbital Simulator Hub astronaut database.`,
      keywords: `${name}, astronaut, space missions, astronaut biography, ${name} missions`,
      ogTitle: `${name} — Astronaut Profile & Missions`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const planetMatch = cleanPath.match(/^\/planets\/(.+)$/);
  if (planetMatch) {
    const slug = planetMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} – Planet Facts, Distance, Gravity | Orbital Simulator Hub`,
      description: `Explore ${name} with real mission data: distance from Sun, gravity, temperature, atmosphere, missions. Weight calculator, AI quiz, Kids Mode, Research Mode with orbital equations.`,
      keywords: `${name}, planet, ${name} distance, ${name} gravity, ${name} temperature, ${name} moons, solar system`,
      ogTitle: `${name} — Planet Explorer`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const missionMatch = cleanPath.match(/^\/missions\/(.+)$/);
  if (missionMatch) {
    const slug = missionMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} Mission – Crew, Timeline, Samples, Geology | Orbital Simulator Hub`,
      description: `Complete ${name} mission details: crew, launch data, surface operations, landing site geology, samples returned, highlights. Explore the ${name} mission.`,
      keywords: `${name}, space mission, ${name} crew, ${name} mission details, Apollo mission`,
      ogTitle: `${name} — Mission Details`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  const blogCategoryMatch = cleanPath.match(/^\/blog\/category\/(.+)$/);
  if (blogCategoryMatch) {
    const cat = blogCategoryMatch[1];
    const labels: Record<string, { title: string; desc: string; kw: string }> = {
      "space-agi": { title: "Space AGI", desc: "AI satellites, autonomous spacecraft, Space AGI. MPC, LQR, collision avoidance. The future of space intelligence.", kw: "Space AGI, AI satellites, autonomous spacecraft, orbital mechanics AI, swarm satellites, collision avoidance" },
      "space-engineering": { title: "Space Engineering", desc: "Orbital mechanics formulas: vis-viva, Tsiolkovsky, Hohmann, Kepler. Aerospace engineering explained.", kw: "space engineering, orbital mechanics formulas, vis-viva, Tsiolkovsky, Hohmann transfer, aerospace formulas" },
      "nasa-news": { title: "NASA News", desc: "Latest NASA mission news: Artemis, ISS, Mars rovers, James Webb, SpaceX. Daily updates.", kw: "NASA news, Artemis, ISS, Mars rover, James Webb, SpaceX, space mission news" },
      "space-facts": { title: "Space Facts", desc: "Space facts and science: orbital mechanics, satellites, planets, astronomy. Learn something new every day.", kw: "space facts, space science, orbital mechanics, satellite facts, astronomy facts" },
      "satellite-tutorials": { title: "Satellite Tutorials", desc: "How satellites work: GPS, ISS, Starlink, LEO MEO GEO. Step-by-step tutorials for students and space fans.", kw: "satellite tutorial, how satellites work, GPS, ISS, Starlink, orbital mechanics tutorial" },
      "astronomy-lessons": { title: "Astronomy Lessons", desc: "Astronomy lessons: solar system, stars, galaxies, black holes. Free space education.", kw: "astronomy lessons, solar system, stars, galaxies, space education" },
      aerodynamics: { title: "Aerodynamics", desc: "Aerodynamics and flight: re-entry, hypersonic, rocket design. Aerospace engineering.", kw: "aerodynamics, aerospace engineering, re-entry, hypersonic flight" },
      "quantum-physics": { title: "Quantum & Space", desc: "Quantum physics in space: atomic clocks, GPS, quantum sensors. NASA technology.", kw: "quantum physics space, atomic clocks, GPS, quantum sensors" },
    };
    const info = labels[cat] || { title: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), desc: `Articles in ${cat}.`, kw: cat };
    return {
      path: cleanPath,
      title: `${info.title} — Space Blog & News | Orbital Simulator Hub`,
      description: info.desc,
      keywords: info.kw,
      ogTitle: `${info.title} | Orbital Simulator Hub`,
      lastUpdated: "2026-02-23T00:00:00Z",
    };
  }

  const blogMatch = cleanPath.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const post = getPostBySlug(slug);
    if (post) {
      return {
        path: cleanPath,
        title: `${post.title} | Space Blog – Orbital Simulator Hub`,
        description: post.excerpt,
        keywords: post.seoKeywords || post.tags.join(", ") || `space blog, space news, ${slug.replace(/-/g, ", ")}`,
        ogTitle: post.title,
        lastUpdated: `${post.date}T00:00:00Z`,
      };
    }
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: cleanPath,
      title: `${name} | Space Blog – Orbital Simulator Hub`,
      description: `Read about ${name.toLowerCase()} on the Orbital Simulator Hub space blog. Daily space news, space facts, and satellite tutorials.`,
      keywords: `space blog, space news, ${slug.replace(/-/g, ", ")}`,
      lastUpdated: "2026-02-18T00:00:00Z",
    };
  }

  return null;
}

export function updateSEOConfig(path: string, config: Partial<SEOConfig>): void {
  const cleanPath = path.split('#')[0];
  if (SEO_CONFIGS[cleanPath]) {
    SEO_CONFIGS[cleanPath] = {
      ...SEO_CONFIGS[cleanPath],
      ...config,
      lastUpdated: new Date().toISOString(),
    };
  } else {
    SEO_CONFIGS[cleanPath] = {
      path: cleanPath,
      title: config.title || "",
      description: config.description || "",
      keywords: config.keywords || "",
      ogTitle: config.ogTitle,
      ogDescription: config.ogDescription,
      lastUpdated: new Date().toISOString(),
    };
  }
}
