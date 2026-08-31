import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { FormField, FormSection } from "@/components/shell/form-section";
import { TranslatorLanguagesCard } from "@/features/admin/translations/translator-card";
import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { ImpersonationStarter } from "@/features/admin/impersonation/impersonation-starter";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { profileEditErrorKey, UNASSIGNABLE_ROLES } from "./admin-users-service";
import {
  useAdminRoles,
  useAdminUser,
  useAdminUserActivity,
  useCountries,
  useRoleAssignment,
  useSetAccountStatus,
  useUpdateProfile,
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

  /**
   * INC-104 / INC-102 law — PAGES RENDER THEIR SHELL BEFORE THEIR QUERIES.
   * The detail RPC (admin_get_user) is auth-derived: its query only starts once
   * the session identity has settled, so on a cold mobile load it can stall
   * behind the auth settle. Early-returning a bare card left the page with
   * nothing but the footer (AU-3). The shell — container, heading, back link —
   * renders immediately and the body carries a NAMED loading/error/not-found
   * state in place.
   */
  if (isLoading || error || !user) {
    return (
      <div data-testid="admin-user-detail" className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
            {t("admin.users.detail.identity")}
          </h1>
          <Link
            to="/admin/users"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            {t("admin.users.detail.back")}
          </Link>
        </div>
        {isLoading ? (
          <PageCard testid="user-detail-loading">
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
              {t("admin.users.loading")}
            </p>
          </PageCard>
        ) : error ? (
          <PageCard testid="user-detail-error">
            <p role="alert" className="text-sm text-destructive">
              {t("admin.users.error")}
            </p>
          </PageCard>
        ) : (
          <PageCard testid="user-not-found">
            <p className="text-sm text-muted-foreground">{t("admin.users.detail.notFound")}</p>
          </PageCard>
        )}
      </div>
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

          {/* U1g — EDIT PROFILE. Hidden on your own record (same rule as the
              status controls: staff edit themselves in Settings) and hidden
              without profiles:update; the RPC refuses either way. */}
          {isOwnAccount ? (
            <PageCard testid="user-edit-own-note">
              <p data-testid="own-account-note-edit" className="text-sm text-muted-foreground">
                {t("admin.users.status.ownAccount")}
              </p>
            </PageCard>
          ) : mayUpdate ? (
            <AdminUserEditForm
              userId={userId}
              displayName={user.displayName}
              sellerAlias={user.sellerAlias}
              homeCountryCode={user.homeCountryCode}
              guard={guard}
            />
          ) : null}

          {/* U3 / DEC-016 — VIEW AS. Super-admin only, step-up gated, never on
              your own record. The RPC re-checks all three (law F3). */}
          {!isOwnAccount && permissions.includes("impersonation:use") ? (
            <ImpersonationStarter userId={userId} guard={guard} />
          ) : null}

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

          {/* U4b — translator SCOPE (which languages), manage-gated; the RPC
              re-checks translations:manage server-side (law F3). */}
          {permissions.includes("translations:manage") ? (
            <TranslatorLanguagesCard userId={user.userId} guard={guard} />
          ) : null}

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

/**
 * U1g — EDIT PROFILE FORM.
 *
 * Three columns of the profile only (display name, seller alias, home
 * country). Save runs through the same StepUpGate `guard` as the other
 * sensitive actions; the RPC's refusals are mapped onto translated inline
 * errors (law F4 — nothing is swallowed).
 */
function AdminUserEditForm({
  userId,
  displayName,
  sellerAlias,
  homeCountryCode,
  guard,
}: {
  userId: string;
  displayName: string;
  sellerAlias: string | null;
  homeCountryCode: string | null;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const countries = useCountries();
  const save = useUpdateProfile(userId);

  const [name, setName] = useState(displayName);
  const [alias, setAlias] = useState(sellerAlias ?? "");
  const [country, setCountry] = useState(homeCountryCode ?? "");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <FormSection
      testid="user-edit-form"
      title={t("admin.users.edit.title")}
      description={t("admin.users.edit.description")}
      columns={2}
      actions={
        <>
          <Button
            className="min-h-11 w-full sm:w-auto"
            data-testid="edit-save"
            disabled={save.isPending}
            onClick={() => {
              setSaved(false);
              if (name.trim() === "") {
                setErrorKey("admin.users.edit.errorNameRequired");
                return;
              }
              setErrorKey(null);
              void guard(() =>
                save.mutateAsync({
                  displayName: name.trim(),
                  sellerAlias: alias.trim() === "" ? null : alias.trim(),
                  homeCountryCode: country === "" ? null : country,
                }),
              )
                .then(() => setSaved(true))
                .catch((error: unknown) => setErrorKey(profileEditErrorKey(error)));
            }}
          >
            {t("admin.users.edit.save")}
          </Button>
          {saved ? (
            <p data-testid="edit-saved" role="status" className="text-sm text-muted-foreground">
              {t("admin.users.edit.saved")}
            </p>
          ) : null}
          {errorKey ? (
            <p data-testid="edit-error" role="alert" className="text-sm text-destructive">
              {t(errorKey)}
            </p>
          ) : null}
        </>
      }
    >
      <FormField label={t("admin.users.edit.displayName")} htmlFor="edit-display-name">
        <Input
          id="edit-display-name"
          data-testid="edit-display-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
        />
      </FormField>

      <FormField
        label={t("admin.users.edit.alias")}
        htmlFor="edit-seller-alias"
        help={t("admin.users.edit.aliasHelp")}
      >
        <Input
          id="edit-seller-alias"
          data-testid="edit-seller-alias"
          value={alias}
          onChange={(event) => {
            setAlias(event.target.value);
            setSaved(false);
          }}
        />
      </FormField>

      <FormField label={t("admin.users.edit.country")} htmlFor="edit-country">
        <select
          id="edit-country"
          data-testid="edit-country"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
            setSaved(false);
          }}
        >
          <option value="">{t("admin.users.edit.countryNone")}</option>
          {(countries.data ?? []).map((option) => (
            <option key={option.code} value={option.code}>
              {option.nameEn}
            </option>
          ))}
        </select>
      </FormField>
    </FormSection>
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
