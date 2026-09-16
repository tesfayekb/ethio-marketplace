import { ArrowDownUp, DoorClosed, DoorOpen } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useI18n, type MessageKey } from "@/i18n";

import type { CountryRow } from "./countries-service";

/**
 * L2b-C1 — THE COUNTRY EDITOR'S VERB BAR (the categories `category-verb-bar`
 * and the places bar, CT-8). Full-text buttons, ≥44px, wrapping by
 * construction, so a 360px dialog and a 1440px dialog both show every verb with
 * no horizontal scroller.
 *
 * The gates below are convenience: each door re-checks permission and step-up
 * server-side (F3), and each refusal is rendered in words by the dialog it
 * opens (F4).
 */
export function CountryVerbBar({
  row,
  mayUpdate,
  mayActivate,
  onActive,
  onRailOrder,
}: {
  row: CountryRow;
  mayUpdate: boolean;
  /** Opening and closing a market is its own door permission (E7). */
  mayActivate: boolean;
  onActive: () => void;
  onRailOrder: () => void;
}) {
  const { t } = useI18n();

  const verb = (suffix: string, labelKey: MessageKey, icon: ReactNode, onClick: () => void) => (
    <Button
      key={suffix}
      type="button"
      variant="outline"
      size="touch"
      data-testid={`country-verb-${suffix}`}
      title={t(labelKey)}
      onClick={onClick}
    >
      {icon}
      <span>{t(labelKey)}</span>
    </Button>
  );

  return (
    <div className="flex flex-wrap gap-2" data-testid="country-verb-bar">
      <p className="w-full text-sm text-muted-foreground" data-testid="country-verb-anchor">
        {t(
          row.anchorActive
            ? "admin.countries.edit.anchorActive"
            : "admin.countries.edit.anchorInactive",
        )}
      </p>
      {mayActivate
        ? row.isActive
          ? verb(
              "close",
              "admin.countries.action.close",
              <DoorClosed aria-hidden="true" className="size-4" />,
              onActive,
            )
          : verb(
              "open",
              "admin.countries.action.open",
              <DoorOpen aria-hidden="true" className="size-4" />,
              onActive,
            )
        : null}
      {mayUpdate
        ? verb(
            "rail-order",
            "admin.countries.action.railOrder",
            <ArrowDownUp aria-hidden="true" className="size-4" />,
            onRailOrder,
          )
        : null}
    </div>
  );
}

export default CountryVerbBar;
