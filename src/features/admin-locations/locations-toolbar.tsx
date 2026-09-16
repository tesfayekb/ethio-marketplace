import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import { LOCATION_LEVELS, type CountryOption } from "./locations-service";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

/**
 * L2a-R — THE FIND TOOLBAR. Only the country select fetches: the search, level
 * and status controls sieve the one roster already in hand, so a keystroke costs
 * nothing on an expensive-data device (G2). Widths come from the categories
 * toolbar's own classes — never a per-page hack (C7); `md:w-48` is what keeps
 * the status options from truncating at 1280.
 */
export function LocationsToolbar({
  markets,
  country,
  onCountry,
  search,
  onSearch,
  level,
  onLevel,
  status,
  onStatus,
  pageSize,
  onPageSize,
}: {
  markets: CountryOption[];
  country: string;
  onCountry: (code: string) => void;
  search: string;
  onSearch: (value: string) => void;
  level: string;
  onLevel: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  pageSize: number;
  onPageSize: (value: number) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex min-w-0 flex-col gap-3" data-testid="location-toolbar-find">
      <div className="flex min-w-0 flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.country")}</span>
          <select
            className={`${SELECT_CLASS} md:w-56`}
            data-testid="location-country-filter"
            value={country}
            onChange={(event) => onCountry(event.target.value)}
          >
            {/* L2b-C1 — the roster OPENS here: every market at once, one read. */}
            <option value="">{t("admin.locations.filter.all")}</option>
            {markets.map((market) => (
              <option key={market.code} value={market.code}>
                {market.isActive
                  ? market.nameEn
                  : `${market.nameEn} · ${t("admin.locations.filter.closedSuffix")}`}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.level")}</span>
          <select
            className={`${SELECT_CLASS} md:w-48`}
            data-testid="location-level-filter"
            value={level}
            onChange={(event) => onLevel(event.target.value)}
          >
            <option value="">{t("admin.locations.filter.allLevels")}</option>
            {LOCATION_LEVELS.map((name) => (
              <option key={name} value={name}>
                {t(`admin.locations.level.${name}` as MessageKey)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.status")}</span>
          <select
            className={`${SELECT_CLASS} md:w-48`}
            data-testid="location-active-filter"
            value={status}
            onChange={(event) => onStatus(event.target.value)}
          >
            <option value="">{t("admin.locations.filter.allStatuses")}</option>
            <option value="active">{t("admin.locations.filter.activeOnly")}</option>
            <option value="retired">{t("admin.locations.filter.retiredOnly")}</option>
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.pageSize")}</span>
          <select
            className={`${SELECT_CLASS} md:w-32`}
            data-testid="location-page-size"
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
        data-testid="location-search"
        className="md:w-72"
        placeholder={t("admin.locations.searchPlaceholder")}
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default LocationsToolbar;
