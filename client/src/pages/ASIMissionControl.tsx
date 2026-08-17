import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { SEOHead } from "../components/SEOHead";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentAction =
  | { type: "deploy"; preset: "LEO" | "MEO" | "GEO"; count: number }
  | { type: "simulate"; play?: boolean; speed?: number };

type ToolTraceEntry = { tool: string; summary: string };

type ChatMessage = {
  role: "user" | "oracle";
  text: string;
  actions?: AgentAction[];
  toolTrace?: ToolTraceEntry[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build a /simulator deep link that auto-deploys the queued satellites. */
function buildSimulatorLink(actions: AgentAction[]): string | null {
  const deploys: string[] = [];
  let play = false;
  let speed: number | undefined;
  for (const action of actions) {
    if (action.type === "deploy") {
      for (let i = 0; i < action.count; i++) deploys.push(action.preset);
    } else if (action.type === "simulate") {
      if (action.play) play = true;
      if (action.speed) speed = action.speed;
    }
  }
  if (deploys.length === 0) return null;
  const params = new URLSearchParams();
  params.set("deploy", deploys.join(","));
  if (play || deploys.length > 0) params.set("play", "1");
  if (speed) params.set("speed", String(speed));
  return `/simulator?${params.toString()}`;
}

const SUGGESTIONS = [
  "Deploy an ISS-like satellite and a GPS orbit so I can compare them",
  "How fast would I orbit at 1,000 km altitude?",
  "Why do geostationary satellites never move in the sky?",
  "Plan a demo: one LEO, one MEO and one GEO satellite, playing at 8× speed",
];

const TOOL_ICONS: Record<string, string> = {
  orbital_calculator: "🧮",
  deploy_satellite: "🛰",
  set_simulation: "▶",
  search_site_knowledge: "📡",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ASIMissionControl() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "oracle",
      text: "ORACLE online. All systems nominal, Commander.\n\nI'm the mission-control intelligence of Orbital Simulator Hub — I run real orbital mechanics, deploy satellites into the 3D simulator on your order, and answer anything about spaceflight. What's the mission?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    const history = messages
      .filter((m) => m.text)
      .slice(-10)
      .map((m) => ({ role: m.role === "oracle" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("/api/asi-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        actions?: AgentAction[];
        toolTrace?: ToolTraceEntry[];
      };
      if (!res.ok || data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "oracle", text: `⚠ ${data.error ?? "Telemetry lost. Please try again."}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "oracle", text: data.reply ?? "", actions: data.actions, toolTrace: data.toolTrace },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "oracle", text: "⚠ Communication blackout — check your connection and try again." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={styles.root}>
      <SEOHead />

      {/* Header */}
      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>ASI MISSION CONTROL</div>
          <h1 style={styles.title}>
            ORACLE <span style={styles.titleDim}>// Orbital Reasoning And Control Engine</span>
          </h1>
        </div>
        <div style={styles.statusChip}>
          <span style={{ ...styles.statusDot, background: busy ? "#fbbf24" : "#34d399" }} />
          {busy ? "PROCESSING" : "ONLINE"}
        </div>
      </header>

      {/* Feed */}
      <div ref={feedRef} style={styles.feed}>
        {messages.map((msg, i) => (
          <div key={i} style={{ ...styles.row, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={msg.role === "user" ? styles.userBubble : styles.oracleBubble}>
              {msg.role === "oracle" && <div style={styles.bubbleLabel}>ORACLE</div>}
              <div style={styles.bubbleText}>{msg.text}</div>

              {msg.toolTrace && msg.toolTrace.length > 0 && (
                <div style={styles.traceRow}>
                  {msg.toolTrace.map((t, j) => (
                    <span key={j} style={styles.traceChip}>
                      {TOOL_ICONS[t.tool] ?? "⚙"} {t.summary}
                    </span>
                  ))}
                </div>
              )}

              {msg.actions && buildSimulatorLink(msg.actions) && (
                <Link href={buildSimulatorLink(msg.actions)!} style={styles.executeButton}>
                  🛰 EXECUTE IN SIMULATOR →
                </Link>
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ ...styles.row, justifyContent: "flex-start" }}>
            <div style={styles.oracleBubble}>
              <div style={styles.bubbleLabel}>ORACLE</div>
              <div style={{ ...styles.bubbleText, color: "#67e8f9" }}>▸ computing trajectory…</div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions (before first user message) */}
      {messages.length <= 1 && (
        <div style={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <button key={s} style={styles.suggestionChip} onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        style={styles.inputBar}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Transmit to Mission Control…"
          disabled={busy}
          aria-label="Message ORACLE"
        />
        <button type="submit" style={{ ...styles.sendButton, opacity: busy || !input.trim() ? 0.5 : 1 }} disabled={busy || !input.trim()}>
          TRANSMIT
        </button>
      </form>

      <div style={styles.footNote}>
        ORACLE runs the site's real orbital physics and can deploy satellites into the{" "}
        <Link href="/simulator" style={{ color: "#67e8f9" }}>
          3D simulator
        </Link>
        . Educational use — verify critical numbers independently.
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "radial-gradient(1200px 600px at 50% -10%, #0a1636 0%, #030616 60%)",
    color: "#e2e8f0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "16px",
    gap: 12,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(56,189,248,0.25)",
    paddingBottom: 12,
  },
  eyebrow: { fontSize: 11, letterSpacing: 4, color: "#67e8f9", fontWeight: 700 },
  title: { margin: "4px 0 0", fontSize: 22, fontWeight: 800, color: "#f1f5f9" },
  titleDim: { color: "#64748b", fontWeight: 500, fontSize: 14 },
  statusChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 700,
    color: "#94a3b8",
    border: "1px solid rgba(56,189,248,0.3)",
    borderRadius: 999,
    padding: "6px 14px",
    background: "rgba(13,22,48,0.7)",
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, boxShadow: "0 0 8px currentColor" },
  feed: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "8px 0",
    minHeight: 300,
    maxHeight: "60vh",
  },
  row: { display: "flex" },
  oracleBubble: {
    maxWidth: "min(680px, 90%)",
    background: "rgba(13,22,48,0.85)",
    border: "1px solid rgba(56,189,248,0.3)",
    borderRadius: "4px 16px 16px 16px",
    padding: "12px 16px",
    boxShadow: "0 0 24px rgba(34,211,238,0.08)",
  },
  userBubble: {
    maxWidth: "min(680px, 90%)",
    background: "rgba(34,211,238,0.12)",
    border: "1px solid rgba(34,211,238,0.35)",
    borderRadius: "16px 4px 16px 16px",
    padding: "12px 16px",
  },
  bubbleLabel: { fontSize: 10, letterSpacing: 3, color: "#67e8f9", fontWeight: 800, marginBottom: 6 },
  bubbleText: { whiteSpace: "pre-wrap", lineHeight: 1.55, fontSize: 14.5 },
  traceRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 },
  traceChip: {
    fontSize: 11,
    color: "#94a3b8",
    border: "1px solid rgba(148,163,184,0.3)",
    borderRadius: 999,
    padding: "3px 10px",
    background: "rgba(3,6,22,0.6)",
  },
  executeButton: {
    display: "inline-block",
    marginTop: 12,
    padding: "10px 18px",
    borderRadius: 999,
    border: "1.5px solid #34d399",
    color: "#34d399",
    fontWeight: 800,
    fontSize: 13,
    letterSpacing: 1.5,
    textDecoration: "none",
    background: "rgba(52,211,153,0.1)",
    boxShadow: "0 0 16px rgba(52,211,153,0.25)",
  },
  suggestions: { display: "flex", flexWrap: "wrap", gap: 8 },
  suggestionChip: {
    border: "1px solid rgba(167,139,250,0.4)",
    background: "rgba(167,139,250,0.08)",
    color: "#c4b5fd",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 13,
    cursor: "pointer",
  },
  inputBar: { display: "flex", gap: 8 },
  input: {
    flex: 1,
    background: "rgba(13,22,48,0.85)",
    border: "1px solid rgba(56,189,248,0.35)",
    borderRadius: 12,
    color: "#e2e8f0",
    padding: "12px 16px",
    fontSize: 15,
    outline: "none",
  },
  sendButton: {
    background: "rgba(34,211,238,0.15)",
    border: "1.5px solid #22d3ee",
    color: "#67e8f9",
    borderRadius: 12,
    padding: "0 22px",
    fontWeight: 800,
    letterSpacing: 2,
    fontSize: 13,
    cursor: "pointer",
  },
  footNote: { fontSize: 12, color: "#64748b", textAlign: "center", paddingBottom: 8 },
};
