/**
 * Mission orders queued by the ORACLE agent screen and consumed by the
 * Simulator screen when it mounts. A tiny module-level queue is enough:
 * both screens live in the same JS runtime and the simulator remounts on
 * every tab visit.
 */
import { OrbitPreset } from "../physics/orbital";

export interface MissionOrders {
  deployments: OrbitPreset[];
  play: boolean;
}

let pending: MissionOrders | null = null;

export function queueMissionOrders(orders: MissionOrders): void {
  const merged = pending ?? { deployments: [], play: false };
  merged.deployments = [...merged.deployments, ...orders.deployments].slice(0, 10);
  merged.play = merged.play || orders.play;
  pending = merged;
}

export function consumeMissionOrders(): MissionOrders | null {
  const orders = pending;
  pending = null;
  return orders;
}

export function hasPendingOrders(): boolean {
  return pending !== null && pending.deployments.length > 0;
}
