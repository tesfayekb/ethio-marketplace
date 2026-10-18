import { CARD_SURFACE } from "@/components/layout/surface";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { useShell, type LocationNode } from "@/components/shell-context";
import { Spinner } from "@/components/brand/spinner";
import { InviteCard, type Invite } from "@/components/marketplace/invite-card";
import { ListingCard } from "@/components/marketplace/listing-card";
import { PageCard } from "@/components/shell/page-card";
import { Star } from "lucide-react";
import { useFavouriteCategory } from "@/components/shell/app-rail";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCategoryTree } from "@/features/categories/category-tree";
import { feedSections, inviteSpot, placeCount, type InviteSpot } from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
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
    <div role="alert" data-testid={testid} className={cn(CARD_SURFACE, "mb-4 p-6 text-center")}>
      <h2 className="text-base font-semibold text-foreground">{t("feed.errorTitle")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("feed.errorBody")}</p>
      <Button type="button" className="mt-4 min-h-11" data-testid={retryTestid} onClick={onRetry}>
        {t("common.retry")}
      </Button>
    </div>
  );
}

/**
 * D119 — nothing in the chosen place: its invitation comes first, alone in the
 * place's row — whether wider places follow or nothing exists anywhere (the
 * operator's walk, 2026-10-09).
 */
function InviteFirst({ invite, at }: { invite: Invite; at: InviteSpot }) {
  return (
    <section data-testid="feed-section" data-step="1" className="mt-6 first:mt-0">
      <ul className="grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
        <li>
          <InviteCard invite={invite} at={at} />
        </li>
      </ul>
    </section>
  );
}

/**
 * D123 (operator, 2026-10-10) — three cards a row on a phone, four from 640 px,
 * five from 1024 px; the card compacts itself below 11rem (listing-card.tsx).
 *
 * Bundle 10 E3b — the listings page: one page of cards at a time from
 * /api/feed, in the server's order (D108), for the place the location row
 * shows. Every heading says "in": the chosen place's own listings are "in" it,
 * and each wider place is headed "in" that place by name (D127, which replaced
 * D125's "near"); the next page loads when the end of the list comes into view.
 */
export function Feed() {
  const { t, entities } = useI18n();
  const favourite = useFavouriteCategory();
  const { selectedCategoryId, categoryLookup, locationPath, feedInputsReady } = useShell();
  const place: LocationNode | null = locationPath[locationPath.length - 1] ?? null;
  const placeId = place?.id ?? null;
  const {
    cards,
    ladder,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    moreError,
    loadMore,
    retry,
    coverLinks,
  } = useFeed({
    categoryId: selectedCategoryId,
    placeId,
    enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found"),
  });

  const nameOf = (node: LocationNode) =>
    entityName("location", { id: node.id, nameEn: node.name_en, nameAm: node.name_am }, entities);
  // D127 (the operator, 2026-10-10): "in" at every level — a posting in one city is not
  // "near" another city of the same country (INC-534, D125 before it).
  const inHeading = (node: LocationNode) => t("feed.headingIn").replace("{location}", nameOf(node));

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
  // INC-606 — each card's cover photo, at card size. DEC-195 — the links the
  // feed's answer already signed are the preset; only the rest are asked for.
  const coverOf = useCardPhotos(cards, coverLinks);

  const { tree } = useCategoryTree();
  const categoryNode =
    selectedCategoryId === null ? null : (tree.byId.get(selectedCategoryId) ?? null);
  // D119 / D215 — the invitation is on every list, place or none; on a category
  // page it waits for the category's name rather than drawing a sentence without it.
  const spot = inviteSpot(cards, place !== null, hasMore);
  const invite: Invite | null =
    selectedCategoryId === null || categoryNode !== null
      ? {
          placeId: place?.id ?? null,
          placeName: place ? nameOf(place) : null,
          categoryId: selectedCategoryId,
          categoryName:
            categoryNode === null ? null : entityName("category", categoryNode, entities),
          placeCount: place ? placeCount(cards) : cards.length,
        }
      : null;
  const favouriteOn = categoryNode !== null && favourite.slug === categoryNode.slug;
  const hint =
    categoryNode === null
      ? ""
      : t(favouriteOn ? "shell.favouriteIs" : "shell.favouriteHint").replace(
          "{category}",
          entityName("category", categoryNode, entities),
        );
  const hintId = useId();
  const firstStep = cards[0]?.step ?? 1;

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
  } else if (cards.length === 0 && invite !== null) {
    // D215 — an empty list shows the invitation alone; the old empty box is retired.
    body = <InviteFirst invite={invite} at="alone" />;
  } else if (cards.length === 0) {
    // The category's name is still loading: the card waits for it.
    body = (
      <div className="flex justify-center py-12">
        <Spinner label={t("feed.loading")} />
      </div>
    );
  } else {
    body = (
      <>
        {/* D119 — the note is the fallback for a place with none and no card. */}
        {firstStep > 1 && invite === null ? (
          <p data-testid="feed-step-none" className="mb-4 text-sm text-muted-foreground">
            {t("feed.emptyTitle")}
          </p>
        ) : null}
        {/* D119 — nothing in the chosen place: its invitation comes first. */}
        {spot === "lead" && invite !== null ? <InviteFirst invite={invite} at="lead" /> : null}
        {sections.map((section, sectionIndex) => {
          let label: string | null = null;
          if (section.label?.kind === "all") label = t("nav.allListings");
          else if (section.label?.kind === "place") {
            const id = section.label.placeId;
            const node = locationPath.find((n) => n.id === id);
            label = node ? inHeading(node) : null;
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
              <ul className="grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
                {section.cards.map((listing, index) => (
                  <li key={listing.id}>
                    {/* DEC-195 — the first six cards of a grid load at once. */}
                    <ListingCard
                      listing={listing}
                      photoUrl={coverOf(listing.coverPhotoId)}
                      priority={index < 6}
                    />
                  </li>
                ))}
                {invite !== null &&
                ((spot === "afterPlace" && section.step === 1 && sectionIndex === 0) ||
                  (spot === "end" && sectionIndex === sections.length - 1)) ? (
                  <li key="invite">
                    <InviteCard invite={invite} at={spot} />
                  </li>
                ) : null}
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
      <div className="flex min-w-0 flex-wrap items-center gap-x-2">
        <h1 className="min-w-0 text-xl font-semibold text-foreground wrap-anywhere">
          {/* D127 — no place chosen: the everywhere feed is "All listings", not "near you". */}
          {place ? inHeading(place) : t("nav.allListings")}
        </h1>
        {categoryNode ? (
          <div className="flex min-w-0 items-center">
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="touch"
                    data-testid="category-favourite"
                    aria-pressed={favouriteOn}
                    aria-label={t(favouriteOn ? "shell.favouriteRemove" : "shell.favouriteAdd")}
                    aria-describedby={hintId}
                    className="w-11 shrink-0 p-0 [&_svg]:size-5"
                    onClick={() => favourite.set(favouriteOn ? null : categoryNode.slug)}
                  >
                    <Star aria-hidden="true" className={cn(favouriteOn && "fill-gold text-gold")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent data-testid="category-favourite-tip" side="bottom">
                  {hint}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span
              id={hintId}
              data-testid="category-favourite-hint"
              className="min-w-0 truncate text-xs text-muted-foreground md:pointer-fine:hidden"
            >
              {hint}
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-4">{body}</div>
    </section>
  );
}

export default Feed;
