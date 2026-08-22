import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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

import { PermissionMatrix } from "./permission-matrix";
import { roleErrorKey, type RoleDetail } from "./roles-service";
import { useAdminRole, useDeleteRole, useUpdateRole } from "./use-admin-roles";

/**
 * U2 — the role detail page: meta, matrix, members, danger zone.
 * Every mutation goes through StepUpGate and a step-up-gated definer RPC.
 */
export function AdminRoleDetailPage({ roleId }: { roleId: string }) {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data: role, isLoading, error } = useAdminRole(roleId);

  if (isLoading) {
    return (
      <PageCard>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {t("admin.roles.loading")}
        </p>
      </PageCard>
    );
  }
  if (error) {
    return (
      <PageCard>
        <p role="alert" className="text-sm text-destructive">
          {t("admin.roles.error")}
        </p>
      </PageCard>
    );
  }
  if (!role) {
    return (
      <PageCard>
        <p role="alert" data-testid="role-not-found" className="text-sm text-destructive">
          {t("admin.roles.detail.notFound")}
        </p>
      </PageCard>
    );
  }

  const mayUpdate = permissions.includes("roles:update");
  const mayDelete = permissions.includes("roles:delete");

  return (
    <div className="min-w-0 space-y-4">
      <RoleMetaCard role={role} mayUpdate={mayUpdate} />
      <PermissionMatrix
        roleId={role.id}
        isSystem={role.isSystem || !mayUpdate}
        rows={role.permissions}
      />
      <MembersCard role={role} />
      {!role.isSystem && mayDelete ? <DangerCard role={role} /> : null}
      <PageCard>
        <Link
          to="/admin/roles"
          data-testid="role-back"
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4"
        >
          {t("admin.roles.detail.back")}
        </Link>
      </PageCard>
    </div>
  );
}

function RoleMetaCard({ role, mayUpdate }: { role: RoleDetail; mayUpdate: boolean }) {
  const { t } = useI18n();
  const update = useUpdateRole(role.id);
  const [displayName, setDisplayName] = useState(role.displayName ?? "");
  const [description, setDescription] = useState(role.description ?? "");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [saved, setSaved] = useState(false);

  const editable = mayUpdate && !role.isSystem;

  const save = (guard: GuardFn) => {
    setErrorKey(null);
    setSaved(false);
    void guard(() => update.mutateAsync({ displayName, description }))
      .then(() => setSaved(true))
      .catch((cause: unknown) => setErrorKey(roleErrorKey(cause, "admin.roles.meta.failed")));
  };

  if (!editable) {
    return (
      <PageCard testid="role-meta" className="min-w-0 space-y-2">
        <h2 data-testid="role-name" className="break-words text-lg font-semibold text-foreground">
          {role.displayName ?? role.name}
        </h2>
        <p className="break-words text-sm text-muted-foreground">{role.name}</p>
        {role.description ? (
          <p className="break-words text-sm text-muted-foreground">{role.description}</p>
        ) : null}
        <Badge variant={role.isSystem ? "secondary" : "outline"}>
          {role.isSystem ? t("admin.roles.kind.system") : t("admin.roles.kind.custom")}
        </Badge>
        {role.isSystem ? (
          <p data-testid="role-meta-locked" className="text-sm text-muted-foreground">
            {t("admin.roles.systemLockedNote")}
          </p>
        ) : null}
      </PageCard>
    );
  }

  return (
    <StepUpGate>
      {(guard) => (
        <FormSection
          testid="role-meta"
          title={t("admin.roles.meta.title")}
          description={t("admin.roles.meta.description")}
          columns={2}
          actions={
            <>
              <Button
                type="button"
                className="min-h-11"
                data-testid="role-meta-save"
                disabled={update.isPending}
                onClick={() => save(guard)}
              >
                {t("admin.roles.meta.save")}
              </Button>
              {saved ? (
                <span data-testid="role-meta-saved" className="text-sm text-muted-foreground">
                  {t("admin.roles.meta.saved")}
                </span>
              ) : null}
              {errorKey ? (
                <span
                  role="alert"
                  data-testid="role-meta-error"
                  className="text-sm text-destructive"
                >
                  {t(errorKey)}
                </span>
              ) : null}
            </>
          }
        >
          <FormField label={t("admin.roles.col.name")} htmlFor="role-key">
            <Input id="role-key" data-testid="role-name" value={role.name} readOnly disabled />
          </FormField>
          <FormField label={t("admin.roles.create.displayName")} htmlFor="role-display-edit">
            <Input
              id="role-display-edit"
              data-testid="role-meta-display"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </FormField>
          <FormField
            label={t("admin.roles.create.descriptionField")}
            htmlFor="role-description-edit"
            full
          >
            <Input
              id="role-description-edit"
              data-testid="role-meta-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
        </FormSection>
      )}
    </StepUpGate>
  );
}

function MembersCard({ role }: { role: RoleDetail }) {
  const { t } = useI18n();
  return (
    <PageCard testid="role-members" className="min-w-0 space-y-3">
      <h3 className="text-base font-semibold text-foreground">{t("admin.roles.members.title")}</h3>
      <p data-testid="role-member-count" className="text-sm text-muted-foreground">
        {t("admin.roles.members.count").replace("{n}", String(role.memberCount))}
      </p>
      <Link
        to="/admin/users"
        data-testid="role-members-link"
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4"
      >
        {t("admin.roles.members.view")}
      </Link>
    </PageCard>
  );
}

function DangerCard({ role }: { role: RoleDetail }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const remove = useDeleteRole(role.id);
  const [confirm, setConfirm] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  const hasMembers = role.memberCount > 0;
  const armed = !hasMembers && confirm.trim() === role.name;

  const del = (guard: GuardFn) => {
    setErrorKey(null);
    void guard(async () => {
      await remove.mutateAsync();
      await navigate({ to: "/admin/roles" });
    }).catch((cause: unknown) => setErrorKey(roleErrorKey(cause, "admin.roles.danger.failed")));
  };

  return (
    <StepUpGate>
      {(guard) => (
        <PageCard testid="role-danger" className="min-w-0 space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            {t("admin.roles.danger.title")}
          </h3>
          <p className="text-sm text-muted-foreground">{t("admin.roles.danger.description")}</p>
          {hasMembers ? (
            <p data-testid="role-delete-hint" className="text-sm text-muted-foreground">
              {t("admin.roles.danger.hasMembers")}
            </p>
          ) : (
            <div className="min-w-0 space-y-1">
              <label
                className="block text-sm font-medium text-foreground"
                htmlFor="role-delete-confirm"
              >
                {t("admin.roles.danger.confirmLabel")}
              </label>
              <Input
                id="role-delete-confirm"
                data-testid="role-delete-confirm"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            className="min-h-11 w-full md:w-auto"
            data-testid="role-delete"
            disabled={!armed || remove.isPending}
            onClick={() => del(guard)}
          >
            {t("admin.roles.danger.delete")}
          </Button>
          {errorKey ? (
            <p role="alert" data-testid="role-delete-error" className="text-sm text-destructive">
              {t(errorKey)}
            </p>
          ) : null}
        </PageCard>
      )}
    </StepUpGate>
  );
}

export default AdminRoleDetailPage;
