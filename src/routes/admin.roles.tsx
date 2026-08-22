import { createFileRoute } from "@tanstack/react-router";

import { AdminRolesList } from "@/features/admin/roles/roles-list";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/roles")({
  component: AdminRolesPage,
});

function AdminRolesPage() {
  const { t } = useI18n();
  return (
    <div data-testid="admin-section-roles">
      <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
        {t("admin.roles.title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("admin.roles.subtitle")}</p>
      <div className="mt-4">
        <AdminRolesList />
      </div>
    </div>
  );
}
