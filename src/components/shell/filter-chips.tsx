import { ListFilter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useI18n } from "@/i18n";

import { FilterPanelBody, preloadFilterPanel } from "./filter-panel-facade";
import {
  clearTableFilters,
  tableFilterChips,
  tableFilterState,
  type TableFilter,
} from "./table-filters";

import { PressLabel } from "./press-label";
import { ToolbarPanel } from "./toolbar-panel";

/**
 * BUNDLE 9 B5 — the active filters as removable chips, plus "Clear all".
 * Bundle 11 V2 (D132) — the chips are pills in the brand's light tint.
 */
export function FilterChips({
  testid,
  filters,
}: {
  testid: string;
  filters: readonly TableFilter[];
}) {
  const { t } = useI18n();
  const chips = tableFilterChips(filters);
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
        onClick={() => clearTableFilters(filters)}
      >
        {t("prim.table.clearAll")}
      </Button>
    </div>
  );
}

/** DEC-419 replaces D132's pills: one declaration, compact rows fetched with the panel. */
export function FiltersButton({
  testid,
  filters,
  resultCount,
}: {
  testid: string;
  filters: readonly TableFilter[];
  resultCount?: number;
}) {
  const { t } = useI18n();
  const label = t("prim.table.filters");
  const count = tableFilterChips(filters).length;
  const state = tableFilterState(filters);
  return (
    <PressLabel label={label}>
      <ToolbarPanel
        testid={testid}
        title={label}
        description={t("prim.table.filtersDescription")}
        state={state}
        trigger={
          <Button
            type="button"
            variant="outline"
            data-testid={testid}
            onPointerEnter={preloadFilterPanel}
            onFocus={preloadFilterPanel}
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
        footer={(close, changed) => (
          <>
            {
              <Button
                type="button"
                variant="link"
                className="h-11 px-1 text-muted-foreground underline md:pointer-fine:h-9"
                data-testid={`${testid}-clear`}
                disabled={count === 0}
                onClick={() => clearTableFilters(filters)}
              >
                {t("prim.table.clearAll")}
              </Button>
            }
            <Button
              type="button"
              size="touch"
              className="ms-auto flex-1 md:pointer-fine:h-9 md:pointer-fine:min-h-9 md:flex-none"
              data-testid={`${testid}-done`}
              disabled={!changed}
              onClick={close}
            >
              {resultCount === undefined
                ? t("prim.table.done")
                : t("prim.table.showResults").replace("{n}", String(resultCount))}
            </Button>
          </>
        )}
      >
        <FilterPanelBody
          filters={filters}
          words={{
            all: t("prim.table.all"),
            search: t("prim.filter.search"),
            none: t("prim.filter.none"),
            max: t("prim.filter.max"),
          }}
        />
      </ToolbarPanel>
    </PressLabel>
  );
}
