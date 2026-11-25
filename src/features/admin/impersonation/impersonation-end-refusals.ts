import type { MessageKey } from "@/i18n/types";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * Bundle 10b (D39) — its own file because the view-as bar draws it on every page (base layer);
 * View as's start words (impersonation-refusals.ts) stay on the admin pages. End now's words for
 * `end_impersonation`'s one code (noActiveSession).
 */
export const END_REFUSALS = {
  words: { noActiveSession: "impersonation.noneActive" },
  generic: "impersonation.error.endFailed",
} as const satisfies RefusalFamily;

/** A failed End now's words; null for a step-up the person cancelled. */
export function endRefusalKey(error: unknown): MessageKey | null {
  const read = readRefusal(error, END_REFUSALS);
  return read.silent ? null : read.key;
}
