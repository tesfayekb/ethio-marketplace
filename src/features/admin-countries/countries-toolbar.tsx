import { FilterChoices } from "@/components/shell/filter-choices";
import { useI18n } from "@/i18n";

/**
 * Bundle 11 B1 (D118) — THE COUNTRIES FILTERS, drawn inside the shared Filters
 * panel. The search box, Columns and the chips are the shared toolbar's
 * (TableToolbar); the page size is the footer's. Nothing here fetches: the one
 * roster in hand is sieved in the browser (G2).
 *
 * Bundle 11 V2 (INC-543) — each filter is a labelled row of pills, never a
 * dropdown inside the panel.
 */
export function CountryFilters({
  status,
  onStatus,
}: {
  status: string;
  onStatus: (value: string) => void;
}) {
  const { t } = useI18n();

  return (
    <FilterChoices
      testid="country-status-filter"
      label={t("admin.countries.filter.status")}
      value={status}
      onChange={onStatus}
      options={[
        { value: "", label: t("admin.countries.filter.allStatusesOption") },
        { value: "open", label: t("admin.countries.filter.openOnly") },
        { value: "closed", label: t("admin.countries.filter.closedOnly") },
      ]}
    />
  );
}

export default CountryFilters;
