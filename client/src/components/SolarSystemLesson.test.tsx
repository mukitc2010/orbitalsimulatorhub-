// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SolarSystemLesson } from "./SolarSystemLesson";

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("plays, pauses, changes speed, steps and resets the orbit", () => {
  const view = render(<SolarSystemLesson />);
  const earth = () => view.container.querySelector('.solar-orbit circle[fill="#38bdf8"]')!;
  const start = earth().getAttribute("cx");
  fireEvent.click(screen.getByRole("button", { name: /^Play$/ }));
  expect(screen.getByRole("button", { name: /^Pause$/ })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: /^Pause$/ }));
  fireEvent.change(screen.getByRole("combobox", { name: "Speed" }), { target: { value: "4" } });
  fireEvent.click(screen.getByRole("button", { name: /Step forward/ }));
  expect(earth().getAttribute("cx")).not.toBe(start);
  fireEvent.click(screen.getByRole("button", { name: /^Reset$/ }));
  expect(earth().getAttribute("cx")).toBe(start);
  expect(screen.getByRole("combobox")).toHaveValue("1");
});

it("explains incorrect and correct answers and resets the quiz", () => {
  render(<SolarSystemLesson />);
  fireEvent.click(screen.getByRole("radio", { name: "The Sun switching off" }));
  expect(screen.getByText(/Not quite. Correct answer:/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("radio", { name: "Earth rotating on its axis" }));
  fireEvent.click(screen.getByRole("radio", { name: "365 days" }));
  fireEvent.click(screen.getByRole("radio", { name: "The Sun's gravity" }));
  expect(screen.getByText(/3 of 3 answered · 3 of 3 correct/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset quiz" }));
  expect(screen.getByText(/0 of 3 answered/)).toBeInTheDocument();
});

it("lets a learner compare a clicked planet with Earth's year", () => {
  render(<SolarSystemLesson />);
  fireEvent.click(screen.getByRole("button", { name: /Mars/ }));
  expect(screen.getByText(/1.88 Earth years/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Shorter than Earth's year" }));
  expect(screen.getByText(/Not quite/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Longer than Earth's year" }));
  expect(screen.getByText(/^Correct\./)).toBeInTheDocument();
});

it("keeps animation disabled for reduced motion while allowing manual exploration", () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  render(<SolarSystemLesson />);
  expect(screen.getByRole("button", { name: /^Play$/ })).toBeDisabled();
  expect(screen.getByText(/Reduced motion is on/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Step forward/ })).toBeEnabled();
});
