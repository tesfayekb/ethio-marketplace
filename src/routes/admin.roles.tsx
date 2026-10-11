import { createFileRoute } from "@tanstack/react-router";

import { AdminRolesList } from "@/features/admin/roles/roles-list";

export const Route = createFileRoute("/admin/roles")({
  component: AdminRolesPage,
});

/** Bundle 11 G2a — the page's heading and its line are the list's header. */
function AdminRolesPage() {
  return (
    <div data-testid="admin-section-roles">
      <AdminRolesList />
    </div>
  );
}
