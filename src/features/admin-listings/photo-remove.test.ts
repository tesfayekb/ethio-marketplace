import { describe, expect, it } from "vitest";

import { EDIT_REASONS } from "./edit-listing";
import { PHOTO_REASONS, photoRemoveErrorKey } from "./photo-remove";

/** Bundle 13 turn 8 (D154 B4) — what staff give when they remove one photo. */
describe("removing one photo (D154 B4)", () => {
  it("LP-1 the reasons are the door's own, those that fit a photo", () => {
    // The door's list (admin_edit_listing): EDIT_REASONS plus "photo".
    const door = new Set<string>([...EDIT_REASONS, "photo"]);
    expect(PHOTO_REASONS.every((reason) => door.has(reason))).toBe(true);
    expect([...PHOTO_REASONS]).toEqual(["photo", "misleading", "rules", "other"]);
  });

  it("LP-2 the door's refusals read as codes", () => {
    expect(photoRemoveErrorKey("photoNotFound")).toBe("admin.listings.photos.error.gone");
    expect(photoRemoveErrorKey("listingRemoved")).toBe("admin.listings.edit.error.removed");
    expect(photoRemoveErrorKey("listingNotFound")).toBe("admin.listings.move.error.notFound");
    expect(photoRemoveErrorKey("ownListing")).toBe("admin.listings.move.error.own");
    expect(photoRemoveErrorKey("badValue:reason")).toBe("admin.listings.move.pickReason");
    expect(photoRemoveErrorKey("badValue:remove_photos")).toBe("common.error");
    expect(photoRemoveErrorKey("notSignedIn")).toBe("common.error");
  });
});
