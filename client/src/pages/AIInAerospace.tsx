import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

const TAB_IDS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"] as const;
const TABS: { id: (typeof TAB_IDS)[number]; label: string }[] = [
  { id: "t1", label: "🛰 AI Navigation" },
  { id: "t2", label: "🤖 Autonomous Spacecraft" },
  { id: "t3", label: "📋 Mission Planning" },
  { id: "t4", label: "🦾 Space Robotics" },
  { id: "t5", label: "⚠ Anomaly Detection" },
  { id: "t6", label: "🚀 Space Agencies & SpaceX" },
  { id: "t7", label: "🔴 Mars AI" },
  { id: "t8", label: "📊 Space ML & Data" },
  { id: "t9", label: "🛠 AI Tools & Platforms" },
];

const DIAGRAM_NODES: { title: string; desc: string; body: string }[] = [
  { title: "Sense", desc: "Sensors + telemetry", body: "Sensors collect data: star tracker (attitude from stars), IMU (angular rate and acceleration), GNSS (position when in view of GPS/Galileo), cameras (docking, terrain), and continuous thermal and power telemetry. The goal is a clean, trustworthy state estimate. On Mars rovers, hazcams and navcams feed into the same pipeline. Without reliable sensing, autonomy cannot act safely." },
  { title: "Estimate", desc: "State estimation", body: "Filters (e.g., extended Kalman filters, particle filters) combine noisy measurements to estimate position, velocity, and attitude — the spacecraft's best guess of reality. Estimation fuses star tracker, IMU, and ranging data; for rovers, wheel odometry and visual odometry are included. Accuracy directly affects navigation safety and science targeting." },
  { title: "Decide", desc: "Rules + models", body: "Decision logic selects the next action: station-keep, avoid debris, run science, downlink data, or enter safe mode. Rules are often hand-crafted from mission requirements; ML can suggest priorities or predict outcomes. FDIR (Fault Detection, Isolation, Recovery) is part of this layer: detect a fault, isolate the cause, trigger recovery or safe mode." },
  { title: "Plan", desc: "Optimize actions", body: "Planning computes a safe sequence: thruster burns, pointing schedules, rover paths, or arm motions. Optimization balances fuel, risk, and science goals. Trajectory planners search for fuel-efficient transfers; rover planners avoid hazards and maximize science value. AI can explore many options faster than human planners." },
  { title: "Act", desc: "Control + execution", body: "Commands go to actuators: thrusters, reaction wheels, gimbals, robotic arms. Control loops run at high frequency (often hundreds of Hz) to execute precisely and safely. Attitude control keeps the spacecraft pointed correctly; trajectory control executes burns. On rovers, wheel and arm controllers complete the loop." },
  { title: "Learn", desc: "Update models", body: "Models update from new data: improve risk scoring for collision avoidance, refine anomaly thresholds from telemetry, and optimize future decisions. Machine learning can tune parameters or learn from past maneuvers. This closes the loop from observation back to better sensing and decision-making over time." },
];

const FOCUS_NODES: { title: string; desc: string; body: string }[] = [
  { title: "Quick path: Learn in 10 minutes", desc: "Fast overview with key ideas.", body: "1) AI Navigation — how satellites and rovers know where they are and avoid collisions. 2) Anomaly Detection — how missions spot problems before they become failures. 3) Mars AI — how Perseverance and Curiosity drive and choose science targets autonomously. 4) Space ML — how data from telescopes and telemetry turns into discovery. This sequence gives you a complete mental model: move, stay healthy, explore, then learn from data." },
  { title: "Research path: Build a project", desc: "Turn this into a real project.", body: "Build a mini satellite health monitor: simulate telemetry (power, thermal, attitude), run simple anomaly detection (thresholds or a small ML model), and trigger a 'safe mode' response. Then add orbit prediction and collision alerts using two-body mechanics. Great for portfolio and interviews; the same concepts appear in space agency and commercial mission design." },
  { title: "What makes this mission-grade?", desc: "Structure + clarity + mission logic.", body: "Clear modules (navigation, planning, FDIR, robotics), mission-grade logic that is testable and traceable, diagram-first learning so you see the autonomy loop. The content mirrors how flight software and mission ops are actually structured." },
];

const SECTIONS: { id: (typeof TAB_IDS)[number]; icon: string; title: string; desc: string }[] = [
  { id: "t1", icon: "🛰", title: "AI for satellite navigation", desc: "Autonomous orbit determination, collision avoidance, and station-keeping." },
  { id: "t2", icon: "🤖", title: "Autonomous spacecraft", desc: "Spacecraft that make decisions without constant ground contact." },
  { id: "t3", icon: "📋", title: "AI mission planning", desc: "Optimizing trajectories, launch windows, and resource allocation." },
  { id: "t4", icon: "🦾", title: "Space robotics", desc: "Rovers, arms, and robots that see, plan, and act in space." },
  { id: "t5", icon: "⚠", title: "AI anomaly detection", desc: "Predicting and diagnosing failures before they happen." },
  { id: "t6", icon: "🚀", title: "AI in Space Agencies & SpaceX", desc: "How space agencies and SpaceX use AI in launch, landing, and operations." },
  { id: "t7", icon: "🔴", title: "AI for Mars missions", desc: "Mars rovers, helicopters, and future crewed mission support." },
  { id: "t8", icon: "📊", title: "Space data analysis with ML", desc: "Image recognition, telemetry analysis, and scientific discovery." },
  { id: "t9", icon: "🛠", title: "AI tools & platforms", desc: "Commercial and open source AI tools, what they do, and computer requirements." },
];

const HERO_TAGS: { tag: string; tabId: (typeof TAB_IDS)[number] }[] = [
  { tag: "satellite navigation AI", tabId: "t1" },
  { tag: "autonomous spacecraft", tabId: "t2" },
  { tag: "mission planning", tabId: "t3" },
  { tag: "space robotics", tabId: "t4" },
  { tag: "anomaly detection", tabId: "t5" },
  { tag: "Mars rover AI", tabId: "t7" },
  { tag: "space ML", tabId: "t8" },
  { tag: "AI tools open source", tabId: "t9" },
];

export function AIInAerospace() {
  const [activeTab, setActiveTab] = useState<(typeof TAB_IDS)[number]>("t1");
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const guideRef = useRef<HTMLElement>(null);
  const diagramsRef = useRef<HTMLElement>(null);
  const dailyNewsRef = useRef<HTMLElement>(null);

  const scrollToRef = (ref: { current: HTMLElement | null }) => {
    const el = ref.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const goToTab = (tabId: (typeof TAB_IDS)[number]) => {
    setActiveTab(tabId);
    scrollToRef(guideRef);
  };

  const scrollToSection = (target: "diagrams" | "dailynews") => {
    if (target === "diagrams") scrollToRef(diagramsRef);
    else if (target === "dailynews") scrollToRef(dailyNewsRef);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (modal) window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  return (
    <div className="nasa-ai-page max-w-6xl mx-auto">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_.7fr] gap-4 mb-4">
        <div className="nasa-ai-card">
          <div className="nasa-ai-card-inner">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
              AI in Space: Satellites, Rovers, Mission Planning, Space Agencies & SpaceX
            </h1>
            <p className="text-[var(--nasa-muted)] text-base leading-relaxed mb-3">
              A mission-grade learning hub covering autonomous orbit determination, collision avoidance, spacecraft decision-making,
              robotics, anomaly detection, Mars AI, and space data machine learning — plus <strong>daily space news</strong>.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button type="button" onClick={() => goToTab("t1")} className="nasa-ai-kpi cursor-pointer text-left hover:opacity-90 hover:scale-[1.02] transition" title="Jump to 8 core modules">
                8 Core Modules <small>AI topics in space</small>
              </button>
              <button type="button" onClick={() => { scrollToSection("diagrams"); }} className="nasa-ai-kpi cursor-pointer text-left hover:opacity-90 hover:scale-[1.02] transition" title="Jump to interactive diagram">
                Interactive Diagrams <small>Click to learn</small>
              </button>
              <button type="button" onClick={() => { scrollToSection("dailynews"); }} className="nasa-ai-kpi cursor-pointer text-left hover:opacity-90 hover:scale-[1.02] transition" title="Jump to daily space news">
                Daily News <small>Auto publishing</small>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {HERO_TAGS.map(({ tag, tabId }) => (
                <button key={tag} type="button" onClick={() => goToTab(tabId)} className="nasa-ai-tag cursor-pointer hover:border-[var(--nasa-brand)] hover:text-[var(--nasa-text)] transition" title={`Open ${tag}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="nasa-ai-card">
          <div className="nasa-ai-card-inner">
            <h2 className="text-lg font-bold mb-2">Today&apos;s Focus</h2>
            <p className="text-[var(--nasa-muted)] text-sm mb-3 leading-relaxed">
              Start with the &quot;AI Navigation&quot; tab, then open the diagram nodes to understand how spacecraft decide and act.
            </p>
            <div className="grid gap-2">
              {FOCUS_NODES.map((n) => (
                <div key={n.title} className="nasa-ai-node" onClick={() => openModal(n.title, n.body)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openModal(n.title, n.body)}>
                  <div className="nasa-ai-node-title">{n.title}</div>
                  <div className="nasa-ai-node-desc">{n.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key facts strip */}
      <section className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] px-4 py-3 mb-4">
        <p className="text-sm text-[var(--nasa-muted)]">
          <strong className="text-[var(--nasa-text)]">AI in space today:</strong> The Perseverance rover uses autonomous driving and science targeting. SpaceX uses closed-loop guidance for landing. ISS and commercial satellites use automated collision avoidance. James Webb and Hubble data are analyzed with ML. Future missions will rely even more on onboard AI for navigation, health monitoring, and science.
        </p>
      </section>

      {/* Advanced AI & Space — MPC, LQR, Space AGI, Delayed MDP */}
      <section className="nasa-ai-card mb-4">
        <div className="nasa-ai-card-inner">
          <h2 className="text-lg font-bold mb-3">🧠 Advanced: MPC, LQR, Space AGI & Delayed MDP</h2>
          <p className="text-[var(--nasa-muted)] text-sm mb-4">Mission-grade control theory and Space AGI concepts used in autonomous satellites and Mars missions.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-2">Model Predictive Control (MPC)</h3>
              <p className="text-sm text-[var(--nasa-muted)] mb-2">MPC solves a finite-horizon optimization at each step: predict future states, minimize cost (fuel, risk), enforce constraints (collision avoidance, pointing limits). The first control action is applied; the rest are discarded. Repeating at each timestep gives feedback that handles disturbances (J2, drag, solar radiation pressure).</p>
              <p className="text-xs text-[var(--nasa-muted)]"><strong>Space use:</strong> Starlink-style collision avoidance, station-keeping, formation flying. Our <Link href="/simulator/swarm"><a className="text-[var(--nasa-brand)] hover:underline">Swarm Simulator</a></Link> uses OSQP (quadratic programming) for similar logic.</p>
            </div>
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-2">Linear Quadratic Regulator (LQR)</h3>
              <p className="text-sm text-[var(--nasa-muted)] mb-2">LQR finds the optimal feedback gain K that minimizes J = ∫(x&apos;Qx + u&apos;Ru) dt for linear systems. The solution is u = −Kx. LQR is computationally cheap and gives globally optimal control for linearized dynamics. Used for attitude control, station-keeping, and as a baseline before adding constraints.</p>
              <p className="text-xs text-[var(--nasa-muted)]"><strong>Space use:</strong> Attitude control loops, fine pointing, reaction wheel desaturation. Often combined with MPC when constraints matter.</p>
            </div>
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-2">Delayed MDP & Mars Communication</h3>
              <p className="text-sm text-[var(--nasa-muted)] mb-2">Mars is 4–24 minutes away (one-way). A Markov Decision Process (MDP) with delay means the agent observes state s_t but must act on s_{t−d}. The optimal policy must account for this lag: plan ahead, buffer decisions, or use belief-state MDPs. Reinforcement learning (Q-learning, policy gradient) can learn policies that are robust to delay.</p>
              <p className="text-xs text-[var(--nasa-muted)]"><strong>Space use:</strong> Mars rovers, deep-space probes. Perseverance drives autonomously; ground cannot joystick in real time.</p>
            </div>
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-2">Space AGI Five Pillars</h3>
              <p className="text-sm text-[var(--nasa-muted)] mb-2"><strong>1. Perception</strong> — Star trackers, IMU, GNSS, cameras fuse into state estimate. <strong>2. Planning</strong> — Trajectory optimization, Lambert solvers, MPC. <strong>3. Control</strong> — LQR, thruster logic, reaction wheels. <strong>4. Learning</strong> — RL from sim and flight data. <strong>5. Communication</strong> — Report when link exists; act autonomously when it doesn&apos;t.</p>
              <p className="text-xs text-[var(--nasa-muted)]"><strong>Explore:</strong> <Link href="/research/space-agi-lab"><a className="text-[var(--nasa-brand)] hover:underline">Space-AGI Lab</a></Link> · <Link href="/blog/what-is-space-agi-why-it-matters"><a className="text-[var(--nasa-brand)] hover:underline">What Is Space AGI?</a></Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* Why this page matters */}
      <section className="nasa-ai-card mb-4">
        <div className="nasa-ai-card-inner">
          <h2 className="text-lg font-bold mb-2">Why this page matters</h2>
          <p className="text-[var(--nasa-muted)] mb-3 leading-relaxed">
            Artificial Intelligence is revolutionizing aerospace and space exploration.
          </p>
          <p className="font-semibold mb-2">AI helps:</p>
          <ul className="list-disc pl-5 text-[var(--nasa-muted)] space-y-1 mb-3">
            <li>Control satellites automatically</li>
            <li>Predict spacecraft failures</li>
            <li>Navigate Mars rovers</li>
            <li>Analyze space images</li>
            <li>Plan deep space missions</li>
            <li>Optimize rocket design</li>
          </ul>
          <p className="text-[var(--nasa-muted)]">Future spacecraft will be fully AI-driven.</p>
        </div>
      </section>

      {/* Sections: clickable cards → switch tab */}
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-3">Sections</h2>
        <p className="text-[var(--nasa-muted)] text-sm mb-3">Click any section to open it in the guide below.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToTab(s.id)}
              className={`nasa-ai-node text-left cursor-pointer ${activeTab === s.id ? "active-tab" : ""}`}
            >
              <span className="text-xl block mb-1">{s.icon}</span>
              <div className="nasa-ai-node-title">{s.title}</div>
              <div className="nasa-ai-node-desc">{s.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Guide Tabs */}
      <section id="guide" ref={guideRef} className="nasa-ai-card mb-4">
        <p className="text-[var(--nasa-muted)] text-xs px-4 pt-3 pb-1">Click any tab to jump to that topic.</p>
        <div className="nasa-ai-tabs">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`nasa-ai-tab-btn cursor-pointer ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)} title={`View: ${t.label}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="nasa-ai-panels">
          <div className={`nasa-ai-panel ${activeTab === "t1" ? "active" : ""}`} id="t1">
            <h2>🛰 AI for Satellite Navigation</h2>
            <p>AI navigation is the &quot;autopilot brain&quot; for satellites. It combines orbital mechanics with ML-based prediction to keep spacecraft safe and efficient in crowded orbits.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Autonomous orbit determination:</strong> estimate state (position/velocity) from GPS, star trackers, IMUs, ground ranging.</li>
              <li><strong>Collision avoidance:</strong> predict close approaches, rank risk, plan burns that minimize fuel and keep mission constraints.</li>
              <li><strong>Station-keeping:</strong> maintain GEO slot or constellation geometry while handling drag + solar radiation pressure.</li>
              <li><strong>Fuel-smart control:</strong> ML suggests maneuvers that hit safety goals with minimal propellant.</li>
            </ul>
            <p><strong>Why it matters:</strong> constellations need autonomy. Waiting for ground approval can be too slow when debris risk is rising.</p>
            <p className="mt-3">In practice, operators use conjunction data messages (CDMs) and probability of collision (Pc) to decide on maneuvers. AI can screen thousands of objects and suggest optimal burn times and directions. Starlink and OneWeb are examples of large constellations that depend on automated collision avoidance.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t2" ? "active" : ""}`} id="t2">
            <h2>🤖 Autonomous Spacecraft</h2>
            <p>Deep space has communication delays. Autonomous spacecraft must <strong>detect, decide, and act</strong> without real-time humans.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Onboard decision engine:</strong> rules + learned models to choose actions under uncertainty.</li>
              <li><strong>FDIR:</strong> Fault Detection, Isolation, and Recovery (diagnose failure → switch redundancy → recover).</li>
              <li><strong>Safe mode logic:</strong> prioritize power + thermal survival, pause science, reorient to Sun, wait for contact.</li>
              <li><strong>Autonomous docking/landing:</strong> vision + sensors + control loops at millisecond time scales.</li>
            </ul>
            <p><strong>Key idea:</strong> autonomy isn&apos;t &quot;magic AI&quot; — it&apos;s mission-tested logic plus models trained from simulations and flight data.</p>
            <p className="mt-3">Voyager, Mars rovers, and Orion all run autonomous sequences when contact with Earth is delayed or unavailable. SpaceX&apos;s Dragon and Crew Dragon use autonomous rendezvous and docking with the ISS. The trend is toward more onboard decision-making as missions go farther and constellations grow.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t3" ? "active" : ""}`} id="t3">
            <h2>📋 AI Mission Planning</h2>
            <p>Mission planning is optimization under constraints: trajectory, launch windows, power, comms, thermal limits, science priorities.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Trajectory optimization:</strong> search for fuel-efficient transfers (LEO→GTO, lunar, interplanetary).</li>
              <li><strong>Launch window selection:</strong> align geometry, lighting, comm availability, safety rules.</li>
              <li><strong>Resource scheduling:</strong> pick when to run instruments, transmit data, charge batteries.</li>
              <li><strong>Contingency planning:</strong> pre-plan &quot;if this fails then do that&quot; for resilience.</li>
            </ul>
            <p><strong>Why it matters:</strong> AI speeds planning from weeks to hours by exploring thousands of &quot;what if&quot; scenarios.</p>
            <p className="mt-3">Tools like GMAT, STK, and custom optimizers search over transfer options. ML can learn from past missions to suggest better initial guesses. Artemis lunar missions and Mars sample return are examples where complex, multi-body trajectory planning benefits from automation and AI-assisted search.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t4" ? "active" : ""}`} id="t4">
            <h2>🦾 Space Robotics</h2>
            <p>Space robotics fuses perception (vision), planning (path/arm motion), and control (actuators) — in harsh environments.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Rovers:</strong> terrain classification, hazard detection, path planning, autonomous driving.</li>
              <li><strong>Robotic arms:</strong> precise manipulation for docking, servicing, sample handling, station maintenance.</li>
              <li><strong>Swarm robots:</strong> future lunar construction, cave exploration, distributed sensing.</li>
              <li><strong>&quot;See–Plan–Act&quot; loop:</strong> perception → plan → execute → re-check.</li>
            </ul>
            <p><strong>Future:</strong> robots will assemble large telescopes in orbit and build lunar base infrastructure.</p>
            <p className="mt-3">Perseverance uses multiple cameras and vision algorithms to avoid hazards and select paths. The ISS Canadarm2 and Dextre perform delicate operations. The VIPER and future lunar rovers will add more autonomy. In orbit, projects like OSAM-1 aim to robotically service and assemble spacecraft.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t5" ? "active" : ""}`} id="t5">
            <h2>⚠ AI Anomaly Detection</h2>
            <p>Spacecraft produce continuous telemetry. AI detects &quot;something is off&quot; early — like a spacecraft health doctor.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Real-time monitoring:</strong> voltage, current, temps, attitude, comm quality, wheel torque.</li>
              <li><strong>Predictive failure:</strong> detect drift before hard failure (bearing wear, battery degradation).</li>
              <li><strong>Root-cause hints:</strong> isolate subsystems likely responsible (power vs thermal vs comm).</li>
              <li><strong>Auto recovery:</strong> safe-mode triggers, switch redundancy, reduce load, reset subsystems.</li>
            </ul>
            <p><strong>Why it matters:</strong> early detection prevents mission loss and extends spacecraft lifetime.</p>
            <p className="mt-3">Techniques range from simple limit checks to ML models trained on nominal and fault telemetry. Space agencies use ground-based and increasingly onboard anomaly detection. For constellations, automating health screening reduces ops burden and speeds response.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t6" ? "active" : ""}`} id="t6">
            <h2>🚀 AI in Space Agencies & SpaceX</h2>
            <p>Space agencies and SpaceX use autonomy to handle complex operations where timing and precision are everything.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Launch + landing:</strong> guidance & control adjust rapidly under changing conditions.</li>
              <li><strong>Operations:</strong> automate checks, optimize timelines, detect anomalies faster than humans.</li>
              <li><strong>Constellations:</strong> scheduling, collision handling, routing, and health management at scale.</li>
              <li><strong>Science:</strong> ML accelerates discovery in images and signals from telescopes and probes.</li>
            </ul>
            <p><strong>Reality:</strong> mission-grade &quot;AI&quot; is often a blend of control theory + robust rules + ML where it&apos;s safe.</p>
            <p className="mt-3">SpaceX&apos;s Falcon 9 first stage lands using closed-loop guidance and control. Space agencies use ML for Mars image analysis, exoplanet detection from Kepler/TESS, and mission planning. JPL and other centers develop autonomous systems for rovers, landers, and future crewed missions.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t7" ? "active" : ""}`} id="t7">
            <h2>🔴 AI for Mars Missions</h2>
            <p>Mars missions require high autonomy due to delay and harsh terrain. AI helps rovers move safely and pick science targets.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Autonomous driving:</strong> choose safe paths and avoid rocks/sand traps.</li>
              <li><strong>Science targeting:</strong> vision models identify interesting rock textures and features.</li>
              <li><strong>Energy planning:</strong> manage battery/solar, prioritize comm + survival + science.</li>
              <li><strong>Future crewed support:</strong> habitat automation, EVA planning, logistics, and medical assistance.</li>
            </ul>
            <p><strong>Big picture:</strong> autonomy is what makes long-duration Mars operations feasible.</p>
            <p className="mt-3">Perseverance and Curiosity drive autonomously using stereo vision and hazard maps. Perseverance&apos;s Ingenuity helicopter uses similar autonomy. Sample selection and caching involve onboard analysis. Future human missions will use AI for landing, habitat systems, and decision support.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t8" ? "active" : ""}`} id="t8">
            <h2>📊 Space Data Analysis with ML</h2>
            <p>ML turns huge data streams into discoveries: exoplanets, supernova signals, climate patterns, and mission insights.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Image recognition:</strong> craters, storms, ships, land use, galaxies.</li>
              <li><strong>Telemetry learning:</strong> detect patterns and predict system behavior.</li>
              <li><strong>Event detection:</strong> identify anomalies in signals and astrophysical time series.</li>
              <li><strong>Scientific discovery:</strong> help researchers find &quot;needles in haystacks.&quot;</li>
            </ul>
            <p><strong>Tip:</strong> show examples + interactive visuals to boost engagement and SEO time-on-page.</p>
            <p className="mt-3">Kepler and TESS use ML to find exoplanet transits. Hubble and JWST pipelines use ML for classification and anomaly detection. Earth observation satellites use ML for weather, climate, and land use. Mission control uses ML to summarize telemetry and prioritize alerts.</p>
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t9" ? "active" : ""}`} id="t9">
            <h2>🛠 AI Tools in the Market: Commercial &amp; Open Source</h2>
            <p>AI tools have exploded in the last few years. Here&apos;s a guide to what&apos;s available, what they do, and what you need to run them.</p>

            <h3 className="mt-4 font-bold">Commercial AI Tools</h3>
            <ul className="nasa-ai-bullets">
              <li><strong>ChatGPT (OpenAI):</strong> Text generation, coding help, analysis. GPT-4 for reasoning; GPT-4o for multimodal (text + image). Web and API.</li>
              <li><strong>Claude (Anthropic):</strong> Long context (200K tokens), strong at coding and analysis. Used for research and writing.</li>
              <li><strong>Gemini (Google):</strong> Multimodal, integrated with Google Workspace. Good for search, docs, and coding.</li>
              <li><strong>Copilot (Microsoft):</strong> Code completion in VS Code, GitHub. Powered by GPT and Codex.</li>
              <li><strong>Grok (xAI):</strong> Real-time info, bold personality. Tuned for current events.</li>
              <li><strong>Perplexity:</strong> AI search — answers with citations. Good for research.</li>
            </ul>

            <h3 className="mt-4 font-bold">Open Source AI Tools</h3>
            <ul className="nasa-ai-bullets">
              <li><strong>Ollama:</strong> Run LLMs locally (Llama, Mistral, Qwen, etc.). One command: <code>ollama run llama3</code>. Free, private, no API cost.</li>
              <li><strong>Llama (Meta):</strong> Open weights. Llama 3.2 (3B–70B). Used for coding, chat, RAG. Run via Ollama or Hugging Face.</li>
              <li><strong>Mistral:</strong> Mistral 7B, Mixtral 8x7B. Fast, efficient. Good for European data privacy.</li>
              <li><strong>Qwen (Alibaba):</strong> Qwen2.5, Qwen2.5-Coder. Strong for coding and long context.</li>
              <li><strong>Code Llama / DeepSeek Coder:</strong> Specialized for code generation and debugging.</li>
              <li><strong>LM Studio / GPT4All:</strong> Desktop apps to run local models. No coding required.</li>
            </ul>

            <h3 className="mt-4 font-bold">What These Tools Can Do</h3>
            <ul className="nasa-ai-bullets">
              <li><strong>Code:</strong> Write, debug, refactor code. Explain algorithms. Generate full apps.</li>
              <li><strong>Research:</strong> Summarize papers, answer questions with sources, compare ideas.</li>
              <li><strong>Writing:</strong> Draft articles, emails, reports. Translate and edit.</li>
              <li><strong>Analysis:</strong> Parse data, suggest visualizations, find patterns.</li>
              <li><strong>Space &amp; aerospace:</strong> Explain orbital mechanics, help with mission design, generate educational content.</li>
            </ul>

            <h3 className="mt-4 font-bold">How AI Tools Have Built the Future</h3>
            <p>AI tools have accelerated software development, research, and education. Developers use Copilot and ChatGPT to ship faster. Researchers use LLMs to explore literature and draft papers. Students use AI for tutoring. In aerospace, AI assists with trajectory optimization, anomaly detection, and mission planning. The trend: AI as a copilot that augments human capability rather than replaces it.</p>

            <h3 className="mt-4 font-bold">Computer Requirements</h3>
            <table className="w-full mt-2 text-sm border-collapse border border-[var(--nasa-line)]">
              <thead>
                <tr className="bg-[rgba(255,255,255,.05)]">
                  <th className="border border-[var(--nasa-line)] px-3 py-2 text-left">Model Size</th>
                  <th className="border border-[var(--nasa-line)] px-3 py-2 text-left">RAM</th>
                  <th className="border border-[var(--nasa-line)] px-3 py-2 text-left">VRAM (GPU)</th>
                  <th className="border border-[var(--nasa-line)] px-3 py-2 text-left">Examples</th>
                </tr>
              </thead>
              <tbody className="text-[var(--nasa-muted)]">
                <tr><td className="border border-[var(--nasa-line)] px-3 py-2">1–3B</td><td className="border border-[var(--nasa-line)] px-3 py-2">4–8 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">2–4 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">Phi-3 mini, Qwen 1.5B</td></tr>
                <tr><td className="border border-[var(--nasa-line)] px-3 py-2">7B</td><td className="border border-[var(--nasa-line)] px-3 py-2">8–16 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">6–8 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">Llama 3.2, Mistral 7B, Qwen2.5-Coder</td></tr>
                <tr><td className="border border-[var(--nasa-line)] px-3 py-2">13B</td><td className="border border-[var(--nasa-line)] px-3 py-2">16–24 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">10–12 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">Llama 3.1 13B, Code Llama 13B</td></tr>
                <tr><td className="border border-[var(--nasa-line)] px-3 py-2">70B+</td><td className="border border-[var(--nasa-line)] px-3 py-2">64+ GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">40–80 GB</td><td className="border border-[var(--nasa-line)] px-3 py-2">Llama 70B, Qwen 72B (or cloud API)</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm"><strong>Tip:</strong> For most users, a 7B model (e.g. <code>ollama run qwen2.5-coder:7b</code>) runs well on 16 GB RAM or an 8 GB GPU. No GPU? Use CPU — slower but works. Cloud APIs (OpenAI, Anthropic) require no local hardware.</p>
          </div>
        </div>
      </section>

      {/* Diagram */}
      <section id="diagrams" ref={diagramsRef} className="nasa-ai-card mb-4">
        <div className="nasa-ai-card-inner">
          <h2 className="text-lg font-bold mb-2">Interactive Diagram: Spacecraft Autonomy Loop</h2>
          <p className="text-[var(--nasa-muted)] text-sm mb-3">Click any node to open a mission-grade explanation.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DIAGRAM_NODES.map((n) => (
              <div key={n.title} className="nasa-ai-node" onClick={() => openModal(n.title, n.body)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openModal(n.title, n.body)}>
                <div className="nasa-ai-node-title">{n.title}</div>
                <div className="nasa-ai-node-desc">{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily News */}
      <section id="dailynews" ref={dailyNewsRef} className="nasa-ai-card mb-4">
        <div className="nasa-ai-card-inner">
          <h2 className="text-lg font-bold mb-2">🗞 Daily Space News</h2>
          <p className="text-[var(--nasa-muted)] text-sm mb-4 leading-relaxed">
            Key updates in space exploration, AI in aerospace, and space missions. This block can be updated daily via automation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Daily Brief */}
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-3">Daily Brief</h3>
              <ul className="space-y-2 text-sm text-[var(--nasa-muted)]">
                <li><strong className="text-[var(--nasa-text)]">Artemis &amp; Moon:</strong> The SLS and Orion are paving the way for crewed lunar landings and Gateway. <span className="block text-xs mt-0.5 opacity-90">Why it matters: first steps toward sustainable Moon presence and Mars.</span></li>
                <li><strong className="text-[var(--nasa-text)]">ISS &amp; crew:</strong> International Space Station crews run science in microgravity; commercial crew (SpaceX, Boeing) ferry astronauts. <span className="block text-xs mt-0.5 opacity-90">Why it matters: continuous human presence and research in LEO.</span></li>
                <li><strong className="text-[var(--nasa-text)]">Mars rovers:</strong> Perseverance and Curiosity keep exploring; AI helps with driving and science targeting. <span className="block text-xs mt-0.5 opacity-90">Why it matters: autonomy is essential when signals take minutes to reach Earth.</span></li>
                <li><strong className="text-[var(--nasa-text)]">James Webb:</strong> JWST keeps revealing early galaxies and exoplanet atmospheres in infrared. <span className="block text-xs mt-0.5 opacity-90">Why it matters: understanding cosmic origins and habitability.</span></li>
                <li><strong className="text-[var(--nasa-text)]">Commercial space:</strong> SpaceX, Starlink, and others are scaling launches and satellite constellations; AI supports ops and collision avoidance. <span className="block text-xs mt-0.5 opacity-90">Why it matters: more traffic in orbit demands smarter automation.</span></li>
              </ul>
              <Link href="/blog"><a className="text-[var(--nasa-brand)] text-xs font-semibold mt-2 inline-block hover:underline">Read more on the blog →</a></Link>
            </div>
            {/* Featured Space Mission */}
            <div className="rounded-xl border border-[var(--nasa-line)] bg-[rgba(255,255,255,.03)] p-4">
              <h3 className="font-bold mb-3">Featured Space Mission: Artemis</h3>
              <p className="text-sm text-[var(--nasa-muted)] mb-2"><strong className="text-[var(--nasa-text)]">Goal:</strong> Return humans to the Moon (including the first woman and first person of color) and build a sustainable lunar presence as a stepping stone to Mars.</p>
              <p className="text-sm text-[var(--nasa-muted)] mb-2"><strong className="text-[var(--nasa-text)]">Tech:</strong> Space Launch System (SLS), Orion crew capsule, Human Landing System (HLS), and the lunar Gateway station in orbit around the Moon.</p>
              <p className="text-sm text-[var(--nasa-muted)] mb-2"><strong className="text-[var(--nasa-text)]">Fun facts:</strong> Orion has flown uncrewed around the Moon (Artemis I). Gateway will support landings and deep-space science. SLS is the most powerful rocket ever built.</p>
              <p className="text-sm text-[var(--nasa-muted)] mb-2"><strong className="text-[var(--nasa-text)]">Learning:</strong> Artemis uses the same orbital mechanics and mission design principles you can explore in our <Link href="/simulator"><a className="text-[var(--nasa-brand)] hover:underline">simulator</a></Link> and <Link href="/missions/timeline"><a className="text-[var(--nasa-brand)] hover:underline">mission timeline</a></Link>.</p>
              <Link href="/missions/timeline"><a className="text-[var(--nasa-brand)] text-xs font-semibold mt-2 inline-block hover:underline">Mission timeline →</a></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-6 mt-4 border-t border-[var(--nasa-line)] text-[var(--nasa-muted)] text-sm">
        <div>
          <strong>Explore more:</strong>{" "}
          <Link href="/learn/how-mars-rovers-work"><a>How Mars rovers work</a></Link>
          {" · "}
          <Link href="/learn/how-spacex-lands-rockets"><a>How SpaceX lands rockets</a></Link>
          {" · "}
          <Link href="/research"><a>Research hub</a></Link>
        </div>
        <div className="mt-2">© Orbital Simulator Hub · Learning layout · Built for speed + SEO</div>
      </footer>

      {/* Modal */}
      {modal && (
        <div className="nasa-ai-modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="nasa-modal-title">
          <div className="nasa-ai-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nasa-ai-modal-head">
              <strong id="nasa-modal-title">{modal.title}</strong>
              <button type="button" className="nasa-ai-xbtn" onClick={closeModal}>Close</button>
            </div>
            <div className="nasa-ai-modal-body">{modal.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}
