import type { Refusal } from "@/features/posting/types";
import type { MessageKey } from "@/i18n";

import { editErrorKey } from "./edit-listing";
import { groupOf, groupsOf, type FieldGroup } from "./history";
import type { AdminListingHistoryEntry } from "./use-admin-listing";

/**
 * Bundle 11, the Listings console, turn L4d (D141) — UNDO AN ADMIN'S EDIT.
 *
 * "Undo this edit" sits on the newest line of a listing's History when that line
 * is an edit by staff (not an undo, and no photo removed). The door
 * `admin_undo_listing_edit` decides (F3): it also checks that nothing changed
 * the listing since, then sends the edit's before-values back through the edit
 * door with the reason "Undo" — the same rules, a new History line, and the
 * seller is told.
 */

/** True when this History line offers "Undo this edit". */
export function mayUndo(entry: AdminListingHistoryEntry, index: number): boolean {
  return (
    index === 0 &&
    entry.kind === "edit" &&
    entry.by === "staff" &&
    entry.reason !== "undo" &&
    !("photos_removed" in entry.before) &&
    !("photos_removed" in entry.after)
  );
}

/** The undo door's refusal, as the person reads it. */
export function undoErrorKey(message: string): MessageKey {
  if (message === "the listing has changed since this edit" || message === "nothing to undo") {
    return "admin.listings.undo.changed";
  }
  return editErrorKey(message);
}

/** Refusal fields that are not a specification's key, and not a listing column either. */
const NOT_SPECS = new Set([
  "door",
  "residency",
  "rate",
  "coverage",
  "alias",
  "business_name",
  "first_name",
  "last_name",
  "renew",
]);

/**
 * What the door's refusals name, as groups: the before-values break today's
 * rules there. A specification's refusal names its answer's key, which reads as
 * Specifications.
 */
export function undoRefusalGroups(refusals: Refusal[]): FieldGroup[] {
  return groupsOf(
    refusals.map((refusal) =>
      groupOf(refusal.field) === "other" && !NOT_SPECS.has(refusal.field)
        ? "attributes"
        : refusal.field,
    ),
  );
}
