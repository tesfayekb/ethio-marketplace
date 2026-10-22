import { describe, expect, it } from "vitest";

import { adminLayerOutcome } from "./compiled-catalog";

/** INC-816 (bundle 22 turn 24) — the English admin part stays under a failed language part. */
describe("adminLayerOutcome (INC-816)", () => {
  const enAdmin = { "admin.title": "Admin" } as never;
  const amAdmin = { "admin.title": "አስተዳዳሪ" } as never;

  it("both parts loaded apply both and the layer is ready", () => {
    expect(adminLayerOutcome({ enAdmin, langAdmin: amAdmin, wasReady: false })).toEqual({
      enAdmin,
      langAdmin: amAdmin,
      state: "ready",
    });
  });

  it("a failed language part applies the English part only and the layer is ready", () => {
    expect(adminLayerOutcome({ enAdmin, langAdmin: null, wasReady: true })).toEqual({
      enAdmin,
      langAdmin: null,
      state: "ready",
    });
  });

  it("a failed English part with none ever loaded applies the base and the layer fails", () => {
    expect(adminLayerOutcome({ enAdmin: null, langAdmin: amAdmin, wasReady: false })).toEqual({
      enAdmin: null,
      langAdmin: null,
      state: "failed",
    });
  });

  it("a failed English part after an earlier success uses the kept part", () => {
    const kept = enAdmin;
    expect(adminLayerOutcome({ enAdmin: kept, langAdmin: null, wasReady: true })).toEqual({
      enAdmin: kept,
      langAdmin: null,
      state: "ready",
    });
  });
});
