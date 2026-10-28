import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Stars } from "@react-three/drei";
import * as THREE from "three";
import { advancePlayback } from "../../lib/qsagi/playback";
import type { SimRun } from "../../lib/qsagi/types";
import "./SpacetimeLens3D.css";
class LensBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<p className="lens-fallback">3D rendering unavailable. The timeline and telemetry remain usable.</p>:this.props.children;}
}
function LensScene({run,index,cameraKey,playing,orbitCamera}:{run:SimRun;index:number;cameraKey:number;playing:boolean;orbitCamera:boolean}) {
 const {camera}=useThree();
 const craft=useRef<THREE.Group>(null),disk=useRef<THREE.Group>(null);
 const extent=useMemo(()=>Math.max(run.params.r0,...run.points.map(p=>p.r),2*run.params.M*run.params.horizonMargin)*1.3,[run]);
 const scale=5/extent;
 useEffect(()=>{camera.position.set(7,6,8);camera.lookAt(0,0,0)},[camera,cameraKey]);
 const grid=useMemo(()=>{const lines:[number,number,number][][]=[];for(let n=-12;n<=12;n++){const a:[number,number,number][]=[],b:[number,number,number][]=[];for(let j=0;j<=70;j++){const u=-6+j*12/70,v=n/2;const y=(x:number,z:number)=>-Math.min(2.6,run.params.M*scale/Math.sqrt(x*x+z*z+0.16));a.push([u,y(u,v),v]);b.push([v,y(v,u),u]);}lines.push(a,b);}return lines},[run.params.M,scale]);
 const points=useMemo(()=>run.points.map(p=>[p.pos.x*scale,0.16,p.pos.y*scale] as [number,number,number]),[run,scale]);
 const current=run.points[index];
 const target=useMemo(()=>new THREE.Vector3(...points[index]),[points,index]);
 useEffect(()=>{if(!playing&&craft.current)craft.current.position.copy(target)},[target,playing]);
 useFrame((_,delta)=>{if(!playing)return;if(craft.current)craft.current.position.lerp(target,1-Math.exp(-Math.min(delta,.1)*25));if(disk.current)disk.current.rotation.y+=Math.min(delta,.1)*.18});
 const margin=2*run.params.M*run.params.horizonMargin*scale;
 const ring=useMemo(()=>Array.from({length:129},(_,i)=>[Math.cos(i/128*Math.PI*2)*margin,0.04,Math.sin(i/128*Math.PI*2)*margin] as [number,number,number]),[margin]);
 return <><color attach="background" args={["#030814"]}/><ambientLight intensity={0.8}/><directionalLight position={[5,8,5]} intensity={2}/><Stars radius={40} depth={30} count={900} factor={2} speed={playing?1:0}/>
 {grid.map((p,i)=><Line key={i} points={p} color={i%3===0?"#536bbc":i%3===1?"#2bafbb":"#785da8"} transparent opacity={0.5} lineWidth={0.7}/>)}
 <mesh position={[0,-0.5,0]}><sphereGeometry args={[Math.max(0.16,2*run.params.M*scale),32,24]}/><meshStandardMaterial color="#03040b" roughness={0.5}/></mesh>
 <group ref={disk} position={[0,-.35,0]}>
 {[1.08,1.25,1.5].map((r,i)=><mesh key={r} rotation={[-Math.PI/2,0,i*.2]}><torusGeometry args={[Math.max(.16,2*run.params.M*scale)*r,.025+i*.008,8,80,Math.PI*1.8]}/><meshBasicMaterial color={i===0?"#ffb560":i===1?"#ee819d":"#8b85ff"} transparent opacity={.7-i*.15}/></mesh>)}
 </group>
 <Line points={ring} color="#f3b279" dashed dashSize={0.14} gapSize={0.1} lineWidth={1}/>
 {points.length>1&&<Line points={points} color="#344f68" lineWidth={1}/>}
 {index>0&&<Line points={points.slice(Math.max(0,index-220),index+1)} color={current.safe?"#78ead6":"#ff937f"} lineWidth={3}/>}
 <group ref={craft} position={points[0]}><mesh><boxGeometry args={[.23,.15,.23]}/><meshStandardMaterial color="#f5e3b5" metalness={.5} roughness={.35}/></mesh>{[-1,1].map(sign=><mesh key={sign} position={[sign*.29,0,0]}><boxGeometry args={[.3,.025,.25]}/><meshStandardMaterial color="#60bcf5" emissive="#1a6ba5" emissiveIntensity={.5}/></mesh>)}<mesh position={[0,.13,0]}><sphereGeometry args={[.055,12,12]}/><meshBasicMaterial color={current.safe?"#7efce0":"#ff7055"}/></mesh><mesh><sphereGeometry args={[.27,16,16]}/><meshBasicMaterial color={current.safe?"#66e8e2":"#ff7055"} transparent opacity={.1} depthWrite={false}/></mesh></group>
 <OrbitControls makeDefault enableDamping={false} autoRotate={playing&&orbitCamera} autoRotateSpeed={.6} minDistance={3} maxDistance={25} enablePan={false}/></>;
}
export function SpacetimeLens3D({run}:{run:SimRun|null}) {
 const [playing,setPlaying]=useState(()=>!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),[elapsed,setElapsed]=useState(0),[speed,setSpeed]=useState(1),[cameraKey,setCameraKey]=useState(0);
 const [repeat,setRepeat]=useState(true),[orbitCamera,setOrbitCamera]=useState(true);
 useEffect(()=>{const media=window.matchMedia?.("(prefers-reduced-motion: reduce)");if(!media)return;const stop=()=>{if(media.matches)setPlaying(false)};media.addEventListener("change",stop);return()=>media.removeEventListener("change",stop)},[]);
 const first=run?.points[0]?.t??0,last=run?.points.at(-1)?.t??0,duration=Math.max(0,last-first);
 useEffect(()=>{setElapsed(0);setPlaying(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)},[run]);
 useEffect(()=>{if(!playing||!duration)return;let lastTick=performance.now();const id=setInterval(()=>{const now=performance.now();const dt=Math.min(0.25,(now-lastTick)/1000);lastTick=now;setElapsed(t=>advancePlayback(t,dt*speed,duration,repeat))},50);return()=>clearInterval(id)},[playing,speed,duration,repeat]);
 useEffect(()=>{if(!repeat&&duration&&elapsed>=duration)setPlaying(false)},[elapsed,duration,repeat]);
 const index=run?Math.max(0,run.points.findIndex(p=>p.t>=first+elapsed)):0;
 const current=run?.points[index];
 return <section className="spacetime-lens" aria-label="Animated spacetime simulation"><div className="lens-heading"><div><p>SPACETIME / FLIGHT PLAYBACK</p><h2>Spacetime Lens (3D animated)</h2></div><span>{playing?"PLAYING":"PAUSED"}</span></div>
 <div className="lens-viewport"><LensBoundary><Canvas camera={{position:[7,6,8],fov:48}} dpr={[1,1.5]} fallback={<p className="lens-fallback">WebGL unavailable. Timeline telemetry is available below.</p>}>{run&&current&&<LensScene run={run} index={index} cameraKey={cameraKey} playing={playing} orbitCamera={orbitCamera}/>}</Canvas></LensBoundary><div className="lens-overlay">{current?`T + ${current.t.toFixed(2)} / ${last.toFixed(2)} s`:"Run a scenario to begin"}<br/>Drag to orbit / Pinch or scroll to zoom</div></div>
 <div className="lens-buttons"><button disabled={!current} onClick={()=>{if(elapsed>=duration)setElapsed(0);setPlaying(p=>!p)}}>{playing?"Pause flight":"Play flight"}</button><button disabled={!current} onClick={()=>{setElapsed(0);setPlaying(false)}}>Restart flight</button><label>Playback speed<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[0.25,1,2,4].map(x=><option key={x} value={x}>{x}x</option>)}</select></label><button onClick={()=>setCameraKey(k=>k+1)}>Reset 3D camera</button><label><input type="checkbox" checked={repeat} onChange={e=>setRepeat(e.target.checked)}/>Auto replay</label><label><input type="checkbox" checked={orbitCamera} onChange={e=>setOrbitCamera(e.target.checked)}/>Orbit camera</label></div>
 <p className="lens-note">{repeat?"Auto replay is on: the recorded flight repeats after its final sample.":"Single playback: the flight stops at its final sample."} Pause freezes the spacecraft, camera and decorative rings. Scrub the timeline to inspect any sample.</p>
 <label className="lens-timeline">Flight timeline<input type="range" min="0" max={duration||1} step="0.01" value={Math.min(elapsed,duration)} disabled={!current} onChange={e=>{setPlaying(false);setElapsed(Number(e.target.value))}}/></label>
 {current&&<div className="lens-telemetry"><span>Radius <b>{current.r.toFixed(3)}</b></span><span>Time-dilation proxy <b>{current.timeDilation.toFixed(3)}</b></span><span>Tidal proxy <b>{current.tidal.toFixed(5)}</b></span><span>Safety <b>{current.safe?"Within limits":current.violations.join(", ")}</b></span></div>}
 <p className="lens-note">Cyan trail: within configured limits. Coral: a sampled safety violation. Amber ring: horizon safety margin. Geometry is a visual metaphor; the trajectory uses the educational Newtonian model with a bounded curvature correction, not a general-relativistic geodesic or ray-traced lens. A safety check flags violations; it does not enforce avoidance.</p></section>;
}
