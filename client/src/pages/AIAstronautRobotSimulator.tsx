"use client";

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { RobotSimulationScene } from "../components/RobotSimulationScene";

const ROBOT_TYPES = [
  { id: "humanoid", label: "Humanoid", icon: "🤖", desc: "Bipedal, human-like. ISS, Moon, Mars." },
  { id: "rover", label: "Rover", icon: "🛞", desc: "Wheeled. Mars surface, lunar terrain." },
  { id: "drone", label: "Drone", icon: "🚁", desc: "Flying. Zero-G station inspection." },
];

const SENSORS = [
  { id: "camera", label: "Camera sensors", icon: "📷" },
  { id: "lidar", label: "Lidar", icon: "📡" },
  { id: "imu", label: "IMU", icon: "📐" },
  { id: "force", label: "Force/torque", icon: "⚡" },
];

const ENVIRONMENTS = [
  { id: "iss", label: "ISS Interior", icon: "🛰", desc: "Zero gravity, station modules" },
  { id: "moon", label: "Moon Base", icon: "🌙", desc: "1/6 g, regolith, habitat" },
  { id: "mars", label: "Mars Surface", icon: "🔴", desc: "1/3 g, dust, rocks" },
  { id: "deep", label: "Deep Space Repair", icon: "🌌", desc: "Orbital, satellite servicing" },
];

const TASKS = [
  { id: "repair", label: "Repair satellite", icon: "🔧" },
  { id: "pick", label: "Pick objects", icon: "✋" },
  { id: "navigate", label: "Navigate station", icon: "🧭" },
  { id: "assist", label: "Assist astronauts", icon: "👨‍🚀" },
  { id: "inspect", label: "Autonomous inspection", icon: "🔍" },
];

const AI_MODULES = [
  { name: "Computer Vision (CNN)", desc: "Object detection, semantic segmentation" },
  { name: "Reinforcement Learning", desc: "Policy optimization, sim-to-real" },
  { name: "Sensor Fusion", desc: "Multi-modal state estimation" },
  { name: "Space-AGI Decision Engine", desc: "Planning, control, autonomy" },
];

const SIM_STEPS = [
  "Preparing scripted mission...",
  "Loading environment...",
  "Deploying robot...",
  "Showing selected sensor overlays...",
  "Playing task animation...",
  "Task complete ✓",
];

export function AIAstronautRobotSimulator() {
  const [robotType, setRobotType] = useState<string>("humanoid");
  const [environment, setEnvironment] = useState<string>("iss");
  const [selectedTask, setSelectedTask] = useState<string | null>("inspect");
  const [sensors, setSensors] = useState<Set<string>>(new Set(["camera"]));
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed,setElapsed] = useState(0);
  const [playbackSpeed,setPlaybackSpeed] = useState(1);
  const simProgress = Math.min(100,elapsed/20*100);
  const simStep = Math.min(SIM_STEPS.length-1,Math.floor(simProgress/100*SIM_STEPS.length));
  useEffect(()=>{setIsRunning(false);setElapsed(0)},[robotType,environment,selectedTask,sensors]);
  useEffect(()=>{
    if(!isRunning)return;
    let last=performance.now();
    const timer=setInterval(()=>{const now=performance.now();const dt=Math.min(.25,(now-last)/1000);last=now;setElapsed(t=>Math.min(20,t+dt*playbackSpeed))},50);
    return()=>clearInterval(timer);
  },[isRunning,playbackSpeed]);
  useEffect(()=>{if(elapsed>=20)setIsRunning(false)},[elapsed]);
  const runSimulation=()=>{if(elapsed>=20)setElapsed(0);setIsRunning(true)};

  const toggleSensor = (id: string) => {
    setSensors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className="min-h-screen -mx-4 px-4 py-6"
      style={{
        background: "linear-gradient(180deg, #0a0e1a 0%, #0f172a 50%, #0a0e1a 100%)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header + Badges */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: "rgba(0,217,255,0.3)", color: "#0f172a" }}
            >
              Interactive 3D Space Robot Lab
            </span>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(167,139,250,0.4)", color: "#fff" }}
            >
              Built for Future Space Engineers
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: "#fff", letterSpacing: "-0.02em" }}>
            AI Astronaut Robot Simulator
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Build a humanoid, rover, or free-flying robot. Explore scripted 3D tasks in ISS, Moon, Mars, and deep-space settings. Sensor overlays illustrate concepts; no AI model is trained.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link href="/blog/how-space-will-build-ai-based-astronaut-robots-for-future-missions">
              <a className="text-sm font-medium" style={{ color: "var(--accent-cyan)" }}>Read: How Space Builds AI Robots →</a>
            </Link>
            <Link href="/research/space-agi-lab">
              <a className="text-sm font-medium" style={{ color: "#a78bfa" }}>Space-AGI Lab →</a>
            </Link>
          </div>
        </div>

        {/* Main grid: Builder + Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Robot Builder Panel */}
          <div
            className="order-2 lg:order-1 rounded-2xl p-5 border"
            style={{
              background: "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
              borderColor: "rgba(0,217,255,0.3)",
              boxShadow: "0 0 30px rgba(0,217,255,0.1)",
            }}
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--accent-cyan)" }}>
              <span>🤖</span> Robot Builder Panel
            </h2>

            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Robot type</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {ROBOT_TYPES.map((r) => (
                <button
                  key={r.id}
                  aria-pressed={robotType === r.id}
                  onClick={() => setRobotType(r.id)}
                  className="flex-1 min-w-[80px] p-3 rounded-xl text-left transition"
                  style={{
                    background: robotType === r.id ? "rgba(0,217,255,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${robotType === r.id ? "rgba(0,217,255,0.5)" : "rgba(148,163,184,0.2)"}`,
                  }}
                >
                  <span className="text-xl block mb-1">{r.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{r.label}</span>
                  <span className="text-xs block mt-0.5" style={{ color: "var(--text-muted)" }}>{r.desc}</span>
                </button>
              ))}
            </div>

            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Sensors</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {SENSORS.map((s) => (
                <button
                  key={s.id}
                  aria-pressed={sensors.has(s.id)}
                  onClick={() => toggleSensor(s.id)}
                  className="px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 transition"
                  style={{
                    background: sensors.has(s.id) ? "rgba(0,217,255,0.15)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${sensors.has(s.id) ? "rgba(0,217,255,0.4)" : "rgba(148,163,184,0.2)"}`,
                  }}
                >
                  <span>{s.icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{s.label}</span>
                </button>
              ))}
            </div>

            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Modules</p>
            <div className="space-y-2">
              {["Robotic arms", "AI brain module"].map((m, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg flex items-center gap-2"
                  style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)" }}
                >
                  <span>{i === 0 ? "🦾" : "🧠"}</span>
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>{m}</span>
                  <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Viewport / Simulator area */}
          <div
            className="order-1 lg:order-2 lg:col-span-2 rounded-2xl overflow-hidden border flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(2,6,23,0.95), rgba(10,14,26,0.9))",
              borderColor: "rgba(0,217,255,0.25)",
              boxShadow: "0 0 40px rgba(0,217,255,0.08), inset 0 0 60px rgba(0,0,0,0.3)",
              minHeight: 320,
            }}
          >
            <div className="flex-1 p-6 relative">
              {/* YOUR ROBOT BUILD — Always visible */}
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-cyan)" }}>
                  🤖 Your Robot Build
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(0,217,255,0.15)", border: "1px solid rgba(0,217,255,0.3)" }}>
                    <span className="text-2xl">{ROBOT_TYPES.find((r) => r.id === robotType)?.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ROBOT_TYPES.find((r) => r.id === robotType)?.label}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
                    <span className="text-xl">{ENVIRONMENTS.find((e) => e.id === environment)?.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ENVIRONMENTS.find((e) => e.id === environment)?.label}</span>
                  </div>
                  {Array.from(sensors).map((id) => {
                    const s = SENSORS.find((x) => x.id === id);
                    return s ? (
                      <div key={id} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg" style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.2)" }}>
                        <span>{s.icon}</span>
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.label}</span>
                      </div>
                    ) : null;
                  })}
                  {selectedTask && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                      <span className="text-xl">{TASKS.find((t) => t.id === selectedTask)?.icon}</span>
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{TASKS.find((t) => t.id === selectedTask)?.label}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3D Visual Simulation — Live robot in environment */}
              <div className="mb-4">
                <RobotSimulationScene
                  robotType={robotType as "humanoid" | "rover" | "drone"}
                  environment={environment as "iss" | "moon" | "mars" | "deep"}
                  isRunning={isRunning}
                  simStep={simStep}
                  progress={simProgress}
                  task={selectedTask}
                  sensors={Array.from(sensors)}
                />
                <p className="text-xs mt-2 text-center" style={{ color: "var(--text-muted)" }}>
                  Drag to rotate • Scroll to zoom • {ENVIRONMENTS.find((e) => e.id === environment)?.label}
                </p>
              </div>

              <div className="robot-playback" aria-label="Robot playback controls">
                <button onClick={()=>isRunning?setIsRunning(false):runSimulation()}>{isRunning?"Pause robot":"Play robot"}</button>
                <button onClick={()=>{setElapsed(0);setIsRunning(false)}}>Restart mission</button>
                <label>Mission speed<select value={playbackSpeed} onChange={e=>setPlaybackSpeed(Number(e.target.value))}>{[.5,1,2,4].map(v=><option key={v} value={v}>{v}x</option>)}</select></label>
              </div>
              <label className="robot-timeline">Mission timeline: {elapsed.toFixed(1)} / 20 s<input aria-label="Mission timeline" type="range" min="0" max="20" step=".1" value={elapsed} onChange={e=>{setIsRunning(false);setElapsed(Number(e.target.value))}}/></label>
              <p className="text-xs mb-4 text-slate-400">Scripted task visualization, not a learned policy or physical validation. Floating robots use a thruster metaphor; rotors cannot produce lift in vacuum. Gravity and sensor readings are not simulated.</p>
              {/* Running: progress */}
              {isRunning && (
                <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.3)" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>{SIM_STEPS[simStep]}</p>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${simProgress}%`, background: "var(--accent-cyan)" }} />
                  </div>
                </div>
              )}

              {/* Complete: Mission Report */}
              {!isRunning && elapsed >= 20 && (
                <div className="p-5 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.4)" }}>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "#22c55e" }}>
                    ✓ Mission Report — What You Built
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <li><strong>Robot:</strong> {ROBOT_TYPES.find((r) => r.id === robotType)?.label} with robotic arms + AI brain</li>
                    <li><strong>Sensors:</strong> {Array.from(sensors).map((id) => SENSORS.find((s) => s.id === id)?.label).join(", ") || "None"}</li>
                    <li><strong>Environment:</strong> {ENVIRONMENTS.find((e) => e.id === environment)?.label} — {ENVIRONMENTS.find((e) => e.id === environment)?.desc}</li>
                    <li><strong>Task:</strong> {selectedTask ? TASKS.find((t) => t.id === selectedTask)?.label : "None selected"}</li>
                  </ul>
                  <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
                    Your {ROBOT_TYPES.find((r) => r.id === robotType)?.label} completed the scripted animation in {ENVIRONMENTS.find((e) => e.id === environment)?.label}.
                  </p>
                </div>
              )}

              {!isRunning && elapsed < 20 && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="inline-block w-2 h-2 rounded-full animate-pulse mr-1.5 align-middle" style={{ background: "var(--accent-cyan)" }} />
                  {elapsed > 0 ? "Paused - resume with Play robot" : "Ready - click Run Simulation below"}
                </p>
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,217,255,0.04), transparent 70%)",
                }}
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(148,163,184,0.15)" }}>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                ENV: {environment.toUpperCase()} | ROBOT: {robotType.toUpperCase()} | SENSORS: {sensors.size}
              </span>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: isRunning ? "rgba(0,217,255,0.5)" : "var(--accent-cyan)", color: "#0f172a" }}
              >
                {isRunning ? "Running…" : "Run Simulation"}
              </button>
            </div>
          </div>
        </div>

        {/* Space Environments */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            🌍 Space Environments
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ENVIRONMENTS.map((e) => (
              <button
                key={e.id}
                aria-pressed={environment === e.id}
                onClick={() => setEnvironment(e.id)}
                className="p-4 rounded-xl text-left transition"
                style={{
                  background: environment === e.id ? "rgba(0,217,255,0.15)" : "rgba(15,23,42,0.85)",
                  border: `1px solid ${environment === e.id ? "rgba(0,217,255,0.5)" : "rgba(148,163,184,0.2)"}`,
                }}
              >
                <span className="text-2xl block mb-2">{e.icon}</span>
                <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{e.label}</span>
                <span className="text-xs block mt-0.5" style={{ color: "var(--text-muted)" }}>{e.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Visual AI Concepts */}
        <section id="training" className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#a78bfa" }}>
            👁 Visual AI Concepts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Object detection", "Navigation", "Obstacle avoidance", "Docking simulation"].map((mode, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(167,139,250,0.08)",
                  border: "1px solid rgba(167,139,250,0.25)",
                }}
              >
                <span className="text-lg block mb-2">{["📷", "🧭", "⚠️", "🔌"][i]}</span>
                <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{mode}</span>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {mode === "Object detection" && "Satellite parts, tools"}
                  {mode === "Navigation" && "Computer vision"}
                  {mode === "Obstacle avoidance" && "Real-time"}
                  {mode === "Docking simulation" && "Precise alignment"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Tasks */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            ⚡ Scripted Tasks to Explore
          </h2>
          <div className="flex flex-wrap gap-3">
            {TASKS.map((t) => (
              <button
                key={t.id}
                aria-pressed={selectedTask === t.id}
                onClick={() => setSelectedTask(selectedTask === t.id ? null : t.id)}
                className="p-4 rounded-xl flex items-center gap-3 transition"
                style={{
                  background: selectedTask === t.id ? "rgba(0,217,255,0.2)" : "rgba(15,23,42,0.85)",
                  border: `1px solid ${selectedTask === t.id ? "rgba(0,217,255,0.5)" : "rgba(148,163,184,0.2)"}`,
                }}
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* AI Engine Concept */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
            🧠 Robot Brain — AI Engine
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Concepts for a future robotics stack. These modules are educational descriptions; this demo does not run CNN training, reinforcement learning, or a Space-AGI decision engine:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_MODULES.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,217,255,0.08), rgba(167,139,250,0.06))",
                  border: "1px solid rgba(0,217,255,0.25)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <p className="font-bold text-sm mb-1" style={{ color: "var(--accent-cyan)" }}>{m.name}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(148,163,184,0.15)" }}>
            <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
              Computer Vision (CNN) → Sensor Fusion → Space-AGI Decision Engine → Reinforcement Learning
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Trusted by engineers, researchers, future space pioneers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/blog/how-space-will-build-ai-based-astronaut-robots-for-future-missions">
              <a className="px-6 py-3 rounded-xl font-semibold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
                Read Full Article
              </a>
            </Link>
            <Link href="/research/space-agi-lab">
              <a className="px-6 py-3 rounded-xl font-semibold border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}>
                Space-AGI Lab
              </a>
            </Link>
            <Link href="/simulator">
              <a className="px-6 py-3 rounded-xl font-semibold border-2" style={{ borderColor: "#a78bfa", color: "#a78bfa" }}>
                Orbit Simulator
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
