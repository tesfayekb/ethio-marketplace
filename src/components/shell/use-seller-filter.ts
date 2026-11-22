import { useI18n } from "@/i18n";
import type { TableTextFilter } from "./table-filters";

/** The same non-kept Seller row for the two staff listing tables. */
export function useSellerFilter(
  id: string,
  value: string,
  onChange: (next: string) => void,
  mayReadEmail: boolean,
): TableTextFilter {
  const { t } = useI18n();
  return {
    kind: "text",
    id,
    chipKey: "seller",
    name: t("admin.listings.filter.seller"),
    kept: false,
    value,
    onChange,
    placeholder: mayReadEmail
      ? t("admin.listings.filter.sellerPlaceholderEmail")
      : t("admin.listings.filter.sellerPlaceholder"),
  };
}
