import { useQuery } from "@tanstack/react-query";

import { PHOTO_REVIEW_LABELS, type PhotoReviewLabel } from "@/features/posting/posting-service";
import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { DoorFamily } from "@/lib/door-family";
import { readRefusal } from "@/lib/refusal";

import { ADMIN_SCREENING_KEY } from "./use-screening";
import { ReaderError, readFailed } from "@/lib/reader-failure";

/**
 * Bundle 16 turn 4b — D178 (the operator, 2026-10-14): THE PHOTOS KEPT HIDDEN FOR A
 * PERSON, staff's read and door.
 *
 * Every photo the AI check failed (but not for nudity, which is never stored —
 * D183), was unsure about or found may not fit the ad, and every photo stored
 * while checking was off, has an open row in `listing_photo_reviews` (RLS:
 * listings:review reads every row). The read lists them oldest first, on ads a
 * buyer may come to see — never a draft, a removed ad or a refused one, which
 * the seller must send again. The door `admin_allow_listing_photo` (listings:review
 * with the second factor, never the caller's own ad) shows one photo and audits it.
 */

/**
 * How many waiting photos one read shows (oldest first; the rest follow as these are decided):
 * the door `admin_photo_reviews`' own limit, which also holds the statuses that hide an ad (INC-1242).
 */
export const PHOTO_REVIEWS_LIMIT = 100;

export interface PhotoReviewRow {
  photoId: string;
  label: PhotoReviewLabel;
  code: string | null;
  evidence: string | null;
  createdAt: string;
  listing: { id: string; title: string; status: string };
}

/** A review row as the read returns it; a row of an unknown label or without its ad is left out. */
export function parsePhotoReview(raw: Record<string, unknown>): PhotoReviewRow | null {
  const label = raw["label"];
  if (typeof label !== "string" || !(PHOTO_REVIEW_LABELS as readonly string[]).includes(label)) {
    return null;
  }
  const listing = raw["listing"];
  if (listing === null || typeof listing !== "object" || Array.isArray(listing)) return null;
  const ad = listing as Record<string, unknown>;
  return {
    photoId: String(raw["photo_id"]),
    label: label as PhotoReviewLabel,
    code: typeof raw["code"] === "string" ? raw["code"] : null,
    evidence: typeof raw["evidence"] === "string" ? raw["evidence"] : null,
    createdAt: String(raw["created_at"]),
    listing: {
      id: String(ad["id"]),
      title: String(ad["title"] ?? ""),
      status: String(ad["status"]),
    },
  };
}

export async function listPhotoReviews(): Promise<PhotoReviewRow[]> {
  const { data, error } = await supabase.rpc("admin_photo_reviews");
  // F4 — a failed read is an error, never an empty list.
  if (error) throw readFailed(error);
  if (!Array.isArray(data)) {
    throw new ReaderError({ class: "malformed", message: "admin_photo_reviews malformed" });
  }
  const rows: Record<string, unknown>[] = [];
  for (const item of data as unknown[]) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      throw new ReaderError({ class: "malformed", message: "admin_photo_reviews malformed" });
    }
    rows.push(item as Record<string, unknown>);
  }
  return rows
    .map((row) => parsePhotoReview(row))
    .filter((row): row is PhotoReviewRow => row !== null);
}

export function usePhotoReviews(enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "photo-reviews"],
    queryFn: listPhotoReviews,
    enabled,
    staleTime: 10_000,
  });
}

/** The door, as the signed-in reviewer (it re-checks everything, F3). */
export async function allowListingPhoto(photoId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_allow_listing_photo", { p_photo_id: photoId });
  if (error) throw error;
}

/** The allow door's words: a photo already decided, and an ad that is the caller's own. */
const PHOTO_ALLOW_REFUSALS = {
  words: {
    reviewGone: "admin.listings.photos.allowGone",
    ownListing: "admin.listings.move.error.own",
  },
  generic: "common.error",
} as const satisfies DoorFamily<{ doors: "admin_allow_listing_photo" }>;

/** The door's refusal (`code[:detail]`), as staff read it. */
export function photoAllowErrorKey(refusal: unknown): MessageKey {
  return readRefusal(refusal, PHOTO_ALLOW_REFUSALS).key;
}

/** The reason line staff read for a label (a not-right photo says so in its warning line). */
export const REVIEW_LABEL_KEY: Record<PhotoReviewLabel, MessageKey> = {
  held: "admin.listings.photos.review.held",
  unsure: "admin.listings.photos.review.unsure",
  not_right: "admin.listings.photos.notRelevant",
  fail: "admin.listings.photos.review.fail",
};
