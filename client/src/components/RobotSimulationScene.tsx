import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Stars } from "@react-three/drei";
import * as THREE from "three";
import "./RobotSimulationScene.css";
type Props={robotType:"humanoid"|"rover"|"drone";environment:"iss"|"moon"|"mars"|"deep";isRunning:boolean;simStep:number;progress?:number;task?:string|null;sensors?:string[]};
class RobotBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<p className="robot-fallback">3D unavailable on this device. Playback and task progress remain accessible.</p>:this.props.children}}
function Box({position=[0,0,0],size=[1,1,1],color="#cbdce8",glow=false}:{position?:[number,number,number];size?:[number,number,number];color?:string;glow?:boolean}){return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={0.45} roughness={0.4} emissive={glow?color:"#000000"} emissiveIntensity={glow?0.7:0}/></mesh>}
function Environment({kind}:{kind:Props["environment"]}){
 const ground=kind==="moon"?"#8e919b":kind==="mars"?"#a95335":"#1b3448";
 return <>
 <Stars radius={40} depth={30} count={1000} factor={2}/>
 {kind!=="deep"&&<mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.3,0]} receiveShadow><planeGeometry args={[30,30]}/><meshStandardMaterial color={ground} roughness={0.95}/></mesh>}
 {kind==="iss"?<group>
 <Box position={[0,1,-4]} size={[10,5,0.15]} color="#263f57"/>
 {[-4,-2,0,2,4].map(x=><group key={x}><Box position={[x,0.8,-3.88]} size={[0.08,4,0.08]} color="#76c9df" glow/><Box position={[x,1,-3.75]} size={[1.4,0.8,0.1]} color="#2a849f" glow/></group>)}
 <Box position={[-3.8,0,-1]} size={[0.6,2.2,2]} color="#b1bfc8"/>
 <mesh position={[3,1.2,-3.75]}><circleGeometry args={[0.7,40]}/><meshBasicMaterial color="#071323"/></mesh>
 <mesh position={[3,1.2,-3.8]}><torusGeometry args={[0.74,0.08,8,40]}/><meshStandardMaterial color="#d5e5ed"/></mesh>
 </group>:kind==="deep"?<group position={[2,0,-2]}><Box size={[1,0.9,1]} color="#cfb779"/><Box position={[-1.45,0,0]} size={[1.7,0.05,1.1]} color="#246bab"/><Box position={[1.45,0,0]} size={[1.7,0.05,1.1]} color="#246bab"/><Box position={[0,0.6,0]} size={[0.1,0.6,0.1]} color="#e7e7dc"/></group>:<>
 {Array.from({length:18},(_,i)=><mesh key={i} position={[Math.cos(i*2.4)*(3+i%4),-1.25,Math.sin(i*2.4)*(3+i%4)]} scale={[1,0.55,0.8]}><dodecahedronGeometry args={[0.16+(i%3)*0.13,0]}/><meshStandardMaterial color={kind==="moon"?"#606572":"#743b2c"} roughness={1}/></mesh>)}
 <group position={[-3,-0.4,-3]}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.9,0.9,2.2,24]}/><meshStandardMaterial color="#d4d9db" metalness={0.3}/></mesh><Box position={[0,0.15,0.92]} size={[0.6,0.5,0.1]} color="#51b6cf" glow/></group>
 <mesh position={[0,-1.29,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[2.4,2.43,80]}/><meshBasicMaterial color="#8bddd4" transparent opacity={0.3}/></mesh>
 </>}
 </>;
}
function Robot({robotType,environment,progress=0,task,sensors=[]}:Props){
 const body=useRef<THREE.Group>(null),left=useRef<THREE.Group>(null),right=useRef<THREE.Group>(null),legL=useRef<THREE.Group>(null),legR=useRef<THREE.Group>(null),wheel=useRef<THREE.Group>(null);
 const path=task==="inspect"?[[0,0,1],[1,0,0],[2,0,-1],[0,0,-2],[-2,0,0],[0,0,1]]:task==="navigate"?[[-2,0,1],[-1,0,0],[0.2,0,0.6],[1.4,0,-0.6],[2,0,-1.5]]:[[-2,0,1],[-1,0,0.5],[0,0,0],[1,0,-1],[1.5,0,-1.5]];
 useFrame(()=>{const u=Math.min(1,Math.max(0,progress/100)),travel=Math.min(1,u/0.7),segment=travel*(path.length-1),i=Math.min(path.length-2,Math.floor(segment)),f=segment-i,a=path[i],b=path[i+1],phase=u*Math.PI*18,action=Math.max(0,(u-0.7)/0.3);
 if(body.current){body.current.position.set(a[0]+(b[0]-a[0])*f,robotType==="drone"?0.4+Math.sin(u*Math.PI*4)*0.2:environment==="deep"||environment==="iss"?-0.5:-1.3,a[2]+(b[2]-a[2])*f);body.current.rotation.y=Math.atan2(b[0]-a[0],b[2]-a[2]);}
 const swing=travel<1?Math.sin(phase)*0.45:0;
 if(left.current)left.current.rotation.x=action>0?-0.8-Math.sin(action*Math.PI*4)*0.25:swing;
 if(right.current)right.current.rotation.x=action>0?(task==="assist"?-1.8:task==="pick"?-1.5:-1.1)+Math.sin(action*Math.PI*6)*0.2:-swing;
 if(legL.current)legL.current.rotation.x=swing;if(legR.current)legR.current.rotation.x=-swing;
 if(wheel.current)wheel.current.children.forEach(w=>{w.rotation.x=u*32});
 });
 return <><Line points={path.map(p=>[p[0],environment==="deep"?-.8:-1.27,p[2]] as [number,number,number])} color="#7fe4d7" dashed dashSize={0.1} gapSize={0.12} lineWidth={2}/>
 <group ref={body}>
 {robotType==="humanoid"?<>
 <Box position={[0,0.95,0]} size={[0.5,0.65,0.32]} color="#d2e0e8"/><Box position={[0,1.51,0]} size={[0.38,0.32,0.32]} color="#e3edf3"/><Box position={[0,1.52,0.17]} size={[0.29,0.1,0.03]} color="#50dce8" glow/>
 <Box position={[0,1.05,0.18]} size={[0.24,0.18,0.04]} color="#24b4d3" glow/>
 {[-1,1].map((sign,i)=><group key={sign} ref={i===0?left:right} position={[sign*.36,1.18,0]}><Box position={[0,-.22,0]} size={[.16,.44,.18]} color="#76b9ce"/><mesh position={[0,-.45,0]}><sphereGeometry args={[.105,12,12]}/><meshStandardMaterial color="#293c53"/></mesh><Box position={[0,-.62,.04]} size={[.14,.31,.17]} color="#d1dfe9"/></group>)}
 {[-1,1].map((sign,i)=><group key={sign} ref={i===0?legL:legR} position={[sign*.15,.62,0]}><Box position={[0,-.26,0]} size={[.18,.48,.2]} color="#b7cbd9"/><Box position={[0,-.55,.06]} size={[.22,.13,.36]} color="#25465d"/></group>)}
 </>:robotType==="rover"?<>
 <Box position={[0,.45,0]} size={[1,.35,.7]} color="#d8b976"/><Box position={[0,.75,.12]} size={[.08,.55,.08]} color="#dce8e9"/><Box position={[0,1.05,.12]} size={[.35,.18,.2]} color="#4bdddf" glow/>
 <group ref={wheel}>{[-1,1].flatMap(sign=>[-.42,0,.42].map(z=><group key={sign+":"+z} position={[sign*.59,.23,z]}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.22,.22,.15,16]}/><meshStandardMaterial color="#1b2737"/></mesh><Box position={[0,0,.17]} size={[.13,.05,.03]} color="#8ac5d3"/></group>))}</group>
 <group ref={right} position={[.35,.6,.25]}><Box position={[0,0,.28]} size={[.12,.12,.56]} color="#9ab5c3"/></group>
 </>:<>
 <mesh><octahedronGeometry args={[.5,1]}/><meshStandardMaterial color="#d7dfe8" metalness={.5}/></mesh><Box position={[0,0,.45]} size={[.22,.12,.06]} color="#71e9e3" glow/>
 {[-1,1].map(sign=><group key={sign} position={[sign*.52,0,0]}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.13,.18,.22,16]}/><meshStandardMaterial color="#4d739a"/></mesh><mesh position={[sign*.16,0,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[.1,.3,12]}/><meshBasicMaterial color="#6de5ff" transparent opacity={.65}/></mesh></group>)}
 </>}
 {(task==="pick"||task==="assist")&&progress>=75&&<Box position={[.45,.75,.45]} size={[.22,.2,.22]} color="#f5c875" glow/>}
 {sensors.includes("camera")&&<mesh position={[0,.9,1]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.6,1.5,4,1,true]}/><meshBasicMaterial color="#70e2ff" wireframe transparent opacity={.24} depthWrite={false}/></mesh>}
 {sensors.includes("lidar")&&<mesh position={[0,.5,0]} rotation={[Math.PI/2,0,0]}><ringGeometry args={[1.2,1.23,64]}/><meshBasicMaterial color="#a6f8b2" side={THREE.DoubleSide} transparent opacity={.6}/></mesh>}
 {sensors.includes("imu")&&<axesHelper args={[.9]}/>}
 {sensors.includes("force")&&<mesh position={[.36,.5,.15]}><sphereGeometry args={[.15,12,12]}/><meshBasicMaterial color="#ffc56c" wireframe/></mesh>}
 </group>
 <group visible={!(task==="pick"&&progress>=75)} position={[2,-.3,-2]}><Box size={[.4,.3,.4]} color={progress>=100?"#64e6af":"#f1c377"} glow/><mesh rotation={[Math.PI/2,0,0]} position={[0,-.95,0]}><ringGeometry args={[.55,.58,40]}/><meshBasicMaterial color="#eec881" side={THREE.DoubleSide}/></mesh></group>
 </>;
}
function Scene({cameraKey,...props}:Props&{cameraKey:number}){const {camera}=useThree();useEffect(()=>{camera.position.set(6,3.8,7);camera.lookAt(0,.2,-1)},[camera,cameraKey]);return <><color attach="background" args={[props.environment==="mars"?"#321c28":"#071426"]}/><ambientLight intensity={1.1}/><directionalLight position={[4,7,5]} intensity={2.7} castShadow/><pointLight position={[-4,2,1]} intensity={15} color="#8d9bff"/><Environment kind={props.environment}/><Robot {...props}/><OrbitControls key={cameraKey} target={[0,.2,-1]} minDistance={3} maxDistance={18} maxPolarAngle={Math.PI*.56} enablePan={false}/></>}
export function RobotSimulationScene(props:Props){const [cameraKey,setCameraKey]=useState(0);return <div className="robot-animated-view" aria-label="Animated 3D robot mission"><RobotBoundary><Canvas shadows camera={{position:[6,3.8,7],fov:46}} dpr={[1,1.5]} fallback={<p className="robot-fallback">WebGL unavailable. Task progress is available below.</p>}><Scene {...props} cameraKey={cameraKey}/></Canvas></RobotBoundary><button className="robot-camera-reset" onClick={()=>setCameraKey(k=>k+1)}>Reset robot camera</button><div className="robot-scene-caption">{props.robotType.toUpperCase()} / {props.environment.toUpperCase()} / SCRIPTED 3D DEMO</div></div>}
