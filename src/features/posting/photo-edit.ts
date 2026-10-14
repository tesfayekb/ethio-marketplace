/**
 * D154 B2 — TURN AND CROP A PHOTO ON THE DEVICE: the arithmetic.
 *
 * The editor (photo-editor.tsx) holds two things: the photo's quarter turns
 * clockwise (0–3) and a crop box. The box is kept in FRACTIONS of the turned
 * picture (0 to 1 on each side), so it does not depend on the size the screen
 * draws the picture at; it becomes pixels only when the photo is saved. Turning
 * the photo starts the box again from the whole picture.
 *
 * Nothing here touches a canvas, so every rule is a unit test (PED-1..PED-5).
 */

export type Turns = 0 | 1 | 2 | 3;

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Corner = "nw" | "ne" | "sw" | "se";

/** The whole picture: the box an editor opens with, and returns to on a turn. */
export const FULL: Box = { x: 0, y: 0, w: 1, h: 1 };

/** The smallest box, as a fraction of each side: a crop never shrinks a side below a tenth. */
export const MIN_SIDE = 0.1;

/** How far one arrow key moves or resizes the box, as a fraction of the side. */
export const KEY_STEP = 0.02;

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

/** A quarter turn to the right (clockwise) or to the left. */
export function turn(turns: Turns, direction: "left" | "right"): Turns {
  return ((turns + (direction === "right" ? 1 : 3)) % 4) as Turns;
}

/** The picture's size after the turns: a quarter or three quarters swap the sides. */
export function turnedSize(width: number, height: number, turns: Turns): { w: number; h: number } {
  return turns % 2 === 1 ? { w: height, h: width } : { w: width, h: height };
}

/** The box moved by (dx, dy) fractions, kept whole inside the picture. */
export function moveBox(box: Box, dx: number, dy: number): Box {
  return {
    ...box,
    x: clamp(box.x + dx, 0, 1 - box.w),
    y: clamp(box.y + dy, 0, 1 - box.h),
  };
}

/**
 * The box with one corner dragged by (dx, dy) fractions. The opposite corner
 * stays where it is; no side becomes shorter than MIN_SIDE, and the box never
 * leaves the picture.
 */
export function resizeBox(box: Box, corner: Corner, dx: number, dy: number): Box {
  let left = box.x;
  let top = box.y;
  let right = box.x + box.w;
  let bottom = box.y + box.h;
  if (corner === "nw" || corner === "sw") left = clamp(left + dx, 0, right - MIN_SIDE);
  else right = clamp(right + dx, left + MIN_SIDE, 1);
  if (corner === "nw" || corner === "ne") top = clamp(top + dy, 0, bottom - MIN_SIDE);
  else bottom = clamp(bottom + dy, top + MIN_SIDE, 1);
  return { x: left, y: top, w: right - left, h: bottom - top };
}

/** Whether the box is the whole picture (within a hundredth of a pixel's worth). */
export function isFull(box: Box): boolean {
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
  return near(box.x, 0) && near(box.y, 0) && near(box.w, 1) && near(box.h, 1);
}

/** The box in whole pixels of the turned picture, at least one pixel on each side. */
export function boxPixels(
  box: Box,
  width: number,
  height: number,
): { sx: number; sy: number; sw: number; sh: number } {
  const sx = clamp(Math.round(box.x * width), 0, width - 1);
  const sy = clamp(Math.round(box.y * height), 0, height - 1);
  const sw = clamp(Math.round(box.w * width), 1, width - sx);
  const sh = clamp(Math.round(box.h * height), 1, height - sy);
  return { sx, sy, sw, sh };
}

/**
 * The keyboard's way (the box is a focusable control): an arrow key moves the
 * box; with Shift it moves the bottom-right corner, so the box grows or shrinks.
 * Any other key changes nothing (null).
 */
export function keyBox(box: Box, key: string, shift: boolean): Box | null {
  const step: Record<string, [number, number]> = {
    ArrowLeft: [-KEY_STEP, 0],
    ArrowRight: [KEY_STEP, 0],
    ArrowUp: [0, -KEY_STEP],
    ArrowDown: [0, KEY_STEP],
  };
  const delta = step[key];
  if (delta === undefined) return null;
  return shift ? resizeBox(box, "se", delta[0], delta[1]) : moveBox(box, delta[0], delta[1]);
}
