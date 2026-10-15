import { useQueryClient } from "@tanstack/react-query";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import {
  allowListingPhoto,
  photoAllowErrorKey,
  REVIEW_LABEL_KEY,
} from "@/features/admin-screening/use-photo-reviews";
import { ADMIN_SCREENING_KEY, useScreeningPhotos } from "@/features/admin-screening/use-screening";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { photoUrl } from "@/features/posting/photo-links";
import { heldWithAd, type DraftPhotoRow } from "@/features/posting/posting-service";
import { fill, photoRefusalKey } from "@/features/posting/refusal-text";
import { usePhotoLinks } from "@/features/posting/use-photo-links";
import { useI18n, type MessageKey } from "@/i18n";

import { GROUP_LABEL } from "./history";
import { moveProblem } from "./move-reasons";
import { PHOTO_REASONS, photoRemoveErrorKey } from "./photo-remove";
import { ReasonNote } from "./reason-note";
import { undoRefusalGroups } from "./undo-edit";
import { editAdminListing, type AdminEditAnswer } from "./use-admin-listing";
import { ADMIN_LISTINGS_KEY } from "./use-admin-listings";

/**
 * Bundle 13 turn 8 (D154 B4, the operator's spec of 2026-10-13: "Staff can also
 * remove a photo") — A LISTING'S PHOTOS, EACH WITH REMOVE, for staff.
 *
 * Shown on the listing's page (Admin › Listings) and in Screening's Preview as
 * buyer. Every stored photo is a thumbnail in the seller's order (the first is
 * the cover); a photo held while photo screening was off carries its mark (D158).
 * Remove is drawn only for a person who may edit the listing (`mayRemove`: the
 * page decides it from listings:enforce, never the admin's own listing or a
 * removed one — the door decides again, F3). It opens a dialog: the photo, the
 * reason (`PHOTO_REASONS`) and a note for the seller (required for Other), then
 * the second factor and the door. The door's refusal is said in the dialog,
 * which stays open (F4). Done: the dialog closes, the listing and its photos are
 * read again, and `onRemoved` gives the page its line.
 *
 * Testids, from `testid`: the card `<testid>`, each photo `<testid>-item`
 * (data-photo-id), its Remove `<testid>-remove`; the dialog
 * `listing-photo-remove-dialog`, the reasons `listing-photo-remove-reason-<reason>`,
 * the note `listing-photo-remove-note`, the problem line
 * `listing-photo-remove-problem`, Cancel `listing-photo-remove-cancel`, Remove
 * photo `listing-photo-remove-confirm`.
 *
 * Bundle 16 turn 4b (D178) — a photo kept hidden for a person carries its reason
 * (`<testid>-review`, data-label; the check's own phrase in `<testid>-evidence`)
 * and, for a person who may decide (`mayAllow`: listings:review, never the admin's
 * own ad — the door decides again), Allow (`<testid>-allow`): the second factor,
 * then `admin_allow_listing_photo`, which shows the photo to buyers. A refusal is
 * said under the photo (`<testid>-allow-problem`).
 */
export function ListingPhotos({
  listingId,
  mayRemove,
  mayAllow = false,
  guard,
  onRemoved,
  testid = "listing-photos",
}: {
  listingId: string;
  mayRemove: boolean;
  /** Bundle 16 turn 4b (D178) — staff who may show a photo kept hidden for review. */
  mayAllow?: boolean;
  guard: GuardFn;
  /** The page's line after a change (a removal, or an allowed photo). */
  onRemoved: (key: MessageKey) => void;
  testid?: string;
}) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const photos = useScreeningPhotos(listingId);
  const rows = photos.data ?? [];
  const links = usePhotoLinks(rows);
  const [removing, setRemoving] = useState<{ row: DraftPhotoRow; index: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [refusal, setRefusal] = useState<string | null>(null);
  const [allowing, setAllowing] = useState<string | null>(null);
  const [allowProblem, setAllowProblem] = useState<{ id: string; key: MessageKey } | null>(null);

  if (rows.length === 0) return null;

  // Bundle 16 turn 4b (D178) — show one photo kept hidden for review.
  const allow = async (row: DraftPhotoRow) => {
    setAllowing(row.id);
    setAllowProblem(null);
    try {
      await guard(() => allowListingPhoto(row.id));
    } catch (error) {
      setAllowing(null);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor changes nothing and says nothing.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      setAllowProblem({ id: row.id, key: abort ?? photoAllowErrorKey(message) });
      return;
    }
    setAllowing(null);
    await Promise.all([
      refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY }),
      refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY }),
    ]);
    onRemoved("admin.listings.photos.allowed");
  };

  const run = async (reason: string, note: string) => {
    if (removing === null) return;
    setBusy(true);
    setRefusal(null);
    let answer: AdminEditAnswer;
    try {
      answer = await guard(() =>
        editAdminListing(listingId, { remove_photos: [removing.row.id] }, reason, note),
      );
    } catch (error) {
      setBusy(false);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor leaves the dialog open, as it was.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      setRefusal(t(abort ?? photoRemoveErrorKey(message)));
      return;
    }
    setBusy(false);
    // F4 — the listing no longer meets today's rules elsewhere: said here, nothing written.
    if (!answer.ok) {
      const groups = undoRefusalGroups(answer.refusals);
      setRefusal(
        t("admin.listings.photos.refused").replace(
          "{fields}",
          (groups.length > 0 ? groups : (["other"] as const))
            .map((group) => t(GROUP_LABEL[group]))
            .join(", "),
        ),
      );
      return;
    }
    setRemoving(null);
    await Promise.all([
      refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY }),
      refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY }),
    ]);
    onRemoved("admin.listings.photos.done");
  };

  // D171 — the console's card heading (FormSection's), and under it, where Remove is
  // offered, what Remove does; two photos a row on a phone, so each Remove is a full word.
  return (
    <PageCard testid={testid} className="min-w-0 space-y-4">
      <div className="min-w-0 space-y-1">
        <h3 className="min-w-0 break-words text-base font-semibold text-foreground">
          {t("admin.listings.detail.photos")}
        </h3>
        {mayRemove ? (
          <p
            data-testid={`${testid}-hint`}
            className="min-w-0 break-words text-sm text-muted-foreground"
          >
            {t("admin.listings.photos.hint")}
          </p>
        ) : null}
      </div>
      <ul className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {rows.map((row, index) => {
          const link = photoUrl(row, ["thumb", "card", "cover"], links);
          return (
            <li
              key={row.id}
              data-testid={`${testid}-item`}
              data-photo-id={row.id}
              className="min-w-0 space-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                {link !== null ? (
                  <img
                    src={link}
                    alt=""
                    width={160}
                    height={120}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : null}
                {row.unscreened === true ? (
                  <span className="pointer-events-none absolute start-1 top-1 rounded-md bg-foreground/80 px-1.5 py-0.5 text-[11px] font-medium text-background">
                    {/* Bundle 16 turn 4b (D178) — held with the ad, or waiting for a person. */}
                    {heldWithAd(row) ? t("post.gallery.unscreened") : t("post.gallery.inReview")}
                  </span>
                ) : null}
              </div>
              {/* Bundle 16 turn 4b (D178) — why it is hidden (a photo that may not fit
                  the ad says so in the warning line below). */}
              {row.review != null && row.review.label !== "not_right" ? (
                <p
                  className="min-w-0 break-words text-xs text-foreground"
                  data-testid={`${testid}-review`}
                  data-label={row.review.label}
                >
                  {t(REVIEW_LABEL_KEY[row.review.label])}
                  {row.review.label === "fail" && row.review.code !== null
                    ? ` · ${t(photoRefusalKey(row.review.code))}`
                    : null}
                </p>
              ) : null}
              {row.review?.evidence != null ? (
                <p
                  className="min-w-0 break-words text-xs text-muted-foreground"
                  data-testid={`${testid}-evidence`}
                >
                  {fill(t("admin.listings.photos.review.evidence"), { text: row.review.evidence })}
                </p>
              ) : null}
              {/* D154 B3 — the screen warned that this photo may not fit the ad. */}
              {row.warnings?.includes("not_relevant") === true ? (
                <p className="text-xs text-foreground" data-testid={`${testid}-warning`}>
                  {t("admin.listings.photos.notRelevant")}
                </p>
              ) : null}
              {mayRemove ? (
                <Button
                  type="button"
                  size="touch"
                  variant="destructiveOutline"
                  className="w-full min-w-0 px-2"
                  data-testid={`${testid}-remove`}
                  aria-label={fill(t("admin.listings.photos.removeOne"), { index: index + 1 })}
                  onClick={() => {
                    setRefusal(null);
                    setRemoving({ row, index });
                  }}
                >
                  {/* D171 — an icon and the word, as the seller's photo tools (D168). */}
                  <Trash2 aria-hidden="true" />
                  <span className="truncate">{t("admin.listings.action.remove")}</span>
                </Button>
              ) : null}
              {mayAllow && row.unscreened === true && row.review != null ? (
                <Button
                  type="button"
                  size="touch"
                  variant="outline"
                  className="w-full min-w-0 px-2"
                  disabled={allowing !== null}
                  data-testid={`${testid}-allow`}
                  aria-label={fill(t("admin.listings.photos.allowOne"), { index: index + 1 })}
                  onClick={() => void allow(row)}
                >
                  <Check aria-hidden="true" />
                  <span className="truncate">{t("admin.listings.photos.allow")}</span>
                </Button>
              ) : null}
              {allowProblem !== null && allowProblem.id === row.id ? (
                <p
                  role="alert"
                  className="text-xs text-destructive"
                  data-testid={`${testid}-allow-problem`}
                >
                  {t(allowProblem.key)}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      {removing !== null ? (
        <RemoveDialog
          link={photoUrl(removing.row, ["card", "cover", "thumb"], links)}
          busy={busy}
          refusal={refusal}
          onCancel={() => {
            setRemoving(null);
            setRefusal(null);
          }}
          onConfirm={(reason, note) => void run(reason, note)}
        />
      ) : null}
    </PageCard>
  );
}

function RemoveDialog({
  link,
  busy,
  refusal,
  onCancel,
  onConfirm,
}: {
  link: string | null;
  busy: boolean;
  refusal: string | null;
  onCancel: () => void;
  onConfirm: (reason: string, note: string) => void;
}) {
  const { t } = useI18n();
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);
  return (
    <CategoryModal
      testid="listing-photo-remove-dialog"
      openedBy="photo-remove"
      title={t("admin.listings.photos.title")}
      onClose={() => {
        if (!busy) onCancel();
      }}
    >
      <div className="min-w-0 space-y-3">
        {link !== null ? (
          <img
            src={link}
            alt=""
            width={480}
            height={360}
            className="max-h-48 w-auto max-w-full rounded-md object-contain"
          />
        ) : null}
        <p className="text-sm text-muted-foreground">{t("admin.listings.photos.hint")}</p>
        <ReasonNote
          testid="listing-photo-remove"
          reasons={PHOTO_REASONS}
          reason={reason}
          note={note}
          onReason={(value) => {
            setReason(value);
            setProblem(null);
          }}
          onNote={(value) => {
            setNote(value);
            setProblem(null);
          }}
        />
        {problem !== null || refusal !== null ? (
          <p
            role="alert"
            data-testid="listing-photo-remove-problem"
            className="text-sm text-destructive"
          >
            {problem !== null ? t(problem) : refusal}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="listing-photo-remove-cancel"
            disabled={busy}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            size="touch"
            variant="destructive"
            data-testid="listing-photo-remove-confirm"
            disabled={busy}
            onClick={() => {
              const missing = moveProblem(reason, note);
              if (missing !== null) {
                setProblem(missing);
                return;
              }
              onConfirm(reason, note.trim());
            }}
          >
            {t("admin.listings.photos.confirm")}
          </Button>
        </div>
      </div>
    </CategoryModal>
  );
}

export default ListingPhotos;
