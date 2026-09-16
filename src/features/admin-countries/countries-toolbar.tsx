import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import { PAGE_SIZE_OPTIONS } from "@/features/admin-locations/locations-toolbar";

/**
 * L2b-C1 — THE COUNTRIES FIND GROUP. Nothing here fetches: the one roster in
 * hand is sieved in the browser, so a keystroke costs nothing on an
 * expensive-data device (G2). Widths come from the shared toolbar classes —
 * never a per-page hack (C7).
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
    <div className="flex min-w-0 flex-col gap-3" data-testid="country-toolbar-find">
      <div className="flex min-w-0 flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.countries.filter.status")}</span>
          <select
            className={`${SELECT_CLASS} md:w-48`}
            data-testid="country-status-filter"
            value={status}
            onChange={(event) => onStatus(event.target.value)}
          >
            <option value="">{t("admin.countries.filter.allStatuses")}</option>
            <option value="open">{t("admin.countries.filter.openOnly")}</option>
            <option value="closed">{t("admin.countries.filter.closedOnly")}</option>
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.countries.filter.pageSize")}</span>
          <select
            className={`${SELECT_CLASS} md:w-32`}
            data-testid="country-page-size"
            value={pageSize}
            onChange={(event) => onPageSize(Number(event.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Input
        data-testid="country-search"
        className="md:w-72"
        placeholder={t("admin.countries.searchPlaceholder")}
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default CountriesToolbar;
