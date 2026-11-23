import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-429, INC-1257 — THE POSTING READS FAIL AS ONE TYPED FAILURE. Every read the posting
 * service makes of the database throws `readFailed(error)`: a `ReaderError` whose class is read
 * from the door mechanism's mark, never a bare message. "Nothing found" is still `null`.
 */
type Failure = { message: string; code?: string; status?: number };
const db = vi.hoisted(() => ({
  /** A table's read answer: its error (when set) in place of its rows. */
  tables: {} as Record<string, { data?: unknown; error?: Failure | null }>,
  /** A door's answer, by function name. */
  doors: {} as Record<string, { data?: unknown; error?: Failure | null }>,
  selects: [] as string[],
}));

vi.mock("@/integrations/supabase/client", () => {
  const builderFor = (table: string) => {
    const answer = () => {
      const held = db.tables[table] ?? {};
      return { data: held.data ?? null, error: held.error ?? null };
    };
    const builder: Record<string, unknown> = {
      select: () => {
        db.selects.push(table);
        return builder;
      },
      eq: () => builder,
      neq: () => builder,
      not: () => builder,
      limit: () => builder,
      order: () => builder,
      maybeSingle: () => Promise.resolve(answer()),
      then: (done: (value: unknown) => unknown) => Promise.resolve(answer()).then(done),
    };
    return builder;
  };
  return {
    supabase: {
      from: builderFor,
      rpc: (name: string) => {
        const held = db.doors[name] ?? {};
        return Promise.resolve({ data: held.data ?? null, error: held.error ?? null });
      },
    },
  };
});
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () =>
    Promise.resolve({ session: { user: { id: "seller-1" } }, failed: false as const }),
}));
vi.mock("@/lib/route-client", () => ({ callRoute: vi.fn(), uploadRoute: vi.fn() }));

import { ReaderError, readerFailure } from "@/lib/reader-failure";
import {
  readCountries,
  readDraft,
  readLastListingContact,
  readLastListingPlaces,
  readPlaceText,
  readSellerLine,
  readSellerPlace,
} from "./posting-service";

const REFUSED: Failure = { message: "permissionDenied", code: "P0D01", status: 403 };
const SESSION: Failure = { message: "notSignedIn", code: "P0D01", status: 401 };
const DOWN: Failure = { message: "Unavailable", status: 503 };

/** The failure a read threw: its type and its class. */
async function failureOf(read: () => Promise<unknown>) {
  const thrown = await read().catch((caught: unknown) => caught);
  expect(thrown).toBeInstanceOf(ReaderError);
  return readerFailure(thrown);
}

beforeEach(() => {
  db.tables = {};
  db.doors = {};
  db.selects = [];
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

describe("the posting reads throw the typed failure (DEC-429)", () => {
  it.each([
    ["the listing", "listings"],
    ["its photos", "listing_photos"],
    ["its places", "listing_locations"],
  ])(
    "PSR-1 readDraft: a failed read of %s is a ReaderError classed by the mark",
    async (_what, table) => {
      db.tables = {
        listings: { data: { id: "d1", draft_step: 1, status: "draft", attributes: {} } },
        listing_photos: { data: [] },
        listing_locations: { data: [] },
      };
      db.doors["my_listing_private"] = { data: { contact_pref: { messages: true } } };
      for (const [error, failureClass] of [
        [REFUSED, "refused"],
        [SESSION, "auth"],
        [DOWN, "server"],
      ] as const) {
        db.tables[table] = { error };
        expect(await failureOf(() => readDraft("d1")), error.message).toMatchObject({
          class: failureClass,
          message: error.message,
        });
      }
    },
  );

  it("PSR-2 readDraft: a failed private read is the typed failure; notYourListing is still a null draft", async () => {
    db.tables = {
      listings: { data: { id: "d1", draft_step: 1, status: "draft", attributes: {} } },
    };
    db.doors["my_listing_private"] = { error: REFUSED };
    expect(await failureOf(() => readDraft("d1"))).toMatchObject({ class: "refused" });
    db.doors["my_listing_private"] = { error: { message: "notYourListing", code: "P0D01" } };
    expect(await readDraft("d1")).toBeNull();
  });

  it("PSR-3 the seller's place, line, last contact, countries and place text throw the typed failure", async () => {
    const reads: Array<[string, () => Promise<unknown>, "door" | "table", string]> = [
      ["my_seller_place", () => readSellerPlace(), "door", "my_seller_place"],
      ["my_seller_line", () => readSellerLine(), "door", "my_seller_line"],
      [
        "my_last_listing_private",
        () => readLastListingContact(null),
        "door",
        "my_last_listing_private",
      ],
      ["countries", () => readCountries(), "table", "countries"],
      ["listings (place text)", () => readPlaceText("d1"), "table", "listings"],
    ];
    for (const [what, read, kind, name] of reads) {
      for (const [error, failureClass] of [
        [REFUSED, "refused"],
        [SESSION, "auth"],
        [DOWN, "server"],
      ] as const) {
        if (kind === "door") db.doors[name] = { error };
        else db.tables[name] = { error };
        expect(await failureOf(read), `${what} ${error.message}`).toMatchObject({
          class: failureClass,
          message: error.message,
        });
      }
    }
  });

  it("PSR-4 INC-1257 readLastListingPlaces: nothing found is null; a failed read of the last post or of its places throws the typed failure", async () => {
    // Nothing found: no earlier post.
    db.tables = { listings: { data: null } };
    expect(await readLastListingPlaces("d1")).toBeNull();
    // A failed read of the last post.
    for (const [error, failureClass] of [
      [REFUSED, "refused"],
      [DOWN, "server"],
    ] as const) {
      db.tables = { listings: { error } };
      expect(await failureOf(() => readLastListingPlaces("d1"))).toMatchObject({
        class: failureClass,
        message: error.message,
      });
    }
    // A failed read of its places.
    db.tables = {
      listings: {
        data: {
          id: "p1",
          location_id: "loc-1",
          created_at: "x",
          pin_precision: null,
          pin_zoom: null,
          street_address: null,
          directions: null,
        },
      },
      listing_locations: { error: DOWN },
    };
    expect(await failureOf(() => readLastListingPlaces("d1"))).toMatchObject({
      class: "server",
      message: "Unavailable",
    });
    // Its places answered: the prefill is read as before.
    db.tables["listing_locations"] = {
      data: [{ location_id: "loc-1", created_at: "x", locations: { country_code: "ET" } }],
    };
    expect(await readLastListingPlaces("d1")).toMatchObject({
      country: "ET",
      itemId: "loc-1",
      placeIds: ["loc-1"],
      pin: null,
    });
  });
});
