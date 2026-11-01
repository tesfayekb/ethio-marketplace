/**
 * INC-957 — the Ge'ez factor. Planted: a line at 1.21 of its room fails under 1.22,
 * so deleting the factor (which would pass that line) is caught. The factor is
 * Noto's correction, not a multiplier of whatever face the runner already has.
 */
import { describe, expect, it } from "vitest";

import {
  CALIBRATION_PX,
  CALIBRATION_TEXT,
  factoredWidth,
  GEEZ_FACTOR,
  hasEthiopic,
  NOTO_CALIBRATION_WIDTH,
  readAdminSlots,
  readSlots,
  runnerFactor,
  slotFault,
} from "../../e2e/helpers/one-line";

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
    const noto = runnerFactor(NOTO_CALIBRATION_WIDTH, 1);
    expect(factoredWidth("ሽያጭ", 100, noto)).toBeCloseTo(122);
    expect(factoredWidth("Sell", 100, noto)).toBe(100);
  });

  it("OLJ-2 a Ge'ez line at 1.22 of its room holds, and one past it does not", () => {
    expect(slotFault({ ...held, text: "ሀ", textWidth: 100, room: 122 }, GEEZ_FACTOR)).toBeNull();
    expect(
      slotFault({ ...held, text: "ሀ", textWidth: 100, room: 121 }, GEEZ_FACTOR),
    ).not.toBeNull();
  });

  it("OLJ-3 a line at 1.21 of its room fails, so dropping the factor would not pass", () => {
    const reading = { ...held, text: "ሀ", textWidth: 100, room: 121 };
    expect(reading.textWidth).toBeLessThanOrEqual(reading.room);
    expect(slotFault(reading, GEEZ_FACTOR)).not.toBeNull();
  });

  it("OLJ-4 Latin holds at its own width and fails past the room; a cut line may ellipsize", () => {
    expect(slotFault({ ...held, text: "Sell", textWidth: 100, room: 100 }, GEEZ_FACTOR)).toBeNull();
    expect(
      slotFault({ ...held, text: "Sell", textWidth: 101, room: 100 }, GEEZ_FACTOR),
    ).not.toBeNull();
    expect(
      slotFault({ ...held, text: "ሀ", textWidth: 200, room: 10, cut: true }, GEEZ_FACTOR),
    ).toBeNull();
    expect(
      slotFault({ ...held, text: "Sell", textWidth: 10, room: 100, oneLine: false }, GEEZ_FACTOR),
    ).toBe("planted wraps");
    expect(
      slotFault({ ...held, text: "Sell", textWidth: 10, room: 100, onScreen: false }, GEEZ_FACTOR),
    ).toBe("planted leaves the screen");
  });

  it("OLJ-5 the factor is Noto's correction: 1.22 there, about 1.01 on Kefa, and a missing face stops", () => {
    expect(runnerFactor(NOTO_CALIBRATION_WIDTH, 1)).toBe(1.22);
    const kefa = NOTO_CALIBRATION_WIDTH * 1.212;
    expect(runnerFactor(kefa, 1)).toBeCloseTo(1.01, 2);
    expect(runnerFactor(kefa, 1)).toBeGreaterThanOrEqual(1);
    expect(runnerFactor(NOTO_CALIBRATION_WIDTH * 1.224, 1)).toBe(1);
    expect(() => runnerFactor(80, 80)).toThrow(/no Ethiopic face/);
    expect(readSlots.toString()).toContain(CALIBRATION_TEXT);
    expect(readAdminSlots.toString()).toContain(CALIBRATION_TEXT);
    expect(readSlots.toString()).toContain(`${CALIBRATION_PX}px`);
    expect(readAdminSlots.toString()).toContain(`${CALIBRATION_PX}px`);
  });
});
