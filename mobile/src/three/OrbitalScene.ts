/**
 * Imperative Three.js scene for the 3D orbital simulator.
 * Renders a holographic Earth (procedural shader — no external textures, so the
 * app works fully offline), a starfield, and satellites propagated with real
 * Kepler orbital mechanics. 1 scene unit = 1 Earth radius (6371 km).
 */
import { ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

import { EARTH_RADIUS_KM, OrbitalElements, propagate, sampleOrbitPath } from "../physics/orbital";

const KM = 1 / EARTH_RADIUS_KM; // km → scene units

export interface SatelliteTelemetry {
  id: string;
  altitudeKm: number;
  speedKmS: number;
}

interface SatelliteEntry {
  id: string;
  elements: OrbitalElements;
  color: THREE.Color;
  mesh: THREE.Mesh;
  glow: THREE.Sprite;
  orbitLine: THREE.LineLoop;
  trail: THREE.Line;
  trailPositions: THREE.Vector3[];
}

const EARTH_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Procedural "holo-Earth": fbm-noise continents rendered as glowing teal
// landmasses over a deep ocean, plus a cyan fresnel rim and a slow scanline.
const EARTH_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.1;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 n = normalize(vPos);
    float continents = fbm(n * 2.6 + vec3(4.2, 1.7, 9.3));
    float land = smoothstep(0.52, 0.56, continents);
    float coast = smoothstep(0.48, 0.52, continents) - land;

    vec3 ocean = vec3(0.008, 0.035, 0.11);
    vec3 landCol = vec3(0.05, 0.55, 0.55);
    vec3 coastCol = vec3(0.13, 0.83, 0.93);
    vec3 col = ocean + landCol * land + coastCol * coast * 1.6;

    // City-light shimmer on land
    float lights = noise(n * 40.0 + uTime * 0.05);
    col += land * smoothstep(0.75, 0.95, lights) * vec3(0.9, 0.85, 0.4) * 0.35;

    // Holographic latitude scanline sweeping the globe
    float scan = smoothstep(0.985, 1.0, sin(n.y * 40.0 - uTime * 1.2) * 0.5 + 0.5);
    col += scan * vec3(0.1, 0.6, 0.8) * 0.35;

    // Fresnel rim glow
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);
    col += fresnel * vec3(0.15, 0.75, 1.0) * 0.8;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const ATMO_VERT = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMO_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(0.2, 0.65, 1.0, 1.0) * intensity * 1.4;
  }
`;

/** Radial-gradient sprite texture generated in memory (no asset files needed). */
function makeGlowTexture(size = 64): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  const c = (size - 1) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.sqrt((x - c) * (x - c) + (y - c) * (y - c)) / c;
      const a = Math.max(0, 1 - d);
      const v = Math.pow(a, 2.2) * 255;
      const i = (y * size + x) * 4;
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = v;
    }
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.needsUpdate = true;
  return tex;
}

const TRAIL_LENGTH = 160;

export class OrbitalScene {
  private renderer: Renderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private gl: ExpoWebGLRenderingContext;
  private earthMaterial: THREE.ShaderMaterial;
  private earthGroup = new THREE.Group();
  private satellites = new Map<string, SatelliteEntry>();
  private glowTexture = makeGlowTexture();

  private rafId = 0;
  private disposed = false;
  private lastFrameMs = 0;

  /** Simulation clock (seconds since epoch) and controls. */
  simTimeSec = 0;
  speedMultiplier = 60; // simulated seconds per real second
  paused = false;

  /** Spherical camera state. */
  private camDistance = 4.2;
  private camTheta = 0.6;
  private camPhi = 1.25;

  onTelemetry?: (telemetry: SatelliteTelemetry[]) => void;

  constructor(gl: ExpoWebGLRenderingContext) {
    this.gl = gl;
    this.renderer = new Renderer({ gl });
    this.renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.renderer.setClearColor(0x030616, 1);

    this.camera = new THREE.PerspectiveCamera(
      55,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.05,
      200
    );

    // --- Earth ---
    this.earthMaterial = new THREE.ShaderMaterial({
      vertexShader: EARTH_VERT,
      fragmentShader: EARTH_FRAG,
      uniforms: { uTime: { value: 0 } },
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), this.earthMaterial);
    this.earthGroup.add(earth);

    // Holographic wireframe overlay
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(1.004, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      })
    );
    this.earthGroup.add(wire);
    this.scene.add(this.earthGroup);

    // Atmosphere glow shell
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.16, 48, 48),
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      })
    );
    this.scene.add(atmosphere);

    // Equatorial reference ring
    const ringGeo = new THREE.RingGeometry(1.6, 1.605, 128);
    const ring = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      })
    );
    ring.rotation.x = Math.PI / 2;
    this.scene.add(ring);

    // --- Starfield ---
    const starCount = 1600;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starColor = new THREE.Color();
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const tint = Math.random();
      starColor.setHSL(tint < 0.7 ? 0.58 : 0.75, 0.4, 0.55 + Math.random() * 0.4);
      starColors[i * 3] = starColor.r;
      starColors[i * 3 + 1] = starColor.g;
      starColors[i * 3 + 2] = starColor.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 0.55, vertexColors: true, transparent: true, opacity: 0.9 })
    );
    this.scene.add(stars);

    // Lights (satellite meshes are MeshStandardMaterial)
    this.scene.add(new THREE.AmbientLight(0x8899bb, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(8, 3, 5);
    this.scene.add(sun);

    this.updateCamera();
    this.lastFrameMs = performance.now();
    this.loop();
  }

  addSatellite(id: string, elements: OrbitalElements, colorHex: string): void {
    this.removeSatellite(id);
    const color = new THREE.Color(colorHex);

    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.035, 0),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.6,
        metalness: 0.4,
        roughness: 0.25,
      })
    );

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTexture,
        color,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    glow.scale.setScalar(0.28);

    // Full orbit ellipse
    const pathPoints = sampleOrbitPath(elements, 160).map(
      (p) => new THREE.Vector3(p.x * KM, p.z * KM, p.y * KM)
    );
    const orbitLine = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pathPoints),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
    );

    // Fading trail behind the satellite
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL_LENGTH * 3), 3));
    const trailColors = new Float32Array(TRAIL_LENGTH * 3);
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const fade = i / TRAIL_LENGTH;
      trailColors[i * 3] = color.r * fade;
      trailColors[i * 3 + 1] = color.g * fade;
      trailColors[i * 3 + 2] = color.b * fade;
    }
    trailGeo.setAttribute("color", new THREE.BufferAttribute(trailColors, 3));
    const trail = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      })
    );
    trail.frustumCulled = false;

    this.scene.add(mesh, glow, orbitLine, trail);
    this.satellites.set(id, { id, elements, color, mesh, glow, orbitLine, trail, trailPositions: [] });
  }

  removeSatellite(id: string): void {
    const entry = this.satellites.get(id);
    if (!entry) return;
    for (const obj of [entry.mesh, entry.glow, entry.orbitLine, entry.trail]) {
      this.scene.remove(obj);
    }
    entry.mesh.geometry.dispose();
    entry.orbitLine.geometry.dispose();
    entry.trail.geometry.dispose();
    this.satellites.delete(id);
  }

  clearSatellites(): void {
    for (const id of [...this.satellites.keys()]) this.removeSatellite(id);
  }

  orbitCamera(dxPx: number, dyPx: number): void {
    this.camTheta -= dxPx * 0.008;
    this.camPhi = Math.max(0.15, Math.min(Math.PI - 0.15, this.camPhi - dyPx * 0.008));
    this.updateCamera();
  }

  zoomCamera(scale: number): void {
    this.camDistance = Math.max(1.6, Math.min(18, this.camDistance / scale));
    this.updateCamera();
  }

  private updateCamera(): void {
    this.camera.position.set(
      this.camDistance * Math.sin(this.camPhi) * Math.sin(this.camTheta),
      this.camDistance * Math.cos(this.camPhi),
      this.camDistance * Math.sin(this.camPhi) * Math.cos(this.camTheta)
    );
    this.camera.lookAt(0, 0, 0);
  }

  private loop = (): void => {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this.loop);

    const now = performance.now();
    const dt = Math.min(0.1, (now - this.lastFrameMs) / 1000);
    this.lastFrameMs = now;

    this.earthMaterial.uniforms.uTime.value = now / 1000;
    this.earthGroup.rotation.y += dt * 0.03;

    if (!this.paused) {
      this.simTimeSec += dt * this.speedMultiplier;
    }

    const telemetry: SatelliteTelemetry[] = [];
    for (const entry of this.satellites.values()) {
      const { position, speedKmS } = propagate(entry.elements, this.simTimeSec);
      // Physics frame (x,y in equatorial plane, z up) → scene frame (y up)
      const scenePos = new THREE.Vector3(position.x * KM, position.z * KM, position.y * KM);
      entry.mesh.position.copy(scenePos);
      entry.glow.position.copy(scenePos);
      entry.mesh.rotation.y += dt * 2;
      entry.mesh.rotation.x += dt * 1.2;

      if (!this.paused) {
        entry.trailPositions.push(scenePos.clone());
        if (entry.trailPositions.length > TRAIL_LENGTH) entry.trailPositions.shift();
        const attr = entry.trail.geometry.getAttribute("position") as THREE.BufferAttribute;
        const count = entry.trailPositions.length;
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          const p = entry.trailPositions[Math.min(i, count - 1)] ?? scenePos;
          attr.setXYZ(i, p.x, p.y, p.z);
        }
        attr.needsUpdate = true;
      }

      const rKm = Math.sqrt(
        position.x * position.x + position.y * position.y + position.z * position.z
      );
      telemetry.push({ id: entry.id, altitudeKm: rKm - EARTH_RADIUS_KM, speedKmS });
    }
    this.onTelemetry?.(telemetry);

    this.renderer.render(this.scene, this.camera);
    this.gl.endFrameEXP();
  };

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.clearSatellites();
    this.glowTexture.dispose();
  }
}
