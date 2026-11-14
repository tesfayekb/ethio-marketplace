import type { MessageKey } from "@/i18n";

/**
 * DEC-339 (Foundations 2, wave 1) — THE ONE PARSER of what a person typed.
 *
 * A typed answer is read to a typed result, never to a sentinel: a blank is
 * `blank` (the form gate's "missing"), text that is not a number is `invalid`
 * (the Field's own refusal, `PARSE_INVALID_KEY`), and only a number is a
 * number — never 0, NaN or "" in their place. The door still judges what it
 * receives (F3); the parser only refuses to invent a value.
 */

export type ParsedNumber =
  | { kind: "number"; value: number }
  | { kind: "blank" }
  | { kind: "invalid" };

export type ParsedText = { kind: "text"; value: string } | { kind: "blank" } | { kind: "invalid" };

export type NumberRules = {
  /** A whole number only (no decimal point). */
  integer?: boolean;
  min?: number;
  max?: number;
  /** At most this many digits after the decimal point. */
  decimals?: number;
};

/** The words for an answer the parser could not read as the form expects. */
export const PARSE_INVALID_KEY = "post.refusal.badType" satisfies MessageKey;

const DECIMAL = /^-?(?:\d+(?:\.(\d*))?|\.(\d+))$/;

/** A number typed in a control, read by `rules`. */
export function parseNumber(raw: string, rules: NumberRules = {}): ParsedNumber {
  const text = raw.trim();
  if (text === "") return { kind: "blank" };
  const match = DECIMAL.exec(text);
  if (match === null) return { kind: "invalid" };
  const fraction = match[1] ?? match[2];
  if (rules.integer === true && fraction !== undefined) return { kind: "invalid" };
  if (rules.decimals !== undefined && fraction !== undefined && fraction.length > rules.decimals) {
    return { kind: "invalid" };
  }
  const value = Number(text);
  if (!Number.isFinite(value)) return { kind: "invalid" };
  if (rules.min !== undefined && value < rules.min) return { kind: "invalid" };
  if (rules.max !== undefined && value > rules.max) return { kind: "invalid" };
  return { kind: "number", value };
}

/**
 * Text typed in a control: trimmed, its inner runs of white space made one
 * space, in Unicode's composed form (NFC). Longer than `maxLength` characters
 * is `invalid`.
 */
export function parseText(raw: string, rules: { maxLength?: number } = {}): ParsedText {
  const value = raw.normalize("NFC").replace(/\s+/gu, " ").trim();
  if (value === "") return { kind: "blank" };
  if (rules.maxLength !== undefined && [...value].length > rules.maxLength) {
    return { kind: "invalid" };
  }
  return { kind: "text", value };
}

/** The number a parse holds, or null for a blank or an unreadable answer. */
export function numberOf(parsed: ParsedNumber): number | null {
  return parsed.kind === "number" ? parsed.value : null;
}
