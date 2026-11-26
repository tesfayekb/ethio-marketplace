import { useQuery } from "@tanstack/react-query";

import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { DoorFamily } from "@/lib/door-family";
import { readRefusal } from "@/lib/refusal";

import { ADMIN_SCREENING_KEY } from "./use-screening";
import { ReaderError, readFailed } from "@/lib/reader-failure";

/**
 * Bundle 13 turn 10 — D154 B3 and B5, staff's reads.
 *
 * B3: which ads carry a photo the screen warned `not_relevant` about (the door
 * `admin_warned_listings`: listings:view, the ads in the caller's countries).
 * B5: the photo changes sellers made on live ads that no one has reviewed yet
 * (the door `admin_photo_changes`: listings:review, the ads in the caller's
 * countries), oldest first, and the door that marks one reviewed
 * (`admin_review_photo_change`, which re-checks listings:review and audits).
 * INC-1242: both reads are doors; an answer out of shape is a `malformed`
 * failure, never an empty list.
 */

/** B5 — how many waiting changes one read shows: the door `admin_photo_changes`' own limit (oldest first; the rest follow as these are reviewed). */
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

function malformed(door: string): ReaderError {
  return new ReaderError({ class: "malformed", message: `${door} malformed` });
}

/** The door's rows as plain objects, or null when the answer is not a list of them. */
function rowsOf(data: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(data)) return null;
  const rows: Record<string, unknown>[] = [];
  for (const item of data as unknown[]) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return null;
    rows.push(item as Record<string, unknown>);
  }
  return rows;
}

export async function listPhotoChanges(): Promise<PhotoChange[]> {
  const { data, error } = await supabase.rpc("admin_photo_changes");
  // F4 — a failed read is an error, never an empty list.
  if (error) throw readFailed(error);
  const rows = rowsOf(data);
  if (rows === null) throw malformed("admin_photo_changes");
  return rows.map((row) => parsePhotoChange(row)).filter((row): row is PhotoChange => row !== null);
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

/** The review door's words: a change already reviewed. */
const PHOTO_CHANGE_REFUSALS = {
  words: { changeGone: "admin.screening.changes.gone" },
  generic: "common.error",
} as const satisfies DoorFamily<{ doors: "admin_review_photo_change" }>;

/** B5 — a refusal of the door (`code[:detail]`), in words. */
export function photoChangeErrorKey(refusal: unknown): MessageKey {
  return readRefusal(refusal, PHOTO_CHANGE_REFUSALS).key;
}

/** B3 — of these ads, the ones holding a photo the screen warned `not_relevant` about. */
export async function listWarnedListings(listingIds: readonly string[]): Promise<Set<string>> {
  if (listingIds.length === 0) return new Set();
  const { data, error } = await supabase.rpc("admin_warned_listings", {
    p_listing_ids: [...listingIds],
  });
  if (error) throw readFailed(error);
  const rows = rowsOf(data);
  if (rows === null) throw malformed("admin_warned_listings");
  const warned = new Set<string>();
  for (const row of rows) {
    const id = row["listing_id"];
    if (typeof id !== "string") throw malformed("admin_warned_listings");
    if (codesOf(row["codes"]).includes("not_relevant")) warned.add(id);
  }
  return warned;
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
