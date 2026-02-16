import { useState, useRef, useEffect } from "react";
import { trpc } from "../trpc";
import { APP_NAME } from "../const";
import { getAstroBotReplyLocal, ASTROBOT_FALLBACK } from "../astrobotKnowledge";

type Message = { 
  role: "user" | "astrobot"; 
  text: string;
  references?: Array<{ title: string; url: string; source: string }>;
};

const WELCOME = `Hey! I'm AstroBot — your NASA sidekick for the ${APP_NAME}. Ask me anything about orbits, the ISS, or why satellites don't fall down. I'll keep it clear and interesting!`;

export function AstroBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "astrobot", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);

    const localReply = getAstroBotReplyLocal(q);
    if (localReply) {
      setMessages((m) => [...m, { 
        role: "astrobot", 
        text: localReply.answer,
        references: localReply.references 
      }]);
      setLoading(false);
      return;
    }

    try {
      const reply = await trpc.astrobot.ask.mutate({ question: q });
      setMessages((m) => [...m, { role: "astrobot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "astrobot", text: ASTROBOT_FALLBACK },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="headline flex items-center justify-center gap-2">
          <span className="text-3xl" aria-hidden>🤖</span>
          Ask AstroBot
        </h1>
        <p className="subhead mt-1">
          Your NASA learning assistant — orbits, satellites, LEO, MEO, GEO & space science
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
          Ask anything; every answer is explained so you can understand. For hands-on learning, try the Simulator or the Formulas page.
        </p>
      </div>

      <div className="card-blueprint rounded-xl bg-white/95 overflow-hidden flex flex-col min-h-[320px] max-h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === "user"
                    ? "bg-[var(--accent-cyan)] text-black"
                    : "bg-gray-100 text-gray-900 border border-gray-200"
                }`}
              >
                {msg.role === "astrobot" && (
                  <span className="text-lg mr-1" aria-hidden>🛰️</span>
                )}
                <span className="whitespace-pre-wrap">{msg.text}</span>
                {msg.role === "astrobot" && msg.references && msg.references.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <p className="text-xs font-semibold text-gray-600 mb-2">📚 Sources & References:</p>
                    <div className="space-y-1">
                      {msg.references.map((ref, idx) => (
                        <a
                          key={idx}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          • {ref.title} <span className="text-gray-500">({ref.source})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2.5 border border-gray-200 text-gray-500">
                AstroBot is thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t border-[var(--accent-cyan)]/30 bg-white/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about orbits, LEO, MEO, GEO, satellites, ISS..."
              className="flex-1 rounded-xl border-2 border-[var(--accent-cyan)]/50 px-4 py-2.5 text-base focus:outline-none focus:border-[var(--accent-cyan)]"
              disabled={loading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-[var(--accent-cyan)] text-black font-bold px-5 py-2.5 hover:opacity-90 disabled:opacity-50 transition"
            >
              Send 🚀
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-3">
        Try: &quot;Why don&apos;t satellites fall?&quot; · &quot;What is LEO?&quot; · &quot;How do rockets fly?&quot; · &quot;What is the ISS?&quot;
      </p>
    </div>
  );
}
