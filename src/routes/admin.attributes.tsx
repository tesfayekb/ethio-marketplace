import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminAttributesPage } from "@/features/admin-attributes/attributes-page";

/**
 * C3-UX-1 PART B — THE LIBRARY FILTER LIVES IN THE URL.
 *
 * `?category=<slug>` is the single parse point (the translations console's law,
 * U2a/INC-073 lineage): a filtered library is shareable, reloadable and
 * back-button correct, never private component state.
 */
export const Route = createFileRoute("/admin/attributes")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.attributes.title",
        null,
        "Attributes — ethio.com Admin",
        "Attributes in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    const category = typeof search["category"] === "string" ? search["category"].trim() : "";
    return category === "" ? {} : { category };
  },
  component: AdminAttributesPage,
});
