import type { OrderStep } from "@/components/shell/order-strip";
import { fill } from "@/features/posting/refusal-text";
import type { MessageKey } from "@/i18n";

import type { MarketRow, MonetisationConsole, PriceRow, ProductRow } from "./monetisation-service";

/**
 * P-1c (D313) — THE MONETISATION ORDER STRIP'S STATES, from the page's ONE read
 * (`admin_list_monetisation`), never a second one. Three steps in the ruled
 * order — Markets · Products · Prices — each a link to its block:
 *
 *  - Markets is Set; its detail names the markets whose paid levels are on.
 *  - Products is Set once at least one level and one reach are enabled.
 *  - Prices "Needs a row" when a market with paid levels on has an enabled
 *    self-serve product without a price valid NOW for it (validFrom ≤ now,
 *    validTo unset or after now, the market's own code or every market); the
 *    detail names the first such product and market, and the link opens that
 *    product's prices. CF-PRICE-1: this compares dates and names, it never
 *    reads an amount.
 */
export const MONETISATION_ANCHORS = {
  markets: "admin-monetisation-markets",
  level: "admin-monetisation-level",
  reach: "admin-monetisation-reach",
} as const;

/** A product's frame ids inside its expanded row (products-section.tsx). */
export function productAnchor(key: string, part: "perks" | "prices"): string {
  return `product-${key}-${part}`;
}

export type OrderNames = {
  marketName: (code: string | null) => string;
  productName: (key: string) => string;
};

/** The one date rule: a row holds at `nowIso` when it has started and not ended. */
export function priceHoldsNow(price: PriceRow, nowIso: string): boolean {
  if (price.validFrom > nowIso) return false;
  return price.validTo === null || price.validTo > nowIso;
}

/** True when `price` pays for `product` in `market` at `nowIso`. */
function priceHolds(price: PriceRow, product: ProductRow, market: MarketRow, nowIso: string) {
  if (price.packageKey !== product.key) return false;
  if (price.countryCode !== null && price.countryCode !== market.countryCode) return false;
  return priceHoldsNow(price, nowIso);
}

/** A standard row applies to every market and every category. */
export function isStandardPrice(price: PriceRow): boolean {
  return price.countryCode === null && price.categoryId === null;
}

/**
 * L16 (ACT-024) — WHAT A PRODUCT'S ROW SAYS ABOUT ITS PRICE: its standard rows
 * that hold now (one per currency, as stored) and how many exceptions hold now.
 * Rows as they are — nothing is picked or computed (CF-PRICE-1).
 */
export function rowPrice(
  prices: readonly PriceRow[],
  productKey: string,
  nowIso: string,
): { standard: PriceRow[]; exceptions: number } {
  const holding = prices.filter(
    (price) => price.packageKey === productKey && priceHoldsNow(price, nowIso),
  );
  return {
    standard: holding.filter(isStandardPrice),
    exceptions: holding.filter((price) => !isStandardPrice(price)).length,
  };
}

export type PriceGroup = "now" | "scheduled" | "ended";

/** Each group's word, drawn on every price row (ended rows included). */
export const PRICE_GROUP_KEY = {
  now: "admin.monetisation.price.group.now",
  scheduled: "admin.monetisation.price.group.scheduled",
  ended: "admin.monetisation.price.group.ended",
} as const satisfies Record<PriceGroup, string>;

export function priceGroupOf(price: PriceRow, nowIso: string): PriceGroup {
  if (price.validFrom > nowIso) return "scheduled";
  return priceHoldsNow(price, nowIso) ? "now" : "ended";
}

/** The prices in reading order: Now (standard first), then Scheduled, then Ended; stable within. */
export function priceGroups(rows: readonly PriceRow[], nowIso: string): PriceRow[] {
  const rank = (price: PriceRow) => {
    const group = priceGroupOf(price, nowIso);
    if (group === "now") return isStandardPrice(price) ? 0 : 1;
    return group === "scheduled" ? 2 : 3;
  };
  return rows
    .map((price, index) => ({ price, index }))
    .sort((a, b) => rank(a.price) - rank(b.price) || a.index - b.index)
    .map(({ price }) => price);
}

/** The first (product, market) pair a seller could buy but cannot pay for, or null. */
export function firstUnpriced(
  console: MonetisationConsole,
  nowIso: string,
): { product: ProductRow; market: MarketRow } | null {
  const onMarkets = console.markets.filter((market) => market.paidLevels);
  const sellable = console.products.filter((product) => product.enabled && product.selfServe);
  for (const market of onMarkets) {
    for (const product of sellable) {
      const priced = console.prices.some((price) => priceHolds(price, product, market, nowIso));
      if (!priced) return { product, market };
    }
  }
  return null;
}

export function monetisationSteps(
  console: MonetisationConsole,
  nowIso: string,
  names: OrderNames,
  t: (key: MessageKey) => string,
): OrderStep[] {
  const marketsOn = console.markets
    .filter((market) => market.paidLevels)
    .map((market) => names.marketName(market.countryCode));
  const hasLevel = console.products.some((p) => p.kind === "level" && p.enabled);
  const hasReach = console.products.some((p) => p.kind === "reach" && p.enabled);
  const unpriced = firstUnpriced(console, nowIso);
  return [
    {
      id: "markets",
      label: t("admin.monetisation.markets.title"),
      state: "set",
      detail:
        marketsOn.length === 0
          ? undefined
          : fill(t("admin.monetisation.step.marketsOn"), { markets: marketsOn.join(", ") }),
      hash: MONETISATION_ANCHORS.markets,
    },
    {
      id: "products",
      label: t("admin.monetisation.step.products"),
      state: hasLevel && hasReach ? "set" : "needsRow",
      // The exact place: the reach block when only reach is missing.
      hash: hasLevel && !hasReach ? MONETISATION_ANCHORS.reach : MONETISATION_ANCHORS.level,
    },
    unpriced === null
      ? {
          id: "prices",
          label: t("admin.monetisation.prices.title"),
          state: "set",
          hash: MONETISATION_ANCHORS.level,
        }
      : {
          id: "prices",
          label: t("admin.monetisation.prices.title"),
          state: "needsRow",
          detail: fill(t("admin.monetisation.step.pricesMissing"), {
            products: names.productName(unpriced.product.key),
            market: names.marketName(unpriced.market.countryCode),
          }),
          hash: productAnchor(unpriced.product.key, "prices"),
        },
  ];
}
