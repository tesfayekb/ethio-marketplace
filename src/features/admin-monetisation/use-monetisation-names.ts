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
 * one, else the English). Every "every …" word is the caller's key.
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
    if (!market) return code;
    return market.anchorId === null
      ? market.nameEn
      : entityName(
          "location",
          { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
          entities,
        );
  };

  const categoryName = (id: string | null, every: "everyCategory" | "mainCategoryAny") => {
    if (id === null) {
      return t(
        every === "everyCategory"
          ? "admin.packages.prices.everyCategory"
          : "admin.monetisation.mainCategoryAny",
      );
    }
    const node = tree.byId.get(id);
    return node
      ? entityName("category", { id: node.id, nameEn: node.nameEn, nameAm: node.nameAm }, entities)
      : id;
  };

  const productName = (key: string) => {
    const product = products.find((row) => row.key === key);
    return product ? catalogText(product.nameEn, product.nameAm, language) : key;
  };

  return { marketName, categoryName, productName, markets: markets.markets, tree };
}
