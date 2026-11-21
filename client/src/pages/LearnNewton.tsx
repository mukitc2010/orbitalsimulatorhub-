import { Link } from "wouter";
import { OrbitalMechanicsExplainer } from "../components/OrbitalMechanicsExplainer";

export function LearnNewton() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="headline">Newton's Laws of Motion</h1>
      <p className="subhead">
        Sir Isaac Newton described how forces and motion work. These three laws help us understand how satellites orbit Earth.
      </p>
      <OrbitalMechanicsExplainer />
      <div className="rounded-xl bg-[var(--accent-cyan)]/10 border-2 border-[var(--accent-cyan)]/40 p-4 text-center">
        <p className="font-medium text-slate-800 mb-2">Want formulas, calculators, and quizzes?</p>
        <Link href="/learn/formulas" className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            Newton's Formulas Playground →
          </Link>
      </div>
    </div>
  );
}
