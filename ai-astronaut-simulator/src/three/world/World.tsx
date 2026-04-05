"use client";

import { useMemo } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useSimStore } from "@/sim/store/simStore";
import { Starfield } from "./Starfield";
import { Terrain } from "./Terrain";
import { Lights } from "./Lights";
import { RobotFactory } from "../robots/RobotFactory";
import { ThrusterFX } from "../vfx/ThrusterFX";
import { DustFX } from "../vfx/DustFX";

export function World() {
  const worldPreset = useSimStore((s) => s.getWorldPreset());
  const fogDensity = worldPreset.fogDensity;

  const fog = useMemo(() => {
    if (fogDensity <= 0) return null;
    return fogDensity;
  }, [fogDensity]);

  return (
    <>
      <color attach="background" args={[worldPreset.skyColor]} />
      {fog != null && (
        <fog attach="fog" args={[worldPreset.skyColor, 50, 300]} />
      )}
      <Starfield />
      <Lights />
      <RigidBody type="fixed" friction={0.8} restitution={0.1}>
        <CuboidCollider args={[100, 0.5, 100]} position={[0, -0.5, 0]} />
      </RigidBody>
      <Terrain />
      <RobotFactory />
      <ThrusterFX />
      <DustFX />
    </>
  );
}
