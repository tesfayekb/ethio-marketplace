import { useOpenMarkets } from "@/components/shell/location-data";
import { useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { catalogText, entityName } from "@/i18n/entity";

import type { ProductRow } from "./monetisation-service";

/**
 * P-1b — the names the console's cells and pickers show: a market by its
 * country's name (the open-markets store), a category by its tree node
 * (`entityName`, so a translated row wins), a product by its own two names
 * (`catalogText`: the Amharic where the catalogue is Amharic and the row has
 * one, else the English). Every "every …" word is the caller's key. A market, a
 * product or a category the read does not hold is named "not known", never by
 * its code, its key or its id (INC-1087).
 */
export function useMonetisationNames(products: ProductRow[]) {
  const { t, language, entities } = useI18n();
  const markets = useOpenMarkets();
  const { tree } = useCategoryTree();

  const marketName = (code: string | null, every: "everyMarket" | "countryAny") => {
    if (code === null) {
      return t(
        every === "everyMarket"
          ? "admin.packages.prices.everyMarket"
          : "admin.monetisation.countryAny",
      );
    }
    const market = markets.markets.find((m) => m.code === code);
    if (!market) return t("admin.monetisation.market.unknown");
    return market.anchorId === null
      ? market.nameEn
      : entityName(
          "location",
          { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
          entities,
        );
  };

  const categoryName = (id: string | null, _every: "everyCategory") => {
    if (id === null) return t("admin.packages.prices.everyCategory");
    const node = tree.byId.get(id);
    return node
      ? entityName("category", { id: node.id, nameEn: node.nameEn, nameAm: node.nameAm }, entities)
      : t("admin.monetisation.category.unknown");
  };

  /** A row's scope in its two parts, each with the prices table's "every …" word (L20). */
  const scopeParts = (
    countryCode: string | null,
    categoryId: string | null,
  ): { market: string; category: string } => ({
    market: marketName(countryCode, "everyMarket"),
    category: categoryName(categoryId, "everyCategory"),
  });

  /** The scope as one line: market · category. */
  const scopeOf = (row: { countryCode: string | null; categoryId: string | null }) => {
    const parts = scopeParts(row.countryCode, row.categoryId);
    return `${parts.market} · ${parts.category}`;
  };

  const productName = (key: string) => {
    const product = products.find((row) => row.key === key);
    return product
      ? catalogText(product.nameEn, product.nameAm, language)
      : t("admin.monetisation.product.unknown");
  };

  return {
    marketName,
    categoryName,
    scopeParts,
    scopeOf,
    productName,
    markets: markets.markets,
    tree,
  };
}
