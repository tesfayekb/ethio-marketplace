import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import { PAGE_SIZE_OPTIONS } from "@/features/admin-locations/locations-toolbar";

/**
 * L2d — THE COUNTRIES FIND GROUP, in the categories shape: one wrapping flex
 * row, the search first, then the selects, NO visible label element above any
 * control — each select carries an `aria-label` and a first option that names
 * its own field. Nothing here fetches: the one roster in hand is sieved in the
 * browser, so a keystroke costs nothing on expensive data (G2). Widths come
 * from the shared toolbar classes — never a per-page hack (C7).
 */
export function CountriesToolbar({
  search,
  onSearch,
  status,
  onStatus,
  pageSize,
  onPageSize,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  pageSize: number;
  onPageSize: (value: number) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-2" data-testid="country-toolbar-find">
      <Input
        data-testid="country-search"
        className="md:w-72"
        aria-label={t("admin.countries.filter.search")}
        placeholder={t("admin.countries.searchPlaceholder")}
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />

      <select
        className={`${SELECT_CLASS} md:w-48`}
        data-testid="country-status-filter"
        aria-label={t("admin.countries.filter.status")}
        value={status}
        onChange={(event) => onStatus(event.target.value)}
      >
        <option value="">{t("admin.countries.filter.allStatusesOption")}</option>
        <option value="open">{t("admin.countries.filter.openOnly")}</option>
        <option value="closed">{t("admin.countries.filter.closedOnly")}</option>
      </select>

      <select
        className={`${SELECT_CLASS} md:w-48`}
        data-testid="country-page-size"
        aria-label={t("admin.countries.filter.pageSize")}
        value={pageSize}
        onChange={(event) => onPageSize(Number(event.target.value))}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountriesToolbar;
