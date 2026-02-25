import { Link } from "wouter";
import {
  AMAZON_TAG,
  NASA_MERCHANDISE,
  MERCHANDISE_CATEGORIES,
} from "../data/nasaMerchandise";

export function SpaceShop() {
  const byCategory = MERCHANDISE_CATEGORIES.map((cat) => ({
    ...cat,
    items: NASA_MERCHANDISE.filter((p) => p.category === cat.id),
  })).filter((c) => c.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="headline mb-2">Space Shop</h1>
      <p className="text-[var(--text-secondary)] mb-6">
        Verified Amazon products: space books, NASA t-shirts, toys, and accessories. Purchases support OrbitalSimulatorHub at no extra cost to you.
      </p>

      <div className="space-y-8">
        {byCategory.map((cat) => (
          <section
            key={cat.id}
            className="rounded-xl border-2 p-4"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>
              {cat.emoji} {cat.label}
            </h2>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item.asin}>
                  <a
                    href={`https://www.amazon.com/dp/${item.asin}?tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block py-2 px-3 rounded-lg transition hover:opacity-90"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.desc && (
                      <span className="text-sm ml-2" style={{ color: "var(--text-muted)" }}>
                        — {item.desc}
                      </span>
                    )}
                    <span className="ml-2" style={{ color: "var(--accent-cyan)" }}>
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
        As an Amazon Associate we earn from qualifying purchases. All products verified available on Amazon.com.
      </p>

      <div className="mt-6 flex gap-4">
        <Link href="/blog">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Blog</a>
        </Link>
        <Link href="/">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Home</a>
        </Link>
      </div>
    </div>
  );
}
