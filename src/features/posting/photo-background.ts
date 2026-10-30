/**
 * Bundle 13 turn 12 — D155 (the operator, 2026-10-13: "the background color can
 * not be changed and its our theme so every picture has the same"): THE ONE
 * BACKGROUND A REMOVED PHOTO GETS.
 *
 * It is #F3F5F8, the cool grey agreed in D132 (once the site's page tone, which
 * turn SAGE-S1's ruling A moved to the Sage #EEF3EF; this backdrop stays, so every
 * removed photo, old and new, keeps one ground — D155), fixed in code: the seller cannot
 * change it, and the provider never chooses it. The provider returns the item
 * cut out on a transparent ground (src/server/media/background.ts); the
 * seller's device lays it on this colour, so the server does no image work
 * (DEC-082) and every removed photo carries the same background.
 */
export const PHOTO_BACKDROP = "#F3F5F8";

/**
 * The cut-out on the house background, at the cut-out's own size: the picture
 * the preview shows and Keep sends.
 */
export function onBackdrop(cutout: ImageBitmap): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, cutout.width);
  canvas.height = Math.max(1, cutout.height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no 2d context");
  context.fillStyle = PHOTO_BACKDROP;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(cutout, 0, 0);
  return canvas;
}
