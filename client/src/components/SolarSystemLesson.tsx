import { useEffect, useRef, useState } from "react";
import "./SolarSystemLesson.css";

const planets = [
  { name: "Mercury", color: "#b6b0a6", radius: 9, years: 0.24, kind: "a rocky inner planet" },
  { name: "Venus", color: "#efc17a", radius: 14, years: 0.62, kind: "a rocky inner planet" },
  { name: "Earth", color: "#38bdf8", radius: 15, years: 1, kind: "a rocky inner planet" },
  { name: "Mars", color: "#fb8865", radius: 11, years: 1.88, kind: "a rocky inner planet" },
  { name: "Jupiter", color: "#dfb28b", radius: 28, years: 11.86, kind: "a gas giant" },
  { name: "Saturn", color: "#e8cf91", radius: 23, years: 29.46, kind: "a gas giant" },
  { name: "Uranus", color: "#83dedc", radius: 19, years: 84, kind: "an ice giant" },
  { name: "Neptune", color: "#779dfc", radius: 18, years: 165, kind: "an ice giant" },
];
const questions = [
  { question: "What causes day and night on Earth?", options: ["Earth rotating on its axis", "Earth revolving around the Sun", "The Sun switching off"], correct: 0, explanation: "Rotation turns your part of Earth toward the Sun for day and away from it for night." },
  { question: "About how long does one Earth revolution take?", options: ["24 hours", "365 days", "One month"], correct: 1, explanation: "One trip around the Sun takes about 365 days: one year. One rotation takes about a day." },
  { question: "What keeps bending Earth's path around the Sun?", options: ["Wind from the Sun", "Earth's rotation", "The Sun's gravity"], correct: 2, explanation: "The Sun's gravity pulls Earth inward while Earth keeps moving forward. Together these produce an orbit." },
];

export function SolarSystemLesson() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [angle, setAngle] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [yearGuess, setYearGuess] = useState<"longer" | "shorter" | null>(null);
  const previousTime = useRef<number | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    let frame: number;
    previousTime.current = null;
    const tick = (time: number) => {
      if (previousTime.current !== null) {
        const elapsed = Math.min(time - previousTime.current, 100);
        setAngle(value => (value + elapsed * 0.018 * speed) % 360);
      }
      previousTime.current = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed, reducedMotion]);

  const radians = angle * Math.PI / 180;
  const earthX = 240 + 160 * Math.cos(radians);
  const earthY = 170 + 125 * Math.sin(radians);
  const score = answers.filter((answer, index) => answer === questions[index].correct).length;
  const chosen = planets.find(planet => planet.name === selectedPlanet) ?? null;
  const yearVerdict = chosen && chosen.name !== "Earth" && yearGuess
    ? (chosen.years > 1 ? "longer" : "shorter") === yearGuess
    : null;

  return (
    <div className="solar-lesson space-y-8">
      <section className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6" aria-labelledby="solar-map-heading">
        <h2 id="solar-map-heading" className="text-2xl font-bold text-slate-800">Meet our solar system</h2>
        <p className="mt-2 text-slate-700">Start at the Sun and follow the planets outward. Gravity holds this family of worlds together.</p>
        <figure className="mt-4">
          <div className="solar-map rounded-xl bg-slate-950 p-3">
            <svg viewBox="0 0 180 130" role="img" aria-label="Sun, the star at the center of our solar system" className="solar-sun">
              <circle cx="90" cy="52" r="35" fill="#fbbf24" />
              <text x="90" y="112" textAnchor="middle" fill="white" fontSize="16">Sun · our star</text>
            </svg>
            <div className="solar-planets">
              {planets.map((planet, index) => (
                <button
                  key={planet.name}
                  type="button"
                  className="solar-planet"
                  aria-pressed={selectedPlanet === planet.name}
                  onClick={() => { setSelectedPlanet(planet.name); setYearGuess(null); }}
                >
                  <svg viewBox="0 0 100 120" role="img" aria-label={`${index + 1}. ${planet.name} from the Sun`}>
                    <path d="M50 3 V21" stroke="#64748b" strokeDasharray="3 3" />
                    <circle cx="50" cy="56" r={planet.radius} fill={planet.color} />
                    {planet.name === "Saturn" && <ellipse cx="50" cy="56" rx="38" ry="9" fill="none" stroke="#e8cf91" strokeWidth="3" transform="rotate(-20 50 56)" />}
                    <text x="50" y="109" textAnchor="middle" fill="white" fontSize="14">{planet.name}</text>
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <figcaption className="mt-3 text-sm font-semibold text-slate-700">Planet sizes and orbital distances are not to scale. This diagram shows planet order, not their current positions. Click a planet to inspect it.</figcaption>
          {chosen && <p role="status" className="mt-3 rounded-lg bg-white p-3 text-slate-800"><strong>{chosen.name}</strong> is planet {planets.findIndex(planet => planet.name === chosen.name) + 1} from the Sun. It is {chosen.kind}. One trip around the Sun takes about {chosen.years === 1 ? "1 Earth year" : `${chosen.years} Earth years`}.</p>}
        </figure>
      </section>

      <section className="rounded-xl border border-blue-200 bg-slate-50 p-4 sm:p-6" aria-labelledby="earth-orbit-heading">
        <h2 id="earth-orbit-heading" className="text-2xl font-bold text-slate-800">One trip around the Sun</h2>
        <p className="mt-2 text-slate-700">Earth revolves around the Sun in about 365 days. Watch its position change, or pause to take a closer look.</p>
        <figure className="mt-4">
          <svg viewBox="0 0 480 340" role="img" aria-labelledby="earth-orbit-title" className="solar-orbit rounded-xl bg-slate-950">
            <title id="earth-orbit-title">Earth revolving around the Sun along a simplified orbit</title>
            <ellipse cx="240" cy="170" rx="160" ry="125" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="240" cy="170" r="30" fill="#fbbf24" />
            <text x="240" y="220" textAnchor="middle" fill="white" fontSize="18">Sun</text>
            <circle cx={earthX} cy={earthY} r="12" fill="#38bdf8" />
            <text x={earthX} y={earthY - 23} textAnchor="middle" fill="white" fontSize="18">Earth</text>
          </svg>
          <figcaption className="mt-2 text-sm text-slate-600">Viewed from above. Sizes, distances, and time are not to scale; the orbit shape is simplified.</figcaption>
        </figure>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="solar-control" disabled={reducedMotion || playing} onClick={() => setPlaying(true)}>Play</button>
          <button type="button" className="solar-control" disabled={!playing} onClick={() => setPlaying(false)}>Pause</button>
          <button type="button" className="solar-control" onClick={() => { setPlaying(false); setAngle(0); setSpeed(1); }}>Reset</button>
          <label className="flex items-center gap-2 font-medium text-slate-800">Speed
            <select className="rounded-lg border border-slate-400 bg-white p-3" value={speed} onChange={event => setSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option><option value={4}>4×</option>
            </select>
          </label>
        </div>
        <p role="status" className="mt-3 text-sm text-slate-700">{reducedMotion ? "Reduced motion is on. Use Step forward to explore without animation." : `${playing ? "Playing" : "Paused"}. At 1×, one orbit takes 20 seconds.`}</p>
        <button type="button" className="solar-control mt-3" onClick={() => { setPlaying(false); setAngle(value => (value + 45) % 360); }}>Step forward ⅛ orbit</button>
      </section>

      <section aria-labelledby="motion-heading">
        <h2 id="motion-heading" className="mb-4 text-2xl font-bold text-slate-800">Three ideas that explain the motion</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Rotation", caption: "Rotation means spinning on an axis. Earth spins about once every 24 hours, giving us day and night.", visual: <><circle cx="120" cy="70" r="34" fill="#0284c7" /><path d="M120 23 V117 M76 38 C50 5 183 3 169 47" fill="none" stroke="#334155" strokeWidth="3" /><path d="m158 39 11 8 7-13" fill="none" stroke="#334155" strokeWidth="3" /><text x="133" y="20" fontSize="13">axis</text></> },
            { title: "Revolution", caption: "Revolution means traveling around another object. One Earth revolution around the Sun is one year.", visual: <><ellipse cx="120" cy="70" rx="88" ry="45" fill="none" stroke="#64748b" strokeWidth="2" /><circle cx="120" cy="70" r="23" fill="#fbbf24" /><circle cx="208" cy="70" r="12" fill="#0284c7" /><path d="m180 30 13 8-15 5" fill="none" stroke="#334155" strokeWidth="3" /></> },
            { title: "Gravity", caption: "Gravity pulls objects toward each other. The Sun pulls Earth inward as Earth moves forward, bending its path into an orbit.", visual: <><circle cx="52" cy="80" r="27" fill="#fbbf24" /><circle cx="182" cy="80" r="15" fill="#0284c7" /><path d="M162 80 H93 l12-7 m-12 7 12 7 M182 60 V20 l-7 12 m7-12 7 12" fill="none" stroke="#334155" strokeWidth="3" /><text x="99" y="105" fontSize="13">gravity</text><text x="118" y="17" fontSize="13">forward motion</text></> },
          ].map(idea => <figure key={idea.title} className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <svg viewBox="0 0 240 140" role="img" aria-label={`${idea.title} diagram`} className="solar-concept w-full">{idea.visual}</svg>
            <figcaption><h3 className="mb-2 text-lg font-bold text-slate-800">{idea.title}</h3><p className="text-sm text-slate-700">{idea.caption}</p></figcaption>
          </figure>)}
        </div>
        <p className="mt-2 text-sm text-slate-600">Concept diagrams: sizes and distances are not to scale.</p>
      </section>

      <section className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 sm:p-6" aria-labelledby="try-heading">
        <h2 id="try-heading" className="text-2xl font-bold text-slate-800">Try it yourself</h2>
        <p className="mt-2 text-slate-700">Click a planet in the diagram above. Then decide whether its year is longer or shorter than Earth's. Farther planets take longer because Kepler's third law says T² grows with a³.</p>
        {!chosen && <p className="mt-3 text-sm font-medium text-slate-700">No planet selected yet.</p>}
        {chosen?.name === "Earth" && <p role="status" className="mt-3 text-sm text-slate-800">Earth is the reference: one year. Pick another planet to compare.</p>}
        {chosen && chosen.name !== "Earth" && <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="solar-control" aria-pressed={yearGuess === "shorter"} onClick={() => setYearGuess("shorter")}>Shorter than Earth's year</button>
          <button type="button" className="solar-control" aria-pressed={yearGuess === "longer"} onClick={() => setYearGuess("longer")}>Longer than Earth's year</button>
        </div>}
        <div aria-live="polite">
          {chosen && chosen.name !== "Earth" && yearVerdict !== null && <p className="mt-3 text-sm text-slate-800"><strong>{yearVerdict ? "Correct." : "Not quite."}</strong> {chosen.name} takes about {chosen.years} Earth years, which is {chosen.years > 1 ? "longer" : "shorter"} than one year.</p>}
        </div>
      </section>

      <section className="rounded-xl border-2 border-blue-200 bg-slate-50 p-4 sm:p-6" aria-labelledby="solar-quiz-heading">
        <h2 id="solar-quiz-heading" className="text-2xl font-bold text-slate-800">Check your understanding</h2>
        <p className="mt-2 text-slate-700">Choose an answer to see why it works. You can change your answers at any time.</p>
        {questions.map((question, index) => <fieldset key={question.question} className="mt-6" aria-describedby={answers[index] !== null ? `solar-feedback-${index}` : undefined}>
          <legend className="font-bold text-slate-800">{index + 1}. {question.question}</legend>
          <div className="mt-3 space-y-2">{question.options.map((option, optionIndex) => <label key={option} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-white p-3 text-slate-800">
            <input type="radio" name={`solar-question-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers(values => values.map((value, i) => i === index ? optionIndex : value))} />{option}
          </label>)}</div>
          <div aria-live="polite">{answers[index] !== null && <p id={`solar-feedback-${index}`} className="mt-3 text-sm text-slate-700"><strong>{answers[index] === question.correct ? "Correct!" : `Not quite. Correct answer: ${question.options[question.correct]}.`}</strong> {question.explanation}</p>}</div>
        </fieldset>)}
        <p role="status" className="mt-5 font-semibold text-slate-800">{answers.filter(value => value !== null).length} of 3 answered · {score} of 3 correct</p>
        <button type="button" className="solar-control mt-3" onClick={() => setAnswers([null, null, null])}>Reset quiz</button>
      </section>
    </div>
  );
}
