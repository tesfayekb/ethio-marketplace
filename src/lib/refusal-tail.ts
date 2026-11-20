import type { MessageKey } from "@/i18n";

import {
  DOOR_KEY,
  fillRefusal,
  refusalText,
  splitRefusal,
  type RefusalFamily,
  type RefusalRead,
} from "./refusal";

/**
 * DEC-339 — the console doors' dialect beside the one refusal reader
 * (`src/lib/refusal.ts`, which holds its shapes: `splitRefusal`, `fillRefusal`,
 * `DOOR_KEY`). What stays here is the dialect's own words, which belong to the
 * admin strings layer and so never ride a member or a public page (DEC-258):
 * the consoles' shared family, and `doorKeyText`, which the console families
 * call until their wave moves them onto `readRefusal`.
 */
export { DOOR_KEY, fillRefusal, splitRefusal, type RefusalParts } from "./refusal";

/**
 * Turn D1 stop 11 (G0.2) — a database rate gate raises the bare code
 * `rateLimited` (rate_gate, INC-951). Every staff screen reads it as ONE shared
 * sentence; a screen with its own specific rateLimited key maps it before here.
 */
export const RATE_LIMITED_KEY = "admin.error.rateLimited" satisfies MessageKey;

/** The consoles' shared words, for `readRefusal`: the rate gate's one sentence. */
export const ADMIN_REFUSALS: RefusalFamily = { words: { rateLimited: RATE_LIMITED_KEY } };

/** L22 — a rate sentence that says WHEN (`{when}`), and the plain sentence it falls back to. */
export type RateWords = { readonly plain: MessageKey; readonly when: MessageKey };

/** L22 — every family's rate words; a family's plain key reads its `when` key through `rateText`. */
export const RATE_WORDS: readonly RateWords[] = [
  { plain: RATE_LIMITED_KEY, when: "admin.error.rateLimitedWhen" },
];

/**
 * L22 — ONE choice of a rate sentence. A refusal whose key has rate words, whose tail is an
 * instant still to come and which arrives with the reader's language says WHEN, filled by
 * `fillRefusal`'s `{when}`; no tail, an unreadable or past instant, or no language keeps the plain
 * sentence, so nothing shows a raw time. Every other refusal is `refusalText` as it was.
 */
export function rateText(
  read: RefusalRead,
  t: (key: MessageKey) => string,
  language?: string,
  values?: Record<string, string | number>,
): string {
  const words = RATE_WORDS.find((entry) => entry.plain === read.key);
  const at = read.tail === undefined ? Number.NaN : Date.parse(read.tail.trim());
  const timed =
    words !== undefined && language !== undefined && Number.isFinite(at) && at > Date.now();
  return refusalText(timed ? { ...read, key: words.when } : read, t, values, language);
}

/**
 * T7 (INC-578's class, G29) — ONE reading of a door's words. A refusal that IS
 * a known translation key, with or without a tail, comes back as its sentence,
 * filled; anything else is null, so the caller decides its fallback. The
 * categories console used to translate only `admin.categories.error.*`, so the
 * parent-first refusal a move can now raise
 * (`admin.attributes.error.parentAfterChild:…`) would have been printed raw.
 */
export function doorKeyText(
  raw: string,
  translate: (key: string) => string | undefined,
): string | null {
  const { key: code, tail } = splitRefusal(raw.trim());
  const key = code === "rateLimited" ? RATE_LIMITED_KEY : code;
  if (key !== RATE_LIMITED_KEY && !DOOR_KEY.test(key)) return null;
  const text = translate(key);
  if (text === undefined || text === "" || text === key) return null;
  return fillRefusal(text, tail);
}
