import { describe, expect, it } from "vitest";

import type { MessageKey } from "@/i18n";
import { en } from "@/i18n/locales/en";

import {
  MONETISATION_ANCHORS,
  firstUnpriced,
  monetisationSteps,
  productAnchor,
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
