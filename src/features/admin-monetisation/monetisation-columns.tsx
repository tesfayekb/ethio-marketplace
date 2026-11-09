import type { DataTableColumn } from "@/components/shell/data-table";
import type { MessageKey } from "@/i18n";

import type { Attribution } from "./monetisation-rows";

/**
 * P-1b — the cells every section shares: the attribution trio (created by,
 * updated by, updated — staff names, never ids; detail tier, the card's foot).
 * The on/off word is `OnOff` (on-off.tsx).
 */

/** A reach row's place limit as a cell says it: a null cap is "No limit" (DEC-356). */
export function capWord(cap: number | null, t: (key: MessageKey) => string): string {
  return cap === null ? t("admin.monetisation.reach.field.unlimited") : String(cap);
}

export function attributionColumns<T extends Attribution>(
  t: (key: MessageKey) => string,
  format: (iso: string) => string,
  idOf: (row: T) => string,
): DataTableColumn<T>[] {
  return [
    {
      key: "createdBy",
      header: t("admin.monetisation.col.createdBy"),
      priority: "detail",
      card: "foot",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-created-by`}>
          {row.createdByName ?? ""}
        </span>
      ),
    },
    {
      key: "updatedBy",
      header: t("admin.monetisation.col.updatedBy"),
      priority: "detail",
      card: "foot",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-updated-by`}>
          {row.updatedByName ?? ""}
        </span>
      ),
    },
    {
      key: "updated",
      header: t("admin.packages.col.updated"),
      priority: "detail",
      card: "foot",
      cell: (row) => <span className="text-sm">{format(row.updatedAt)}</span>,
    },
  ];
}
