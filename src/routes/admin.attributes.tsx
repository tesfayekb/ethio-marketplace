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
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    const category = typeof search["category"] === "string" ? search["category"].trim() : "";
    return category === "" ? {} : { category };
  },
  component: AdminAttributesPage,
});
