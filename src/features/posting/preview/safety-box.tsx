import { useI18n } from "@/i18n";

export function SafetyBox({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <aside
      data-testid="listing-safety"
      className={`isolate space-y-2 rounded-md border border-border border-s-4 border-s-gold bg-card p-4 @2xl:p-5 ${className}`}
    >
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
