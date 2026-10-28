import { afterEach, describe, expect, it, vi } from "vitest";

import { isPinPrecision, NEW_PIN_PRECISION, PIN_PRECISIONS, readPin } from "./pin";

/**
 * INC-958 — a pin is whole or absent, and its precision is known: readPin gives the pin only when
 * all three columns hold a value the table allows; anything else is no pin, logged when it should
 * have been impossible — never an "exact" guessed for a missing precision.
 */
describe("a pin is whole or absent, its precision known (INC-958)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("PIN-1 three valid columns are the pin (numbers, or the numeric strings PostgREST sends)", () => {
    expect(readPin(9.0054, 38.7636, "approx", "test")).toEqual({
      lat: 9.0054,
      lng: 38.7636,
      precision: "approx",
    });
    expect(readPin("9.0054", "38.7636", "exact", "test")).toEqual({
      lat: 9.0054,
      lng: 38.7636,
      precision: "exact",
    });
  });

  it("PIN-2 no pin at all is null, quietly", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(null, null, null, "test")).toBeNull();
    expect(readPin(undefined, undefined, undefined, "test")).toBeNull();
    expect(errors).not.toHaveBeenCalled();
  });

  it("PIN-3 a point without its precision is NO pin (never an exact one), and says so once", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(9.0054, 38.7636, null, "the ad page's pin")).toBeNull();
    expect(errors).toHaveBeenCalledTimes(1);
    expect(String(errors.mock.calls[0]?.[0])).toMatch(
      /^\[client-error\] the ad page's pin: a pin without a known precision or point is not drawn/,
    );
  });

  it("PIN-4 a precision the table does not allow, or a broken point, is no pin and is logged", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(9.0054, 38.7636, "EXACT", "test")).toBeNull();
    expect(readPin(9.0054, 38.7636, "near", "test")).toBeNull();
    expect(readPin("", 38.7636, "exact", "test")).toBeNull();
    expect(readPin(Number.NaN, 38.7636, "exact", "test")).toBeNull();
    expect(readPin(9.0054, null, "approx", "test")).toBeNull();
    expect(errors).toHaveBeenCalledTimes(5);
  });

  it("PIN-5 the precisions are the table's two, and a new pin's starting choice is one of them", () => {
    expect(PIN_PRECISIONS).toEqual(["exact", "approx"]);
    expect(PIN_PRECISIONS.every(isPinPrecision)).toBe(true);
    expect(isPinPrecision(null)).toBe(false);
    expect(isPinPrecision(NEW_PIN_PRECISION)).toBe(true);
  });
});
