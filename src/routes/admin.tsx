import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useShell } from "@/components/app-shell";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { usePermissions } from "@/features/permissions/usePermissions";
import { useI18n } from "@/i18n";

/**
 * The admin landing. This route file IS the admin chunk: it is the only place
 * outside src/features/permissions that may import the permission seam
 * (scripts/check-browse-imports.sh).
 *
 * Gate semantics: REDIRECT, never a dead-end "denied" page. Law F3 — this is
 * UI convenience; every admin action is independently enforced by RLS /
 * has_permission on the server.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ethio.com" },
      { name: "description", content: "Administration panel for ethio.com staff." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — ethio.com" },
      { property: "og:description", content: "Administration panel for ethio.com staff." },
    ],
  }),
  component: AdminGate,
});

function AdminGate() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user } = useShell();
  const { permissions, loading } = usePermissions({ enabled: user !== null });

  const allowed = permissions.includes(ADMIN_PANEL_PERMISSION);

  useEffect(() => {
    if (loading) return;
    if (!allowed) void navigate({ to: "/", replace: true });
  }, [allowed, loading, navigate]);

  if (loading || !allowed) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
      >
        {t("admin.loading")}
      </div>
    );
  }

  return (
    <section data-testid="admin-panel-root" className="rounded-lg border border-border bg-card p-6">
      <h1 className="text-lg font-semibold text-foreground">{t("admin.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("admin.body")}</p>
    </section>
  );
}
