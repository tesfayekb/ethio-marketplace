import { describe, expect, it } from "vitest";

import {
  type Box,
  boxPixels,
  FULL,
  isFull,
  keyBox,
  MIN_SIDE,
  moveBox,
  resizeBox,
  turn,
  turnedSize,
} from "./photo-edit";

/** A box equal to another within floating-point error. */
function expectBox(actual: Box | null, expected: Box) {
  expect(actual).not.toBeNull();
  for (const side of ["x", "y", "w", "h"] as const) {
    expect(actual![side]).toBeCloseTo(expected[side], 9);
  }
}

/** D154 B2 — the editor's arithmetic: turns, the crop box, its pixels and its keys. */
describe("turning and cropping a photo (D154 B2)", () => {
  it("PED-1 a turn to the right and to the left go round in quarters; a quarter swaps the sides", () => {
    expect(turn(0, "right")).toBe(1);
    expect(turn(3, "right")).toBe(0);
    expect(turn(0, "left")).toBe(3);
    expect(turn(2, "left")).toBe(1);
    expect(turnedSize(320, 240, 0)).toEqual({ w: 320, h: 240 });
    expect(turnedSize(320, 240, 1)).toEqual({ w: 240, h: 320 });
    expect(turnedSize(320, 240, 2)).toEqual({ w: 320, h: 240 });
    expect(turnedSize(320, 240, 3)).toEqual({ w: 240, h: 320 });
  });

  it("PED-2 the box moves inside the picture and never leaves it", () => {
    const box = { x: 0.2, y: 0.2, w: 0.5, h: 0.5 };
    expectBox(moveBox(box, 0.1, -0.1), { x: 0.3, y: 0.1, w: 0.5, h: 0.5 });
    expectBox(moveBox(box, 1, 1), { x: 0.5, y: 0.5, w: 0.5, h: 0.5 });
    expectBox(moveBox(box, -1, -1), { x: 0, y: 0, w: 0.5, h: 0.5 });
    expect(moveBox(FULL, 0.3, 0.3)).toEqual(FULL);
  });

  it("PED-3 a corner drag keeps the opposite corner, a tenth of each side at least, inside the picture", () => {
    const se = resizeBox(FULL, "se", -0.25, -0.5);
    expect(se.x).toBe(0);
    expect(se.y).toBe(0);
    expect(se.w).toBeCloseTo(0.75);
    expect(se.h).toBeCloseTo(0.5);
    const nw = resizeBox(FULL, "nw", 0.25, 0.5);
    expectBox(nw, { x: 0.25, y: 0.5, w: 0.75, h: 0.5 });
    // Past the opposite corner: the box stops at the smallest side.
    const tiny = resizeBox(FULL, "ne", -5, 5);
    expect(tiny.x).toBe(0);
    expect(tiny.w).toBeCloseTo(MIN_SIDE);
    expect(tiny.h).toBeCloseTo(MIN_SIDE);
    expect(tiny.y + tiny.h).toBeCloseTo(1);
    // Outward: no further than the picture's edge.
    expectBox(resizeBox({ x: 0.2, y: 0.2, w: 0.5, h: 0.5 }, "sw", -1, 1), {
      x: 0,
      y: 0.2,
      w: 0.7,
      h: 0.8,
    });
    expect(isFull(FULL)).toBe(true);
    expect(isFull(se)).toBe(false);
  });

  it("PED-4 the box in pixels is whole and inside the picture", () => {
    expect(boxPixels(FULL, 240, 320)).toEqual({ sx: 0, sy: 0, sw: 240, sh: 320 });
    expect(boxPixels({ x: 0.25, y: 0.5, w: 0.5, h: 0.5 }, 320, 240)).toEqual({
      sx: 80,
      sy: 120,
      sw: 160,
      sh: 120,
    });
    expect(boxPixels({ x: 0.999, y: 0.999, w: 0.001, h: 0.001 }, 10, 10)).toEqual({
      sx: 9,
      sy: 9,
      sw: 1,
      sh: 1,
    });
  });

  it("PED-5 an arrow key moves the box; with Shift it moves the bottom-right corner; other keys do nothing", () => {
    const box = { x: 0.2, y: 0.2, w: 0.5, h: 0.5 };
    expectBox(keyBox(box, "ArrowRight", false), { x: 0.22, y: 0.2, w: 0.5, h: 0.5 });
    expectBox(keyBox(box, "ArrowUp", false), { x: 0.2, y: 0.18, w: 0.5, h: 0.5 });
    expectBox(keyBox(FULL, "ArrowLeft", true), { x: 0, y: 0, w: 0.98, h: 1 });
    expectBox(keyBox(FULL, "ArrowDown", true), FULL);
    expect(keyBox(box, "Enter", false)).toBeNull();
  });
});
