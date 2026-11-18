import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";
import { ownValue } from "@/lib/own-key";
import { splitRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * F1-6a — THE LISTINGS CONSOLE'S WORDS, by code, for the one reader (DEC-339).
 *
 * The staff doors of the listings family answer a refusal as `code[:detail]`
 * (`ownListing`, `illegalTransition:removed-removed`, `badValue:reason`, ...).
 * Each screen's problem line keeps the words it drew before the doors moved to
 * codes (the specs read them word for word); a code with no words here draws
 * the console's own generic line. `src/lib/door-codes.ts` does not grow
 * (INC-1153): the words of a family live in the family's files, one table per
 * door.
 */

/** The gate and move words every listings door shares. */
export const SHARED_REFUSAL_WORDS = {
  listingNotFound: "admin.listings.move.error.notFound",
  ownListing: "admin.listings.move.error.own",
  illegalTransition: "admin.listings.move.error.illegal",
  severeRestore: "admin.listings.move.error.severe",
  rateLimited: "admin.listings.move.error.rateLimited",
  permissionDenied: "admin.listings.move.error.denied",
  noteRequired: "admin.listings.move.noteRequired",
  noteTooLong: "admin.listings.move.noteTooLong",
  noFreeSlot: "admin.listings.error.noFreeSlot",
} as const satisfies Record<string, MessageKey>;

/** Remove, Restore and Send back (`admin_move_listing`). */
export const MOVE_REFUSALS = {
  words: SHARED_REFUSAL_WORDS,
  generic: "common.error",
} as const satisfies RefusalFamily;

/** An admin's edit (`admin_edit_listing`); the posting wizard reads it too. */
export const EDIT_REFUSALS = {
  words: {
    ...SHARED_REFUSAL_WORDS,
    nothingChanged: "admin.listings.edit.nothing",
    listingRemoved: "admin.listings.edit.error.removed",
  },
  generic: "common.error",
} as const satisfies RefusalFamily;

/** The edit's `badValue:<field>` lines: only the reason has words of its own. */
export const EDIT_BAD_VALUES = {
  reason: "admin.listings.move.pickReason",
} as const satisfies Record<string, MessageKey>;

/**
 * The line a `badValue:<field>` refusal draws by its detail: the one code names
 * many fields, and the reader's words are by code alone. Null for any other
 * refusal and for a field with no words of its own (the family's generic line
 * follows through `readRefusal`). The split is the reader's (`splitRefusal`).
 */
export function badValueWords(
  refusal: unknown,
  badValues: Readonly<Record<string, MessageKey>>,
): MessageKey | null {
  const { key, tail } = splitRefusal(errorText(refusal).trim());
  if (key !== "badValue" || tail === undefined) return null;
  return ownValue(badValues, tail) ?? null;
}
