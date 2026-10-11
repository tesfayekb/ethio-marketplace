import { Columns3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n";

import { PressLabel } from "./press-label";
import { ToolbarPanel } from "./toolbar-panel";

/**
 * BUNDLE 11 A2 (D128) — THE COLUMNS BUTTON, on every table: a text button that
 * opens a list of the table's columns, each with a tick. A locked column (the
 * row's name) is always shown. Which columns this browser hides is remembered
 * per table (a convenience only: storage that fails or is missing shows every
 * column).
 *
 * Bundle 11 V2 (D132) — a 44 px icon tile on a phone, icon and word from md.
 * Each column is a row with a switch (the locked one on and greyed). The panel
 * is the shared ToolbarPanel — a popover from md, a bottom sheet on a phone —
 * with "Show all" and "Done" in its footer. The cards follow the same choice.
 *
 * Bundle 11 V2c — "Done" is enabled only while the shown columns differ from
 * those the panel opened with.
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
  const label = t("prim.table.columns");
  const hiddenShown = columns.filter(
    (column) => column.locked !== true && hidden.includes(column.key),
  );
  /** The hidden columns as one string: the panel's choices. */
  const state = hiddenShown
    .map((column) => column.key)
    .sort()
    .join(",");
  return (
    <PressLabel label={label}>
      <ToolbarPanel
        testid={testid}
        title={label}
        state={state}
        align="end"
        trigger={
          <Button
            type="button"
            variant="outline"
            data-testid={testid}
            className="h-11 max-md:w-11 max-md:px-0 md:pointer-fine:h-9"
          >
            <Columns3 aria-hidden="true" />
            <span className="max-md:sr-only">{label}</span>
          </Button>
        }
        footer={(close, changed) => (
          <>
            <Button
              type="button"
              variant="link"
              className="h-11 px-1 text-muted-foreground underline md:pointer-fine:h-9"
              data-testid={`${testid}-all`}
              disabled={hiddenShown.length === 0}
              onClick={() => {
                for (const column of hiddenShown) onToggle(column.key, true);
              }}
            >
              {t("prim.table.showAll")}
            </Button>
            <Button
              type="button"
              size="touch"
              className="ms-auto flex-1 md:pointer-fine:h-9 md:pointer-fine:min-h-9 md:flex-none"
              data-testid={`${testid}-done`}
              disabled={!changed}
              onClick={close}
            >
              {t("prim.table.done")}
            </Button>
          </>
        )}
      >
        <ul className="-my-2 flex flex-col">
          {columns.map((column) => {
            const shown = column.locked === true || !hidden.includes(column.key);
            const id = `${testid}-${column.key}`;
            return (
              <li
                key={column.key}
                className="flex min-h-12 items-center gap-3 border-b border-border/60 last:border-0"
              >
                <label
                  htmlFor={id}
                  className={
                    column.locked === true
                      ? "min-w-0 flex-1 text-[15px] text-muted-foreground"
                      : "min-w-0 flex-1 text-[15px] text-foreground"
                  }
                >
                  {column.label}
                </label>
                <Switch
                  id={id}
                  data-testid={id}
                  checked={shown}
                  disabled={column.locked === true}
                  onCheckedChange={(value) => onToggle(column.key, value)}
                />
              </li>
            );
          })}
        </ul>
      </ToolbarPanel>
    </PressLabel>
  );
}
