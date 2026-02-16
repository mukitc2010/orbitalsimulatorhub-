import { Link } from "wouter";
import { useState } from "react";

interface Experiment {
  title: string;
  emoji: string;
  objective: string;
  materials: string[];
  steps: string[];
  explanation: string;
  tryThis?: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    title: "Ball on String Orbit",
    emoji: "🎾",
    objective: "Demonstrate how centripetal force keeps objects in orbit",
    materials: ["String (about 1 meter)", "Small ball or weight", "Your hand"],
    steps: [
      "Tie the ball to one end of the string",
      "Hold the other end of the string",
      "Swing the ball in a circle above your head",
      "Notice how the ball stays in a circular path",
      "Try slowing down - the ball falls inward",
      "Try speeding up - the ball pulls outward"
    ],
    explanation: "When you swing the ball, you're pulling it inward (like gravity). The ball wants to fly away in a straight line (like a satellite's speed), but your pull keeps it going in a circle. This is exactly how satellites orbit Earth - gravity pulls them inward while their speed keeps them moving forward!",
    tryThis: "Try swinging faster and slower. Notice how the orbit changes - just like satellites at different altitudes!"
  },
  {
    title: "Drop vs Throw",
    emoji: "⚽",
    objective: "Show how horizontal velocity affects falling objects",
    materials: ["Two identical balls (or two coins)", "A table or elevated surface"],
    steps: [
      "Hold one ball in each hand",
      "Drop one ball straight down",
      "At the same time, throw the other ball horizontally",
      "Watch which one hits the ground first",
      "Notice: They hit at the same time!",
      "But the thrown ball travels much farther horizontally"
    ],
    explanation: "Both balls fall at the same rate due to gravity. But the thrown ball has horizontal velocity, so it travels forward while falling. If you could throw it fast enough (about 7.8 km/s!), it would fall around the curve of Earth and never hit the ground - that's an orbit! This is why satellites need high horizontal speed to stay in orbit.",
    tryThis: "Try throwing the ball at different speeds. The faster you throw, the farther it goes before hitting the ground."
  },
  {
    title: "Paper Rocket",
    emoji: "🚀",
    objective: "Demonstrate Newton's Third Law of Motion",
    materials: ["Paper", "Straw", "Scissors", "Tape"],
    steps: [
      "Roll a piece of paper into a tube (rocket body)",
      "Tape it closed",
      "Make a cone shape for the nose",
      "Tape the nose to the rocket body",
      "Blow through the straw to launch",
      "Watch it fly!"
    ],
    explanation: "When you blow air out of the straw, the air pushes backward. According to Newton's Third Law, the rocket pushes forward! Real rockets work the same way - they push hot gas backward, and the rocket moves forward. The faster the gas goes out, the more thrust the rocket gets.",
    tryThis: "Try different sizes of rockets. Make fins for stability. See how far you can make it fly!"
  },
  {
    title: "Gravity Well",
    emoji: "🌌",
    objective: "Visualize how gravity curves space",
    materials: ["Stretchy fabric (like spandex)", "Heavy ball (like a bowling ball)", "Small marbles"],
    steps: [
      "Stretch the fabric tightly over a frame or between chairs",
      "Place the heavy ball in the center",
      "Notice how it creates a 'well' in the fabric",
      "Roll a marble near the edge",
      "Watch it spiral toward the heavy ball",
      "Try rolling it faster - it might orbit!"
    ],
    explanation: "The heavy ball curves the fabric, just like massive objects curve space-time. The marble follows the curve - this is how gravity works! Satellites orbit Earth because Earth curves space-time, and the satellites follow that curve. This is Einstein's theory of general relativity in action!",
    tryThis: "Try different speeds for the marble. At the right speed, it will orbit the heavy ball - just like satellites orbit Earth!"
  },
  {
    title: "Pendulum Period",
    emoji: "⏱️",
    objective: "Understand how period relates to distance",
    materials: ["String", "Weight (like a washer or key)", "Stopwatch or phone timer"],
    steps: [
      "Tie the weight to the string",
      "Hold the string and let the weight hang",
      "Measure the length of the string",
      "Swing the pendulum and time how long one swing takes",
      "Try different string lengths",
      "Notice: Longer string = longer period!"
    ],
    explanation: "The period (time for one swing) depends on the length of the string. Longer string = longer period. This is similar to orbital period - satellites farther from Earth take longer to orbit! The ISS (close to Earth) orbits in 90 minutes, while the Moon (far away) takes 27 days. The formula is similar: T = 2π√(L/g) for pendulums, and T = 2π√(a³/μ) for orbits!",
    tryThis: "Measure periods for different lengths. See if you can predict the period for a new length!"
  }
];

export function SpaceExperiments() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Space Experiments</h1>
        <p className="subhead">
          Hands-on experiments to understand orbital mechanics, gravity, and space physics. Perfect for kids, students, and curious minds!
        </p>
        <p className="text-sm text-slate-600 mt-2">
          These simple experiments use everyday materials to demonstrate the same physics NASA uses for satellites and rockets. Try them at home or in the classroom!
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">🔬 Why Do Experiments?</h2>
        <p className="text-sm text-slate-700">
          Seeing physics in action helps you understand it better than just reading about it. These experiments show real orbital mechanics principles using simple materials. After each experiment, try the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline font-medium">3D Simulator</Link> to see the same concepts in space!
        </p>
      </div>

      <div className="space-y-6">
        {EXPERIMENTS.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full text-left p-5 hover:bg-slate-50 transition"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{exp.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-1">{exp.title}</h2>
                  <p className="text-sm text-slate-600 mb-2">{exp.objective}</p>
                  <span className="text-xs text-[var(--accent-cyan)] font-medium">
                    {expanded === idx ? "Click to collapse" : "Click to expand →"}
                  </span>
                </div>
              </div>
            </button>

            {expanded === idx && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-200 space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-bold text-slate-800 mb-2 text-sm">📦 Materials Needed:</h3>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    {exp.materials.map((material, i) => (
                      <li key={i}>{material}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 mb-2 text-sm">📋 Steps:</h3>
                  <ol className="list-decimal list-inside text-sm text-slate-700 space-y-2">
                    {exp.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-slate-800 mb-2 text-sm">💡 What's Happening?</h3>
                  <p className="text-sm text-slate-700">{exp.explanation}</p>
                </div>

                {exp.tryThis && (
                  <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
                    <h3 className="font-bold text-slate-800 mb-2 text-sm">🎯 Try This:</h3>
                    <p className="text-sm text-slate-700">{exp.tryThis}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[var(--accent-cyan)] p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Try the Simulator!</h2>
        <p className="text-slate-700 mb-4">
          After doing these experiments, see the same physics in action with real satellites! Add LEO, MEO, and GEO satellites and watch them orbit Earth in 3D.
        </p>
        <Link href="/simulator">
          <a className="inline-block px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90 transition">
            Open 3D Simulator →
          </a>
        </Link>
      </div>

      <div className="text-sm text-slate-600 space-y-2">
        <p><strong>Related Topics:</strong></p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/orbital-mechanics">
            <a className="text-[var(--accent-cyan)] hover:underline">What is Orbital Mechanics?</a>
          </Link>
          <span>·</span>
          <Link href="/learn/newton">
            <a className="text-[var(--accent-cyan)] hover:underline">Newton's Laws</a>
          </Link>
          <span>·</span>
          <Link href="/learn/space-questions">
            <a className="text-[var(--accent-cyan)] hover:underline">Why Don't Satellites Fall?</a>
          </Link>
          <span>·</span>
          <Link href="/formulas-library">
            <a className="text-[var(--accent-cyan)] hover:underline">Space Formulas</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
