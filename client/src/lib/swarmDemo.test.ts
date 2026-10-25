import { describe, expect, it } from "vitest";
import { demoPacket, demoPosition, EARTH_METERS, isSwarmPacket } from "./swarmDemo";
describe("browser swarm demo",()=>{
 it("generates finite telemetry above Earth for every supported swarm size",()=>{
  for(const n of [12,24,48]) for(const t of [0,60,120,240,360]) for(const enabled of [true,false]) {
   const p=demoPacket(t,n,enabled);expect(isSwarmPacket(p)).toBe(true);expect(p.satellites).toHaveLength(n);
   for(const s of p.satellites) {expect(Math.hypot(...s.r)).toBeGreaterThan(EARTH_METERS);expect(Math.hypot(...s.v)).toBeGreaterThan(0);}
  }
 });
 it("separates the highlighted pair at the encounter only with avoidance enabled",()=>{
  const gap=(enabled:boolean)=>{const a=demoPosition(0,120,enabled),b=demoPosition(1,120,enabled);return Math.hypot(...a.map((v,i)=>v-b[i]))*EARTH_METERS};
  expect(gap(false)).toBeCloseTo(0);expect(gap(true)).toBeCloseTo(0.06*EARTH_METERS);
  expect(demoPacket(120,24,true).satellites[0].risk).toBeLessThan(demoPacket(120,24,false).satellites[0].risk);
 });
 it("rejects malformed and nonfinite live telemetry",()=>{
  const p=demoPacket(0,12,true);expect(isSwarmPacket(null)).toBe(false);expect(isSwarmPacket({...p,t:NaN})).toBe(false);
  expect(isSwarmPacket({...p,satellites:[{...p.satellites[0],r:[Infinity,0,0]}]})).toBe(false);
  expect(isSwarmPacket({...p,satellites:[p.satellites[0],p.satellites[0]]})).toBe(false);
 });
});
