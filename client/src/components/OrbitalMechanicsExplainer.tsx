const LAWS = [
  {
    title: "1st Law — Inertia",
    formula: "Objects at rest stay at rest; objects in motion stay in motion unless a force acts on them.",
    explanation: "A satellite in space keeps moving in a straight line at constant speed until gravity bends its path into an orbit.",
    emoji: "🛸",
  },
  {
    title: "2nd Law — F = ma",
    formula: "Force = mass × acceleration",
    explanation: "The stronger the force (like Earth's gravity), the more the satellite's path curves. Bigger mass needs more force for the same acceleration.",
    emoji: "⚡",
  },
  {
    title: "3rd Law — Action & Reaction",
    formula: "For every action there is an equal and opposite reaction.",
    explanation: "Earth pulls on the satellite; the satellite pulls back on Earth. That's why we say the satellite orbits Earth — but really they both orbit their common center of mass (very close to Earth's center).",
    emoji: "🔄",
  },
];

export function OrbitalMechanicsExplainer() {
  return (
    <div className="space-y-6">
      {LAWS.map((law, i) => (
        <article
          key={law.title}
          className="card-blueprint rounded-lg p-6"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl" aria-hidden>{law.emoji}</span>
            <div>
              <h2 className="font-bold text-xl font-mono-tech text-black mb-2">
                {law.title}
              </h2>
              <p className="font-mono-tech text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded">
                {law.formula}
              </p>
              <p className="text-gray-700">{law.explanation}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
