import { useState } from "react";
import { Link } from "wouter";

const PHYSICS_CARDS = [
  {
    title: "1st Law — Inertia",
    short: "Things keep doing what they're doing until a force changes it.",
    emoji: "🛸",
  },
  {
    title: "2nd Law — F = ma",
    short: "Force = mass × acceleration. Bigger push or smaller mass = more zoom!",
    emoji: "⚡",
  },
  {
    title: "3rd Law — Action & Reaction",
    short: "When you push something, it pushes back. Rockets push gas back so the gas pushes the rocket forward!",
    emoji: "🔄",
  },
];

export function PhysicsPlay() {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="card-blueprint rounded-2xl overflow-hidden bg-white">
      <div className="bg-[var(--accent-gold)]/40 px-4 py-3 border-b-2 border-[var(--accent-gold)]">
        <h2 className="font-black text-xl text-black">⚡ Physics Play</h2>
        <p className="text-sm text-gray-700">Newton's laws — why things move the way they do!</p>
      </div>
      <div className="p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {PHYSICS_CARDS.map((card, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPicked(picked === i ? null : i)}
              className="p-4 rounded-xl border-2 border-[var(--accent-gold)]/60 bg-white hover:border-[var(--accent-gold)] hover:shadow transition text-left"
            >
              <span className="text-3xl block mb-2">{card.emoji}</span>
              <h3 className="font-bold text-black">{card.title}</h3>
              {picked === i && <p className="mt-2 text-sm text-gray-700">{card.short}</p>}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Want to play with numbers?{" "}
          <Link href="/learn/formulas" className="text-[var(--accent-cyan)] font-medium hover:underline">
            Try the Formulas Playground →
          </Link>
        </p>
      </div>
    </div>
  );
}
