/** Illustrative fault timeline. Times are seconds after the fault is injected. */
export type CraftMode = 0 | 1 | 2;

export function signalDelaySeconds(minutes: number): number {
  const clamped = Math.min(24, Math.max(1, minutes));
  return clamped * 1.5;
}

export const FAULTS = [
  { id: "array", name: "Stuck solar array", system: 0, cascade: [4], role: "A limited onboard computer can shed electrical loads. A robot frees the array joint. Ground control waits for the light-time round trip before that robot moves." },
  { id: "valve", name: "Propellant valve leak", system: 1, cascade: [5], role: "Flight software can inhibit the leaky thruster. A robot replaces the valve. Until the fix, navigation burns are less precise." },
  { id: "filter", name: "CO₂ filter clog", system: 2, cascade: [3], role: "Cabin software can slow the crew timeline. A robot swaps the filter. Waste heat rises while the loop is blocked." },
  { id: "dish", name: "Antenna mispoint", system: 4, cascade: [], role: "The ship can hold attitude with its last command. A robot realigns the dish. No Earth link is required for the onboard modes." },
] as const;

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
