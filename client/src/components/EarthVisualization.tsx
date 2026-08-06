import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const EARTH_RADIUS = 1;
const GRID_SIZE = 32;

function Starfield() {
  const positions = useMemo(() => {
    const values = new Float32Array(260 * 3);
    for (let index = 0; index < 260; index += 1) {
      const radius = 7 + Math.random() * 15;
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
      <pointsMaterial color="#dff8ff" size={0.025} sizeAttenuation transparent opacity={0.82} depthWrite={false} />
    </points>
  );
}

function EarthSphere() {
  const earth = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (earth.current) earth.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={earth}>
      <Sphere args={[EARTH_RADIUS, 64, 64]}>
        <meshStandardMaterial color="#0b5fa5" emissive="#041b38" emissiveIntensity={0.9} roughness={0.72} metalness={0.12} />
      </Sphere>
      <Sphere args={[EARTH_RADIUS * 1.028, 48, 48]}>
        <meshBasicMaterial color="#38d9ff" transparent opacity={0.11} side={THREE.BackSide} />
      </Sphere>
      <mesh rotation={[0.25, 0, 0]}>
        <torusGeometry args={[EARTH_RADIUS * 1.23, 0.008, 8, 96]} />
        <meshBasicMaterial color="#28d7ff" transparent opacity={0.3} />
      </mesh>
    </group>
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
  // Memoize color conversion to ensure proper updates
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  return (
    <mesh position={position}>
      <boxGeometry args={[scale * 3, scale, scale * 1.4]} />
      <meshStandardMaterial 
        color={threeColor} 
        emissive={threeColor} 
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

function TrailLine({ points, color }: { points: [number, number, number][]; color: string }) {
  if (points.length < 2) return null;
  // Memoize vectors to ensure proper updates
  const vecs = useMemo(() => points.map((p) => new THREE.Vector3(...p)), [points]);
  // Use color string directly - drei Line accepts both string and THREE.Color
  return (
    <Line
      points={vecs} 
      color={color} 
      lineWidth={2.5}
      transparent 
      opacity={0.82}
    />
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
  return (
    <div className="simulator-visualization w-full h-[520px] rounded-2xl overflow-hidden border" aria-label="Interactive 3D Earth orbit visualization">
      <div className="simulator-hud simulator-hud-top-left">
        <span className="simulator-hud-dot" />
        LIVE ORBITAL VIEW
      </div>
      <div className="simulator-hud simulator-hud-bottom-right">
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
      <Canvas
        camera={{ position: [3.4, 2.1, 3.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.32} />
        <pointLight position={[5, 4, 5]} intensity={2.4} color="#dff8ff" />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#1ec8ff" />
        <Starfield />
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
          <group key={`${sat.id}-${sat.color}`}>
            <SatelliteMesh 
              position={sat.position} 
              color={sat.color} 
            />
            <TrailLine 
              points={sat.trail} 
              color={sat.color} 
            />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
