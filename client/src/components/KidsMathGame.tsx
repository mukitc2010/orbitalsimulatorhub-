import { useState } from "react";

const MU = 398600; // km³/s² (Earth's gravitational parameter)

type TopicId = "period" | "speed" | "gravity";

interface Problem {
  id: TopicId;
  title: string;
  question: string;
  hint?: string;
  /** Correct answer (string to allow "4" or "90") */
  correct: string;
  /** Accept alternative correct answers (e.g. "7.7" and "8") */
  alsoCorrect?: string[];
  unit?: string;
  explanation: string;
  formula?: string;
  simple?: string;
}

const PROBLEMS: Problem[] = [
  {
    id: "period",
    title: "Orbital period",
    question: "The ISS orbits about 400 km above Earth. Earth's radius is 6371 km, so the orbit radius a ≈ 6771 km. Using the formula T (min) ≈ 0.0019 × a^1.5, what is the orbital period in minutes? (Round to the nearest 10.)",
    hint: "Compute 6771^1.5 then multiply by 0.0019. Use a calculator if needed.",
    correct: "106",
    alsoCorrect: ["90", "100", "110", "105", "107"],
    unit: "min",
    formula: "T = 2π√(a³/μ). So T (minutes) ≈ 0.0019 × a^1.5 when a is in km.",
    explanation: "The orbital period is how long the satellite takes to complete one full orbit. The formula T = 2π√(a³/μ) shows that the larger the orbit radius a, the longer the period. So higher satellites (e.g. GEO) take much longer than low ones (LEO).",
    simple: "Higher orbit → longer time for one lap. The ISS at ~400 km takes about 90–106 minutes; a GEO satellite at ~36,000 km takes about 24 hours.",
  },
  {
    id: "speed",
    title: "Orbital speed",
    question: "At 400 km altitude, the distance from Earth's center is r = 6771 km. Orbital speed is v = √(μ/r) with μ ≈ 398,600. What is v in km/s? (Round to one decimal, e.g. 7.7)",
    hint: "v = √(398600 / 6771). Use a calculator.",
    correct: "7.7",
    alsoCorrect: ["7.67", "7.6", "8", "7"],
    unit: "km/s",
    formula: "v = √(μ/r). Here μ ≈ 398,600 km³/s² and r = 6771 km.",
    explanation: "Orbital speed is the velocity needed to stay in a circular orbit at that distance. The formula v = √(μ/r) shows that the closer you are to Earth (smaller r), the faster you must go. So the ISS at 400 km travels at about 7.7 km/s.",
    simple: "Closer to Earth → faster orbit. LEO satellites move at several km/s; geostationary satellites farther out move more slowly.",
  },
  {
    id: "gravity",
    title: "Gravity and distance",
    question: "Newton's law of gravity says F = G×m₁×m₂ / r². If a satellite moves from distance r to distance 2r from Earth's center, the gravitational force becomes how many times smaller?",
    hint: "When r doubles, r² becomes 4 times larger, so F is divided by 4.",
    correct: "4",
    alsoCorrect: ["1/4", "¼"],
    formula: "F ∝ 1/r². So if r → 2r, then r² → 4r², and F → F/4.",
    explanation: "Gravity follows an inverse-square law: force is proportional to 1/r². So when you double the distance (r → 2r), r² becomes 4 times larger, which means the force becomes one-fourth as strong. That's why astronauts in orbit feel weightless: they're in free fall, not because gravity is zero.",
    simple: "Doubling the distance makes gravity 4 times weaker. Tripling the distance would make it 9 times weaker (3² = 9).",
  },
];

/** One more: period comparison */
const PERIOD_COMPARE: Problem = {
  id: "period",
  title: "Comparing orbits",
  question: "Satellite A orbits at radius 6771 km (like ISS). Satellite B orbits at radius 20,200 km (like GPS). Using T ∝ a^1.5, roughly how many times longer is B's orbital period than A's? (Compute (20200/6771)^1.5 and round to a whole number.)",
  hint: "(20200/6771)^1.5 ≈ 2.98^1.5 ≈ 5.2, so about 5 times.",
  correct: "5",
  alsoCorrect: ["5.2", "6", "4"],
  formula: "T ∝ a^1.5, so T_B/T_A = (a_B/a_A)^1.5.",
  explanation: "Orbital period scales with a^1.5. So the ratio of periods is (a_B/a_A)^1.5. A GPS satellite orbits much higher than the ISS, so its period is about 12 hours (roughly 5× the ISS's ~90 min).",
  simple: "Higher orbit → longer period. GPS satellites take about 12 hours per orbit; the ISS takes about 90 minutes.",
};

const ALL_PROBLEMS = [...PROBLEMS, PERIOD_COMPARE];

function randomProblem(): Problem {
  return ALL_PROBLEMS[Math.floor(Math.random() * ALL_PROBLEMS.length)];
}

function normalizeAnswer(s: string): string {
  return s.replace(/\s/g, "").replace(/,/g, ".").toLowerCase();
}

function isCorrect(problem: Problem, user: string): boolean {
  const n = normalizeAnswer(user);
  if (n === normalizeAnswer(problem.correct)) return true;
  for (const alt of problem.alsoCorrect || []) {
    if (n === normalizeAnswer(alt)) return true;
  }
  const num = parseFloat(n);
  const correctNum = parseFloat(problem.correct);
  if (!Number.isNaN(num) && !Number.isNaN(correctNum) && Math.abs(num - correctNum) < 0.5) return true;
  return false;
}

export function KidsMathGame() {
  const [problem, setProblem] = useState<Problem>(() => randomProblem());
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const check = () => {
    if (!answer.trim()) {
      setResult("wrong");
      return;
    }
    setResult(isCorrect(problem, answer) ? "correct" : "wrong");
  };

  const next = () => {
    setProblem(randomProblem());
    setAnswer("");
    setResult(null);
  };

  return (
    <div className="card-blueprint rounded-2xl overflow-hidden bg-white border-2 border-[var(--accent-pink)]/40">
      <div className="bg-[var(--accent-pink)]/15 px-4 py-4 border-b-2 border-[var(--accent-pink)]">
        <h2 className="font-black text-xl text-slate-800">🔢 Space Math</h2>
        <p className="text-sm text-slate-600 mt-0.5">Orbital and gravity math — with explanations so you understand the answer.</p>
        <p className="text-xs text-slate-500 mt-2">Solve the problem, then read the explanation below to see why it works.</p>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <span className="text-xs font-medium text-[var(--accent-pink)] uppercase tracking-wide">{problem.title}</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left">
          <p className="text-slate-800 font-medium mb-2">{problem.question}</p>
          {problem.hint && (
            <p className="text-xs text-slate-500 mb-3 italic">Hint: {problem.hint}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder={problem.unit ? `Answer in ${problem.unit}` : "Your answer"}
              className="flex-1 min-w-[120px] text-center text-lg border-2 border-slate-300 rounded-xl px-3 py-2.5 font-mono focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/30"
              aria-label="Your answer"
            />
            {problem.unit && <span className="text-sm text-slate-500">{problem.unit}</span>}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={check}
              className="px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90 transition"
            >
              Check
            </button>
            <button
              type="button"
              onClick={next}
              className="px-5 py-2.5 rounded-xl font-medium border-2 border-slate-300 bg-white hover:bg-slate-50 transition"
            >
              New problem
            </button>
          </div>
        </div>

        {(result === "correct" || result === "wrong") && (
          <div className={`mt-4 rounded-xl p-4 text-left border-2 ${result === "correct" ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
            <p className={`font-bold mb-3 ${result === "correct" ? "text-green-800" : "text-amber-800"}`}>
              {result === "correct" ? "🎉 Correct!" : "Not quite."} {result === "wrong" && `The answer is ${problem.correct}${problem.unit ? ` ${problem.unit}` : ""}.`}
            </p>
            <p className="text-sm font-semibold text-slate-700 mb-1">Why this answer?</p>
            {problem.formula && (
              <p className="text-xs font-mono bg-white/80 rounded px-2 py-1.5 mb-2 text-slate-700 border border-slate-200">
                {problem.formula}
              </p>
            )}
            <p className="text-sm text-slate-700 mb-2">{problem.explanation}</p>
            {problem.simple && (
              <p className="text-sm text-slate-600 border-l-4 border-[var(--accent-cyan)] pl-3">
                <strong>In simple terms:</strong> {problem.simple}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
