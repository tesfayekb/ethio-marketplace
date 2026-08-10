import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/roles")({
  component: AdminRolesPage,
});

function AdminRolesPage() {
  return <AdminSectionPage id="roles" />;
}
