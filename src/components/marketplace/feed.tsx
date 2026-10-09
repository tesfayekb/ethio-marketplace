import { useEffect, useRef, type ReactNode } from "react";

import { useShell, type LocationNode } from "@/components/shell-context";
import { WovenMark } from "@/components/brand/logo";
import { Spinner } from "@/components/brand/spinner";
import { ListingCard } from "@/components/marketplace/listing-card";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { feedSections } from "@/features/feed/feed-page";
import { useFeed } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

/** Today's in-panel error block (Law F4: a soft failure stays VISIBLE). */
function FeedError({
  testid,
  retryTestid,
  onRetry,
}: {
  testid: string;
  retryTestid?: string;
  onRetry: () => void;
}) {
  const { t } = useI18n();
  return (
    <div
      role="alert"
      data-testid={testid}
      className="mb-4 rounded-lg border border-border bg-card p-6 text-center"
    >
      <h2 className="text-base font-semibold text-foreground">{t("feed.errorTitle")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("feed.errorBody")}</p>
      <Button type="button" className="mt-4 min-h-11" data-testid={retryTestid} onClick={onRetry}>
        {t("common.retry")}
      </Button>
    </div>
  );
}

/**
 * Bundle 10 E3b — the listings page: one page of cards at a time from
 * /api/feed, in the server's order (D108), for the place the location row
 * shows. Wider places are named above their listings; the next page loads
 * when the end of the list comes into view.
 */
export function Feed() {
  const { t, entities } = useI18n();
  const { selectedCategoryId, categoryLookup, locationPath, feedInputsReady } = useShell();
  const place: LocationNode | null = locationPath[locationPath.length - 1] ?? null;
  const placeId = place?.id ?? null;
  const { cards, ladder, hasMore, isLoading, isLoadingMore, error, moreError, loadMore, retry } =
    useFeed({
      categoryId: selectedCategoryId,
      placeId,
      enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found"),
    });

  const nameOf = (node: LocationNode) =>
    entityName("location", { id: node.id, nameEn: node.name_en, nameAm: node.name_am }, entities);
  const headingFor = (node: LocationNode) => t("feed.heading").replace("{location}", nameOf(node));

  const moreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const target = moreRef.current;
    if (!target || !hasMore || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const sections = feedSections(cards, ladder);

  let body: ReactNode;
  if (categoryLookup === "missing") {
    body = (
      <PageCard
        testid="feed-category-unknown"
        className="mx-auto flex w-full flex-col items-center p-10 text-center"
      >
        <h2 className="text-base font-semibold text-foreground">{t("error.pageNotFound")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("error.pageNotFoundBody")}</p>
      </PageCard>
    );
  } else if (categoryLookup === "failed") {
    body = <FeedError testid="feed-category-failed" onRetry={() => window.location.reload()} />;
  } else if (isLoading) {
    body = (
      <div className="flex justify-center py-12">
        <Spinner label={t("feed.loading")} />
      </div>
    );
  } else if (error) {
    body = <FeedError testid="feed-error" retryTestid="feed-retry" onRetry={retry} />;
  } else if (cards.length === 0) {
    body = (
      <PageCard
        testid="feed-empty"
        className="mx-auto flex w-full flex-col items-center p-10 text-center"
      >
        {/* Allowed motif placement: logo, spinner, empty state. */}
        <WovenMark className="h-10 w-10" />
        <h2 className="mt-4 text-base font-semibold text-foreground">{t("feed.emptyTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("feed.emptyBody")}</p>
      </PageCard>
    );
  } else {
    body = (
      <>
        {(cards[0]?.step ?? 1) > 1 ? (
          <p data-testid="feed-step-none" className="mb-4 text-sm text-muted-foreground">
            {t("feed.emptyTitle")}
          </p>
        ) : null}
        {sections.map((section) => {
          let label: string | null = null;
          if (section.label?.kind === "all") label = t("nav.allListings");
          else if (section.label?.kind === "place") {
            const id = section.label.placeId;
            const node = locationPath.find((n) => n.id === id);
            label = node ? headingFor(node) : null;
          }
          return (
            <section
              key={`${section.step}-${section.cards[0]?.id ?? ""}`}
              data-testid="feed-section"
              data-step={section.step}
              className="mt-6 first:mt-0"
            >
              {label !== null ? (
                <h2
                  data-testid="feed-step-label"
                  className="mb-3 text-base font-semibold text-foreground"
                >
                  {label}
                </h2>
              ) : null}
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.cards.map((listing) => (
                  <li key={listing.id}>
                    <ListingCard listing={listing} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {hasMore ? (
          <div ref={moreRef} data-testid="feed-more" className="mt-6 flex min-h-11 justify-center">
            {moreError ? (
              <FeedError testid="feed-more-error" onRetry={retry} />
            ) : isLoadingMore ? (
              <Spinner label={t("feed.loading")} />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }

  return (
    // INC-044: the body column is centred with EQUAL left/right gutters.
    <section
      data-testid="feed-container"
      data-ready={feedInputsReady ? "1" : "0"}
      className="mx-auto w-full max-w-6xl"
    >
      <h1 className="text-xl font-semibold text-foreground">
        {place ? headingFor(place) : t("feed.heading").replace("{location}", t("feed.scopeAll"))}
      </h1>

      <div className="mt-4">{body}</div>
    </section>
  );
}

export default Feed;
