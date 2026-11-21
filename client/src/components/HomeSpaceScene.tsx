import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { R3FLine, R3FLineMaterial } from "./r3fHost";

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

function Starfield({ count = 160 }: { count?: number }) {
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 18 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi);
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dff8ff" size={0.045} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}

function ConstellationNetwork({ reducedMotion }: { reducedMotion: boolean }) {
  const network = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () => [
      new THREE.Vector3(-3.8, 1.55, -1.5),
      new THREE.Vector3(-2.3, 0.55, -1.9),
      new THREE.Vector3(-1.1, 1.25, -1.4),
      new THREE.Vector3(1.15, 1.4, -1.8),
      new THREE.Vector3(2.6, 0.4, -1.6),
      new THREE.Vector3(3.75, 1.45, -1.45),
    ],
    [],
  );
  const links = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let index = 0; index < nodes.length - 1; index += 1) {
      points.push(nodes[index], nodes[index + 1]);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!reducedMotion && network.current) {
      network.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.035;
      network.current.position.y = Math.sin(clock.elapsedTime * 0.22) * 0.08;
    }
  });

  return (
    <group ref={network}>
      <lineSegments geometry={links}>
        <lineBasicMaterial color="#56dcff" transparent opacity={0.27} />
      </lineSegments>
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#8deeff" : "#a78bfa"} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Orbit({ radius, tilt, speed, color, reducedMotion }: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion || !group.current || !satellite.current) return;
    const angle = clock.elapsedTime * speed;
    satellite.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    satellite.current.rotation.y = -angle;
  });

  const orbit = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let index = 0; index <= 96; index += 1) {
      const angle = (index / 96) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <group ref={group} rotation={[tilt, 0, 0]}>
      <R3FLine geometry={orbit}>
        <R3FLineMaterial color={color} transparent opacity={0.38} />
      </R3FLine>
      <mesh ref={satellite} position={[radius, 0, 0]}>
        <boxGeometry args={[0.14, 0.07, 0.22]} />
        <meshStandardMaterial color="#d8f3ff" emissive={color} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function EarthSystem({ reducedMotion }: { reducedMotion: boolean }) {
  const earth = useRef<THREE.Group>(null);
  const cloudLayer = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const elapsed = clock.elapsedTime;
    if (earth.current) earth.current.rotation.y = elapsed * 0.08;
    if (cloudLayer.current) cloudLayer.current.rotation.y = elapsed * 0.11;
    if (moon.current) moon.current.position.set(Math.cos(elapsed * 0.18) * 3.2, 0.45, Math.sin(elapsed * 0.18) * 3.2);
  });

  return (
    <>
      <group ref={earth}>
        <mesh>
          <sphereGeometry args={[1.6, 24, 24]} />
          <meshStandardMaterial color="#0b5fa5" emissive="#062142" emissiveIntensity={0.8} roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh scale={1.035}>
          <sphereGeometry args={[1.6, 24, 24]} />
          <meshBasicMaterial color="#40d9ff" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
        <mesh ref={cloudLayer} scale={1.012}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshStandardMaterial color="#dff7ff" transparent opacity={0.14} roughness={1} depthWrite={false} />
        </mesh>
      </group>
      <mesh ref={moon} position={[3.2, 0.45, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#b6b8bb" roughness={0.95} />
      </mesh>
      <Orbit radius={2.45} tilt={0.48} speed={0.45} color="#00d9ff" reducedMotion={reducedMotion} />
      <Orbit radius={3.05} tilt={-0.35} speed={0.28} color="#8b5cf6" reducedMotion={reducedMotion} />
    </>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const cameraGroup = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (reducedMotion || !cameraGroup.current) return;
    const elapsed = clock.elapsedTime;
    cameraGroup.current.rotation.x = THREE.MathUtils.lerp(cameraGroup.current.rotation.x, -pointer.y * 0.03, 0.04);
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(cameraGroup.current.rotation.y, pointer.x * 0.04, 0.04);
    cameraGroup.current.position.y = Math.sin(elapsed * 0.18) * 0.12;
  });

  return (
    <group ref={cameraGroup}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={2.1} color="#dff8ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.7} color="#2dd4bf" />
      <Starfield />
      <ConstellationNetwork reducedMotion={reducedMotion} />
      <EarthSystem reducedMotion={reducedMotion} />
    </group>
  );
}

export function HomeSpaceScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.45, 8], fov: 42 }}
        dpr={[1, 1]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 home-space-vignette" />
    </div>
  );
}
