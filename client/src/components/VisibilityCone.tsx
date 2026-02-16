import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const EARTH_R = 1;
const CONE_ALTITUDE = 0.15;
const SEGMENTS = 24;

/** Cone from ground station (on unit sphere) pointing up; wireframe. */
export function VisibilityCone({
  latDeg,
  lonDeg,
  scale = 6371,
}: {
  latDeg: number;
  lonDeg: number;
  scale?: number;
}) {
  const points = useMemo(() => {
    const lat = (latDeg * Math.PI) / 180;
    const lon = (lonDeg * Math.PI) / 180;
    const cx = EARTH_R * Math.cos(lat) * Math.cos(lon);
    const cy = EARTH_R * Math.cos(lat) * Math.sin(lon);
    const cz = EARTH_R * Math.sin(lat);
    const apex = new THREE.Vector3(cx, cz, cy);
    const baseRadius = CONE_ALTITUDE * 0.6;
    const height = CONE_ALTITUDE;
    const dir = apex.clone().normalize();
    const vecs: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = (i / SEGMENTS) * Math.PI * 2;
      const dx = baseRadius * Math.cos(t);
      const dy = baseRadius * Math.sin(t);
      const tangent = new THREE.Vector3(
        -Math.sin(lon),
        0,
        Math.cos(lon)
      ).cross(dir);
      const bitangent = dir.clone().cross(tangent).normalize();
      tangent.normalize();
      const basePt = apex.clone().add(dir.clone().multiplyScalar(height)).add(tangent.multiplyScalar(dx)).add(bitangent.multiplyScalar(dy));
      vecs.push(basePt);
    }
    vecs.push(apex);
    return vecs;
  }, [latDeg, lonDeg]);

  const linePoints = useMemo(() => {
    const pts = [...points];
    const apex = pts.pop()!;
    const result: THREE.Vector3[] = [];
    for (let i = 0; i < pts.length; i++) {
      result.push(pts[i]);
      result.push(apex);
      result.push(pts[i]);
      result.push(pts[(i + 1) % pts.length]);
    }
    return result;
  }, [points]);

  return (
    <Line
      points={linePoints}
      color="#00d9ff"
      lineWidth={0.5}
      transparent
      opacity={0.5}
    />
  );
}
