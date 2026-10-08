import { ListFilter, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/i18n";

/** BUNDLE 9 B5 — the active filters as removable chips, plus "Clear all". */
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
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          data-testid={`${testid}-chip-${chip.key}`}
          className="inline-flex items-center rounded-md border border-input bg-card ps-2.5 text-sm"
        >
          <span>{chip.label}</span>
          <IconButton
            data-testid={`${testid}-chip-${chip.key}-remove`}
            label={`${removeLabel} — ${chip.label}`}
            tooltip={removeLabel}
            icon={<X />}
            onClick={() => chip.onRemove()}
          />
        </span>
      ))}
      <Button
        type="button"
        variant="link"
        data-testid={`${testid}-clear`}
        onClick={() => onClearAll()}
      >
        {t("prim.table.clearAll")}
      </Button>
    </div>
  );
}

/** BUNDLE 9 B5 — the filters button and its panel (THE SIZE RULE, text button). */
export function FiltersButton({
  testid,
  count,
  children,
}: {
  testid: string;
  count: number;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-testid={testid}
          className="h-11 md:pointer-fine:h-9"
        >
          <ListFilter aria-hidden="true" />
          <span>{t("prim.table.filters")}</span>
          {count > 0 ? (
            <span
              data-testid={`${testid}-count`}
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground"
            >
              {count}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" data-testid={`${testid}-panel`}>
        <div className="flex flex-col gap-3 p-3">{children}</div>
      </PopoverContent>
    </Popover>
  );
}
