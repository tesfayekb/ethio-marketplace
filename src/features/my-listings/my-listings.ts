import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

/**
 * Bundle 16 turn 2 — THE SELLER'S OWN ADS (D138; D173–D175; docs/features/my-listings.md).
 *
 * One door, `my_listings(group, limit, offset)`, answers both the My listings page
 * and the Account overview's counts, so the six groups are decided in ONE place —
 * the door's CASE — and never mapped again here (INC-469's class: a label without a
 * state, states without a label). A malformed answer is refused whole (F4): the
 * caller shows its error, never an empty list.
 *
 * Bundle 16 turn R1 (D181, INC-630) — the door also takes the seller's search
 * (words of the title) and filters (a top category with everything under it;
 * Reserved; Price reduced); the six counts follow them, as the rows do. Its
 * answer carries the admin's renew setting, so a row offers Renew only when it
 * is on (the same values `my_listing` gives).
 */

/** The groups, in the order the page offers them. */
export const LISTING_GROUPS = ["live", "review", "attention", "closed", "sold", "drafts"] as const;
export type ListingGroup = (typeof LISTING_GROUPS)[number];

/** Each group's word, on the page and on the Account overview alike. */
export const GROUP_LABEL: Record<ListingGroup, MessageKey> = {
  live: "myListings.group.live",
  review: "myListings.group.review",
  attention: "myListings.group.attention",
  closed: "myListings.group.closed",
  sold: "myListings.group.sold",
  drafts: "myListings.group.drafts",
};

export type GroupCounts = Record<ListingGroup, number>;

/** One of the seller's ads — exactly the fields the door returns. */
export interface MyListingRow {
  id: string;
  status: string;
  title: string | null;
  categoryId: string | null;
  /** The first stripped photo; its link comes from /api/media/photo-links with the seller's session. */
  coverPhotoId: string | null;
  photosSoon: boolean;
  priceMode: string | null;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  priceBp: number | null;
  priceNegotiable: boolean;
  priceUnit: string | null;
  priceUnitText: string | null;
  /** D173 2 — the old price while the "Price reduced" record stands (14 days); else null. */
  priceWas: number | null;
  /** D173 1 — the Reserved mark. */
  reserved: boolean;
  publishedFirstAt: string | null;
  publishedAt: string | null;
  renewedAt: string | null;
  expiresAt: string | null;
  /** A live ad's whole days left, rounded up; null with no end date. */
  daysLeft: number | null;
  /** A closed ad's whole days kept for its reopening, rounded up; null with no end date. */
  daysKept: number | null;
  soldAt: string | null;
  /** Turn 3b (call H) — the word a sold ad takes, from its category: sold, rented or filled. */
  soldWord: SoldWord;
  createdAt: string;
  updatedAt: string | null;
  /** A removed ad's latest staff reason (an `admin.listings.reason.*` word); else null. */
  removedReason: string | null;
}

/** Turn 3b (call H) — the words a sold ad may take. */
export const SOLD_WORDS = ["sold", "rented", "filled"] as const;
export type SoldWord = (typeof SOLD_WORDS)[number];

export interface MyListingsPage {
  counts: GroupCounts;
  rows: MyListingRow[];
  /** D174 3, D175 2 — the admin's renew setting (turn R1). */
  renewAllowed: boolean;
  renewDays: number | null;
}

/** Turn R1 — the marks the seller can filter by. */
export const LISTING_MARKS = ["reserved", "reduced"] as const;
export type ListingMark = (typeof LISTING_MARKS)[number];

/** Turn R1 — the seller's search and filters; empty, they ask for nothing. */
export interface MyListingsFilters {
  /** Words of the title (the door trims it and ignores case; at most 100 characters). */
  search: string;
  /** A top category; the door reads everything under it. */
  category: string | null;
  mark: ListingMark | null;
}

export const NO_FILTERS: MyListingsFilters = { search: "", category: null, mark: null };

/** The longest search the door takes. */
export const SEARCH_MAX = 100;

type Rec = Record<string, unknown>;

function isObject(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isStr(value: unknown): value is string {
  return typeof value === "string";
}
function isStrOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}
function isNumOrNull(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value));
}
function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

/** One row of the door's answer, or null on any mismatch (F4); `my_listing` returns the same row (turn 3). */
export function parseRow(value: unknown): MyListingRow | null {
  if (!isObject(value)) return null;
  const v = value;
  if (!isStr(v.id) || !isStr(v.status) || !isStrOrNull(v.title) || !isStrOrNull(v.categoryId))
    return null;
  if (!isStrOrNull(v.coverPhotoId) || typeof v.photosSoon !== "boolean") return null;
  if (!isStrOrNull(v.priceMode) || !isNumOrNull(v.priceAmount) || !isStrOrNull(v.priceCurrency))
    return null;
  if (!isStrOrNull(v.pricePeriod) || !isNumOrNull(v.priceBp)) return null;
  if (typeof v.priceNegotiable !== "boolean") return null;
  if (!isStrOrNull(v.priceUnit) || !isStrOrNull(v.priceUnitText) || !isNumOrNull(v.priceWas))
    return null;
  if (typeof v.reserved !== "boolean") return null;
  if (!isStrOrNull(v.publishedFirstAt) || !isStrOrNull(v.publishedAt)) return null;
  if (!isStrOrNull(v.renewedAt) || !isStrOrNull(v.expiresAt)) return null;
  if (!(v.daysLeft === null || isCount(v.daysLeft))) return null;
  if (!(v.daysKept === null || isCount(v.daysKept))) return null;
  if (!isStrOrNull(v.soldAt) || !isStr(v.createdAt) || !isStrOrNull(v.updatedAt)) return null;
  const soldWord = SOLD_WORDS.find((word) => word === v.soldWord);
  if (soldWord === undefined) return null;
  if (!isStrOrNull(v.removedReason)) return null;
  return {
    id: v.id,
    status: v.status,
    title: v.title,
    categoryId: v.categoryId,
    coverPhotoId: v.coverPhotoId,
    photosSoon: v.photosSoon,
    priceMode: v.priceMode,
    priceAmount: v.priceAmount,
    priceCurrency: v.priceCurrency,
    pricePeriod: v.pricePeriod,
    priceBp: v.priceBp,
    priceNegotiable: v.priceNegotiable,
    priceUnit: v.priceUnit,
    priceUnitText: v.priceUnitText,
    priceWas: v.priceWas,
    reserved: v.reserved,
    publishedFirstAt: v.publishedFirstAt,
    publishedAt: v.publishedAt,
    renewedAt: v.renewedAt,
    expiresAt: v.expiresAt,
    daysLeft: v.daysLeft,
    daysKept: v.daysKept,
    soldAt: v.soldAt,
    soldWord,
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
    removedReason: v.removedReason,
  };
}

/** The door's answer, or null on any mismatch (F4). */
export function parseMyListings(value: unknown): MyListingsPage | null {
  if (!isObject(value) || !isObject(value.counts) || !Array.isArray(value.rows)) return null;
  if (typeof value.renewAllowed !== "boolean") return null;
  const days = value.renewDays;
  if (!(days === null || (typeof days === "number" && Number.isInteger(days) && days > 0)))
    return null;
  const counts = {} as GroupCounts;
  for (const group of LISTING_GROUPS) {
    const n = value.counts[group];
    if (!isCount(n)) return null;
    counts[group] = n;
  }
  const rows: MyListingRow[] = [];
  for (const row of value.rows) {
    const one = parseRow(row);
    if (one === null) return null;
    rows.push(one);
  }
  return { counts, rows, renewAllowed: value.renewAllowed, renewDays: days };
}

/** The door's arguments for the search and filters: only what is asked is sent. */
export function filterArgs(filters: MyListingsFilters): {
  p_search?: string;
  p_category?: string;
  p_mark?: string;
} {
  const search = filters.search.trim().slice(0, SEARCH_MAX);
  return {
    ...(search === "" ? {} : { p_search: search }),
    ...(filters.category === null ? {} : { p_category: filters.category }),
    ...(filters.mark === null ? {} : { p_mark: filters.mark }),
  };
}

/** One page of one group, as the signed-in seller; null on a refusal or a malformed answer (F4). */
export async function readMyListings(
  group: ListingGroup,
  limit: number,
  offset: number,
  filters: MyListingsFilters = NO_FILTERS,
): Promise<MyListingsPage | null> {
  const { data, error } = await supabase.rpc("my_listings", {
    p_group: group,
    p_limit: limit,
    p_offset: offset,
    ...filterArgs(filters),
  });
  if (error) return null;
  return parseMyListings(data);
}

/** The total of the six groups. */
export function totalOf(counts: GroupCounts): number {
  return LISTING_GROUPS.reduce((sum, group) => sum + counts[group], 0);
}
