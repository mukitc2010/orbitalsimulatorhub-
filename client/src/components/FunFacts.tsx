const FACTS = [
  "The ISS orbits Earth about every 90 minutes — astronauts see 16 sunrises a day!",
  "GPS satellites are in medium Earth orbit (MEO), about 20,200 km high.",
  "Geostationary satellites stay over the same spot on Earth at ~35,786 km — that's how TV and weather satellites work.",
  "Newton's law of gravity works for planets, moons, and apples. Same formula, everywhere.",
  "Escape velocity from Earth is about 11.2 km/s — that's how fast you need to go to leave and never come back.",
  "Orbital speed in low Earth orbit is about 7.8 km/s — roughly 28,000 km/h!",
  "The Moon is slowly moving away from Earth due to tidal forces.",
  "Satellites in LEO experience a tiny bit of atmospheric drag — the ISS occasionally needs a boost.",
  "Three laws of motion plus gravity explain orbits without magic. You're learning the real deal!",
];

export function FunFacts() {
  return (
    <div className="card-blueprint-pink rounded-lg p-6">
      <h2 className="font-bold text-lg font-mono-tech mb-2">🌟 Space trivia — did you know?</h2>
      <p className="text-sm text-slate-600 mb-4">Space is the most amazing classroom. These facts make it even more interesting!</p>
      <ul className="space-y-2 list-disc list-inside text-gray-700">
        {FACTS.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
    </div>
  );
}
