import { priceLine, type PriceLineInput } from "@/features/posting/price-line";
import type { MessageKey } from "@/i18n";

/**
 * D201 §10 — the share sheet's price line, one rule for the buyer's page and
 * the seller's own ad page: no amount, or a contact or free price, means no
 * price in the share text; otherwise the ad's price line.
 */
export function sharePriceText(
  price: PriceLineInput,
  t: (key: MessageKey) => string,
  language: string,
): string | null {
  if (price.amount === null || price.mode === "contact" || price.mode === "free") return null;
  return priceLine(price, t, t("price.contact"), language);
}
