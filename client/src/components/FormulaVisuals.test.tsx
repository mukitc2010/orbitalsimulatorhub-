// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { FormulaVisuals } from "./FormulaVisuals";

afterEach(() => cleanup());

it("updates the calculator heading when a different formula is selected", () => {
  render(<FormulaVisuals />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("F = ma (Force)");
  fireEvent.click(screen.getByRole("button", { name: "Gravity" }));
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Gravity");
  expect(screen.getByText("F = G × (m₁ × m₂) / r²")).toBeInTheDocument();
});
