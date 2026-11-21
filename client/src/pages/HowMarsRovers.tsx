import { Link } from "wouter";

export function HowMarsRovers() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">How Mars Rovers Work</h1>
        <p className="subhead">
          Discover how NASA's Mars rovers navigate the Red Planet. Learn about landing sequences, navigation systems, science instruments, and how they communicate with Earth.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">🤖 What is a Mars Rover?</h2>
        <p className="text-slate-700">
          Mars rovers are robotic vehicles sent to explore Mars. They're like remote-controlled cars that can drive around, take pictures, collect samples, and do science experiments millions of kilometers away from Earth!
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 Getting to Mars: The Journey</h2>
          <p className="text-slate-700 mb-4">
            Getting a rover to Mars is incredibly complex. It takes about 7 months to travel from Earth to Mars, and the landing is the most dangerous part - called "7 Minutes of Terror"!
          </p>
          <div className="bg-slate-50 rounded-lg p-5 space-y-3">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">1. Launch from Earth</h3>
              <p className="text-sm text-slate-700">Rocket launches rover into space. Uses same physics as launching satellites!</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">2. Cruise to Mars</h3>
              <p className="text-sm text-slate-700">7-month journey through space. Rover is in "cruise stage" - protected and powered.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">3. Entry, Descent, Landing (EDL)</h3>
              <p className="text-sm text-slate-700">The "7 Minutes of Terror" - most critical phase. Must slow from 20,000 km/h to 0 km/h safely.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">💥 Entry, Descent, Landing (EDL)</h2>
          <p className="text-slate-700 mb-4">
            The landing sequence is incredibly complex and happens automatically - Earth is too far away for real-time control!
          </p>
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 1: Atmospheric Entry</h3>
              <p className="text-sm text-slate-700 mb-2">
                Rover enters Mars atmosphere at ~20,000 km/h. Heat shield protects it from temperatures up to 2,100°C (3,800°F)!
              </p>
              <p className="text-xs text-slate-600">
                <strong>Physics:</strong> Atmospheric drag slows the rover (Newton's 2nd Law: F = ma)
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 2: Parachute Deployment</h3>
              <p className="text-sm text-slate-700 mb-2">
                Supersonic parachute (21.5 m diameter!) deploys at ~11 km altitude. Slows rover to ~1,000 km/h.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Physics:</strong> Drag force from parachute (F = ½ρv²CdA)
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 3: Heat Shield Separation</h3>
              <p className="text-sm text-slate-700 mb-2">
                Heat shield drops away. Rover is now exposed but protected by backshell.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 4: Powered Descent</h3>
              <p className="text-sm text-slate-700 mb-2">
                Rocket engines fire to slow descent. Rover uses radar to measure distance to ground and adjust speed.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Physics:</strong> Thrust counteracts gravity (Newton's 3rd Law: action-reaction)
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-2">Step 5: Sky Crane (Perseverance/Curiosity)</h3>
              <p className="text-sm text-slate-700 mb-2">
                Descent stage hovers above ground. Lowers rover on cables. Once rover touches down, cables cut and descent stage flies away.
              </p>
              <p className="text-xs text-slate-600">
                <strong>Why:</strong> Prevents dust from engines damaging rover
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧭 Navigation Systems</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Visual Navigation</h3>
              <p className="text-sm text-slate-700 mb-2">
                Multiple cameras take pictures of the terrain. Computer analyzes images to:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Identify obstacles (rocks, slopes)</li>
                <li>• Find safe paths</li>
                <li>• Track movement</li>
                <li>• Create 3D maps</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Inertial Measurement Unit (IMU)</h3>
              <p className="text-sm text-slate-700 mb-2">
                Sensors measure acceleration and rotation. Tracks rover's orientation and movement:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Tilt and orientation</li>
                <li>• Acceleration</li>
                <li>• Rotation rate</li>
                <li>• Works like a gyroscope</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Wheel Odometry</h3>
              <p className="text-sm text-slate-700 mb-2">
                Tracks how far wheels have turned. Estimates distance traveled:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Counts wheel rotations</li>
                <li>• Calculates distance</li>
                <li>• Accounts for wheel slip</li>
                <li>• Used with visual navigation</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">Orbital Images</h3>
              <p className="text-sm text-slate-700 mb-2">
                Uses images from Mars orbiters to plan routes:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• High-resolution maps</li>
                <li>• Route planning</li>
                <li>• Science target selection</li>
                <li>• Long-term navigation</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 Science Instruments</h2>
          <p className="text-slate-700 mb-4">
            Rovers carry sophisticated instruments to study Mars:
          </p>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Cameras</h3>
              <p className="text-sm text-slate-700">Multiple cameras for navigation, science imaging, and close-up views. Some can see in different wavelengths (infrared, ultraviolet).</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Spectrometers</h3>
              <p className="text-sm text-slate-700">Analyze chemical composition of rocks and soil. Can identify minerals and search for signs of past life.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Drills & Sample Collection</h3>
              <p className="text-sm text-slate-700">Drill into rocks, collect samples, and store them for future return to Earth (Perseverance).</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-1">Weather Station</h3>
              <p className="text-sm text-slate-700">Measure temperature, pressure, wind speed, and humidity on Mars.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">📡 Communication with Earth</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">How Rovers Talk to Earth:</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Direct Communication:</strong> Rovers can send signals directly to Earth, but this is slow (limited bandwidth).</li>
              <li><strong>Relay Satellites:</strong> Most communication goes through Mars orbiters (like MAVEN, Mars Reconnaissance Orbiter) which relay data to Earth. Much faster!</li>
              <li><strong>Time Delay:</strong> Signals take 5-20 minutes to travel from Mars to Earth (depending on planet positions).</li>
              <li><strong>Autonomous Operation:</strong> Because of the delay, rovers must operate autonomously. Scientists send commands, rover executes them independently.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🤖 Famous Mars Rovers</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Perseverance (2021 - Present)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Mass:</strong> 1,025 kg</li>
                <li>• <strong>Landing:</strong> Jezero Crater (ancient river delta)</li>
                <li>• <strong>Mission:</strong> Search for signs of ancient life, collect samples for return to Earth</li>
                <li>• <strong>Special:</strong> First helicopter (Ingenuity) on Mars!</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Curiosity (2012 - Present)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Mass:</strong> 900 kg</li>
                <li>• <strong>Landing:</strong> Gale Crater</li>
                <li>• <strong>Mission:</strong> Study Mars' climate and geology, search for habitable environments</li>
                <li>• <strong>Special:</strong> Nuclear-powered (RTG), still operating after 10+ years!</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Opportunity (2004 - 2018)</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Mass:</strong> 185 kg</li>
                <li>• <strong>Mission:</strong> Designed for 90 days, operated for 15 years!</li>
                <li>• <strong>Achievement:</strong> Traveled 45 km (longest distance on another planet)</li>
                <li>• <strong>End:</strong> Lost contact during dust storm</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🧮 The Math Behind Rovers</h2>
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-bold text-slate-800 mb-3">Key Calculations:</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li><strong>Trajectory:</strong> Getting to Mars requires precise orbital mechanics - Hohmann transfer orbit calculations</li>
              <li><strong>Landing:</strong> EDL uses same physics as orbital mechanics - F = ma, drag forces, thrust calculations</li>
              <li><strong>Navigation:</strong> Path planning uses algorithms similar to those in our simulator - calculating distances, angles, safe paths</li>
              <li><strong>Communication:</strong> Signal travel time = distance / speed of light. Mars is 54-401 million km from Earth!</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3">🚀 Explore More!</h2>
          <p className="text-slate-700 mb-4">
            Rovers use the same orbital mechanics to get to Mars! Learn about orbits and space travel:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/simulator" className="px-6 py-3 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                Open 3D Simulator →
              </Link>
            <Link href="/learn/orbital-mechanics" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Orbital Mechanics →
              </Link>
            <Link href="/learn/aerospace#rovers" className="px-6 py-3 rounded-xl font-medium border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10">
                Rover Data →
              </Link>
          </div>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>Related Topics:</strong></p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn/aerospace#rovers" className="text-[var(--accent-cyan)] hover:underline">Rover Mission Data</Link>
            <span>·</span>
            <Link href="/learn/how-nasa-launches-satellite" className="text-[var(--accent-cyan)] hover:underline">How NASA Launches</Link>
            <span>·</span>
            <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D Simulator</Link>
            <span>·</span>
            <Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline">Orbital Mechanics</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
