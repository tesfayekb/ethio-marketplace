import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminRolesList } from "@/features/admin/roles/roles-list";

export const Route = createFileRoute("/admin/roles")({
  head: () => pageHead("head.admin.pattern.title", "head.admin.pattern.description", {
    meta: [
      { title: "Roles & Permissions — ethio.com Admin" },
      { name: "description", content: "Roles & Permissions in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Roles & Permissions — ethio.com Admin" },
      { property: "og:description", content: "Roles & Permissions in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }, "admin.section.roles.title"),
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
