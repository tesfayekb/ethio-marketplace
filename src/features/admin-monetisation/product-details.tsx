import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { LevelOverridesTable } from "./level-overrides-table";
import type { OverrideRow, PriceRow, ProductRow } from "./monetisation-service";
import { ProductPricesTable } from "./product-prices-table";

/**
 * P-1c (D313) — SETTINGS ABOUT ONE THING SIT TOGETHER. A product's expanded row
 * holds what belongs to that product and nothing else: a level's per-category
 * perks and its prices, a reach's prices. Each inner table is its own block
 * (its header, its Guide, its frame id), fed from the page's one read.
 */
export function ProductDetails({
  product,
  overrides,
  prices,
  products,
  mayUpdate,
  settling,
  guard,
}: {
  product: ProductRow;
  /** Every override row (the page's one read); the level's own are picked here. */
  overrides: OverrideRow[];
  /** Every price row (the page's one read); the product's own are picked here. */
  prices: PriceRow[];
  products: ProductRow[];
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const shared = { products, mayUpdate, settling, guard };
  return (
    <div id={`product-${product.key}-details`} className="min-w-0 space-y-6 py-2">
      {product.kind === "level" ? (
        <LevelOverridesTable
          level={product}
          rows={overrides.filter((row) => row.levelKey === product.key)}
          {...shared}
        />
      ) : null}
      <ProductPricesTable
        product={product}
        rows={prices.filter((row) => row.packageKey === product.key)}
        {...shared}
      />
    </div>
  );
}

export default ProductDetails;
