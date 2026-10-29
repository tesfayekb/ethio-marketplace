import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminRolesList } from "@/features/admin/roles/roles-list";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.roles.title",
        null,
        "Roles & Permissions — ethio.com Admin",
        "Roles & Permissions in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
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
