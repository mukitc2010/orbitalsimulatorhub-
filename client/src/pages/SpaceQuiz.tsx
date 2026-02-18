import { Link } from "wouter";

/**
 * Space quiz hub — targets "space quiz" keyword.
 * Lists all quizzes; add more over time for fresh content.
 */
export function SpaceQuiz() {
  const quizzes = [
    { href: "/quiz/orbital-mechanics", title: "Orbital mechanics quiz", desc: "15 questions on orbits, satellites, gravity, and space physics. Test your knowledge!", questions: 15 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Space Quiz – Test Your Space Knowledge</h1>
        <p className="subhead">
          Free space quiz: orbital mechanics, satellites, NASA, and astronomy. See how much you know — then learn more with our tutorials and simulator.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-slate-700">
        <p><strong>Why take a space quiz?</strong> Quizzes help you remember what you learned. After each quiz, use our <Link href="/learn/orbital-mechanics"><a className="text-[var(--accent-cyan)] hover:underline">orbital mechanics guide</a></Link>, <Link href="/simulator"><a className="text-[var(--accent-cyan)] hover:underline">3D simulator</a></Link>, and <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline">AstroBot</a></Link> to go deeper.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Quizzes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quizzes.map((q) => (
            <Link key={q.href} href={q.href}>
              <a className="block p-5 rounded-xl border-2 border-[var(--accent-gold)]/60 bg-[var(--accent-gold)]/5 hover:border-[var(--accent-gold)] hover:shadow-md transition">
                <span className="text-2xl mb-2 block">📝</span>
                <h3 className="font-bold text-slate-800 mb-1">{q.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{q.desc}</p>
                <span className="text-xs font-medium text-slate-500">{q.questions} questions</span>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">More ways to learn</h2>
        <p className="text-slate-700 mb-4">After the quiz, try <Link href="/learn/how-satellites-work"><a className="text-[var(--accent-cyan)] hover:underline">how satellites work</a></Link>, <Link href="/learn/nasa-study-guide"><a className="text-[var(--accent-cyan)] hover:underline">NASA study guide</a></Link>, and <Link href="/space-news"><a className="text-[var(--accent-cyan)] hover:underline">space news</a></Link> for daily content. New quizzes and articles added regularly — Google loves fresh sites!</p>
        <Link href="/blog">
          <a className="inline-block px-4 py-2 rounded-lg bg-[var(--accent-cyan)] text-[#0f172a] font-semibold hover:opacity-90">Read space blog →</a>
        </Link>
      </div>
    </div>
  );
}
