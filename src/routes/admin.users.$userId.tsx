import { createFileRoute } from "@tanstack/react-router";

import { AdminUserDetailPage } from "@/features/admin/users/user-detail";

/**
 * U1 — the per-user detail route. Flat-file nesting like every other admin
 * route (admin.users.tsx is the section index; this is its child segment).
 * The /admin layout owns the permission gate and the AdminShellProvider, so
 * this file renders the body only.
 */
export const Route = createFileRoute("/admin/users/$userId")({
  component: AdminUserDetailRoute,
});

function AdminUserDetailRoute() {
  const { userId } = Route.useParams();
  return <AdminUserDetailPage userId={userId} />;
}
