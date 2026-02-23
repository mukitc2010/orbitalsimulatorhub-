/**
 * Simulator Action Tool — Generate actions for the 3D orbit simulator
 */

export type SimActionType =
  | "SIM_SET_ORBIT"
  | "SIM_ZOOM"
  | "SIM_SHOW_TRANSFER"
  | "SIM_HIGHLIGHT_TRAJECTORY"
  | "SIM_ADD_SATELLITE"
  | "SIM_ZOOM_TO";

export interface SimAction {
  type: SimActionType;
  payload: Record<string, unknown>;
}

export function createSetOrbitAction(a: number, e: number, i: number): SimAction {
  return {
    type: "SIM_SET_ORBIT",
    payload: { a, e, i },
  };
}

export function createZoomAction(level: number): SimAction {
  return {
    type: "SIM_ZOOM",
    payload: { level },
  };
}

export function createZoomToAction(target: "earth" | "iss" | "leo" | "geo"): SimAction {
  return {
    type: "SIM_ZOOM_TO",
    payload: { target },
  };
}

export function createShowTransferAction(r1: number, r2: number): SimAction {
  return {
    type: "SIM_SHOW_TRANSFER",
    payload: { r1, r2 },
  };
}

export function createHighlightTrajectoryAction(): SimAction {
  return {
    type: "SIM_HIGHLIGHT_TRAJECTORY",
    payload: {},
  };
}

export function createAddSatelliteAction(altitudeKm: number, name?: string): SimAction {
  const a = 6371 + altitudeKm;
  return {
    type: "SIM_ADD_SATELLITE",
    payload: { a, e: 0.01, i: 51.6, name: name || `Satellite ${altitudeKm} km` },
  };
}

export function suggestSimActions(intent: string, params?: Record<string, number>): SimAction[] {
  const actions: SimAction[] = [];
  const lower = intent.toLowerCase();

  if (lower.includes("leo") || lower.includes("400") || lower.includes("iss")) {
    actions.push(createAddSatelliteAction(400, "LEO / ISS"));
  }
  if (lower.includes("geo") || lower.includes("35786") || lower.includes("geostationary")) {
    actions.push(createAddSatelliteAction(35786, "GEO"));
  }
  if (lower.includes("gps") || lower.includes("20200")) {
    actions.push(createAddSatelliteAction(20200, "GPS"));
  }
  if (lower.includes("hohmann") && params?.r1 && params?.r2) {
    actions.push(createShowTransferAction(params.r1, params.r2));
  }
  if (lower.includes("zoom") || lower.includes("closer")) {
    actions.push(createZoomToAction("earth"));
  }

  return actions;
}
