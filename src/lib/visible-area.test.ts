import { describe, expect, it } from "vitest";

import { AREA_MARGIN, areaFrom } from "./visible-area";

const fallback = { top: 136, bottom: 70 };

describe("D267 — the visible area", () => {
  it("VA-U1: below the lowest top chrome and above the highest bottom chrome", () => {
    const area = areaFrom(
      [
        { top: 0, bottom: 52, shown: true },
        { top: 52, bottom: 129, shown: true },
      ],
      [
        { top: 744, bottom: 800, shown: true },
        { top: 680, bottom: 744, shown: true },
      ],
      800,
      fallback,
    );
    expect(area).toEqual({ top: 129 + AREA_MARGIN, bottom: 680 - AREA_MARGIN });
  });

  it("VA-U2: a marker not shown is ignored", () => {
    const area = areaFrom(
      [
        { top: 0, bottom: 52, shown: true },
        { top: 52, bottom: 400, shown: false },
      ],
      [{ top: 300, bottom: 360, shown: false }],
      800,
      fallback,
    );
    expect(area).toEqual({ top: 52 + AREA_MARGIN, bottom: 800 - fallback.bottom - AREA_MARGIN });
  });

  it("VA-U3: no marker drawn falls back to the page's scroll-padding, never to zero", () => {
    expect(areaFrom([], [], 800, fallback)).toEqual({
      top: fallback.top + AREA_MARGIN,
      bottom: 800 - fallback.bottom - AREA_MARGIN,
    });
  });

  it("VA-U4: the margin applies inside each edge, and the viewport bounds the bottom", () => {
    const area = areaFrom(
      [{ top: 0, bottom: 10, shown: true }],
      [{ top: 900, bottom: 960, shown: true }],
      600,
      fallback,
    );
    expect(area).toEqual({ top: 10 + AREA_MARGIN, bottom: 600 - AREA_MARGIN });
  });
});
