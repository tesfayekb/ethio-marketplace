import type { MessageKey } from "@/i18n";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * INC-1280 (10a-2, D27) — Remove on Saved (`unsave_listing`): its own words, never the page's
 * load words. A code with no line draws the family's generic. Kept beside the Saved page, so its
 * words stay in the layer only that page loads.
 */
export const SAVED_REMOVE_REFUSALS = {
  words: { listingNotAvailable: "account.saved.unavailable" },
  generic: "account.saved.removeFailed",
} as const satisfies RefusalFamily;

/** The words for a refused or failed Remove on Saved, through the one reader. */
export function savedRemoveKey(failure: unknown): MessageKey {
  return readRefusal(failure, SAVED_REMOVE_REFUSALS).key;
}
