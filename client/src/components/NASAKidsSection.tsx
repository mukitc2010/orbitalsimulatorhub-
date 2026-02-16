import { useState } from "react";

const NASA_CARDS = [
  {
    title: "🪐 Our Solar System",
    fact: "We have 8 planets. The order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. My Very Easy Method Just Speeds Up Naming!",
  },
  {
    title: "🚀 NASA Missions",
    fact: "NASA sent people to the Moon (Apollo), rovers to Mars (Curiosity, Perseverance), and spacecraft to Jupiter and Saturn. The James Webb telescope looks at the oldest light in the universe!",
  },
  {
    title: "👩‍🚀 Astronauts",
    fact: "Astronauts live on the International Space Station (ISS) for months. They float because they're in free fall around Earth — like being in a lift that never stops!",
  },
  {
    title: "🛸 Rovers on Mars",
    fact: "Robots like Perseverance drive on Mars, take pictures, and even collect rocks. Scientists on Earth control them and look for signs of ancient life.",
  },
  {
    title: "🌙 The Moon",
    fact: "The Moon is about 384,400 km away. It doesn't make its own light — it reflects the Sun's light. That's why we see different shapes (phases) as it orbits Earth.",
  },
  {
    title: "⭐ Stars & Galaxies",
    fact: "Our Sun is one star. There are billions of stars in our galaxy (the Milky Way), and billions of galaxies in the universe. Space is huge!",
  },
];

export function NASAKidsSection() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="card-blueprint-pink rounded-2xl overflow-hidden bg-white">
      <div className="bg-[var(--accent-gold)] px-4 py-3">
        <h2 className="font-black text-xl text-black">🌟 Learn NASA</h2>
        <p className="text-sm text-black/80">Click a card to learn about NASA missions and space.</p>
      </div>
      <div className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NASA_CARDS.map((card, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFlipped(flipped === i ? null : i)}
              className="text-left p-4 rounded-xl border-2 border-[var(--accent-pink)]/50 bg-white hover:border-[var(--accent-pink)] hover:shadow-md transition"
            >
              <h3 className="font-bold text-black mb-2">{card.title}</h3>
              <p className={`text-sm text-gray-700 ${flipped === i ? "" : "line-clamp-2"}`}>
                {card.fact}
              </p>
              {flipped === i && (
                <span className="text-xs text-[var(--accent-pink)] mt-2 inline-block">Tap again to fold</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
