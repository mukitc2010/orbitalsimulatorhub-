import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SOLAR_BODIES, orbitAngle, type SolarBody } from "./solarSystemMotion";

function Stars() {
  const positions = useMemo(() => {
    const values = new Float32Array(900);
    for (let index = 0; index < 300; index += 1) {
      const radius = 18 + (index % 17);
      const theta = index * 2.399;
      const phi = Math.acos(((index * 37) % 100) / 50 - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi) * 0.45;
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e2e8f0" size={0.05} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function Planet({
  body,
  elapsed,
  speed,
  playing,
  selected,
  onSelect,
}: {
  body: SolarBody;
  elapsed: number;
  speed: number;
  playing: boolean;
  selected: boolean;
  onSelect: (name: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const angle = orbitAngle(elapsed, body.years, speed);
    group.current.position.set(Math.cos(angle) * body.orbitRadius, 0, Math.sin(angle) * body.orbitRadius);
    if (playing && spin.current) spin.current.rotation.y += delta * (body.name === "Earth" ? 1.6 : 0.6);
  });
  return (
    <group ref={group}>
      <mesh
        ref={spin}
        onClick={(event) => { event.stopPropagation(); onSelect(body.name); }}
      >
        <sphereGeometry args={[body.bodyRadius, 24, 24]} />
        <meshStandardMaterial color={body.color} emissive={selected ? body.color : "#000000"} emissiveIntensity={selected ? 0.35 : 0} />
      </mesh>
      {body.name === "Saturn" && (
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <ringGeometry args={[body.bodyRadius * 1.4, body.bodyRadius * 2.1, 40]} />
          <meshBasicMaterial color="#e8cf91" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      )}
      {body.name === "Earth" && (
        <mesh position={[0.38, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      )}
    </group>
  );
}

function Clock({ playing, speed, onTick }: { playing: boolean; speed: number; onTick: (elapsed: number) => void }) {
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!playing) return;
    elapsed.current += Math.min(delta, 0.05) * speed;
    onTick(elapsed.current);
  });
  return null;
}

export function AnimatedSolarSystem3D() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [selected, setSelected] = useState("Earth");
  const [reducedMotion, setReducedMotion] = useState(false);
  const chosen = SOLAR_BODIES.find(body => body.name === selected) ?? SOLAR_BODIES[2];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section className="rounded-xl border-2 border-blue-200 bg-slate-950 p-4 text-slate-100" aria-labelledby="solar-3d-heading">
      <h2 id="solar-3d-heading" className="text-2xl font-bold text-white">Animated 3D solar system</h2>
      <p className="mt-2 text-slate-300">Drag to look around. Click a planet. Sizes and distances are not to scale. Outer planets move more slowly because their years are longer.</p>
      <div className="mt-4 h-[440px] overflow-hidden rounded-xl border border-slate-700">
        <Canvas camera={{ position: [0, 12, 16], fov: 46 }} dpr={[1, 1.5]} fallback={<p className="p-4">WebGL is unavailable. The labeled diagram below still works.</p>}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[0, 0, 0]} intensity={4} distance={40} color="#fff4d6" />
          <Stars />
          <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
          {SOLAR_BODIES.map(body => (
            <mesh key={`${body.name}-ring`} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[body.orbitRadius - 0.01, body.orbitRadius + 0.01, 80]} />
              <meshBasicMaterial color="#334155" side={THREE.DoubleSide} />
            </mesh>
          ))}
          <Clock playing={playing && !reducedMotion} speed={1} onTick={setElapsed} />
          {SOLAR_BODIES.map(body => (
            <Planet key={body.name} body={body} elapsed={elapsed} speed={speed} playing={playing && !reducedMotion} selected={selected === body.name} onSelect={setSelected} />
          ))}
          <OrbitControls enablePan={false} minDistance={6} maxDistance={28} target={[0, 0, 0]} />
        </Canvas>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="solar-control" disabled={reducedMotion || playing} onClick={() => setPlaying(true)}>Play 3D</button>
        <button type="button" className="solar-control" disabled={!playing} onClick={() => setPlaying(false)}>Pause 3D</button>
        <label className="flex items-center gap-2 font-medium">3D speed
          <select className="rounded-lg border border-slate-400 bg-white p-2 text-slate-900" value={speed} onChange={event => setSpeed(Number(event.target.value))}>
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
            <option value={4}>4×</option>
          </select>
        </label>
      </div>
      <p role="status" className="mt-3 text-sm text-slate-300">
        {reducedMotion ? "Reduced motion is on. The 3D orbits stay still." : `${playing ? "Playing" : "Paused"}.`} Selected: {chosen.name}, {chosen.kind}, about {chosen.years} Earth year{chosen.years === 1 ? "" : "s"} per orbit.
      </p>
    </section>
  );
}
