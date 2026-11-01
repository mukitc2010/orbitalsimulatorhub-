// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import { NavigationHeader } from "./NavigationHeader";

afterEach(() => cleanup());

function renderAt(path: string) {
  return render(
    <Router hook={staticLocationHook(path)}>
      <NavigationHeader />
    </Router>,
  );
}

it("keeps every simulator choice visible after one simulator is open", () => {
  renderAt("/simulator");
  const chooser = screen.getByRole("navigation", { name: "Choose a simulator" });
  for (const name of ["Orbit Simulator", "Swarm Simulator", "AI Robot Lab", "Quantum Space AGI Lab", "Quantum Simulator"]) {
    expect(chooser).toContainElement(screen.getByRole("link", { name }));
  }
  expect(screen.getByRole("link", { name: "Orbit Simulator" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Swarm Simulator" })).toHaveAttribute("href", "/simulator/swarm");
});

it("opens each primary menu and lists its destinations", () => {
  renderAt("/");
  fireEvent.click(screen.getByRole("button", { name: "Simulator" }));
  expect(screen.getByRole("menuitem", { name: "AI Robot Lab" })).toHaveAttribute("href", "/simulator/ai-astronaut-robot");
  fireEvent.click(screen.getByRole("button", { name: "Missions" }));
  expect(screen.getByRole("menuitem", { name: "Astronauts" })).toHaveAttribute("href", "/astronauts");
  expect(screen.queryByRole("menuitem", { name: "AI Robot Lab" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "🧠 Space-AGI Lab" }));
  expect(screen.getByRole("menuitem", { name: "Roadmap" })).toHaveAttribute("href", "/research/space-agi-roadmap");
  fireEvent.click(screen.getByRole("button", { name: "Blog" }));
  expect(screen.getByRole("menuitem", { name: "Books" })).toHaveAttribute("href", "/recommended-books");
  expect(screen.getAllByRole("link", { name: "Planets" })).toHaveLength(1);
  expect(screen.getByRole("link", { name: "AstroBot" })).toHaveAttribute("href", "/astrobot");
});
