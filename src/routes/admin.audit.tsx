import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminAuditPage } from "@/features/admin/audit/audit-page";

/**
 * U3 — the Audit & Security section. The /admin layout owns the permission
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.audit.title",
        null,
        "Audit & Security — ethio.com Admin",
        "Audit & Security in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAuditRoute,
});

function AdminAuditRoute() {
  return <AdminAuditPage />;
}
