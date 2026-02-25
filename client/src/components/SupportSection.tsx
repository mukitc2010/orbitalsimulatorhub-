/**
 * Support / Monetization section — Ko-fi, affiliate, AdSense placeholder
 * Add your links in .env: VITE_KOFI_URL, VITE_BMC_URL, VITE_ADSENSE_ID
 */
import { Link } from "wouter";
import { AMAZON_TAG } from "../data/affiliateBooks";

const RECOMMENDED_BOOKS = [
  { name: "Astrophysics for People in a Hurry", asin: "0393609391" },
  { name: "Orbital Mechanics for Engineering Students", asin: "B00B9Y4B8M" },
];

export function SupportSection() {
  const kofi = import.meta.env.VITE_KOFI_URL;
  const bmc = import.meta.env.VITE_BMC_URL;
  const adsenseId = import.meta.env.VITE_ADSENSE_ID;

  return (
    <section
      className="rounded-xl border-2 p-4 mb-6"
      style={{
        background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(251,191,36,0.06) 100%)",
        borderColor: "var(--accent-gold)",
      }}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-gold)" }}>
        ☕ Support OrbitalSimulatorHub
      </h3>
      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        Free tools for students & researchers. Your support helps keep the simulator, AstroBot, and space content free.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {kofi && (
          <a
            href={kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{ background: "#FF5E5B", color: "#fff" }}
          >
            Ko-fi
          </a>
        )}
        {bmc && (
          <a
            href={bmc}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{ background: "#FFDD00", color: "#000" }}
          >
            Buy Me a Coffee
          </a>
        )}
        {(!kofi || !bmc) && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Add VITE_KOFI_URL or VITE_BMC_URL in .env to show support links
          </span>
        )}
      </div>

      {/* Recommended books — Amazon affiliate */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
          📚 Recommended for learning (affiliate links)
        </p>
        <div className="flex flex-wrap gap-2">
          {RECOMMENDED_BOOKS.map((b) => (
            <a
              key={b.asin}
              href={`https://www.amazon.com/dp/${b.asin}?tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}
            >
              {b.name} →
            </a>
          ))}
          <Link href="/recommended-books">
            <a
              className="block px-3 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--accent-cyan)", color: "var(--text-on-accent)" }}
            >
              See all books →
            </a>
          </Link>
        </div>
      </div>

      {adsenseId && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adsenseId}
            data-ad-slot="auto"
            data-ad-format="auto"
          />
        </div>
      )}
    </section>
  );
}
