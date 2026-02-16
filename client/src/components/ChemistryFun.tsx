import { useState } from "react";

const CHEM_ITEMS = [
  {
    title: "What is air made of?",
    fact: "Mostly nitrogen (about 78%) and oxygen (about 21%). We breathe oxygen! The rest is tiny amounts of other gases like carbon dioxide.",
    emoji: "💨",
  },
  {
    title: "What is water?",
    fact: "Water is H₂O — two hydrogen atoms and one oxygen atom. It can be ice (solid), liquid, or steam (gas) depending on temperature!",
    emoji: "💧",
  },
  {
    title: "Fire in space?",
    fact: "Flames behave differently in space — they can be round instead of teardrop because there's no gravity to pull the hot air up. Astronauts study fire to stay safe.",
    emoji: "🔥",
  },
  {
    title: "What are stars made of?",
    fact: "Mostly hydrogen and helium. Stars are like huge factories: they smash atoms together and make light and heat. Our Sun is a star!",
    emoji: "⭐",
  },
  {
    title: "Water on Mars?",
    fact: "Scientists found ice and signs of old rivers on Mars. Maybe long ago Mars had liquid water. That's why we send rovers to look for clues!",
    emoji: "🔴",
  },
  {
    title: "What's in rocket fuel?",
    fact: "Rockets use different fuels. Some burn liquid hydrogen and oxygen (like the Space Shuttle). When they combine, they make water and a lot of energy to lift the rocket!",
    emoji: "🚀",
  },
];

export function ChemistryFun() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="card-blueprint-pink rounded-2xl overflow-hidden bg-white">
      <div className="bg-[var(--accent-pink)]/20 px-4 py-3 border-b-2 border-[var(--accent-pink)]">
        <h2 className="font-black text-xl text-black">🧪 Chemistry Corner</h2>
        <p className="text-sm text-gray-700">Atoms, molecules, and cool stuff in space and on Earth!</p>
      </div>
      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {CHEM_ITEMS.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="text-left p-4 rounded-xl border-2 border-[var(--accent-pink)]/50 bg-white hover:border-[var(--accent-pink)] hover:shadow transition"
            >
              <span className="text-2xl mr-2">{item.emoji}</span>
              <h3 className="font-bold text-black inline">{item.title}</h3>
              {open === i && (
                <p className="mt-3 text-sm text-gray-700 pl-10 border-l-4 border-[var(--accent-pink)]">
                  {item.fact}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
