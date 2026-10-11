import { useNavigate } from "@tanstack/react-router";
import { Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { FormField, FormSection } from "@/components/shell/form-section";
import { RowActions } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { roleErrorKey, type RoleSummary } from "./roles-service";
import { useAdminRolesDetailed, useCreateRole } from "./use-admin-roles";

const TABLE_ID = "admin-roles";
const LOCKED = ["name"];

/**
 * U2 — the roles list. Cards at 360, table from md (DataTable law), whole-row
 * links into the detail page (law L8).
 *
 * Bundle 11 G2a (D118, D128, D132) — on the agreed blocks and the agreed look:
 * the page's heading and its line in the header, with Create role as the one
 * header action (it opens the create form under the header); the toolbar holds
 * Columns only (a short roster: no search, no filter); one card per role below
 * lg (the key, the display name under it, members and permissions as facts,
 * the kind pill at the end); the row's three-dots holds View members (the
 * Users list with the role chosen, INC-073). The whole row opens the role's
 * page, where its permissions are changed and a custom role is deleted (RP-9).
 */
export function AdminRolesList() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { permissions } = useAdminShell();
  const mayCreate = permissions.includes("roles:create");
  const { data, isLoading, error } = useAdminRolesDetailed();
  const [creating, setCreating] = useState(false);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  const allColumns: DataTableColumn<RoleSummary>[] = [
    {
      key: "name",
      header: t("admin.roles.col.name"),
      priority: "primary",
      width: "w-[26%]",
      card: "title",
      cell: (role) => (
        <span className="block truncate font-medium text-foreground" title={role.name}>
          {role.name}
        </span>
      ),
    },
    {
      key: "display",
      header: t("admin.roles.col.display"),
      priority: "primary",
      width: "w-[30%]",
      card: "sub",
      cell: (role) => (
        <span className="block truncate text-muted-foreground">{role.displayName ?? "—"}</span>
      ),
    },
    {
      key: "kind",
      header: t("admin.roles.col.kind"),
      priority: "secondary",
      width: "w-[16%]",
      card: "badge",
      cell: (role) => (
        // Bundle 11 G2a (D132) — a classification: the soft grey pill.
        <Badge variant="neutral">
          {role.isSystem ? t("admin.roles.kind.system") : t("admin.roles.kind.custom")}
        </Badge>
      ),
    },
    {
      key: "members",
      header: t("admin.roles.col.members"),
      priority: "secondary",
      width: "w-[14%]",
      card: "meta",
      cell: (role) => (
        <span className="block tabular-nums text-muted-foreground">{role.memberCount}</span>
      ),
    },
    {
      key: "permissions",
      header: t("admin.roles.col.permissions"),
      priority: "detail",
      width: "w-[14%]",
      card: "meta",
      cell: (role) => (
        <span className="block tabular-nums text-muted-foreground">{role.permissionCount}</span>
      ),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  /** View members: the Users list with this role chosen (INC-073: the URL is the state). */
  const rowActions = (role: RoleSummary) => (
    <RowActions
      testid={`role-actions-${role.name}`}
      name={role.name}
      more={[
        {
          key: "members",
          label: t("admin.roles.members.view"),
          onSelect: () => void navigate({ to: "/admin/users", search: { role: role.name } }),
        },
      ]}
    />
  );

  return (
    <div className="min-w-0 space-y-4">
      <div className="min-w-0 space-y-1">
        <TableActions testid="role-header" title={t("admin.roles.title")}>
          {mayCreate ? (
            <TableActionButton
              data-testid="role-create-open"
              variant="default"
              aria-expanded={creating}
              onClick={() => setCreating((open) => !open)}
              icon={<Plus />}
              label={t("admin.roles.create.open")}
            />
          ) : null}
        </TableActions>
        <p className="text-sm text-muted-foreground" data-testid="role-subtitle">
          {t("admin.roles.subtitle")}
        </p>
      </div>

      {mayCreate && creating ? <CreateRoleForm onClose={() => setCreating(false)} /> : null}

      <DataTable<RoleSummary>
        columns={columns}
        rows={data ?? []}
        rowKey={(role) => role.id}
        rowTestId={(role) => `role-row-${role.name}`}
        rowHref={(role) => ({ to: "/admin/roles/$roleId", params: { roleId: role.id } })}
        caption={t("admin.roles.title")}
        cardUntil="lg"
        cardLead={() => <ShieldCheck />}
        toolbar={
          <TableToolbar
            testid="role-toolbar"
            columns={
              <ColumnsButton
                testid="role-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: LOCKED.includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
          />
        }
        rowActions={rowActions}
        loading={isLoading}
        loadingState={
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {t("admin.roles.loading")}
          </p>
        }
        error={error ? true : undefined}
        errorState={
          <p role="alert" className="text-sm text-destructive">
            {t("admin.roles.error")}
          </p>
        }
        emptyState={<p className="text-sm text-muted-foreground">{t("admin.roles.empty")}</p>}
      />
    </div>
  );
}

/** The create form, opened by the header's Create role (G2a: the old opening card is gone). */
function CreateRoleForm({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const create = useCreateRole();
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  const submit = (guard: GuardFn) => {
    setErrorKey(null);
    if (name.trim().length === 0) {
      setErrorKey("admin.roles.error.nameRequired");
      return;
    }
    void guard(async () => {
      const id = await create.mutateAsync({
        name: name.trim(),
        displayName: displayName.trim(),
        description: description.trim(),
      });
      onClose();
      await navigate({ to: "/admin/roles/$roleId", params: { roleId: id } });
    }).catch((cause: unknown) => setErrorKey(roleErrorKey(cause, "admin.roles.create.failed")));
  };

  return (
    <StepUpGate>
      {(guard) => (
        <FormSection
          testid="role-create-form"
          title={t("admin.roles.create.title")}
          description={t("admin.roles.create.description")}
          columns={2}
          actions={
            <>
              <Button
                type="button"
                className="min-h-11"
                data-testid="role-create-submit"
                disabled={create.isPending}
                onClick={() => submit(guard)}
              >
                {t("admin.roles.create.submit")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                data-testid="role-create-cancel"
                onClick={() => {
                  setErrorKey(null);
                  onClose();
                }}
              >
                {t("admin.roles.create.cancel")}
              </Button>
              {errorKey ? (
                <span
                  role="alert"
                  data-testid="role-create-error"
                  className="text-sm text-destructive"
                >
                  {t(errorKey)}
                </span>
              ) : null}
            </>
          }
        >
          <FormField
            label={t("admin.roles.create.name")}
            htmlFor="role-name"
            help={t("admin.roles.create.nameHelp")}
          >
            <Input
              id="role-name"
              data-testid="role-create-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label={t("admin.roles.create.displayName")} htmlFor="role-display">
            <Input
              id="role-display"
              data-testid="role-create-display"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </FormField>
          <FormField
            label={t("admin.roles.create.descriptionField")}
            htmlFor="role-description"
            full
          >
            <Input
              id="role-description"
              data-testid="role-create-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
        </FormSection>
      )}
    </StepUpGate>
  );
}

export default AdminRolesList;
