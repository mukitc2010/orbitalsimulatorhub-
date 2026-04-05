"use client";

import { OrbitControls } from "@react-three/drei";

export function FreeCamera() {
  return (
    <>
      <perspectiveCamera makeDefault fov={60} near={0.1} far={2000} position={[0, 20, 30]} />
      <OrbitControls enableDamping dampingFactor={0.05} target={[0, 0, 0]} />
    </>
  );
}
