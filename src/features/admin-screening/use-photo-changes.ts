import { useQuery } from "@tanstack/react-query";

import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { ADMIN_SCREENING_KEY } from "./use-screening";

/**
 * Bundle 13 turn 10 — D154 B3 and B5, staff's reads.
 *
 * B3: which ads carry a photo the screen warned `not_relevant` about
 * (`listing_photo_warnings`, RLS: listings:view). B5: the photo changes sellers
 * made on live ads that no one has reviewed yet (`listing_photo_changes`, RLS:
 * listings:review), oldest first, and the door that marks one reviewed
 * (`admin_review_photo_change`, which re-checks listings:review and audits).
 */

/** B5 — how many waiting changes one read shows (oldest first; the rest follow as these are reviewed). */
export const PHOTO_CHANGES_LIMIT = 100;

export type PhotoChangeKind = "added" | "edited" | "removed";

export interface PhotoChange {
  id: string;
  kind: PhotoChangeKind;
  /** The photo added or the edit's new photo; for a removal, the photo that went. */
  photoId: string;
  replacedPhotoId: string | null;
  codes: string[];
  createdAt: string;
  listing: { id: string; title: string; status: string } | null;
}

const KINDS: readonly PhotoChangeKind[] = ["added", "edited", "removed"];

function codesOf(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((code): code is string => typeof code === "string")
    : [];
}

/** B5 — a change row as the read returns it; a row of an unknown kind is left out. */
export function parsePhotoChange(raw: Record<string, unknown>): PhotoChange | null {
  const kind = raw["kind"];
  if (typeof kind !== "string" || !(KINDS as readonly string[]).includes(kind)) return null;
  const listing = raw["listing"];
  const ad =
    listing !== null && typeof listing === "object" && !Array.isArray(listing)
      ? (listing as Record<string, unknown>)
      : null;
  return {
    id: String(raw["id"]),
    kind: kind as PhotoChangeKind,
    photoId: String(raw["photo_id"]),
    replacedPhotoId: typeof raw["replaced_photo_id"] === "string" ? raw["replaced_photo_id"] : null,
    codes: codesOf(raw["codes"]),
    createdAt: String(raw["created_at"]),
    listing:
      ad === null
        ? null
        : { id: String(ad["id"]), title: String(ad["title"] ?? ""), status: String(ad["status"]) },
  };
}

export async function listPhotoChanges(): Promise<PhotoChange[]> {
  const { data, error } = await supabase
    .from("listing_photo_changes")
    .select("id,kind,photo_id,replaced_photo_id,codes,created_at,listing:listings(id,title,status)")
    .is("reviewed_at", null)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
    .limit(PHOTO_CHANGES_LIMIT);
  // F4 — a failed read is an error, never an empty list.
  if (error) throw new Error(error.message);
  return (data ?? [])
    .map((row) => parsePhotoChange(row as unknown as Record<string, unknown>))
    .filter((row): row is PhotoChange => row !== null);
}

export function usePhotoChanges(enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "changes"],
    queryFn: listPhotoChanges,
    enabled,
    staleTime: 10_000,
  });
}

/** B5 — the door, as the signed-in reviewer. */
export async function reviewPhotoChange(changeId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_review_photo_change", { p_change_id: changeId });
  if (error) throw error;
}

/** B5 — a refusal of the door, in words. */
export function photoChangeErrorKey(message: string): MessageKey {
  return message.includes("changeGone") ? "admin.screening.changes.gone" : "common.error";
}

/** B3 — of these ads, the ones holding a photo the screen warned `not_relevant` about. */
export async function listWarnedListings(listingIds: readonly string[]): Promise<Set<string>> {
  if (listingIds.length === 0) return new Set();
  const { data, error } = await supabase
    .from("listing_photo_warnings")
    .select("listing_id,codes")
    .in("listing_id", [...listingIds]);
  if (error) throw new Error(error.message);
  return new Set(
    (data ?? [])
      .filter((row) => codesOf(row.codes).includes("not_relevant"))
      .map((row) => row.listing_id),
  );
}

export function useWarnedListings(listingIds: readonly string[]) {
  const ids = [...new Set(listingIds)].sort();
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "warned", ids.join(",")],
    queryFn: () => listWarnedListings(ids),
    enabled: ids.length > 0,
    staleTime: 10_000,
  });
}
