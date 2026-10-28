/** Advance visual playback only; never alters the computed trajectory. */
export function advancePlayback(time: number, delta: number, duration: number, loop: boolean): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const current = Number.isFinite(time) ? Math.max(0, Math.min(duration, time)) : 0;
  const next = current + (Number.isFinite(delta) ? Math.max(0, delta) : 0);
  return loop && next >= duration ? next % duration : Math.min(duration, next);
}
