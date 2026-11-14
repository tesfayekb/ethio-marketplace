import { numberOf, parseNumber } from "./parse-input";

/**
 * A typed number parse: a whole number, or null when the field is blank or not
 * a number. Never a sentinel 0. DEC-339 — read by the one parser.
 */
export function wholeNumber(raw: string): number | null {
  return numberOf(parseNumber(raw, { integer: true }));
}
