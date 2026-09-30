/**
 * W6b-2 B3 — THE LOCATION DETAILS ("Building, floor, suite or directions").
 *
 * One value, `listings.street_address`, capped by the door at 200 characters.
 * The mirror here sanitises what the seller typed the same way the door does
 * (`set_listing_pin`): control characters and angle brackets are dropped and
 * whitespace collapses to single spaces. It is rendered as text, never HTML (F2).
 */
export const DETAILS_MAX = 200;

export function sanitizeDetails(raw: string): string {
  let clean = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    clean += code < 0x20 || code === 0x7f || ch === "<" || ch === ">" ? " " : ch;
  }
  return clean.replace(/\s+/g, " ").trim();
}
