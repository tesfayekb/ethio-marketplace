import { describe, expect, it } from "vitest";

import { photoWarningsOf } from "@/features/posting/posting-service";

import { parsePhotoChange, photoChangeErrorKey } from "./use-photo-changes";

/** Bundle 13 turn 10 — D154 B3 and B5: the reads' parsing. */
describe("photo warnings and photo changes (D154 B3, B5)", () => {
  it("PCH-1 a change row is read with its kind, its photos, its codes and its ad; an unknown kind is left out", () => {
    expect(
      parsePhotoChange({
        id: "c1",
        kind: "edited",
        photo_id: "p2",
        replaced_photo_id: "p1",
        codes: ["not_relevant", 3],
        created_at: "2026-10-14T09:00:00Z",
        listing: { id: "L1", title: "A used phone", status: "active" },
      }),
    ).toEqual({
      id: "c1",
      kind: "edited",
      photoId: "p2",
      replacedPhotoId: "p1",
      codes: ["not_relevant"],
      createdAt: "2026-10-14T09:00:00Z",
      listing: { id: "L1", title: "A used phone", status: "active" },
    });
    expect(
      parsePhotoChange({ id: "c2", kind: "removed", photo_id: "p3", codes: null, listing: null }),
    ).toMatchObject({ kind: "removed", replacedPhotoId: null, codes: [], listing: null });
    expect(parsePhotoChange({ id: "c3", kind: "moved", photo_id: "p4" })).toBeNull();
  });

  it("PCH-2 the door's refusal reads as already reviewed; anything else as the common error", () => {
    expect(photoChangeErrorKey("changeGone")).toBe("admin.screening.changes.gone");
    expect(photoChangeErrorKey("forbidden")).toBe("common.error");
  });

  it("PWN-1 a photo's embedded warnings are read as an object or a one-item list; anything else is none", () => {
    expect(photoWarningsOf({ codes: ["not_relevant"] })).toEqual(["not_relevant"]);
    expect(photoWarningsOf([{ codes: ["not_relevant", 7] }])).toEqual(["not_relevant"]);
    expect(photoWarningsOf(null)).toEqual([]);
    expect(photoWarningsOf([])).toEqual([]);
    expect(photoWarningsOf({ codes: "not_relevant" })).toEqual([]);
  });
});
