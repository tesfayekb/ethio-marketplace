import { describe, expect, it } from "vitest";

import { mayUndo, undoErrorKey, undoRefusalGroups } from "./undo-edit";
import type { AdminListingHistoryEntry } from "./use-admin-listing";

/**
 * Bundle 11, turn L4d (D141) — which History line offers "Undo this edit", and
 * how the undo door's answers read.
 */
const entry = (over: Partial<AdminListingHistoryEntry> = {}): AdminListingHistoryEntry => ({
  at: "2026-10-12T10:00:00.123456+00:00",
  kind: "edit",
  by: "staff",
  byName: null,
  fields: ["title"],
  before: { title: "Old" },
  after: { title: "New" },
  reason: "misleading",
  note: null,
  ...over,
});

describe("undo an admin's edit (turn L4d)", () => {
  it("UE-1 only the newest line, an edit by staff that is not an undo and removed no photo", () => {
    expect(mayUndo(entry(), 0)).toBe(true);
    expect(mayUndo(entry(), 1)).toBe(false);
    expect(mayUndo(entry({ by: "seller" }), 0)).toBe(false);
    expect(mayUndo(entry({ by: "system" }), 0)).toBe(false);
    expect(mayUndo(entry({ kind: "state" }), 0)).toBe(false);
    expect(mayUndo(entry({ kind: "create" }), 0)).toBe(false);
    expect(mayUndo(entry({ reason: "undo" }), 0)).toBe(false);
    expect(mayUndo(entry({ reason: null }), 0)).toBe(true);
    expect(mayUndo(entry({ before: { photos_removed: 1 }, after: { photos_removed: 1 } }), 0)).toBe(
      false,
    );
  });

  it("UE-2 the door's refusals in words", () => {
    expect(undoErrorKey("listingChanged")).toBe("admin.listings.undo.changed");
    expect(undoErrorKey("nothingToUndo")).toBe("admin.listings.undo.changed");
    expect(undoErrorKey("listingRemoved")).toBe("admin.listings.edit.error.removed");
    expect(undoErrorKey("permissionDenied")).toBe("admin.listings.move.error.denied");
    expect(undoErrorKey("listingNotFound")).toBe("admin.listings.move.error.notFound");
    expect(undoErrorKey("noteTooLong")).toBe("admin.listings.move.noteTooLong");
    expect(undoErrorKey("badValue:reason")).toBe("admin.listings.move.pickReason");
    expect(undoErrorKey("photoRemovalFinal")).toBe("common.error");
    expect(undoErrorKey("notSignedIn")).toBe("common.error");
  });

  it("UE-3 the rules the before-values break, as groups; an answer's key reads as Specifications", () => {
    expect(
      undoRefusalGroups([
        { field: "price_amount", reason: "required" },
        { field: "title", reason: "contactInText" },
        { field: "size_kg", reason: "required" },
        { field: "category_id", reason: "notLeaf" },
      ]),
    ).toEqual(["title", "category", "specs", "price"]);
    expect(undoRefusalGroups([{ field: "residency", reason: "notHome" }])).toEqual(["other"]);
    expect(undoRefusalGroups([])).toEqual([]);
  });
});
