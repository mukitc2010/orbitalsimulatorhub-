"use client";

import { useMemo } from "react";
import { useSimStore } from "@/sim/store/simStore";
import * as THREE from "three";

const SIZE = 200;
const SEGMENTS = 64;

export function Terrain() {
  const worldPreset = useSimStore((s) => s.getWorldPreset());

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const z = pos[i + 1];
      const noise = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 2 +
        Math.sin(x * 0.1 + z * 0.1) * 1.5 +
        Math.sin(x * 0.02) * Math.sin(z * 0.02) * 3;
      pos[i + 2] = noise * 0.8;
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: worldPreset.groundColor,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: false,
    });

    return { geometry: geo, material: mat };
  }, [worldPreset.groundColor]);

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    />
  );
}
