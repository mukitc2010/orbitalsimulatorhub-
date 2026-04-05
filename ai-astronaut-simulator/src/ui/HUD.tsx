"use client";

import { TopBar } from "./panels/TopBar";
import { ObjectivesPanel } from "./panels/ObjectivesPanel";
import { SystemsPanel } from "./panels/SystemsPanel";
import { ActionBar } from "./panels/ActionBar";
import { SensorsPanel } from "./panels/SensorsPanel";
import { MiniMap } from "./panels/MiniMap";

export function HUD() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
      <TopBar />
      <div className="flex flex-1 pt-14">
        <div className="w-56 p-4">
          <ObjectivesPanel />
        </div>
        <div className="flex-1" />
        <div className="w-56 p-4">
          <SystemsPanel />
        </div>
      </div>
      <div className="flex items-end justify-between p-4 pb-6">
        <div className="pointer-events-auto">
          <MiniMap />
        </div>
        <div className="pointer-events-auto">
          <ActionBar />
        </div>
        <div className="pointer-events-auto w-48">
          <SensorsPanel />
        </div>
      </div>
    </div>
  );
}
