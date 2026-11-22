import { describe, expect, expectTypeOf, it, vi } from "vitest";

/** F1-6a — the doors' calls and what the mocked `rpc` answers with. */
const doors = vi.hoisted(() => ({
  calls: [] as Array<[string, unknown]>,
  answer: { data: null, error: null } as {
    data: unknown;
    error: { message: string; code?: string } | null;
  },
}));
/** DEC-422 — what the photos' table read answers with. */
const table = vi.hoisted(() => ({
  answer: { data: [] as unknown[] | null, error: null } as {
    data: unknown[] | null;
    error: { message: string } | null;
  },
}));

vi.mock("@/integrations/supabase/client", () => {
  const builder: Record<string, (...args: unknown[]) => unknown> = {};
  for (const name of ["select", "eq"]) builder[name] = () => builder;
  builder["order"] = () => Promise.resolve(table.answer);
  return {
    supabase: {
      rpc: (name: string, args: unknown) => {
        doors.calls.push([name, args]);
        return Promise.resolve(doors.answer);
      },
      from: () => builder,
    },
  };
});

import {
  decideListing,
  decisionRefusalKey,
  listScreening,
  listScreeningPhotos,
  nameCheckSummaryOf,
  parseScreeningFacts,
  parseScreeningQueue,
  readScreeningFacts,
  readScreeningRow,
  revealContact,
  revealProblemKey,
  revealProblemText,
  screeningQueueArgs,
  type RevealAnswer,
  type RevealProblem,
} from "./use-screening";
import { ReaderError } from "@/lib/reader-failure";

/** DEC-422 — one row of the queue door's answer: exactly its 25 flat keys. */
function doorRow(id: string, over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id,
    title: "Fridge",
    description: "Works",
    category_id: "c-1",
    location_id: "p-1",
    price_mode: "fixed",
    price_amount: 1500,
    price_currency: "ETB",
    price_period: "once",
    price_bp: null,
    price_negotiable: false,
    price_unit: null,
    price_unit_text: null,
    attributes: {},
    photos_soon: false,
    tier: null,
    updated_at: "2026-10-15T00:00:00Z",
    category_name_en: "Fridges",
    category_name_am: null,
    place_name_en: "Bole",
    place_name_am: null,
    country_code: "ET",
    seller_alias: "abebe",
    seller_business_name: null,
    seller_email: null,
    ...over,
  };
}

/** The door answers these rows as its page. */
function answerRows(rows: Array<Record<string, unknown>>, total = rows.length): void {
  doors.calls.length = 0;
  doors.answer = { data: { total, rows }, error: null };
}

/** Bundle 11 A2 (D120) — the preview's facts as the door returns them. */
describe("parseScreeningFacts", () => {
  it("SF-1 reads the country, the channel flags and the public names; refuses a malformed answer", () => {
    expect(
      parseScreeningFacts({
        country: "ET",
        channels: { phone: true, phone2: false, telegram: true, whatsapp: false },
        seller: { alias: "abebe", business_name: "Abebe Trading" },
      }),
    ).toEqual({
      country: "ET",
      channels: { phone: true, phone2: false, telegram: true, whatsapp: false },
      alias: "abebe",
      businessName: "Abebe Trading",
    });
    expect(
      parseScreeningFacts({
        country: null,
        channels: { phone: "yes" },
        seller: { alias: "", business_name: null },
      }),
    ).toEqual({
      country: null,
      channels: { phone: false, phone2: false, telegram: false, whatsapp: false },
      alias: null,
      businessName: null,
    });
    for (const bad of [
      null,
      [],
      "x",
      { channels: {} },
      { seller: {} },
      { channels: [], seller: {} },
    ]) {
      expect(parseScreeningFacts(bad), JSON.stringify(bad)).toBeNull();
    }
  });
});

/** Bundle 11 A3 (INC-537) — the market filter as the read sends it. */
describe("listScreening", () => {
  it("SF-2 a market filter is a list of one on the queue's door; no market sends no country", async () => {
    answerRows([]);
    await listScreening(0, "", 25, { country: ["ET"], tier: null });
    expect(doors.calls).toEqual([
      ["admin_screening_queue", { p_country: ["ET"], p_limit: 25, p_offset: 0 }],
    ]);
    expect(JSON.stringify(doors.calls)).not.toContain("home_country_code");

    answerRows([]);
    await listScreening(0, "", 25, { country: [], tier: null });
    expect(doors.calls).toEqual([["admin_screening_queue", { p_limit: 25, p_offset: 0 }]]);
  });

  /** P-1 W4 — the tier filter the listings table has, on the door's own argument. */
  it("SF-7 a tier filter is the door's p_tier; no tier sends none", async () => {
    answerRows([]);
    await listScreening(0, "", 25, { country: [], tier: "premium" });
    expect(doors.calls[0]?.[1]).toEqual({ p_tier: "premium", p_limit: 25, p_offset: 0 });

    answerRows([]);
    await listScreening(0, "", 25, { country: ["ET"], tier: null });
    expect(doors.calls[0]?.[1]).not.toHaveProperty("p_tier");
  });

  it("SF-11 a page past the end keeps the door's total, and the page is sent as the offset (DEC-422)", async () => {
    answerRows([], 41);
    const past = await listScreening(3, "", 25, { country: [], tier: null });
    expect(past).toEqual({ rows: [], total: 41 });
    expect(doors.calls[0]?.[1]).toEqual({ p_limit: 25, p_offset: 75 });
  });

  it("SF-14 the search and the seller are trimmed and sent only when asked", () => {
    expect(
      screeningQueueArgs(2, "  fridge ", 50, { country: [], tier: null, seller: " abe " }),
    ).toEqual({ p_search: "fridge", p_seller: "abe", p_limit: 50, p_offset: 100 });
    expect(screeningQueueArgs(0, "   ", 25, { country: [], tier: null, seller: "  " })).toEqual({
      p_limit: 25,
      p_offset: 0,
    });
    expect(screeningQueueArgs(0, "", 25, { country: [], tier: null })).toEqual({
      p_limit: 25,
      p_offset: 0,
    });
  });
});

/** Bundle 16 turn E3 (D188) — the preview's edit boxes need the ad's market: the place's country. */
describe("listScreening — the row's market", () => {
  it("SF-10 reads the seller's public name, business name and e-mail from the row; an absent e-mail is null (DEC-422)", async () => {
    answerRows([
      doorRow("l-1", {
        seller_alias: "abebe",
        seller_business_name: "Abebe Trading",
        seller_email: "abebe@example.test",
      }),
      doorRow("l-2", { seller_alias: null, seller_business_name: null, seller_email: null }),
    ]);
    const { rows } = await listScreening(0, "", 25, { country: [], tier: null });
    expect(rows.map((row) => [row.sellerAlias, row.sellerBusinessName, row.sellerEmail])).toEqual([
      ["abebe", "Abebe Trading", "abebe@example.test"],
      [null, null, null],
    ]);
  });

  it("SF-4 reads the row's country_code into countryCode and the total from the door; an ad with no place has none", async () => {
    answerRows(
      [
        doorRow("l-1"),
        doorRow("l-2", {
          location_id: null,
          price_mode: "contact",
          price_amount: null,
          attributes: null,
          place_name_en: null,
          country_code: null,
        }),
      ],
      41,
    );
    const { rows, total } = await listScreening(0, "", 25, { country: [], tier: null });
    expect(total).toBe(41);
    expect(rows.map((row) => row.countryCode)).toEqual(["ET", null]);
    expect(rows.map((row) => row.place)).toEqual([{ name_en: "Bole", name_am: null }, null]);
    expect(rows[1]).toMatchObject({ attributes: {}, priceAmount: null, locationId: null });
  });
});

/** Bundle 11 A3 — a refused reveal is said in words under its own row. */
describe("revealProblemKey", () => {
  it("SF-3 names the hour's limit and a method the seller does not show", () => {
    expect(revealProblemKey("rateLimited")).toBe("admin.screening.revealLimited");
    expect(revealProblemKey("notShown")).toBe("admin.screening.revealNotShown");
  });
});

/** F1-6a — the reviewer's decision goes through the staff door, never `transition_listing` (DEC-402). */
describe("decideListing", () => {
  it("SF-8 calls admin_review_listing with the ad and the status; a refusal is thrown as it came", async () => {
    doors.calls.length = 0;
    doors.answer = { data: { ok: true, status: "active" }, error: null };
    await decideListing("l-1", "active");
    expect(doors.calls).toEqual([
      ["admin_review_listing", { p_listing_id: "l-1", p_new_status: "active" }],
    ]);
    doors.answer = { data: null, error: { message: "ownListing" } };
    await expect(decideListing("l-1", "rejected")).rejects.toMatchObject({ message: "ownListing" });
  });
});

describe("decision refusal words", () => {
  it.each([
    ["SDR-1", "ownListing", "admin.screening.error.ownListing"],
    ["SDR-2", "permissionDenied:scope", "admin.listings.move.error.denied"],
    ["SDR-3", "rateLimited", "admin.listings.move.error.rateLimited"],
    ["SDR-4", "listingNotFound", "admin.listings.move.error.notFound"],
    ["SDR-5", "illegalTransition:screening-active", "admin.listings.move.error.illegal"],
    ["SDR-6", "unrecognised", "common.error"],
  ])("%s reads %s through the listings family", (_id, code, key) => {
    expect(decisionRefusalKey({ message: code })).toBe(key);
  });
});

/** F1-6a — the reveal's dial refusal is a raised code now; the screen's line for it is unchanged. */
describe("revealContact", () => {
  it("SF-9 a raised rateLimited is the returned reason the screen words; any other refusal is thrown", async () => {
    doors.calls.length = 0;
    doors.answer = { data: { ok: true, value: "+251911000000" }, error: null };
    await expect(revealContact("l-1", "phone")).resolves.toEqual({
      ok: true,
      value: "+251911000000",
    });
    expect(doors.calls[0]).toEqual([
      "admin_reveal_listing_contact",
      { p_listing_id: "l-1", p_channel: "phone" },
    ]);
    doors.answer = { data: { ok: false, reason: "notShown" }, error: null };
    await expect(revealContact("l-1", "phone")).resolves.toEqual({
      ok: false,
      reason: "notShown",
    });
    doors.answer = { data: null, error: { message: "rateLimited" } };
    await expect(revealContact("l-1", "phone")).resolves.toEqual({
      ok: false,
      reason: "rateLimited",
    });
    // F1-7a — the gate's rateLimited names its reset instant (`:` and `+` in the detail): the same reason.
    doors.answer = {
      data: null,
      error: { message: "rateLimited:2026-11-19T20:05:12.123456+00:00" },
    };
    await expect(revealContact("l-1", "phone")).resolves.toEqual({
      ok: false,
      reason: "rateLimited",
      until: "2026-11-19T20:05:12.123456+00:00",
    });
    doors.answer = { data: null, error: { message: "permissionDenied" } };
    await expect(revealContact("l-1", "phone")).rejects.toMatchObject({
      message: "permissionDenied",
    });
    doors.answer = { data: null, error: { message: "badValue:channel" } };
    await expect(revealContact("l-1", "phone")).rejects.toMatchObject({
      message: "badValue:channel",
    });
  });
});

/** Bundle 17 turn 2 (D194) — the preview that re-opens after the ad's Edit reads its row fresh. */
describe("readScreeningRow", () => {
  const id = "6d1f1c2e-0000-4000-8000-000000000031";

  it("SF-5 reads one ad of the queue by its id through the door; none is null", async () => {
    answerRows([
      doorRow(id, {
        price_amount: "1500",
        attributes: { colour: "red" },
        updated_at: "2026-10-16T00:00:00Z",
      }),
    ]);
    const row = await readScreeningRow(id);
    expect(doors.calls).toEqual([
      ["admin_screening_queue", { p_search: id, p_limit: 1, p_offset: 0 }],
    ]);
    expect(row).toMatchObject({
      id,
      title: "Fridge",
      priceAmount: 1500,
      countryCode: "ET",
      attributes: { colour: "red" },
      place: { name_en: "Bole", name_am: null },
    });
    answerRows([]);
    expect(await readScreeningRow(id)).toBeNull();
    // A title that happens to match is not the ad asked for.
    answerRows([doorRow("6d1f1c2e-0000-4000-8000-000000000032")]);
    expect(await readScreeningRow(id)).toBeNull();
  });
});

/** N1a (INC-977, INC-885) — the summary door's answer, or a typed failure; never an invented 0. */
describe("nameCheckSummaryOf", () => {
  it("NCU-8 reads the count and the oldest; an answer out of shape is a typed failure, not 0", () => {
    expect(nameCheckSummaryOf({ unchecked: 3, oldest_since: "2026-10-29T06:00:00Z" })).toEqual({
      unchecked: 3,
      oldestSince: "2026-10-29T06:00:00Z",
    });
    expect(nameCheckSummaryOf({ unchecked: 0, oldest_since: null })).toEqual({
      unchecked: 0,
      oldestSince: null,
    });
    for (const bad of [
      null,
      [],
      {},
      { unchecked: "3" },
      { unchecked: -1, oldest_since: null },
      { unchecked: 2, oldest_since: null },
    ]) {
      expect(() => nameCheckSummaryOf(bad)).toThrow(
        "admin_name_check_summary: answer out of shape",
      );
    }
  });
});

/** Turn T1 — the preview's tier look reads the ad's tier from the queue's own row. */
describe("several screening markets", () => {
  it("SF-15 several countries reach the existing door in order, capped at 20", () => {
    const choices = Array.from({ length: 21 }, (_, index) => `choice-${index}`);
    expect(screeningQueueArgs(0, "", 25, { country: choices, tier: null })).toEqual({
      p_country: choices.slice(0, 20),
      p_limit: 25,
      p_offset: 0,
    });
    expect(screeningQueueArgs(0, "", 25, { country: [], tier: null })).not.toHaveProperty(
      "p_country",
    );
  });
});

describe("the screening row's tier", () => {
  it("SF-6 any level key is read as it is (P-2 (c) c2a: levels are rows), no key is null", async () => {
    answerRows(
      [
        doorRow("l-1", { tier: "lvl-a" }),
        doorRow("l-2", { tier: "lvl-fourth" }),
        doorRow("l-3", { tier: "" }),
        doorRow("l-4", { tier: null }),
      ],
      4,
    );
    const { rows } = await listScreening(0, "", 25, { country: [], tier: null });
    expect(rows.map((r) => r.tier)).toEqual(["lvl-a", "lvl-fourth", null, null]);
  });
});

/** DEC-422 — the queue's answer is read by a shape guard, and every failure of a reader is typed. */
describe("the queue's reader failures", () => {
  it("SF-12 an answer out of shape is a malformed ReaderError, never an empty queue", async () => {
    for (const bad of [
      null,
      [],
      "x",
      {},
      { total: 1 },
      { total: "1", rows: [] },
      { total: -1, rows: [] },
      { total: 1.5, rows: [] },
      { total: 1, rows: {} },
      { total: 1, rows: [null] },
      { total: 1, rows: [doorRow("l-1", { title: null })] },
      { total: 1, rows: [doorRow("l-1", { price_amount: "abc" })] },
    ]) {
      expect(parseScreeningQueue(bad), JSON.stringify(bad)).toBeNull();
      doors.calls.length = 0;
      doors.answer = { data: bad, error: null };
      await expect(listScreening(0, "", 25, { country: [], tier: null })).rejects.toMatchObject({
        name: "ReaderError",
        failure: { class: "malformed" },
      });
    }
  });

  it("SF-13 a refusal or a failed read is a ReaderError whose class the one reader decides, on every reader of the file", async () => {
    doors.answer = { data: null, error: { message: "permissionDenied" } };
    const refused = await listScreening(0, "", 25, { country: [], tier: null }).catch(
      (error: unknown) => error,
    );
    expect(refused).toBeInstanceOf(ReaderError);
    expect(refused).toMatchObject({ failure: { class: "refused", message: "permissionDenied" } });
    await expect(readScreeningRow("l-1")).rejects.toBeInstanceOf(ReaderError);
    await expect(readScreeningFacts("l-1")).rejects.toBeInstanceOf(ReaderError);
    doors.answer = { data: { country: null }, error: null };
    await expect(readScreeningFacts("l-1")).rejects.toMatchObject({
      failure: { class: "malformed" },
    });
    table.answer = { data: null, error: { message: "boom" } };
    await expect(listScreeningPhotos("l-1")).rejects.toBeInstanceOf(ReaderError);
    table.answer = { data: [], error: null };
  });
});

describe("L22b RTW-14", () => {
  it("RTW-14 screening reveal: a reset still to come says when; no instant keeps the plain words", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-21T04:00:00Z"));
    try {
      const words = (key: string) => (key.endsWith("When") ? "{when}" : "plain");
      const timed: RevealProblem = {
        key: "admin.screening.revealLimited",
        until: "2026-11-21T05:00:00Z",
      };
      expect(revealProblemText(timed, words, "en")).toBe("in 1 hour");
      expect(revealProblemText({ key: "admin.screening.revealLimited" }, words, "en")).toBe(
        "plain",
      );
      expectTypeOf<Extract<RevealAnswer, { reason: "rateLimited" }>["until"]>().toEqualTypeOf<
        string | undefined
      >();
    } finally {
      vi.useRealTimers();
    }
  });
});
