import { createFileRoute } from "@tanstack/react-router";

import { AdminUsersList } from "@/features/admin/users/users-list";
import { useI18n } from "@/i18n";

/**
 * U2a / INC-073 law — the role filter lives in the URL, so "View members" on a
 * role can deep-link straight into a preselected list. Search and status stay
 * component state for now (queued in docs/features/admin-roles.md).
 */
export const Route = createFileRoute("/admin/users")({
  validateSearch: (search: Record<string, unknown>): { role?: string } => {
    const role = typeof search["role"] === "string" ? search["role"].trim() : "";
    return role && role !== "all" ? { role } : {};
  },
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const { t } = useI18n();
  return (
    <div data-testid="admin-section-users">
      <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
        {t("admin.users.title")}
      </h1>
      <div className="mt-4">
        <AdminUsersList />
      </div>
    </div>
  );
}
