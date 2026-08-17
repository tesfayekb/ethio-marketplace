import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";

import { UNASSIGNABLE_ROLES } from "./admin-users-service";
import {
  useAdminRoles,
  useAdminUser,
  useAdminUserActivity,
  useRoleAssignment,
  useSetAccountStatus,
} from "./use-admin-users";

/**
 * The per-user detail (Phase U1). Buttons are hidden without the matching
 * permission AND every action is independently gated in the definer RPC
 * (Law F3 — defence in depth, the server is the authority).
 */
export function AdminUserDetailPage({ userId }: { userId: string }) {
  const { t, language } = useI18n();
  const { permissions } = useAdminShell();
  const { user: authUser } = useAuth();
  /** U1d (INC-077): never offer status controls on your OWN record. */
  const isOwnAccount = authUser?.id === userId;
  const mayUpdate = permissions.includes("profiles:update");
  const mayAssign = permissions.includes("roles:assign");

  const { data: user, isLoading, error } = useAdminUser(userId);
  const activity = useAdminUserActivity(userId);
  const roles = useAdminRoles();
  const status = useSetAccountStatus(userId);
  const { assign, revoke } = useRoleAssignment(userId);

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const fmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const when = (value: string | null) => (value ? fmt.format(new Date(value)) : "—");

  if (isLoading) {
    return (
      <PageCard>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {t("admin.users.loading")}
        </p>
      </PageCard>
    );
  }
  if (error) {
    return (
      <PageCard>
        <p role="alert" className="text-sm text-destructive">
          {t("admin.users.error")}
        </p>
      </PageCard>
    );
  }
  if (!user) {
    return (
      <PageCard data-testid="user-not-found">
        <p className="text-sm text-muted-foreground">{t("admin.users.detail.notFound")}</p>
      </PageCard>
    );
  }

  const deactivated = user.accountStatus === "deactivated";
  const assignable = (roles.data ?? []).filter(
    (role) => !UNASSIGNABLE_ROLES.includes(role.name as (typeof UNASSIGNABLE_ROLES)[number]),
  );

  /**
   * U1f — the four sensitive actions run through the step-up gate. `guard`
   * verifies (or asks for) AAL2 first; the RPC itself refuses at aal1 anyway
   * (public.require_step_up_if_needed), so this is UX, not authorization.
   * Non-step-up failures stay on the mutation's own error state (law F4).
   */
  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-user-detail" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
              {user.displayName}
            </h1>
            <Link
              to="/admin/users"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              {t("admin.users.detail.back")}
            </Link>
          </div>

          <PageCard className="space-y-2" testid="user-identity-card">
            <h2 className="text-sm font-semibold text-foreground">
              {t("admin.users.detail.identity")}
            </h2>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <Field label={t("admin.users.col.email")} value={user.email} testid="user-email" />
              <Field label={t("admin.users.detail.alias")} value={user.sellerAlias ?? "—"} />
              <Field label={t("admin.users.col.country")} value={user.homeCountryCode ?? "—"} />
              <Field label={t("admin.users.detail.joined")} value={when(user.createdAt)} />
              <Field
                label={t("admin.users.detail.lastSignIn")}
                value={user.lastSignInAt ? when(user.lastSignInAt) : t("admin.users.detail.never")}
              />
            </dl>
          </PageCard>

          <PageCard className="space-y-3" testid="user-status-card">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">
                {t("admin.users.status.title")}
              </h2>
              <Badge data-testid="user-status" variant={deactivated ? "destructive" : "secondary"}>
                {deactivated ? t("admin.users.status.deactivated") : t("admin.users.status.active")}
              </Badge>
            </div>
            {user.statusChangedAt ? (
              <p className="text-xs text-muted-foreground">
                {t("admin.users.status.changedAt")}: {when(user.statusChangedAt)}
                {user.statusReason ? ` · ${user.statusReason}` : ""}
              </p>
            ) : null}

            {isOwnAccount ? (
              <p data-testid="own-account-note" className="text-sm text-muted-foreground">
                {t("admin.users.status.ownAccount")}
              </p>
            ) : mayUpdate ? (
              <div className="space-y-2">
                {!deactivated ? (
                  <>
                    <label
                      className="block text-sm font-medium text-foreground"
                      htmlFor="deactivate-reason"
                    >
                      {t("admin.users.status.reasonLabel")}
                    </label>
                    <Input
                      id="deactivate-reason"
                      data-testid="deactivate-reason"
                      value={reason}
                      placeholder={t("admin.users.status.reasonPlaceholder")}
                      onChange={(event) => {
                        setReason(event.target.value);
                        setReasonError(false);
                      }}
                    />
                    {reasonError ? (
                      <p
                        role="alert"
                        data-testid="reason-error"
                        className="text-sm text-destructive"
                      >
                        {t("admin.users.status.reasonRequired")}
                      </p>
                    ) : null}
                    <Button
                      variant="destructive"
                      className="min-h-11 w-full sm:w-auto"
                      data-testid="deactivate-user"
                      disabled={status.isPending}
                      onClick={() => {
                        if (reason.trim() === "") {
                          setReasonError(true);
                          return;
                        }
                        void guard(() =>
                          status.mutateAsync({ status: "deactivated", reason: reason.trim() }),
                        ).catch(() => undefined);
                      }}
                    >
                      {t("admin.users.status.deactivate")}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="min-h-11 w-full sm:w-auto"
                    data-testid="activate-user"
                    disabled={status.isPending}
                    onClick={() => {
                      setReason("");
                      void guard(() => status.mutateAsync({ status: "active" })).catch(
                        () => undefined,
                      );
                    }}
                  >
                    {t("admin.users.status.activate")}
                  </Button>
                )}
                {status.error ? (
                  <p role="alert" data-testid="status-error" className="text-sm text-destructive">
                    {t("admin.users.status.failed")}
                  </p>
                ) : null}
              </div>
            ) : null}
          </PageCard>

          <PageCard className="space-y-3" testid="user-roles-card">
            <h2 className="text-sm font-semibold text-foreground">
              {t("admin.users.roles.title")}
            </h2>
            {user.roles.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("admin.users.roles.none")}</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {user.roles.map((role) => {
                  const locked = UNASSIGNABLE_ROLES.includes(
                    role as (typeof UNASSIGNABLE_ROLES)[number],
                  );
                  return (
                    <li key={role} className="flex items-center gap-1">
                      <Badge variant="outline" data-testid={`role-chip-${role}`}>
                        {role}
                      </Badge>
                      {locked ? (
                        <span className="text-xs text-muted-foreground">
                          {t("admin.users.roles.locked")}
                        </span>
                      ) : mayAssign ? (
                        <Button
                          variant="ghost"
                          className="min-h-11 px-2 text-xs"
                          data-testid={`role-remove-${role}`}
                          disabled={revoke.isPending}
                          onClick={() =>
                            void guard(() => revoke.mutateAsync(role)).catch(() => undefined)
                          }
                        >
                          {t("admin.users.roles.remove")}
                        </Button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}

            {mayAssign ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <div className="grow">
                  <label
                    className="block text-sm font-medium text-foreground"
                    htmlFor="assign-role"
                  >
                    {t("admin.users.roles.assign")}
                  </label>
                  <select
                    id="assign-role"
                    data-testid="assign-role-select"
                    className="mt-1 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    <option value="">—</option>
                    {assignable.map((role) => (
                      <option key={role.name} value={role.name}>
                        {role.displayName ?? role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  className="min-h-11"
                  data-testid="assign-role"
                  disabled={selectedRole === "" || assign.isPending}
                  onClick={() =>
                    void guard(() => assign.mutateAsync(selectedRole)).catch(() => undefined)
                  }
                >
                  {t("admin.users.roles.assignAction")}
                </Button>
              </div>
            ) : null}
            {assign.error || revoke.error ? (
              <p role="alert" data-testid="roles-error" className="text-sm text-destructive">
                {t("admin.users.roles.failed")}
              </p>
            ) : null}
          </PageCard>

          <PageCard className="space-y-3" testid="user-activity-card">
            <h2 className="text-sm font-semibold text-foreground">
              {t("admin.users.activity.title")}
            </h2>
            {activity.isLoading ? (
              <p className="text-sm text-muted-foreground">{t("admin.users.activity.loading")}</p>
            ) : (activity.data ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("admin.users.activity.empty")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {(activity.data ?? []).map((row) => (
                  <li key={row.id} data-testid={`activity-${row.action}`} className="min-w-0">
                    <span className="font-medium text-foreground">{row.action}</span>
                    <span className="text-muted-foreground">
                      {" · "}
                      {row.entityType}
                      {" · "}
                      {when(row.createdAt)}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {JSON.stringify(row.meta)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </PageCard>
        </div>
      )}
    </StepUpGate>
  );
}

function Field({ label, value, testid }: { label: string; value: string; testid?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd data-testid={testid} className="truncate text-foreground">
        {value}
      </dd>
    </div>
  );
}

export default AdminUserDetailPage;
