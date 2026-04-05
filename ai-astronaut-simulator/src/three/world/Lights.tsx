"use client";

import { useMemo } from "react";
import { useSimStore } from "@/sim/store/simStore";

export function Lights() {
  const worldPreset = useSimStore((s) => s.getWorldPreset());

  const sunIntensity = useMemo(() => worldPreset.sunIntensity, [worldPreset.sunIntensity]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[50, 80, 50]}
        intensity={sunIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={500}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-30, 40, -30]} intensity={0.2} color="#88ccff" />
      <pointLight position={[0, 20, 0]} intensity={0.3} color="#a78bfa" distance={100} />
    </>
  );
}
