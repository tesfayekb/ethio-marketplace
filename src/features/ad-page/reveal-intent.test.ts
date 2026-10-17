import { afterEach, describe, expect, it, vi } from "vitest";
import { rememberRevealIntent, takeRevealIntent } from "./reveal-intent";

const KEY = "ethio.revealIntent";
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  sessionStorage.clear();
});
describe("tab-only reveal intent", () => {
  it("RI-1 same ad consumes once", () => {
    rememberRevealIntent("scratch-x");
    expect(takeRevealIntent("scratch-x")).toBe(true);
    expect(takeRevealIntent("scratch-x")).toBe(false);
  });
  it("RI-2 another ad consumes without revealing", () => {
    rememberRevealIntent("scratch-x");
    expect(takeRevealIntent("scratch-y")).toBe(false);
    expect(sessionStorage.getItem(KEY)).toBeNull();
  });
  it("RI-3 older than 15 minutes refuses, boundary accepts, future refuses", () => {
    for (const [age, allowed] of [
      [900_001, false],
      [900_000, true],
      [-1, false],
    ] as const) {
      sessionStorage.setItem(KEY, JSON.stringify({ publicId: "scratch-x", at: 1_000_000 - age }));
      expect(takeRevealIntent("scratch-x", 1_000_000)).toBe(allowed);
    }
  });
  it("RI-4 blocked storage throws nothing and cannot reveal", () => {
    vi.stubGlobal("sessionStorage", {
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("blocked");
      },
      removeItem() {
        throw new Error("blocked");
      },
    });
    expect(() => rememberRevealIntent("scratch-x")).not.toThrow();
    expect(takeRevealIntent("scratch-x")).toBe(false);
  });
  it("RI-5 garbage refuses and is removed", () => {
    for (const raw of ["garbage", "null", "{}", '{"publicId":"scratch-x","at":"0"}']) {
      sessionStorage.setItem(KEY, raw);
      expect(takeRevealIntent("scratch-x")).toBe(false);
      expect(sessionStorage.getItem(KEY)).toBeNull();
    }
  });
});
