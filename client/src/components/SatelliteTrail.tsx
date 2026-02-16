import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface SatelliteTrailProps {
  points: [number, number, number][];
  color: string;
  maxPoints?: number;
}

export function SatelliteTrail({ points, color, maxPoints = 200 }: SatelliteTrailProps) {
  const vecs = useMemo(() => {
    const len = Math.min(points.length, maxPoints);
    return points.slice(-len).map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  }, [points, maxPoints]);

  if (vecs.length < 2) return null;

  return (
    <Line
      points={vecs}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.6}
    />
  );
}
