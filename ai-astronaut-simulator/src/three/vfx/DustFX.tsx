"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";

const DUST_COUNT = 24;

export function DustFX() {
  const pointsRef = useRef<THREE.Points>(null);
  const lastPos = useRef([0, 0, 0]);
  const position = useSimStore((s) => s.position);
  const isGrounded = useSimStore((s) => s.isGrounded);
  const robotType = useSimStore((s) => s.robotType);

  const positions = useRef(new Float32Array(DUST_COUNT * 3));
  const lifetimes = useRef(new Float32Array(DUST_COUNT));

  useFrame((_, delta) => {
    if (!pointsRef.current || robotType !== "rover" || !isGrounded) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const dx = position[0] - lastPos.current[0];
    const dz = position[2] - lastPos.current[2];
    const speed = Math.sqrt(dx * dx + dz * dz);

    lastPos.current = [...position];

    for (let i = 0; i < DUST_COUNT; i++) {
      lifetimes.current[i] -= delta;
      if (lifetimes.current[i] <= 0 && speed > 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.4;
        pos[i * 3] = position[0] + Math.cos(angle) * r;
        pos[i * 3 + 1] = position[1] + 0.1;
        pos[i * 3 + 2] = position[2] + Math.sin(angle) * r;
        lifetimes.current[i] = 0.4 + Math.random() * 0.3;
      } else if (lifetimes.current[i] > 0) {
        pos[i * 3 + 1] += 0.5 * delta;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (robotType !== "rover" || !isGrounded) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={DUST_COUNT}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation
        color="#a78bfa"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}
