import { describe, expect, it } from "vitest";

import { APPROX_RADIUS_M } from "./geocode";

/** Haversine distance in metres. */
function metres(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const r = 6_371_000;
  const rad = Math.PI / 180;
  const dLat = (bLat - aLat) * rad;
  const dLng = (bLng - aLng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(h));
}

const round2 = (value: number) => Math.round(value * 100) / 100;

describe("INC-389 approx area holds the real pin", () => {
  it("the worst rounding offset (a corner of the 0.01° cell, at the equator) lies inside the circle", () => {
    const lat = 0.005;
    const lng = 38.745;
    expect(metres(lat, lng, round2(lat), round2(lng))).toBeLessThan(APPROX_RADIUS_M);
  });

  it("holds across the markets' latitudes", () => {
    for (let lat = -40; lat <= 60; lat += 0.0137) {
      const lng = 38.7 + (lat % 0.01);
      expect(metres(lat, lng, round2(lat), round2(lng))).toBeLessThan(APPROX_RADIUS_M);
    }
  });
});
