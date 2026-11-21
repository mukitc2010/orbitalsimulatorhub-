import { Link } from "wouter";

export function QuantumPhysicsNASA() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Quantum Physics in NASA Programs</h1>
        <p className="subhead">
          Discover how NASA uses quantum physics in real missions: atomic clocks for GPS and deep space navigation, quantum sensors, quantum communication, and future quantum computing applications.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Overview</h2>
        <p className="text-slate-700">
          NASA relies on quantum physics every day! From GPS satellites with atomic clocks to future quantum computers, quantum mechanics enables NASA's most advanced technologies. Learn how quantum physics makes space exploration possible.
        </p>
      </div>

      <section className="space-y-8">
        {/* Atomic Clocks */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⏰ Atomic Clocks: The Quantum Foundation of Navigation</h2>
          <p className="text-slate-700 mb-4">
            Every GPS satellite has atomic clocks based on quantum transitions. Without quantum physics, GPS wouldn't work!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-200 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">How Atomic Clocks Work</h3>
            <p className="text-slate-700 mb-3">
              Atomic clocks use quantum transitions between energy levels:
            </p>
            <ol className="text-slate-700 space-y-2 mb-3">
              <li>1. <strong>Cesium atoms</strong> are exposed to microwave radiation</li>
              <li>2. When frequency matches quantum transition (9,192,631,770 Hz), atoms absorb energy</li>
              <li>3. This frequency is used to keep time - incredibly precise!</li>
              <li>4. Quantum mechanics ensures this frequency is constant</li>
            </ol>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              E = hf = h × 9,192,631,770 Hz
            </div>
            <p className="text-sm text-slate-700">
              Where h = Planck's constant, f = transition frequency. This quantum transition is the same everywhere in the universe!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">GPS Atomic Clocks</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Type:</strong> Cesium or Rubidium atomic clocks</li>
                <li>• <strong>Accuracy:</strong> 1 second in 100 million years</li>
                <li>• <strong>Why needed:</strong> 1 microsecond error = 300 meter GPS error</li>
                <li>• <strong>On each satellite:</strong> Multiple clocks for redundancy</li>
                <li>• <strong>Quantum basis:</strong> Hyperfine structure transitions</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Deep Space Atomic Clocks</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>NASA mission:</strong> Deep Space Atomic Clock (DSAC)</li>
                <li>• <strong>Type:</strong> Mercury ion trap clock</li>
                <li>• <strong>Accuracy:</strong> 10x better than GPS clocks!</li>
                <li>• <strong>Use:</strong> Autonomous navigation for Mars missions</li>
                <li>• <strong>Benefit:</strong> Reduces need for Earth-based tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quantum Sensors */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📡 Quantum Sensors: Ultra-Precise Measurements</h2>
          <p className="text-slate-700 mb-4">
            NASA uses quantum sensors for gravity mapping, magnetic field detection, and precise measurements impossible with classical sensors.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Gravimeters</h3>
              <p className="text-sm text-slate-700 mb-2">
                Measure tiny gravity variations using atom interferometry:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Principle:</strong> Atoms fall in gravity field, quantum interference measures acceleration</li>
                <li>• <strong>Precision:</strong> Can detect 1 part in 10⁹ gravity variations</li>
                <li>• <strong>NASA use:</strong> Map Earth's gravity field (GRACE mission), detect underground water, monitor ice sheets</li>
                <li>• <strong>Future:</strong> Detect gravitational waves in space</li>
              </ul>
              <div className="bg-white rounded p-2 mt-2 font-mono text-xs">
                Δg/g = (λ/2π) × (Δφ/L)
              </div>
              <p className="text-xs text-slate-600 mt-1">Where Δφ = phase shift, L = interferometer length</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Magnetometers</h3>
              <p className="text-sm text-slate-700 mb-2">
                Detect magnetic fields using quantum effects:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Principle:</strong> Quantum spin precession in magnetic field</li>
                <li>• <strong>Precision:</strong> Can detect fields 1 million times weaker than Earth's</li>
                <li>• <strong>NASA use:</strong> Study planetary magnetic fields, detect magnetic anomalies</li>
                <li>• <strong>Missions:</strong> MAVEN (Mars), Juno (Jupiter), Cassini (Saturn)</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Atom Interferometry</h3>
              <p className="text-sm text-slate-700 mb-2">
                Use wave nature of atoms for precise measurements:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Principle:</strong> De Broglie wavelength interference</li>
                <li>• <strong>Applications:</strong> Gravity, rotation, acceleration measurements</li>
                <li>• <strong>NASA research:</strong> Cold Atom Lab on ISS</li>
                <li>• <strong>Future:</strong> Quantum gyroscopes for navigation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quantum Communication */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📶 Quantum Communication: Secure Space Links</h2>
          <p className="text-slate-700 mb-4">
            NASA researches quantum communication for unhackable, secure links between Earth and spacecraft.
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <h3 className="font-bold text-slate-800 mb-3">Quantum Key Distribution (QKD)</h3>
            <p className="text-slate-700 mb-3">
              Uses quantum entanglement to create unbreakable encryption:
            </p>
            <ol className="text-slate-700 space-y-2 mb-3">
              <li>1. <strong>Entangled photons</strong> created and sent to sender and receiver</li>
              <li>2. Measuring one photon instantly determines the other (quantum correlation)</li>
              <li>3. Any eavesdropping disturbs the quantum state - detectable!</li>
              <li>4. Creates secure encryption key</li>
            </ol>
            <div className="bg-white rounded p-3 text-sm">
              <p className="font-semibold mb-2">NASA Applications:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Secure command links</strong> to spacecraft</li>
                <li>• <strong>Protect scientific data</strong> from interception</li>
                <li>• <strong>Future quantum internet</strong> for space missions</li>
                <li>• <strong>NASA Quantum Communication Testbed:</strong> Testing QKD technology</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quantum Computing */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">💻 Quantum Computing: NASA's Future</h2>
          <p className="text-slate-700 mb-4">
            NASA partners with Google, IBM, and others to develop quantum computers for space applications.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Mission Optimization</h3>
              <p className="text-sm text-slate-700 mb-2">
                Quantum algorithms can solve complex optimization problems:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Route planning:</strong> Find optimal paths for multiple spacecraft</li>
                <li>• <strong>Resource allocation:</strong> Optimize fuel, power, crew schedules</li>
                <li>• <strong>Trajectory design:</strong> Calculate best orbits and transfers</li>
                <li>• <strong>Example:</strong> Traveling salesman problem for Mars mission planning</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Materials Science</h3>
              <p className="text-sm text-slate-700 mb-2">
                Simulate quantum systems to design better materials:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Superconductors:</strong> Design materials for quantum sensors</li>
                <li>• <strong>Lightweight alloys:</strong> Stronger spacecraft materials</li>
                <li>• <strong>Heat shields:</strong> Better thermal protection</li>
                <li>• <strong>NASA use:</strong> Quantum simulators on classical computers already help</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Climate & Earth Science</h3>
              <p className="text-sm text-slate-700 mb-2">
                Model complex Earth systems:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Climate models:</strong> Simulate atmosphere, oceans, ice</li>
                <li>• <strong>Weather prediction:</strong> More accurate forecasts</li>
                <li>• <strong>Carbon cycle:</strong> Understand climate change</li>
                <li>• <strong>Quantum advantage:</strong> Handle many variables simultaneously</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Drug Discovery</h3>
              <p className="text-sm text-slate-700 mb-2">
                Design medicines for astronauts:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Molecular simulation:</strong> Model drug-protein interactions</li>
                <li>• <strong>Radiation protection:</strong> Develop anti-radiation drugs</li>
                <li>• <strong>Bone loss:</strong> Counteract effects of microgravity</li>
                <li>• <strong>Quantum chemistry:</strong> Accurate molecular calculations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Specific NASA Missions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🛰️ NASA Missions Using Quantum Physics</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">GPS Constellation</h3>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Quantum technology:</strong> Atomic clocks on every satellite
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• 24+ satellites, each with multiple atomic clocks</li>
                <li>• Quantum transitions keep time accurate</li>
                <li>• Enables GPS navigation worldwide</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Deep Space Atomic Clock (DSAC)</h3>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Launched:</strong> 2019, tested on spacecraft
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Mercury ion trap quantum clock</li>
                <li>• 10x more stable than GPS clocks</li>
                <li>• Enables autonomous deep space navigation</li>
                <li>• Future: Mars missions won't need Earth tracking</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-slate-800 mb-2">Cold Atom Lab (CAL)</h3>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Location:</strong> International Space Station
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Creates Bose-Einstein condensates (quantum state)</li>
                <li>• Studies quantum physics in microgravity</li>
                <li>• Tests quantum sensors and interferometers</li>
                <li>• Research for future quantum technologies</li>
              </ul>
            </div>

            <div className="bg-[var(--accent-gold)]/15 rounded-lg p-4 border border-[var(--accent-gold)]/40">
              <h3 className="font-bold text-slate-800 mb-2">GRACE & GRACE-FO</h3>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Quantum technology:</strong> Precise gravity measurements
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Map Earth's gravity field</li>
                <li>• Detect water movement, ice sheet changes</li>
                <li>• Uses quantum sensors (accelerometers)</li>
                <li>• Climate monitoring from space</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-slate-800 mb-2">LIGO (Gravitational Wave Detection)</h3>
              <p className="text-sm text-slate-700 mb-2">
                <strong>NASA partnership:</strong> Detects ripples in spacetime
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Uses quantum interferometry</li>
                <li>• Measures distances 1/10,000 width of a proton!</li>
                <li>• Detects merging black holes, neutron stars</li>
                <li>• Quantum mechanics enables this precision</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Applications */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔮 Future Quantum Technologies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Internet</h3>
              <p className="text-sm text-slate-700">
                Secure quantum communication network connecting Earth, Moon, Mars, and spacecraft. Enables instant, unhackable data transfer.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Navigation</h3>
              <p className="text-sm text-slate-700">
                Quantum gyroscopes and accelerometers for precise spacecraft navigation without GPS. Works anywhere in solar system.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Imaging</h3>
              <p className="text-sm text-slate-700">
                Quantum-enhanced cameras for better Earth observation, exoplanet detection, and deep space imaging.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum AI</h3>
              <p className="text-sm text-slate-700">
                Quantum machine learning for faster data analysis from telescopes, rovers, and satellites.
              </p>
            </div>
          </div>
        </div>

        {/* The Math Behind It */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 The Math: Why Quantum Works</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Quantum Superposition in Atomic Clocks</h3>
            <p className="text-slate-700 mb-3">
              Atomic clocks rely on quantum states:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              |ψ⟩ = α|ground⟩ + β|excited⟩
            </div>
            <p className="text-sm text-slate-700 mb-3">
              The atom can be in superposition of ground and excited states. When microwave frequency matches transition energy:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              E_excited - E_ground = hf
            </div>
            <p className="text-sm text-slate-700">
              This frequency is constant (quantum property), making atomic clocks incredibly accurate!
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 mt-4">
            <h3 className="font-bold text-slate-800 mb-3">Quantum Interference in Sensors</h3>
            <p className="text-slate-700 mb-3">
              Atom interferometers use wave nature:
            </p>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              ψ_total = ψ₁ + ψ₂ (superposition)
              <br />
              Probability = |ψ_total|² = |ψ₁|² + |ψ₂|² + 2Re(ψ₁*ψ₂)
            </div>
            <p className="text-sm text-slate-700">
              The interference term (2Re(ψ₁*ψ₂)) creates sensitivity to tiny changes in gravity, acceleration, or rotation!
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Learn More!</h2>
          <p className="text-slate-700 mb-4">
            Quantum physics enables NASA's most advanced technologies. Explore how it all connects!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/quantum-physics" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Quantum Physics Basics →
              </Link>
            <Link href="/learn/how-gps-works" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                GPS & Atomic Clocks →
              </Link>
            <Link href="/learn/astrophysics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Astrophysics →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/quantum-physics" className="text-[var(--accent-cyan)] hover:underline">Quantum Physics</Link>
            <span>·</span>
            <Link href="/learn/how-gps-works" className="text-[var(--accent-cyan)] hover:underline">How GPS Works</Link>
            <span>·</span>
            <Link href="/learn/astrophysics" className="text-[var(--accent-cyan)] hover:underline">Astrophysics</Link>
            <span>·</span>
            <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formulas</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
