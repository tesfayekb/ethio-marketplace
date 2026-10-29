import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminAiPage } from "@/features/admin-ai/ai-page";

/**
 * Bundle 13 turn 5 (D158) — Admin › Services › AI. The /admin layout owns the
 * `services:view` gate; the one write re-checks `services:manage` and step-up
 * inside its door (F3).
 */
export const Route = createFileRoute("/admin/ai")({
  head: () => pageHead("head.admin.pattern.title", "head.admin.pattern.description", {
    meta: [
      { title: "AI — ethio.com Admin" },
      { name: "description", content: "AI in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "AI — ethio.com Admin" },
      { property: "og:description", content: "AI in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }, "admin.section.ai.title"),
  component: AdminAiRoute,
});

function AdminAiRoute() {
  return <AdminAiPage />;
}
