import {describe,expect,it} from "vitest";
import {advancePlayback} from "./playback";
describe("spacetime replay",()=>{
 it("replays after the end instead of freezing",()=>{expect(advancePlayback(17.9,.3,18,true)).toBeCloseTo(.2);expect(advancePlayback(18,0,18,true)).toBe(0)});
 it("stops at the final sample when repeat is off",()=>{expect(advancePlayback(17.9,.3,18,false)).toBe(18)});
 it("keeps overshoot across multiple replay cycles",()=>{expect(advancePlayback(2,39,18,true)).toBe(5)});
 it("handles empty runs and invalid deltas without nonfinite positions",()=>{expect(advancePlayback(0,1,0,true)).toBe(0);expect(advancePlayback(2,NaN,18,true)).toBe(2);expect(advancePlayback(2,-1,18,true)).toBe(2)});
});
