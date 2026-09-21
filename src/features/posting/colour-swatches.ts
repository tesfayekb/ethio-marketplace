/**
 * U6-C1-R3b-3c STEP 3 (D26) — A COLOUR IS SEEN, NOT READ.
 *
 * "brown_beige" is a word; a buyer choosing the colour of a car is looking for a
 * colour. So a definition whose key names a colour renders its options as
 * SWATCHES beside their own labels. The map below is DATA — the catalogue's own
 * colour values and the ink each one stands for — not theming: a design token
 * cannot say what colour a car is (the design system still owns every frame,
 * border and text around it).
 *
 * A value with no ink here (a curator's new colour, or `other`) renders as a
 * NEUTRAL RING: the option is still offered and still labelled, and the screen
 * never invents a colour it was not told about (F4).
 */

const COLOUR_INK: Record<string, string> = {
  black: "#111111",
  white: "#ffffff",
  silver: "#c7ccd1",
  gray: "#808a91",
  grey: "#808a91",
  red: "#d13438",
  blue: "#1565c0",
  green: "#2e7d32",
  brown_beige: "#a1795a",
  gold: "#c9a227",
  orange: "#ef6c00",
  yellow: "#f2cb1d",
  purple: "#6a1b9a",
  burgundy_wine: "#6d1f2f",
};

/** Is this detail about colour at all? The catalogue spells it both ways. */
export function isColourKey(attrKey: string): boolean {
  return /colou?r/i.test(attrKey);
}

/** The ink one catalogue value stands for, or `null` for the neutral ring. */
export function colourInk(value: string): string | null {
  return COLOUR_INK[value.toLowerCase()] ?? null;
}
