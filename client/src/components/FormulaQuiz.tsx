import { useState } from "react";

const QUIZ = [
  {
    q: "What keeps a satellite in orbit around Earth?",
    options: ["Centrifugal force", "Gravity", "Magnetism", "Wind"],
    correct: 1,
  },
  {
    q: "Which law says F = ma?",
    options: ["1st", "2nd", "3rd", "Law of gravity"],
    correct: 1,
  },
  {
    q: "Roughly how fast does the ISS move (km/s)?",
    options: ["2", "5", "7.7", "15"],
    correct: 2,
  },
  {
    q: "What is geostationary orbit used for?",
    options: ["GPS", "Weather & communications", "Spy satellites only", "Moon missions"],
    correct: 1,
  },
];

export function FormulaQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const item = QUIZ[index];
  const done = selected !== null;
  const isCorrect = selected === item.correct;

  const next = () => {
    if (selected === item.correct) setCorrectCount((c) => c + 1);
    setSelected(null);
    setIndex((i) => (i + 1) % QUIZ.length);
  };

  return (
    <div className="card-blueprint rounded-lg p-6">
      <h3 className="font-bold text-lg font-mono-tech mb-4">Quick quiz</h3>
      <p className="font-medium mb-4">{item.q}</p>
      <div className="space-y-2">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={done}
            onClick={() => setSelected(i)}
            className={`block w-full text-left px-4 py-2 rounded border ${
              done && i === item.correct
                ? "border-green-600 bg-green-50"
                : done && i === selected && i !== item.correct
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {done && (
        <p className={`mt-4 font-mono-tech text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
          {isCorrect ? "Correct!" : "Not quite. Try the next one."}
        </p>
      )}
      {done && (
        <button
          type="button"
          onClick={next}
          className="mt-2 px-4 py-2 rounded bg-[var(--accent-cyan)] text-black font-medium"
        >
          Next
        </button>
      )}
      <p className="mt-2 text-sm text-gray-500">
        Score: {correctCount} correct (this session)
      </p>
    </div>
  );
}
