import { describe, expect, it } from "vitest";
import { communityUrlForHost } from "./Footer";

describe("community link", () => {
  it("uses the configured URL when one is provided", () => {
    expect(communityUrlForHost("www.orbitalsimulatorhub.com", "https://community.example")).toBe("https://community.example");
  });

  it("does not send public visitors to their own computer", () => {
    expect(communityUrlForHost("www.orbitalsimulatorhub.com")).toBe("");
    expect(communityUrlForHost("orbitalsimulatorhub.com")).toBe("");
  });

  it("keeps the local community app available during development", () => {
    expect(communityUrlForHost("localhost")).toBe("http://localhost:3001");
    expect(communityUrlForHost("127.0.0.1")).toBe("http://localhost:3001");
  });
});