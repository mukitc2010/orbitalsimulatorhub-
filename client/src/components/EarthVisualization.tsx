import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import "./EarthVisualization.css";

const EARTH_RADIUS = 1;
const GRID_SIZE = 32;

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const ocean = context.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#063b62");
  ocean.addColorStop(0.5, "#0a7594");
  ocean.addColorStop(1, "#052f59");
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const land = context.createLinearGradient(0, 0, 0, canvas.height);
  land.addColorStop(0, "#99b985");
  land.addColorStop(0.55, "#5e9678");
  land.addColorStop(1, "#b99a68");
  context.fillStyle = land;
  context.strokeStyle = "rgba(202, 225, 174, 0.52)";
  context.lineWidth = 2;
  const continents = [
    [[0.08, 0.25], [0.11, 0.14], [0.18, 0.1], [0.23, 0.16], [0.25, 0.23], [0.22, 0.3], [0.19, 0.32], [0.18, 0.42], [0.13, 0.4], [0.1, 0.33]],
    [[0.23, 0.48], [0.28, 0.45], [0.32, 0.52], [0.31, 0.63], [0.29, 0.75], [0.27, 0.82], [0.25, 0.71], [0.23, 0.6]],
    [[0.43, 0.25], [0.48, 0.2], [0.54, 0.22], [0.57, 0.28], [0.55, 0.35], [0.52, 0.34], [0.51, 0.42], [0.48, 0.48], [0.45, 0.4], [0.43, 0.33]],
    [[0.51, 0.39], [0.56, 0.4], [0.58, 0.5], [0.56, 0.63], [0.53, 0.76], [0.5, 0.69], [0.49, 0.56], [0.48, 0.46]],
    [[0.55, 0.22], [0.61, 0.14], [0.7, 0.16], [0.77, 0.22], [0.84, 0.24], [0.88, 0.3], [0.84, 0.36], [0.78, 0.34], [0.74, 0.42], [0.68, 0.4], [0.63, 0.35], [0.58, 0.33]],
    [[0.77, 0.58], [0.82, 0.56], [0.86, 0.61], [0.84, 0.7], [0.8, 0.72], [0.77, 0.66]],
    [[0.17, 0.07], [0.2, 0.04], [0.24, 0.07], [0.22, 0.12], [0.18, 0.12]],
  ];

  for (const points of continents) {
    context.beginPath();
    points.forEach(([x, y], index) => {
      const px = x * canvas.width;
      const py = y * canvas.height;
      if (index === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    });
    context.closePath();
    context.fill();
    context.stroke();
  }

  context.globalAlpha = 0.12;
  context.strokeStyle = "#d9f6ff";
  context.lineWidth = 5;
  for (let index = 0; index < 18; index += 1) {
    const x = (index * 73) % canvas.width;
    const y = 95 + ((index * 47) % 320);
    context.beginPath();
    context.ellipse(x, y, 35 + (index % 4) * 12, 5 + (index % 3) * 3, -0.2, 0, Math.PI * 1.8);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Nebula({ animated }: { animated: boolean }) {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ time: { value: 0 } }), []);
  useFrame((_, delta) => { if (animated && shader.current) uniforms.time.value += Math.min(delta, 0.1); });
  return <mesh renderOrder={-10}>
    <sphereGeometry args={[600,32,24]} />
    <shaderMaterial ref={shader} uniforms={uniforms} side={THREE.BackSide} depthWrite={false}
      vertexShader={`varying vec3 vDirection; void main(){vDirection=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
      fragmentShader={`varying vec3 vDirection; uniform float time;
        void main(){vec3 d=normalize(vDirection);float t=time*0.018;
          float ribbon=sin(d.x*3.8+d.y*2.5+sin(d.z*5.0+t)*0.7+t);
          float mist=0.5+0.5*sin(d.x*9.0-d.z*7.0+sin(d.y*8.0-t));
          float glow=pow(max(0.0,1.0-abs(ribbon)),2.2);
          vec3 violet=vec3(0.12,0.035,0.27),teal=vec3(0.015,0.22,0.25);
          vec3 cloud=mix(violet,teal,0.5+0.5*sin(d.z*3.0+d.x*2.0+t));
          gl_FragColor=vec4(vec3(0.006,0.012,0.04)+cloud*glow*(0.35+mist*0.65),1.0);
        }`} />
  </mesh>;
}
function Starfield({animated}:{animated:boolean}) {
  const stars=useRef<THREE.Points>(null);
  const {positions,colors}=useMemo(()=>{
    const positions=new Float32Array(1100*3),colors=new Float32Array(1100*3);
    const palette=[new THREE.Color("#aeeaff"),new THREE.Color("#ead5ff"),new THREE.Color("#ffcf9b"),new THREE.Color("#ffffff")];
    for(let i=0;i<1100;i++){
      const radius=130+(i%31)*3,theta=i*2.399963,phi=Math.acos(1-2*(i+0.5)/1100);
      positions.set([radius*Math.sin(phi)*Math.cos(theta),radius*Math.cos(phi),radius*Math.sin(phi)*Math.sin(theta)],i*3);
      const c=palette[i%4];colors.set([c.r,c.g,c.b],i*3);
    }return {positions,colors};
  },[]);
  useFrame((_,delta)=>{if(animated&&stars.current)stars.current.rotation.y+=Math.min(delta,0.1)*0.004;});
  return <points ref={stars}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/><bufferAttribute attach="attributes-color" args={[colors,3]}/></bufferGeometry><pointsMaterial vertexColors size={0.24} sizeAttenuation transparent opacity={0.88} depthWrite={false}/></points>;
}

function EarthSphere({ animated }: { animated: boolean }) {
  const texture = useMemo(createEarthTexture, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const earth = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (animated && earth.current) earth.current.rotation.y += Math.min(delta, 0.1) * 0.025;
  });

  return (
    <group ref={earth}>
      <Sphere args={[EARTH_RADIUS, 64, 64]}>
        <meshStandardMaterial map={texture} color="#bdeaff" emissive="#052849" emissiveIntensity={0.35} roughness={0.85} metalness={0.05} />
      </Sphere>
      <Sphere args={[EARTH_RADIUS * 1.028, 48, 48]}>
        <meshBasicMaterial color="#38d9ff" transparent opacity={0.11} side={THREE.BackSide} />
      </Sphere>
      <mesh rotation={[0.25, 0, 0]}>
        <torusGeometry args={[EARTH_RADIUS * 1.23, 0.008, 8, 96]} />
        <meshBasicMaterial color="#28d7ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function EarthGrid() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    const lat = (i / GRID_SIZE) * Math.PI;
    for (let j = 0; j <= GRID_SIZE; j++) {
      const lon = (j / GRID_SIZE) * Math.PI * 2;
      const r = EARTH_RADIUS + 0.002;
      points.push(
        new THREE.Vector3(
          r * Math.sin(lat) * Math.cos(lon),
          r * Math.cos(lat),
          r * Math.sin(lat) * Math.sin(lon)
        )
      );
    }
  }
  return (
    <Line
      points={points}
      color="#00d9ff"
      lineWidth={0.5}
      transparent
      opacity={0.4}
    />
  );
}

function SatelliteMesh({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const scale = 0.02;
  // Memoize color conversion to ensure proper updates
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  return (
    <mesh position={position}>
      <boxGeometry args={[scale * 3, scale, scale * 1.4]} />
      <meshStandardMaterial 
        color={threeColor} 
        emissive={threeColor} 
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

function TrailLine({ points, color }: { points: [number, number, number][]; color: string }) {
  // Memoize vectors to ensure proper updates
  const vecs = useMemo(() => points.map((p) => new THREE.Vector3(...p)), [points]);
  if (points.length < 2) return null;
  // Use color string directly - drei Line accepts both string and THREE.Color
  return (
    <Line
      points={vecs} 
      color={color} 
      lineWidth={2.5}
      transparent 
      opacity={0.82}
    />
  );
}

function VectorArrow({
  origin,
  direction,
  color,
}: {
  origin: [number, number, number];
  direction: [number, number, number];
  color: string;
}) {
  const arrow = useMemo(() => {
    const helper = new THREE.ArrowHelper(
      new THREE.Vector3(...direction).normalize(),
      new THREE.Vector3(...origin),
      0.38,
      color,
      0.12,
      0.085,
    );
    for (const object of [helper.line, helper.cone]) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => { material.depthTest = false; });
    }
    return helper;
  }, [color, direction, origin]);

  return <primitive object={arrow} />;
}

function SatelliteVectors({
  satellite,
  showVelocity,
  showGravity,
}: {
  satellite: SatelliteState;
  showVelocity: boolean;
  showGravity: boolean;
}) {
  const state = satellite.lastCartesian;
  if (!state) return null;

  return (
    <>
      {showVelocity && (
        <VectorArrow
          origin={satellite.position}
          direction={[state.vx, state.vy, state.vz]}
          color="#66e3ff"
        />
      )}
      {showGravity && (
        <VectorArrow
          origin={satellite.position}
          direction={[-state.x, -state.y, -state.z]}
          color="#ffb36b"
        />
      )}
    </>
  );
}

export interface SatelliteState {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  trail: [number, number, number][];
  orbitPath?: [number, number, number][];
  /** Last Cartesian state (km, km/s) for propagation */
  lastCartesian?: { x: number; y: number; z: number; vx: number; vy: number; vz: number };
}

/** Frame orbit additions and changed predicted paths without following each live tick. */
function FrameOrbits({ satellites }: { satellites: SatelliteState[] }) {
  const { camera, size } = useThree();
  const layoutKey = satellites.map(satellite => `${satellite.id}:${satellite.orbitPath?.reduce(
    (radius, point) => Math.max(radius, Math.hypot(...point)), 1,
  ).toFixed(3) ?? "live"}`).join("|");
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const radius = Math.max(1, ...satellites.map(satellite => satellite.orbitPath?.reduce(
      (outer, point) => Math.max(outer, Math.hypot(...point)), 1,
    ) ?? Math.hypot(...satellite.position)));
    if (!Number.isFinite(radius)) return;
    const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * size.width / Math.max(1, size.height));
    const distance = Math.max(5.5, radius * 1.15 / Math.sin(Math.min(verticalHalfFov, horizontalHalfFov)));
    camera.position.copy(new THREE.Vector3(3.4, 2.1, 3.8).normalize().multiplyScalar(distance));
    camera.lookAt(0, 0, 0);
    camera.far = Math.max(1000, distance + radius * 3);
    camera.updateProjectionMatrix();
    // Live coordinates intentionally do not trigger framing; preserve camera interaction.
  }, [camera, layoutKey, size.width, size.height]);
  return null;
}

export function EarthVisualization({
  satellites,
  scale = 6371,
  showVelocityVector = false,
  showGravityVector = false,
}: {
  satellites: SatelliteState[];
  scale?: number;
  showVelocityVector?: boolean;
  showGravityVector?: boolean;
}) {
  const [animated,setAnimated]=useState(()=>!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  useEffect(()=>{const media=window.matchMedia?.("(prefers-reduced-motion: reduce)");if(!media)return;const change=()=>setAnimated(!media.matches);media.addEventListener("change",change);return()=>media.removeEventListener("change",change)},[]);
  return (
    <div className="simulator-visualization colorful-orbit-view w-full h-[520px] rounded-2xl overflow-hidden border" aria-label="Interactive 3D Earth orbit visualization" data-background-motion={animated ? "playing" : "paused"}>
      <div className="simulator-hud simulator-hud-top-left">
        <span className="simulator-hud-dot" />
        LIVE ORBITAL VIEW
      </div>
      <div className="simulator-hud simulator-hud-bottom-right">
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
      <button className="orbit-background-toggle" type="button" aria-pressed={animated} onClick={()=>setAnimated(v=>!v)}>{animated ? "Pause background" : "Animate background"}</button>
      <Canvas
        camera={{ position: [3.4, 2.1, 3.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Nebula animated={animated} />
        <ambientLight intensity={0.32} />
        <pointLight position={[5, 4, 5]} intensity={2.4} color="#dff8ff" />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#1ec8ff" />
        <Starfield animated={animated} />
        <EarthSphere animated={animated} />
        <EarthGrid />
        <FrameOrbits satellites={satellites} />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1.5}
          maxDistance={1000}
        />
        {satellites.map((sat) => (
          <group key={`${sat.id}-${sat.color}`}>
            <SatelliteMesh 
              position={sat.position} 
              color={sat.color} 
            />
            {sat.orbitPath && <TrailLine points={sat.orbitPath} color={sat.color} />}
            <SatelliteVectors satellite={sat} showVelocity={showVelocityVector} showGravity={showGravityVector} />
            <TrailLine 
              points={sat.trail} 
              color={sat.color} 
            />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
