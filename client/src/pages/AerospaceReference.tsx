import { Link } from "wouter";

const EARTH_RADIUS_KM = 6371;
const MU_KM3_S2 = 398600.4418;

export function AerospaceReference() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="headline">Aerospace & NASA reference</h1>
        <p className="subhead">
          One-page reference for NASA, Newton&apos;s laws, orbital mechanics, algorithms, rovers, and real-life calculations. For students, scientists, and researchers.
        </p>
        <p className="text-sm text-slate-600 mt-2">
          Jump to: <a href="#nasa" className="text-[var(--accent-cyan)] hover:underline">NASA</a> · <a href="#rovers" className="text-[var(--accent-cyan)] hover:underline">Rovers</a> · <a href="#newton" className="text-[var(--accent-cyan)] hover:underline">Newton</a> · <a href="#orbits" className="text-[var(--accent-cyan)] hover:underline">Orbits</a> · <a href="#algorithms" className="text-[var(--accent-cyan)] hover:underline">Algorithms</a> · <a href="#formulas" className="text-[var(--accent-cyan)] hover:underline">Formulas</a> · <a href="#calculations" className="text-[var(--accent-cyan)] hover:underline">Calculations</a>
        </p>
      </div>

      {/* NASA */}
      <section id="nasa" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">NASA & space exploration</h2>
        <p className="text-sm text-slate-600 mb-4">
          The National Aeronautics and Space Administration (NASA) leads U.S. space exploration. Below are key missions and concepts covered on this site and used in the simulator.
        </p>
        <ul className="space-y-4 text-sm text-slate-700">
          <li>
            <strong>Apollo program:</strong> Landed humans on the Moon (1969–1972). Used Newton&apos;s laws and orbital mechanics to get there and back.
          </li>
          <li>
            <strong>International Space Station (ISS):</strong> Orbiting in Low Earth Orbit (LEO) at ~400 km. Orbital period ~90 minutes. Crew lives in microgravity (free fall).
          </li>
          <li>
            <strong>Mars rovers (e.g. Curiosity, Perseverance):</strong> Robotic missions to Mars. Launched from Earth using rockets; travel and landing use the same physics (gravity, orbits, thrust).
          </li>
          <li>
            <strong>James Webb Space Telescope (JWST):</strong> At the Sun–Earth L2 point. Observes the oldest light in the universe; placement and station-keeping use orbital mechanics.
          </li>
          <li>
            <strong>GPS satellites:</strong> In Medium Earth Orbit (MEO), ~20,200 km. Period ~12 hours. Used for navigation and timing worldwide.
          </li>
          <li>
            <strong>Geostationary satellites:</strong> ~35,786 km. Orbital period = 24 hours; they appear fixed over one spot. Used for weather, TV, communications.
          </li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">
          For official details: <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">nasa.gov</a>.
        </p>
      </section>

      {/* Rovers & real mission data */}
      <section id="rovers" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-gold)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Rovers & real mission data</h2>
        <p className="text-sm text-slate-600 mb-4">
          Real numbers from NASA missions. Use these for reference and to check the same math in our simulator and formulas.
        </p>
        <div className="space-y-6 text-sm">
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">International Space Station (ISS)</h3>
            <ul className="text-slate-700 space-y-1 list-none pl-0">
              <li><strong>Orbit:</strong> LEO, nominal altitude ~408 km (semi-major axis a ≈ 6779 km)</li>
              <li><strong>Orbital period:</strong> T = 2π√(a³/μ) ≈ 92.7 min</li>
              <li><strong>Orbital speed:</strong> v = √(μ/r) ≈ 7.66 km/s</li>
              <li><strong>Inclination:</strong> ~51.6° (enables launches from Baikonur and Florida)</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Source: NASA ISS facts; μ_Earth = 398600.4418 km³/s².</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Mars Science Laboratory – Curiosity rover</h3>
            <ul className="text-slate-700 space-y-1 list-none pl-0">
              <li><strong>Launch:</strong> Nov 2011. Mass ~900 kg (rover + cruise stage).</li>
              <li><strong>Trajectory:</strong> Heliocentric transfer; arrival at Mars Aug 2012.</li>
              <li><strong>Landing (EDL):</strong> Entry, parachute, powered descent; final “sky crane” touchdown. Same physics: F = ma, gravity, drag.</li>
              <li><strong>Mars surface:</strong> g_Mars ≈ 3.71 m/s² (≈0.38 g_Earth). Weight on Mars = mass × 3.71 N/kg.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">NASA MSL mission; gravity from Mars radius and mass.</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Mars 2020 – Perseverance rover</h3>
            <ul className="text-slate-700 space-y-1 list-none pl-0">
              <li><strong>Launch:</strong> Jul 2020. Rover mass ~1025 kg; total landed mass ~1 ton.</li>
              <li><strong>Landing:</strong> Feb 2021, Jezero Crater. EDL (entry, descent, landing) uses same Newtonian mechanics and aerodynamic models.</li>
              <li><strong>Calculation type:</strong> Thrust = force; F = ma gives deceleration; integration gives velocity and position. Real missions use numerical integration (e.g. Runge–Kutta) for high fidelity.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">NASA Mars 2020; algorithms analogous to two-body + thrust/drag.</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-800 mb-2">Apollo (Moon)</h3>
            <ul className="text-slate-700 space-y-1 list-none pl-0">
              <li><strong>Lunar orbit:</strong> ~110 km altitude (lunar radius ≈ 1737 km). Period T = 2π√(a³/μ_Moon) with μ_Moon ≈ 4902.8 km³/s².</li>
              <li><strong>Trans-Earth/Lunar:</strong> Conic sections (elliptic/hyperbolic) in two-body Sun–Earth and Earth–Moon systems; same Keplerian math.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">NASA Apollo; μ values from standard gravitational parameters.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          More: <a href="https://mars.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">mars.nasa.gov</a>, <a href="https://www.nasa.gov/mission_pages/station/main/index.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">NASA ISS</a>.
        </p>
      </section>

      {/* Newton */}
      <section id="newton" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Newton&apos;s laws (how NASA uses them)</h2>
        <p className="text-sm text-slate-600 mb-4">
          Isaac Newton&apos;s laws of motion and his law of gravity are the foundation of orbital mechanics and spaceflight. NASA uses these same laws to design missions and trajectories.
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-800">First law (inertia)</h3>
            <p className="text-slate-700">An object at rest stays at rest; an object in motion stays in motion at constant speed in a straight line unless acted on by a net force.</p>
            <p className="text-slate-500 mt-1">In space: A satellite would move in a straight line forever if gravity didn&apos;t curve its path into an orbit.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Second law (F = ma)</h3>
            <p className="text-slate-700">Force = mass × acceleration. The acceleration of an object is in the direction of the net force and proportional to it.</p>
            <p className="text-slate-500 mt-1">In space: Rocket thrust (force) gives the spacecraft acceleration. Gravity is the force that bends the orbit.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Third law (action and reaction)</h3>
            <p className="text-slate-700">For every action there is an equal and opposite reaction.</p>
            <p className="text-slate-500 mt-1">In space: Earth pulls on the satellite; the satellite pulls on Earth. They orbit their common center of mass (near Earth&apos;s center).</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Law of universal gravitation</h3>
            <p className="text-slate-700 font-mono text-xs bg-slate-100 p-2 rounded">F = G M m / r²</p>
            <p className="text-slate-700 mt-1">The gravitational force between two masses M and m is proportional to the product of the masses and inversely proportional to the square of the distance r between them. G is the gravitational constant.</p>
            <p className="text-slate-500 mt-1">This is why satellites farther from Earth (larger r) feel less pull and can have longer orbital periods.</p>
          </div>
        </div>
        <p className="mt-4">
          <Link href="/learn/newton" className="text-[var(--accent-cyan)] font-medium hover:underline">Newton&apos;s laws page →</Link>
          {" "}
          <Link href="/learn/formulas" className="text-[var(--accent-cyan)] font-medium hover:underline">Formulas & calculators →</Link>
        </p>
      </section>

      {/* Orbital mechanics */}
      <section id="orbits" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Orbital mechanics</h2>
        <p className="text-sm text-slate-600 mb-4">
          An orbit is the path of a body around another under gravity. For Earth satellites we use Keplerian elements and the two-body problem; the simulator on this site uses the same physics.
        </p>
        <h3 className="font-bold text-slate-800 mb-2">Orbit types (by altitude)</h3>
        <ul className="space-y-2 text-sm text-slate-700 mb-4">
          <li><strong>LEO (Low Earth Orbit):</strong> ~200–2,000 km. Example: ISS ~400 km. Period ~90 min. Used for crewed missions, many satellites.</li>
          <li><strong>MEO (Medium Earth Orbit):</strong> ~2,000–35,000 km. Example: GPS ~20,200 km. Period ~12 h.</li>
          <li><strong>GEO (Geostationary Earth Orbit):</strong> ~35,786 km. Period = 24 h (sidereal). Satellite appears fixed over one longitude. Used for weather, TV, comms.</li>
        </ul>
        <h3 className="font-bold text-slate-800 mb-2">Key quantities</h3>
        <ul className="space-y-2 text-sm text-slate-700 mb-4">
          <li><strong>Altitude / height:</strong> Distance above Earth&apos;s surface (km). Often we use semi-major axis a; altitude ≈ a − R_Earth.</li>
          <li><strong>Perigee:</strong> Closest point to Earth (minimum distance).</li>
          <li><strong>Apogee:</strong> Farthest point from Earth (maximum distance).</li>
          <li><strong>Orbital period T:</strong> Time for one complete orbit. For a circular orbit, T = 2π √(a³/μ) where μ = G M_Earth.</li>
        </ul>
        <h3 className="font-bold text-slate-800 mb-2">Kepler&apos;s laws (simplified)</h3>
        <ul className="space-y-1 text-sm text-slate-700 mb-4 list-disc pl-5">
          <li>Planets/satellites move in ellipses with the central body at one focus.</li>
          <li>Equal areas are swept in equal times (angular momentum).</li>
          <li>T² ∝ a³: period squared is proportional to semi-major axis cubed.</li>
        </ul>
        <p className="mt-4">
          <Link href="/simulator" className="text-[var(--accent-cyan)] font-medium hover:underline">Try the Simulator →</Link>
          {" "}
          <Link href="/guide" className="text-[var(--accent-cyan)] font-medium hover:underline">Simulator guide →</Link>
        </p>
      </section>

      {/* Algorithms */}
      <section id="algorithms" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Algorithms used on this site</h2>
        <p className="text-sm text-slate-600 mb-4">
          The simulator and orbit math use standard astrodynamics algorithms: two-body dynamics, Keplerian elements, and conversions between position/velocity and elements. These are the same types used in real mission design and in NASA tools.
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-800">Two-body problem (Keplerian motion)</h3>
            <p className="text-slate-700">We assume only Earth and the satellite (point masses). The orbit is a conic (ellipse for closed orbits). No drag, no thrust, no third-body (Moon/Sun) perturbations in the simulator — so results match textbook formulas.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Keplerian elements ↔ Cartesian state</h3>
            <p className="text-slate-700 mb-1">We use the standard 6 elements: semi-major axis a (km), eccentricity e, inclination i, RAAN Ω, argument of periapsis ω, true anomaly ν. Conversions:</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li><strong>Keplerian → Cartesian:</strong> Position and velocity in the perifocal frame (PQW) from r = a(1−e²)/(1+e cos ν) and the vis-viva equation; then rotation by i, Ω, ω into ECI (Earth-centered inertial).</li>
              <li><strong>Cartesian → Keplerian:</strong> From position r and velocity v we compute angular momentum h = r × v, eccentricity vector e, energy; then a, e, i, Ω, ω, ν. (Same as in Vallado and other references.)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Orbit propagation (time step)</h3>
            <p className="text-slate-700">We propagate by updating <strong>true anomaly</strong> using mean motion n = √(μ/a³): ν(t+Δt) = ν(t) + n·Δt. Then convert back to Cartesian. This is exact for the two-body problem (no numerical integration). Real missions often use numerical integrators (e.g. Runge–Kutta) when including thrust, drag, or third bodies.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Constants</h3>
            <p className="text-slate-700 font-mono text-xs bg-slate-100 p-2 rounded">μ_Earth = 398600.4418 km³/s², R_Earth = 6371 km</p>
            <p className="text-slate-500 text-xs mt-1">Standard gravitational parameter and Earth radius; consistent with the formulas above and the simulator.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          For full derivations see e.g. Vallado, <em>Fundamentals of Astrodynamics and Applications</em>; NASA SPICE or mission design docs use the same formulations.
        </p>
      </section>

      {/* Key formulas */}
      <section id="formulas" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Key formulas</h2>
        <p className="text-sm text-slate-600 mb-4">
          These are the same formulas used in the simulator and in real mission design. Earth radius R_Earth ≈ {EARTH_RADIUS_KM} km; μ = G M_Earth ≈ {MU_KM3_S2.toLocaleString()} km³/s².
        </p>
        <div className="space-y-4 text-sm font-mono-tech">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="font-bold text-slate-800">Newton&apos;s second law</p>
            <p className="text-slate-700">F = m a</p>
            <p className="text-slate-500 text-xs font-sans mt-1">Force (N), mass (kg), acceleration (m/s²).</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="font-bold text-slate-800">Gravitational force (magnitude)</p>
            <p className="text-slate-700">F = G M m / r² = μ m / r²</p>
            <p className="text-slate-500 text-xs font-sans mt-1">For a satellite of mass m at distance r from Earth; μ = G M_Earth.</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="font-bold text-slate-800">Orbital period (circular or elliptic)</p>
            <p className="text-slate-700">T = 2π √(a³/μ)</p>
            <p className="text-slate-500 text-xs font-sans mt-1">T in seconds; a = semi-major axis in km. With a = R_Earth + altitude, you get period in minutes/hours.</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="font-bold text-slate-800">Orbital speed (circular orbit)</p>
            <p className="text-slate-700">v = √(μ/r)</p>
            <p className="text-slate-500 text-xs font-sans mt-1">Speed in km/s when r is in km. For elliptic orbits, speed varies between perigee (fastest) and apogee (slowest).</p>
          </div>
        </div>
        <p className="mt-4">
          <Link href="/learn/formulas" className="text-[var(--accent-cyan)] font-medium hover:underline">Formulas playground (calculators & quiz) →</Link>
        </p>
      </section>

      {/* Real-life calculations */}
      <section id="calculations" className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-gold)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Real-life calculations (worked examples)</h2>
        <p className="text-sm text-slate-600 mb-4">
          Same math as the simulator and as used in mission design. Numbers are real; you can reproduce them with a calculator.
        </p>
        <div className="space-y-6 text-sm font-mono-tech">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-800 font-sans mb-2">ISS: orbital period</h3>
            <p className="text-slate-700">a = 6371 + 408 = 6779 km. T = 2π √(a³/μ) = 2π √(6779³ / 398600.4418) s ≈ 5562 s ≈ <strong>92.7 min</strong>.</p>
            <p className="text-slate-500 text-xs font-sans mt-1">So the ISS completes about 15.5 orbits per day — matches NASA&apos;s “~90 minutes per orbit.”</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-800 font-sans mb-2">ISS: orbital speed</h3>
            <p className="text-slate-700">r ≈ 6779 km. v = √(μ/r) = √(398600.4418 / 6779) ≈ <strong>7.66 km/s</strong>.</p>
            <p className="text-slate-500 text-xs font-sans mt-1">This is the speed you see in the simulator for a 400 km LEO orbit.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-800 font-sans mb-2">GPS (MEO): period and speed</h3>
            <p className="text-slate-700">a ≈ 6371 + 20200 = 26571 km. T = 2π √(a³/μ) ≈ 43082 s ≈ <strong>11.97 h</strong>. v = √(μ/r) ≈ <strong>3.87 km/s</strong>.</p>
            <p className="text-slate-500 text-xs font-sans mt-1">Lower speed than LEO because the orbit is higher; period ~12 h as used by GPS constellation.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-800 font-sans mb-2">Geostationary (GEO): altitude</h3>
            <p className="text-slate-700">Require T = 24 h = 86400 s (sidereal). T² = 4π² a³/μ ⇒ a³ = μ T²/(4π²) ⇒ a ≈ 42164 km. Altitude = a − R_Earth ≈ <strong>35786 km</strong>.</p>
            <p className="text-slate-500 text-xs font-sans mt-1">Standard GEO altitude; same as in our GEO preset.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-800 font-sans mb-2">Rover weight on Mars (F = ma)</h3>
            <p className="text-slate-700">Perseverance mass m ≈ 1025 kg. g_Mars ≈ 3.71 m/s². Weight = F = m g ≈ 1025 × 3.71 ≈ <strong>3803 N</strong> (on Earth same mass would weigh ~10045 N).</p>
            <p className="text-slate-500 text-xs font-sans mt-1">Same F = ma; different g because Mars has less mass than Earth.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
        <h2 className="font-bold text-slate-800 mb-2">Further reading &amp; sources</h2>
        <p className="mb-2">
          This site uses real constants and formulas consistent with NASA and standard astrodynamics. For primary sources and technical details:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">NASA.gov</a> — missions, images, education, press kits (real mission data)</li>
          <li><a href="https://mars.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">mars.nasa.gov</a> — Mars rovers (Curiosity, Perseverance), EDL, facts</li>
          <li><a href="https://spaceplace.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">NASA Space Place</a> — space science for everyone</li>
          <li>Vallado, <em>Fundamentals of Astrodynamics and Applications</em> — algorithms and derivations</li>
        </ul>
      </section>

      <p className="text-center">
        <Link href="/research" className="text-[var(--accent-cyan)] font-medium hover:underline">← Back to Research & topics</Link>
      </p>
    </div>
  );
}
