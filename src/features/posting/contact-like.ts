/**
 * THE ONE CLIENT MIRROR of the door's phone/contact rule
 * (`public.attr_contact_like`). Bundle 2 / INC-382 rule:
 *
 * A "run" is digits joined by at most two of space, dot, hyphen or round
 * bracket between digits; a leading + belongs to the run. D is the run's
 * digit count; a group is an unbroken string of digits. A text matches when
 *   R1 a run starts with + and D >= 8;
 *   R2 a run's first digit is 0 and D is 9..15;
 *   R3 a group has 10+ digits, or exactly 9 digits starting with 7 or 9;
 *   R4 D is 9, the first digit is 7 or 9, and every group has >= 2 digits;
 *   R5 the groups are 3-3-4, or 1-3-3-4 starting with 1;
 *   R6 the text holds an e-mail address, or a t.me/ or wa.me/ link.
 *
 * Advice only — the door is the authority (F3).
 */
const RUN = /\+?[0-9](?:[ .()-]{0,2}[0-9])*/g;
const EMAIL =
  /[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63}){0,10}\.[A-Za-z]{2,24}/;
const LINK = /\b(?:t|wa)\.me\//i;

function runMatches(run: string): boolean {
  const groups = run.match(/[0-9]+/g) ?? [];
  const digits = groups.join("");
  const d = digits.length;
  const first = digits[0];
  if (run.startsWith("+") && d >= 8) return true; // R1
  if (first === "0" && d >= 9 && d <= 15) return true; // R2
  if (groups.some((g) => g.length >= 10 || (g.length === 9 && (g[0] === "7" || g[0] === "9"))))
    return true; // R3
  if (d === 9 && (first === "7" || first === "9") && groups.every((g) => g.length >= 2))
    return true; // R4
  const shape = groups.map((g) => g.length).join("-");
  if (shape === "3-3-4" || (shape === "1-3-3-4" && groups[0] === "1")) return true; // R5
  return false;
}

/**
 * INC-448 — the patterns read at most this many characters, so no text a
 * seller pastes can make the scan run long (the e-mail pattern is bounded too).
 */
export const CONTACT_SCAN_MAX = 4000;

export function looksLikeContact(text: string | null | undefined): boolean {
  const value = (text ?? "").slice(0, CONTACT_SCAN_MAX);
  // Reviewed (DEC-153): the scanned text is bounded by CONTACT_SCAN_MAX (INC-448).
  // nosemgrep: detect-redos
  if (EMAIL.test(value) || LINK.test(value)) return true; // R6
  for (const run of value.match(RUN) ?? []) {
    if (runMatches(run)) return true;
  }
  return false;
}

/**
 * Identity presets (digits:n, vin, plate-et, alnum) are identity data, never
 * free text, so the rule never applies to them — the door skips them too.
 */
export function contactRuleApplies(preset: string | null): boolean {
  return preset === null || preset.startsWith("free:");
}
