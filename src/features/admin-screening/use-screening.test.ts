import { describe, expect, it, vi } from "vitest";

/** Bundle 11 A3 — every call the queue read makes on the query builder, in order. */
const calls = vi.hoisted(() => [] as Array<[string, unknown[]]>);
/** Turn E3 — the rows the mocked read answers with (empty unless a test fills it). */
const answer = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[] }));

vi.mock("@/integrations/supabase/client", () => {
  const builder: Record<string, (...args: unknown[]) => unknown> = {};
  for (const name of ["select", "eq", "not", "ilike", "order", "range"]) {
    builder[name] = (...args: unknown[]) => {
      calls.push([name, args]);
      return name === "range"
        ? Promise.resolve({ data: answer.rows, error: null, count: answer.rows.length })
        : builder;
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
  editedScreeningRow,
  listScreening,
  parseScreeningFacts,
  revealProblemKey,
  type ScreeningRow,
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

/** Bundle 16 turn E3 follow-up (INC-649) — the previewed row as the edit left it. */
describe("editedScreeningRow", () => {
  const row: ScreeningRow = {
    id: "l-1",
    title: "Old",
    description: "Old words",
    categoryId: "c-1",
    locationId: "p-1",
    countryCode: "ET",
    priceMode: "fixed",
    priceAmount: 1500,
    priceCurrency: "ETB",
    pricePeriod: "once",
    priceBp: null,
    priceNegotiable: false,
    priceUnit: null,
    priceUnitText: null,
    attributes: { colour: "red" },
    photosSoon: false,
    updatedAt: "2026-10-15T00:00:00Z",
    category: { name_en: "Fridges", name_am: null },
    place: { name_en: "Bole", name_am: null },
  };

  it("SF-5 takes the title, the words, the answers and the price keys the form sends; leaves the rest", () => {
    expect(editedScreeningRow(row, { title: "New" })).toEqual({ ...row, title: "New" });
    expect(
      editedScreeningRow(row, {
        description: "New words",
        attributes: { colour: "blue" },
        price_mode: "contact",
        price_amount: null,
        price_currency: null,
        price_period: null,
        price_bp: null,
        price_negotiable: false,
      }),
    ).toEqual({
      ...row,
      description: "New words",
      attributes: { colour: "blue" },
      priceMode: "contact",
      priceAmount: null,
      priceCurrency: null,
      pricePeriod: null,
    });
    expect(
      editedScreeningRow(row, { price_mode: "commission", price_bp: 250, price_negotiable: true }),
    ).toEqual({
      ...row,
      priceMode: "commission",
      priceBp: 250,
      priceNegotiable: true,
    });
    // A shape the door would have refused never lands: a list is not an answer set.
    expect(editedScreeningRow(row, { attributes: ["x"], title: 5 })).toEqual(row);
  });
});
