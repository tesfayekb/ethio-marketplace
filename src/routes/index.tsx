import { createFileRoute } from "@tanstack/react-router";

import { Feed } from "@/components/marketplace/feed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ethio.com — Ethiopia's marketplace" },
      {
        name: "description",
        content: "Browse listings from sellers near you. Free to post, free to browse.",
      },
      { property: "og:title", content: "ethio.com — Ethiopia's marketplace" },
      {
        property: "og:description",
        content: "Browse listings from sellers near you. Free to post, free to browse.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Feed />;
}
