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
  tier: "admin.listings.filter.tier",
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
  if (column === "tier") return "tier";
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

export type EntrySummary =
  | { type: "created" }
  | { type: "renewed" }
  | { type: "status"; from: string | null; to: string }
  | { type: "edited"; groups: FieldGroup[] };

const statusOf = (side: Record<string, unknown>): string | null =>
  typeof side["status"] === "string" ? side["status"] : null;

export function summarize(entry: AdminListingHistoryEntry): EntrySummary {
  if (entry.kind === "create") return { type: "created" };
  if (entry.kind === "state" && "renewed_count" in entry.after) return { type: "renewed" };
  const to = statusOf(entry.after);
  if (entry.kind === "state" && to !== null) {
    return { type: "status", from: statusOf(entry.before), to };
  }
  return { type: "edited", groups: groupsOf(entry.fields) };
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
