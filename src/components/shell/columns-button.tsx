import { Columns3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/i18n";

/**
 * BUNDLE 11 A2 (D128) — THE COLUMNS BUTTON, on every table: a text button that
 * opens a list of the table's columns, each with a tick. A locked column (the
 * row's name) is always shown. Which columns this browser hides is remembered
 * per table (a convenience only: storage that fails or is missing shows every
 * column).
 */
export interface ColumnChoice {
  key: string;
  label: string;
  /** Always shown; its tick is disabled. */
  locked?: boolean;
}

export function ColumnsButton({
  testid,
  columns,
  hidden,
  onToggle,
}: {
  testid: string;
  columns: ColumnChoice[];
  hidden: string[];
  onToggle: (key: string, visible: boolean) => void;
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
          <Columns3 aria-hidden="true" />
          <span>{t("prim.table.columns")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" data-testid={`${testid}-panel`}>
        <ul className="flex flex-col gap-1 p-2">
          {columns.map((column) => {
            const shown = column.locked === true || !hidden.includes(column.key);
            const id = `${testid}-${column.key}`;
            return (
              <li key={column.key} className="flex min-h-11 items-center gap-2 px-1">
                <Checkbox
                  id={id}
                  data-testid={id}
                  checked={shown}
                  disabled={column.locked === true}
                  onCheckedChange={(value) => onToggle(column.key, value === true)}
                />
                <label htmlFor={id} className="text-sm text-foreground">
                  {column.label}
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
