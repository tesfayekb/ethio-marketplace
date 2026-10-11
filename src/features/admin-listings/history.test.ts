import { describe, expect, it } from "vitest";

import { changesOf, groupOf, groupsOf, summarize } from "./history";
import { detailOf, type AdminListingHistoryEntry } from "./use-admin-listing";

/**
 * Bundle 11, turn L3 (D138, D139) — a listing's history as a person reads it:
 * the door's columns become the groups people speak of, and each revision one
 * line (created, a status change, a renewal, an edit of named groups).
 */
const entry = (over: Partial<AdminListingHistoryEntry>): AdminListingHistoryEntry => ({
  at: "2026-10-11T10:00:00Z",
  kind: "edit",
  by: "seller",
  byName: null,
  fields: [],
  before: {},
  after: {},
  reason: null,
  note: null,
  ...over,
});

describe("listing history (turn L3)", () => {
  it("LH-1 columns fall into the groups people read; a pin, an address and contact settings are named, never shown", () => {
    expect(groupOf("price_amount")).toBe("price");
    expect(groupOf("price_negotiable")).toBe("price");
    expect(groupOf("category_id")).toBe("category");
    expect(groupOf("attributes")).toBe("specs");
    expect(groupOf("photos_removed")).toBe("photos");
    expect(groupOf("cover_photo_id")).toBe("photos");
    expect(groupOf("pin_lat")).toBe("pin");
    expect(groupOf("street_address")).toBe("pin");
    expect(groupOf("contact_pref")).toBe("contact");
    expect(groupOf("poster_expires_at")).toBe("sellerEnd");
    expect(groupOf("something_new")).toBe("other");
    expect(
      groupsOf(["street_address", "price_amount", "title", "pin_lat", "price_currency", "zzz"]),
    ).toEqual(["title", "price", "pin", "other"]);
  });

  it("LH-2 a revision reads as created, a status change, a renewal or an edit", () => {
    expect(summarize(entry({ kind: "create" }))).toEqual({ type: "created" });
    expect(
      summarize(
        entry({ kind: "state", before: { status: "active" }, after: { status: "removed" } }),
      ),
    ).toEqual({ type: "status", from: "active", to: "removed" });
    expect(
      summarize(
        entry({
          kind: "state",
          before: { renewed_count: 0 },
          after: { renewed_count: 1, expires_at: "2026-11-11" },
        }),
      ),
    ).toEqual({ type: "renewed" });
    expect(
      summarize(entry({ fields: ["title", "price_amount", "pin_lat"], after: { title: "x" } })),
    ).toEqual({ type: "edited", groups: ["title", "price", "pin"] });
  });

  it("LH-3 the values shown are the ones the door kept, in reading order", () => {
    const rows = changesOf(
      entry({
        before: { price_amount: 100, title: "Old", photos_removed: 1 },
        after: { price_amount: 120, title: "New", photos_removed: 1 },
      }),
    );
    expect(rows.map((row) => row.column)).toEqual(["title", "price_amount", "photos_removed"]);
    expect(rows[0]).toEqual({ column: "title", before: "Old", after: "New" });
  });

  it("LH-4 the door's answer is mapped; an unknown actor is the system, absent values are absent", () => {
    const detail = detailOf({
      listing: { id: "l1", title: "T", status: "active", photo_count: 2, renewed_count: 1 },
      seller: { id: "s1", alias: "selam", email: null },
      channels: { phone: true, whatsapp: "yes" },
      history: [{ at: "2026-10-11T10:00:00Z", kind: "state", by: "robot", fields: ["status"] }],
      history_total: 1,
    });
    expect(detail.listing).toMatchObject({
      id: "l1",
      status: "active",
      photoCount: 2,
      tier: "regular",
    });
    expect(detail.seller).toMatchObject({ id: "s1", alias: "selam", email: null });
    expect(detail.channels).toEqual({
      phone: true,
      phone2: false,
      telegram: false,
      whatsapp: false,
    });
    expect(detail.history[0]).toMatchObject({ by: "system", byName: null, reason: null });
    expect(detail.historyTotal).toBe(1);
  });
});
