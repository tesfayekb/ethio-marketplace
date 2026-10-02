import { describe, expect, it } from "vitest";

import { finderPending } from "./catalog-finder";

describe("finderPending (S3 / INC-362)", () => {
  it("is pending while the current term has no answer of its own", () => {
    expect(finderPending({ state: "idle" }, "car")).toBe(true);
    expect(finderPending({ state: "waiting", term: "car" }, "car")).toBe(true);
    expect(finderPending({ state: "ready", term: "ca", hits: [] }, "car")).toBe(true);
    expect(finderPending({ state: "failed", term: "ca" }, "car")).toBe(true);
  });
  it("is settled once this term is answered, and never for a term the finder skips", () => {
    expect(finderPending({ state: "ready", term: "car", hits: [] }, " car ")).toBe(false);
    expect(finderPending({ state: "failed", term: "car" }, "car")).toBe(false);
    expect(finderPending({ state: "idle" }, "c")).toBe(false);
    expect(finderPending({ state: "idle" }, "x".repeat(65))).toBe(false);
  });
});
