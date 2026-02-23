import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How fast does the ISS orbit?",
  "What is LEO vs GEO?",
  "Explain orbital mechanics",
  "How do satellites stay in orbit?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, [open, messages.length]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);
    setError(null);

    const history = [...messages, { role: "user" as const, content: msg }]
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setMessages((m) => [...m, { role: "assistant", content: data.error || "Failed to get a response." }]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply || "" }]);
    } catch {
      setError("Failed to connect. Check your API key in Vercel.");
      setMessages((m) => [...m, { role: "assistant", content: "Could not reach the AI. Add OPENAI_API_KEY in Vercel Environment Variables." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full shadow-lg flex items-center justify-center font-bold text-xl transition-all hover:scale-110"
        style={{
          background: "var(--accent-primary, #00d9ff)",
          color: "#0f172a",
          border: "2px solid var(--border-accent, rgba(0,217,255,0.5))",
        }}
        title="AI Chat — Your platform"
        aria-label="Open AI chat"
      >
        {open ? "✕" : "◆"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[99] w-[min(400px,calc(100vw-3rem))] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: "var(--bg-header)",
            border: "2px solid var(--border-accent)",
            maxHeight: "min(70vh, 500px)",
          }}
        >
          <div
            className="px-4 py-3 font-bold text-sm flex items-center gap-2"
            style={{ borderBottom: "1px solid var(--border-accent)", color: "var(--text-primary)" }}
          >
            <span>◆</span> AI Chat — Your Platform
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]">
            {messages.length === 0 && (
              <div className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                <p>Ask anything about orbits, satellites, ISS, space.</p>
                <p className="text-xs mt-2">Try:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        background: "var(--nav-active-bg)",
                        color: "var(--nav-active-text)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${m.role === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block max-w-[85%] px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                  style={{
                    background:
                      m.role === "user"
                        ? "var(--accent-primary, #00d9ff)"
                        : "var(--nav-active-bg)",
                    color:
                      m.role === "user"
                        ? "#0f172a"
                        : "var(--nav-active-text)",
                  }}
                >
                  <span className="whitespace-pre-wrap">{m.content}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="animate-pulse">Thinking…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div
              className="px-4 py-2 text-xs"
              style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}
            >
              {error}
            </div>
          )}

          <div
            className="p-3 flex gap-2"
            style={{ borderTop: "1px solid var(--border-accent)" }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about orbits, ISS, space…"
              rows={1}
              className="flex-1 resize-none rounded-lg px-3 py-2 text-sm"
              style={{
                background: "var(--bg-header)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-accent)",
              }}
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50"
              style={{
                background: "var(--accent-primary, #00d9ff)",
                color: "#0f172a",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
