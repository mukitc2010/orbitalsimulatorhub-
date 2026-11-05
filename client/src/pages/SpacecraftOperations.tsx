import { useEffect, useRef } from "react";
import * as THREE from "three";
import { loopCraftPlan } from "../lib/spacecraftLoop";
import { FAULTS, faultEvents, signalDelaySeconds, type CraftMode } from "../lib/spacecraftPlan";

const SYS = [
  { n: "Power", m: [-3, 0.3, 3.8], d: "Solar arrays turn sunlight into electricity and charge batteries for eclipses. Every other system depends on it.", a: "AI can reroute loads and re-aim arrays. A robot can free a stuck joint or replace a connector." },
  { n: "Propulsion", m: [-6.6, 0.4, 0], d: "Engines burn propellant to change the ship’s velocity. Thrust is limited, so burns are planned to the second.", a: "AI can replan burns around a weak engine. A robot can replace a valve or injector." },
  { n: "Life support", m: [-0.5, 4, 0], d: "Scrubs CO₂, recycles water and holds cabin pressure and temperature. The spinning ring adds artificial gravity.", a: "AI balances consumables. A robot can swap filters or seal a leak." },
  { n: "Thermal", m: [-4.2, 2.4, 0], d: "Radiators shed waste heat, because space has no air to carry it away.", a: "AI predicts hot spots. A robot can repair a coolant line or a damaged radiator panel." },
  { n: "Comms", m: [3, 3.3, 0], d: "The dish talks to Earth at light speed, so the delay grows with distance. Mars is minutes away; the nearest star is years away.", a: "Onboard AI can act without waiting for an answer from Earth." },
  { n: "Navigation", m: [6.4, 0.7, 0], d: "Star trackers and inertial sensors tell the ship where it points and where it is. The guidance computer plans every burn.", a: "AI cross-checks sensors. A robot can clean or recalibrate a star tracker." },
] as const;

const MODES = [
  { n: "Ground control", d: "Telemetry travels to Earth, engineers diagnose, a command travels back, and a teleoperated robot repairs. Every step waits on the delay.", rate: 2.2, speed: 1.6, rd: 6 },
  { n: "Onboard AGI", d: "A general-purpose onboard intelligence diagnoses the fault, plans the repair and dispatches the humanoid on its own, then informs Earth.", rate: 2.2, speed: 4, rd: 3.5 },
  { n: "ASI (concept)", d: "A hypothetical superintelligence spots precursors before failure, contains the damage and improvises a custom repair. No such system exists.", rate: 0.5, speed: 6, rd: 2 },
];

export function SpacecraftOperations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const q = <T extends HTMLElement>(id: string) => root.querySelector<T>(`#${id}`)!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      canvas.replaceWith(Object.assign(document.createElement("p"), { textContent: "This simulator needs WebGL, which this browser doesn’t support.", style: "padding:24px" }));
      return;
    }
    const V = THREE.Vector3;
    const ease = (f: number) => (f < 0.5 ? 2 * f * f : 1 - ((-2 * f + 2) ** 2) / 2);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    let mode: CraftMode = 0;
    let simT = 0;
    let sel = 0;
    let inc: { sys: number; t0: number; low: number; fixed: boolean } | null = null;
    let follow = false;
    let paused = false;
    let playSpeed = 1;
    let faultIx = 0;
    let dDes = 52;
    let auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const H = SYS.map(() => 100);
    const res = MODES.map(() => null as null | { t: number; low: number; restored: boolean; fault: string });
    const logs: string[] = [];
    const pulses: { m: THREE.Mesh; a: THREE.Vector3; b: THREE.Vector3; t: number; d: number }[] = [];
    const steps: { t: number; f: () => void }[] = [];
    const points = SYS.map((s) => new V(...s.m));
    const hover = points.map((v) => v.clone().add(new V(0, 1.6, 0)));
    const AIR = new V(0.5, 1.9, 0);
    const EP = new V(-34, 10, -30);
    const DP = new V(3, 3.3, 0);

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    scene.background = new THREE.Color(0x05080f);
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(30, 40, 20);
    scene.add(new THREE.AmbientLight(0x8899bb, 0.55), sun);
    const starPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 900; i++) {
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      starPoints.push(new V(s * Math.cos(a) * 900, u * 900, s * Math.sin(a) * 900));
    }
    const stars = new THREE.Points(new THREE.BufferGeometry().setFromPoints(starPoints), new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, sizeAttenuation: false }));
    scene.add(stars);
    const mat = (c: number, metalness = 0.5, roughness = 0.45) => new THREE.MeshStandardMaterial({ color: c, metalness, roughness, side: THREE.DoubleSide });
    const ship = new THREE.Group();
    scene.add(ship);
    const add = (g: THREE.BufferGeometry, material: THREE.Material, p: number[], parent: THREE.Object3D = ship) => {
      const o = new THREE.Mesh(g, material);
      o.position.set(p[0], p[1], p[2]);
      parent.add(o);
      return o;
    };
    const hull = mat(0xdfe5ee);
    const dark = mat(0x3a4254, 0.8, 0.4);
    const panel = mat(0x1b3a7a, 0.6, 0.3);
    const bodyTube = add(new THREE.CylinderGeometry(1.6, 1.6, 12, 24), hull, [0, 0, 0]);
    bodyTube.rotation.z = Math.PI / 2;
    const nose = add(new THREE.ConeGeometry(1.6, 3, 24), hull, [7.5, 0, 0]);
    nose.rotation.z = -Math.PI / 2;
    const engine = add(new THREE.CylinderGeometry(0.9, 1.4, 1.8, 20), dark, [-6.9, 0, 0]);
    engine.rotation.z = Math.PI / 2;
    const flame = add(new THREE.ConeGeometry(0.9, 4, 12), new THREE.MeshBasicMaterial({ color: 0x8fd0ff, transparent: true, opacity: 0.85 }), [-9.8, 0, 0]);
    flame.rotation.z = Math.PI / 2;
    add(new THREE.BoxGeometry(0.5, 0.6, 0.5), dark, [6.4, 0.9, 0]);
    add(new THREE.CylinderGeometry(0.08, 0.08, 1.6), dark, [3, 1.9, 0]);
    const dish = new THREE.Group();
    dish.position.copy(DP);
    ship.add(dish);
    const dishMesh = add(new THREE.SphereGeometry(1.2, 20, 8, 0, Math.PI * 2, 0, 0.8), mat(0xffffff, 0.3, 0.4), [0, 0, 0], dish);
    dishMesh.rotation.x = -Math.PI / 2;
    dish.lookAt(EP);
    add(new THREE.BoxGeometry(3, 0.06, 2.4), mat(0xf4f4f4, 0.2, 0.5), [-4.2, 2.2, 0]);
    add(new THREE.CylinderGeometry(0.06, 0.06, 0.7), dark, [-4.2, 1.85, 0]);
    [-1, 1].forEach((s) => {
      const boom = add(new THREE.CylinderGeometry(0.08, 0.08, 9), dark, [-3, 0, s * 4.5]);
      boom.rotation.x = Math.PI / 2;
      add(new THREE.BoxGeometry(3.2, 0.08, 5), panel, [-3, 0, s * 6.8]);
    });
    const ring = new THREE.Group();
    ring.position.set(-0.5, 0, 0);
    ship.add(ring);
    const torus = add(new THREE.TorusGeometry(3.6, 0.45, 12, 40), mat(0xc9d2e0), [0, 0, 0], ring);
    torus.rotation.y = Math.PI / 2;
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + 0.5;
      const spoke = add(new THREE.CylinderGeometry(0.07, 0.07, 3.6), dark, [0, 1.8 * Math.cos(a), 1.8 * Math.sin(a)], ring);
      spoke.rotation.x = a;
    }
    const earth = new THREE.Mesh(new THREE.SphereGeometry(3.5, 24, 16), new THREE.MeshStandardMaterial({ color: 0x2b6fd6, emissive: 0x0a1f4a, roughness: 0.8 }));
    earth.position.copy(EP);
    scene.add(earth);
    const beacons = points.map((v) => {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), new THREE.MeshBasicMaterial({ color: 0x3ddc84 }));
      b.position.copy(v);
      ship.add(b);
      return b;
    });
    const robot = new THREE.Group();
    const white = mat(0xf2f4f8, 0.2, 0.5);
    const grey = mat(0x6c7587, 0.6, 0.4);
    const red = new THREE.MeshStandardMaterial({ color: 0xfc3d21 });
    const vis = new THREE.MeshBasicMaterial({ color: 0x6fe8ff });
    const body = new THREE.Group();
    robot.add(body);
    add(new THREE.BoxGeometry(0.8, 1.1, 0.5), white, [0, 1.9, 0], body);
    add(new THREE.BoxGeometry(0.82, 0.12, 0.52), red, [0, 1.55, 0], body);
    add(new THREE.BoxGeometry(0.6, 0.85, 0.3), grey, [0, 1.95, -0.4], body);
    add(new THREE.SphereGeometry(0.32, 16, 12), white, [0, 2.7, 0], body);
    add(new THREE.BoxGeometry(0.42, 0.16, 0.1), vis, [0, 2.72, 0.28], body);
    const limb = (w: number, l: number, x: number, y: number, material: THREE.Material) => {
      const p = new THREE.Group();
      p.position.set(x, y, 0);
      body.add(p);
      add(new THREE.BoxGeometry(w, l, w), material, [0, -l / 2, 0], p);
      return p;
    };
    const lA = limb(0.22, 0.95, -0.62, 2.35, white);
    const rA = limb(0.22, 0.95, 0.62, 2.35, white);
    const lL = limb(0.3, 1.1, -0.22, 1.35, grey);
    const rL = limb(0.3, 1.1, 0.22, 1.35, grey);
    robot.scale.setScalar(0.55);
    robot.position.copy(AIR);
    scene.add(robot);
    const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V(), new V()]), new THREE.LineBasicMaterial({ color: 0x6fe8ff }));
    beam.visible = false;
    scene.add(beam);
    const sparks = new THREE.Points(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 24 }, () => new V())), new THREE.PointsMaterial({ color: 0xffd26a, size: 4, sizeAttenuation: false }));
    sparks.visible = false;
    scene.add(sparks);
    const R = { s: "idle", t: 0, dur: 1, from: new V(), to: new V(), sys: 0, speed: 1, rd: 3 };

    const log = (s: string) => {
      logs.push(`T+ ${Math.round(simT)} s  ${s}`);
      q<HTMLElement>("log").innerHTML = logs.slice(-5).map((x) => `<div>${x}</div>`).join("");
    };
    const color = (h: number) => (h > 70 ? "#3ddc84" : h > 35 ? "#f2b84b" : "#fc3d21");
    const showSys = () => {
      q("sn").textContent = SYS[sel].n;
      q("sd").textContent = SYS[sel].d;
      const fault = FAULTS[faultIx];
      q("sa").textContent = fault.system === sel ? fault.role : `Role of AI and robots: ${SYS[sel].a}`;
      [...q<HTMLElement>("slist").children].forEach((b, i) => b.setAttribute("aria-pressed", String(i === sel)));
    };
    const renderRes = () => {
      const peak = Math.max(1, ...res.map((row) => row?.t ?? 0));
      q("res").innerHTML = MODES.map((m, i) => `<tr><td>${m.n}</td><td>${res[i] ? `${res[i]!.t.toFixed(0)} s` : "–"}</td><td>${res[i] ? `${res[i]!.low}%` : "–"}</td><td>${res[i] ? (res[i]!.restored ? "Yes" : "No") : "–"}</td></tr>`).join("");
      q("bars").innerHTML = MODES.map((m, i) => {
        const width = res[i] ? Math.max(8, (res[i]!.t / peak) * 100) : 0;
        return `<div class="cmp"><span>${m.n}</span><i style="width:${width}%"></i><b>${res[i] ? `${res[i]!.t.toFixed(0)} s` : "not run"}</b></div>`;
      }).join("");
    };
    const modeUI = () => {
      [...q<HTMLElement>("modes").children].forEach((b, i) => b.classList.toggle("on", i === mode));
      q("mdesc").textContent = MODES[mode].d;
      q("mname").textContent = MODES[mode].n;
    };
    const dispatch = (i: number, speed: number, rd: number) => {
      Object.assign(R, { s: "out", t: 0, sys: i, speed, rd });
      R.from.copy(AIR);
      R.to.copy(hover[i]);
      R.dur = R.from.distanceTo(R.to) / speed;
    };
    const finish = () => {
      const i = R.sys;
      beam.visible = sparks.visible = false;
      if (inc) {
        inc.fixed = true;
        res[mode] = { t: simT - inc.t0, low: Math.round(inc.low), restored: true, fault: FAULTS[faultIx].name };
        renderRes();
        inc = null;
      }
      log(`Repair complete. ${SYS[i].n} is restoring. ${MODES[mode].n} finished in ${res[mode]!.t.toFixed(0)} s. Run the same fault in another mode to compare.`);
      R.s = "back";
      R.t = 0;
      R.from.copy(robot.position);
      R.to.copy(AIR);
      R.dur = R.from.distanceTo(R.to) / R.speed;
    };
    const pulse = (a: THREE.Vector3, b: THREE.Vector3, d: number, c: number) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8), new THREE.MeshBasicMaterial({ color: c }));
      scene.add(m);
      pulses.push({ m, a, b, t: 0, d });
    };
    const inject = () => {
      if (inc || R.s !== "idle") return;
      const fault = FAULTS[faultIx];
      const i = fault.system;
      const mm = MODES[mode];
      const minutes = Number(q<HTMLInputElement>("dly").value);
      const d = signalDelaySeconds(minutes);
      const plan = loopCraftPlan({ mode, modeName: MODES[mode].n, system: SYS[i].n, delayMinutes: minutes });
      q<HTMLElement>("plan").textContent = plan.text;
      if (!plan.review.ready) { log("Loop engineering held the plan. No robot was dispatched."); return; }
      inc = { sys: i, t0: simT, low: H[i], fixed: false };
      q<HTMLButtonElement>("inj").disabled = true;
      sel = i;
      showSys();
      steps.length = 0;
      const at = (t: number, f: () => void) => steps.push({ t: simT + t, f });
      for (const event of faultEvents(mode, d)) {
        if (event.label === "Robot deploys") at(event.at, () => { log(mode === 0 ? "Command received. Robot deploying." : mode === 1 ? "AGI dispatches the humanoid robot. Earth informed." : "ASI dispatches the robot with a custom repair plan."); dispatch(i, mm.speed, mm.rd); });
        else if (event.at === 0) log(mode === 2 ? `ASI concept: precursor of ${fault.name.toLowerCase()} contained. This mode is hypothetical.` : `Fault: ${fault.name}.${fault.cascade.length ? ` ${SYS[fault.cascade[0]].n} begins to follow.` : ""} ${mode === 0 ? "Sending telemetry to Earth." : "Onboard mode does not wait for Earth."}`);
        else at(event.at, () => log(event.label + "."));
      }
      if (mode === 0) pulse(DP, EP, d, 0xf2b84b);
      if (mode === 0) at(d + 5, () => pulse(EP, DP, d, 0x3d7be0));
      if (mode === 1) pulse(DP, EP, d, 0xf2b84b);
    };
    const robotStep = (dt: number, ts: number) => {
      let sw = 0;
      if (R.s === "out" || R.s === "back") {
        R.t += dt;
        const f = Math.min(1, R.t / R.dur);
        robot.position.lerpVectors(R.from, R.to, ease(f));
        const delta = R.to.clone().sub(R.from);
        if (Math.abs(delta.x) + Math.abs(delta.z) > 0.1) robot.rotation.y = Math.atan2(delta.x, delta.z);
        sw = Math.sin(ts / 120) * 0.7;
        if (f >= 1) {
          if (R.s === "out") { R.s = "repair"; R.t = 0; log(`Robot is working on ${SYS[R.sys].n}. ${follow ? "Camera is following the robot." : "Turn on Follow robot to watch the repair."}`); }
          else { R.s = "idle"; q<HTMLButtonElement>("inj").disabled = false; log("Robot stowed in airlock."); }
        }
      } else if (R.s === "repair") {
        R.t += dt;
        rA.rotation.x = -1.1 + Math.sin(ts / 90) * 0.15;
        lL.rotation.x = lA.rotation.x = 0;
        const m = points[R.sys];
        beam.visible = sparks.visible = true;
        const p = beam.geometry.getAttribute("position") as THREE.BufferAttribute;
        p.setXYZ(0, robot.position.x, robot.position.y + 1.1, robot.position.z);
        p.setXYZ(1, m.x, m.y, m.z);
        p.needsUpdate = true;
        const sparkPos = sparks.geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < 24; i++) sparkPos.setXYZ(i, m.x + (Math.random() - 0.5) * 1.2, m.y + Math.random() * 0.8, m.z + (Math.random() - 0.5) * 1.2);
        sparkPos.needsUpdate = true;
        if (R.t >= R.rd) finish();
      }
      if (R.s !== "repair") { rA.rotation.x = -sw; lA.rotation.x = sw; rL.rotation.x = sw; lL.rotation.x = -sw; }
    };

    SYS.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "row";
      b.type = "button";
      b.innerHTML = `<span>${s.n}</span><span class="pc"></span><span class="bar"><i></i></span>`;
      b.onclick = () => { sel = i; showSys(); };
      q("slist").appendChild(b);
    });
    MODES.forEach((m, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = m.n;
      b.onclick = () => { mode = i as CraftMode; modeUI(); };
      q("modes").appendChild(b);
    });
    q<HTMLInputElement>("dly").oninput = () => { q("dv").textContent = `${q<HTMLInputElement>("dly").value} min`; };
    q<HTMLInputElement>("dly").oninput?.(new Event("input"));
    FAULTS.forEach((fault, i) => {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = fault.name;
      q("fault").appendChild(option);
    });
    q<HTMLSelectElement>("fault").onchange = () => { faultIx = Number(q<HTMLSelectElement>("fault").value); showSys(); };
    q("inj").onclick = inject;
    q("pause").onclick = () => {
      paused = !paused;
      q("pause").textContent = paused ? "Resume" : "Pause";
      q("pause").setAttribute("aria-pressed", String(paused));
      log(paused ? "Simulation paused." : "Simulation resumed.");
    };
    q<HTMLSelectElement>("spd").onchange = () => { playSpeed = Number(q<HTMLSelectElement>("spd").value); log(`Speed set to ${playSpeed}×.`); };
    q("rst").onclick = () => {
      for (let i = 0; i < H.length; i++) H[i] = 100;
      inc = null;
      steps.length = 0;
      R.s = "idle";
      robot.position.copy(AIR);
      beam.visible = sparks.visible = false;
      q<HTMLButtonElement>("inj").disabled = false;
      log("Ship reset to full health. Comparison results were kept.");
    };
    q("fol").onclick = () => {
      follow = !follow;
      q("fol").setAttribute("aria-pressed", String(follow));
      q("fol").classList.toggle("on", follow);
      dDes = follow ? 11 : 52;
    };
    modeUI();
    showSys();
    renderRes();
    log("Systems nominal. Choose a mode and inject a fault.");

    const rot = { th: 0.9, ph: 1.15, d: 52 };
    const tgt = new V();
    const ptr = new Map<number, [number, number]>();
    const zoom = (f: number) => { rot.d = clamp(rot.d * f, 5, 250); dDes = rot.d; };
    const down = (e: PointerEvent) => { canvas.setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); auto = false; };
    const move = (e: PointerEvent) => {
      const p = ptr.get(e.pointerId);
      if (!p) return;
      if (ptr.size === 1) { rot.th -= (e.clientX - p[0]) * 0.007; rot.ph = clamp(rot.ph - (e.clientY - p[1]) * 0.007, 0.12, 1.55); }
      else if (ptr.size === 2) {
        const other = [...ptr].find(([id]) => id !== e.pointerId)![1];
        zoom(Math.hypot(p[0] - other[0], p[1] - other[1]) / Math.hypot(e.clientX - other[0], e.clientY - other[1]));
      }
      ptr.set(e.pointerId, [e.clientX, e.clientY]);
    };
    const up = (e: PointerEvent) => ptr.delete(e.pointerId);
    const wheel = (e: WheelEvent) => { e.preventDefault(); zoom(1 + e.deltaY * 0.001); };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("wheel", wheel, { passive: false });

    let last = 0;
    let frame = 0;
    let alive = true;
    const loop = (ts: number) => {
      if (!alive) return;
      frame = requestAnimationFrame(loop);
      const raw = Math.min(0.05, (ts - last) / 1000 || 0);
      last = ts;
      const dt = paused ? 0 : raw * playSpeed;
      simT += dt;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w && h && (renderer.domElement.width !== w || camera.aspect !== w / h)) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      for (let i = steps.length - 1; i >= 0; i--) if (simT >= steps[i].t) steps.splice(i, 1)[0].f();
      const bad = inc && !inc.fixed ? inc.sys : -1;
      const cascade = inc && !inc.fixed ? FAULTS[faultIx].cascade : [];
      H.forEach((v, i) => {
        if (i === bad && inc) { H[i] = Math.max(5, v - MODES[mode].rate * dt); inc.low = Math.min(inc.low, H[i]); }
        else if (cascade.includes(i)) H[i] = Math.max(20, v - MODES[mode].rate * 0.45 * dt);
        else if (v < 100) H[i] = Math.min(100, v + 40 * dt);
        const row = q<HTMLElement>("slist").children[i];
        row.querySelector(".pc")!.textContent = `${Math.round(H[i])}%`;
        const bar = row.querySelector("i") as HTMLElement;
        bar.style.width = `${H[i]}%`;
        bar.style.background = color(H[i]);
        const flash = i === bad || (R.s === "repair" && i === R.sys) ? 0.5 + 0.5 * Math.sin(simT * 10) : 0;
        (beacons[i].material as THREE.MeshBasicMaterial).color.set(i === bad ? (flash > 0.5 ? "#fc3d21" : "#7a1c10") : color(H[i]));
        beacons[i].scale.setScalar(i === bad ? 1 + flash : i === sel ? 1.7 : 1);
      });
      ring.rotation.x += dt * 0.3;
      stars.rotation.y += dt * 0.004;
      flame.scale.set(1, 0.35 + 0.65 * (H[1] / 100) * (0.9 + 0.1 * Math.sin(simT * 40)), 1);
      robotStep(dt, ts);
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt;
        p.m.position.lerpVectors(p.a, p.b, Math.min(1, p.t / p.d));
        if (p.t >= p.d) { scene.remove(p.m); pulses.splice(i, 1); }
      }
      q("clk").textContent = `T+ ${Math.round(simT)} s`;
      if (auto) rot.th += dt * 0.05;
      const focus = follow && R.s !== "idle" ? robot.position : new V();
      tgt.lerp(focus, 1 - 0.003 ** dt);
      rot.d += (dDes - rot.d) * (1 - 0.03 ** dt);
      camera.position.set(
        tgt.x + rot.d * Math.sin(rot.ph) * Math.cos(rot.th),
        tgt.y + rot.d * Math.cos(rot.ph),
        tgt.z + rot.d * Math.sin(rot.ph) * Math.sin(rot.th),
      );
      camera.lookAt(tgt);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("wheel", wheel);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className="craft-ops">
      <header className="top"><div><strong>Spacecraft Operations Simulator</strong><small>Orbital Simulator Hub</small></div><div><b id="clk">T+ 0 s</b><span id="mname"></span></div></header>
      <div className="main">
        <div id="stage"><canvas ref={canvasRef} id="cv" aria-label="3D animated spacecraft with a humanoid repair robot. Drag to rotate, scroll to zoom." /></div>
        <section className="panel" id="ctl" aria-label="Controls">
          <h2>Operations mode</h2>
          <div className="modes" id="modes" />
          <p id="mdesc" />
          <details>
            <summary>What the modes mean</summary>
            <p className="fine">Ground control waits for the radio round trip. Onboard AGI and ASI are hypothetical teaching modes. Real spacecraft use limited fault protection, not a general intelligence.</p>
          </details>
          <label htmlFor="fault">Fault</label>
          <select id="fault" aria-label="Fault type" />
          <label htmlFor="dly">One-way signal delay: <b id="dv">12 min</b></label>
          <input id="dly" type="range" min={1} max={24} defaultValue={12} />
          <p className="fine">Mars one-way light time is about 3 to 22 minutes. Here, 1 minute equals 1.5 seconds so you can watch the wait.</p>
          <p className="actions"><button className="pri" id="inj" type="button">Inject fault</button> <button id="fol" type="button" aria-pressed="false">Follow robot</button></p>
          <p className="actions"><button id="pause" type="button" aria-pressed="false">Pause</button> <button id="rst" type="button">Reset</button>
            <label htmlFor="spd">Speed <select id="spd" defaultValue="1" aria-label="Simulation speed"><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option></select></label>
          </p>
          <p className="fine">AGI and ASI are hypothetical. Real spacecraft use limited automation, and humanoids like Valkyrie and Robonaut 2 are research systems.</p>
        </section>
        <section className="panel" id="sys" aria-label="Spacecraft systems">
          <h2>Systems</h2><div id="slist" />
          <h3 id="sn" />
          <p id="sd" />
          <p id="sa" className="fine" />
          <h3>Reviewed plan</h3>
          <pre id="plan">Inject a fault to run the operations loop.</pre>
          <details>
            <summary>System notes</summary>
            <p className="fine">Power feeds every other box. Propulsion changes velocity. Life support holds the cabin. Thermal dumps heat. Comms is limited by light speed. Navigation tells the ship where it is.</p>
          </details>
          <h3>Results by mode</h3>
          <p className="fine">Run the same fault in each mode. The bar is time to repair. A longer bar means a slower response.</p>
          <div id="bars" />
          <table><thead><tr><th>Mode</th><th>Fixed in</th><th>Lowest health</th><th>Restored</th></tr></thead><tbody id="res" /></table>
        </section>
        <section id="log" aria-live="polite" />
      </div>
      <style>{`
        .craft-ops{--bg:#05080f;--panel:rgba(10,17,31,.92);--line:#22314f;--ink:#e9eef8;--mute:#8fa0bf;--blue:#3d7be0;background:var(--bg);color:var(--ink);min-height:calc(100vh - 8rem);display:flex;flex-direction:column;margin:-1.5rem -1rem 0}
        .craft-ops .top{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-top:3px solid var(--blue);border-bottom:1px solid var(--line);background:#070d1a}
        .craft-ops .top strong{display:block}.craft-ops .top small,.craft-ops .top span{color:var(--mute)}
        .craft-ops .main{position:relative;flex:1;min-height:640px}
        .craft-ops #stage{position:absolute;inset:0}
        .craft-ops #cv{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
        .craft-ops .panel{position:absolute;top:10px;background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:12px;overflow:auto;max-height:calc(100% - 20px)}
        .craft-ops #ctl{left:10px;width:265px}.craft-ops #sys{right:10px;width:300px}
        .craft-ops h2{margin:0 0 8px;font-size:1rem}.craft-ops h3{margin:12px 0 4px}
        .craft-ops p{margin:6px 0}.craft-ops .fine{color:var(--mute);font-size:.78rem}
        .craft-ops button,.craft-ops select{background:#10203c;color:var(--ink);border:1px solid var(--line);border-radius:3px;padding:10px 12px;min-height:44px;cursor:pointer;font-size:1rem}
        .craft-ops .actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
        .craft-ops summary{cursor:pointer;font-weight:700}
        .craft-ops .cmp{display:grid;grid-template-columns:92px 1fr 64px;gap:6px;align-items:center;margin:4px 0;font-size:.78rem}
        .craft-ops .cmp i{display:block;height:10px;background:#3d7be0;border-radius:3px}
        .craft-ops select{width:100%}
        .craft-ops button.on,.craft-ops button.pri{background:var(--blue);border-color:var(--blue)}
        .craft-ops button:disabled{opacity:.45}
        .craft-ops .modes{display:grid;gap:6px}.craft-ops .modes button{text-align:left}
        .craft-ops .row{display:grid;grid-template-columns:1fr 44px;gap:2px 8px;width:100%;text-align:left;margin-bottom:6px}
        .craft-ops .row[aria-pressed=true]{border-color:#fc3d21}
        .craft-ops .bar{grid-column:1/3;height:6px;background:#1a2745;border-radius:3px;overflow:hidden}
        .craft-ops .bar i{display:block;height:100%;width:100%;background:#3ddc84}
        .craft-ops input[type=range]{width:100%}
        .craft-ops #plan{white-space:pre-wrap;font:12px/1.4 ui-monospace,monospace;color:#d7e3ff;margin:0}
        .craft-ops table{width:100%;border-collapse:collapse;font-size:.85rem}
        .craft-ops td,.craft-ops th{padding:4px 2px;text-align:left;border-bottom:1px solid var(--line);color:var(--mute);font-weight:400}
        .craft-ops #log{position:absolute;left:285px;right:320px;bottom:10px;background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:8px 12px;font-size:.85rem;min-height:48px}
        .craft-ops #log div:last-child{font-weight:700;color:#fff}
        @media(max-width:900px){.craft-ops .main{display:flex;flex-direction:column;min-height:0}.craft-ops #stage{position:relative;height:62vh;order:0}.craft-ops #ctl{order:1}.craft-ops #log{order:2}.craft-ops #sys{order:3}.craft-ops .panel,.craft-ops #log{position:static;width:auto!important;left:auto;right:auto;margin:10px;max-height:none}.craft-ops .top{align-items:flex-start;gap:8px}}
      `}</style>
    </div>
  );
}
