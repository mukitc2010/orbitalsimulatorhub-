"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { SimRun } from "../../lib/qsagi/types";

function GravityWell({ M }: { M: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(10, 10, 120, 120);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = geom;
    const pos = g.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const r = Math.sqrt(x * x + y * y) + 1e-6;
      const z = -((2 * M) / r) * 0.15 + Math.sin(t * 0.6 + r * 1.5) * 0.01;

      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    g.computeVertexNormals();

    if (mesh.current) mesh.current.rotation.z = t * 0.03;
  });

  return (
    <mesh ref={mesh} geometry={geom} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial wireframe color="#334155" />
    </mesh>
  );
}

function OrbitPath3D({ run }: { run: SimRun }) {
  const pts = useMemo(() => {
    return run.points.map((p) => new THREE.Vector3(p.pos.x / 2, 0.05, p.pos.y / 2));
  }, [run]);

  if (pts.length < 2) return null;

  return (
    <Line points={pts} color="#00d9ff" lineWidth={1} transparent opacity={0.9} />
  );
}

export function SpacetimeLens3D({ run }: { run: SimRun | null }) {
  return (
    <div className="rounded-2xl border border-white/10 p-3">
      <div className="mb-2 text-lg font-semibold">Spacetime Lens (3D)</div>

      <div className="h-[420px] w-full overflow-hidden rounded-xl border border-white/10">
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }} gl={{ antialias: true }}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 3]} intensity={1.2} />
          <OrbitControls enablePan enableZoom />

          <group position={[0, 0, 0]}>
            <GravityWell M={run?.params.M ?? 1.0} />
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>

            {run ? <OrbitPath3D run={run} /> : null}
          </group>
        </Canvas>
      </div>

      <div className="mt-2 text-xs opacity-70">
        Visual metaphor: wireframe gravity well + orbit line. It&apos;s &quot;lensing-like&quot; (educational), not a full ray-traced GR lens.
      </div>
    </div>
  );
}
