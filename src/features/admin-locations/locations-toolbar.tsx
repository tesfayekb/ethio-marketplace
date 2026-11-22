import { FilterChoices } from "@/components/shell/filter-choices";
import { useI18n, type MessageKey } from "@/i18n";

import { LISTED_LEVELS } from "./locations-service";

/**
 * Bundle 11 B1 (D118) — THE PLACES TOOLBAR'S OWN PARTS, placed by the shared
 * TableToolbar:
 *
 * - The market picker is the table's SCOPE, first on the row: the market decides
 *   what is read (one read per country), what Export and Import carry and the
 *   market note, so it is never hidden inside Filters. It opens on "All
 *   countries" (L2b-C1). It is drawn in the page's own TableToolbar
 *   (locations-page.tsx), so the form kit's census sees it as a list filter by
 *   kind (DEC-338; bundle 1 part C).
 * - `LocationFilters` are drawn inside the shared Filters panel: level and
 *   status, each a labelled row of pills (Bundle 11 V2, INC-543 — never a
 *   dropdown inside the panel). They sieve the roster already in hand, so a
 *   change costs no request (G2).
 *
 * The search box, Columns and the chips are TableToolbar's; the page size is
 * the footer's.
 */
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
