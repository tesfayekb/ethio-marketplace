import type { MessageKey } from "@/i18n";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

import { badValueWords, EDIT_BAD_VALUES, EDIT_REFUSALS } from "./listing-refusals";

/**
 * Bundle 13 turn 8 (D154 B4) — WHAT STAFF GIVE WHEN THEY REMOVE ONE PHOTO.
 *
 * The door is `admin_edit_listing(listing, { remove_photos: [id] }, reason, note)`
 * (turn L1): listings:enforce with a fresh second factor, never the admin's own
 * listing, a draft or a removed one; it writes a revision, an audit row and a
 * notice to the seller, and keeps the file with the revision. The reasons below
 * are the door's own list, those that fit a photo: "Inappropriate photo" (code
 * `photo`: its content breaks the photo rules — a phone number on it, a person,
 * a watermark; D171 gave it these words, it read "A photo"), "Misleading
 * details" (it shows something else), "The site's rules" and "Other" (a note
 * required). "Contact details in the text" and "Wrong category" are about the
 * ad's words and its place, so they are not offered here.
 */
export const PHOTO_REASONS = ["photo", "misleading", "rules", "other"] as const;

/** The words of a refused photo removal: the edit's, and its own for a photo that is gone. */
const PHOTO_REMOVE_REFUSALS = {
  words: { ...EDIT_REFUSALS.words, photoNotFound: "admin.listings.photos.error.gone" },
  generic: "common.error",
} as const satisfies RefusalFamily;

/** The door's refusal (`code[:detail]`), as the person reads it. */
export function photoRemoveErrorKey(refusal: unknown): MessageKey {
  return badValueWords(refusal, EDIT_BAD_VALUES) ?? readRefusal(refusal, PHOTO_REMOVE_REFUSALS).key;
}
