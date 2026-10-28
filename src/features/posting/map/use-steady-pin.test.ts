import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { samePin, type Pin } from "./pin";
import { useSteadyPin } from "./use-steady-pin";

/**
 * Turn C1-2's MINOR-4 (Foundations turn C2) — the ad page's map links follow the pin's values, not
 * the object that carries them (listing-detail.tsx keys its links effect on `useSteadyPin(pin)`).
 */
describe("a pin keyed by its values (MINOR-4)", () => {
  const pin: Pin = { lat: 9.0054, lng: 38.7636, precision: "approx" };

  it("USP-1 an equal copy keeps the held pin's identity; a moved pin, a changed precision or none replaces it", () => {
    const { result, rerender } = renderHook(({ value }) => useSteadyPin(value), {
      initialProps: { value: pin as Pin | null },
    });
    expect(result.current).toBe(pin);
    rerender({ value: { ...pin } });
    expect(result.current, "an equal copy is the same pin").toBe(pin);
    const moved = { ...pin, lat: 9.01 };
    rerender({ value: moved });
    expect(result.current).toBe(moved);
    const exact: Pin = { ...moved, precision: "exact" };
    rerender({ value: exact });
    expect(result.current).toBe(exact);
    rerender({ value: null });
    expect(result.current).toBeNull();
  });

  it("USP-2 samePin: the same point and precision, or two absences", () => {
    expect(samePin(pin, { ...pin })).toBe(true);
    expect(samePin(null, null)).toBe(true);
    expect(samePin(pin, null)).toBe(false);
    expect(samePin(pin, { ...pin, lng: 38.77 })).toBe(false);
    expect(samePin(pin, { ...pin, precision: "exact" })).toBe(false);
  });
});
