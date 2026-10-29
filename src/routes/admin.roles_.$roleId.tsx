import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminRoleDetailPage } from "@/features/admin/roles/role-detail";

/**
 * U2 — the per-role detail route. Flat-file nesting like the users detail:
 * the /admin layout owns the permission gate and the AdminShellProvider, so
 * this file renders the body only.
 */
export const Route = createFileRoute("/admin/roles_/$roleId")({
  head: () => pageHead("head.admin.pattern.title", "head.admin.pattern.description", {
    meta: [
      { title: "Role — ethio.com Admin" },
      { name: "description", content: "Role in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Role — ethio.com Admin" },
      { property: "og:description", content: "Role in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }, "head.admin.role.title"),
  component: AdminRoleDetailRoute,
});

function AdminRoleDetailRoute() {
  const { roleId } = Route.useParams();
  return <AdminRoleDetailPage roleId={roleId} />;
}
