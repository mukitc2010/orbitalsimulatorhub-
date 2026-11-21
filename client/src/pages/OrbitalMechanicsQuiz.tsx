import { Link } from "wouter";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What keeps satellites in orbit around Earth?",
    options: [
      "Only gravity",
      "Balance between gravity and horizontal velocity",
      "Only speed",
      "Magnetic fields"
    ],
    correct: 1,
    explanation: "Satellites stay in orbit because gravity pulls them toward Earth while their horizontal velocity keeps them moving forward. This balance creates a circular or elliptical path!"
  },
  {
    question: "What is Low Earth Orbit (LEO)?",
    options: [
      "Orbit at 35,786 km altitude",
      "Orbit at 200-2,000 km altitude",
      "Orbit beyond the Moon",
      "Orbit around the Sun"
    ],
    correct: 1,
    explanation: "LEO is Low Earth Orbit, typically 200-2,000 km above Earth. The ISS orbits in LEO at about 400 km altitude."
  },
  {
    question: "How long does the ISS take to orbit Earth once?",
    options: [
      "24 hours",
      "12 hours",
      "90 minutes",
      "1 hour"
    ],
    correct: 2,
    explanation: "The ISS orbits Earth in about 90 minutes (1.5 hours). This is because it's in Low Earth Orbit, close to Earth."
  },
  {
    question: "What is orbital velocity?",
    options: [
      "The speed needed to escape Earth",
      "The speed needed to stay in orbit",
      "The speed of light",
      "The speed of sound"
    ],
    correct: 1,
    explanation: "Orbital velocity is the speed needed to stay in orbit. For LEO, it's about 7.8 km/s. Too slow = falls back, too fast = escapes!"
  },
  {
    question: "What is GEO (Geostationary Orbit)?",
    options: [
      "Orbit that matches Earth's rotation (24 hours)",
      "Orbit at 400 km altitude",
      "Orbit around the Moon",
      "Orbit that changes every day"
    ],
    correct: 0,
    explanation: "GEO is Geostationary Orbit at 35,786 km altitude. Satellites there orbit in 24 hours, matching Earth's rotation, so they appear fixed in the sky!"
  },
  {
    question: "Who discovered the laws of planetary motion?",
    options: [
      "Newton",
      "Einstein",
      "Kepler",
      "Galileo"
    ],
    correct: 2,
    explanation: "Johannes Kepler discovered the three laws of planetary motion in the 1600s. These laws describe how planets (and satellites) orbit!"
  },
  {
    question: "What happens if a satellite slows down too much?",
    options: [
      "It speeds up",
      "It escapes Earth",
      "It falls back to Earth",
      "Nothing happens"
    ],
    correct: 2,
    explanation: "If a satellite slows down, it doesn't have enough speed to balance gravity. It will fall back toward Earth and eventually burn up in the atmosphere or crash."
  },
  {
    question: "What is the formula for orbital velocity?",
    options: [
      "v = ma",
      "v = √(GM/r)",
      "v = d/t",
      "v = at"
    ],
    correct: 1,
    explanation: "Orbital velocity v = √(GM/r) where G is gravitational constant, M is Earth's mass, and r is distance from Earth's center. Try it in our calculators!"
  },
  {
    question: "Why do astronauts float on the ISS?",
    options: [
      "There's no gravity",
      "They're falling (in free fall)",
      "They're too far from Earth",
      "Magnetic fields"
    ],
    correct: 1,
    explanation: "Astronauts float because they're in free fall! The ISS is falling toward Earth, but moving forward so fast it keeps missing. Same physics as satellites!"
  },
  {
    question: "What is perigee?",
    options: [
      "The farthest point from Earth",
      "The closest point to Earth",
      "The orbital period",
      "The speed"
    ],
    correct: 1,
    explanation: "Perigee is the closest point to Earth in an orbit. Apogee is the farthest point. Elliptical orbits have different perigee and apogee heights!"
  },
  {
    question: "How many GPS satellites are needed for accurate positioning?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: 3,
    explanation: "You need at least 4 GPS satellites to determine your exact 3D position (latitude, longitude, altitude) and correct for your device's clock error."
  },
  {
    question: "What is escape velocity?",
    options: [
      "The speed to stay in orbit",
      "The speed to leave Earth's gravity",
      "The speed of light",
      "The speed of sound"
    ],
    correct: 1,
    explanation: "Escape velocity is the speed needed to escape Earth's gravity completely. For Earth, it's about 11.2 km/s. Faster than orbital velocity!"
  },
  {
    question: "What type of orbit does the ISS use?",
    options: [
      "GEO",
      "MEO",
      "LEO",
      "Heliocentric"
    ],
    correct: 2,
    explanation: "The ISS orbits in Low Earth Orbit (LEO) at about 400 km altitude. This is close to Earth, so it orbits quickly (90 minutes)."
  },
  {
    question: "What is orbital period?",
    options: [
      "The speed of the satellite",
      "The time for one complete orbit",
      "The altitude",
      "The inclination"
    ],
    correct: 1,
    explanation: "Orbital period is the time it takes for a satellite to complete one full orbit. LEO ≈ 90 min, MEO ≈ 12 hours, GEO = 24 hours."
  },
  {
    question: "Why do satellites in GEO appear fixed in the sky?",
    options: [
      "They don't move",
      "They orbit in 24 hours (same as Earth rotates)",
      "They're very close",
      "They use magnets"
    ],
    correct: 1,
    explanation: "GEO satellites orbit in exactly 24 hours, matching Earth's rotation. So from Earth, they appear to stay in the same spot in the sky!"
  }
];

export function OrbitalMechanicsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="headline">Quiz Complete!</h1>
          <div className="mt-6">
            <div className="text-6xl font-bold text-[var(--accent-cyan)] mb-2">
              {score} / {QUESTIONS.length}
            </div>
            <div className="text-2xl text-slate-700 mb-4">{percentage}%</div>
            <div className={`text-lg font-bold mb-6 ${
              percentage >= 80 ? "text-green-600" :
              percentage >= 60 ? "text-yellow-600" :
              "text-red-600"
            }`}>
              {percentage >= 80 ? "🎉 Excellent! You're an orbital mechanics expert!" :
               percentage >= 60 ? "👍 Good job! Keep learning!" :
               "📚 Keep studying! Try the simulator and learning pages."}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90"
            >
              Try Again
            </button>
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Try Simulator →
              </Link>
            <Link href="/learn/orbital-mechanics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Learn More →
              </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Orbital Mechanics Quiz</h1>
        <p className="subhead">
          Test your knowledge of orbital mechanics, satellites, and space physics! 15 questions covering orbits, satellites, and the physics behind space travel.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-slate-100 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-slate-700">
            Score: {score} / {currentQuestion + (answered ? 1 : 0)}
          </span>
        </div>
        <div className="w-full bg-slate-300 rounded-full h-2">
          <div
            className="bg-[var(--accent-cyan)] h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = selectedAnswer === index;
            let bgColor = "bg-slate-50 hover:bg-slate-100";
            
            if (answered) {
              if (isCorrect) {
                bgColor = "bg-green-100 border-green-400";
              } else if (isSelected && !isCorrect) {
                bgColor = "bg-red-100 border-red-400";
              }
            } else if (isSelected) {
              bgColor = "bg-blue-100 border-blue-400";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${bgColor} ${
                  answered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-slate-700">{option}</span>
                  {answered && isCorrect && (
                    <span className="ml-auto text-green-600 font-bold">✓ Correct!</span>
                  )}
                  {answered && isSelected && !isCorrect && (
                    <span className="ml-auto text-red-600 font-bold">✗ Wrong</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-slate-800 mb-1">Explanation:</p>
            <p className="text-sm text-slate-700">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {answered && (
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90"
          >
            {currentQuestion < QUESTIONS.length - 1 ? "Next Question →" : "See Results"}
          </button>
        </div>
      )}

      {/* Help Links */}
      <div className="text-sm text-slate-600 space-y-2">
        <p><strong>Need help?</strong> Check out:</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">What is Orbital Mechanics?</Link>
          <span>·</span>
          <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
          <span>·</span>
          <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formulas Library</Link>
        </div>
      </div>
    </div>
  );
}
