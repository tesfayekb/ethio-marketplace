import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Feed } from "@/components/marketplace/feed";
import { useI18n } from "@/i18n";

/**
 * U0l (INC-073) — CATEGORY = ROUTE. A category selection is a URL, never bare
 * client state: the body, the breadcrumb and the rail highlight all read the
 * slug from here, so they can never disagree again.
 */
export const Route = createFileRoute("/c/$slug")({
  head: () => ({
    meta: [
      ...pageHead("head.site.pattern.title", "head.category.description", "head.category.title").meta,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryFeed,
});

function CategoryFeed() {
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
