import type { MessageKey } from "@/i18n";
import type { DoorFamily } from "@/lib/door-family";

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

/** The gate and note words every listings door shares. */
export const SHARED_REFUSAL_WORDS = {
  listingNotFound: "admin.listings.move.error.notFound",
  ownListing: "admin.listings.move.error.own",
  rateLimited: "admin.listings.move.error.rateLimited",
  permissionDenied: "admin.listings.move.error.denied",
  noteRequired: "admin.listings.move.noteRequired",
  noteTooLong: "admin.listings.move.noteTooLong",
} as const satisfies Record<string, MessageKey>;

/** The state machine's words, for the doors that move a listing's status. */
export const STATE_REFUSAL_WORDS = {
  illegalTransition: "admin.listings.move.error.illegal",
  severeRestore: "admin.listings.move.error.severe",
} as const satisfies Record<string, MessageKey>;

/**
 * The free-slot law's words, for the doors that bring a listing into the counted set: the
 * table's trigger `listings_free_slot_guard` raises `noFreeSlot` (20261105080111:55, DEC-342).
 */
export const SLOT_REFUSAL_WORDS = {
  noFreeSlot: "admin.listings.error.noFreeSlot",
} as const satisfies Record<string, MessageKey>;

/** Remove, Restore and Send back (`admin_move_listing`). */
export const MOVE_REFUSALS = {
  words: {
    ...SHARED_REFUSAL_WORDS,
    ...STATE_REFUSAL_WORDS,
    ...SLOT_REFUSAL_WORDS,
    // INC-1350 — the seller deleted the ad: it is gone, never a passing failure.
    ownerDeleted: "failure.gone",
  },
  // L22b — the dial's words that say WHEN, for a reset instant still to come.
  when: { rateLimited: "admin.listings.move.error.rateLimitedWhen" },
  generic: "common.error",
} as const satisfies DoorFamily<{
  doors: "admin_move_listing";
  also: { noFreeSlot: "trigger" };
  unreachable: {
    badValue: "the dialog sends the two verbs' targets and each verb's own reasons (MOVE_REASONS)";
    enforcementOnly: "the move core admits only a caller holding listings:enforce";
    notYourListing: "the move core refuses a missing ad as listingNotFound first, for a caller holding listings:enforce";
    ownerOnly: "the move core sends the state machine only removed or screening";
    reviewerOnly: "the move core sends the state machine only removed or screening";
    serviceOnly: "the move core sends the state machine only removed or screening";
    severeRemove: "met only by the ad's owner, whom the move core refuses as ownListing first";
  };
}>;

/** An admin's edit (`admin_edit_listing`); the posting wizard reads it too. */
export const EDIT_REFUSALS = {
  words: {
    ...SHARED_REFUSAL_WORDS,
    nothingChanged: "admin.listings.edit.nothing",
    listingRemoved: "admin.listings.edit.error.removed",
    categoryFixed: "admin.listings.edit.error.categoryFixed",
  },
  generic: "common.error",
} as const satisfies DoorFamily<{
  doors: "admin_edit_listing";
  unreachable: {
    badValue: "handled elsewhere: EDIT_BAD_VALUES words the reason; every other key is one editChanges writes from the door's list";
    photoNotFound: "the edit never sends remove_photos: the photo removal reads its own family";
  };
}>;

/** The edit's `badValue:<field>` lines: only the reason has words of its own. */
export const EDIT_BAD_VALUES = {
  reason: "admin.listings.move.pickReason",
} as const satisfies Record<string, MessageKey>;
