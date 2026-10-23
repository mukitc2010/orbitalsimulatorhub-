// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OrbitMissionControl } from "./OrbitMissionControl";

afterEach(cleanup);

vi.mock("../components/EarthVisualization", () => ({
  EarthVisualization: ({ showVelocityVector, showGravityVector }: { showVelocityVector: boolean; showGravityVector: boolean }) => (
    <div data-testid="orbit-scene" data-velocity={showVelocityVector} data-gravity={showGravityVector} />
  ),
}));

vi.mock("../components/astrobot/AstroBotChat", () => ({
  AstroBotChat: ({ pageContext, onAction }: { pageContext: string; onAction: (a: { type: string; payload: Record<string, unknown> }) => void }) => <div data-testid="astrobot-chat" data-context={pageContext}>
    <button onClick={() => {
      onAction({ type: "SIM_ADD_SATELLITE", payload: { a: 6771, e: 0, i: 51.6, name: "ISS comparison" } });
      onAction({ type: "SIM_ADD_SATELLITE", payload: { a: 26571, e: 0, i: 55, name: "GPS comparison" } });
      onAction({ type: "SIM_SET_PLAYBACK", payload: { speed: 8, playing: true } });
    }}>Apply ORACLE demo</button>
  </div>,
}));

describe("OrbitMissionControl", () => {
  it("applies ORACLE orbit requests and playback to mission control", () => {
    render(<OrbitMissionControl />);
    fireEvent.click(screen.getByRole("button", { name: "Apply ORACLE demo" }));
    expect(screen.getByLabelText("ORACLE comparison orbits")).toHaveTextContent("ISS comparison");
    expect(screen.getByLabelText("ORACLE comparison orbits")).toHaveTextContent("GPS comparison");
    expect(screen.getByText("8\u00d7")).toBeInTheDocument();
    expect(screen.getByText("SIMULATION RUNNING")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear comparison orbits" }));
    expect(screen.queryByLabelText("ORACLE comparison orbits")).toBeNull();
  });
  it("loads presets, displays live orbital data, and steps simulation time", () => {
    render(<OrbitMissionControl />);

    expect(screen.getByRole("heading", { name: "Orbital mission control" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /low earth/i })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /geostationary/i }));
    expect(screen.getByLabelText("Starting altitude")).toHaveValue("35786");
    expect(screen.getByText("23 h 56 min")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /step/i }));
    expect(screen.getByText("00:00:30")).toBeInTheDocument();
  });

  it("exposes vector overlays and stops on surface impact", () => {
    render(<OrbitMissionControl />);

    fireEvent.click(screen.getByLabelText("Velocity vector"));
    fireEvent.click(screen.getByLabelText("Gravity vector"));
    expect(screen.getByTestId("orbit-scene")).toHaveAttribute("data-velocity", "true");
    expect(screen.getByTestId("orbit-scene")).toHaveAttribute("data-gravity", "true");

    fireEvent.change(screen.getByLabelText("Starting altitude"), { target: { value: "160" } });
    fireEvent.change(screen.getByLabelText("Tangential velocity"), { target: { value: "0" } });
    for (let step = 0; step < 10; step += 1) {
      fireEvent.click(screen.getByRole("button", { name: /step/i }));
    }
    expect(screen.getByRole("alert")).toHaveTextContent(/surface impact/i);
    expect(screen.getByRole("button", { name: /play simulation/i })).toBeDisabled();
  });

  it("includes AstroBot with current orbital context", () => {
    render(<OrbitMissionControl />);

    expect(screen.getByRole("heading", { name: "ORACLE // Orbital Reasoning And Control Engine" })).toBeInTheDocument();
    expect(screen.getByTestId("astrobot-chat")).toHaveAttribute("data-context", expect.stringContaining("Current altitude: 400.0 km"));
    expect(screen.getByTestId("astrobot-chat")).toHaveAttribute("data-context", expect.stringContaining("Specific energy:"));
  });
});
