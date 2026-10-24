// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SpaceMathGame } from "./SpaceMathGame";
import { generateMissions } from "../lib/spaceMath/engine";
beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(
    {},
    "",
    "/games/space-math?challenge=test-flight&level=practice",
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe("Orbital Gauntlet player flow", () => {
  it("lets visitors launch, use a hint, solve a problem and advance", () => {
    render(<SpaceMathGame />);
    expect(
      screen.getByRole("heading", { name: /ORBITAL GAUNTLET/ }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    fireEvent.click(screen.getByRole("button", { name: /Reveal hint/ }));
    expect(screen.getByText("Flight computer hint")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: /Your answer/ }), {
      target: { value: String(generateMissions("test-flight")[0].answer) },
    });
    fireEvent.click(screen.getByRole("button", { name: "Commit answer" }));
    expect(screen.getByText("Mission cleared.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Mission cleared." }),
    ).toHaveFocus();
    expect(screen.getByText("750 points earned.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next mission" }));
    expect(
      screen.getByRole("heading", { name: "The long way around" }),
    ).toBeInTheDocument();
  });
  it("rejects invalid input without spending an attempt and reveals the solution after three misses", () => {
    render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    fireEvent.click(screen.getByRole("button", { name: "Commit answer" }));
    expect(screen.getByText(/Enter a finite number/)).toBeInTheDocument();
    expect(screen.getByText(/3 attempts left/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: /Your answer/ }), {
      target: { value: "999" },
    });
    for (let i = 0; i < 3; i++)
      fireEvent.click(screen.getByRole("button", { name: "Commit answer" }));
    expect(screen.getByText("Solution unlocked.")).toBeInTheDocument();
    expect(screen.getByText("0 points earned.")).toBeInTheDocument();
  });
  it("resumes saved progress after remount", () => {
    const view = render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    fireEvent.click(screen.getByRole("button", { name: "Skip & learn" }));
    fireEvent.click(screen.getByRole("button", { name: "Next mission" }));
    view.unmount();
    render(<SpaceMathGame />);
    expect(
      screen.getByRole("heading", { name: "The long way around" }),
    ).toBeInTheDocument();
  });
  it("completes a practice flight without recording a competitive score", () => {
    render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole("button", { name: "Skip & learn" }));
      fireEvent.click(
        screen.getByRole("button", {
          name: i === 5 ? "Finish flight" : "Next mission",
        }),
      );
    }
    expect(
      screen.getByRole("heading", { name: "Flight logged." }),
    ).toBeInTheDocument();
    expect(localStorage.getItem("osh-space-math-scores-v1")).toBeNull();
  });
  it("expires timed flights and saves a local result only once", () => {
    vi.useFakeTimers();
    window.history.replaceState(
      {},
      "",
      "/games/space-math?challenge=test-flight&level=expert",
    );
    const view = render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    view.unmount();
    vi.setSystemTime(Date.now() + 721000);
    const expired = render(<SpaceMathGame />);
    expect(
      screen.getByRole("heading", { name: "Window closed." }),
    ).toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem("osh-space-math-scores-v1")!),
    ).toHaveLength(1);
    expired.unmount();
    render(<SpaceMathGame />);
    expect(
      JSON.parse(localStorage.getItem("osh-space-math-scores-v1")!),
    ).toHaveLength(1);
  });
  it("honors an incoming challenge link instead of resuming a different flight", () => {
    const view = render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    view.unmount();
    window.history.replaceState(
      {},
      "",
      "/games/space-math?challenge=another-crew&level=practice",
    );
    render(<SpaceMathGame />);
    expect(
      screen.getByRole("button", { name: /Launch challenge/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Shareable challenge link" }),
    ).toHaveValue(
      "http://localhost:3000/games/space-math?challenge=another-crew&level=practice",
    );
  });
  it("scores a complete timed flight with its bounded streak and time bonus", () => {
    vi.useFakeTimers();
    window.history.replaceState(
      {},
      "",
      "/games/space-math?challenge=test-flight&level=flight",
    );
    render(<SpaceMathGame />);
    fireEvent.click(screen.getByRole("button", { name: /Launch challenge/ }));
    const missions = generateMissions("test-flight");
    for (let i = 0; i < 6; i++) {
      fireEvent.change(screen.getByRole("textbox", { name: /Your answer/ }), {
        target: { value: String(missions[i].answer) },
      });
      fireEvent.click(screen.getByRole("button", { name: "Commit answer" }));
      fireEvent.click(
        screen.getByRole("button", {
          name: i === 5 ? "Finish flight" : "Next mission",
        }),
      );
    }
    expect(
      screen.getByRole("heading", { name: "Mission accomplished." }),
    ).toBeInTheDocument();
    const records = JSON.parse(
      localStorage.getItem("osh-space-math-scores-v1")!,
    );
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      score: 6900,
      correct: 6,
      mode: "flight",
    });
  });
  it("recovers gracefully from malformed stored sessions", () => {
    localStorage.setItem(
      "osh-space-math-run-v1",
      JSON.stringify({ mode: "expert", phase: "playing" }),
    );
    render(<SpaceMathGame />);
    expect(
      screen.getByRole("button", { name: /Launch challenge/ }),
    ).toBeInTheDocument();
  });
});
