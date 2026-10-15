import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import {
  ACTION_KEY,
  actionKey,
  ASKS_FIRST,
  confirmKeys,
  doneKey,
  SELL_KEY,
  SOLD_DONE_KEY,
  actionErrorKey,
  actionsFor,
  DONE_KEY,
  parseHistory,
  parseMyListing,
  sellerLines,
  STATUS_WORD,
  type MyListing,
} from "./my-listing";
import { REASON_WORD, REMOVAL_REASON, SOLD_ON } from "./state-line";

/** Bundle 16 turn 3 — one ad's answer, its history and its actions. */
const row = {
  id: "00000000-0000-4000-8000-000000000001",
  status: "active",
  title: "Corolla 2015",
  categoryId: "00000000-0000-4000-8000-0000000000c1",
  coverPhotoId: null,
  photosSoon: false,
  priceMode: "fixed",
  priceAmount: 1500000,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  priceUnit: null,
  priceUnitText: null,
  priceWas: null,
  reserved: false,
  publishedFirstAt: "2026-10-01T08:00:00+00:00",
  publishedAt: "2026-10-01T08:00:00+00:00",
  renewedAt: null,
  expiresAt: "2026-10-31T08:00:00+00:00",
  daysLeft: 17,
  daysKept: null,
  soldAt: null,
  soldWord: "sold" as const,
  createdAt: "2026-09-30T08:00:00+00:00",
  updatedAt: "2026-10-14T08:00:00+00:00",
  removedReason: null,
};
const answer = {
  listing: row,
  group: "live",
  resumeStatus: null,
  countryCode: "ET",
  renewAllowed: true,
  renewDays: 30,
};

const ad = (listing: Partial<typeof row>, extra: Partial<MyListing> = {}): MyListing => ({
  ...(parseMyListing(answer) as MyListing),
  listing: { ...row, ...listing },
  ...extra,
});

describe("my_listing answer", () => {
  it("ML-U5 a well-formed answer is read field for field; a broken one is refused whole", () => {
    expect(parseMyListing(answer)).toEqual(answer);
    expect(parseMyListing({ ...answer, group: "paused" })).toBeNull();
    expect(parseMyListing({ ...answer, resumeStatus: "screening" })).toBeNull();
    expect(parseMyListing({ ...answer, renewDays: 0 })).toBeNull();
    expect(parseMyListing({ ...answer, renewAllowed: "yes" })).toBeNull();
    expect(parseMyListing({ ...answer, listing: { ...row, reserved: "no" } })).toBeNull();
    expect(parseMyListing(null)).toBeNull();
  });

  it("ML-U6 each status offers its actions, in the page's order; every ad but a removed one can be deleted, last", () => {
    expect(actionsFor(ad({}))).toEqual(["reserve", "sell", "close", "delete"]);
    expect(actionsFor(ad({ status: "reduced", reserved: true }))).toEqual([
      "unreserve",
      "sell",
      "close",
      "delete",
    ]);
    expect(actionsFor(ad({ status: "closed" }, { resumeStatus: "active" }))).toEqual([
      "reopen",
      "sell",
      "delete",
    ]);
    expect(actionsFor(ad({ status: "expired" }))).toEqual(["renew", "delete"]);
    expect(actionsFor(ad({ status: "expired" }, { renewAllowed: false }))).toEqual(["delete"]);
    for (const status of ["draft", "screening", "held", "rejected", "sold"]) {
      expect(actionsFor(ad({ status }))).toEqual(["delete"]);
    }
    expect(actionsFor(ad({ status: "removed" }))).toEqual([]);
    expect([...ASKS_FIRST].sort()).toEqual(["delete", "sell"]);
  });

  it("ML-U7 a door's refusal is said in words, and every word exists", () => {
    expect(actionErrorKey("rateLimited")).toBe("myListings.error.rateLimited");
    expect(actionErrorKey("account is deactivated")).toBe("myListings.error.deactivated");
    expect(actionErrorKey("renewOff")).toBe("myListings.renewOff");
    expect(actionErrorKey("not your listing")).toBe("myListings.error.notYours");
    expect(actionErrorKey("illegal transition: sold -> closed")).toBe("myListings.error.changed");
    expect(actionErrorKey("only a live listing is reserved")).toBe("myListings.error.changed");
    expect(actionErrorKey("renewNeedsExpired")).toBe("myListings.error.changed");
    expect(actionErrorKey("something else")).toBe("myListings.error.failed");
    expect(
      actionErrorKey("a listing rejected for a severe reason is removed by enforcement only"),
    ).toBe("myListings.error.severe");
    const keys = [
      ...Object.values(ACTION_KEY),
      ...Object.values(DONE_KEY),
      ...Object.values(SELL_KEY),
      ...Object.values(SOLD_DONE_KEY),
      ...Object.values(SOLD_ON),
      ...(["sold", "rented", "filled"] as const).flatMap((word) =>
        Object.values(confirmKeys("sell", word)),
      ),
      ...Object.values(confirmKeys("delete", "sold")),
      "myListings.error.severe" as const,
      ...Object.values(STATUS_WORD),
      ...Object.values(REASON_WORD),
    ];
    for (const key of keys) expect(en[key], key).toBeTruthy();
    for (const [reason, key] of Object.entries(REMOVAL_REASON))
      expect(REASON_WORD[reason]).toBe(key);
  });

  it("ML-U8 the history is read line for line; a broken line refuses it whole", () => {
    const line = {
      at: "2026-10-14T08:00:00+00:00",
      kind: "state",
      by: "you",
      from: null,
      to: null,
      reserved: true,
      fields: ["reserved"],
      reason: null,
      note: null,
    };
    expect(parseHistory([line])).toEqual([line]);
    expect(parseHistory([])).toEqual([]);
    expect(parseHistory([{ ...line, by: "Abebe" }])).toBeNull();
    expect(parseHistory([{ ...line, reserved: "true" }])).toBeNull();
    expect(parseHistory([{ ...line, fields: [1] }])).toBeNull();
    expect(parseHistory({})).toBeNull();
  });

  it("ML-U9 a change of reach (active and reduced) or of review queue (screening and held) is not the seller's line", () => {
    const base = {
      at: "2026-10-14T08:00:00+00:00",
      kind: "state",
      by: "staff" as const,
      reserved: null,
      fields: [] as string[],
      reason: null,
      note: null,
    };
    const reach = { ...base, from: "active", to: "reduced" };
    const queue = { ...base, from: "screening", to: "held" };
    const closed = { ...base, by: "you" as const, from: "active", to: "closed" };
    const approved = { ...base, from: "held", to: "active" };
    expect(sellerLines([reach, queue, closed, approved])).toEqual([closed, approved]);
  });

  it("ML-U10 a sold ad's word follows its category: Mark as sold, rented or filled, its confirm and its done line", () => {
    expect(actionKey("sell", "sold")).toBe("myListings.action.sell");
    expect(actionKey("sell", "rented")).toBe("myListings.action.rent");
    expect(actionKey("sell", "filled")).toBe("myListings.action.fill");
    expect(actionKey("close", "rented")).toBe("myListings.action.close");
    expect(doneKey("sell", "filled")).toBe("myListings.done.fill");
    expect(doneKey("reserve", "filled")).toBe("myListings.done.reserve");
    expect(confirmKeys("sell", "rented")).toEqual({
      title: "myListings.confirm.rentTitle",
      body: "myListings.confirm.rentBody",
      yes: "myListings.action.rent",
    });
    expect(confirmKeys("delete", "filled")).toEqual({
      title: "myListings.confirm.deleteTitle",
      body: "myListings.confirm.deleteBody",
      yes: "myListings.action.delete",
    });
    expect(
      parseMyListing({ ...answer, listing: { ...row, soldWord: "filled" } })?.listing.soldWord,
    ).toBe("filled");
    expect(parseMyListing({ ...answer, listing: { ...row, soldWord: "gone" } })).toBeNull();
  });
});
