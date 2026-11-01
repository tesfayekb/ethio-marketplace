/**
 * INC-957 — the Ge'ez factor. Planted: a line at 1.21 of its room fails under 1.22,
 * so deleting the factor (which would pass that line) is caught.
 */
import { describe, expect, it } from "vitest";

import { factoredWidth, GEEZ_FACTOR, hasEthiopic, slotFault } from "../../e2e/helpers/one-line";

const held = {
  name: "planted",
  oneLine: true,
  onScreen: true,
  cut: false,
};

describe("the one-line judge (INC-957)", () => {
  it("OLJ-1 Ge'ez takes the factor; Latin stays the runner's width", () => {
    expect(GEEZ_FACTOR).toBe(1.22);
    expect(hasEthiopic("ሽያጭ")).toBe(true);
    expect(hasEthiopic("Sell")).toBe(false);
    expect(factoredWidth("ሽያጭ", 100)).toBeCloseTo(122);
    expect(factoredWidth("Sell", 100)).toBe(100);
  });

  it("OLJ-2 a Ge'ez line at 1.22 of its room holds, and one past it does not", () => {
    expect(slotFault({ ...held, text: "ሀ", textWidth: 100, room: 122 })).toBeNull();
    expect(slotFault({ ...held, text: "ሀ", textWidth: 100, room: 121 })).not.toBeNull();
  });

  it("OLJ-3 a line at 1.21 of its room fails, so dropping the factor would not pass", () => {
    const reading = { ...held, text: "ሀ", textWidth: 100, room: 121 };
    expect(reading.textWidth).toBeLessThanOrEqual(reading.room);
    expect(slotFault(reading)).not.toBeNull();
  });

  it("OLJ-4 Latin holds at its own width and fails past the room; a cut line may ellipsize", () => {
    expect(slotFault({ ...held, text: "Sell", textWidth: 100, room: 100 })).toBeNull();
    expect(slotFault({ ...held, text: "Sell", textWidth: 101, room: 100 })).not.toBeNull();
    expect(slotFault({ ...held, text: "ሀ", textWidth: 200, room: 10, cut: true })).toBeNull();
    expect(slotFault({ ...held, text: "Sell", textWidth: 10, room: 100, oneLine: false })).toBe(
      "planted wraps",
    );
    expect(slotFault({ ...held, text: "Sell", textWidth: 10, room: 100, onScreen: false })).toBe(
      "planted leaves the screen",
    );
  });
});
