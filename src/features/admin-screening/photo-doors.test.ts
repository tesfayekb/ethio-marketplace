import { beforeEach, describe, expect, it, vi } from "vitest";

/** INC-1242 — what the mocked `rpc` answers with, and the doors it was asked. */
const doors = vi.hoisted(() => ({
  calls: [] as Array<[string, unknown]>,
  answer: { data: null, error: null } as {
    data: unknown;
    error: { message: string; code?: string } | null;
  },
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: (name: string, args: unknown) => {
      doors.calls.push([name, args]);
      return Promise.resolve(doors.answer);
    },
  },
}));

import { ReaderError } from "@/lib/reader-failure";
import { readStaffPhotos } from "@/features/posting/posting-service";

import { listPhotoChanges, listWarnedListings } from "./use-photo-changes";
import { listPhotoReviews } from "./use-photo-reviews";

const answer = (data: unknown) => {
  doors.answer = { data, error: null };
};
const refusal = (message: string) => {
  // The body a reader's refusal arrives as: the mark P0D01, the code as the message (F1-7c).
  doors.answer = { data: null, error: { message, code: "P0D01" } };
};

beforeEach(() => {
  doors.calls.length = 0;
  doors.answer = { data: [], error: null };
});

describe("the staff's photo readers on their doors (INC-1242)", () => {
  it("PSD-1 the photos of an ad come from admin_listing_photos, each row read as the grid reads it", async () => {
    answer([
      {
        id: "ph-1",
        display_order: 0,
        paths: { card: { partition: "default", key: "k" } },
        storage_path: "p/1",
        unscreened: true,
        warning: { codes: ["not_relevant"] },
        review: { label: "unsure", code: null, evidence: "a phrase", decided_at: null },
      },
      {
        id: "ph-2",
        display_order: 1,
        paths: null,
        storage_path: null,
        unscreened: false,
        warning: null,
        review: null,
      },
    ]);
    const rows = await readStaffPhotos("l-1");
    expect(doors.calls).toEqual([["admin_listing_photos", { p_listing_id: "l-1" }]]);
    expect(rows.map((row) => row.id)).toEqual(["ph-1", "ph-2"]);
    expect(rows[0]).toMatchObject({
      displayOrder: 0,
      unscreened: true,
      warnings: ["not_relevant"],
      review: { label: "unsure", evidence: "a phrase" },
    });
    expect(rows[1]).toMatchObject({ paths: null, warnings: [], review: null });
  });

  it("PSD-2 a refusal is a typed failure of its class and an answer out of shape is malformed, never an empty list", async () => {
    refusal("listingNotFound");
    const refused = await readStaffPhotos("l-1").catch((error: unknown) => error);
    expect(refused).toBeInstanceOf(ReaderError);
    expect(refused).toMatchObject({ failure: { class: "refused", message: "listingNotFound" } });
    for (const bad of [
      null,
      {},
      [null],
      [{ id: 1, display_order: 0, paths: null, storage_path: null, unscreened: false }],
      [{ id: "a", display_order: "0", paths: null, storage_path: null, unscreened: false }],
      [{ id: "a", display_order: 0, paths: [], storage_path: null, unscreened: false }],
      [{ id: "a", display_order: 0, paths: null, storage_path: 4, unscreened: false }],
      [{ id: "a", display_order: 0, paths: null, storage_path: null, unscreened: null }],
    ]) {
      answer(bad);
      await expect(readStaffPhotos("l-1"), JSON.stringify(bad)).rejects.toMatchObject({
        failure: { class: "malformed" },
      });
    }
  });

  it("PSD-3 the open photo changes come from admin_photo_changes; a row of an unknown kind is left out", async () => {
    answer([
      {
        id: "c-1",
        kind: "edited",
        photo_id: "ph-2",
        replaced_photo_id: "ph-1",
        codes: ["not_relevant"],
        created_at: "2026-11-01T00:00:00Z",
        listing: { id: "l-1", title: "Fridge", status: "active" },
      },
      { id: "c-2", kind: "mystery", photo_id: "ph-3", codes: [], created_at: "x", listing: null },
    ]);
    const changes = await listPhotoChanges();
    expect(doors.calls).toEqual([["admin_photo_changes", undefined]]);
    expect(changes).toEqual([
      {
        id: "c-1",
        kind: "edited",
        photoId: "ph-2",
        replacedPhotoId: "ph-1",
        codes: ["not_relevant"],
        createdAt: "2026-11-01T00:00:00Z",
        listing: { id: "l-1", title: "Fridge", status: "active" },
      },
    ]);
  });

  it("PSD-4 the open photo reviews come from admin_photo_reviews; a refusal and a bad answer are typed failures", async () => {
    answer([
      {
        photo_id: "ph-1",
        label: "held",
        code: null,
        evidence: null,
        created_at: "2026-11-01T00:00:00Z",
        listing: { id: "l-1", title: "Fridge", status: "active" },
      },
      { photo_id: "ph-2", label: "nope", created_at: "x", listing: { id: "l-2" } },
    ]);
    const reviews = await listPhotoReviews();
    expect(doors.calls).toEqual([["admin_photo_reviews", undefined]]);
    expect(reviews.map((row) => row.photoId)).toEqual(["ph-1"]);
    refusal("permissionDenied");
    await expect(listPhotoReviews()).rejects.toMatchObject({ failure: { class: "refused" } });
    answer({ rows: [] });
    await expect(listPhotoReviews()).rejects.toMatchObject({ failure: { class: "malformed" } });
    refusal("permissionDenied");
    await expect(listPhotoChanges()).rejects.toMatchObject({ failure: { class: "refused" } });
    answer("nope");
    await expect(listPhotoChanges()).rejects.toMatchObject({ failure: { class: "malformed" } });
  });

  it("PSD-5 the warned ads come from admin_warned_listings; only the not_relevant warning counts; no ids, no call", async () => {
    answer([
      { listing_id: "l-1", codes: ["not_relevant", "other"] },
      { listing_id: "l-2", codes: ["other"] },
    ]);
    expect(await listWarnedListings(["l-1", "l-2", "l-3"])).toEqual(new Set(["l-1"]));
    expect(doors.calls).toEqual([
      ["admin_warned_listings", { p_listing_ids: ["l-1", "l-2", "l-3"] }],
    ]);
    doors.calls.length = 0;
    expect(await listWarnedListings([])).toEqual(new Set());
    expect(doors.calls).toEqual([]);
    refusal("badSize");
    await expect(listWarnedListings(["l-1"])).rejects.toMatchObject({
      failure: { class: "refused", message: "badSize" },
    });
    answer([{ listing_id: 4, codes: [] }]);
    await expect(listWarnedListings(["l-1"])).rejects.toMatchObject({
      failure: { class: "malformed" },
    });
  });
});
