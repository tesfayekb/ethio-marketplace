import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { ListingPhotos } from "@/features/admin-listings/listing-photos";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { photoUrl } from "@/features/posting/photo-links";
import { usePhotoLinks } from "@/features/posting/use-photo-links";
import { useI18n, type MessageKey } from "@/i18n";

import {
  photoChangeErrorKey,
  reviewPhotoChange,
  usePhotoChanges,
  type PhotoChange,
  type PhotoChangeKind,
} from "./use-photo-changes";
import { ADMIN_SCREENING_KEY } from "./use-screening";

const KIND_LABEL: Record<PhotoChangeKind, MessageKey> = {
  added: "admin.screening.changes.added",
  edited: "admin.screening.changes.edited",
  removed: "admin.screening.changes.removed",
};

/**
 * Bundle 13 turn 10 — D154 B5: THE PHOTO CHANGES ON LIVE ADS.
 *
 * Every photo a seller adds, edits or removes while the ad is live is already
 * screened (an addition or an edit at upload; nothing waits for staff). Staff
 * see each change here with its warnings, oldest first: the photo (none for a
 * removal), what happened and when, and the ad (its page in Admin › Listings).
 * "Mark reviewed" (listings:review) takes the change off the list through the
 * door, which audits it; "Show photos" opens the ad's photos with Remove
 * for a person who may edit a listing (B4, the same card and door).
 */
export function PhotoChanges({
  mayReview,
  mayEnforce,
  guard,
  onNotice,
}: {
  mayReview: boolean;
  mayEnforce: boolean;
  guard: GuardFn;
  onNotice: (key: MessageKey, tone: "ok" | "error") => void;
}) {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const changes = usePhotoChanges(mayReview);
  const rows = changes.data ?? [];
  const links = usePhotoLinks(
    rows.filter((row) => row.kind !== "removed").map((row) => ({ id: row.photoId })),
  );
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  if (!mayReview) return null;

  const when = (iso: string) =>
    new Intl.DateTimeFormat(language, { dateStyle: "short", timeStyle: "short" }).format(
      new Date(iso),
    );

  const review = async (row: PhotoChange) => {
    setBusy(row.id);
    try {
      await reviewPhotoChange(row.id);
    } catch (error) {
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      console.error("[screening] review of a photo change failed", error);
      onNotice(photoChangeErrorKey(message), "error");
    } finally {
      setBusy(null);
      await queryClient.invalidateQueries({ queryKey: ADMIN_SCREENING_KEY });
    }
  };

  return (
    <PageCard testid="admin-photo-changes" className="min-w-0 space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-foreground">
          {t("admin.screening.changes.title")}
          {rows.length > 0 ? (
            <span
              className="ms-2 tabular-nums text-muted-foreground"
              data-testid="admin-photo-changes-count"
            >
              {rows.length}
            </span>
          ) : null}
        </h2>
        <p className="text-xs text-muted-foreground">{t("admin.screening.changes.hint")}</p>
      </div>

      {changes.isLoading ? <p className="text-sm">{t("common.loading")}</p> : null}
      {changes.error ? (
        <div className="flex flex-wrap items-center gap-2">
          <p role="alert" className="text-sm text-destructive">
            {t("common.error")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="touch"
            onClick={() => void changes.refetch()}
          >
            {t("common.retry")}
          </Button>
        </div>
      ) : null}
      {!changes.isLoading && !changes.error && rows.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="admin-photo-changes-empty">
          {t("admin.screening.changes.empty")}
        </p>
      ) : null}

      <ul className="min-w-0 divide-y divide-border">
        {rows.map((row) => {
          const link =
            row.kind === "removed" ? null : photoUrl({ id: row.photoId }, ["thumb", "card"], links);
          const opened = open === row.id;
          return (
            <li
              key={row.id}
              data-testid="admin-photo-change"
              data-change-id={row.id}
              data-listing-id={row.listing?.id ?? ""}
              data-kind={row.kind}
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
                    <span className="font-medium" data-testid="admin-photo-change-kind">
                      {t(KIND_LABEL[row.kind])}
                    </span>
                    <span className="text-muted-foreground"> · {when(row.createdAt)}</span>
                  </p>
                  {row.listing !== null ? (
                    <Link
                      to="/admin/listings/$listingId"
                      params={{ listingId: row.listing.id }}
                      className="block min-w-0 break-words text-sm text-foreground underline-offset-4 hover:underline"
                      data-testid="admin-photo-change-ad"
                    >
                      {row.listing.title}
                    </Link>
                  ) : null}
                  {row.codes.includes("not_relevant") ? (
                    <p className="text-xs text-foreground" data-testid="admin-photo-change-warning">
                      {t("admin.listings.photos.notRelevant")}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {row.listing !== null ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="touch"
                      aria-expanded={opened}
                      data-testid="admin-photo-change-photos"
                      onClick={() => setOpen(opened ? null : row.id)}
                    >
                      {t("admin.screening.changes.photos")}
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    size="touch"
                    disabled={busy !== null}
                    data-testid="admin-photo-change-review"
                    onClick={() => void review(row)}
                  >
                    {t("admin.screening.changes.review")}
                  </Button>
                </div>
              </div>
              {opened && row.listing !== null ? (
                <ListingPhotos
                  listingId={row.listing.id}
                  mayRemove={mayEnforce}
                  guard={guard}
                  onRemoved={(key) => onNotice(key, "ok")}
                  testid="admin-photo-change-ad-photos"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </PageCard>
  );
}

export default PhotoChanges;
