"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useUIStore } from "@/sim/store/uiStore";
import { useSimStore } from "@/sim/store/simStore";
import { World } from "./world/World";
import { PostFX } from "./world/PostFX";
import { FollowCamera } from "./cameras/FollowCamera";
import { FirstPersonCamera } from "./cameras/FirstPersonCamera";
import { FreeCamera } from "./cameras/FreeCamera";

function SceneContent() {
  const cameraMode = useUIStore((s) => s.cameraMode);
  const gravity = useSimStore((s) => -s.getWorldPreset().gravity);

  return (
    <Physics gravity={[0, gravity, 0]}>
      <World />
      <PostFX />
      {cameraMode === "third" && <FollowCamera />}
      {cameraMode === "first" && <FirstPersonCamera />}
      {cameraMode === "free" && <FreeCamera />}
    </Physics>
  );
}

export function SceneRoot() {
  return (
    <div className="fixed inset-0 bg-space-950">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 50, near: 0.1, far: 2000, position: [0, 10, 20] }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
