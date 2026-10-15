import { describe, expect, it, vi } from "vitest";

import { galleryPhotos } from "@/features/posting/photo-links";
import { heldWithAd, photoReviewOf } from "@/features/posting/posting-service";

import { parsePhotoReview, photoAllowErrorKey, REVIEW_LABEL_KEY } from "./use-photo-reviews";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

/** Bundle 16 turn 4b (D178) — the photos kept hidden for a person: the reads and the door's words. */
describe("photo reviews (D178)", () => {
  it("PRV-1 a review row is read with its ad; an unknown label or a row without its ad is left out", () => {
    const row = {
      photo_id: "p1",
      label: "fail",
      code: "weapon",
      evidence: "a knife",
      created_at: "2026-10-15T10:00:00Z",
      listing: { id: "L1", title: "A knife set", status: "active" },
    };
    expect(parsePhotoReview(row)).toEqual({
      photoId: "p1",
      label: "fail",
      code: "weapon",
      evidence: "a knife",
      createdAt: "2026-10-15T10:00:00Z",
      listing: { id: "L1", title: "A knife set", status: "active" },
    });
    expect(parsePhotoReview({ ...row, code: null, evidence: null, label: "unsure" })).toMatchObject(
      {
        label: "unsure",
        code: null,
        evidence: null,
      },
    );
    expect(parsePhotoReview({ ...row, label: "pass" })).toBeNull();
    expect(parsePhotoReview({ ...row, listing: null })).toBeNull();
    expect(parsePhotoReview({ ...row, listing: [] })).toBeNull();
  });

  it("PRV-2 the door's refusals in words; a not-right photo's reason is the warning's own line", () => {
    expect(photoAllowErrorKey("reviewGone")).toBe("admin.listings.photos.allowGone");
    expect(photoAllowErrorKey("your own listing is changed the seller's way")).toBe(
      "admin.listings.move.error.own",
    );
    expect(photoAllowErrorKey("permission denied")).toBe("common.error");
    expect(REVIEW_LABEL_KEY.not_right).toBe("admin.listings.photos.notRelevant");
  });

  it("PRV-3 a photo row's embedded review: open with a known label, else none; held with the ad only when held or never reviewed", () => {
    expect(
      photoReviewOf({ label: "fail", code: "weapon", evidence: "x", decided_at: null }),
    ).toEqual({ label: "fail", code: "weapon", evidence: "x" });
    expect(
      photoReviewOf([{ label: "unsure", code: null, evidence: null, decided_at: null }]),
    ).toEqual({ label: "unsure", code: null, evidence: null });
    expect(photoReviewOf({ label: "held", decided_at: "2026-10-15T10:00:00Z" })).toBeNull();
    expect(photoReviewOf({ label: "pass", decided_at: null })).toBeNull();
    expect(photoReviewOf(null)).toBeNull();
    expect(photoReviewOf([])).toBeNull();
    const fail = { label: "fail" as const, code: "weapon", evidence: null };
    const held = { label: "held" as const, code: null, evidence: null };
    expect(heldWithAd({ unscreened: true, review: null })).toBe(true);
    expect(heldWithAd({ unscreened: true, review: held })).toBe(true);
    expect(heldWithAd({ unscreened: true, review: fail })).toBe(false);
    expect(heldWithAd({ unscreened: false, review: null })).toBe(false);
  });

  it("PRV-4 the gallery marks a photo the check judged as waiting for review, a held one as not checked", () => {
    const links = {
      p1: { card: "https://x.example/p1.webp" },
      p2: { card: "https://x.example/p2.webp" },
      p3: { card: "https://x.example/p3.webp" },
    };
    const photos = galleryPhotos(
      [
        { id: "p1", unscreened: true, review: { label: "held" } },
        { id: "p2", unscreened: true, review: { label: "not_right" } },
        { id: "p3", unscreened: false, review: null },
      ],
      links as never,
    );
    expect(photos.map((photo) => [photo.id, photo.unscreened, photo.inReview])).toEqual([
      ["p1", true, undefined],
      ["p2", true, true],
      ["p3", undefined, undefined],
    ]);
  });
});
