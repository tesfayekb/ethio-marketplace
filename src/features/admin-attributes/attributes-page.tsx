import { useMemo, useState } from "react";
import { Pencil, Trash, Merge } from "lucide-react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";

import {
  AttributeEditorDialog,
  DeleteAttributeDialog,
  MergeAttributesDialog,
} from "./attribute-dialogs";
import { typeHasOptions, type AttributeRow } from "./attributes-service";
import { useAdminAttributes } from "./use-attributes";

/**
 * C3c PART B — THE ATTRIBUTE LIBRARY.
 *
 * The definitions side of the normalized model: one row per `public.attributes`
 * definition with the blast radius (how many categories link it) in view. Gate
 * tier: `categories:view` opens the section, `categories:update` writes a
 * definition, `categories:restructure` + step-up deletes or merges — every one
 * of those re-checked server-side (F3).
 *
 * The roster is the C7 DataTable primitive with its DEFAULTS (cards below md,
 * priorities only): no width hacks live here.
 */

const PAGE_SIZE = 25;

export function AdminAttributesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminAttributes();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [dialog, setDialog] = useState<
    { kind: "none" } | { kind: "edit"; id: string | null } | { kind: "delete"; id: string } | { kind: "merge" }
  >({ kind: "none" });

  const mayUpdate = permissions.includes("categories:update");
  const mayRestructure = permissions.includes("categories:restructure");

  const all = useMemo(() => data ?? [], [data]);
  const needle = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      all.filter(
        (row) =>
          needle === "" ||
          row.nameEn.toLowerCase().includes(needle) ||
          row.attrKey.toLowerCase().includes(needle),
      ),
    [all, needle],
  );
  const rows = filtered.slice(offset, offset + PAGE_SIZE);
  const selected =
    dialog.kind === "edit" || dialog.kind === "delete"
      ? (all.find((row) => row.id === dialog.id) ?? null)
      : null;

  const columns: DataTableColumn<AttributeRow>[] = [
    {
      key: "name",
      header: t("admin.attributes.col.name"),
      priority: "primary",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block truncate font-medium text-foreground" title={row.nameEn}>
            {row.nameEn}
          </span>
          <span className="block truncate text-xs text-muted-foreground" title={row.attrKey}>
            {row.attrKey}
          </span>
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.attributes.col.type"),
      priority: "secondary",
      cell: (row) => (
        <span className="block break-words text-muted-foreground">
          {t(`admin.attributes.type.${row.attrType}` as MessageKey)}
        </span>
      ),
    },
    {
      key: "options",
      header: t("admin.attributes.col.options"),
      priority: "detail",
      align: "end",
      cell: (row) => (
        <span className="block tabular-nums">
          {typeHasOptions(row.attrType) ? row.options.length : "—"}
        </span>
      ),
    },
    {
      key: "usage",
      header: t("admin.attributes.col.usage"),
      priority: "secondary",
      align: "end",
      cell: (row) => (
        <span
          className="block tabular-nums"
          data-testid={`attribute-usage-${row.attrKey}`}
        >
          {row.usageCount}
        </span>
      ),
    },
  ];

  const rowActions = (row: AttributeRow) => (
    <span className="flex flex-wrap items-center gap-2 xl:justify-end">
      {mayUpdate ? (
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid={`attribute-edit-${row.attrKey}`}
          title={t("admin.attributes.action.edit")}
          onClick={() => setDialog({ kind: "edit", id: row.id })}
        >
          <Pencil aria-hidden="true" className="size-4" />
          <span>{t("admin.attributes.action.edit")}</span>
        </Button>
      ) : null}
      {mayRestructure ? (
        <Button
          type="button"
          variant="destructive"
          className="min-h-11"
          data-testid={`attribute-delete-${row.attrKey}`}
          title={t("admin.attributes.action.delete")}
          onClick={() => setDialog({ kind: "delete", id: row.id })}
        >
          <Trash aria-hidden="true" className="size-4" />
          <span>{t("admin.attributes.action.delete")}</span>
        </Button>
      ) : null}
    </span>
  );

  return (
    <StepUpGate>
      {(guard) => (
        <div className="min-w-0 space-y-4">
          {mayUpdate || mayRestructure ? (
            <PageCard testid="attribute-create-card">
              <div className="flex flex-col gap-2 sm:flex-row">
                {mayUpdate ? (
                  <Button
                    type="button"
                    className="min-h-11 w-full sm:w-auto"
                    data-testid="attribute-create-open"
                    onClick={() => setDialog({ kind: "edit", id: null })}
                  >
                    {t("admin.attributes.create.open")}
                  </Button>
                ) : null}
                {mayRestructure ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 w-full sm:w-auto"
                    data-testid="attribute-merge-open"
                    onClick={() => setDialog({ kind: "merge" })}
                  >
                    <Merge aria-hidden="true" className="size-4" />
                    <span>{t("admin.attributes.action.merge")}</span>
                  </Button>
                ) : null}
              </div>
            </PageCard>
          ) : null}

          <DataTable<AttributeRow>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            rowTestId={(row) => `attribute-row-${row.attrKey}`}
            caption={t("admin.attributes.caption")}
            loading={isLoading}
            loadingState={
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                {t("admin.attributes.loading")}
              </p>
            }
            error={error ? true : undefined}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.attributes.error")}
              </p>
            }
            emptyState={
              <p className="text-sm text-muted-foreground">{t("admin.attributes.empty")}</p>
            }
            toolbar={
              <Input
                data-testid="attribute-search"
                className="md:w-72"
                placeholder={t("admin.attributes.searchPlaceholder")}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setOffset(0);
                }}
              />
            }
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={PAGE_SIZE}
                total={filtered.length}
                onPrevious={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
                onNext={() => setOffset((prev) => prev + PAGE_SIZE)}
                testid="attribute-pagination"
              />
            }
            rowActions={rowActions}
          />

          {dialog.kind === "edit" ? (
            <AttributeEditorDialog
              key={dialog.id ?? "create"}
              attribute={selected}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {dialog.kind === "delete" && selected ? (
            <DeleteAttributeDialog
              attribute={selected}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {dialog.kind === "merge" ? (
            <MergeAttributesDialog
              attributes={all}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminAttributesPage;
