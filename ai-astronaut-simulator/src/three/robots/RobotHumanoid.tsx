"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";

export function RobotHumanoid() {
  const rigidRef = useRef<any>(null);

  const setPosition = useSimStore((s) => s.setPosition);
  const setVelocity = useSimStore((s) => s.setVelocity);
  const setRotation = useSimStore((s) => s.setRotation);

  useFrame(() => {
    if (!rigidRef.current) return;

    const body = rigidRef.current;
    const pos = body.translation();
    const vel = body.linvel();
    const rot = body.rotation();

    setPosition([pos.x, pos.y, pos.z]);
    setVelocity([vel.x, vel.y, vel.z]);

    const euler = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w)
    );
    setRotation([euler.x, euler.y, euler.z]);
  });

  const mat = (
    <meshStandardMaterial
      color="#2a2a3a"
      roughness={0.5}
      metalness={0.6}
    />
  );

  return (
    <RigidBody
      ref={rigidRef}
      position={[0, 2, 0]}
      colliders={false}
      mass={60}
      type="dynamic"
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <CapsuleCollider args={[0.2, 0.5]} />
      <group>
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          {mat}
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
          {mat}
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
          {mat}
        </mesh>
        <mesh position={[0.25, 0.5, 0.15]} castShadow>
          <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
          {mat}
        </mesh>
        <mesh position={[-0.25, 0.5, 0.15]} castShadow>
          <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
          {mat}
        </mesh>
      </group>
    </RigidBody>
  );
}
