import { Link } from "wouter";

const SECTIONS = [
  {
    title: "What is an orbit?",
    emoji: "🛸",
    body: "An orbit is the path a satellite (or the Moon, or a spacecraft) takes around Earth. Gravity pulls the satellite toward Earth, but the satellite is moving so fast sideways that it keeps \"missing\" Earth and going around and around. That’s why the ISS and other satellites don’t fall down!",
  },
  {
    title: "What you see on the screen",
    emoji: "🌍",
    body: "The blue ball is Earth. The small colored dots are satellites. The line behind each dot is the path it has already traveled (its orbit). Everything is drawn to scale so you can see how high the satellite is compared to Earth’s size. You can drag to rotate the view and scroll to zoom in or out.",
  },
  {
    title: "How to add a satellite",
    emoji: "➕",
    body: "Use the presets first — they’re easiest! Click \"LEO (ISS-like)\", \"MEO (GPS-like)\", or \"GEO (Weather)\" to add a satellite that orbits like real ones. LEO is low and fast (like the International Space Station). MEO is higher (like GPS). GEO is very high and orbits once per day (like TV and weather satellites). You can also use the form to type your own numbers.",
  },
  {
    title: "What the buttons do",
    emoji: "▶️",
    body: "Play: Time moves forward and the satellite moves along its path. Pause: Stop the clock. Step: Move time forward by one step (each step is 1 minute of real time × the speed you chose). Speed (1x, 2x, 4x, 8x): How fast we run the clock. At 8x, one real second = 8 minutes in the simulation.",
  },
  {
    title: "What the numbers mean",
    emoji: "📊",
    body: "Height above Earth: How many kilometers above the ground the satellite is (on average). Time for one lap: How many minutes it takes to go once around Earth (e.g. the ISS takes about 90 minutes). Speed: How fast the satellite is moving in km/s (kilometers per second). Real satellites move at several km/s!",
  },
  {
    title: "Why it’s accurate",
    emoji: "✅",
    body: "The simulator uses the same math that NASA and space agencies use: Newton’s law of gravity and Kepler’s laws of motion. So the orbits, periods, and speeds you see are realistic. The ISS really does orbit in about 90 minutes at about 400 km height, and GPS satellites really are around 20,000 km high!",
  },
];

export function KidsGuide() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="headline mb-2">How to Use the Simulator</h1>
      <p className="subhead mb-4">
        A clear guide to the 3D view, presets, controls, and what the numbers mean.
      </p>
      <p className="text-sm text-slate-600 mb-4 rounded-xl bg-slate-100 px-4 py-3 border border-slate-200">
        <strong>In one sentence:</strong> This guide explains what you see on the screen (Earth, satellites, orbits), how to add a satellite with presets or the form, what the buttons and numbers mean, and why the simulation is accurate.
      </p>
      <p className="text-sm text-slate-600 mb-8 rounded-xl bg-[var(--accent-cyan)]/10 px-4 py-3 border border-[var(--accent-cyan)]/30">
        <strong>In short:</strong> Add a satellite (e.g. LEO) → click Play → drag the view to rotate. Use the form on the right to change orbit height and shape.
      </p>

      <div className="space-y-6">
        {SECTIONS.map((s, i) => (
          <section
            key={i}
            className="card-blueprint rounded-xl p-5 bg-white"
          >
            <h2 className="text-xl font-bold text-black flex items-center gap-2">
              <span>{s.emoji}</span>
              {s.title}
            </h2>
            <p className="text-gray-700 mt-2 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-xl bg-[var(--accent-cyan)]/20 border-2 border-[var(--accent-cyan)] text-center">
        <p className="font-bold text-black mb-2">Ready to try it?</p>
        <Link href="/simulator" className="inline-block px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-black hover:opacity-90">
          Open the Simulator →
        </Link>
      </div>
    </div>
  );
}
