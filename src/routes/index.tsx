import { createFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Feed } from "@/components/marketplace/feed";
import { useI18n } from "@/i18n";

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
  const { t } = useI18n();
  // D234 S6 — the feed reads the server's first page as the page streams: the shell
  // is sent at once, the feed's cards follow in the same response.
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <Spinner label={t("feed.loading")} />
        </div>
      }
    >
      <Feed />
    </Suspense>
  );
}
