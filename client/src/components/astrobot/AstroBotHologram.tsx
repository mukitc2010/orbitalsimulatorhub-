import { useEffect, useState } from "react";

export function AstroBotHologram() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <section className="astrobot-hologram rounded-3xl border p-6 md:p-8 overflow-hidden relative">
      <div className="astrobot-hologram-grid" aria-hidden="true" />
      <div className="relative z-10 grid gap-6 md:grid-cols-[auto_1fr] items-center">
        <div className="astrobot-orb" aria-hidden="true">
          <div className="astrobot-orb-core" />
          <span className="astrobot-orbit astrobot-orbit-one" />
          <span className="astrobot-orbit astrobot-orbit-two" />
          <span className="astrobot-orbit astrobot-orbit-three" />
          <span className="astrobot-node astrobot-node-one" />
          <span className="astrobot-node astrobot-node-two" />
          <span className="astrobot-node astrobot-node-three" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--accent-cyan)" }}>Mission intelligence interface</p>
          <h1 className="headline mt-2">AstroBot Holographic Mission Console</h1>
          <p className="subhead max-w-2xl mt-3">
            An educational space assistant for orbital mechanics, spacecraft systems, missions, and research exploration.
          </p>
          <div className="flex flex-wrap gap-2 mt-4 text-xs">
            <span className="rounded-full px-3 py-1 border" style={{ borderColor: "rgba(0,217,255,0.32)", color: "var(--text-primary)", background: "rgba(0,217,255,0.08)" }}>
              {online ? "● System link available" : "● Offline mode"}
            </span>
            <span className="rounded-full px-3 py-1 border" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>Calm motion profile</span>
            <span className="rounded-full px-3 py-1 border" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>Cited research encouraged</span>
          </div>
        </div>
      </div>
    </section>
  );
}
