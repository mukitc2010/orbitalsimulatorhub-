"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimStore } from "@/sim/store/simStore";
import { damp } from "@/sim/utils/math";

const OFFSET = new THREE.Vector3(0, 8, 12);
const LOOK_AHEAD = 2;

export function FollowCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 8, 12));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const position = useSimStore((s) => s.position);
  const rotation = useSimStore((s) => s.rotation);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const robotPos = new THREE.Vector3(0, 0, 0).fromArray(position);
    const robotYaw = rotation[1];
    const offset = OFFSET.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -robotYaw);
    targetPos.current.copy(robotPos).add(offset);

    currentPos.current.x = damp(currentPos.current.x, targetPos.current.x, 4, delta);
    currentPos.current.y = damp(currentPos.current.y, targetPos.current.y, 4, delta);
    currentPos.current.z = damp(currentPos.current.z, targetPos.current.z, 4, delta);

    const lookAtTarget = robotPos.clone().add(
      new THREE.Vector3(0, 0, -LOOK_AHEAD).applyAxisAngle(new THREE.Vector3(0, 1, 0), -robotYaw)
    );
    currentLookAt.current.x = damp(currentLookAt.current.x, lookAtTarget.x, 6, delta);
    currentLookAt.current.y = damp(currentLookAt.current.y, lookAtTarget.y, 6, delta);
    currentLookAt.current.z = damp(currentLookAt.current.z, lookAtTarget.z, 6, delta);

    cameraRef.current.position.copy(currentPos.current);
    cameraRef.current.lookAt(currentLookAt.current);
  });

  return <perspectiveCamera ref={cameraRef} makeDefault fov={50} near={0.1} far={2000} />;
}
