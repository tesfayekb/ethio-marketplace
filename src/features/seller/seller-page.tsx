import { useEffect, useRef } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { ListingCard } from "@/components/marketplace/listing-card";
import { Button } from "@/components/ui/button";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { fill } from "@/features/posting/refusal-text";
import { SellerLine } from "@/features/posting/seller-line";
import { useI18n } from "@/i18n";

import { useSellerFeed } from "./use-seller-feed";

/**
 * Bundle 19 turn 17 — the seller's ads page, ethio.com/<name> (DEC-108). The key
 * is the seller's alias lower-cased, never an id. The grid and cards are the
 * feed's own (src/components/marketplace/feed.tsx): three a row on a phone,
 * four from 640 px, five from 1024 px; the next page loads when the end of the
 * list comes into view. Every state is visible (F4): loading, not found,
 * empty, and error with Retry.
 */
export function SellerPage({ sellerKey }: { sellerKey: string }) {
  const { t } = useI18n();
  const { seller, cards, hasMore, isLoading, isLoadingMore, error, notFound, loadMore, retry } =
    useSellerFeed(sellerKey);

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
        <p role="alert" data-testid="seller-page-error">
          {t("sellerPage.failed")}
        </p>
        <Button
          type="button"
          className="mt-4 min-h-11"
          data-testid="seller-page-retry"
          onClick={retry}
        >
          {t("common.retry")}
        </Button>
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
      <h1
        data-testid="seller-page-title"
        className="text-xl font-semibold text-foreground wrap-anywhere"
      >
        {fill(t("sellerPage.title"), { name })}
      </h1>
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
      {isLoadingMore ? (
        <p className="mt-4 text-sm text-muted-foreground">{t("feed.loading")}</p>
      ) : null}
    </PageShell>
  );
}
