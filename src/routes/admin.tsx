import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useShell } from "@/components/app-shell";
import { AdminShellProvider } from "@/features/admin/admin-context";
import { sectionForPath } from "@/features/admin/sections";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { usePermissions } from "@/features/permissions/usePermissions";
import { useI18n } from "@/i18n";

/**
 * The admin LAYOUT (Phase U0). This route file IS the admin chunk: it is the
 * only place outside src/features/permissions that may import the permission
 * seam (scripts/check-browse-imports.sh), so it reads permissions once — the
 * same cached read the shell already made — and hands them to the section tree
 * through AdminShellProvider.
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
  const { user, authLoading } = useShell();
  const { permissions, loading } = usePermissions({ enabled: user !== null });
  const pending = authLoading || loading;

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const section = sectionForPath(pathname);

  const allowed = permissions.includes(ADMIN_PANEL_PERMISSION);
  /** Deep-link guard: the section route resolves only with its permission. */
  const sectionAllowed = section === null || permissions.includes(section.permission);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (pending) return;
    if (!allowed) {
      void navigate({ to: "/", replace: true });
      return;
    }
    if (!sectionAllowed) {
      setAccessDenied(true);
      void navigate({ to: "/admin", replace: true });
    }
  }, [allowed, sectionAllowed, pending, navigate]);

  /** Clear the notice once the user moves on to a section they may see. */
  useEffect(() => {
    if (section !== null && sectionAllowed) setAccessDenied(false);
  }, [section, sectionAllowed]);

  // No flash of sections while the permission read settles.
  if (pending || !allowed || !sectionAllowed) {
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
    <AdminShellProvider permissions={permissions} accessDenied={accessDenied}>
      {/* U0b (INC-069): section navigation lives in the SHELL rail/drawer like
          every sibling panel — this route renders only the section body. */}
      <div data-testid="admin-panel-root" className="min-w-0">
        <Outlet />
      </div>
    </AdminShellProvider>
  );
}
