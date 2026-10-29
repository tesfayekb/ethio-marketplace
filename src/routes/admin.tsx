import { pageHead } from "@/lib/page-head";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

import { useShownPathname } from "@/components/shell/use-shown-pathname";
import { useEffect, useState } from "react";

import { useShell } from "@/components/shell-context";
import { AdminShellProvider } from "@/features/admin/admin-context";
import { sectionForPath } from "@/features/admin/sections";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { usePermissions } from "@/features/permissions/usePermissions";
import { useI18n } from "@/i18n";
import { SIGN_OUT_LANDING } from "@/lib/sign-out-landing";

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
  head: () =>
    pageHead(
      "head.site.pattern.title",
      "head.admin.panel.description",
      {
        meta: [
          { title: "Admin — ethio.com" },
          { name: "description", content: "Administration panel for ethio.com staff." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Admin — ethio.com" },
          { property: "og:description", content: "Administration panel for ethio.com staff." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "panel.admin",
    ),
  // DEC-258 — the admin screens show the admin and member strings layers; the
  // shell's gate loads both before this layout draws.
  staticData: { strings: ["admin", "member"] },
  component: AdminGate,
});

function AdminGate() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user, authLoading } = useShell();
  const { permissions, loading } = usePermissions({ enabled: user !== null });
  const pending = authLoading || loading;

  // INC-581 — the admin section follows the page the body shows.
  const pathname = useShownPathname();
  const section = sectionForPath(pathname);

  /**
   * U0j (INC-072) — LIVE guard, not a mount check. `user` comes from the
   * shell's onAuthStateChange subscription, so a sign-out in this tab, in
   * another tab, or a token expiry flips it to null and the admin body is
   * replaced by the marketplace at once. Law F3: UI convenience only; RLS /
   * has_permission remain the authority.
   */
  const signedOut = !authLoading && user === null;
  const allowed = !signedOut && permissions.includes(ADMIN_PANEL_PERMISSION);
  /** Deep-link guard: the section route resolves only with its permission. */
  const sectionAllowed = section === null || permissions.includes(section.permission);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (pending) return;
    if (!allowed) {
      // The landing is shared by design (DEC-279, turn C2's ruling 1): a signed-out visitor and a
      // signed-in one without the admin permission go to the same page — if the sign-out landing
      // ever moves, a signed-out visitor on /admin must follow it.
      void navigate({ to: SIGN_OUT_LANDING, replace: true });
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
  if (pending || signedOut || !allowed || !sectionAllowed) {
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
