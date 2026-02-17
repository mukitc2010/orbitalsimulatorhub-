import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "../trpc";
import { getAstroBotReplyLocal, ASTROBOT_FALLBACK } from "../astrobotKnowledge";

const TAB_IDS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"] as const;
const TABS: { id: (typeof TAB_IDS)[number]; label: string }[] = [
  { id: "t1", label: "🛰 AI Navigation" },
  { id: "t2", label: "🤖 Autonomous Spacecraft" },
  { id: "t3", label: "📋 Mission Planning" },
  { id: "t4", label: "🦾 Space Robotics" },
  { id: "t5", label: "⚠ Anomaly Detection" },
  { id: "t6", label: "🚀 NASA & SpaceX" },
  { id: "t7", label: "🔴 Mars AI" },
  { id: "t8", label: "📊 Space ML & Data" },
];

const DIAGRAM_NODES: { title: string; desc: string; body: string }[] = [
  { title: "Sense", desc: "Sensors + telemetry", body: "Sensors collect data: star tracker, IMU, GNSS, cameras, thermal and power telemetry. The goal is a clean, trustworthy state estimate." },
  { title: "Estimate", desc: "State estimation", body: "Filters (e.g., Kalman filters) combine noisy measurements to estimate position/velocity/attitude — the spacecraft's best guess of reality." },
  { title: "Decide", desc: "Rules + models", body: "Decision logic selects the next action: station-keep, avoid debris, run science, downlink data, or enter safe mode." },
  { title: "Plan", desc: "Optimize actions", body: "Planning computes a safe sequence: burns, pointing, schedules, or rover path. Optimization balances fuel, risk, and goals." },
  { title: "Act", desc: "Control + execution", body: "Commands go to actuators: thrusters, reaction wheels, gimbals, robotic arms. Control loops execute precisely and safely." },
  { title: "Learn", desc: "Update models", body: "Models update from new data: improve risk scoring, refine anomaly thresholds, and optimize future decisions safely." },
];

const FOCUS_NODES: { title: string; desc: string; body: string }[] = [
  { title: "Quick path: Learn in 10 minutes", desc: "Fast overview with key ideas.", body: "1) AI Navigation → 2) Anomaly Detection → 3) Mars AI → 4) Space ML. This sequence gives you a complete mental model: move, stay healthy, explore, then learn from data." },
  { title: "Research path: Build a project", desc: "Turn this into a real project.", body: "Build a mini satellite health monitor: simulate telemetry → detect anomalies → trigger safe mode. Then add orbit prediction and collision alerts. Great for portfolio + interviews." },
  { title: "What makes this NASA-style?", desc: "Structure + clarity + mission logic.", body: "Clear modules, mission-grade logic (FDIR), diagram-first learning, and a built-in assistant (AstroBot) that turns questions into explanations + next steps." },
];

const SECTIONS: { id: (typeof TAB_IDS)[number]; icon: string; title: string; desc: string }[] = [
  { id: "t1", icon: "🛰", title: "AI for satellite navigation", desc: "Autonomous orbit determination, collision avoidance, and station-keeping." },
  { id: "t2", icon: "🤖", title: "Autonomous spacecraft", desc: "Spacecraft that make decisions without constant ground contact." },
  { id: "t3", icon: "📋", title: "AI mission planning", desc: "Optimizing trajectories, launch windows, and resource allocation." },
  { id: "t4", icon: "🦾", title: "Space robotics", desc: "Rovers, arms, and robots that see, plan, and act in space." },
  { id: "t5", icon: "⚠", title: "AI anomaly detection", desc: "Predicting and diagnosing failures before they happen." },
  { id: "t6", icon: "🚀", title: "AI in NASA & SpaceX", desc: "How NASA and SpaceX use AI in launch, landing, and operations." },
  { id: "t7", icon: "🔴", title: "AI for Mars missions", desc: "Mars rovers, helicopters, and future crewed mission support." },
  { id: "t8", icon: "📊", title: "Space data analysis with ML", desc: "Image recognition, telemetry analysis, and scientific discovery." },
];

type ChatMessage = { role: "user" | "bot"; text: string };

export function AIInAerospace() {
  const [activeTab, setActiveTab] = useState<(typeof TAB_IDS)[number]>("t1");
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! I'm AstroBot. Ask me: \"How does collision avoidance work?\" or \"Explain rover autonomy like a beginner.\"" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const goToTab = (tabId: (typeof TAB_IDS)[number]) => {
    setActiveTab(tabId);
    guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages]);

  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    setChatMessages((m) => [...m, { role: "user", text }]);
    setChatLoading(true);

    const localReply = getAstroBotReplyLocal(text);
    if (localReply) {
      setChatMessages((m) => [...m, { role: "bot", text: localReply.answer }]);
      setChatLoading(false);
      return;
    }

    try {
      const reply = await trpc.astrobot.ask.mutate({ question: text });
      setChatMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setChatMessages((m) => [...m, { role: "bot", text: ASTROBOT_FALLBACK }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="nasa-ai-page max-w-6xl mx-auto">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_.7fr] gap-4 mb-4">
        <div className="nasa-ai-card">
          <div className="nasa-ai-card-inner">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
              AI in Space: Satellites, Rovers, Mission Planning, NASA & SpaceX
            </h1>
            <p className="text-[var(--nasa-muted)] text-base leading-relaxed mb-3">
              A NASA-style learning hub covering autonomous orbit determination, collision avoidance, spacecraft decision-making,
              robotics, anomaly detection, Mars AI, and space data machine learning — plus <strong>AstroBot</strong> and <strong>daily space news</strong>.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="nasa-ai-kpi">8 Core Modules <small>AI topics in space</small></div>
              <div className="nasa-ai-kpi">Interactive Diagrams <small>Click to learn</small></div>
              <div className="nasa-ai-kpi">AstroBot AI <small>Ask anything</small></div>
              <div className="nasa-ai-kpi">Daily News <small>Auto publishing</small></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {["satellite navigation AI", "autonomous spacecraft", "mission planning", "space robotics", "anomaly detection", "Mars rover AI", "space ML"].map((tag) => (
                <span key={tag} className="nasa-ai-tag">{tag}</span>
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
              className={`nasa-ai-node text-left ${activeTab === s.id ? "active-tab" : ""}`}
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
        <div className="nasa-ai-tabs">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`nasa-ai-tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
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
          </div>
          <div className={`nasa-ai-panel ${activeTab === "t6" ? "active" : ""}`} id="t6">
            <h2>🚀 AI in NASA & SpaceX</h2>
            <p>NASA and SpaceX use autonomy to handle complex operations where timing and precision are everything.</p>
            <ul className="nasa-ai-bullets">
              <li><strong>Launch + landing:</strong> guidance & control adjust rapidly under changing conditions.</li>
              <li><strong>Operations:</strong> automate checks, optimize timelines, detect anomalies faster than humans.</li>
              <li><strong>Constellations:</strong> scheduling, collision handling, routing, and health management at scale.</li>
              <li><strong>Science:</strong> ML accelerates discovery in images and signals from telescopes and probes.</li>
            </ul>
            <p><strong>Reality:</strong> mission-grade &quot;AI&quot; is often a blend of control theory + robust rules + ML where it&apos;s safe.</p>
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
          </div>
        </div>
      </section>

      {/* Diagram + AstroBot */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 nasa-ai-card">
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
        </div>

        <div className="nasa-ai-card">
          <div className="nasa-ai-card-inner p-0 flex flex-col h-[520px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--nasa-line)] bg-[rgba(255,255,255,.02)]">
              <div>
                <div className="font-black">🧠 AstroBot</div>
                <div className="text-[var(--nasa-muted)] text-xs mt-0.5">Ask about satellites, NASA missions, Mars, ML.</div>
              </div>
              <div className="flex items-center gap-2 text-[var(--nasa-muted)] font-bold text-sm">
                <span className="nasa-ai-dot" /> Ready
              </div>
            </div>
            <div ref={chatLogRef} className="nasa-ai-chat-log flex-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`nasa-ai-msg ${msg.role}`}>
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                </div>
              ))}
              {chatLoading && <div className="nasa-ai-msg bot">Thinking…</div>}
            </div>
            <div className="nasa-ai-chat-input-wrap">
              <input
                type="text"
                className="nasa-ai-chat-input"
                placeholder="Ask AstroBot…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                disabled={chatLoading}
              />
              <button type="button" className="nasa-ai-chat-send" onClick={sendChat}>Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily News */}
      <section id="dailynews" className="nasa-ai-card mb-4">
        <div className="nasa-ai-card-inner">
          <h2 className="text-lg font-bold mb-2">🗞 Daily Space News</h2>
          <p className="text-[var(--nasa-muted)] text-sm mb-3 leading-relaxed">
            This section is designed for automated daily publishing. You can generate a post every day and update this block.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="nasa-ai-node" onClick={() => openModal("Today's Space Brief", "(Automation will insert today's summary here.) Add 5 short items with \"Why it matters\" and links.")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openModal("Today's Space Brief", "(Automation will insert today's summary here.)")}>
              <div className="nasa-ai-node-title">Daily Brief (auto-updated)</div>
              <div className="nasa-ai-node-desc">5 news items + mission spotlight</div>
            </div>
            <div className="nasa-ai-node" onClick={() => openModal("Featured NASA Mission", "(Automation will insert a mission spotlight here.) Keep it evergreen and update daily/weekly.")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openModal("Featured NASA Mission", "(Automation will insert a mission spotlight here.)")}>
              <div className="nasa-ai-node-title">Featured NASA Mission</div>
              <div className="nasa-ai-node-desc">Goal • Tech • Fun facts • Learning points</div>
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
          <Link href="/astrobot"><a>Ask AstroBot (AI)</a></Link>
          {" · "}
          <Link href="/research"><a>Research hub</a></Link>
        </div>
        <div className="mt-2">© Orbital Simulator Hub · NASA-style learning layout · Built for speed + SEO</div>
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
