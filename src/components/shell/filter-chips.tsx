import { ListFilter, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useI18n } from "@/i18n";

import { PressLabel } from "./press-label";
import { ToolbarPanel } from "./toolbar-panel";

/**
 * BUNDLE 9 B5 — the active filters as removable chips, plus "Clear all".
 * Bundle 11 V2 (D132) — the chips are pills in the brand's light tint.
 */
export function FilterChips({
  testid,
  chips,
  onClearAll,
}: {
  testid: string;
  chips: Array<{ key: string; label: string; onRemove: () => void }>;
  onClearAll: () => void;
}) {
  const { t } = useI18n();
  if (chips.length === 0) return null;
  const removeLabel = t("prim.table.removeFilter");
  return (
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip.key}
          data-testid={`${testid}-chip-${chip.key}`}
          className="inline-flex min-w-0 items-center rounded-full border border-success-line bg-sidebar-accent ps-3 text-sm font-medium text-primary"
        >
          <span className="min-w-0 truncate">{chip.label}</span>
          <IconButton
            data-testid={`${testid}-chip-${chip.key}-remove`}
            label={`${removeLabel} — ${chip.label}`}
            tooltip={removeLabel}
            icon={<X />}
            className="rounded-full text-primary hover:bg-transparent hover:text-primary"
            onClick={() => chip.onRemove()}
          />
        </span>
      ))}
      <Button
        type="button"
        variant="link"
        className="h-11 px-1.5 text-muted-foreground underline md:pointer-fine:h-9"
        data-testid={`${testid}-clear`}
        onClick={() => onClearAll()}
      >
        {t("prim.table.clearAll")}
      </Button>
    </div>
  );
}

/**
 * BUNDLE 9 B5 — the filters button and its panel (THE SIZE RULE, text button).
 *
 * Bundle 11 V2 (D132, INC-543) — a 44 px icon tile on a phone (its count a
 * small badge on the tile's corner), icon and word from md. Its panel is the
 * shared ToolbarPanel: a popover from md, a bottom sheet on a phone. The
 * panel's footer clears every filter (`onClearAll`) and closes with the result
 * count when the page gives one (`resultCount`: "Show 12 results"), else
 * "Done". The filters inside are FilterChoices pills — never a dropdown.
 */
export function FiltersButton({
  testid,
  count,
  children,
  onClearAll,
  resultCount,
}: {
  testid: string;
  count: number;
  children: ReactNode;
  onClearAll?: () => void;
  resultCount?: number;
}) {
  const { t } = useI18n();
  const label = t("prim.table.filters");
  return (
    <PressLabel label={label}>
      <ToolbarPanel
        testid={testid}
        title={label}
        trigger={
          <Button
            type="button"
            variant="outline"
            data-testid={testid}
            className="relative h-11 max-md:w-11 max-md:px-0 md:pointer-fine:h-9"
          >
            <ListFilter aria-hidden="true" />
            <span className="max-md:sr-only">{label}</span>
            {count > 0 ? (
              <span
                data-testid={`${testid}-count`}
                className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground max-md:absolute max-md:-end-1.5 max-md:-top-1.5 max-md:ring-2 max-md:ring-card"
              >
                {count}
              </span>
            ) : null}
          </Button>
        }
        footer={(close) => (
          <>
            {onClearAll ? (
              <Button
                type="button"
                variant="link"
                className="h-11 px-1 text-muted-foreground underline md:pointer-fine:h-9"
                data-testid={`${testid}-clear`}
                disabled={count === 0}
                onClick={() => onClearAll()}
              >
                {t("prim.table.clearAll")}
              </Button>
            ) : null}
            <Button
              type="button"
              size="touch"
              className="ms-auto flex-1 md:pointer-fine:h-9 md:pointer-fine:min-h-9 md:flex-none"
              data-testid={`${testid}-done`}
              onClick={close}
            >
              {resultCount === undefined
                ? t("prim.table.done")
                : t("prim.table.showResults").replace("{n}", String(resultCount))}
            </Button>
          </>
        )}
      >
        <div className="flex min-w-0 flex-col gap-5">{children}</div>
      </ToolbarPanel>
    </PressLabel>
  );
}
