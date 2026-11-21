import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Line, OrbitControls, Stars } from "@react-three/drei";
import { unpack } from "msgpackr";
import { demoPacket, demoPosition, EARTH_METERS, isSwarmPacket, type SwarmPacket } from "../lib/swarmDemo";
import "./SpaceAGISwarmSimulator.css";

class SceneBoundary extends Component<{children:ReactNode}, {failed:boolean}> {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  render() { return this.state.failed ? <div className="swarm-fallback">3D rendering is unavailable on this device. Telemetry and playback controls remain available below.</div> : this.props.children; }
}
function Scene({packet, demo, avoidance, selected, select, cameraKey}: {packet:SwarmPacket; demo:boolean; avoidance:boolean; selected:number; select:(id:number)=>void; cameraKey:number}) {
  const { camera } = useThree();
  useEffect(() => { camera.position.set(2.5,1.8,3.2); camera.lookAt(0,0,0); }, [camera,cameraKey]);
  const paths = useMemo(() => [0,2,3,4].map(id => Array.from({length:129},(_,i) => demoPosition(id, i/128 * 6500, false))), []);
  const trail = useMemo(() => Array.from({length:80},(_,i) => demoPosition(0,packet.t-80+i,avoidance)),[packet.t,avoidance]);
  return <>
    <ambientLight intensity={0.65}/><directionalLight position={[4,3,5]} intensity={2.5}/>
    <Stars radius={35} depth={30} count={1200} factor={2} fade/>
    <mesh><sphereGeometry args={[1,64,48]}/><meshStandardMaterial color="#123e59" roughness={0.85}/></mesh>
    <mesh scale={1.003}><sphereGeometry args={[1,24,16]}/><meshBasicMaterial color="#4ca3ae" wireframe transparent opacity={0.14}/></mesh>
    <mesh scale={1.035}><sphereGeometry args={[1,48,32]}/><meshBasicMaterial color="#56cfe8" transparent opacity={0.06} depthWrite={false}/></mesh>
    {demo && paths.map((points,i)=><Line key={i} points={points} color={i===0?"#dbb978":"#43869c"} lineWidth={1} transparent opacity={0.4}/>)}
    {demo && <Line points={trail} color={avoidance?"#7ef2bf":"#ffad86"} lineWidth={3}/>}
    {packet.satellites.map(s => <group key={s.id} position={s.r.map(x=>x/EARTH_METERS) as [number,number,number]}>
      <mesh onClick={e=>{e.stopPropagation();select(s.id)}}><sphereGeometry args={[s.id===selected?0.026:0.015,8,8]}/><meshBasicMaterial color={s.id===selected?"#ffffff":s.risk>0.5?"#ff805e":s.id<2?"#f7c96a":"#7ef2da"}/></mesh>
      {(s.id===selected||s.id<2)&&<mesh><boxGeometry args={[0.075,0.012,0.026]}/><meshBasicMaterial color={s.id===selected?"#b1e8ff":"#d5ae64"}/></mesh>}
    </group>)}
    <OrbitControls key={cameraKey} makeDefault minDistance={1.65} maxDistance={9} enablePan={false}/>
  </>;
}
export function SpaceAGISwarmSimulator() {
  const [mode,setMode]=useState<"demo"|"live">("demo");
  const [playing,setPlaying]=useState(()=>!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [time,setTime]=useState(0), [speed,setSpeed]=useState(30), [count,setCount]=useState(24), [avoidance,setAvoidance]=useState(true), [selected,setSelected]=useState(0), [cameraKey,setCameraKey]=useState(0);
  const [live,setLive]=useState<SwarmPacket|null>(null), [status,setStatus]=useState("Not connected"), [retry,setRetry]=useState(0);
  useEffect(()=>{if(mode!=="demo"||!playing)return;let last=performance.now();const timer=window.setInterval(()=>{const now=performance.now();const dt=Math.min((now-last)/1000,0.5);last=now;setTime(t=>Math.min(360,t+dt*speed))},100);return()=>clearInterval(timer)},[mode,playing,speed]);
  useEffect(()=>{if(time>=360)setPlaying(false)},[time]);
  useEffect(()=>{
    if(mode!=="live")return;
    setLive(null);setStatus("Connecting");
    const url=import.meta.env.VITE_SWARM_WS_URL || (["localhost","127.0.0.1"].includes(location.hostname)?"ws://localhost:8000/ws/simulation":"");
    if(!url){setStatus("Live service is not configured. The browser demo is ready to use.");return;}
    let ws:WebSocket;try{ws=new WebSocket(url)}catch{setStatus("Unable to open live service");return;}
    let active=true;ws.binaryType="arraybuffer";let last=Date.now();
    ws.onopen=()=>{if(active)setStatus("Connected - awaiting telemetry")};
    ws.onmessage=e=>{if(!active)return;try{const p=typeof e.data==="string"?JSON.parse(e.data):unpack(new Uint8Array(e.data));if(isSwarmPacket(p)){last=Date.now();setLive(p);setStatus("Live telemetry")}else setStatus("Invalid telemetry received")}catch{setStatus("Unable to decode telemetry")}};
    ws.onerror=()=>{if(active)setStatus("Live connection unavailable")};ws.onclose=()=>{if(active)setStatus("Disconnected - last received frame")};
    const timer=setInterval(()=>{if(Date.now()-last>10000)setStatus("No recent telemetry - reconnect or use demo")},2000);
    return()=>{active=false;clearInterval(timer);ws.close()};
  },[mode,retry]);
  const packet=mode==="demo"?demoPacket(time,count,avoidance):live||{t:0,satellites:[],num_candidates:0};
  const satellite=packet.satellites.find(s=>s.id===selected)||packet.satellites[0];
  const pairGap=mode==="demo" && packet.satellites.length>=2?Math.hypot(...packet.satellites[0].r.map((v,i)=>v-packet.satellites[1].r[i]))/1000:null;
  return <div className="swarm-lab">
    <header><p className="swarm-kicker">SPACE-AGI / INTERACTIVE SWARM LAB</p><h1>Intelligence in orbit.</h1><p>Explore an animated constellation, inspect its satellites, and replay a close-approach scenario in 3D.</p></header>
    <div className="swarm-toolbar"><div role="group" aria-label="Simulation source"><button aria-pressed={mode==="demo"} onClick={()=>setMode("demo")}>Browser demo</button><button aria-pressed={mode==="live"} onClick={()=>setMode("live")}>Live backend</button></div><span role="status">{mode==="demo"?"DEMO / RUNS IN YOUR BROWSER":status}</span></div>
    <div className="swarm-layout"><div className="swarm-viewport" aria-label="Interactive 3D Earth and satellite constellation">
      <SceneBoundary><Canvas camera={{position:[2.5,1.8,3.2],fov:45}} dpr={[1,1.5]} fallback={<div className="swarm-fallback">WebGL unavailable. Use the telemetry panel to explore the simulation.</div>}><Scene packet={packet} demo={mode==="demo"} avoidance={avoidance} selected={satellite?.id??0} select={setSelected} cameraKey={cameraKey}/></Canvas></SceneBoundary>
      <div className="swarm-overlay"><span>{mode==="demo"?"ILLUSTRATIVE TWO-BODY DEMO":"BACKEND TELEMETRY"}</span><b>T + {packet.t.toFixed(1)} s</b></div>
      <div className="swarm-view-help">Drag to rotate / Scroll or pinch to zoom / Tap a satellite</div>
    </div><aside className="swarm-panel"><p className="swarm-kicker">MISSION TELEMETRY</p><h2>{packet.satellites.length} satellites</h2><dl><dt>Candidate pairs</dt><dd>{packet.num_candidates}</dd><dt>{mode==="demo"?"Illustrative threat index":"Normalized backend risk"}</dt><dd>{(packet.satellites.reduce((v,s)=>Math.max(v,s.risk),0)).toFixed(3)}</dd>{pairGap!==null&&<><dt>Highlighted pair separation</dt><dd>{pairGap.toFixed(1)} km</dd></>}</dl>
      <label>Inspect satellite<select value={satellite?.id??""} onChange={e=>setSelected(Number(e.target.value))}>{packet.satellites.map(s=><option key={s.id} value={s.id}>SAT-{String(s.id).padStart(3,"0")}</option>)}</select></label>
      {satellite&&<dl><dt>Altitude</dt><dd>{((Math.hypot(...satellite.r)-EARTH_METERS)/1000).toFixed(1)} km</dd><dt>Speed</dt><dd>{(Math.hypot(...satellite.v)/1000).toFixed(2)} km/s</dd></dl>}
      <button onClick={()=>setCameraKey(k=>k+1)}>Reset camera</button>
      {mode==="live"&&<div className="swarm-live-actions"><button onClick={()=>setRetry(r=>r+1)}>Reconnect</button><button onClick={()=>setMode("demo")}>Run browser demo</button></div>}
    </aside></div>
    {mode==="demo"&&<section className="swarm-controls" aria-label="Playback controls"><div className="swarm-control-row"><button className="swarm-primary" onClick={()=>{if(time>=360)setTime(0);setPlaying(p=>!p)}}>{playing?"Pause simulation":"Play simulation"}</button><button onClick={()=>{setTime(0);setPlaying(false)}}>Restart scenario</button><label>Time scale<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[1,10,30,60].map(v=><option key={v} value={v}>{v}x</option>)}</select></label><label>Swarm size<select value={count} onChange={e=>{setCount(Number(e.target.value));setSelected(0)}}>{[12,24,48].map(v=><option key={v} value={v}>{v} satellites</option>)}</select></label><label className="swarm-check"><input type="checkbox" checked={avoidance} onChange={e=>setAvoidance(e.target.checked)}/>Illustrative avoidance</label></div><label className="swarm-scrub">Scenario time: {time.toFixed(0)} / 360 s<input type="range" min="0" max="360" step="1" value={time} onChange={e=>{setPlaying(false);setTime(Number(e.target.value))}}/></label><p>Closest approach at 120 s. Gold satellites approach head-on; avoidance adds an exaggerated prescribed radial offset. Toggle it off at 120 s to compare the intersecting reference paths.</p></section>}
    <section className="swarm-explanation"><h2>{mode==="demo"?"See the behavior. Understand the model.":"Connect your research simulation."}</h2><p>{mode==="demo"?"Reference orbits use circular two-body angular rates. The highlighted maneuver is a scripted visualization, not an optimized burn. Its threat index is synthetic, not collision probability. Satellite sizes and avoidance offsets are exaggerated for visibility; no fuel prediction is made.":"Live mode displays validated position, velocity, normalized risk and fuel fields supplied by your backend. Playback controls apply only to the browser demo. Configure VITE_SWARM_WS_URL with a reachable secure WebSocket endpoint for production."}</p><details><summary>Research backend capabilities and setup</summary><p>The Python backend implements J2 RK4 propagation, covariance propagation, an encounter-plane probability integral, OSQP control, secondary-risk checks and KD-tree conjunction detection. Those features are separate from the illustrative browser demo.</p><pre>cd space-agi-swarm-backend{String.fromCharCode(10)}pip install -r requirements.txt{String.fromCharCode(10)}uvicorn main:app --port 8000</pre></details></section>
  </div>;
}
