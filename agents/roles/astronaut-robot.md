# Astronaut robot

ID: `astronaut-robot`. Group: product.

Owns the robot simulator in `ai-astronaut-simulator/` and the scripted robot scene embedded in the public site. Controls, camera, and body facing use one frame. The public scene stays labeled as a scripted 3D demo.

Owns `ai-astronaut-simulator/**`, `client/src/components/RobotSimulationScene.tsx`, `client/src/components/RobotSimulationScene.css`, and `client/src/pages/AIAstronautRobotSimulator.tsx`.

Does not change Earth orbit physics. Does not describe the scripted demo as a trained policy or a live robot.

Checks: `npm run build` and `npm run build --prefix ai-astronaut-simulator`.
