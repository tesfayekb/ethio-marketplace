import type { MessageKey } from "@/i18n";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * F1-5b — THE ACCEPTANCE SCREEN'S WORDS, by code, for the one reader (DEC-339). The shell
 * answers `accept_legal`'s refusals as codes (`notInForce`, `adultRequired`, `badLanguage`,
 * `emptyList`, `notApplicable`, the gate's `rateLimited`); the one the person can mend by
 * reading again is `notInForce` (a version replaced while the screen was open). Every other
 * code draws the screen's generic line. Kept beside the screen, not in `legal-reader.ts`:
 * the reader is on the shell's first download, the reader of refusals is not.
 */
export const LEGAL_ACCEPT_CHANGED_KEY = "legal.accept.changed" satisfies MessageKey;

export const LEGAL_ACCEPT_REFUSALS = {
  words: { notInForce: LEGAL_ACCEPT_CHANGED_KEY },
  generic: "legal.accept.error",
} as const satisfies RefusalFamily;

/** The acceptance's failure, in the screen's words. */
export function acceptRefusalKey(failure: unknown): MessageKey {
  return readRefusal(failure, LEGAL_ACCEPT_REFUSALS).key;
}
