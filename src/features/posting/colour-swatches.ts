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
 * INC-259 — AN OPTION VALUE MAY CARRY ITS PARENT. Pet colours are authored as
 * parent-prefixed values (`dog_black`, `cat_tabby`) because the stored answer must
 * stay unique inside one definition. The colour, though, is the STEM after that
 * parent prefix. A swatch is therefore resolved from the full value first, then
 * from each suffix after an underscore, so `dog_black` paints as `black` without
 * inventing a bespoke animal colour. Pattern values render as a neutral patterned
 * chip; a value with no colour meaning renders NO chip at all, so an unrelated
 * option list cannot become a tray of empty circles.
 */

export type ColourSwatch =
  | { kind: "solid"; ink: string }
  | { kind: "duo"; inks: [string, string] }
  | { kind: "pattern"; pattern: string | null };

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
  beige: "#c8ad8d",
  brown: "#7a4f35",
  tan: "#b68b5f",
  gold: "#c9a227",
  orange: "#ef6c00",
  yellow: "#f2cb1d",
  purple: "#6a1b9a",
  burgundy_wine: "#6d1f2f",
  burgundy: "#6d1f2f",
  wine: "#6d1f2f",
};

const PATTERNED = new Set([
  "brindle",
  "tabby",
  "calico",
  "tricolour",
  "tricolor",
  "multicolour",
  "multicolor",
  "black_tan",
]);

/** Is this detail about colour at all? The catalogue spells it both ways. */
export function isColourKey(attrKey: string): boolean {
  return /colou?r/i.test(attrKey);
}

function stems(value: string): string[] {
  const raw = value.toLowerCase();
  const parts = raw.split("_").filter((part) => part !== "");
  const out = [raw];
  for (let index = 1; index < parts.length; index += 1) out.push(parts.slice(index).join("_"));
  return out;
}

/** The visual swatch one catalogue value stands for, or `null` for no swatch. */
export function colourSwatch(value: string): ColourSwatch | null {
  for (const stem of stems(value)) {
    const ink = COLOUR_INK[stem];
    if (ink !== undefined) return { kind: "solid", ink };
    if (PATTERNED.has(stem)) return { kind: "pattern" };
  }
  return null;
}

/** The ink one catalogue value stands for, or `null` when it is not a solid colour. */
export function colourInk(value: string): string | null {
  const swatch = colourSwatch(value);
  return swatch?.kind === "solid" ? swatch.ink : null;
}
