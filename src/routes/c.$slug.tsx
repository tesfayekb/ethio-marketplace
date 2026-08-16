import { createFileRoute } from "@tanstack/react-router";

import { Feed } from "@/components/marketplace/feed";

/**
 * U0l (INC-073) — CATEGORY = ROUTE. A category selection is a URL, never bare
 * client state: the body, the breadcrumb and the rail highlight all read the
 * slug from here, so they can never disagree again.
 */
export const Route = createFileRoute("/c/$slug")({
  head: () => ({
    meta: [
      { title: "Category — ethio.com" },
      {
        name: "description",
        content: "Browse listings in this category from sellers near you.",
      },
      { property: "og:title", content: "Category — ethio.com" },
      {
        property: "og:description",
        content: "Browse listings in this category from sellers near you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryFeed,
});

function CategoryFeed() {
  return <Feed />;
}
