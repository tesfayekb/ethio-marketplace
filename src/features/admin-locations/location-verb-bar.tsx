import { ArrowDownUp, MoveRight, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useI18n, type MessageKey } from "@/i18n";

import { childLevelOf, type LocationNode } from "./locations-service";

/**
 * L2a-R — THE EDITOR'S VERB BAR (the categories `category-verb-bar`, CT-8).
 *
 * Full-text buttons, ≥44px, wrapping by construction, so a 360px dialog and a
 * 1440px dialog both show EVERY verb with no horizontal scroller. This is where
 * the six verbs moved to: rendered in a table cell they clipped the roster and
 * pushed the page sideways.
 *
 * A verb that cannot run says why beside the bar in words (`location-verb-error`,
 * F4) — never only as a tooltip, and never as a toast alone. The gates below are
 * convenience: each door re-checks permission and step-up server-side (F3).
 */
export function LocationVerbBar({
  row,
  mayCreate,
  mayUpdate,
  mayRestructure,
  onCreateChild,
  onActive,
  onMove,
  onReorder,
  onDelete,
}: {
  row: LocationNode;
  mayCreate: boolean;
  mayUpdate: boolean;
  mayRestructure: boolean;
  onCreateChild: () => void;
  onActive: () => void;
  onMove: () => void;
  onReorder: () => void;
  onDelete: () => void;
}) {
  const { t } = useI18n();

  const verb = (
    suffix: string,
    labelKey: MessageKey,
    icon: ReactNode,
    onClick: () => void,
    disabled = false,
    danger = false,
  ) => (
    <Button
      key={suffix}
      type="button"
      variant={danger ? "destructive" : "outline"}
      size="touch"
      data-testid={`location-verb-${suffix}`}
      title={t(labelKey)}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <span>{t(labelKey)}</span>
    </Button>
  );

  /** The door refuses `retireInstead:<detail>`; the console names it first. */
  const blocked =
    row.childCount > 0
      ? "admin.locations.error.detail.hasChildren"
      : row.listingCount > 0
        ? "admin.locations.error.detail.hasListings"
        : row.coverageCount > 0
          ? "admin.locations.error.detail.hasCoverage"
          : row.profileDefaultCount > 0
            ? "admin.locations.error.detail.hasProfileDefaults"
            : null;
  const isCountry = row.level === "country";
  const atFloor = childLevelOf(row.level) === null;

  return (
    <div className="flex flex-wrap gap-2" data-testid="location-verb-bar">
      {blocked === null ? null : (
        <p
          role="status"
          data-testid="location-verb-error"
          className="w-full text-sm text-muted-foreground"
        >
          {`${t("admin.locations.action.deleteBlocked")} — ${t(blocked as MessageKey)}`}
        </p>
      )}

      {mayCreate && !atFloor
        ? verb(
            "create-child",
            "admin.locations.action.createChild",
            <Plus aria-hidden="true" className="size-4" />,
            onCreateChild,
          )
        : null}
      {mayUpdate
        ? verb(
            row.isActive ? "retire" : "activate",
            row.isActive ? "admin.locations.action.retire" : "admin.locations.action.activate",
            <RotateCcw aria-hidden="true" className="size-4" />,
            onActive,
          )
        : null}
      {mayRestructure && !isCountry
        ? verb(
            "move",
            "admin.locations.action.move",
            <MoveRight aria-hidden="true" className="size-4" />,
            onMove,
          )
        : null}
      {mayUpdate
        ? verb(
            "reorder",
            "admin.locations.action.reorder",
            <ArrowDownUp aria-hidden="true" className="size-4" />,
            onReorder,
            isCountry,
          )
        : null}
      {mayRestructure
        ? verb(
            "delete",
            "admin.locations.action.delete",
            <Trash2 aria-hidden="true" className="size-4" />,
            onDelete,
            blocked !== null,
            true,
          )
        : null}
    </div>
  );
}

export default LocationVerbBar;
