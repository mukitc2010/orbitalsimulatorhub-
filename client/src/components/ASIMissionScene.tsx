import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function Stars() {
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi);
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dff8ff" size={0.028} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function OrbitingProbe({ reducedMotion }: { reducedMotion: boolean }) {
  const probe = useRef<THREE.Group>(null);
  const trail = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let index = 0; index <= 96; index += 1) {
      const angle = (index / 96) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * 2.15, Math.sin(angle * 2) * 0.22, Math.sin(angle) * 0.62));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion || !probe.current) return;
    const angle = clock.elapsedTime * 0.48;
    probe.current.position.set(Math.cos(angle) * 2.15, Math.sin(angle * 2) * 0.22, Math.sin(angle) * 0.62);
    probe.current.rotation.y = -angle;
  });

  return (
    <>
      <line geometry={trail}>
        <lineBasicMaterial color="#58e5ff" transparent opacity={0.42} />
      </line>
      <group ref={probe} position={[2.15, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.18, 0.1, 0.28]} />
          <meshStandardMaterial color="#e5f8ff" emissive="#00c8ff" emissiveIntensity={1.3} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.55, 0.03, 0.06]} />
          <meshStandardMaterial color="#245fbc" emissive="#153f89" emissiveIntensity={0.55} />
        </mesh>
      </group>
    </>
  );
}

function Mars({ reducedMotion }: { reducedMotion: boolean }) {
  const planet = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!reducedMotion && planet.current) planet.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={planet}>
      <mesh>
        <sphereGeometry args={[1.28, 36, 36]} />
        <meshStandardMaterial color="#a54c32" emissive="#260b08" emissiveIntensity={0.55} roughness={0.92} />
      </mesh>
      <mesh rotation={[0.22, 0.55, -0.08]}>
        <torusGeometry args={[1.55, 0.012, 8, 96]} />
        <meshBasicMaterial color="#f7ba72" transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.34} />
      <directionalLight position={[3, 3, 5]} intensity={2.1} color="#ffe2c4" />
      <pointLight position={[-3, -1, 2]} intensity={1.1} color="#26d8ff" />
      <Stars />
      <Mars reducedMotion={reducedMotion} />
      <OrbitingProbe reducedMotion={reducedMotion} />
    </>
  );
}

export function ASIMissionScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-80" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 6.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/15" />
    </div>
  );
}
