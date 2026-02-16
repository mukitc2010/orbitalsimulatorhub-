import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const EARTH_RADIUS = 1;
const GRID_SIZE = 32;

function EarthSphere() {
  return (
    <Sphere args={[EARTH_RADIUS, 64, 64]}>
      <meshStandardMaterial
        color="#1e3a5f"
        wireframe={false}
        emissive="#0a1628"
      />
    </Sphere>
  );
}

function EarthGrid() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    const lat = (i / GRID_SIZE) * Math.PI;
    for (let j = 0; j <= GRID_SIZE; j++) {
      const lon = (j / GRID_SIZE) * Math.PI * 2;
      const r = EARTH_RADIUS + 0.002;
      points.push(
        new THREE.Vector3(
          r * Math.sin(lat) * Math.cos(lon),
          r * Math.cos(lat),
          r * Math.sin(lat) * Math.sin(lon)
        )
      );
    }
  }
  return (
    <Line
      points={points}
      color="#00d9ff"
      lineWidth={0.5}
      transparent
      opacity={0.4}
    />
  );
}

function SatelliteMesh({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const scale = 0.02;
  return (
    <mesh position={position}>
      <boxGeometry args={[scale * 2, scale, scale]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function TrailLine({ points, color }: { points: [number, number, number][]; color: string }) {
  if (points.length < 2) return null;
  const vecs = points.map((p) => new THREE.Vector3(...p));
  return (
    <Line points={vecs} color={color} lineWidth={1} transparent opacity={0.7} />
  );
}

export interface SatelliteState {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  trail: [number, number, number][];
  /** Last Cartesian state (km, km/s) for propagation */
  lastCartesian?: { x: number; y: number; z: number; vx: number; vy: number; vz: number };
}

export function EarthVisualization({
  satellites,
  scale = 6371,
}: {
  satellites: SatelliteState[];
  scale?: number;
}) {
  const norm = (x: number, y: number, z: number): [number, number, number] => [
    x / scale,
    y / scale,
    z / scale,
  ];

  return (
    <div className="w-full h-[480px] rounded-lg overflow-hidden border-2 border-[var(--accent-cyan)] bg-black">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <EarthSphere />
        <EarthGrid />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1.5}
          maxDistance={20}
        />
        {satellites.map((sat) => (
          <group key={sat.id}>
            <SatelliteMesh position={sat.position} color={sat.color} />
            <TrailLine points={sat.trail} color={sat.color} />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
