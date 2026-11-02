/** Illustrative fault timeline. Times are seconds after the fault is injected. */
export type CraftMode = 0 | 1 | 2;

export function signalDelaySeconds(minutes: number): number {
  const clamped = Math.min(24, Math.max(1, minutes));
  return clamped * 1.5;
}

export function faultEvents(mode: CraftMode, delaySeconds: number): { at: number; label: string }[] {
  if (mode === 0) {
    return [
      { at: 0, label: "Telemetry sent to Earth" },
      { at: delaySeconds, label: "Earth receives telemetry" },
      { at: delaySeconds + 5, label: "Command sent" },
      { at: delaySeconds * 2 + 5, label: "Robot deploys" },
    ];
  }
  if (mode === 1) {
    return [
      { at: 0, label: "Fault detected onboard" },
      { at: 0.6, label: "AGI diagnoses the fault" },
      { at: 1.6, label: "Robot deploys" },
    ];
  }
  return [
    { at: 0, label: "Precursor contained" },
    { at: 0.4, label: "Robot deploys" },
  ];
}
