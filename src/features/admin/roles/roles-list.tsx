import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { FormField, FormSection } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
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

/**
 * U2 — the roles list. Cards at 360, table from md (DataTable law), whole-row
 * links into the detail page (law L8).
 */
export function AdminRolesList() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const mayCreate = permissions.includes("roles:create");
  const { data, isLoading, error } = useAdminRolesDetailed();

  const columns: DataTableColumn<RoleSummary>[] = [
    {
      key: "name",
      header: t("admin.roles.col.name"),
      priority: "primary",
      width: "w-[26%]",
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
      cell: (role) => (
        <span className="block truncate text-muted-foreground">{role.displayName ?? "—"}</span>
      ),
    },
    {
      key: "kind",
      header: t("admin.roles.col.kind"),
      priority: "secondary",
      width: "w-[16%]",
      cell: (role) => (
        <Badge variant={role.isSystem ? "secondary" : "outline"}>
          {role.isSystem ? t("admin.roles.kind.system") : t("admin.roles.kind.custom")}
        </Badge>
      ),
    },
    {
      key: "members",
      header: t("admin.roles.col.members"),
      priority: "secondary",
      width: "w-[14%]",
      cell: (role) => (
        <span className="block tabular-nums text-muted-foreground">{role.memberCount}</span>
      ),
    },
    {
      key: "permissions",
      header: t("admin.roles.col.permissions"),
      priority: "detail",
      width: "w-[14%]",
      cell: (role) => (
        <span className="block tabular-nums text-muted-foreground">{role.permissionCount}</span>
      ),
    },
  ];

  return (
    <div className="min-w-0 space-y-4">
      {mayCreate ? <CreateRoleCard /> : null}

      <DataTable<RoleSummary>
        columns={columns}
        rows={data ?? []}
        rowKey={(role) => role.id}
        rowTestId={(role) => `role-row-${role.name}`}
        rowHref={(role) => ({ to: "/admin/roles/$roleId", params: { roleId: role.id } })}
        caption={t("admin.roles.title")}
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

function CreateRoleCard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const create = useCreateRole();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  if (!open) {
    return (
      <PageCard testid="role-create-card">
        <Button
          type="button"
          className="min-h-11 w-full md:w-auto"
          data-testid="role-create-open"
          onClick={() => setOpen(true)}
        >
          {t("admin.roles.create.open")}
        </Button>
      </PageCard>
    );
  }

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
      setOpen(false);
      setName("");
      setDisplayName("");
      setDescription("");
      await navigate({ to: "/admin/roles/$roleId", params: { roleId: id } });
    }).catch((cause: unknown) =>
      setErrorKey(roleErrorKey(cause, "admin.roles.create.failed")),
    );
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
                  setOpen(false);
                  setErrorKey(null);
                }}
              >
                {t("admin.roles.create.cancel")}
              </Button>
              {errorKey ? (
                <span role="alert" data-testid="role-create-error" className="text-sm text-destructive">
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
          <FormField label={t("admin.roles.create.descriptionField")} htmlFor="role-description" full>
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
