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
    if (PATTERNED.has(stem)) return { kind: "pattern", pattern: stem };
  }
  return null;
}

/** The ink one catalogue value stands for, or `null` when it is not a solid colour. */
export function colourInk(value: string): string | null {
  const swatch = colourSwatch(value);
  return swatch?.kind === "solid" ? swatch.ink : null;
}

/**
 * D28 / M-SWATCH — THE CATALOGUE MAY SAY THE COLOUR ITSELF.
 *
 * An option record carries an optional `swatch` cell in exactly three spellings,
 * the same three the door validates (`attr_option_shape`):
 *
 *   `#RRGGBB`            one ink
 *   `#RRGGBB|#RRGGBB`    two-tone, shown as a diagonal half and half
 *   `pattern:<name>`     one of tabby · brindle · calico · tricolour ·
 *                        multicolour · striped
 *
 * A NAME LOOKUP IS THE FALLBACK, NEVER THE OVERRIDE: when the record says what
 * the colour is, that is what a buyer sees; only an ABSENT cell falls back to the
 * value's own stem (INC-259). An unreadable cell resolves to nothing here — the
 * door refuses one on the way in, so this can only be pre-D28 data (F4: nothing
 * is invented from it).
 */
const HEX_RE = /^#[0-9a-f]{6}$/i;

export const SWATCH_PATTERNS = [
  "tabby",
  "brindle",
  "calico",
  "tricolour",
  "multicolour",
  "striped",
] as const;

export function parseSwatch(raw: string | null | undefined): ColourSwatch | null {
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  if (text === "") return null;
  if (text.toLowerCase().startsWith("pattern:")) {
    const name = text.slice("pattern:".length).trim().toLowerCase();
    return (SWATCH_PATTERNS as readonly string[]).includes(name)
      ? { kind: "pattern", pattern: name }
      : null;
  }
  const parts = text.split("|").map((part) => part.trim());
  if (parts.length === 1 && HEX_RE.test(parts[0] ?? "")) {
    return { kind: "solid", ink: (parts[0] ?? "").toLowerCase() };
  }
  if (parts.length === 2 && parts.every((part) => HEX_RE.test(part))) {
    return {
      kind: "duo",
      inks: [(parts[0] ?? "").toLowerCase(), (parts[1] ?? "").toLowerCase()],
    };
  }
  return null;
}

/** The swatch one OPTION shows: its own declared cell first, then its name. */
export function optionSwatch(option: {
  value: string;
  swatch?: string | null;
}): ColourSwatch | null {
  return parseSwatch(option.swatch ?? null) ?? colourSwatch(option.value);
}
