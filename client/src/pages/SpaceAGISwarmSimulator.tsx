"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { unpack } from "msgpackr";

const R_EARTH = 6378137.0;
const SWARM_WS_URL =
  import.meta.env.VITE_SWARM_WS_URL || "ws://localhost:8000/ws/simulation";

type TelemetrySatellite = {
  id: number;
  r: [number, number, number];
  v: [number, number, number];
  risk: number;
  fuel: number;
};

type TelemetryPacket = {
  t: number;
  satellites: TelemetrySatellite[];
  num_candidates: number;
};

function useSimulationSocket() {
  const [telemetry, setTelemetry] = useState<TelemetryPacket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(SWARM_WS_URL);
    ws.binaryType = "arraybuffer";

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    ws.onmessage = (evt) => {
      try {
        const buf = new Uint8Array(evt.data as ArrayBuffer);
        const msg = unpack(buf) as TelemetryPacket;
        setTelemetry(msg);
      } catch {
        // ignore decode errors
      }
    };

    return () => ws.close();
  }, []);

  return { telemetry, connected };
}

function SwarmPoints({ telemetry }: { telemetry: TelemetryPacket | null }) {
  const meshRef = useRef<THREE.Points>(null);
  const N = telemetry?.satellites?.length ?? 0;

  const geom = useMemo(() => {
    if (N === 0) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    return g;
  }, [N]);

  useFrame(() => {
    if (!telemetry?.satellites?.length || !meshRef.current || !geom) return;

    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geom.getAttribute("color") as THREE.BufferAttribute;
    if (!posAttr || !colAttr) return;

    const satN = telemetry.satellites.length;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;
    const scale = 1 / R_EARTH;

    for (let i = 0; i < satN; i++) {
      const s = telemetry.satellites[i];
      pos[i * 3 + 0] = s.r[0] * scale;
      pos[i * 3 + 1] = s.r[1] * scale;
      pos[i * 3 + 2] = s.r[2] * scale;

      const r = Math.min(1, Math.max(0, s.risk));
      col[i * 3 + 0] = r;
      col[i * 3 + 1] = 0.2;
      col[i * 3 + 2] = 1.0 - r;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  if (N === 0 || !geom) return null;

  return (
    <points ref={meshRef} geometry={geom}>
      <pointsMaterial
        size={0.015}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function EarthWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[1, 48, 48]} />
      <meshBasicMaterial color="#0a1628" wireframe />
    </mesh>
  );
}

function SwarmScene({ telemetry }: { telemetry: TelemetryPacket | null }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <EarthWireframe />
      <SwarmPoints telemetry={telemetry} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={2}
        maxDistance={20}
      />
    </>
  );
}

export function SpaceAGISwarmSimulator() {
  const { telemetry, connected } = useSimulationSocket();

  const n = telemetry?.satellites?.length ?? 0;
  const avgRisk =
    n > 0
      ? telemetry!.satellites.reduce((a, s) => a + s.risk, 0) / n
      : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--accent-cyan)" }}
        >
          Space-AGI Swarm Lab
        </p>
        <h1 className="headline">Autonomous Swarm Collision Avoidance</h1>
        <p className="subhead max-w-2xl">
          Research-grade simulation: J2 propagation, covariance, Pc integral,
          OSQP control. Satellites avoid collisions autonomously.
        </p>
      </div>

      <div
        className="rounded-xl overflow-hidden border-2"
        style={{
          background: "#050814",
          borderColor: "var(--accent-cyan)",
          minHeight: "500px",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          <div className="lg:col-span-3 relative" style={{ minHeight: "500px" }}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 55 }}
              gl={{ antialias: true }}
              style={{ width: "100%", height: "500px" }}
            >
              <SwarmScene telemetry={telemetry} />
            </Canvas>
            <div
              className="absolute top-4 left-4 text-sm font-mono px-3 py-2 rounded-lg z-10"
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "var(--accent-cyan)",
              }}
            >
              <div>
                <b>Status:</b> {connected ? "Connected" : "Disconnected"}
              </div>
              <div>t = {telemetry?.t?.toFixed?.(1) ?? "-"} s</div>
              <div>Candidates = {telemetry?.num_candidates ?? "-"}</div>
            </div>
          </div>

          <div
            className="p-4 border-t lg:border-t-0 lg:border-l"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <h3
              className="font-bold mb-3"
              style={{ color: "var(--accent-cyan)" }}
            >
              Telemetry
            </h3>
            <div className="space-y-2 text-sm">
              <div>Satellites: {n}</div>
              <div>Avg risk: {avgRisk.toFixed(4)}</div>
              <div
                className="mt-4 p-2 rounded text-xs"
                style={{ background: "var(--bg-surface)" }}
              >
                <p className="font-bold mb-1">Backend required</p>
                <p>
                  Run the Python swarm backend on port 8000:
                </p>
                <code className="block mt-2 text-[var(--accent-cyan)]">
                  cd space-agi-swarm-backend
                  <br />
                  pip install -r requirements.txt
                  <br />
                  uvicorn main:app --port 8000
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-6 p-4 rounded-xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h3 className="font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>
          Research-Grade Features
        </h3>
        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
          <li>J2 RK4 orbital propagation</li>
          <li>Covariance propagation (P = ΦPΦᵀ + Q)</li>
          <li>2D Gaussian Pc integral in encounter plane</li>
          <li>OSQP QP controller with fuel/risk tradeoff</li>
          <li>Secondary risk constraint (backtracking)</li>
          <li>Shell + KD-tree scalable conjunction detection</li>
        </ul>
      </div>
    </div>
  );
}
