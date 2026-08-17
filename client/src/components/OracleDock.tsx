import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

/**
 * ORACLE dock — a compact mission-control agent panel embedded on the
 * Simulator page. Unlike the full /asi-mission-control page, agent orders
 * (deploy satellites, play, time-warp) execute immediately in the live scene
 * through the callbacks the Simulator provides.
 */

type AgentAction =
  | { type: "deploy"; preset: "LEO" | "MEO" | "GEO"; count: number }
  | { type: "simulate"; play?: boolean; speed?: number };

type DockMessage = { role: "user" | "oracle"; text: string; executed?: string };

interface OracleDockProps {
  onDeploy: (preset: "LEO" | "MEO" | "GEO") => void;
  onSimulate: (opts: { play?: boolean; speed?: number }) => void;
}

export function OracleDock({ onDeploy, onSimulate }: OracleDockProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DockMessage[]>([
    { role: "oracle", text: "ORACLE on station. Give me a mission — I'll deploy it right here in the simulator." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight });
  }, [messages, busy, open]);

  function executeActions(actions: AgentAction[]): string {
    const done: string[] = [];
    for (const action of actions) {
      if (action.type === "deploy") {
        for (let i = 0; i < Math.min(5, action.count); i++) onDeploy(action.preset);
        done.push(`${Math.min(5, action.count)}× ${action.preset}`);
      } else if (action.type === "simulate") {
        onSimulate({ play: action.play, speed: action.speed });
        if (action.play) done.push(action.speed ? `play ×${action.speed}` : "play");
      }
    }
    return done.join(" · ");
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    const history = messages
      .slice(-8)
      .map((m) => ({ role: m.role === "oracle" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("/api/asi-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = (await res.json()) as { reply?: string; error?: string; actions?: AgentAction[] };
      if (!res.ok || data.error) {
        setMessages((prev) => [...prev, { role: "oracle", text: `⚠ ${data.error ?? "Telemetry lost."}` }]);
      } else {
        const executed = data.actions && data.actions.length > 0 ? executeActions(data.actions) : undefined;
        setMessages((prev) => [...prev, { role: "oracle", text: data.reply ?? "", executed }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "oracle", text: "⚠ Communication blackout — try again." }]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button style={dock.fab} onClick={() => setOpen(true)} aria-label="Open ORACLE mission control">
        🛰 ORACLE
      </button>
    );
  }

  return (
    <div style={dock.panel}>
      <div style={dock.header}>
        <span style={dock.headerTitle}>
          <span style={{ ...dock.dot, background: busy ? "#fbbf24" : "#34d399" }} />
          ORACLE // MISSION CONTROL
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/asi-mission-control" style={dock.expandLink} title="Open full Mission Control">
            ⤢
          </Link>
          <button style={dock.closeButton} onClick={() => setOpen(false)} aria-label="Minimize ORACLE">
            —
          </button>
        </div>
      </div>

      <div ref={feedRef} style={dock.feed}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === "user" ? dock.userMsg : dock.oracleMsg}>
            <div style={dock.msgText}>{msg.text}</div>
            {msg.executed && <div style={dock.executedChip}>✓ EXECUTED: {msg.executed}</div>}
          </div>
        ))}
        {busy && <div style={{ ...dock.oracleMsg, color: "#67e8f9" }}>▸ computing…</div>}
      </div>

      <form
        style={dock.inputRow}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          style={dock.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. deploy a LEO and a GEO, then play"
          disabled={busy}
          aria-label="Message ORACLE"
        />
        <button type="submit" style={{ ...dock.send, opacity: busy || !input.trim() ? 0.5 : 1 }} disabled={busy || !input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}

const dock: Record<string, React.CSSProperties> = {
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 60,
    padding: "12px 20px",
    borderRadius: 999,
    border: "1.5px solid #22d3ee",
    background: "rgba(3,6,22,0.92)",
    color: "#67e8f9",
    fontWeight: 800,
    letterSpacing: 1.5,
    fontSize: 13,
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(34,211,238,0.35)",
  },
  panel: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 60,
    width: "min(360px, calc(100vw - 32px))",
    height: 440,
    display: "flex",
    flexDirection: "column",
    background: "rgba(3,6,22,0.96)",
    border: "1px solid rgba(56,189,248,0.4)",
    borderRadius: 16,
    boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 24px rgba(34,211,238,0.15)",
    color: "#e2e8f0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderBottom: "1px solid rgba(56,189,248,0.25)",
  },
  headerTitle: { display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: 2, fontWeight: 800, color: "#67e8f9" },
  dot: { width: 7, height: 7, borderRadius: 4, boxShadow: "0 0 6px currentColor" },
  expandLink: { color: "#94a3b8", textDecoration: "none", fontSize: 14 },
  closeButton: { background: "none", border: "none", color: "#94a3b8", fontSize: 14, cursor: "pointer", padding: 2 },
  feed: { flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 },
  oracleMsg: {
    alignSelf: "flex-start",
    maxWidth: "92%",
    background: "rgba(13,22,48,0.9)",
    border: "1px solid rgba(56,189,248,0.25)",
    borderRadius: "4px 12px 12px 12px",
    padding: "8px 12px",
    fontSize: 13,
  },
  userMsg: {
    alignSelf: "flex-end",
    maxWidth: "92%",
    background: "rgba(34,211,238,0.12)",
    border: "1px solid rgba(34,211,238,0.3)",
    borderRadius: "12px 4px 12px 12px",
    padding: "8px 12px",
    fontSize: 13,
  },
  msgText: { whiteSpace: "pre-wrap", lineHeight: 1.5 },
  executedChip: {
    marginTop: 6,
    fontSize: 10.5,
    letterSpacing: 1,
    fontWeight: 800,
    color: "#34d399",
  },
  inputRow: { display: "flex", gap: 6, padding: 10, borderTop: "1px solid rgba(56,189,248,0.25)" },
  input: {
    flex: 1,
    background: "rgba(13,22,48,0.9)",
    border: "1px solid rgba(56,189,248,0.3)",
    borderRadius: 10,
    color: "#e2e8f0",
    padding: "9px 12px",
    fontSize: 13,
    outline: "none",
  },
  send: {
    background: "rgba(34,211,238,0.15)",
    border: "1.5px solid #22d3ee",
    color: "#67e8f9",
    borderRadius: 10,
    padding: "0 14px",
    fontWeight: 800,
    cursor: "pointer",
  },
};
