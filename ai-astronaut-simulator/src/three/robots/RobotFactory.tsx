"use client";

import { useSimStore } from "@/sim/store/simStore";
import { RobotRover } from "./RobotRover";
import { RobotDrone } from "./RobotDrone";
import { RobotHumanoid } from "./RobotHumanoid";

export function RobotFactory() {
  const robotType = useSimStore((s) => s.robotType);

  switch (robotType) {
    case "rover":
      return <RobotRover />;
    case "drone":
      return <RobotDrone />;
    case "humanoid":
      return <RobotHumanoid />;
    default:
      return <RobotRover />;
  }
}
