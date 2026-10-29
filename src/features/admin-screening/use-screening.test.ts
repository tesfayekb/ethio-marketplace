import { describe, expect, it, vi } from "vitest";

/** Bundle 11 A3 — every call the queue read makes on the query builder, in order. */
const calls = vi.hoisted(() => [] as Array<[string, unknown[]]>);
/** Turn E3 — the rows the mocked read answers with (empty unless a test fills it). */
const answer = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[] }));

vi.mock("@/integrations/supabase/client", () => {
  const builder: Record<string, (...args: unknown[]) => unknown> = {};
  for (const name of ["select", "eq", "not", "ilike", "order", "range", "maybeSingle"]) {
    builder[name] = (...args: unknown[]) => {
      calls.push([name, args]);
      if (name === "range")
        return Promise.resolve({ data: answer.rows, error: null, count: answer.rows.length });
      if (name === "maybeSingle")
        return Promise.resolve({ data: answer.rows[0] ?? null, error: null });
      return builder;
    };
  }
  return {
    supabase: {
      from: (table: string) => {
        calls.push(["from", [table]]);
        return builder;
      },
    },
  };
});

import {
  listScreening,
  nameCheckSummaryOf,
  parseScreeningFacts,
  readScreeningRow,
  revealProblemKey,
} from "./use-screening";

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
  it("SF-2 a market filter reads the ad's place, never home_country_code; no market sends no place filter", async () => {
    calls.length = 0;
    await listScreening(0, "", 25, { country: "ET" });
    expect(calls).toContainEqual(["eq", ["place.country_code", "ET"]]);
    expect(calls).toContainEqual(["not", ["place", "is", null]]);
    expect(JSON.stringify(calls)).not.toContain("home_country_code");

    calls.length = 0;
    await listScreening(0, "", 25, { country: null });
    expect(calls.filter(([name]) => name === "not")).toEqual([]);
    expect(calls.filter(([name, args]) => name === "eq" && args[0] !== "status")).toEqual([]);
  });
});

/** Bundle 16 turn E3 (D188) — the preview's edit boxes need the ad's market: the place's country. */
describe("listScreening — the row's market", () => {
  it("SF-4 reads the place's country_code into countryCode; an ad with no place has none", async () => {
    calls.length = 0;
    answer.rows = [
      {
        id: "l-1",
        title: "Fridge",
        description: "Works",
        category_id: "c-1",
        location_id: "p-1",
        price_mode: "fixed",
        price_amount: "1500",
        price_currency: "ETB",
        price_period: "once",
        price_bp: null,
        price_negotiable: false,
        price_unit: null,
        price_unit_text: null,
        attributes: {},
        photos_soon: false,
        updated_at: "2026-10-15T00:00:00Z",
        category: { name_en: "Fridges", name_am: null },
        place: { name_en: "Bole", name_am: null, country_code: "ET" },
      },
      {
        id: "l-2",
        title: "Draft",
        description: "",
        category_id: "c-1",
        location_id: null,
        price_mode: "contact",
        price_amount: null,
        price_currency: null,
        price_period: null,
        price_bp: null,
        price_negotiable: false,
        price_unit: null,
        price_unit_text: null,
        attributes: null,
        photos_soon: false,
        updated_at: "2026-10-15T00:00:00Z",
        category: { name_en: "Fridges", name_am: null },
        place: null,
      },
    ];
    try {
      const { rows } = await listScreening(0, "", 25, { country: null });
      expect(rows.map((row) => row.countryCode)).toEqual(["ET", null]);
      const select = calls.find(([name]) => name === "select");
      expect(String(select?.[1][0])).toContain("place:locations(name_en,name_am,country_code)");
    } finally {
      answer.rows = [];
    }
  });
});

/** Bundle 11 A3 — a refused reveal is said in words under its own row. */
describe("revealProblemKey", () => {
  it("SF-3 names the hour's limit and a method the seller does not show", () => {
    expect(revealProblemKey("rateLimited")).toBe("admin.screening.revealLimited");
    expect(revealProblemKey("notShown")).toBe("admin.screening.revealNotShown");
  });
});

/** Bundle 17 turn 2 (D194) — the preview that re-opens after the ad's Edit reads its row fresh. */
describe("readScreeningRow", () => {
  it("SF-5 reads one ad of the queue by its id, in screening only; none is null", async () => {
    calls.length = 0;
    answer.rows = [
      {
        id: "l-1",
        title: "Fridge",
        description: "Cold",
        category_id: "c-1",
        location_id: "p-1",
        price_mode: "fixed",
        price_amount: "1500",
        price_currency: "ETB",
        price_period: "once",
        price_bp: null,
        price_negotiable: false,
        price_unit: null,
        price_unit_text: null,
        attributes: { colour: "red" },
        photos_soon: false,
        updated_at: "2026-10-16T00:00:00Z",
        category: { name_en: "Fridges", name_am: null },
        place: { name_en: "Bole", name_am: null, country_code: "ET" },
      },
    ];
    try {
      const row = await readScreeningRow("l-1");
      expect(calls).toContainEqual(["eq", ["status", "screening"]]);
      expect(calls).toContainEqual(["eq", ["id", "l-1"]]);
      expect(calls.map(([name]) => name)).toContain("maybeSingle");
      expect(row).toMatchObject({
        id: "l-1",
        title: "Fridge",
        priceAmount: 1500,
        countryCode: "ET",
        attributes: { colour: "red" },
        place: { name_en: "Bole", name_am: null, country_code: "ET" },
      });
      answer.rows = [];
      expect(await readScreeningRow("l-2")).toBeNull();
    } finally {
      answer.rows = [];
    }
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
