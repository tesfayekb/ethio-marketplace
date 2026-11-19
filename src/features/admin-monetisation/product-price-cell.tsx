import { Badge } from "@/components/ui/badge";
import { fill } from "@/features/posting/refusal-text";
import { useI18n } from "@/i18n";
import { moneyText } from "@/lib/format";

import { rowPrice } from "./monetisation-order";
import type { PriceRow } from "./monetisation-service";

/**
 * L16 (ACT-024) — A PRODUCT ROW'S PRICE: its standard rows that hold now (as
 * stored, one per currency, joined), the count of exceptions that hold now, or
 * "No price yet" as a warning. Rows as they are (CF-PRICE-1): nothing picked.
 */
export function ProductPriceCell({
  productKey,
  prices,
  nowIso,
}: {
  productKey: string;
  prices: readonly PriceRow[];
  nowIso: string;
}) {
  const { t, language } = useI18n();
  const { standard, exceptions } = rowPrice(prices, productKey, nowIso);
  const testid = `product-${productKey}-price`;
  if (standard.length === 0 && exceptions === 0) {
    return (
      <Badge variant="warning" data-testid={testid}>
        {t("admin.monetisation.price.none")}
      </Badge>
    );
  }
  return (
    <span data-testid={testid} className="flex min-w-0 flex-col gap-0.5 text-sm">
      {standard.length === 0 ? null : (
        <span className="min-w-0 break-words tabular-nums">
          {standard
            .map((row) =>
              row.amount === 0
                ? t("admin.packages.prices.free")
                : moneyText(row.amount, row.currency, language, "exact"),
            )
            .join(" · ")}
        </span>
      )}
      {exceptions === 0 ? null : (
        <span className="text-xs text-muted-foreground" data-testid={`${testid}-exceptions`}>
          {fill(t("admin.monetisation.price.exceptions"), { count: exceptions })}
        </span>
      )}
    </span>
  );
}

export default ProductPriceCell;
