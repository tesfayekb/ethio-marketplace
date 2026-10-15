import { useQuery } from "@tanstack/react-query";

import { PHOTO_REVIEW_LABELS, type PhotoReviewLabel } from "@/features/posting/posting-service";
import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { ADMIN_SCREENING_KEY } from "./use-screening";

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

/** How many waiting photos one read shows (oldest first; the rest follow as these are decided). */
export const PHOTO_REVIEWS_LIMIT = 100;

/** The ads whose photos wait here: not a draft, a removed ad or a refused one. */
export const PHOTO_REVIEW_HIDDEN_STATUSES = ["draft", "removed", "rejected"] as const;

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
  const { data, error } = await supabase
    .from("listing_photo_reviews")
    .select("photo_id,label,code,evidence,created_at,listing:listings!inner(id,title,status)")
    .is("decided_at", null)
    .not("listing.status", "in", `(${PHOTO_REVIEW_HIDDEN_STATUSES.join(",")})`)
    .order("created_at", { ascending: true })
    .order("photo_id", { ascending: true })
    .limit(PHOTO_REVIEWS_LIMIT);
  // F4 — a failed read is an error, never an empty list.
  if (error) throw new Error(error.message);
  return (data ?? [])
    .map((row) => parsePhotoReview(row as unknown as Record<string, unknown>))
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

/** The door's refusal, as staff read it. */
export function photoAllowErrorKey(message: string): MessageKey {
  if (message.includes("reviewGone")) return "admin.listings.photos.allowGone";
  if (message.includes("your own listing")) return "admin.listings.move.error.own";
  return "common.error";
}

/** The reason line staff read for a label (a not-right photo says so in its warning line). */
export const REVIEW_LABEL_KEY: Record<PhotoReviewLabel, MessageKey> = {
  held: "admin.listings.photos.review.held",
  unsure: "admin.listings.photos.review.unsure",
  not_right: "admin.listings.photos.notRelevant",
  fail: "admin.listings.photos.review.fail",
};
