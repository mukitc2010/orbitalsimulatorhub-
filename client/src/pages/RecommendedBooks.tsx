import { Link } from "wouter";
import {
  AMAZON_TAG,
  AFFILIATE_BOOKS_BY_CATEGORY,
  CATEGORY_LABELS,
} from "../data/affiliateBooks";

export function RecommendedBooks() {
  const categories = Object.entries(AFFILIATE_BOOKS_BY_CATEGORY);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="headline mb-2">Recommended Books</h1>
      <p className="text-[var(--text-secondary)] mb-6">
        Curated space, aerospace, and physics books for students and enthusiasts. Purchases through these links support OrbitalSimulatorHub at no extra cost to you.
      </p>

      <div className="space-y-8">
        {categories.map(([catId, books]) => (
          <section
            key={catId}
            className="rounded-xl border-2 p-4"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>
              {CATEGORY_LABELS[catId] || catId}
            </h2>
            <ul className="space-y-2">
              {books.map((b) => (
                <li key={b.asin}>
                  <a
                    href={`https://www.amazon.com/dp/${b.asin}?tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block py-2 px-3 rounded-lg transition hover:opacity-90"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="font-medium">{b.name}</span>
                    {b.desc && (
                      <span className="text-sm ml-2" style={{ color: "var(--text-muted)" }}>
                        — {b.desc}
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
        As an Amazon Associate we earn from qualifying purchases. All books verified available on Amazon.com.
      </p>

      <div className="mt-6 flex gap-4">
        <Link href="/space-shop" className="text-[var(--accent-cyan)] hover:underline font-medium">NASA T-Shirts & Toys →</Link>
        <Link href="/blog" className="text-[var(--accent-cyan)] hover:underline font-medium">
            ← Back to Blog
          </Link>
      </div>
    </div>
  );
}
