import { useState } from 'react';
import { Link } from 'wouter';
import paper from '../data/spaceRobotPaper.json';
import { optimizeLunarTasks } from '../lib/lunarMissionPlanner';

const sectionId = (index: number) => `paper-section-${index}`;
export function SpaceRobotResearch() {
  const [energy, setEnergy] = useState(10);
  const [reserve, setReserve] = useState(2);
  const [hours, setHours] = useState(12);
  const [riskPenalty, setRiskPenalty] = useState(1);
  const [sampleApproved, setSampleApproved] = useState(false);
  const result = optimizeLunarTasks({ totalEnergy: energy, reserve: Math.min(reserve, energy), hours, riskPenalty, energyPenalty: 1, sampleApproved });
  const controls = [
    { label: 'Total energy (kWh)', value: energy, min: 2, max: 14, step: 0.5, change: setEnergy },
    { label: 'Protected reserve (kWh)', value: reserve, min: 0, max: energy, step: 0.5, change: setReserve },
    { label: 'Work window (hours)', value: hours, min: 0, max: 12, step: 0.5, change: setHours },
    { label: 'Risk penalty', value: riskPenalty, min: 0, max: 5, step: 0.5, change: setRiskPenalty },
  ];
  return <article className="space-robot-paper mx-auto max-w-6xl text-slate-200">
    <style>{`@media print {
      .space-robot-paper, .space-robot-paper * { color: #111 !important; background: white !important; box-shadow: none !important; }
      .space-robot-paper th, .space-robot-paper td { border: 1px solid #aaa; }
      .space-robot-paper tr { break-inside: avoid; }
      .space-robot-paper a { text-decoration: underline; }
    }`}</style>
    <Link href="/research"><a className="text-sm text-cyan-300">Back to research</a></Link>
    <header className="my-6 overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/70 via-slate-950 to-indigo-950/70 p-6 sm:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Research concept / 23 October 2026</p>
      <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">{paper.title}</h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-300">{paper.subtitle}</p>
      <div className="mt-7 flex flex-wrap gap-3 print:hidden">
        <a href="#mission-explorer" className="rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950">Explore the mission model</a>
        <a href="/research/space_robot_research_paper.docx" download className="rounded-lg border border-white/20 px-5 py-3">Download original paper (.docx)</a>
        <button onClick={() => window.print()} className="rounded-lg border border-white/20 px-5 py-3">Print / save PDF</button>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-400">Proposed research architecture, not a demonstrated flight system. AGI is optional; ASI is speculative. Mission authority remains with people.</p>
    </header>
    <div className="mb-8 grid gap-3 sm:grid-cols-3" aria-label="Proposed robot team">
      {[
        ['01 / SCOUT', 'Map the terrain', 'A specialized rover surveys routes and hazards.'],
        ['02 / HUMANOID', 'Work with human tools', 'A dexterous unit handles selected maintenance tasks.'],
        ['03 / SERVICE NODE', 'Keep the team supported', 'Infrastructure provides power, shelter and communications.'],
      ].map(([label, title, description]) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"><p className="font-mono text-xs text-cyan-300">{label}</p><h2 className="mt-3 text-lg font-semibold text-white">{title}</h2><p className="mt-2 text-sm text-slate-400">{description}</p></div>)}
    </div>
    <section id="mission-explorer" aria-labelledby="explorer-title" className="mb-10 scroll-mt-24 rounded-2xl border border-cyan-400/30 bg-slate-900/70 p-5 sm:p-8">
      <p className="text-xs uppercase tracking-widest text-cyan-300">Interactive companion / illustrative assumptions</p>
      <h2 id="explorer-title" className="mt-2 text-2xl font-semibold text-white">Lunar task-budget explorer</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">Compare all 32 subsets of the paper's five tasks. Maximize value minus risk and energy penalties, while protecting the recovery reserve. Tasks use serial durations; this is not a flight planner or a test of the full multi-robot model.</p>
      <div className="my-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {controls.map(c => <label key={c.label} className="text-sm">{c.label}<output className="ml-2 text-cyan-300">{c.label.startsWith('Protected') ? Math.min(c.value, energy) : c.value}</output><input aria-label={c.label} type="range" min={c.min} max={c.max} step={c.step} value={c.label.startsWith('Protected') ? Math.min(c.value, energy) : c.value} onChange={e => c.change(Number(e.target.value))} className="mt-3 w-full accent-cyan-300" /></label>)}
      </div>
      <label className="flex gap-3 text-sm"><input type="checkbox" checked={sampleApproved} onChange={e => setSampleApproved(e.target.checked)} />Model human approval for sample collection (illustration only)</label>
      <div aria-live="polite" className="mt-6 rounded-xl border border-white/10 p-4">
        <p className="font-mono text-sm text-cyan-200">{result.energy.toFixed(1)} kWh task energy + {Math.min(reserve, energy).toFixed(1)} kWh reserve / {energy.toFixed(1)} kWh total</p>
        <p className="mt-2 text-sm text-slate-400">{result.hours.toFixed(1)} / {hours} hours · Objective score {result.score.toFixed(1)} (illustrative units)</p>
        <ul className="mt-4 space-y-2">{result.tasks.map(t => <li key={t.name} className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-2 text-sm"><span>{t.name}</span><span className="text-slate-400">{t.platform}</span></li>)}</ul>
        {!result.tasks.length && <p className="mt-3 text-sm">No positive-value task set selected within these constraints.</p>}
      </div>
      <aside className="mt-5 text-xs leading-relaxed text-amber-200/90">Editorial note: the source describes 8 kWh usable energy and a 2 kWh reserve, but later mentions a 10 kWh task-energy cutoff. This explorer interprets the baseline as 10 kWh total minus 2 kWh reserve = 8 kWh available for tasks. The original text below is preserved.</aside>
    </section>
    <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="Paper contents" className="rounded-xl border border-white/10 p-4 lg:sticky lg:top-24 print:hidden"><h2 className="mb-3 font-semibold text-white">In this paper</h2><ul className="space-y-3 text-xs leading-relaxed">{paper.blocks.map((b, i) => b.type === 'heading' && b.level === 1 ? <li key={i}><a className="text-slate-400 hover:text-cyan-300" href={`#${sectionId(i)}`}>{b.text}</a></li> : null)}</ul></nav>
      <div className="min-w-0 space-y-5 rounded-2xl border border-white/10 bg-slate-950/40 p-5 sm:p-8">
        <p className="text-xs text-slate-500">Full source text. References are reproduced as supplied and have not been independently verified.</p>
        {paper.blocks.map((block, index) => {
          if (block.type === 'heading') return block.level === 2
            ? <h3 key={index} id={sectionId(index)} className="scroll-mt-24 pt-5 text-xl font-semibold text-cyan-100">{block.text}</h3>
            : <h2 key={index} id={sectionId(index)} className="scroll-mt-24 border-t border-white/10 pt-8 text-2xl font-semibold text-white">{block.text}</h2>;
          if (block.type === 'table' && block.rows) return <div key={index} className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left text-sm"><caption className="sr-only">Research paper table {paper.blocks.slice(0, index).filter(b => b.type === 'table').length + 1}</caption><thead><tr>{block.rows[0].map((cell, i) => <th key={i} scope="col" className="bg-cyan-950/60 p-3 font-semibold text-cyan-200">{cell}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, i) => <tr key={i} className="border-t border-white/10">{row.map((cell, j) => <td key={j} className="p-3 align-top text-slate-300">{cell}</td>)}</tr>)}</tbody></table></div>;
          if (block.type === 'reference') {
            const url = block.text?.match(/https:\/\/[^\s]+/)?.[0];
            return <p key={index} className="break-words text-sm leading-relaxed text-slate-400">{url ? <>{block.text?.slice(0, block.text.indexOf(url))}<a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">{url}</a></> : block.text}</p>;
          }
          return <p key={index} className={`whitespace-pre-wrap break-words text-sm leading-7 sm:text-base ${block.type === 'bullet' ? 'border-l-2 border-cyan-500/40 pl-4 text-slate-300' : 'text-slate-300'}`}>{block.text}</p>;
        })}
      </div>
    </div>
  </article>;
}
