import { NativeSelect } from "@/components/ui/native-select";
import { useI18n } from "@/i18n";

/**
 * Bundle 11 B1 (D118) — THE COUNTRIES FILTERS, drawn inside the shared Filters
 * panel: one labelled select per filter. The search box, Columns and the chips
 * are the shared toolbar's (TableToolbar); the page size is the footer's.
 * Nothing here fetches: the one roster in hand is sieved in the browser (G2).
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
    <label className="flex flex-col gap-1 text-sm">
      <span>{t("admin.countries.filter.status")}</span>
      <NativeSelect
        data-testid="country-status-filter"
        aria-label={t("admin.countries.filter.status")}
        value={status}
        onChange={(event) => onStatus(event.target.value)}
      >
        <option value="">{t("admin.countries.filter.allStatusesOption")}</option>
        <option value="open">{t("admin.countries.filter.openOnly")}</option>
        <option value="closed">{t("admin.countries.filter.closedOnly")}</option>
      </NativeSelect>
    </label>
  );
}

export default CountryFilters;
