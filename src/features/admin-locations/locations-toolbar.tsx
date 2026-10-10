import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";

import { LOCATION_LEVELS, type CountryOption } from "./locations-service";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

/**
 * Bundle 11 B1 (D118) — THE PLACES TOOLBAR'S OWN PARTS, placed by the shared
 * TableToolbar:
 *
 * - `MarketPicker` is the table's SCOPE, first on the row: the market decides
 *   what is read (one read per country), what Export and Import carry and the
 *   market note, so it is never hidden inside Filters. It opens on "All
 *   countries" (L2b-C1).
 * - `LocationFilters` are drawn inside the shared Filters panel: level and
 *   status, each a labelled select. They sieve the roster already in hand, so a
 *   change costs no request (G2).
 *
 * The search box, Columns and the chips are TableToolbar's; the page size is
 * the footer's.
 */
export function MarketPicker({
  markets,
  country,
  onCountry,
}: {
  markets: CountryOption[];
  country: string;
  onCountry: (code: string) => void;
}) {
  const { t } = useI18n();
  return (
    <NativeSelect
      className="w-full md:w-64"
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
    </NativeSelect>
  );
}

export function LocationFilters({
  level,
  onLevel,
  status,
  onStatus,
}: {
  level: string;
  onLevel: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
}) {
  const { t } = useI18n();
  return (
    <>
      <label className="flex flex-col gap-1 text-sm">
        <span>{t("admin.locations.filter.level")}</span>
        <NativeSelect
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
        </NativeSelect>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span>{t("admin.locations.filter.status")}</span>
        <NativeSelect
          data-testid="location-active-filter"
          aria-label={t("admin.locations.filter.status")}
          value={status}
          onChange={(event) => onStatus(event.target.value)}
        >
          <option value="">{t("admin.locations.filter.allStatusesOption")}</option>
          <option value="active">{t("admin.locations.filter.activeOnly")}</option>
          <option value="retired">{t("admin.locations.filter.retiredOnly")}</option>
        </NativeSelect>
      </label>
    </>
  );
}
