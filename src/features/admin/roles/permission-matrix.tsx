import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { en } from "@/i18n/locales/en";
import type { MessageKey } from "@/i18n/types";
import { useState } from "react";

import { permissionSlug, roleErrorKey, type RolePermissionRow } from "./roles-service";
import { useSetRolePermission } from "./use-admin-roles";

/**
 * U2a / INC-084(b) — MATRIX VOCABULARY IS CHROME, NOT DATA.
 *
 * `permissions.action` and `resources.name` are a finite, admin-owned
 * vocabulary, so they translate (Law D1). The raw value is used ONLY as a hard
 * fallback, and only behind a dev-console warn — the Amharic coverage guard
 * makes any fallback red rather than letting raw English leak.
 */
function useVocabulary() {
  const { t } = useI18n();

  return (kind: "action" | "resource", value: string) => {
    const key = `admin.roles.perm.${kind}.${value}` as MessageKey;
    // `en` is the complete key set (am.ts is type-checked against it), so it is
    // the authority on whether a vocabulary key exists at all.
    if (key in en) return t(key);
    if (import.meta.env.DEV) {
      console.warn(`[roles] missing matrix ${kind} translation for "${value}" (key: ${key})`);
    }
    return value;
  };
}

/**
 * U2 — the permission matrix, grouped by resource.
 *
 * 360: one card per resource with stacked action rows. md+: the same rows read
 * as a table. Nothing overflows horizontally (table law).
 *
 * LOCKS (Law F3 — the UI mirrors server refusals, it does not invent them):
 * a system role locks every control; an is_core grant locks its own row. Both
 * are re-refused inside admin_set_role_permission and, behind it, by the R1
 * triggers.
 */
export function PermissionMatrix({
  roleId,
  isSystem,
  rows,
}: {
  roleId: string;
  isSystem: boolean;
  rows: RolePermissionRow[];
}) {
  const { t } = useI18n();
  const label = useVocabulary();
  const setPermission = useSetRolePermission(roleId);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  const byResource = new Map<string, RolePermissionRow[]>();
  for (const row of rows) {
    const list = byResource.get(row.resource) ?? [];
    list.push(row);
    byResource.set(row.resource, list);
  }

  const toggle = (guard: GuardFn, row: RolePermissionRow) => {
    setErrorKey(null);
    void guard(() =>
      setPermission.mutateAsync({ permissionId: row.permissionId, granted: !row.granted }),
    ).catch((cause: unknown) => setErrorKey(roleErrorKey(cause, "admin.roles.perm.failed")));
  };

  return (
    <StepUpGate>
      {(guard) => (
        <PageCard testid="role-permissions" className="min-w-0 space-y-4">
          <div className="min-w-0 space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              {t("admin.roles.perm.title")}
            </h3>
            <p className="text-sm text-muted-foreground">{t("admin.roles.perm.description")}</p>
            {isSystem ? (
              <p data-testid="role-system-note" className="text-sm text-muted-foreground">
                {t("admin.roles.systemLockedNote")}
              </p>
            ) : null}
            {errorKey ? (
              <p
                role="alert"
                data-testid="role-permission-error"
                className="text-sm text-destructive"
              >
                {t(errorKey)}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 space-y-4">
            {[...byResource.entries()].map(([resource, group]) => (
              <section key={resource} data-testid={`role-resource-${resource}`} className="min-w-0">
                <h4
                  data-testid={`role-resource-heading-${resource}`}
                  className="mb-2 break-words text-sm font-semibold text-foreground"
                >
                  {label("resource", resource)}
                </h4>
                <ul className="min-w-0 divide-y divide-border rounded-md border border-border">
                  {group.map((row) => {
                    const locked = isSystem || (row.granted && row.isCore);
                    const slug = permissionSlug(row);
                    return (
                      <li
                        key={row.permissionId}
                        data-testid={`role-permission-${slug}`}
                        data-granted={row.granted ? "true" : "false"}
                        className="flex min-w-0 flex-col gap-2 p-3 md:flex-row md:items-center md:justify-between"
                      >
                        <span className="flex min-w-0 flex-wrap items-center gap-2">
                          <span
                            data-testid="role-permission-action"
                            className="break-words text-sm text-foreground"
                          >
                            {label("action", row.action)}
                          </span>
                          {row.requiresStepUp ? (
                            <Badge variant="outline">{t("admin.roles.perm.stepUp")}</Badge>
                          ) : null}
                          {row.granted ? (
                            <Badge variant="secondary">{t("admin.roles.perm.granted")}</Badge>
                          ) : null}
                          {row.granted && row.isCore ? (
                            <span className="text-xs text-muted-foreground">
                              {t("admin.roles.perm.coreNote")}
                            </span>
                          ) : null}
                        </span>

                        {locked ? (
                          <span
                            data-testid={`role-permission-locked-${slug}`}
                            className="text-sm text-muted-foreground"
                          >
                            {t("admin.roles.perm.locked")}
                          </span>
                        ) : (
                          <Button
                            type="button"
                            variant={row.granted ? "outline" : "default"}
                            className="min-h-11 w-full md:w-auto"
                            data-testid={`role-permission-toggle-${slug}`}
                            disabled={setPermission.isPending}
                            onClick={() => toggle(guard, row)}
                          >
                            {row.granted
                              ? t("admin.roles.perm.revoke")
                              : t("admin.roles.perm.grant")}
                          </Button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </PageCard>
      )}
    </StepUpGate>
  );
}

export default PermissionMatrix;
