// @vitest-environment jsdom
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import { BlogContent } from "./BlogContent";

afterEach(() => cleanup());

it("renders one anchor for an internal markdown link", () => {
  const view = render(
    <Router hook={staticLocationHook("/")}>
      <BlogContent content={"See the [orbit simulator](/simulator)."} />
    </Router>,
  );
  const links = view.container.querySelectorAll("a");
  expect(links).toHaveLength(1);
  expect(screen.getByRole("link", { name: "orbit simulator" })).toHaveAttribute("href", "/simulator");
});

it("keeps external markdown links as a single new-tab anchor", () => {
  const view = render(
    <Router hook={staticLocationHook("/")}>
      <BlogContent content={"Source: [NASA](https://www.nasa.gov/careers)."} />
    </Router>,
  );
  const links = view.container.querySelectorAll("a");
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute("href", "https://www.nasa.gov/careers");
  expect(links[0]).toHaveAttribute("target", "_blank");
});
