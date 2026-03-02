import { useEffect, useState } from "react";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const DOC_URL = "/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md";

const katexOverrides = `
  .research-doc .katex { font-size: 1.1em; }
  .research-doc .katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.75rem 0; }
  .research-doc .katex .mord { color: var(--text-primary) !important; }
  .research-doc .katex .mop { color: var(--accent-cyan) !important; }
  .research-doc .katex .mbin { color: var(--text-secondary) !important; }
  .research-doc .katex .mopen, .research-doc .katex .mclose { color: var(--text-secondary) !important; }
`;

export function ResearchDocViewer() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(DOC_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("Failed to load"))))
      .then(setContent)
      .catch(() => setError("Could not load the research document."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[var(--accent-cyan)] border-t-transparent" />
          <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>Loading research document…</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-red-400 mb-6">{error || "Document not found."}</p>
        <Link href="/research">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Research Hub</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="research-page">
      <style>{katexOverrides}</style>

      {/* Hero */}
      <header
        className="relative overflow-hidden rounded-2xl mb-10 px-6 py-10 md:px-10 md:py-14"
        style={{
          background: "linear-gradient(135deg, rgba(0,217,255,0.12) 0%, rgba(251,191,36,0.08) 50%, rgba(0,217,255,0.06) 100%)",
          border: "1px solid rgba(0,217,255,0.25)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 50%, rgba(0,217,255,0.15) 0%, transparent 50%)" }} />
        <div className="relative">
          <nav className="mb-6 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            <Link href="/"><a className="hover:text-[var(--accent-cyan)] transition">Home</a></Link>
            <span className="mx-2">/</span>
            <Link href="/research"><a className="hover:text-[var(--accent-cyan)] transition">Research</a></Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--accent-cyan)" }}>Embodied AGI</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-cyan)" }}>
            PhD-Level Research
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
            Embodied AGI for Multi-Gravity Space
          </h1>
          <p className="text-base md:text-lg max-w-2xl mb-6" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            A physics-grounded architecture for humanoid intelligence beyond Earth — Moon, Mars, and zero-G.
          </p>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>Version 1.0</span>
            <span>•</span>
            <span>February 2026</span>
            <span>•</span>
            <span>~10,000 words</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article
        className="research-doc max-w-3xl mx-auto"
        style={{ fontFeatureSettings: '"kern" 1, "liga" 1' }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl md:text-3xl font-bold mt-14 mb-6 first:mt-0 scroll-mt-24" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2
                className="text-xl md:text-2xl font-bold mt-14 mb-5 pb-3 scroll-mt-24"
                style={{
                  color: "var(--accent-cyan)",
                  borderBottom: "2px solid rgba(0,217,255,0.3)",
                  letterSpacing: "-0.01em",
                }}
              >
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-bold mt-10 mb-3 scroll-mt-24" style={{ color: "var(--text-primary)" }}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base md:text-lg font-semibold mt-8 mb-2" style={{ color: "var(--text-primary)" }}>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="my-5 text-[15px] md:text-base" style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="my-5 pl-6 list-disc space-y-2 text-[15px]" style={{ color: "var(--text-primary)", lineHeight: 1.7 }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-5 pl-6 list-decimal space-y-2 text-[15px]" style={{ color: "var(--text-primary)", lineHeight: 1.7 }}>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="pl-1" style={{ color: "var(--text-primary)" }}>
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="italic" style={{ color: "var(--text-secondary)" }}>
                {children}
              </em>
            ),
            blockquote: ({ children }) => (
              <blockquote
                className="my-6 pl-5 py-2 rounded-r-lg"
                style={{
                  borderLeft: "4px solid var(--accent-cyan)",
                  background: "rgba(0,217,255,0.06)",
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}
              >
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className="my-10" style={{ borderColor: "var(--border-color)", opacity: 0.6 }} />
            ),
            table: ({ children }) => (
              <div
                className="my-8 overflow-x-auto rounded-xl overflow-hidden"
                style={{
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                <table className="w-full text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead style={{ background: "linear-gradient(180deg, rgba(0,217,255,0.15) 0%, rgba(0,217,255,0.08) 100%)" }}>
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-5 py-4 text-left font-semibold text-sm" style={{ color: "var(--accent-cyan)" }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td
                className="px-5 py-3.5 border-t text-[14px]"
                style={{ borderColor: "var(--border-color)", color: "var(--text-primary)", lineHeight: 1.6 }}
              >
                {children}
              </td>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-black/5 transition-colors">{children}</tr>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:no-underline font-medium transition"
                style={{ color: "var(--accent-cyan)" }}
              >
                {children}
              </a>
            ),
            code: ({ className, children, ...props }) => {
              const isBlock = className?.includes("language-");
              if (isBlock) {
                return (
                  <pre
                    className="my-6 p-5 rounded-xl overflow-x-auto text-[13px] leading-relaxed"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <code {...props}>{children}</code>
                  </pre>
                );
              }
              return (
                <code
                  className="px-2 py-0.5 rounded-md text-[13px] font-medium"
                  style={{ background: "rgba(0,217,255,0.12)", color: "var(--accent-cyan)" }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            div: ({ className, children, ...props }) => {
              if (className?.includes("math-display")) {
                return (
                  <div
                    className="my-6 overflow-x-auto py-4 px-3 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.03)", border: "1px solid var(--border-color)" }}
                    {...props}
                  >
                    {children}
                  </div>
                );
              }
              return <div {...props}>{children}</div>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Footer */}
      <footer
        className="mt-20 pt-10 pb-16 text-center"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Independent research for the future of space exploration.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/research">
            <a
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90"
              style={{ background: "var(--accent-cyan)", color: "var(--text-on-accent)" }}
            >
              ← Research Hub
            </a>
          </Link>
          <Link href="/research/space-agi-lab">
            <a
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition border-2"
              style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
            >
              Space-AGI Lab →
            </a>
          </Link>
        </div>
      </footer>
    </div>
  );
}
