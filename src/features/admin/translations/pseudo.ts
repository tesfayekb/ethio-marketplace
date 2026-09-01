/**
 * U4i ③ + ⑦ — LENGTH WARNINGS AND PSEUDO-LOCALIZATION.
 *
 * Both live here because they are the same concern seen twice: how much room a
 * translation needs. ③ WARNS about a real translation that outgrew its source;
 * ⑦ MANUFACTURES an over-long translation on purpose so a layout can be QA'd
 * before any real language exists.
 *
 * Pure functions only — no React, no Supabase — so DEC-026 can test them
 * directly and the console can reuse them on both twins.
 */

/** ③ A translation longer than this multiple of its source earns an amber chip. */
export const LENGTH_WARN_RATIO = 1.5;

/**
 * Grapheme-ish length: `[...text]` counts code POINTS, so Ge'ez syllables and
 * emoji are one unit each instead of two UTF-16 units. `.length` would report
 * Amharic as artificially short and English as artificially long.
 */
export function textLength(text: string): number {
  return [...text].length;
}

/**
 * ③ A WARNING, NEVER A FLAG AND NEVER A BLOCK (law F4 stays intact: nothing is
 * refused here). An empty source cannot produce a ratio, so it never warns.
 */
export function isOverlong(
  source: string | null | undefined,
  value: string | null | undefined,
  ratio: number = LENGTH_WARN_RATIO,
): boolean {
  const src = textLength(source ?? "");
  const out = textLength(value ?? "");
  if (src === 0 || out === 0) return false;
  return out > src * ratio;
}

/** ③ The measured ratio, for the chip's own read-out (1 decimal place). */
export function lengthRatio(
  source: string | null | undefined,
  value: string | null | undefined,
): number {
  const src = textLength(source ?? "");
  if (src === 0) return 0;
  return Math.round((textLength(value ?? "") / src) * 10) / 10;
}

/* ------------------------------------------------------------------ */
/* ⑦ PSEUDO-LOCALIZATION                                              */
/* ------------------------------------------------------------------ */

/**
 * The reserved layout-QA language. It is created admin-only and the publication
 * RPC refuses it BY RULE (migration 20260902090000), so a pseudo catalog can
 * never reach a buyer.
 */
export const PSEUDO_LANG = "zxa";
export const PSEUDO_LANG_NAME_EN = "Pseudo (layout QA)";
export const PSEUDO_LANG_NAME_NATIVE = "⟪Ṗşḗŭḓǿ⟫";

/** Target expansion: +40% width, the standard European-localisation headroom. */
export const PSEUDO_EXPANSION = 0.4;

const ACCENTS: Record<string, string> = {
  a: "ȧ",
  b: "ƀ",
  c: "ƈ",
  d: "ḓ",
  e: "ḗ",
  f: "ƒ",
  g: "ɠ",
  h: "ħ",
  i: "ī",
  j: "ĵ",
  k: "ķ",
  l: "ŀ",
  m: "ḿ",
  n: "ƞ",
  o: "ǿ",
  p: "ṗ",
  q: "ɋ",
  r: "ř",
  s: "ş",
  t: "ŧ",
  u: "ŭ",
  v: "ṽ",
  w: "ẇ",
  x: "ẋ",
  y: "ẏ",
  z: "ẑ",
  A: "Ȧ",
  B: "Ɓ",
  C: "Ƈ",
  D: "Ḓ",
  E: "Ḗ",
  F: "Ƒ",
  G: "Ɠ",
  H: "Ħ",
  I: "Ī",
  J: "Ĵ",
  K: "Ķ",
  L: "Ŀ",
  M: "Ḿ",
  N: "Ƞ",
  O: "Ǿ",
  P: "Ṗ",
  Q: "Ɋ",
  R: "Ř",
  S: "Ş",
  T: "Ŧ",
  U: "Ŭ",
  V: "Ṽ",
  W: "Ẇ",
  X: "Ẋ",
  Y: "Ẏ",
  Z: "Ẑ",
};

const TOKEN_RE = /\{[^{}]*\}/g;
const PAD = "·";
// A private-use sentinel, not NUL: it can never occur in a UI string and, unlike
// a control character, it is a legal regex literal (eslint no-control-regex).
const MARK = "\uE000";

/**
 * ⑦ EVERY PLACEHOLDER SURVIVES VERBATIM. The writer
 * (`admin_machine_translation`) placeholder-validates exactly like a human
 * save, so a generator that mangled `{count}` would flag its own output. Tokens
 * are therefore split out, never accented and never padded.
 *
 * Shape: `⟪` accented-source padded-to-+40% `⟫`. The brackets make truncation
 * visible at a glance — a clipped string loses its `⟫`.
 */
export function pseudoize(source: string, expansion: number = PSEUDO_EXPANSION): string {
  const tokens: string[] = [];
  const masked = source.replace(TOKEN_RE, (token) => {
    const index = tokens.push(token) - 1;
    return `${MARK}${index}${MARK}`;
  });

  const accented = [...masked].map((char) => ACCENTS[char] ?? char).join("");

  const bodyLength = textLength(masked);
  const padCount = Math.max(1, Math.ceil(bodyLength * expansion));
  const padded = `${accented}${PAD.repeat(padCount)}`;

  const restored = padded.replace(/\uE000(\d+)\uE000/g, (whole, digits: string) => {
    const token = tokens[Number(digits)];
    return token ?? whole;
  });

  return `⟪${restored}⟫`;
}

/** True when a value carries the pseudo markers — the E2E and console read-out. */
export function isPseudo(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("⟪") && value.endsWith("⟫");
}
