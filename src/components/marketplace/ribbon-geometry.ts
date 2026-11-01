import { WATERMARK_ANGLE } from "@/lib/brand-mark";

/**
 * Sage S4 (spec §8; ruling 1 on the plan) — THE RIBBON'S GEOMETRY, in one place: the band's
 * place, angle and size (D122, INC-670: unchanged), the satin gradient's span along the band,
 * and the two rolled caps beyond the picture's edges. Pure numbers and CSS strings, read by
 * listing-picture.tsx (the drawing) and by the browser tests (the measurement), never by hand.
 * Every length is in the picture's width units (cqw) or the band's thickness T.
 */

/**
 * D122 — the band's centre sits this far from the corner ALONG the band's own
 * line, in the picture's width units, so the words fit between the two edges
 * at any angle (at −45° this was 21cqw in from each edge).
 */
export const TAPE_REACH = 29.7;
const RAD = (Math.abs(WATERMARK_ANGLE) * Math.PI) / 180;
const SIN = Math.sin(RAD);
const COS = Math.cos(RAD);
const TAN = Math.tan(RAD);

export const TAPE_INSET_X = `${(TAPE_REACH * COS).toFixed(2)}cqw`;
export const TAPE_INSET_Y = `${(TAPE_REACH * SIN).toFixed(2)}cqw`;
/** INC-670 — one band size: the letters, the room above and below, the band's length. */
export const RIBBON_LETTERS = "clamp(9px, 5cqw, 20px)";
export const RIBBON_PAD_CQW = 1.4;
export const RIBBON_LENGTH_CQW = 84;
const THICK = `(${RIBBON_LETTERS} + ${2 * RIBBON_PAD_CQW}cqw)`;

/** A length `cqw` picture units plus `t` band thicknesses. */
export type Span = { cqw: number; t: number };

/** A Span as CSS. */
export function spanCss({ cqw, t }: Span): string {
  const sign = t < 0 ? "-" : "+";
  return `calc(${cqw.toFixed(4)}cqw ${sign} ${Math.abs(t).toFixed(4)} * ${THICK})`;
}

/** A Span in pixels, for a picture `cqwPx` wide per unit and a band `thickPx` thick. */
export function spanPx({ cqw, t }: Span, cqwPx: number, thickPx: number): number {
  return cqw * cqwPx + t * thickPx;
}

/**
 * Ruling 2 — the satin's stops (0, 7, 22, 58, 92 and 100 %) are spaced so the stretch the
 * picture shows runs from the 7 % stop to the 92 % stop: the visible band reaches farthest
 * along its far edge (half a thickness from the centre line), from the bottom edge
 * (R + T/2 · cot) to the right edge (R + T/2 · tan) from the band's centre. The two dark end
 * stops lie beyond, on the rolled caps, so no letter ever sits on them.
 */
export const SATIN_SHOWN = { from: 0.07, to: 0.92 } as const;
const SHOWN_SHARE = SATIN_SHOWN.to - SATIN_SHOWN.from;
/** The gradient's own length along the band. */
export const SATIN_LENGTH: Span = {
  cqw: (2 * TAPE_REACH) / SHOWN_SHARE,
  t: (TAN + 1 / TAN) / 2 / SHOWN_SHARE,
};
/** Where the gradient starts, from the band's start edge. */
export const SATIN_START: Span = {
  cqw: RIBBON_LENGTH_CQW / 2 - TAPE_REACH - SATIN_SHOWN.from * SATIN_LENGTH.cqw,
  t: -1 / TAN / 2 - SATIN_SHOWN.from * SATIN_LENGTH.t,
};

/** The band's own box: its length, its centre on the picture, the brand angle. */
export const RIBBON_BAND_STYLE = {
  width: `${RIBBON_LENGTH_CQW}cqw`,
  left: `calc(100% - ${TAPE_INSET_X})`,
  top: `calc(100% - ${TAPE_INSET_Y})`,
  // D122 — the ribbon and the watermark share one angle.
  transform: `translate(-50%, -50%) rotate(${WATERMARK_ANGLE}deg)`,
  "--satin-x": spanCss(SATIN_START),
  "--satin-len": spanCss(SATIN_LENGTH),
} as const;

export const RIBBON_TEXT_STYLE = {
  fontSize: RIBBON_LETTERS,
  letterSpacing: "0.06em",
  padding: `${RIBBON_PAD_CQW}cqw 0`,
} as const;

/** Spec §8 — a rolled cap reaches 1.75cqw (7 of the picture's 400 units) past the edge. */
export const CAP_DEPTH_CQW = 1.75;
const CAP_ROUND = "1cqw";

/** The right edge's crossing: its top above the picture's bottom, and its height (T / cos). */
export const CAP_END = {
  above: { cqw: 2 * TAPE_REACH * SIN, t: 1 / COS / 2 },
  height: { cqw: 0, t: 1 / COS },
} as const;
/** The bottom edge's crossing: its start before the picture's right edge, and its width (T / sin). */
export const CAP_FOOT = {
  before: { cqw: 2 * TAPE_REACH * COS, t: 1 / SIN / 2 },
  width: { cqw: 0, t: 1 / SIN },
} as const;

/** The cap beyond the right edge, where the band's two edges cross it. */
export const CAP_END_STYLE = {
  left: "100%",
  top: `calc(100% - ${spanCss(CAP_END.above)})`,
  width: `${CAP_DEPTH_CQW}cqw`,
  height: spanCss(CAP_END.height),
  borderRadius: `0 ${CAP_ROUND} ${CAP_ROUND} 0`,
} as const;

/** The cap below the bottom edge, where the band's two edges cross it. */
export const CAP_FOOT_STYLE = {
  top: "100%",
  left: `calc(100% - ${spanCss(CAP_FOOT.before)})`,
  width: spanCss(CAP_FOOT.width),
  height: `${CAP_DEPTH_CQW}cqw`,
  borderRadius: `0 0 ${CAP_ROUND} ${CAP_ROUND}`,
} as const;

/** Spec §8 — the palette follows the card: a regular ad pearl, Premium gold, Featured sage. */
export const RIBBON_PALETTES = ["pearl", "gold", "sage"] as const;
export type RibbonPalette = (typeof RIBBON_PALETTES)[number];
const RIBBON_PARTS = ["1", "2", "3", "4", "5", "6", "end", "mid", "ink", "emboss", "shade"];

/** The palette's tokens under the names the stylesheet's ribbon rules read (`--rb-*`). */
export function ribbonPaletteVars(palette: RibbonPalette): Record<string, string> {
  return Object.fromEntries(
    RIBBON_PARTS.map((part) => [`--rb-${part}`, `var(--ribbon-${palette}-${part})`]),
  );
}
