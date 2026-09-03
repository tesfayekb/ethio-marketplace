import { createFileRoute } from "@tanstack/react-router";

import { AdminCategoriesPage } from "@/features/admin-categories/categories-page";

/**
 * C2-UI — the Categories section. The /admin layout owns the `categories:view`
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/categories")({
  component: AdminCategoriesRoute,
});

function AdminCategoriesRoute() {
  return <AdminCategoriesPage />;
}
