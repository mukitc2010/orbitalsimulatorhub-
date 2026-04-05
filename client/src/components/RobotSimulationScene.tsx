"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type RobotSimulationSceneProps = {
  robotType: "humanoid" | "rover" | "drone";
  environment: "iss" | "moon" | "mars" | "deep";
  isRunning: boolean;
  simStep: number;
};

// ISS Interior: box room with panels
function ISSEnvironment() {
  return (
    <group>
      <mesh position={[0, 0, -4]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Control panels */}
      {[-2, 0, 2].map((x) => (
        <mesh key={x} position={[x, 1.5, -3.9]}>
          <planeGeometry args={[1.2, 0.8]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* Equipment box */}
      <mesh position={[3, -1.2, -2]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Moon: gray surface with craters
function MoonEnvironment() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#64748b" metalness={0.1} roughness={0.9} />
      </mesh>
      {[1, -1.5, 2.5, -2].map((x, i) => (
        <mesh key={i} position={[x * 2, -1.98, (i % 2) * 3 - 1]}>
          <circleGeometry args={[0.3 + i * 0.05, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      ))}
      <mesh position={[-3, -1, 1]}>
        <boxGeometry args={[2, 1, 1.5]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
}

// Mars: red surface
function MarsEnvironment() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#b91c1c" metalness={0.05} roughness={0.95} />
      </mesh>
      {[0, 1, -1, 2].map((x, i) => (
        <mesh key={i} position={[x * 1.5, -1.95, i * 0.8 - 1]}>
          <sphereGeometry args={[0.2, 6, 6]} />
          <meshStandardMaterial color="#7f1d1d" />
        </mesh>
      ))}
      <mesh position={[2, -1.5, -2]}>
        <boxGeometry args={[1.5, 0.6, 1]} />
        <meshStandardMaterial color="#991b1b" metalness={0.1} roughness={0.9} />
      </mesh>
    </group>
  );
}

// Deep space: dark with satellite
function DeepSpaceEnvironment() {
  return (
    <group>
      {/* Distant stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20 - 5]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* Satellite to repair */}
      <group position={[2, 0.5, -3]}>
        <mesh>
          <boxGeometry args={[0.8, 0.4, 1.2]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Humanoid robot: body + head + arms
function HumanoidRobot({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.x = Math.sin(t * 0.8) * progress * 1.5;
    group.current.position.z = -2 + Math.cos(t * 0.5) * progress * 0.5;
    if (armL.current) armL.current.rotation.x = Math.sin(t * 2) * 0.4;
    if (armR.current) armR.current.rotation.x = Math.sin(t * 2 + Math.PI) * 0.4;
  });

  return (
    <group ref={group} position={[0, 0, -2]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.2]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh ref={armL} position={[-0.25, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh ref={armR} position={[0.25, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.1, 0]}>
        <boxGeometry args={[0.12, 0.2, 0.15]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.1, 0.1, 0]}>
        <boxGeometry args={[0.12, 0.2, 0.15]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

// Rover: box body + wheels
function RoverRobot({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.x = -2 + progress * 4 * (0.5 + 0.5 * Math.sin(t * 0.5));
    group.current.position.z = -2;
    if (wheels.current) wheels.current.rotation.x = t * 3 * progress;
  });

  return (
    <group ref={group} position={[-2, -1.2, -2]}>
      <mesh>
        <boxGeometry args={[0.6, 0.35, 0.4]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
      </mesh>
      <group ref={wheels}>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.35, -0.25, -0.2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[s * 0.35, -0.25, 0.2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          </group>
        ))}
      </group>
      <mesh position={[0.2, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Drone: flying box with rotors
function DroneRobot({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = -0.5 + progress * 1.5 + Math.sin(t * 0.3) * 0.2;
    group.current.position.x = Math.sin(t * 0.6) * progress * 1.2;
    group.current.position.z = -2 + Math.cos(t * 0.4) * progress * 0.8;
    if (rotors.current) rotors.current.rotation.y = t * 8;
  });

  return (
    <group ref={group} position={[0, 0, -2]}>
      <mesh>
        <boxGeometry args={[0.4, 0.15, 0.4]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.6} roughness={0.4} />
      </mesh>
      <group ref={rotors}>
        {[[-0.2, 0.1, -0.2], [0.2, 0.1, -0.2], [-0.2, 0.1, 0.2], [0.2, 0.1, 0.2]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SceneContent({ robotType, environment, isRunning, simStep }: RobotSimulationSceneProps) {
  const progress = isRunning ? Math.min(1, (simStep + 0.5) / SIM_STEPS) : 0.15;

  return (
    <>
      <ambientLight intensity={environment === "deep" ? 0.3 : 0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 3, 2]} intensity={0.5} />
      {environment === "deep" && (
        <pointLight position={[2, 0.5, -3]} intensity={0.8} color="#0ea5e9" />
      )}

      {environment === "iss" && <ISSEnvironment />}
      {environment === "moon" && <MoonEnvironment />}
      {environment === "mars" && <MarsEnvironment />}
      {environment === "deep" && <DeepSpaceEnvironment />}

      {robotType === "humanoid" && <HumanoidRobot progress={progress} />}
      {robotType === "rover" && <RoverRobot progress={progress} />}
      {robotType === "drone" && <DroneRobot progress={progress} />}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2 + 0.3}
      />
    </>
  );
}

const SIM_STEPS = 6;

export function RobotSimulationScene(props: RobotSimulationSceneProps) {
  return (
    <div className="w-full h-[320px] rounded-xl overflow-hidden bg-black">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        <color attach="background" args={["#020617"]} />
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
}
