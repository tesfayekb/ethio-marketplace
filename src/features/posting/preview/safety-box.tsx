import { useI18n } from "@/i18n";

export function SafetyBox() {
  const { t } = useI18n();
  return (
    <aside data-testid="listing-safety" className="space-y-2 rounded-md border border-border p-3">
      <h3 className="text-sm font-medium text-foreground">{t("listing.safety.header")}</h3>
      <ol className="list-decimal space-y-1 ps-5 text-sm text-foreground">
        <li data-testid="listing-safety-line">{t("listing.safety.1")}</li>
        <li data-testid="listing-safety-line">{t("listing.safety.2")}</li>
        <li data-testid="listing-safety-line">{t("listing.safety.3")}</li>
        <li data-testid="listing-safety-line">{t("listing.safety.4")}</li>
      </ol>
    </aside>
  );
}
