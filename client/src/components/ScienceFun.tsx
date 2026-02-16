import { useState } from "react";

const SCIENCE_ITEMS = [
  {
    q: "Why is the sky blue?",
    a: "Sunlight is all colours. Air scatters blue light more than red, so we see blue when we look up!",
    emoji: "🌤️",
  },
  {
    q: "Why do we have day and night?",
    a: "Earth spins once every 24 hours. The part facing the Sun has day; the part in shadow has night.",
    emoji: "🌍",
  },
  {
    q: "How do rockets fly?",
    a: "They push gas out the back really fast. Newton's 3rd law: the gas pushes the rocket forward!",
    emoji: "🚀",
  },
  {
    q: "What are the Moon's phases?",
    a: "We see different shapes (new, crescent, half, full) because we see different amounts of the lit side as the Moon orbits Earth.",
    emoji: "🌙",
  },
  {
    q: "Why do astronauts float?",
    a: "They're in free fall around Earth — falling but moving so fast they keep missing the ground. That's orbit!",
    emoji: "👩‍🚀",
  },
  {
    q: "What is gravity?",
    a: "A pull between things that have mass. Earth's gravity keeps us on the ground and keeps the Moon going around us!",
    emoji: "🪐",
  },
];

export function ScienceFun() {
  const [show, setShow] = useState<number | null>(null);

  return (
    <div className="card-blueprint rounded-2xl overflow-hidden bg-white">
      <div className="bg-[var(--accent-cyan)]/30 px-4 py-3 border-b-2 border-[var(--accent-cyan)]">
        <h2 className="font-black text-xl text-black">🔬 Science Fun</h2>
        <p className="text-sm text-gray-700">Tap a question to see the answer!</p>
      </div>
      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {SCIENCE_ITEMS.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setShow(show === i ? null : i)}
              className="text-left p-4 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white hover:border-[var(--accent-cyan)] hover:shadow transition"
            >
              <span className="text-2xl mr-2">{item.emoji}</span>
              <h3 className="font-bold text-black inline">{item.q}</h3>
              {show === i && (
                <p className="mt-3 text-sm text-gray-700 pl-8 border-l-4 border-[var(--accent-cyan)]">
                  {item.a}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
