import { FilterChoices } from "@/components/shell/filter-choices";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";

import { LISTED_LEVELS, type CountryOption } from "./locations-service";

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
 *   status, each a labelled row of pills (Bundle 11 V2, INC-543 — never a
 *   dropdown inside the panel). They sieve the roster already in hand, so a
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
      <FilterChoices
        testid="location-level-filter"
        label={t("admin.locations.filter.level")}
        value={level}
        onChange={onLevel}
        options={[
          { value: "", label: t("admin.locations.filter.allLevelsOption") },
          // Bundle 11 V2b (the operator's walk) — no Country choice: a market's
          // anchor never lists here (Admin › Countries holds it), so it found
          // nothing.
          ...LISTED_LEVELS.map((name) => ({
            value: name,
            label: t(`admin.locations.level.${name}` as MessageKey),
          })),
        ]}
      />
      <FilterChoices
        testid="location-active-filter"
        label={t("admin.locations.filter.status")}
        value={status}
        onChange={onStatus}
        options={[
          { value: "", label: t("admin.locations.filter.allStatusesOption") },
          { value: "active", label: t("admin.locations.filter.activeOnly") },
          { value: "retired", label: t("admin.locations.filter.retiredOnly") },
        ]}
      />
    </>
  );
}
