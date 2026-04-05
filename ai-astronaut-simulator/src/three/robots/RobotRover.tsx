"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";
import { useInputStore } from "@/sim/store/inputStore";

const MOVE_FORCE = 80;
const SPRINT_MULT = 1.5;

export function RobotRover() {
  const rigidRef = useRef<any>(null);
  const setPosition = useSimStore((s) => s.setPosition);
  const setVelocity = useSimStore((s) => s.setVelocity);
  const setRotation = useSimStore((s) => s.setRotation);
  const setCameraShake = useSimStore((s) => s.setCameraShake);
  const setIsGrounded = useSimStore((s) => s.setIsGrounded);
  const forward = useInputStore((s) => s.forward);
  const backward = useInputStore((s) => s.backward);
  const left = useInputStore((s) => s.left);
  const right = useInputStore((s) => s.right);
  const sprint = useInputStore((s) => s.sprint);

  useFrame((_, delta) => {
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
    setIsGrounded(pos.y < 0.6);
    const speed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
    if (speed > 5 && pos.y < 0.7) setCameraShake(0.15);

    const mult = (sprint ? SPRINT_MULT : 1) * MOVE_FORCE * delta;
    const rotY = euler.y;
    const fwd = new THREE.Vector3(-Math.sin(rotY), 0, -Math.cos(rotY));
    const force = new THREE.Vector3(0, 0, 0);
    if (forward) force.add(fwd);
    if (backward) force.sub(fwd);
    if (force.lengthSq() > 0) {
      force.normalize().multiplyScalar(mult);
      body.applyImpulse({ x: force.x, y: force.y, z: force.z }, true);
    }
    const turnTorque = 3 * delta;
    if (left) body.applyTorqueImpulse({ x: 0, y: turnTorque, z: 0 }, true);
    if (right) body.applyTorqueImpulse({ x: 0, y: -turnTorque, z: 0 }, true);
  });

  return (
    <RigidBody
      ref={rigidRef}
      position={[0, 2, 0]}
      colliders={false}
      mass={80}
      type="dynamic"
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <CuboidCollider args={[0.6, 0.25, 0.4]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.5, 0.8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.6} />
      </mesh>
    </RigidBody>
  );
}
