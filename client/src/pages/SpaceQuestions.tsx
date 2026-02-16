import { Link } from "wouter";

const Q = [
  {
    q: "Why don't satellites fall?",
    a: "Satellites are moving very fast sideways (several km/s). Gravity pulls them toward Earth, but because they're moving sideways so fast, they keep falling \"around\" Earth instead of into it. It's like a ball on a string: the string (gravity) pulls the ball toward the center, and the ball's speed keeps it going in a circle. If the satellite were too slow, it would fall back; if too fast, it would escape. At just the right speed, the path is a stable orbit.",
  },
  {
    q: "Why doesn't the Moon crash into Earth?",
    a: "Same idea as satellites: the Moon has both speed and gravity. Earth's gravity pulls the Moon toward us, but the Moon is also moving sideways in its orbit. That combination makes it go around Earth in an ellipse instead of crashing. The Moon is far away (about 384,000 km), so the pull is weaker and the orbital period is about 27 days.",
  },
  {
    q: "Why do astronauts float?",
    a: "Astronauts float because they're in free fall. The space station is falling toward Earth (pulled by gravity), but it's moving so fast sideways that it keeps missing the ground — that's orbit. Inside the station, the astronauts are falling the same way. So relative to the station, they seem to float. It's not that there's no gravity; it's that everything is falling together.",
  },
  {
    q: "What happens if a satellite stops?",
    a: "If a satellite suddenly had no forward speed, it would fall straight down and crash. In real life, satellites don't \"stop\" — they might slow down over many years because of a tiny bit of air in low orbit (drag), and then their orbit gets lower and lower until they re-enter the atmosphere and burn up. So \"stopping\" means losing speed: then gravity wins and the satellite falls.",
  },
];

export function SpaceQuestions() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">Space Questions Answered</h1>
        <p className="subhead">
          Simple answers to common questions: why satellites don&apos;t fall, why the Moon doesn&apos;t crash, why astronauts float, and what happens if a satellite stops.
        </p>
      </div>

      {Q.map((item, i) => (
        <section key={i} className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-2">{item.q}</h2>
          <p className="text-slate-700">{item.a}</p>
        </section>
      ))}

      <p className="text-center text-sm text-slate-600">
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Try the orbit simulator</Link>
        {" · "}
        <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">What is orbital mechanics?</Link>
        {" · "}
        <Link href="/astrobot" className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot</Link>
      </p>
    </div>
  );
}
