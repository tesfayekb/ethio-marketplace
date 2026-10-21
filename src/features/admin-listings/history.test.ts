import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import am from "@/i18n/locales/am";
import en from "@/i18n/locales/en";

import { changesOf, groupOf, groupsOf, summarize } from "./history";

// RED at <START>: the page's current expression, extracted unchanged.
const pageExpression = (reason: string) =>
  en[`admin.listings.reason.${reason}` as keyof typeof en];
import { detailOf, type AdminListingHistoryEntry } from "./use-admin-listing";

/** The newest declaration of listings_status_check (B3 census, turn 15f). */
const STATUS_CHECK = "supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql";

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

  it("INC-799 an unknown reason reads its code, never undefined", () => {
    expect(pageExpression("a_reason_no_door_has_yet")).toBe("a_reason_no_door_has_yet");
  });

  it("INC-795 every listing status has its staff label in English and Amharic", () => {
    const sql = readFileSync(STATUS_CHECK, "utf8");
    const match = /ADD CONSTRAINT listings_status_check\s+CHECK \(status IN \(([^)]*)\)\)/.exec(
      sql,
    );
    if (!match) throw new Error("no listings_status_check list");
    const statuses = (match[1] ?? "").split(",").map((item) => item.trim().replace(/^'|'$/g, ""));
    expect(statuses).toHaveLength(10);
    const catalogues: Record<string, Record<string, string>> = { en, am };
    for (const status of statuses) {
      for (const [lang, catalogue] of Object.entries(catalogues)) {
        const value = catalogue[`admin.listings.status.${status}`];
        expect(value, `${lang} admin.listings.status.${status}`).toBeTruthy();
        expect((value ?? "").trim().length, `${lang} ${status}`).toBeGreaterThan(0);
      }
    }
  });
});
