import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import katex from "katex";
import "katex/dist/katex.min.css";
import { dampPointingError, explainConic, orbitalRadius, conicKind } from "../lib/mathHistory/conics";

const MU = 3.986004418e14;

function tex(formula: string) {
  return katex.renderToString(formula, { displayMode: true, throwOnError: false, strict: "ignore" });
}

const MODULES = [
  {
    id: "babylon",
    era: "about 1800–300 BCE",
    title: "Babylonian astronomical calculation",
    history: "Mesopotamian scribes used a base-60 place system and long observational records. Later Babylonian astronomical texts gave numerical schemes for predicting lunar and planetary phenomena. Those schemes are arithmetic predictions from records, not a theory of gravity.",
    formula: String.raw`60=2^2\cdot3\cdot5`,
    steps: ["Record a repeating sky event.", "Fit a stepwise arithmetic rule to the record.", "Use that rule to estimate the next occurrence.", "Do not treat the rule as a force law."],
    use: "Mission design still starts from an ephemeris: a table of predicted positions. The table is now produced by numerical integration and observations, which Babylonian scribes did not have.",
    sim: { href: "/simulator", label: "Open the orbit simulator" },
    sources: ["Otto Neugebauer, A History of Ancient Mathematical Astronomy (1975).", "The cuneiform astronomical corpus published in the Astronomical Cuneiform Texts."],
  },
  {
    id: "pythagoras",
    era: "theorem in use before the Pythagorean school; school about 6th century BCE",
    title: "Right triangles, before and with the Pythagoreans",
    history: "A clay tablet from the Old Babylonian period, Plimpton 322, lists number triples related to right triangles centuries before Pythagoras. The Pythagorean school later treated geometry as a foundation for number and harmony. The theorem was not invented for spacecraft.",
    formula: String.raw`a^2+b^2=c^2`,
    steps: ["Take two perpendicular legs.", "Square each length and add the squares.", "The hypotenuse is the square root of that sum.", "The same identity is the Euclidean norm of a vector."],
    use: "A spacecraft range is the magnitude of a position difference. Engineers use the theorem as vector length. The Pythagoreans did not write vector guidance.",
    sim: { href: "#navigation", label: "Try the navigation lab" },
    sources: ["Eleanor Robson, words and pictures on Plimpton 322, Historia Mathematica (2001).", "Thomas Heath, A History of Greek Mathematics."],
  },
  {
    id: "euclid",
    era: "about 300 BCE",
    title: "Euclid and systematic geometry",
    history: "Euclid, working in Alexandria, organized plane and solid geometry into definitions, postulates, and proofs in the Elements. The book is a method of argument. It is not a mechanics textbook.",
    formula: String.raw`\triangle ABC \cong \triangle DEF`,
    steps: ["State what is assumed.", "Use only those assumptions and earlier propositions.", "A congruence or proportion is a proved relation, not a measurement slogan."],
    use: "Coordinate frames on a spacecraft still depend on agreed axes and transformations. Euclid's contribution is the habit of defining the frame before calculating in it.",
    sim: { href: "#navigation", label: "Open coordinate angles" },
    sources: ["Euclid, Elements, especially Books I and VI.", "Heath's English translation and commentary."],
  },
  {
    id: "apollonius",
    era: "about 200 BCE",
    title: "Apollonius and conic sections",
    history: "Apollonius of Perga classified the ellipse, parabola, and hyperbola as sections of a cone and gave them those names. He worked with geometric properties of the curves. Keplerian orbits are a much later physical use of the same curves.",
    formula: String.raw`r=\frac{p}{1+e\cos\theta}`,
    steps: ["p is the semi-latus rectum.", "e is the eccentricity.", "θ is the true anomaly, measured from periapsis.", "The formula is undefined where 1 + e cos θ is not positive."],
    use: "A circular, elliptical, parabolic, or hyperbolic coasting trajectory is drawn with this polar equation. Apollonius did not write this spacecraft form and did not know gravitational parameters.",
    sim: { href: "#conics", label: "Draw the conic" },
    sources: ["Apollonius, Conics.", "T. L. Heath, Treatise on Conic Sections."],
  },
  {
    id: "hipparchus",
    era: "about 150 BCE",
    title: "Hipparchus and chord astronomy",
    history: "Hipparchus compiled a star catalog and used chords of circles for astronomical angles. A chord is related to the later sine by chord(2α) = 2R sin α. He also argued that the equinoxes move. This is spherical and plane astronomy, not onboard guidance.",
    formula: String.raw`\mathrm{chord}(2\alpha)=2R\sin\alpha`,
    steps: ["Measure an angle at the center of a circle.", "The chord is the straight line between the two points on the circle.", "Half-angle sines came later as a more convenient table."],
    use: "Star-tracker geometry still turns angles into directions on the sky. The instrument and the error model are modern.",
    sim: { href: "#navigation", label: "Move a pointing angle" },
    sources: ["G. J. Toomer, Ptolemy's Almagest, for the chord table tradition that follows Hipparchus.", "Neugebauer, A History of Ancient Mathematical Astronomy."],
  },
  {
    id: "aryabhata",
    era: "499 CE",
    title: "Aryabhata and sine tables",
    history: "Aryabhata's Aryabhatiya, composed in 499 CE, includes a table of sine differences for astronomy. Indian astronomers used the half-chord, closer to the modern sine than the Greek chord. The tables served calendar and planetary calculation.",
    formula: String.raw`\sin\theta`,
    steps: ["Divide a quadrant into equal arcs.", "Tabulate the half-chords.", "Interpolate for an angle that falls between tabulated values."],
    use: "A rotation matrix uses sine and cosine of a spacecraft angle. The matrix is a later algebraic tool. The sine function's tabulated history is older than that tool.",
    sim: { href: "#navigation", label: "Read sine and cosine" },
    sources: ["Aryabhata, Aryabhatiya (499 CE).", "Kim Plofker, Mathematics in India."],
  },
  {
    id: "kepler",
    era: "1609 and 1619",
    title: "Kepler's planetary laws",
    history: "Johannes Kepler, using Tycho Brahe's observations, published the ellipse law and the equal-area law in Astronomia Nova (1609) and the period law in Harmonices Mundi (1619). He replaced circular deferents with ellipses for planets. He did not write rocket equations.",
    formula: String.raw`T^2 \propto a^3`,
    steps: ["The orbit is an ellipse with the central body at one focus.", "Equal areas are swept in equal times.", "The square of the period grows with the cube of the semi-major axis."],
    use: "A coasting Earth satellite is planned first as a Keplerian ellipse, then corrected for Earth oblateness, drag, and thrust. Those corrections are later physics.",
    sim: { href: "/simulator", label: "Open the orbit simulator" },
    sources: ["Kepler, Astronomia Nova (1609).", "Kepler, Harmonices Mundi (1619)."],
  },
  {
    id: "newton",
    era: "1687",
    title: "Newton's mechanics and gravitation",
    history: "Isaac Newton's Principia (1687) states the laws of motion and universal gravitation. An inverse-square central force produces the conics Kepler had found. This is the first of these modules that derives an orbit from a force.",
    formula: String.raw`F=\frac{GMm}{r^2}`,
    steps: ["Set the force proportional to each mass and to 1/r².", "Acceleration of the smaller body is μ/r² toward the central body.", "μ = GM is the gravitational parameter used in the simulators on this site."],
    use: "The Euler Lab integrates this acceleration. Newton did not publish the explicit Euler method. That numerical step is Euler's, in the next module.",
    sim: { href: "/simulator/euler-lab", label: "Open the Euler Lab" },
    sources: ["Newton, Philosophiæ Naturalis Principia Mathematica (1687)."],
  },
  {
    id: "euler",
    era: "1768",
    title: "Euler's numerical method",
    history: "Leonhard Euler described the step y_{n+1} = y_n + Δt f(t_n, y_n) in Institutionum calculi integralis (1768). It is a general method for differential equations. Using it on a satellite is a modern teaching and engineering application.",
    formula: String.raw`y_{n+1}=y_n+\Delta t\, f(t_n,y_n)`,
    steps: ["Write the derivative at the current state.", "Multiply by the time step.", "Add that change to the current state.", "Repeat. The local error shrinks as the step shrinks, and energy can drift."],
    use: "The Euler Lab compares this explicit step with a semi-implicit step and with classical fourth-order Runge–Kutta on a 400 km Earth orbit. The lab reports computed drift. It does not invent an accuracy percentage.",
    sim: { href: "/simulator/euler-lab", label: "Compare the integrators" },
    sources: ["Euler, Institutionum calculi integralis, Volume I (1768).", "The site constant μ = 3.986004418×10^14 m³/s²."],
  },
  {
    id: "lagrange",
    era: "1788",
    title: "Lagrange and analytical mechanics",
    history: "Joseph-Louis Lagrange published Mécanique analytique in 1788. The equations come from a Lagrangian, kinetic energy minus potential energy, instead of a free-body diagram. For gravity alone there is no thrust in these equations.",
    formula: String.raw`\frac{d}{dt}\left(\frac{\partial L}{\partial \dot q}\right)-\frac{\partial L}{\partial q}=0`,
    steps: ["Choose coordinates, here radius r and angle θ.", "Write T = ½ m (ṙ² + r² θ̇²) and V = −μ m / r.", "L = T − V.", "The θ equation says angular momentum m r² θ̇ is constant when no torque acts.", "The r equation is the radial acceleration, including the centrifugal term from that angular motion."],
    use: "A coasting spacecraft follows these unforced equations. A burn adds a generalized force and is no longer the pure Lagrange equation above. The Euler Lab animates the unforced Newtonian form of the same gravity problem.",
    sim: { href: "#lagrange", label: "Read the two-body split" },
    sources: ["Lagrange, Mécanique analytique (1788)."],
  },
  {
    id: "modern",
    era: "20th century to the present",
    title: "Orbital mechanics and autonomous control",
    history: "Clohessy–Wiltshire equations, the Kalman filter (1960), the linear quadratic regulator, and model predictive control are modern. They use the older geometry and mechanics as the plant model. An educational page that names them is not a certified flight computer.",
    formula: String.raw`u=-Kx`,
    steps: ["Model the plant.", "Estimate the state when sensors are noisy.", "Choose a control that reduces a stated cost.", "Keep the estimator and the controller separate from any language-model explanation."],
    use: "The mathematics page records the formulas. The small pointing demo below is a damped angle, checked by a unit test, and is not an autonomous flight controller.",
    sim: { href: "/research/space-agi-math", label: "Open Space-AGI Mathematics" },
    sources: ["R. E. Kalman, A New Approach to Linear Filtering and Prediction Problems (1960).", "Bryson and Ho, Applied Optimal Control."],
  },
];

const GRAPH = [
  "Ancient mathematics",
  "Geometry and trigonometry",
  "Classical mechanics",
  "Differential equations",
  "Numerical simulation",
  "Optimal control",
  "State estimation",
  "Autonomous space systems",
];

function ConicCanvas({ eccentricity, semiLatusKm, anomalyDeg }: { eccentricity: number; semiLatusKm: number; anomalyDeg: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#071018";
    ctx.fillRect(0, 0, w, h);
    const p = semiLatusKm * 1000;
    const samples: { x: number; y: number }[] = [];
    for (let i = 0; i <= 360; i++) {
      const radius = orbitalRadius(p, eccentricity, (i * Math.PI) / 180);
      if (radius == null || radius > p * 8) continue;
      samples.push({ x: radius * Math.cos((i * Math.PI) / 180), y: radius * Math.sin((i * Math.PI) / 180) });
    }
    const max = Math.max(p * 2, ...samples.map((s) => Math.hypot(s.x, s.y)));
    const scale = (Math.min(w, h) * 0.38) / max;
    const cx = w * 0.45;
    const cy = h * 0.5;
    ctx.strokeStyle = "#67e8f9";
    ctx.beginPath();
    samples.forEach((s, i) => {
      const x = cx + s.x * scale;
      const y = cy - s.y * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = "#f2b84b";
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    const radius = orbitalRadius(p, eccentricity, (anomalyDeg * Math.PI) / 180);
    if (radius != null) {
      const x = cx + radius * Math.cos((anomalyDeg * Math.PI) / 180) * scale;
      const y = cy - radius * Math.sin((anomalyDeg * Math.PI) / 180) * scale;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 4, y - 4, 8, 8);
    }
  }, [eccentricity, semiLatusKm, anomalyDeg]);
  return <canvas ref={ref} width={640} height={360} className="h-auto w-full rounded-xl bg-slate-950" aria-label="Conic orbit graph" />;
}

export function MathHistory() {
  const [eccentricity, setEccentricity] = useState(0.2);
  const [semiLatusKm, setSemiLatusKm] = useState(7000);
  const [anomalyDeg, setAnomalyDeg] = useState(40);
  const [angleDeg, setAngleDeg] = useState(35);
  const [studied, setStudied] = useState<string[]>([]);
  const anomaly = (anomalyDeg * Math.PI) / 180;
  const notes = useMemo(
    () => explainConic({ semiLatusRectumM: semiLatusKm * 1000, eccentricity, trueAnomalyRad: anomaly, muM3S2: MU }),
    [semiLatusKm, eccentricity, anomaly],
  );
  const radius = orbitalRadius(semiLatusKm * 1000, eccentricity, anomaly);
  const pointing = dampPointingError((angleDeg * Math.PI) / 180, 0.25, 0.1, 30);
  const dx = 4200;
  const dy = 2800;
  const range = Math.hypot(dx, dy);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-3 py-4 text-slate-200">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Research</p>
        <h1 className="text-3xl font-bold text-white">Ancient mathematics to spacecraft engineering</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          A timeline from Babylonian calculation to numerical orbit work and modern control. Later engineering uses are labeled as later uses. Nothing here claims that an ancient mathematician wrote a spacecraft equation, or that this site flies a vehicle.
        </p>
        <p className="mt-2 text-sm text-cyan-200">Studied on this visit: {studied.length} of {MODULES.length}</p>
      </header>

      <ol className="space-y-3">
        {MODULES.map((item) => (
          <li key={item.id} id={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">{item.era}</p>
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6">{item.history}</p>
            <div className="my-3 overflow-x-auto" dangerouslySetInnerHTML={{ __html: tex(item.formula) }} />
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-300">
              {item.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className="mt-2 text-sm"><strong className="text-white">Later engineering use. </strong>{item.use}</p>
            <p className="mt-2 text-sm"><a className="text-cyan-300 underline" href={item.sim.href}>{item.sim.label}</a></p>
            <ul className="mt-2 list-disc pl-5 text-xs text-slate-400">
              {item.sources.map((source) => <li key={source}>{source}</li>)}
            </ul>
            <button
              type="button"
              className="mt-3 rounded border border-white/20 px-3 py-1 text-xs"
              onClick={() => setStudied((prev) => prev.includes(item.id) ? prev : [...prev, item.id])}
            >
              {studied.includes(item.id) ? "Marked" : "Mark studied"}
            </button>
          </li>
        ))}
      </ol>

      <section id="conics" className="rounded-2xl border border-cyan-400/30 p-4">
        <h2 className="text-2xl font-semibold text-white">Conic orbit</h2>
        <p className="mt-1 text-sm text-slate-300">r = p / (1 + e cos θ), with p in kilometers and θ in degrees. μ is Earth, {MU.toExponential(6)} m³/s², and is used only for the energy sentence.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-[240px_1fr]">
          <div className="space-y-3 text-sm">
            <label className="block">Eccentricity {eccentricity.toFixed(2)} ({conicKind(eccentricity)})
              <input className="mt-1 w-full" type="range" min={0} max={2.2} step={0.01} value={eccentricity} onChange={(e) => setEccentricity(Number(e.target.value))} />
            </label>
            <label className="block">Semi-latus rectum {semiLatusKm} km
              <input className="mt-1 w-full" type="range" min={6571} max={20000} step={10} value={semiLatusKm} onChange={(e) => setSemiLatusKm(Number(e.target.value))} />
            </label>
            <label className="block">True anomaly {anomalyDeg}°
              <input className="mt-1 w-full" type="range" min={0} max={360} value={anomalyDeg} onChange={(e) => setAnomalyDeg(Number(e.target.value))} />
            </label>
            <p>Radius: {radius == null ? "not on the trajectory" : `${(radius / 1000).toFixed(1)} km`}</p>
          </div>
          <ConicCanvas eccentricity={eccentricity} semiLatusKm={semiLatusKm} anomalyDeg={anomalyDeg} />
        </div>
        <div className="mt-3 space-y-1 text-sm">
          {notes.map((line) => <p key={line}>{line}</p>)}
        </div>
        <p className="mt-2 text-xs text-slate-400">The tutor text is filled from these computed values. It does not call a language model and it does not invent a second trajectory.</p>
      </section>

      <section id="navigation" className="rounded-2xl border border-white/10 p-4">
        <h2 className="text-2xl font-semibold text-white">Celestial angles and pointing</h2>
        <p className="mt-1 text-sm">Sine and cosine of {angleDeg}° are {Math.sin((angleDeg * Math.PI) / 180).toFixed(4)} and {Math.cos((angleDeg * Math.PI) / 180).toFixed(4)}. A relative position of {dx} km by {dy} km has range {range.toFixed(1)} km, from the Pythagorean length of the vector.</p>
        <label className="mt-3 block text-sm">Pointing angle
          <input className="mt-1 w-full" type="range" min={-180} max={180} value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} />
        </label>
        <p className="mt-2 text-sm">An educational damper, error ← error − k·error·Δt for 30 steps, leaves {((pointing * 180) / Math.PI).toFixed(2)}°. This is a checked classroom recurrence. It is not flight software and it is not an AI controller.</p>
        <p className="mt-2 text-sm"><Link href="/research/space-agi-math"><a className="text-cyan-300 underline">Formulas for LQR, MPC, and the Kalman filter</a></Link> stay on the mathematics page, separate from this damper.</p>
      </section>

      <section id="lagrange" className="rounded-2xl border border-white/10 p-4 text-sm leading-6">
        <h2 className="text-2xl font-semibold text-white">Unforced two-body motion</h2>
        <div dangerouslySetInnerHTML={{ __html: tex(String.raw`L=T-V,\quad T=\frac12 m(\dot r^2+r^2\dot\theta^2),\quad V=-\frac{\mu m}{r}`) }} />
        <p className="mt-2">With no torque, m r² θ̇ stays constant. That is angular momentum. Mechanical energy T + V stays constant for this gravity-only model. A thrust arc is a different problem: the pure Euler–Lagrange equation above does not include an engine.</p>
        <p className="mt-2"><Link href="/simulator/euler-lab"><a className="text-cyan-300 underline">Watch the unforced integration in the Euler Lab</a></Link>. The default experiment there is a 400 km circular Earth orbit, and the time step is adjustable.</p>
      </section>

      <section className="rounded-2xl border border-white/10 p-4">
        <h2 className="text-2xl font-semibold text-white">Knowledge path</h2>
        <ol className="mt-3 space-y-2 text-sm">
          {GRAPH.map((node, index) => (
            <li key={node} className="rounded-lg border border-white/10 px-3 py-2">{index + 1}. {node}{index < GRAPH.length - 1 ? " →" : ""}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm"><Link href="/research/space-agi-math"><a className="text-cyan-300 underline">Continue in Space-AGI Mathematics</a></Link></p>
      </section>
    </div>
  );
}
