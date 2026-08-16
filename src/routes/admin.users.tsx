import { createFileRoute } from "@tanstack/react-router";

import { AdminUsersList } from "@/features/admin/users/users-list";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/users")({
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
