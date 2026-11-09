import type { MessageKey } from "@/i18n";

import type { AdminListingHistoryEntry } from "./use-admin-listing";

/**
 * Bundle 11, the Listings console, turn L3 (D138, D139) — a listing's history as
 * a person reads it. The door names every changed column of a revision; here the
 * columns become the groups a seller and an admin speak of (title, price, photos,
 * the map pin and address…), and each revision becomes one line: created, a
 * status change, a renewal, or an edit of named groups.
 */

export type FieldGroup =
  | "status"
  | "title"
  | "description"
  | "category"
  | "specs"
  | "price"
  | "photos"
  | "place"
  | "pin"
  | "contact"
  | "video"
  | "tier"
  | "reach"
  | "ends"
  | "sellerEnd"
  | "renewals"
  | "posted"
  | "other";

const ORDER: FieldGroup[] = [
  "status",
  "title",
  "description",
  "category",
  "specs",
  "price",
  "photos",
  "place",
  "pin",
  "contact",
  "video",
  "tier",
  "reach",
  "ends",
  "sellerEnd",
  "renewals",
  "posted",
  "other",
];

export const GROUP_LABEL: Record<FieldGroup, MessageKey> = {
  status: "admin.listings.col.status",
  title: "admin.listings.col.title",
  description: "admin.listings.history.field.description",
  category: "admin.listings.col.category",
  specs: "admin.listings.history.field.specs",
  price: "admin.listings.col.price",
  photos: "admin.listings.detail.photos",
  place: "admin.listings.col.place",
  pin: "admin.listings.history.field.pin",
  contact: "admin.listings.history.field.contact",
  video: "admin.listings.history.field.video",
  tier: "admin.listings.filter.level",
  reach: "admin.listings.history.field.reach",
  ends: "admin.listings.col.expires",
  sellerEnd: "admin.listings.detail.sellerEnd",
  renewals: "admin.listings.history.field.renewals",
  posted: "admin.listings.col.posted",
  other: "admin.listings.history.field.other",
};

/** The group a listing column belongs to. */
export function groupOf(column: string): FieldGroup {
  if (column === "title") return "title";
  if (column === "description") return "description";
  if (column === "category_id") return "category";
  if (column === "attributes") return "specs";
  if (column.startsWith("price_")) return "price";
  if (column === "photos_removed" || column === "cover_photo_id" || column === "photos_soon") {
    return "photos";
  }
  if (column === "status") return "status";
  // P-2 (a), ruling 7: a level and a reach each change as three columns (the key, its end, its source).
  if (column === "tier" || column === "tier_until" || column === "tier_source") return "tier";
  if (column === "reach" || column === "reach_until" || column === "reach_source") return "reach";
  if (column === "location_id" || column === "home_country_code") return "place";
  if (column === "expires_at") return "ends";
  if (column === "poster_expires_at") return "sellerEnd";
  if (column === "renewed_count") return "renewals";
  if (column === "published_at" || column === "published_first_at") return "posted";
  if (column.startsWith("pin_") || column === "street_address" || column === "directions") {
    return "pin";
  }
  if (column === "contact_pref") return "contact";
  if (column === "video_url") return "video";
  return "other";
}

/** The groups of the changed columns, once each, in reading order. */
export function groupsOf(columns: string[]): FieldGroup[] {
  const present = new Set(columns.map(groupOf));
  return ORDER.filter((group) => present.has(group));
}

/** P-2 (a) M-1c — what the designation sweep (designation_sweep_core) did to the ad. */
export type SweepEvent = "levelEnded" | "levelPaused" | "reachEnded";

export const SWEEP_LABEL: Record<SweepEvent, MessageKey> = {
  levelEnded: "admin.listings.action.levelEnded",
  levelPaused: "admin.listings.action.levelPaused",
  reachEnded: "admin.listings.action.reachEnded",
};

export type EntrySummary =
  | { type: "created" }
  | { type: "renewed" }
  | { type: "status"; from: string | null; to: string }
  | { type: "edited"; groups: FieldGroup[] }
  | { type: "swept"; event: SweepEvent };

const statusOf = (side: Record<string, unknown>): string | null =>
  typeof side["status"] === "string" ? side["status"] : null;

/** Whether the revision took away a dated `column` (it had an end before, none after). */
const ended = (entry: AdminListingHistoryEntry, column: string): boolean =>
  typeof entry.before[column] === "string" && column in entry.after && entry.after[column] === null;

/**
 * The sweep's own revisions (no actor): a level's end (the tier's three columns
 * back to the baseline), the pause that follows when no free slot is left (a state
 * revision to `paused`), and a reach's end (the reach's three columns cleared).
 */
function sweepEventOf(entry: AdminListingHistoryEntry): SweepEvent | null {
  if (entry.by !== "system") return null;
  if (entry.kind === "state" && statusOf(entry.after) === "paused") return "levelPaused";
  if (entry.kind !== "edit") return null;
  if (ended(entry, "tier_until")) return "levelEnded";
  if (ended(entry, "reach_until")) return "reachEnded";
  return null;
}

export function summarize(entry: AdminListingHistoryEntry): EntrySummary {
  const swept = sweepEventOf(entry);
  if (swept !== null) return { type: "swept", event: swept };
  if (entry.kind === "create") return { type: "created" };
  if (entry.kind === "state" && "renewed_count" in entry.after) return { type: "renewed" };
  const to = statusOf(entry.after);
  if (entry.kind === "state" && to !== null) {
    return { type: "status", from: statusOf(entry.before), to };
  }
  return { type: "edited", groups: groupsOf(entry.fields) };
}

/**
 * INC-799 (INC-795's class) — a history reason's label. Every reason a door
 * stores today has its key, but a reason a door adds later must never read
 * "undefined": the stored code itself is shown, so staff still learn which
 * reason the door stored. P-1c turn (d): whether the key exists is asked of
 * the i18n mechanism (`has` of useI18n), never of an imported catalogue.
 */
export function reasonLabel(
  reason: string,
  t: (key: MessageKey) => string,
  has: (key: string) => boolean,
): string {
  const key = `admin.listings.reason.${reason}`;
  if (has(key)) return t(key as MessageKey);
  return reason;
}

/**
 * The values the door shows for a revision, column by column, in reading order:
 * only columns whose value the door kept (content, price, status, dates); a
 * column it only named (a pin, an address, contact settings) has no row here.
 */
export function changesOf(
  entry: AdminListingHistoryEntry,
): Array<{ column: string; before: unknown; after: unknown }> {
  const columns = [...new Set([...Object.keys(entry.before), ...Object.keys(entry.after)])];
  return columns
    .sort(
      (a, b) =>
        ORDER.indexOf(groupOf(a)) - ORDER.indexOf(groupOf(b)) || (a < b ? -1 : a > b ? 1 : 0),
    )
    .map((column) => ({ column, before: entry.before[column], after: entry.after[column] }));
}
