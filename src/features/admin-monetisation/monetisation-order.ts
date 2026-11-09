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

/** True when `price` pays for `product` in `market` at `nowIso`. */
function priceHolds(price: PriceRow, product: ProductRow, market: MarketRow, nowIso: string) {
  if (price.packageKey !== product.key) return false;
  if (price.countryCode !== null && price.countryCode !== market.countryCode) return false;
  if (price.validFrom > nowIso) return false;
  return price.validTo === null || price.validTo > nowIso;
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
      hash: MONETISATION_ANCHORS.level,
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
