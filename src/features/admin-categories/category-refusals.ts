import { useState } from "react";

import { useI18n } from "@/i18n";
import { PARSE_INVALID_KEY } from "@/lib/parse-input";
import type { DoorFamily } from "@/lib/door-family";
import { readRefusal, refusalText } from "@/lib/refusal";
import { ADMIN_WHEN, RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * DEC-333 (F1-4a) — the categories console's own words for its doors' codes. Each code that
 * replaced a console key reads that key's words; a code without words draws the console's generic
 * line, and the type below names each one with its reason. A count travels as the code's tail.
 */
export const CATEGORY_REFUSALS = {
  when: ADMIN_WHEN,
  words: {
    rateLimited: RATE_LIMITED_KEY,
    catchallParent: "admin.categories.error.catchallParent",
    reassignRequired: "admin.categories.error.reassignRequired",
    deleteActive: "admin.categories.error.delete_active",
    deleteSlugMismatch: "admin.categories.error.delete_slug_mismatch",
    deleteHasListings: "admin.categories.error.delete_has_listings",
    deleteHasChildren: "admin.categories.error.delete_has_children",
    acceptNoImage: "admin.categories.error.acceptNoImage",
    // INC-1280 (10a-2, D50 categories part; D55 the export's codes).
    unknownCategory: "admin.categories.error.unknownCategory",
    unknownPointer: "admin.categories.error.unknownPointer",
    parentInactive: "admin.categories.error.parentInactive",
    // INC-1307 — the owed words (badValue reaches this console only as badValue:visible_until).
    slugTaken: "admin.categories.error.slugTaken",
    reassignTargetInvalid: "admin.categories.error.reassignTargetInvalid",
    badValue: "admin.categories.error.windowOrder",
    forbidden: "admin.ai.error.denied",
    // DEC-339 — the console's own Fields: the gate's blank and the parser's unreadable number.
    required: "post.refusal.required",
    badType: PARSE_INVALID_KEY,
  },
  generic: "admin.categories.error.saveFailed",
} as const satisfies DoorFamily<{
  doors:
    | "admin_create_category"
    | "admin_update_category"
    | "admin_set_category_window"
    | "admin_set_country_exclusions"
    | "admin_retire_category"
    | "admin_reactivate_category"
    | "admin_delete_category"
    | "admin_reorder_categories"
    | "admin_add_category_pointer"
    | "admin_move_category_pointer"
    | "admin_set_primary_pointer"
    | "admin_remove_category_pointer"
    | "admin_set_category_images"
    | "admin_accept_category_image"
    | "admin_export_categories"
    | "admin_preview_category_import"
    | "admin_commit_category_import"
    | "admin_undo_category_import";
  also: { forbidden: "route"; required: "formGate"; badType: "parser" };
  unreachable: {
    unknownBatch: "handled elsewhere: the import dialog words it with its shared import words";
    unknownParent: "the commit's plan, read in the same transaction, refuses the same row first";
    baseLocked: "the import doors save only the pair language's name of the row just written";
    unknownEntity: "the import doors save only the pair language's name of the row just written";
  };
  generic: {
    alreadyActive: "Reactivate is drawn on a retired row alone: only someone else's reactivation first meets it";
    importRunning: "another import of this console is still running: the general line asks to try again";
  };
}>;

/**
 * A categories screen's refusal state: `fail` reads a door's refusal through the one reader, with
 * this family's words and the catalogue's own check for a key another table's trigger still
 * raises (`admin.attributes.error.parentAfterChild:…`); a cancelled step-up says nothing.
 */
export function useCategoryRefusal() {
  const { t, has, language } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const read = readRefusal(error, CATEGORY_REFUSALS, has);
    setMessage(read.silent ? null : refusalText(read, t, undefined, language));
  };
  return { message, setMessage, fail };
}
