/**
 * Support / Monetization section — Ko-fi, affiliate, AdSense placeholder
 * Add your links in .env: VITE_KOFI_URL, VITE_BMC_URL, VITE_ADSENSE_ID
 * Products: verified available on Amazon.com only
 */
import { Link } from "wouter";
import { NASA_MERCHANDISE, AMAZON_TAG } from "../data/nasaMerchandise";

const FEATURED = NASA_MERCHANDISE.filter(
  (p) => ["0393609391", "0080977472", "B0B92VHTVD", "B08STQBXN5"].includes(p.asin)
);

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

      {/* Books, NASA t-shirts, toys — verified Amazon affiliate */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
          📚 Books • 👕 NASA T-Shirts • 🚀 Toys (verified on Amazon)
        </p>
        <div className="flex flex-wrap gap-2">
          {FEATURED.map((p) => (
            <a
              key={p.asin}
              href={`https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}
            >
              {p.name} →
            </a>
          ))}
          <Link href="/space-shop" className="block px-3 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              See all →
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
