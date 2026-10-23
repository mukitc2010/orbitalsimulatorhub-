/**
 * AstroBot AGI Chat — Production-ready chat UI with actions dispatch
 */

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "astrobot";
  text: string;
  actionStatus?: string;
  actions?: Array<{ type: string; payload: Record<string, unknown> }>;
}

interface AstroBotChatProps {
  userId?: string;
  pageContext?: string;
  onAction?: (action: { type: string; payload: Record<string, unknown> }) => void;
  className?: string;
}

export function AstroBotChat({ userId = "anonymous", pageContext, onAction, className = "" }: AstroBotChatProps) {
  const sending = useRef(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dispatchAction = (action: { type: string; payload: Record<string, unknown> }) => {
    if (onAction) {
      onAction(action);
    } else {
      throw new Error("Open mission control to apply simulator actions.");
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending.current) return;
    sending.current = true;

    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    try {
      const base = typeof window !== "undefined" ? "" : "";
      const res = await fetch(`${base}/api/astrobot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userId,
          pageContext,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "astrobot", text: data.error || "Something went wrong. Please try again." },
        ]);
        return;
      }

      const reply = data.reply || "I'm here to help with orbital mechanics and space!";
      const actions = Array.isArray(data.actions) ? data.actions : [];

      let applied = 0;
      for (const action of actions) {
        try { dispatchAction(action); applied++; } catch { break; }
      }
      const actionStatus = actions.length ? (applied === actions.length
        ? `Applied ${applied} simulator action(s).`
        : `Applied ${applied} of ${actions.length} actions. Open mission control and retry the remaining requests.`) : undefined;
      setMessages((m) => [...m, { role: "astrobot", text: reply, actions, actionStatus }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "astrobot",
          text: "I couldn't connect to the AGI processor. Check your connection or try the local AstroBot mode.",
        },
      ]);
    } finally {
      sending.current = false;
      setLoading(false);
    }
  };

  const formatReply = (text: string) => {
    return (
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http://") || href?.startsWith("https://");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-[var(--accent-cyan)] hover:underline"
              >
                {children}
              </a>
            );
          },
          p: ({ children }) => <p className="mt-2 first:mt-0">{children}</p>,
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <div className={`flex flex-col rounded-xl border-2 overflow-hidden ${className}`} style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
      <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
        <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>🤖 ORACLE</h3>
        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Orbital mechanics • Calculations • Simulator control • Quizzes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]" ref={scrollRef}>
        {messages.length === 0 && <div className="flex flex-wrap gap-2">
          {["Deploy an ISS-like satellite and a GPS orbit so I can compare them", "How fast would I orbit at 1,000 km altitude?", "Why do geostationary satellites never move in the sky?", "Plan a demo: one LEO, one MEO and one GEO satellite, playing at 8x speed"].map(prompt =>
            <button key={prompt} type="button" onClick={() => setInput(prompt)} className="rounded border border-cyan-500/30 p-2 text-left text-xs text-cyan-300">{prompt}</button>)}
        </div>}
        {messages.length === 0 && (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            ORACLE ready. Ask about orbital mechanics or prepare a simulator mission.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                m.role === "user"
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              }`}
              style={{
                background: m.role === "user" ? "var(--accent-cyan)" : "var(--bg-surface)",
                color: m.role === "user" ? "#0f172a" : "var(--text-primary)",
              }}
            >
              <div className="whitespace-pre-wrap">{m.role === "astrobot" ? formatReply(m.text) : m.text}</div>
              {m.actions && m.actions.length > 0 && (
                <p className="text-xs mt-2 opacity-80">{m.actionStatus}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-2 text-sm" style={{ background: "var(--bg-surface)" }}>
              <span className="animate-pulse">Planning / calculating / checking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex gap-2" style={{ borderColor: "var(--border-color)" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Transmit a mission or ask about an orbit..."
          className="flex-1 rounded-lg px-4 py-2 text-sm border-2"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
          style={{ background: "var(--accent-cyan)", color: "#0f172a" }}
        >
          TRANSMIT
        </button>
      </div>
    </div>
  );
}
