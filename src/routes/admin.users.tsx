import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminUsersList } from "@/features/admin/users/users-list";

/**
 * U2a / INC-073 law — the role filter lives in the URL, so "View members" on a
 * role can deep-link straight into a preselected list. Search and status stay
 * component state for now (queued in docs/features/admin-roles.md).
 */
export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.users.title",
        null,
        "Users — ethio.com Admin",
        "Users in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { role?: string } => {
    const role = typeof search["role"] === "string" ? search["role"].trim() : "";
    return role && role !== "all" ? { role } : {};
  },
  component: AdminUsersPage,
});

/** Bundle 11 G2a — the page's heading is the list's header (TableActions). */
function AdminUsersPage() {
  return (
    <div data-testid="admin-section-users">
      <AdminUsersList />
    </div>
  );
}
