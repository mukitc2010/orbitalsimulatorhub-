import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  correctAnswer,
  dailyChallenge,
  generateMissions,
  loadScores,
  missionScore,
  MODES,
  parseNumericAnswer,
  validChallenge,
  type GameMode,
  type ScoreRecord,
} from "../lib/spaceMath/engine";
import "./SpaceMathGame.css";
interface Result {
  correct: boolean;
  points: number;
}
interface Run {
  seed: string;
  mode: GameMode;
  name: string;
  phase: "playing" | "review" | "finished";
  index: number;
  attempts: number;
  hinted: boolean;
  records: Result[];
  deadline: number | null;
  finalScore?: number;
  timedOut?: boolean;
}
const RUN_KEY = "osh-space-math-run-v1";
function restoreRun(): Run | null {
  try {
    const r = JSON.parse(localStorage.getItem(RUN_KEY) || "null");
    if (
      !r ||
      !validChallenge(r.seed) ||
      !Object.hasOwn(MODES, r.mode) ||
      !["playing", "review", "finished"].includes(r.phase) ||
      typeof r.name !== "string" ||
      r.name.length > 24 ||
      !Number.isInteger(r.index) ||
      r.index < 0 ||
      r.index > 5 ||
      !Number.isInteger(r.attempts) ||
      r.attempts < 0 ||
      r.attempts > 3 ||
      typeof r.hinted !== "boolean" ||
      !Array.isArray(r.records) ||
      r.records.length > 6 ||
      r.records.some(
        (x: Result) =>
          !x ||
          typeof x.correct !== "boolean" ||
          !Number.isInteger(x.points) ||
          x.points < 0 ||
          x.points > 1200,
      )
    )
      return null;
    if (
      r.phase !== "finished" &&
      r.records.length !== r.index + (r.phase === "review" ? 1 : 0)
    )
      return null;
    if (
      r.mode === "practice"
        ? r.deadline !== null
        : !Number.isFinite(r.deadline) || r.deadline <= 0
    )
      return null;
    if (
      r.phase === "finished" &&
      (!Number.isFinite(r.finalScore) ||
        r.finalScore < 0 ||
        r.finalScore > 8000)
    )
      return null;
    return r;
  } catch {
    return null;
  }
}
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
export function SpaceMathGame() {
  const query = new URLSearchParams(window.location.search);
  const querySeed = query.get("challenge") || "";
  const [seed, setSeed] = useState(
    validChallenge(querySeed) ? querySeed : dailyChallenge(),
  );
  const [mode, setMode] = useState<GameMode>(
    Object.hasOwn(MODES, query.get("level") || "")
      ? (query.get("level") as GameMode)
      : "flight",
  );
  const [name, setName] = useState("");
  const [run, setRun] = useState<Run | null>(() => {
    const saved = restoreRun();
    if (
      saved &&
      validChallenge(querySeed) &&
      (saved.seed !== querySeed ||
        (Object.hasOwn(MODES, query.get("level") || "") &&
          saved.mode !== query.get("level")))
    )
      return null;
    return saved;
  });
  const [now, setNow] = useState(Date.now());
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [scores, setScores] = useState(loadScores);
  const [storageStatus, setStorageStatus] = useState("");
  const finishLock = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeSeed = run?.seed || seed;
  const activeMode = run?.mode || mode;
  const missions = generateMissions(activeSeed);
  const mission = missions[run?.index || 0];
  const remaining = run?.deadline
    ? Math.max(0, Math.ceil((run.deadline - now) / 1000))
    : null;
  const points = run?.records.reduce((sum, r) => sum + r.points, 0) || 0;
  useEffect(() => {
    try {
      if (run) localStorage.setItem(RUN_KEY, JSON.stringify(run));
    } catch {
      setStorageStatus(
        "Browser storage unavailable: progress and records will last only this visit.",
      );
    }
  }, [run]);
  useEffect(() => {
    if (!run || run.phase === "finished" || run.deadline === null) return;
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, [run?.phase, run?.deadline]);
  useEffect(() => {
    if (run && run.phase !== "finished" && remaining === 0) finish(run, true);
  }, [remaining, run]);
  useEffect(() => {
    if (run?.phase === "playing") inputRef.current?.focus();
    if (run?.phase === "review")
      document.getElementById("solution-title")?.focus();
    if (run?.phase === "finished")
      document.getElementById("results-title")?.focus();
  }, [run?.index, run?.phase]);
  function finish(current: Run, timedOut = false) {
    if (finishLock.current || current.phase === "finished") return;
    finishLock.current = true;
    const complete =
      current.records.length === missions.length &&
      current.records.every((r) => r.correct);
    const timeLeft = current.deadline
      ? Math.max(0, current.deadline - Date.now()) / 1000
      : 0;
    const bonus =
      complete && !timedOut && MODES[current.mode].seconds
        ? Math.floor(200 * Math.min(1, timeLeft / MODES[current.mode].seconds))
        : 0;
    const finalScore =
      current.records.reduce((sum, r) => sum + r.points, 0) + bonus;
    const ended: Run = { ...current, phase: "finished", finalScore, timedOut };
    setRun(ended);
    if (current.mode !== "practice") {
      const record: ScoreRecord = {
        name: current.name,
        seed: current.seed,
        mode: current.mode,
        score: finalScore,
        correct: current.records.filter((r) => r.correct).length,
        date: new Date().toISOString(),
      };
      const next = [...scores, record]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      setScores(next);
      try {
        localStorage.setItem("osh-space-math-scores-v1", JSON.stringify(next));
      } catch {
        setStorageStatus("Could not save this record to your browser.");
      }
    }
  }
  function start() {
    finishLock.current = false;
    setAnswer("");
    setFeedback("");
    setShareStatus("");
    setNow(Date.now());
    setRun({
      seed,
      mode,
      name: name.trim().slice(0, 24) || "Flight cadet",
      index: 0,
      attempts: 0,
      hinted: false,
      records: [],
      phase: "playing",
      deadline: MODES[mode].seconds
        ? Date.now() + MODES[mode].seconds * 1000
        : null,
    });
  }
  function resolve(correct: boolean) {
    if (!run || run.phase !== "playing") return;
    const streak = [...run.records].reverse().findIndex((r) => !r.correct);
    const priorStreak = streak === -1 ? run.records.length : streak;
    setRun({
      ...run,
      phase: "review",
      records: [
        ...run.records,
        {
          correct,
          points: correct
            ? missionScore(run.attempts, run.hinted, priorStreak)
            : 0,
        },
      ],
    });
    setFeedback("");
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!run || run.phase !== "playing") return;
    if (run.deadline && Date.now() >= run.deadline) {
      finish(run, true);
      return;
    }
    const value = parseNumericAnswer(answer);
    if (value === null) {
      setFeedback(
        "Enter a finite number, without the unit. Scientific notation is accepted.",
      );
      return;
    }
    if (correctAnswer(value, mission.answer, run.mode)) {
      resolve(true);
      return;
    }
    if (run.attempts >= 2) {
      resolve(false);
      return;
    }
    setRun({ ...run, attempts: run.attempts + 1 });
    setFeedback(
      `Trajectory missed. Check the radius, units and formula. ${2 - run.attempts} attempt(s) remain.`,
    );
  }
  function next() {
    if (!run) return;
    if (run.index === missions.length - 1) {
      finish(run);
      return;
    }
    setRun({
      ...run,
      index: run.index + 1,
      attempts: 0,
      hinted: false,
      phase: "playing",
    });
    setAnswer("");
    setFeedback("");
  }
  const shareUrl = `${window.location.origin}/games/space-math?challenge=${encodeURIComponent(activeSeed)}&level=${activeMode}`;
  async function share() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus(
        "Challenge link copied. Everyone opening it gets the same six problems.",
      );
    } catch {
      setShareStatus("Copy the challenge URL from the field below.");
    }
  }
  return (
    <div className="math-game">
      <header className="math-game-header">
        <Link href="/">
          <a className="math-game-back">OSH / FLIGHT SCHOOL</a>
        </Link>
        <span className="math-game-live">
          <i /> MISSION CHANNEL OPEN
        </span>
      </header>
      {!run ? (
        <>
          <section className="math-game-hero">
            <div>
              <p className="math-game-eyebrow">A SPACE MATH CHALLENGE</p>
              <h1>
                ORBITAL <br />
                <span>GAUNTLET</span>
              </h1>
              <p className="math-game-lead">
                Six maneuvers. One mission.
                <br />
                Can you do the math to make it home?
              </p>
              <p className="math-game-muted">
                Navigate from Earth orbit to interplanetary space using orbital
                mechanics, geometry and propulsion math. Bring a calculator and
                your best reasoning.
              </p>
            </div>
            <svg
              className="math-game-orbit"
              viewBox="0 0 400 400"
              role="img"
              aria-label="A spacecraft following an orbital trajectory around a planet"
            >
              <defs>
                <radialGradient id="gauntlet-planet">
                  <stop stopColor="#47d9e4" />
                  <stop offset="1" stopColor="#073b58" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="150" fill="none" stroke="#173d57" />
              <ellipse
                cx="200"
                cy="200"
                rx="180"
                ry="86"
                transform="rotate(-35 200 200)"
                fill="none"
                stroke="#4de1d7"
                strokeDasharray="5 7"
              />
              <circle cx="200" cy="200" r="76" fill="url(#gauntlet-planet)" />
              <path
                d="M140 175 Q210 130 265 197 M129 215 Q205 172 269 226"
                fill="none"
                stroke="#83eee7"
                strokeOpacity=".3"
                strokeWidth="7"
              />
              <circle cx="325" cy="106" r="8" fill="#f6c76a" />
              <circle
                cx="325"
                cy="106"
                r="19"
                fill="none"
                stroke="#f6c76a"
                strokeOpacity=".4"
              />
              <text
                x="200"
                y="375"
                textAnchor="middle"
                fill="#70a8bb"
                fontSize="11"
                letterSpacing="3"
              >
                CALCULATE / COMMIT / DISCOVER
              </text>
            </svg>
          </section>
          <div className="math-game-setup-grid">
            <section className="math-game-panel" aria-labelledby="join-title">
              <p className="math-game-eyebrow">01 / JOIN THE CHALLENGE</p>
              <h2 id="join-title">Take your flight seat</h2>
              <label className="math-game-label">
                Call sign <span>Optional · stays in this browser</span>
                <input
                  value={name}
                  maxLength={24}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Flight cadet"
                />
              </label>
              <fieldset className="math-game-modes">
                <legend>Choose your difficulty</legend>
                {(Object.keys(MODES) as GameMode[]).map((key) => (
                  <label key={key} className={mode === key ? "selected" : ""}>
                    <input
                      type="radio"
                      name="game-mode"
                      checked={mode === key}
                      onChange={() => setMode(key)}
                    />
                    <span>
                      <strong>{MODES[key].label}</strong>
                      <small>{MODES[key].description}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="math-game-code">
                <span>MISSION CODE</span>
                <strong>{seed}</strong>
                <button type="button" onClick={() => setSeed(dailyChallenge())}>
                  Daily mission
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSeed(`custom-${crypto.randomUUID().slice(0, 8)}`)
                  }
                >
                  New mission
                </button>
              </div>
              <button className="math-game-primary" onClick={start}>
                Launch challenge <span aria-hidden="true">↗</span>
              </button>
              <p className="math-game-small">
                Daily missions change at 00:00 UTC. Same code = same problems.
                Your active mission resumes after a page reload; the clock keeps
                running. Launching a different code replaces that saved flight.
              </p>
            </section>
            <aside className="math-game-panel math-game-brief">
              <p className="math-game-eyebrow">02 / YOUR FLIGHT PLAN</p>
              <h2>Earn your way to deep space</h2>
              <ol>
                {missions.map((m, i) => (
                  <li key={m.id}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>
                      {m.title}
                      <small>{m.role}</small>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="math-game-small">
                Three attempts per mission. A correct answer starts at 1,000
                points; retries cost 150, hints cost 250, and consecutive clears
                earn up to 200 extra. Clearing all six timed missions adds up to
                200 time-bonus points.
              </p>
            </aside>
          </div>
        </>
      ) : run.phase === "finished" ? (
        <section
          className="math-game-results math-game-panel"
          aria-labelledby="results-title"
        >
          <p className="math-game-eyebrow">FLIGHT DEBRIEF / {run.name}</p>
          <h1 id="results-title" tabIndex={-1}>
            {run.timedOut
              ? "Window closed."
              : run.records.filter((r) => r.correct).length === 6
                ? "Mission accomplished."
                : "Flight logged."}
          </h1>
          <p className="math-game-big-score">
            {run.finalScore?.toLocaleString()}
            <span>POINTS</span>
          </p>
          <p className="math-game-lead">
            {run.records.filter((r) => r.correct).length} of 6 missions cleared
            · {MODES[run.mode].label}
          </p>
          <p className="math-game-muted">
            {run.seed}
            {run.mode === "practice"
              ? " · Practice flights do not enter local records."
              : " · Your record is stored only on this device."}
          </p>
          <div className="math-game-debrief-grid">
            {missions.map((m, i) => (
              <details key={m.id}>
                <summary>
                  {run.records[i]?.correct
                    ? "CLEARED"
                    : run.records[i]
                      ? "REVIEW"
                      : "NOT REACHED"}{" "}
                  / {m.title}
                </summary>
                <p>
                  Answer: {m.answer.toFixed(5)} {m.unit}
                </p>
                <ol>
                  {m.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
          <div className="math-game-actions">
            <button
              className="math-game-primary"
              onClick={() => {
                setSeed(run.seed);
                setMode(run.mode);
                setName(run.name);
                setRun(null);
                finishLock.current = false;
                try {
                  localStorage.removeItem(RUN_KEY);
                } catch {
                  /* Storage is optional. */
                }
              }}
            >
              Return to flight desk
            </button>
            <button className="math-game-secondary" onClick={share}>
              Invite a challenger
            </button>
          </div>
        </section>
      ) : (
        <>
          <section
            className="math-game-telemetry"
            aria-label="Flight telemetry"
          >
            <div>
              <span>COMMANDER</span>
              <strong>{run.name}</strong>
            </div>
            <div>
              <span>SCORE</span>
              <strong>{points.toLocaleString()}</strong>
            </div>
            <div>
              <span>MISSION</span>
              <strong>{run.index + 1} / 6</strong>
            </div>
            <div
              className={
                remaining !== null && remaining < 120 ? "math-game-urgent" : ""
              }
            >
              <span>TIME REMAINING</span>
              <strong role="timer" aria-live="off">
                {remaining === null ? "UNTIMED" : clock(remaining)}
              </strong>
            </div>
          </section>
          <button
            type="button"
            className="math-game-text-button"
            onClick={() => finish(run)}
          >
            End flight &amp; debrief
          </button>
          <ol className="math-game-progress" aria-label="Mission progress">
            {missions.map((m, i) => (
              <li
                key={m.id}
                aria-current={i === run.index ? "step" : undefined}
                className={
                  i === run.index ? "current" : i < run.index ? "completed" : ""
                }
              >
                <span>
                  {i < run.index
                    ? run.records[i]?.correct
                      ? "✓"
                      : "−"
                    : String(i + 1).padStart(2, "0")}
                </span>
                {m.title}
              </li>
            ))}
          </ol>
          <div className="math-game-play-grid">
            <section
              className="math-game-panel"
              aria-labelledby="mission-title"
            >
              <p className="math-game-eyebrow">
                {mission.role} / MISSION {run.index + 1}
              </p>
              <h1 id="mission-title">{mission.title}</h1>
              <p className="math-game-lead">{mission.brief}</p>
              <ul className="math-game-givens">
                {mission.given.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <h2 className="math-game-question">{mission.question}</h2>
              {run.phase === "playing" ? (
                <form onSubmit={submit}>
                  <label className="math-game-label" htmlFor="mission-answer">
                    Your answer ({mission.unit})
                    <div className="math-game-answer-row">
                      <input
                        id="mission-answer"
                        ref={inputRef}
                        autoComplete="off"
                        spellCheck={false}
                        inputMode="decimal"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter a number"
                      />
                      <span>{mission.unit}</span>
                    </div>
                  </label>
                  <p className="math-game-small">
                    Tolerance: ±{MODES[run.mode].tolerance * 100}%.{" "}
                    {3 - run.attempts} attempts left. Keep full precision until
                    your final answer.
                  </p>
                  <p role="status" className="math-game-feedback">
                    {feedback}
                  </p>
                  <div className="math-game-actions">
                    <button className="math-game-primary" type="submit">
                      Commit answer
                    </button>
                    <button
                      type="button"
                      className="math-game-secondary"
                      onClick={() => setRun({ ...run, hinted: true })}
                      disabled={run.hinted}
                    >
                      Reveal hint (−250)
                    </button>
                    <button
                      type="button"
                      className="math-game-text-button"
                      onClick={() => resolve(false)}
                    >
                      Skip & learn
                    </button>
                  </div>
                </form>
              ) : (
                <div className="math-game-solution" role="status">
                  <h2 id="solution-title" tabIndex={-1}>
                    {run.records.at(-1)?.correct
                      ? "Mission cleared."
                      : "Solution unlocked."}
                  </h2>
                  <p>
                    Reference answer:{" "}
                    <strong>
                      {mission.answer.toFixed(5)} {mission.unit}
                    </strong>
                  </p>
                  <ol>
                    {mission.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p>{run.records.at(-1)?.points} points earned.</p>
                  <button className="math-game-primary" onClick={next}>
                    {run.index === 5 ? "Finish flight" : "Next mission"}
                  </button>
                </div>
              )}
              {run.hinted && (
                <aside className="math-game-hint">
                  <strong>Flight computer hint</strong>
                  <p>{mission.hint}</p>
                </aside>
              )}
            </section>
            <aside className="math-game-panel math-game-reference">
              <p className="math-game-eyebrow">REFERENCE / NOT A SOLVER</p>
              <h2>Flight rules</h2>
              <p>
                Use a calculator or scratch paper. The challenge is choosing the
                right model and keeping units consistent.
              </p>
              <ul>
                <li>
                  Altitude is measured from the surface; orbital radius is
                  measured from the center.
                </li>
                <li>Earth μ is given in km³/s². Use km with that constant.</li>
                <li>Convert degrees before using a radian-mode calculator.</li>
                <li>The rocket equation in this mission uses m/s.</li>
                <li>
                  These are idealized two-body and impulsive-maneuver problems,
                  not operational guidance.
                </li>
              </ul>
              <p className="math-game-small">
                {run.seed} · Progress saved locally when browser storage is
                available.
              </p>
            </aside>
          </div>
        </>
      )}
      <section className="math-game-community">
        <div className="math-game-panel">
          <p className="math-game-eyebrow">BRING YOUR CREW</p>
          <h2>Same mission. Different minds.</h2>
          <p className="math-game-muted">
            Send this code to friends, classmates or your study group. They
            receive identical questions in the same order. Compare scores
            yourselves; there is no server leaderboard or live multiplayer.
          </p>
          <label className="math-game-label">
            Shareable challenge link
            <input
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <button className="math-game-secondary" onClick={share}>
            Copy challenge link
          </button>
          <p role="status" className="math-game-small">
            {shareStatus}
          </p>
        </div>
        <div className="math-game-panel">
          <p className="math-game-eyebrow">PERSONAL FLIGHT LOG</p>
          <h2>Records on this device</h2>
          <p className="math-game-small">
            Best 20 timed runs. Filtered to this mission and difficulty; browser
            records are editable and are not verified competition results.
          </p>
          <ol className="math-game-records">
            {scores
              .filter((s) => s.seed === activeSeed && s.mode === activeMode)
              .map((s, i) => (
                <li key={`${s.date}-${i}`}>
                  <span>
                    {i + 1}. {s.name} <small>{s.correct}/6 cleared</small>
                  </span>
                  <strong>{s.score.toLocaleString()}</strong>
                </li>
              ))}
          </ol>
          {!scores.some(
            (s) => s.seed === activeSeed && s.mode === activeMode,
          ) && (
            <p className="math-game-muted">
              No flight records yet. Be the first to launch.
            </p>
          )}
        </div>
      </section>
      {storageStatus && (
        <p role="status" className="math-game-small">
          {storageStatus}
        </p>
      )}
      <footer className="math-game-footer">
        Built for curious minds. No sign-up, no fee. Numerical answers allow
        rounding; models and assumptions are shown with each mission.
      </footer>
    </div>
  );
}
