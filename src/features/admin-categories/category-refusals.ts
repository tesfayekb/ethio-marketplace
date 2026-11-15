import { useState } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * DEC-333 (F1-4a) — the categories console's own words for its doors' codes. Each code that
 * replaced a console key reads that key's words; a code that never had words (unknownCategory,
 * unknownPointer, alreadyActive, reassignTargetInvalid, slugTaken, parentInactive, badValue,
 * permissionDenied) draws the console's generic line. A count travels as the code's tail.
 */
export const CATEGORY_REFUSALS = {
  words: {
    rateLimited: RATE_LIMITED_KEY,
    catchallParent: "admin.categories.error.catchallParent",
    reassignRequired: "admin.categories.error.reassignRequired",
    deleteActive: "admin.categories.error.delete_active",
    deleteSlugMismatch: "admin.categories.error.delete_slug_mismatch",
    deleteHasListings: "admin.categories.error.delete_has_listings",
    deleteHasChildren: "admin.categories.error.delete_has_children",
    acceptNoImage: "admin.categories.error.acceptNoImage",
  },
  generic: "admin.categories.error.saveFailed",
} as const satisfies RefusalFamily;

/**
 * A categories screen's refusal state: `fail` reads a door's refusal through the one reader, with
 * this family's words and the catalogue's own check for a key another table's trigger still
 * raises (`admin.attributes.error.parentAfterChild:…`); a cancelled step-up says nothing.
 */
export function useCategoryRefusal() {
  const { t, has } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const read = readRefusal(error, CATEGORY_REFUSALS, has);
    setMessage(read.silent ? null : refusalText(read, t));
  };
  return { message, setMessage, fail };
}
