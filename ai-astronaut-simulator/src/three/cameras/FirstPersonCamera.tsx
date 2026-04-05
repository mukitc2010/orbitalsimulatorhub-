"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";

export function FirstPersonCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const position = useSimStore((s) => s.position);
  const rotation = useSimStore((s) => s.rotation);

  useFrame(() => {
    if (!cameraRef.current) return;

    const pos = new THREE.Vector3().fromArray(position);
    pos.y += 0.8;
    cameraRef.current.position.copy(pos);

    const euler = new THREE.Euler().fromArray(rotation);
    cameraRef.current.quaternion.setFromEuler(euler);
  });

  return <perspectiveCamera ref={cameraRef} makeDefault fov={70} near={0.1} far={2000} />;
}
