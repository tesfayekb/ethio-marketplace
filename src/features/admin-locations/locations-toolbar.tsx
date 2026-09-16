import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import { LOCATION_LEVELS, type CountryOption } from "./locations-service";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

/**
 * L2d — THE FIND GROUP, IN THE CATEGORIES SHAPE. One wrapping flex row, the
 * search first, then the selects; NO visible label element above any control —
 * each select carries an `aria-label` and a translated first option that names
 * its own field ("Level: all levels"). The group is a DIRECT child of the
 * primitive's toolbar row, so the 360px twin stacks by meaning (C1, C6).
 *
 * Only the country select fetches: search, level and status sieve the one
 * roster already in hand, so a keystroke costs nothing on expensive data (G2).
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
    <div className="flex flex-wrap items-center gap-2" data-testid="location-toolbar-find">
      <Input
        data-testid="location-search"
        className="md:w-72"
        aria-label={t("admin.locations.filter.search")}
        placeholder={t("admin.locations.searchPlaceholder")}
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />

      <select
        className={`${SELECT_CLASS} md:w-64`}
        data-testid="location-country-filter"
        aria-label={t("admin.locations.filter.country")}
        value={country}
        onChange={(event) => onCountry(event.target.value)}
      >
        {/* L2b-C1 — the roster OPENS here: every market at once, one read. */}
        <option value="">{t("admin.locations.filter.allCountriesOption")}</option>
        {markets.map((market) => (
          <option key={market.code} value={market.code}>
            {market.isActive
              ? market.nameEn
              : `${market.nameEn} · ${t("admin.locations.filter.closedSuffix")}`}
          </option>
        ))}
      </select>

      <select
        className={`${SELECT_CLASS} md:w-48`}
        data-testid="location-level-filter"
        aria-label={t("admin.locations.filter.level")}
        value={level}
        onChange={(event) => onLevel(event.target.value)}
      >
        <option value="">{t("admin.locations.filter.allLevelsOption")}</option>
        {LOCATION_LEVELS.map((name) => (
          <option key={name} value={name}>
            {t(`admin.locations.level.${name}` as MessageKey)}
          </option>
        ))}
      </select>

      <select
        className={`${SELECT_CLASS} md:w-48`}
        data-testid="location-active-filter"
        aria-label={t("admin.locations.filter.status")}
        value={status}
        onChange={(event) => onStatus(event.target.value)}
      >
        <option value="">{t("admin.locations.filter.allStatusesOption")}</option>
        <option value="active">{t("admin.locations.filter.activeOnly")}</option>
        <option value="retired">{t("admin.locations.filter.retiredOnly")}</option>
      </select>

      <select
        className={`${SELECT_CLASS} md:w-28`}
        data-testid="location-page-size"
        aria-label={t("admin.locations.filter.pageSize")}
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

export default LocationsToolbar;
