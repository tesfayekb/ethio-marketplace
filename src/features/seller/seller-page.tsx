import { useEffect, useRef, useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { PageGuide, type BlockGuideSpec, type GuidePart } from "@/components/shell/page-guide";
import { ListingCard } from "@/components/marketplace/listing-card";
import { Button } from "@/components/ui/button";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { fill } from "@/features/posting/refusal-text";
import { SellerLine } from "@/features/posting/seller-line";
import { useI18n } from "@/i18n";

import { useSellerFeed } from "./use-seller-feed";
import { FailureNotice } from "@/components/shell/failure-notice";

/**
 * Bundle 19 turn 17 — the seller's ads page, ethio.com/<name> (DEC-108). The key
 * is the seller's alias lower-cased, never an id. The grid and cards are the
 * feed's own (src/components/marketplace/feed.tsx): three a row on a phone,
 * four from 640 px, five from 1024 px; the next page loads when the end of the
 * list comes into view. Every state is visible (F4): loading, not found,
 * empty, and error with Retry.
 */
/**
 * P-1c turn (b) (D315) — the seller page's Guide: the seller line and the ads;
 * texts under `sellerPage.guide.*` in the guide layer; next: all listings.
 */
const GUIDE: BlockGuideSpec = { prefix: "sellerPage", next: { to: "/" } };
const GUIDE_PARTS: readonly GuidePart[] = [{ key: "seller" }, { key: "ads" }];

export function SellerPage({ sellerKey }: { sellerKey: string }) {
  const { t } = useI18n();
  const {
    seller,
    cards,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    moreError,
    notFound,
    loadMore,
    retry,
  } = useSellerFeed(sellerKey);
  const [noObserver, setNoObserver] = useState(false);
  useEffect(() => setNoObserver(typeof IntersectionObserver === "undefined"), []);

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

  // INC-606 — each card's cover photo, at card size.
  const coverOf = useCardPhotos(cards);

  if (notFound) {
    return (
      <PageShell as="main" width="wide">
        <p data-testid="seller-page-not-found">{t("sellerPage.notFound")}</p>
      </PageShell>
    );
  }
  if (error) {
    return (
      <PageShell as="main" width="wide">
        <FailureNotice
          error={null}
          testid="seller-page-error"
          retryTestid="seller-page-retry"
          subject={t("sellerPage.failed")}
          onRetry={retry}
        />
      </PageShell>
    );
  }
  if (isLoading || seller === null) {
    return (
      <PageShell as="main" width="wide">
        <p data-testid="seller-page-loading">{t("feed.loading")}</p>
      </PageShell>
    );
  }

  const name = seller.businessName ?? seller.alias ?? "";
  return (
    <PageShell as="main" width="wide">
      <div className="flex items-start justify-between gap-2">
        <h1
          data-testid="seller-page-title"
          className="text-xl font-semibold text-foreground wrap-anywhere"
        >
          {fill(t("sellerPage.title"), { name })}
        </h1>
        {/* D315 — the page's Guide closes the row that carries the page's name. */}
        <PageGuide
          spec={GUIDE}
          title={fill(t("sellerPage.title"), { name })}
          parts={GUIDE_PARTS}
          className="shrink-0"
        />
      </div>
      <div className="mt-2">
        <SellerLine
          alias={seller.alias}
          businessName={seller.businessName}
          previousAlias={null}
          memberSince={seller.memberSince}
          testId="seller-page"
        />
      </div>
      {cards.length === 0 ? (
        <p data-testid="seller-page-empty" className="mt-6 text-sm text-muted-foreground">
          {t("sellerPage.empty")}
        </p>
      ) : (
        <ul className="mt-6 grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {cards.map((listing, index) => (
            <li key={listing.id} data-testid="seller-page-card">
              <ListingCard
                listing={listing}
                photoUrl={coverOf(listing.coverPhotoId)}
                priority={index < 6}
              />
            </li>
          ))}
        </ul>
      )}
      <div ref={moreRef} aria-hidden className="h-px" />
      {moreError ? (
        <FailureNotice
          error={null}
          testid="seller-page-more-error"
          className="mt-4"
          subject={t("sellerPage.failed")}
          onRetry={retry}
        />
      ) : isLoadingMore ? (
        <p className="mt-4 text-sm text-muted-foreground">{t("feed.loading")}</p>
      ) : hasMore && noObserver ? (
        <Button
          type="button"
          variant="outline"
          size="touch"
          className="mt-4"
          data-testid="seller-page-show-more"
          onClick={loadMore}
        >
          {t("failure.showMore")}
        </Button>
      ) : null}
    </PageShell>
  );
}
