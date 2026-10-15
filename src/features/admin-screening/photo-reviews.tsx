import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { ListingPhotos } from "@/features/admin-listings/listing-photos";
import { ADMIN_LISTINGS_KEY } from "@/features/admin-listings/use-admin-listings";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { photoUrl } from "@/features/posting/photo-links";
import { fill, photoRefusalKey } from "@/features/posting/refusal-text";
import { usePhotoLinks } from "@/features/posting/use-photo-links";
import { useI18n, type MessageKey } from "@/i18n";

import {
  allowListingPhoto,
  photoAllowErrorKey,
  REVIEW_LABEL_KEY,
  usePhotoReviews,
  type PhotoReviewRow,
} from "./use-photo-reviews";
import { ADMIN_SCREENING_KEY } from "./use-screening";

/**
 * Bundle 16 turn 4b — D178 (the operator, 2026-10-14): "FAILED PHOTO WILL NOT GO
 * LIVE. JUST SAVE, AND ADMIN CAN FINALLY DECIDE TO REMOVE, ALLOW, OR EVEN DECLINE
 * THE WHOLE ADVERTISEMENT". THE PHOTOS KEPT HIDDEN FOR A PERSON.
 *
 * Each photo the AI check failed (never for nudity: D183), was unsure about or
 * found may not fit the ad, and each photo stored while checking was off, on an
 * ad a buyer may come to see, oldest first: the photo, why it is hidden (with the
 * check's own phrase, read as text), when, and the ad (its page in Admin ›
 * Listings, where Edit removes a photo and the ad can be declined — D169). Allow
 * (listings:review, the second factor) shows the photo to buyers; "Show photos"
 * opens all the ad's photos with their marks.
 *
 * Testids: the card `admin-photo-reviews` (`-count`, `-empty`); each row
 * `admin-photo-review` (data-photo-id, data-listing-id, data-label), its reason
 * `admin-photo-review-reason`, the phrase `admin-photo-review-evidence`, the ad
 * `admin-photo-review-ad`, Allow `admin-photo-review-allow`, Show photos
 * `admin-photo-review-photos`, a refusal `admin-photo-review-problem`.
 */
export function PhotoReviews({
  mayReview,
  guard,
  onNotice,
}: {
  mayReview: boolean;
  guard: GuardFn;
  onNotice: (key: MessageKey, tone: "ok" | "error") => void;
}) {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const reviews = usePhotoReviews(mayReview);
  const rows = reviews.data ?? [];
  const links = usePhotoLinks(rows.map((row) => ({ id: row.photoId })));
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<{ id: string; key: MessageKey } | null>(null);

  if (!mayReview) return null;

  const when = (iso: string) =>
    new Intl.DateTimeFormat(language, { dateStyle: "short", timeStyle: "short" }).format(
      new Date(iso),
    );

  const allow = async (row: PhotoReviewRow) => {
    setBusy(row.photoId);
    setProblem(null);
    try {
      await guard(() => allowListingPhoto(row.photoId));
    } catch (error) {
      setBusy(null);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor changes nothing and says nothing.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      setProblem({ id: row.photoId, key: abort ?? photoAllowErrorKey(message) });
      return;
    }
    setBusy(null);
    await Promise.all([
      refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY }),
      refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY }),
    ]);
    onNotice("admin.listings.photos.allowed", "ok");
  };

  return (
    <PageCard testid="admin-photo-reviews" className="min-w-0 space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-foreground">
          {t("admin.screening.reviews.title")}
          {rows.length > 0 ? (
            <span
              className="ms-2 tabular-nums text-muted-foreground"
              data-testid="admin-photo-reviews-count"
            >
              {rows.length}
            </span>
          ) : null}
        </h2>
        <p className="text-xs text-muted-foreground">{t("admin.screening.reviews.hint")}</p>
      </div>

      {reviews.isLoading ? <p className="text-sm">{t("common.loading")}</p> : null}
      {reviews.error ? (
        <div className="flex flex-wrap items-center gap-2">
          <p role="alert" className="text-sm text-destructive">
            {t("common.error")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="touch"
            onClick={() => void reviews.refetch()}
          >
            {t("common.retry")}
          </Button>
        </div>
      ) : null}
      {!reviews.isLoading && !reviews.error && rows.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="admin-photo-reviews-empty">
          {t("admin.screening.reviews.empty")}
        </p>
      ) : null}

      <ul className="min-w-0 divide-y divide-border">
        {rows.map((row) => {
          const link = photoUrl({ id: row.photoId }, ["thumb", "card"], links);
          const opened = open === row.photoId;
          return (
            <li
              key={row.photoId}
              data-testid="admin-photo-review"
              data-photo-id={row.photoId}
              data-listing-id={row.listing.id}
              data-label={row.label}
              className="min-w-0 space-y-2 py-3"
            >
              <div className="flex min-w-0 flex-wrap items-start gap-3">
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  {link !== null ? (
                    <img
                      src={link}
                      alt=""
                      width={64}
                      height={48}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-sm text-foreground">
                    <span className="font-medium" data-testid="admin-photo-review-reason">
                      {t(REVIEW_LABEL_KEY[row.label])}
                      {row.label === "fail" && row.code !== null
                        ? ` · ${t(photoRefusalKey(row.code))}`
                        : null}
                    </span>
                    <span className="text-muted-foreground"> · {when(row.createdAt)}</span>
                  </p>
                  {row.evidence !== null ? (
                    <p
                      className="min-w-0 break-words text-xs text-muted-foreground"
                      data-testid="admin-photo-review-evidence"
                    >
                      {fill(t("admin.listings.photos.review.evidence"), { text: row.evidence })}
                    </p>
                  ) : null}
                  <Link
                    to="/admin/listings/$listingId"
                    params={{ listingId: row.listing.id }}
                    className="block min-w-0 break-words text-sm text-foreground underline-offset-4 hover:underline"
                    data-testid="admin-photo-review-ad"
                  >
                    {row.listing.title}
                  </Link>
                  {problem !== null && problem.id === row.photoId ? (
                    <p
                      role="alert"
                      className="text-xs text-destructive"
                      data-testid="admin-photo-review-problem"
                    >
                      {t(problem.key)}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    aria-expanded={opened}
                    data-testid="admin-photo-review-photos"
                    onClick={() => setOpen(opened ? null : row.photoId)}
                  >
                    {t("admin.screening.changes.photos")}
                  </Button>
                  <Button
                    type="button"
                    size="touch"
                    disabled={busy !== null}
                    data-testid="admin-photo-review-allow"
                    onClick={() => void allow(row)}
                  >
                    {t("admin.listings.photos.allow")}
                  </Button>
                </div>
              </div>
              {/* D169 — the ad's photos with their marks; Remove is in Edit on the ad's page. */}
              {opened ? (
                <ListingPhotos
                  listingId={row.listing.id}
                  mayRemove={false}
                  mayAllow
                  guard={guard}
                  onRemoved={(key) => onNotice(key, "ok")}
                  testid="admin-photo-review-ad-photos"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </PageCard>
  );
}

export default PhotoReviews;
