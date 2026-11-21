import { Link } from "wouter";

export function QuantumPhysics() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Quantum Physics</h1>
        <p className="subhead">
          Learn about quantum mechanics, quantum computing, and how NASA uses quantum physics in space missions. Discover the mathematics behind quantum phenomena.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">⚛️ What is Quantum Physics?</h2>
        <p className="text-slate-700">
          Quantum physics describes the behavior of matter and energy at the smallest scales (atoms, electrons, photons). It's strange but real - and NASA uses it in atomic clocks, quantum sensors, and future quantum computers!
        </p>
      </div>

      <section className="space-y-8">
        {/* Wave-Particle Duality */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌊 Wave-Particle Duality</h2>
          <p className="text-slate-700 mb-4">
            Quantum objects behave as both waves and particles! Light can be a wave (interference) or particle (photons). Electrons too!
          </p>

          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">De Broglie Wavelength</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              λ = h/p = h/(mv)
            </div>
            <p className="text-slate-700 mb-3">
              Every particle has a wavelength:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>λ</strong> = wavelength</li>
              <li>• <strong>h</strong> = Planck's constant = 6.626 × 10⁻³⁴ J·s</li>
              <li>• <strong>p</strong> = momentum = mv</li>
              <li>• <strong>m</strong> = mass, <strong>v</strong> = velocity</li>
            </ul>
            <div className="bg-blue-50 rounded p-3 text-sm border border-blue-200">
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Electron at 1 eV:</strong> λ ≈ 1.2 nm (nanometer scale!)</li>
                <li>• <strong>Baseball:</strong> λ ≈ 10⁻³⁴ m (too small to detect)</li>
                <li>• <strong>Why it matters:</strong> Electron microscopes use this wave nature!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Heisenberg Uncertainty Principle */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📏 Heisenberg Uncertainty Principle</h2>
          <p className="text-slate-700 mb-4">
            You cannot know both position and momentum exactly at the same time! This is fundamental to quantum mechanics.
          </p>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-5 border-2 border-red-200">
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              Δx × Δp ≥ ħ/2
            </div>
            <p className="text-slate-700 mb-3">
              Where:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>Δx</strong> = uncertainty in position</li>
              <li>• <strong>Δp</strong> = uncertainty in momentum</li>
              <li>• <strong>ħ</strong> = h/(2π) = reduced Planck constant</li>
            </ul>
            <div className="bg-slate-100 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Implications:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• More precisely you know position → less precisely you know momentum</li>
                <li>• This is NOT measurement error - it's fundamental to nature!</li>
                <li>• Atoms can't collapse because electrons can't be localized</li>
                <li>• Quantum sensors use this for ultra-precise measurements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schrödinger Equation */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Schrödinger Equation</h2>
          <p className="text-slate-700 mb-4">
            The fundamental equation of quantum mechanics! Describes how quantum states evolve.
          </p>

          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Time-Dependent Schrödinger Equation</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              iħ(∂ψ/∂t) = Ĥψ
            </div>
            <p className="text-slate-700 mb-3">
              Where:
            </p>
            <ul className="text-sm text-slate-700 space-y-1 mb-3">
              <li>• <strong>ψ</strong> = wavefunction (describes quantum state)</li>
              <li>• <strong>Ĥ</strong> = Hamiltonian operator (total energy)</li>
              <li>• <strong>i</strong> = imaginary unit</li>
            </ul>

            <h3 className="font-bold text-slate-800 mb-3 mt-4">Time-Independent (for stationary states)</h3>
            <div className="bg-white rounded p-3 mb-3 font-mono text-sm">
              Ĥψ = Eψ
            </div>
            <p className="text-sm text-slate-700">
              Where E = energy eigenvalue. This gives quantized energy levels in atoms!
            </p>
          </div>
        </div>

        {/* Quantum States & Superposition */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌀 Quantum Superposition & Entanglement</h2>
          <p className="text-slate-700 mb-4">
            Quantum objects can be in multiple states simultaneously! This enables quantum computing.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Superposition</h3>
              <p className="text-sm text-slate-700 mb-2">
                A quantum system can be in multiple states at once:
              </p>
              <div className="bg-white rounded p-2 font-mono text-xs mb-2">
                |ψ⟩ = α|0⟩ + β|1⟩
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Where |α|² + |β|² = 1 (probability normalization)
              </p>
              <p className="text-xs text-slate-700">
                <strong>Example:</strong> Electron spin can be up AND down simultaneously until measured!
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Entanglement</h3>
              <p className="text-sm text-slate-700 mb-2">
                Two particles become correlated - measuring one instantly affects the other:
              </p>
              <div className="bg-white rounded p-2 font-mono text-xs mb-2">
                |ψ⟩ = (|00⟩ + |11⟩)/√2
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Bell state: measuring one qubit determines the other instantly
              </p>
              <p className="text-xs text-slate-700">
                <strong>NASA use:</strong> Quantum communication, secure encryption
              </p>
            </div>
          </div>
        </div>

        {/* Quantum Computing */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">💻 Quantum Computing</h2>
          <p className="text-slate-700 mb-4">
            Quantum computers use superposition and entanglement to solve problems exponentially faster than classical computers!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-200">
            <h3 className="font-bold text-slate-800 mb-3">Qubits vs Bits</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Classical Bit:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• State: 0 OR 1</li>
                  <li>• 1 bit = 1 state</li>
                  <li>• N bits = 2^N states (one at a time)</li>
                </ul>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Quantum Qubit:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• State: 0 AND 1 (superposition)</li>
                  <li>• 1 qubit = infinite states</li>
                  <li>• N qubits = 2^N states simultaneously!</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-100 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Example:</p>
              <p className="text-slate-700">
                50 qubits can represent 2⁵⁰ ≈ 1 quadrillion states simultaneously! This enables:
              </p>
              <ul className="text-slate-700 mt-2 space-y-1">
                <li>• Factor large numbers (cryptography)</li>
                <li>• Simulate quantum systems (chemistry, materials)</li>
                <li>• Optimize complex problems (mission planning)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* NASA Applications */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 How NASA Uses Quantum Physics</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Atomic Clocks (GPS, Deep Space)</h3>
              <p className="text-sm text-slate-700 mb-2">
                GPS satellites use atomic clocks based on quantum transitions:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Cesium atoms:</strong> Hyperfine transition at 9.192 GHz</li>
                <li>• <strong>Accuracy:</strong> 1 second in 100 million years!</li>
                <li>• <strong>Why needed:</strong> 1 microsecond error = 300 meter GPS error</li>
                <li>• <strong>Deep space:</strong> Even more precise clocks for navigation</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Sensors</h3>
              <p className="text-sm text-slate-700 mb-2">
                Ultra-precise measurements using quantum effects:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Gravimeters:</strong> Measure gravity variations (geology, resource detection)</li>
                <li>• <strong>Magnetometers:</strong> Detect magnetic fields (planetary exploration)</li>
                <li>• <strong>Interferometers:</strong> Measure tiny distances (LIGO for gravitational waves)</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Communication</h3>
              <p className="text-sm text-slate-700 mb-2">
                Secure communication using quantum entanglement:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Quantum key distribution:</strong> Unhackable encryption</li>
                <li>• <strong>Future:</strong> Quantum internet for space missions</li>
                <li>• <strong>Benefit:</strong> Any eavesdropping is detectable</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Computing (Future)</h3>
              <p className="text-sm text-slate-700 mb-2">
                NASA researches quantum computing for:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Mission optimization:</strong> Route planning, resource allocation</li>
                <li>• <strong>Materials science:</strong> Design better spacecraft materials</li>
                <li>• <strong>Climate modeling:</strong> Simulate Earth's climate</li>
                <li>• <strong>Drug discovery:</strong> Design medicines for astronauts</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Quantum Imaging</h3>
              <p className="text-sm text-slate-700 mb-2">
                Using quantum effects for better imaging:
              </p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>Ghost imaging:</strong> Image objects with entangled photons</li>
                <li>• <strong>Quantum radar:</strong> Detect stealth objects</li>
                <li>• <strong>LIDAR:</strong> Precise distance measurements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Formulas */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📐 Key Quantum Physics Formulas</h2>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <div className="space-y-4">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Planck-Einstein Relation:</p>
                <div className="font-mono text-sm">E = hf = ħω</div>
                <p className="text-xs text-slate-600 mt-1">Energy of photon</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">De Broglie Wavelength:</p>
                <div className="font-mono text-sm">λ = h/p</div>
                <p className="text-xs text-slate-600 mt-1">Wavelength of matter</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Heisenberg Uncertainty:</p>
                <div className="font-mono text-sm">Δx × Δp ≥ ħ/2</div>
                <p className="text-xs text-slate-600 mt-1">Fundamental limit</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Schrödinger Equation:</p>
                <div className="font-mono text-sm">iħ(∂ψ/∂t) = Ĥψ</div>
                <p className="text-xs text-slate-600 mt-1">Quantum state evolution</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-slate-800 mb-1">Quantum Energy Levels:</p>
                <div className="font-mono text-sm">E_n = -13.6 eV / n² (hydrogen)</div>
                <p className="text-xs text-slate-600 mt-1">Quantized atomic energy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Constants */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔢 Important Constants</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-800 mb-2">Planck's Constant:</p>
                <div className="font-mono text-sm bg-white rounded p-2 mb-2">h = 6.626 × 10⁻³⁴ J·s</div>
                <div className="font-mono text-sm bg-white rounded p-2">ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s</div>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-2">Speed of Light:</p>
                <div className="font-mono text-sm bg-white rounded p-2 mb-2">c = 2.998 × 10⁸ m/s</div>
                <p className="text-xs text-slate-600">Used in E = mc², relativity</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-2">Electron Charge:</p>
                <div className="font-mono text-sm bg-white rounded p-2">e = 1.602 × 10⁻¹⁹ C</div>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-2">Electron Mass:</p>
                <div className="font-mono text-sm bg-white rounded p-2">m_e = 9.109 × 10⁻³¹ kg</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Learn More!</h2>
          <p className="text-slate-700 mb-4">
            Quantum physics works alongside classical physics. Learn about orbital mechanics and how NASA combines both!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/learn/quantum-physics-nasa" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Quantum Physics in NASA →
              </Link>
            <Link href="/learn/astrophysics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Astrophysics →
              </Link>
            <Link href="/learn/how-gps-works" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                GPS & Atomic Clocks →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/quantum-physics-nasa" className="text-[var(--accent-cyan)] hover:underline">Quantum Physics in NASA</Link>
            <span>·</span>
            <Link href="/learn/astrophysics" className="text-[var(--accent-cyan)] hover:underline">Astrophysics</Link>
            <span>·</span>
            <Link href="/learn/how-gps-works" className="text-[var(--accent-cyan)] hover:underline">GPS & Atomic Clocks</Link>
            <span>·</span>
            <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formulas</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
