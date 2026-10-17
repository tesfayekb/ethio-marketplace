import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import {
  ACTION_KEY,
  actionKey,
  ASKS_FIRST,
  BULK_ACTIONS,
  BULK_BODY_KEY,
  bulkLabelKey,
  bulkTargets,
  confirmKeys,
  DELETED_KEY,
  primaryAction,
  rowActionsFor,
  soldWordsOf,
  doneKey,
  SELL_KEY,
  SOLD_DONE_KEY,
  actionErrorKey,
  actionsFor,
  DONE_KEY,
  parseHistory,
  parseListingCounts,
  parseMyListing,
  sellerLines,
  STATUS_WORD,
  type MyListing,
} from "./my-listing";
import { REASON_WORD, REMOVAL_REASON, SOLD_ON } from "./state-line";

/** Bundle 16 turn 3 — one ad's answer, its history and its actions. */
const row = {
  id: "00000000-0000-4000-8000-000000000001",
  publicId: null as string | null,
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

  it("ML-U21 a row without publicId parses with null, a row with one keeps it", () => {
    const { publicId: _absent, ...bare } = row;
    expect(parseMyListing({ ...answer, listing: bare })?.listing.publicId).toBeNull();
    expect(
      parseMyListing({ ...answer, listing: { ...row, publicId: "abcdefghjk" } })?.listing.publicId,
    ).toBe("abcdefghjk");
    expect(parseMyListing({ ...answer, listing: { ...row, publicId: 7 } })).toBeNull();
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

describe("the list's actions (bundle 16 turn R1, D181, D182)", () => {
  const STATUSES = [
    "active",
    "reduced",
    "closed",
    "expired",
    "draft",
    "screening",
    "held",
    "rejected",
    "removed",
    "sold",
  ];

  it("ML-U14 a row offers what its ad's page offers, for every status, with renewing on or off", () => {
    for (const status of STATUSES) {
      for (const reserved of [false, true]) {
        for (const renewAllowed of [false, true]) {
          const page = actionsFor(
            ad({ status, reserved }, { resumeStatus: "active", renewAllowed }),
          );
          expect(rowActionsFor({ ...row, status, reserved }, renewAllowed), status).toEqual(page);
        }
      }
    }
    // A closed ad's reopening status is not in the list: Reopen is offered, and the ad is read again first.
    expect(rowActionsFor({ ...row, status: "closed" }, false)).toEqual([
      "reopen",
      "sell",
      "delete",
    ]);
  });

  it("ML-U15 ticked ads: each action for the ads that offer it; Mark as sold by their one word, or all three", () => {
    expect(BULK_ACTIONS).toEqual(["sell", "close", "renew", "delete"]);
    const live = { ...row, id: "a", status: "active" };
    const rented = { ...row, id: "b", status: "active", soldWord: "rented" as const };
    const closed = { ...row, id: "c", status: "closed" };
    const expired = { ...row, id: "d", status: "expired" };
    const removed = { ...row, id: "e", status: "removed" };
    const ticked = [live, rented, closed, expired, removed];
    const ids = (rows: { id: string }[]) => rows.map((entry) => entry.id);
    expect(ids(bulkTargets(ticked, "sell", true))).toEqual(["a", "b", "c"]);
    expect(ids(bulkTargets(ticked, "close", true))).toEqual(["a", "b"]);
    expect(ids(bulkTargets(ticked, "renew", true))).toEqual(["d"]);
    expect(ids(bulkTargets(ticked, "renew", false))).toEqual([]);
    expect(ids(bulkTargets(ticked, "delete", true))).toEqual(["a", "b", "c", "d"]);
    expect(soldWordsOf([rented, live])).toEqual(["sold", "rented"]);
    expect(bulkLabelKey("sell", ["rented"])).toBe("myListings.action.rent");
    expect(bulkLabelKey("sell", ["sold", "rented"])).toBe("myListings.bulk.sellMixed");
    expect(bulkLabelKey("close", ["sold"])).toBe("myListings.action.close");
    expect(bulkLabelKey("delete", [])).toBe("myListings.action.delete");
    const keys = [
      ...Object.values(BULK_BODY_KEY),
      DELETED_KEY,
      "myListings.bulk.sellMixed" as const,
      "myListings.bulk.title" as const,
      "myListings.bulk.done" as const,
      "myListings.bulk.refused" as const,
    ];
    for (const key of keys) expect(en[key], key).toBeTruthy();
  });

  it("ML-U16 the ad page's main next step is filled: Reopen, then Renew, then Mark as sold", () => {
    expect(primaryAction(["reserve", "sell", "close", "delete"])).toBe("sell");
    expect(primaryAction(["reopen", "sell", "delete"])).toBe("reopen");
    expect(primaryAction(["renew", "delete"])).toBe("renew");
    expect(primaryAction(["delete"])).toBeNull();
    expect(primaryAction([])).toBeNull();
  });
});

it("ML-U22 listing_counts parses three non-negative integers; a missing or negative one is refused", () => {
  const counts = { views: 3, shares: 0, contacts: 1 };
  expect(parseListingCounts({ ...counts, shares_by_channel: { telegram: 2 } })).toEqual(counts);
  for (const value of [{ ...counts, views: -1 }, { ...counts, views: "3" }, {}, { ...counts, contacts: 0.5 }, { ...counts, shares: Infinity }, { ...counts, contacts: undefined }]) expect(parseListingCounts(value)).toBeNull();
});
