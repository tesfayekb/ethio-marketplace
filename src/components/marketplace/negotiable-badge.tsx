import { useI18n } from "@/i18n";

/**
 * DEC-081 (D62-2) — NEGOTIABLE IS A FLAG, SHOWN AS A BADGE beside the price on
 * every surface that prints one (card, preview, detail, review, impersonation).
 * Its own module, so a surface that prints a price without a card does not
 * download the card's tier drawing (S4, CF-TIER-3).
 */
export function NegotiableBadge() {
  const { t } = useI18n();
  return (
    <span
      data-testid="price-negotiable-badge"
      className="inline-flex shrink-0 items-center rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold leading-4 text-success-ink"
    >
      {t("price.negotiable")}
    </span>
  );
}
