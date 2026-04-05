"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";
import { useInputStore } from "@/sim/store/inputStore";

export function RobotDrone() {
  const rigidRef = useRef<any>(null);

  const setPosition = useSimStore((s) => s.setPosition);
  const setVelocity = useSimStore((s) => s.setVelocity);
  const setRotation = useSimStore((s) => s.setRotation);
  const sprint = useInputStore((s) => s.sprint);
  const worldPreset = useSimStore((s) => s.getWorldPreset());

  useFrame((_, delta) => {
    if (!rigidRef.current) return;

    const body = rigidRef.current;
    const pos = body.translation();
    const vel = body.linvel();
    const rot = body.rotation();

    if (sprint) {
      body.applyImpulse({ x: 0, y: 15 * delta, z: 0 }, true);
    }

    setPosition([pos.x, pos.y, pos.z]);
    setVelocity([vel.x, vel.y, vel.z]);

    const euler = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w)
    );
    setRotation([euler.x, euler.y, euler.z]);
  });

  return (
    <RigidBody
      ref={rigidRef}
      position={[0, 5, 0]}
      colliders={false}
      mass={30}
      type="dynamic"
      linearDamping={0.3}
      angularDamping={0.8}
    >
      <CapsuleCollider args={[0.3, 0.4]} />
      <group>
        <mesh castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 8]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.5}
            metalness={0.6}
          />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 0.4,
              0.1,
              Math.sin((i / 4) * Math.PI * 2) * 0.4,
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
            <meshStandardMaterial
              color={sprint ? "#22d3ee" : "#475569"}
              roughness={0.3}
              metalness={0.8}
              emissive={sprint ? "#22d3ee" : "#000"}
              emissiveIntensity={sprint ? 0.5 : 0}
            />
          </mesh>
        ))}
      </group>
    </RigidBody>
  );
}
