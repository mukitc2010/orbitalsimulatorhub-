/**
 * AstroBot AGI Chat — Production-ready chat UI with actions dispatch
 */

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "astrobot";
  text: string;
  actions?: Array<{ type: string; payload: Record<string, unknown> }>;
}

interface AstroBotChatProps {
  userId?: string;
  pageContext?: string;
  onAction?: (action: { type: string; payload: Record<string, unknown> }) => void;
  className?: string;
}

export function AstroBotChat({ userId = "anonymous", pageContext, onAction, className = "" }: AstroBotChatProps) {
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
      window.dispatchEvent(new CustomEvent("astrobot-action", { detail: action }));
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

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

      setMessages((m) => [...m, { role: "astrobot", text: reply, actions }]);

      for (const action of actions) {
        dispatchAction(action);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "astrobot",
          text: "I couldn't connect to the AGI processor. Check your connection or try the local AstroBot mode.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatReply = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--accent-cyan)] hover:underline">$1</a>');
      return <p key={i} className={i > 0 ? "mt-2" : ""} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className={`flex flex-col rounded-xl border-2 overflow-hidden ${className}`} style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
      <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
        <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>🤖 AstroBot AGI</h3>
        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Orbital mechanics • Calculations • Simulator control • Quizzes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]" ref={scrollRef}>
        {messages.length === 0 && (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Ask anything: &quot;Calculate orbital velocity at 400 km&quot;, &quot;Quiz me on Kepler&quot;, &quot;Add a LEO satellite&quot;
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
                <p className="text-xs mt-2 opacity-80">Sent {m.actions.length} simulator action(s)</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-2 text-sm" style={{ background: "var(--bg-surface)" }}>
              <span className="animate-pulse">Thinking...</span>
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
          placeholder="Ask AstroBot..."
          className="flex-1 rounded-lg px-4 py-2 text-sm border-2"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
          style={{ background: "var(--accent-cyan)", color: "#0f172a" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
