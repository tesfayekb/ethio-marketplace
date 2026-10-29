import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminUserDetailPage } from "@/features/admin/users/user-detail";

/**
 * U1 — the per-user detail route. Flat-file nesting like every other admin
 * route (admin.users.tsx is the section index; this is its child segment).
 * The /admin layout owns the permission gate and the AdminShellProvider, so
 * this file renders the body only.
 */
export const Route = createFileRoute("/admin/users_/$userId")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "User — ethio.com Admin" },
          { name: "description", content: "User in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "User — ethio.com Admin" },
          { property: "og:description", content: "User in the ethio.com staff panel." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "head.admin.user.title",
    ),
  component: AdminUserDetailRoute,
});

function AdminUserDetailRoute() {
  const { userId } = Route.useParams();
  return <AdminUserDetailPage userId={userId} />;
}
