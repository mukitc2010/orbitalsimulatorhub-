"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";
import { useInputStore } from "@/sim/store/inputStore";

const PARTICLE_COUNT = 32;

export function ThrusterFX() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const velocities = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const robotType = useSimStore((s) => s.robotType);
  const sprint = useInputStore((s) => s.sprint);
  const position = useSimStore((s) => s.position);
  const isThrusting = robotType === "drone" && sprint;

  useFrame((_, delta) => {
    if (!pointsRef.current || robotType !== "drone" || !isThrusting) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities.current[i * 3] += (Math.random() - 0.5) * 2;
      velocities.current[i * 3 + 1] -= 8 * delta;
      velocities.current[i * 3 + 2] += (Math.random() - 0.5) * 2;

      pos[i * 3] += velocities.current[i * 3] * delta;
      pos[i * 3 + 1] += velocities.current[i * 3 + 1] * delta;
      pos[i * 3 + 2] += velocities.current[i * 3 + 2] * delta;

      if (pos[i * 3 + 1] < -1) {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.2;
        pos[i * 3] = position[0] + Math.cos(angle) * r;
        pos[i * 3 + 1] = position[1] - 0.5;
        pos[i * 3 + 2] = position[2] + Math.sin(angle) * r;
        velocities.current[i * 3] = (Math.random() - 0.5) * 2;
        velocities.current[i * 3 + 1] = -4 - Math.random() * 4;
        velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (robotType !== "drone" || !isThrusting) return null;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const r = 0.3 + Math.random() * 0.2;
    positions.current[i * 3] = position[0] + Math.cos(angle) * r;
    positions.current[i * 3 + 1] = position[1] - 0.5;
    positions.current[i * 3 + 2] = position[2] + Math.sin(angle) * r;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        color="#22d3ee"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}
