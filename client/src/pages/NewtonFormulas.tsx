import { NewtonPlayground } from "../components/NewtonPlayground";
import { FormulaVisuals } from "../components/FormulaVisuals";
import { FunFacts } from "../components/FunFacts";
import { FormulaQuiz } from "../components/FormulaQuiz";

export function NewtonFormulas() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <NewtonPlayground />
      <FormulaVisuals />
      <section id="quiz">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Test Your Knowledge – Quiz</h2>
        <FormulaQuiz />
      </section>
      <FunFacts />
    </div>
  );
}
