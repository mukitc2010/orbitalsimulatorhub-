// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { PremiumOrbitalHero } from "./PremiumOrbitalHero";

describe("PremiumOrbitalHero", () => {
  it("renders the headline and key calls to action", () => {
    render(<PremiumOrbitalHero />);

    expect(screen.getByRole("heading", { name: /the most cinematic space learning experience ever built/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /launch the simulator/i })).toHaveAttribute("href", "/simulator");
    expect(screen.getByRole("link", { name: /meet astrobot/i })).toHaveAttribute("href", "/astrobot");
    expect(screen.getByRole("tab", { name: /mission control/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/why does the iss stay up/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /astrobot ai/i }));
    expect(screen.getByText(/does mass change on mars/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ask astrobot/i })).toHaveAttribute("href", "/astrobot");
  });
});
