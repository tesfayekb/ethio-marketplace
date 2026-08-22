import { createFileRoute } from "@tanstack/react-router";

import { AdminRoleDetailPage } from "@/features/admin/roles/role-detail";

/**
 * U2 — the per-role detail route. Flat-file nesting like the users detail:
 * the /admin layout owns the permission gate and the AdminShellProvider, so
 * this file renders the body only.
 */
export const Route = createFileRoute("/admin/roles_/$roleId")({
  component: AdminRoleDetailRoute,
});

function AdminRoleDetailRoute() {
  const { roleId } = Route.useParams();
  return <AdminRoleDetailPage roleId={roleId} />;
}
