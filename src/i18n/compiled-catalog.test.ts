import { describe, expect, it } from "vitest";

import { layerOutcome } from "./compiled-catalog";

/** INC-816 (bundle 22 turn 24; every strings layer since DEC-258) — the English part stays under a failed language part. */
describe("layerOutcome (INC-816, DEC-258)", () => {
  const en = { "admin.title": "Admin" } as never;
  const am = { "admin.title": "አስተዳዳሪ" } as never;

  it("both parts loaded apply both and the layer is ready", () => {
    expect(layerOutcome({ en, lang: am, wasReady: false })).toEqual({
      en,
      lang: am,
      state: "ready",
    });
  });

  it("a failed language part applies the English part only and the layer is ready", () => {
    expect(layerOutcome({ en, lang: null, wasReady: true })).toEqual({
      en,
      lang: null,
      state: "ready",
    });
  });

  it("a failed English part with none ever loaded applies the base and the layer fails", () => {
    expect(layerOutcome({ en: null, lang: am, wasReady: false })).toEqual({
      en: null,
      lang: null,
      state: "failed",
    });
  });

  it("a failed English part after an earlier success uses the kept part", () => {
    const kept = en;
    expect(layerOutcome({ en: kept, lang: null, wasReady: true })).toEqual({
      en: kept,
      lang: null,
      state: "ready",
    });
  });
});
