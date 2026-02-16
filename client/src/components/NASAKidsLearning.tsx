const ACTIVITIES = [
  {
    title: "Count the planets",
    desc: "Our Solar System has 8 planets. Can you name them? Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune!",
  },
  {
    title: "Space math",
    desc: "The ISS travels about 7.7 km every second. How far does it go in 10 seconds? (77 km!)",
  },
  {
    title: "Amazing missions",
    desc: "NASA has sent robots to Mars, landed people on the Moon, and sent spacecraft past Pluto. What would you like to explore?",
  },
  {
    title: "Space jobs",
    desc: "Astronauts, engineers, scientists, and programmers all help us learn about space. You could be one too!",
  },
];

export function NASAKidsLearning() {
  return (
    <div className="card-blueprint-pink rounded-lg p-6">
      <h2 className="font-bold text-lg font-mono-tech mb-2">NASA Learning Activities</h2>
      <p className="subhead text-sm mb-4">Short activities to explore space and NASA.</p>
      <ul className="space-y-4">
        {ACTIVITIES.map((a, i) => (
          <li key={i} className="border-l-4 border-[var(--accent-pink)] pl-4">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-700">{a.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
