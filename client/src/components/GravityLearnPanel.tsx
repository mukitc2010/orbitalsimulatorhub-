/**
 * How Gravity Works — educational panel for the Simulator.
 * Ties gravity formula and concepts to what users see in the 3D view.
 */
export function GravityLearnPanel() {
  return (
    <div className="mt-4 rounded-lg border-2 border-[var(--accent-cyan)]/50 bg-white/90 p-4 text-sm space-y-4">
      <h3 className="text-xs font-mono-tech text-gray-500 uppercase tracking-wide">
        🌍 How Gravity Works
      </h3>
      <p className="text-gray-700">
        Gravity is an invisible force that pulls objects toward Earth. The stronger the pull, the harder it is for a satellite to escape!
      </p>
      <div className="bg-gray-100 rounded px-3 py-2 font-mono-tech text-center text-gray-800">
        F = G × m₁ × m₂ / r²
      </div>
      <ul className="text-gray-700 space-y-1">
        <li>✓ Bigger objects = stronger pull</li>
        <li>✓ Farther away = weaker pull</li>
        <li>✓ This is Newton&apos;s Law of Gravity!</li>
      </ul>
      <div className="border-l-4 border-[var(--accent-cyan)] pl-3 text-gray-700">
        <strong>Pull</strong><br />
        Earth pulls satellites toward it with gravity. Satellites stay in orbit by moving fast enough to &quot;fall&quot; around Earth!
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-2">🎯 Key Concepts</h4>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Gravity:</strong> Pulls satellites toward Earth</li>
          <li><strong>Velocity:</strong> Speed needed to stay in orbit</li>
          <li><strong>Orbit:</strong> Path a satellite follows around Earth</li>
          <li><strong>Period:</strong> Time to complete one orbit</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-2">🚀 Real-World Examples</h4>
        <ul className="text-gray-700 space-y-1">
          <li>📡 <strong>ISS:</strong> Orbits Earth every 90 minutes (LEO)</li>
          <li>🗺️ <strong>GPS:</strong> 24 satellites in MEO orbits</li>
          <li>🌤️ <strong>Weather:</strong> Satellites in GEO watch Earth 24/7</li>
          <li>📞 <strong>Communication:</strong> Relay signals around the world</li>
        </ul>
      </div>
    </div>
  );
}
