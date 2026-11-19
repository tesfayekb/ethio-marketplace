import { describe, expect, it } from "vitest";

import type { MessageKey } from "@/i18n";
import { en } from "@/i18n/locales/en";

import {
  MONETISATION_ANCHORS,
  PRICE_GROUP_KEY,
  firstUnpriced,
  monetisationSteps,
  priceGroupOf,
  priceGroups,
  priceHoldsNow,
  productAnchor,
  rowPrice,
} from "./monetisation-order";
import type { MarketRow, MonetisationConsole, PriceRow, ProductRow } from "./monetisation-service";

/** P-1c (D313) — the order strip's states come from the page's one read, by date and name alone. */
const ATTRIBUTION = {
  createdByName: "Abebe",
  updatedByName: "Sara",
  updatedAt: "2026-11-03T09:00:00+00:00",
};
const NOW = "2026-11-03T12:00:00.000Z";

function market(countryCode: string | null, paidLevels: boolean): MarketRow {
  return {
    ...ATTRIBUTION,
    id: `m-${countryCode ?? "default"}`,
    countryCode,
    freeRegularAds: 3,
    includedReach: "city",
    paidLevels,
    launchCredits: paidLevels ? 10 : null,
    launchDays: paidLevels ? 30 : null,
    paidLevelsSince: paidLevels ? "2026-10-01T00:00:00+00:00" : null,
  };
}

function product(
  key: string,
  kind: "level" | "reach",
  flags: { enabled?: boolean; selfServe?: boolean } = {},
): ProductRow {
  return {
    ...ATTRIBUTION,
    key,
    kind,
    nameEn: key.toUpperCase(),
    nameAm: null,
    days: 30,
    maxPhotos: null,
    placement: null,
    badge: false,
    maxCities: null,
    maxRegions: null,
    maxCountries: null,
    enabled: flags.enabled ?? true,
    selfServe: flags.selfServe ?? true,
    extendsLifetime: false,
    sort: 1,
  };
}

function price(
  packageKey: string,
  countryCode: string | null,
  window: { from?: string; to?: string | null } = {},
): PriceRow {
  return {
    ...ATTRIBUTION,
    id: `p-${packageKey}-${countryCode ?? "all"}`,
    packageKey,
    countryCode,
    categoryId: null,
    amount: 100,
    currency: "XXX",
    creditCost: 5,
    validFrom: window.from ?? "2026-10-01T00:00:00+00:00",
    validTo: window.to === undefined ? null : window.to,
    usedCount: 0,
  };
}

const NAMES = {
  marketName: (code: string | null) => (code === null ? "Every market" : `Market ${code}`),
  productName: (key: string) => `Name ${key}`,
};
// The two detail keys read the English texts (their placeholders are the contract); the rest echo.
const t = (key: MessageKey) =>
  key === "admin.monetisation.step.marketsOn" || key === "admin.monetisation.step.pricesMissing"
    ? en[key]
    : key;

function consoleOf(parts: Partial<MonetisationConsole>): MonetisationConsole {
  return { markets: [], products: [], overrides: [], prices: [], ...parts };
}

describe("monetisationSteps (D313)", () => {
  it("MNO-1 every step Set: markets on named in the detail, three steps and no caps step", () => {
    const steps = monetisationSteps(
      consoleOf({
        markets: [market(null, false), market("AA", true), market("BB", true)],
        products: [product("featured", "level"), product("country", "reach")],
        prices: [price("featured", null), price("country", null)],
      }),
      NOW,
      NAMES,
      t,
    );
    expect(steps.map((step) => [step.id, step.state])).toEqual([
      ["markets", "set"],
      ["products", "set"],
      ["prices", "set"],
    ]);
    expect(steps[0]?.detail).toBe("Paid levels on: Market AA, Market BB");
    expect(steps[0]?.hash).toBe(MONETISATION_ANCHORS.markets);
    expect(Object.keys(MONETISATION_ANCHORS).sort()).toEqual(["level", "markets", "reach"]);
  });

  it("MNO-2 Products needs a row until one level AND one reach are enabled", () => {
    const base = { markets: [market(null, false)], prices: [] };
    const only_level = monetisationSteps(
      consoleOf({ ...base, products: [product("featured", "level")] }),
      NOW,
      NAMES,
      t,
    );
    expect(only_level.map((step) => step.id)).toEqual(["markets", "products", "prices"]);
    expect(only_level[1]?.state).toBe("needsRow");
    expect(only_level[0]?.detail).toBeUndefined();
    const reach_off = monetisationSteps(
      consoleOf({
        ...base,
        products: [product("featured", "level"), product("country", "reach", { enabled: false })],
      }),
      NOW,
      NAMES,
      t,
    );
    expect(reach_off[1]?.state).toBe("needsRow");
  });

  it("MNO-3 Prices needs a row for the first sellable product without a price valid now in a market with paid levels on; the link opens that product's prices", () => {
    const steps = monetisationSteps(
      consoleOf({
        markets: [market(null, false), market("AA", true)],
        products: [
          product("featured", "level"),
          product("premium", "level"),
          product("country", "reach"),
        ],
        prices: [
          // Featured: priced for every market — holds for AA.
          price("featured", null),
          // Premium: priced for another market only, plus an ended one and a future one for AA.
          price("premium", "BB"),
          price("premium", "AA", { to: "2026-11-01T00:00:00+00:00" }),
          price("premium", "AA", { from: "2026-12-01T00:00:00+00:00" }),
          price("country", "AA"),
        ],
      }),
      NOW,
      NAMES,
      t,
    );
    const prices = steps[2];
    expect(prices?.state).toBe("needsRow");
    expect(prices?.detail).toBe("No price yet: Name premium in Market AA");
    expect(prices?.hash).toBe(productAnchor("premium", "prices"));
  });

  it("MNO-4 a market with paid levels off, a disabled product or a staff-only product asks for no price", () => {
    const unpriced = firstUnpriced(
      consoleOf({
        markets: [market(null, false), market("AA", false)],
        products: [
          product("featured", "level", { enabled: false }),
          product("premium", "level", { selfServe: false }),
        ],
        prices: [],
      }),
      NOW,
    );
    expect(unpriced).toBeNull();
    const on = firstUnpriced(
      consoleOf({
        markets: [market("AA", true)],
        products: [
          product("featured", "level", { enabled: false }),
          product("premium", "level", { selfServe: false }),
          product("city", "reach"),
        ],
        prices: [],
      }),
      NOW,
    );
    expect(on?.product.key).toBe("city");
    expect(on?.market.countryCode).toBe("AA");
  });
});

/** L16 (ACT-024) — a row's price and the prices' reading order, by the one date rule. */
describe("the price path (L16)", () => {
  const scoped = (
    id: string,
    countryCode: string | null,
    categoryId: string | null,
    from?: string,
    to?: string | null,
  ): PriceRow => ({
    ...price("gold", countryCode, { from, to }),
    id,
    categoryId,
  });

  it("MNO-5 a row holds once started and until its end: a future start, an end at now and an end before now do not hold", () => {
    expect(priceHoldsNow(scoped("a", null, null), NOW)).toBe(true);
    expect(priceHoldsNow(scoped("b", null, null, "2026-12-01T00:00:00+00:00"), NOW)).toBe(false);
    expect(priceHoldsNow(scoped("c", null, null, undefined, NOW), NOW)).toBe(false);
    expect(
      priceHoldsNow(scoped("d", null, null, undefined, "2026-11-01T00:00:00+00:00"), NOW),
    ).toBe(false);
    expect(
      priceHoldsNow(scoped("e", null, null, undefined, "2026-11-04T00:00:00+00:00"), NOW),
    ).toBe(true);
  });

  it("MNO-6 a row's price: the standard rows that hold now, and the count of exceptions that hold now; ended, scheduled and other products' rows count none", () => {
    const rows = [
      scoped("std", null, null),
      scoped("std-usd", null, null),
      scoped("et", "ET", null),
      scoped("cat", null, "c1"),
      scoped("ended", "ER", null, undefined, "2026-11-01T00:00:00+00:00"),
      scoped("later", "KE", null, "2026-12-01T00:00:00+00:00"),
      { ...scoped("other", null, null), packageKey: "silver" },
    ];
    const answer = rowPrice(rows, "gold", NOW);
    expect(answer.standard.map((row) => row.id)).toEqual(["std", "std-usd"]);
    expect(answer.exceptions).toBe(2);
    expect(rowPrice([scoped("ended", null, null, undefined, NOW)], "gold", NOW)).toEqual({
      standard: [],
      exceptions: 0,
    });
  });

  it("MNO-7 the prices read Now (the standard first), then Scheduled, then Ended, keeping their order within", () => {
    const rows = [
      scoped("ended", null, null, undefined, "2026-11-01T00:00:00+00:00"),
      scoped("exc-1", "ET", null),
      scoped("later", null, null, "2026-12-01T00:00:00+00:00"),
      scoped("std", null, null),
      scoped("exc-2", null, "c1"),
    ];
    expect(priceGroups(rows, NOW).map((row) => row.id)).toEqual([
      "std",
      "exc-1",
      "exc-2",
      "later",
      "ended",
    ]);
    const ended = rows[0];
    expect(priceGroupOf(ended, NOW)).toBe("ended");
    expect(PRICE_GROUP_KEY[priceGroupOf(ended, NOW)]).toBe("admin.monetisation.price.group.ended");
    expect(en["admin.monetisation.price.group.ended"]).toBe("Ended");
  });

  it("MNO-8 the Products step leads to the reach block when only reach is missing, to the levels block otherwise", () => {
    const base: MonetisationConsole = {
      markets: [market(null, false)],
      products: [],
      overrides: [],
      prices: [],
    };
    const t = (key: MessageKey) => en[key];
    const hashOf = (products: ProductRow[]) =>
      monetisationSteps({ ...base, products }, NOW, NAMES, t).find((step) => step.id === "products")
        ?.hash;
    expect(hashOf([product("gold", "level")])).toBe(MONETISATION_ANCHORS.reach);
    expect(hashOf([product("city", "reach")])).toBe(MONETISATION_ANCHORS.level);
    expect(hashOf([])).toBe(MONETISATION_ANCHORS.level);
  });
});
