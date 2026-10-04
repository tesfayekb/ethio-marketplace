/**
 * BUNDLE 3 STEPS 14, 15, 18 — THE ONE CLIENT MIRROR OF THE SELLER-NAME JUDGE.
 *
 * The door (`alias_rule` in M2, 18556a32) is the authority (F3). This mirror
 * answers only the rules that need no list held by the database, so a plainly
 * refused name costs no round trip:
 *   a  shape (step 14)
 *   b  "ethio" anywhere in the folded name
 *   c  a role or function word as a whole part, or at the start or end
 * Rules d, e and f read the reserved lists, the live catalogue, places and the
 * history; for those the mirror answers `null` and the screen asks
 * `check_seller_alias`. `null` therefore means "not refused here", never "free".
 */

export type AliasRule = "a" | "b" | "c";

/** Step 16 — the role and function words, as seeded by M2 (kinds role + function). */
export const ROLE_WORDS = [
  "admin",
  "administrator",
  "support",
  "official",
  "verified",
  "moderator",
  "staff",
] as const;
export const FUNCTION_WORDS = [
  "login",
  "logout",
  "signin",
  "signup",
  "verify",
  "password",
  "payment",
] as const;

/** Step 15 — the fold, used for every comparison and never stored. */
export function foldAlias(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, "")
    .replace(/[01345]/g, (d) => ({ "0": "o", "1": "l", "3": "e", "4": "a", "5": "s" })[d] ?? d)
    .replace(/rn/g, "m");
}

/** Step 14 — 5 to 30 of a–z 0–9 _, a letter first, ≥3 letters, no 7-digit run, no edge or double _. */
export function aliasShapeOk(value: string): boolean {
  return (
    value.length >= 5 &&
    value.length <= 30 &&
    /^[a-z][a-z0-9_]*$/.test(value) &&
    value.replace(/[^a-z]/g, "").length >= 3 &&
    !/[0-9]{7}/.test(value) &&
    !value.endsWith("_") &&
    !value.includes("__")
  );
}

const GUARDED = [...ROLE_WORDS, ...FUNCTION_WORDS].map(foldAlias);

/** The first of rules a–c that refuses, or null (the door judges d–f). */
export function aliasRuleLocal(input: string): AliasRule | null {
  const value = input.trim().toLowerCase();
  if (!aliasShapeOk(value)) return "a";
  const folded = foldAlias(value);
  if (folded === "") return "a";
  if (folded.includes("ethio")) return "b";
  const parts = value
    .split("_")
    .filter((part) => part !== "")
    .map(foldAlias);
  for (const word of GUARDED) {
    if (parts.includes(word) || folded.startsWith(word) || folded.endsWith(word)) return "c";
  }
  return null;
}

/** The door's reason word for a rule (`alias_reason`). */
export const ALIAS_RULE_REASON: Record<AliasRule, string> = {
  a: "aliasShape",
  b: "aliasEthio",
  c: "aliasRole",
};
