import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return <AdminSectionPage id="users" />;
}
