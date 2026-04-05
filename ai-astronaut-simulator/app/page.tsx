"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { SceneRoot } from "@/three/SceneRoot";
import { HUD } from "@/ui/HUD";
import { Controls } from "@/input/Controls";
import { useSimStore } from "@/sim/store/simStore";

const SceneRootDynamic = dynamic(() => Promise.resolve(SceneRoot), { ssr: false });

function MissionTimer() {
  const tickMissionTimer = useSimStore((s) => s.tickMissionTimer);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      tickMissionTimer((now - last) / 1000);
      last = now;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tickMissionTimer]);

  return null;
}

export default function Home() {
  return (
    <main className="relative h-screen w-screen">
      <SceneRootDynamic />
      <HUD />
      <Controls />
      <MissionTimer />
    </main>
  );
}
