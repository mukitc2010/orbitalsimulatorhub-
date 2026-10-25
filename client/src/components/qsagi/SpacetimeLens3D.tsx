import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Stars } from "@react-three/drei";
import type { SimRun } from "../../lib/qsagi/types";
import "./SpacetimeLens3D.css";
class LensBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<p className="lens-fallback">3D rendering unavailable. The timeline and telemetry remain usable.</p>:this.props.children;}
}
function LensScene({run,index,cameraKey}:{run:SimRun;index:number;cameraKey:number}) {
 const {camera}=useThree();
 const extent=useMemo(()=>Math.max(run.params.r0,...run.points.map(p=>p.r),2*run.params.M*run.params.horizonMargin)*1.3,[run]);
 const scale=5/extent;
 useEffect(()=>{camera.position.set(7,6,8);camera.lookAt(0,0,0)},[camera,cameraKey]);
 const grid=useMemo(()=>{const lines:[number,number,number][][]=[];for(let n=-12;n<=12;n++){const a:[number,number,number][]=[],b:[number,number,number][]=[];for(let j=0;j<=70;j++){const u=-6+j*12/70,v=n/2;const y=(x:number,z:number)=>-Math.min(2.6,run.params.M*scale/Math.sqrt(x*x+z*z+0.16));a.push([u,y(u,v),v]);b.push([v,y(v,u),u]);}lines.push(a,b);}return lines},[run.params.M,scale]);
 const points=useMemo(()=>run.points.map(p=>[p.pos.x*scale,0.16,p.pos.y*scale] as [number,number,number]),[run,scale]);
 const current=run.points[index];
 const margin=2*run.params.M*run.params.horizonMargin*scale;
 const ring=useMemo(()=>Array.from({length:129},(_,i)=>[Math.cos(i/128*Math.PI*2)*margin,0.04,Math.sin(i/128*Math.PI*2)*margin] as [number,number,number]),[margin]);
 return <><color attach="background" args={["#030814"]}/><ambientLight intensity={0.8}/><directionalLight position={[5,8,5]} intensity={2}/><Stars radius={40} depth={30} count={900} factor={2}/>
 {grid.map((p,i)=><Line key={i} points={p} color="#317087" transparent opacity={0.35} lineWidth={0.7}/>)}
 <mesh position={[0,-0.5,0]}><sphereGeometry args={[Math.max(0.16,2*run.params.M*scale),32,24]}/><meshStandardMaterial color="#03040b" roughness={0.5}/></mesh>
 <Line points={ring} color="#f3b279" dashed dashSize={0.14} gapSize={0.1} lineWidth={1}/>
 {points.length>1&&<Line points={points} color="#344f68" lineWidth={1}/>}
 {index>0&&<Line points={points.slice(Math.max(0,index-220),index+1)} color={current.safe?"#78ead6":"#ff937f"} lineWidth={3}/>}
 <group position={points[index]}><mesh><sphereGeometry args={[0.09,12,12]}/><meshStandardMaterial color="#ffffff" emissive={current.safe?"#6de7df":"#ff7055"} emissiveIntensity={2}/></mesh><mesh><boxGeometry args={[0.35,0.025,0.13]}/><meshStandardMaterial color="#75bde6" metalness={0.5}/></mesh></group>
 <OrbitControls makeDefault minDistance={3} maxDistance={25} enablePan={false}/></>;
}
export function SpacetimeLens3D({run}:{run:SimRun|null}) {
 const [playing,setPlaying]=useState(()=>!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),[elapsed,setElapsed]=useState(0),[speed,setSpeed]=useState(1),[cameraKey,setCameraKey]=useState(0);
 const first=run?.points[0]?.t??0,last=run?.points.at(-1)?.t??0,duration=Math.max(0,last-first);
 useEffect(()=>{setElapsed(0);setPlaying(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)},[run]);
 useEffect(()=>{if(!playing||!duration)return;let lastTick=performance.now();const id=setInterval(()=>{const now=performance.now();const dt=Math.min(0.25,(now-lastTick)/1000);lastTick=now;setElapsed(t=>Math.min(duration,t+dt*speed))},50);return()=>clearInterval(id)},[playing,speed,duration]);
 useEffect(()=>{if(duration&&elapsed>=duration)setPlaying(false)},[elapsed,duration]);
 const index=run?Math.max(0,run.points.findIndex(p=>p.t>=first+elapsed)):0;
 const current=run?.points[index];
 return <section className="spacetime-lens" aria-label="Animated spacetime simulation"><div className="lens-heading"><div><p>SPACETIME / FLIGHT PLAYBACK</p><h2>Spacetime Lens (3D animated)</h2></div><span>{playing?"PLAYING":"PAUSED"}</span></div>
 <div className="lens-viewport"><LensBoundary><Canvas camera={{position:[7,6,8],fov:48}} dpr={[1,1.5]} fallback={<p className="lens-fallback">WebGL unavailable. Timeline telemetry is available below.</p>}>{run&&current&&<LensScene run={run} index={index} cameraKey={cameraKey}/>}</Canvas></LensBoundary><div className="lens-overlay">{current?`T + ${current.t.toFixed(2)} / ${last.toFixed(2)} s`:"Run a scenario to begin"}<br/>Drag to orbit / Pinch or scroll to zoom</div></div>
 <div className="lens-buttons"><button disabled={!current} onClick={()=>{if(elapsed>=duration)setElapsed(0);setPlaying(p=>!p)}}>{playing?"Pause flight":"Play flight"}</button><button disabled={!current} onClick={()=>{setElapsed(0);setPlaying(false)}}>Restart flight</button><label>Playback speed<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[0.25,1,2,4].map(x=><option key={x} value={x}>{x}x</option>)}</select></label><button onClick={()=>setCameraKey(k=>k+1)}>Reset 3D camera</button></div>
 <label className="lens-timeline">Flight timeline<input type="range" min="0" max={duration||1} step="0.01" value={Math.min(elapsed,duration)} disabled={!current} onChange={e=>{setPlaying(false);setElapsed(Number(e.target.value))}}/></label>
 {current&&<div className="lens-telemetry"><span>Radius <b>{current.r.toFixed(3)}</b></span><span>Time-dilation proxy <b>{current.timeDilation.toFixed(3)}</b></span><span>Tidal proxy <b>{current.tidal.toFixed(5)}</b></span><span>Safety <b>{current.safe?"Within limits":current.violations.join(", ")}</b></span></div>}
 <p className="lens-note">Cyan trail: within configured limits. Coral: a sampled safety violation. Amber ring: horizon safety margin. Geometry is a visual metaphor; the trajectory uses the educational Newtonian model with a bounded curvature correction, not a general-relativistic geodesic or ray-traced lens. A safety check flags violations; it does not enforce avoidance.</p></section>;
}
