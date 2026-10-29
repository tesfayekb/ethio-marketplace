import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/features/admin/legal/legal-page";
export const Route = createFileRoute("/admin/legal")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { outcome?: "discarded" | "published"; version?: number } => {
    if (search.outcome === "discarded") return { outcome: "discarded" };
    if (
      search.outcome === "published" &&
      typeof search.version === "number" &&
      Number.isInteger(search.version) &&
      search.version > 0
    )
      return { outcome: "published", version: search.version };
    return {};
  },
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.legal.description", "head.admin.legal.title", null, "Legal documents — ethio.com Admin", "Manage legal document versions and publishing facts on ethio.com.").meta,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});
