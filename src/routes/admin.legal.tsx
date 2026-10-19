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
      { title: "Legal documents — ethio.com Admin" },
      {
        name: "description",
        content: "Manage legal document versions and publishing facts on ethio.com.",
      },
      { property: "og:title", content: "Legal documents — ethio.com Admin" },
      {
        property: "og:description",
        content: "Manage legal document versions and publishing facts on ethio.com.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});
