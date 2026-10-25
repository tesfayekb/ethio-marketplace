import type { MessageKey } from "@/i18n";
import { linksOf, type PhotoLinks } from "@/features/posting/photo-links";
import type { ShellLocationNode } from "@/components/shell/location-data";

import type { ListingTier } from "./ranking";

/**
 * Bundle 10 E3b — THE ANSWER OF /api/feed AND ITS SECTIONS. Pure functions: no
 * React, no fetch. A malformed answer is refused whole (F4), never defaulted.
 */

/** The ladder's "everywhere" step (the nil-uuid key, D101). */
export const EVERYWHERE = "00000000-0000-0000-0000-000000000000";

/**
 * Bundle 16 turn 3c (D175 1) — the word a sold ad shows for its 30 days in the feed: Sold, or Rented / Filled when
 * its category says so (the same words as My listings).
 */
export const FEED_SOLD_WORDS = ["sold", "rented", "filled"] as const;
export type FeedSoldWord = (typeof FEED_SOLD_WORDS)[number];

/**
 * D180 — an ad's ribbon words, the most important first: Sold (Rented, Filled), No longer available (the seller's
 * own views only — buyers never see a closed ad), Reserved, Price reduced. The feed card, the seller's rows and the
 * ad's page all read this one list, so a mark is worded and ordered the same everywhere.
 */
export const SOLD_RIBBON: Record<FeedSoldWord, MessageKey> = {
  sold: "feed.ribbon.sold",
  rented: "feed.ribbon.rented",
  filled: "feed.ribbon.filled",
};

export function ribbonOf(ad: {
  soldWord: FeedSoldWord | null;
  closed: boolean;
  reserved: boolean;
  priceReduced: boolean;
}): MessageKey[] {
  const keys: MessageKey[] = [];
  if (ad.soldWord !== null) return [SOLD_RIBBON[ad.soldWord]];
  if (ad.closed) keys.push("feed.ribbon.closed");
  if (ad.reserved) keys.push("feed.reserved");
  if (ad.priceReduced) keys.push("feed.priceReduced");
  return keys;
}

/** One card — exactly the fields /api/feed returns. */
export interface FeedListing {
  id: string;
  publicId: string | null;
  title: string;
  tier: ListingTier;
  priceAmount: number | null;
  priceCurrency: string | null;
  priceMode: string;
  priceBp: number | null;
  priceNegotiable: boolean;
  pricePeriod: string;
  priceUnit: string | null;
  priceUnitText: string | null;
  photosSoon: boolean;
  /** INC-606 — the listing's cover photo (its first stripped photo), or null. */
  coverPhotoId: string | null;
  /** Bundle 16 turn 3c (D175 1) — a sold ad's word for its 30 days in the feed; null for a live ad. */
  soldWord: FeedSoldWord | null;
  /** D173 1 — the seller marked the ad Reserved. */
  reserved: boolean;
  /** D173 2 — the old price while the "Price reduced" mark stands (14 days); null otherwise. */
  priceWas: number | null;
  publishedAt: string;
  categoryId: string;
  locationId: string | null;
  locationNameEn: string | null;
  locationNameAm: string | null;
  /** The ladder step (1-based) the card was read under. */
  step: number;
}

export interface FeedPage {
  cards: FeedListing[];
  ladder: string[];
  next: string | null;
  /** DEC-195 — the covers' signed card/thumb links, when the route answered them. */
  coverLinks?: PhotoLinks;
}

const TIERS: readonly string[] = ["premium", "featured", "regular"];

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

/**
 * One card, or null on any mismatch. Exported for the seller's ads page
 * (bundle 19 turn 16), which reads the same card shape through
 * /api/seller; the feed itself keeps using it through parseFeedPage.
 */
export function parseCard(value: unknown, ladderLength: number): FeedListing | null {
  if (!isObject(value)) return null;
  const v = value;
  if (!isStr(v.id) || !isStr(v.title)) return null;
  if (!isStr(v.tier) || !TIERS.includes(v.tier)) return null;
  if (!isNumOrNull(v.priceAmount) || !isStrOrNull(v.priceCurrency)) return null;
  if (!isStr(v.priceMode) || !isNumOrNull(v.priceBp)) return null;
  if (typeof v.priceNegotiable !== "boolean" || !isStr(v.pricePeriod)) return null;
  if (!isStrOrNull(v.priceUnit) || !isStrOrNull(v.priceUnitText)) return null;
  if (typeof v.photosSoon !== "boolean") return null;
  // INC-606 — a door from before the cover was added answers without it: no photo.
  const publicId = v.publicId === undefined ? null : v.publicId;
  if (!isStrOrNull(publicId)) return null;
  const coverPhotoId = v.coverPhotoId === undefined ? null : v.coverPhotoId;
  if (!isStrOrNull(coverPhotoId)) return null;
  // Bundle 16 turn 3c — an answer from before the marks (a page cached a few minutes) has none: a live ad, no mark.
  const soldWord = v.soldWord === undefined ? null : v.soldWord;
  if (
    soldWord !== null &&
    !(isStr(soldWord) && (FEED_SOLD_WORDS as readonly string[]).includes(soldWord))
  ) {
    return null;
  }
  const reserved = v.reserved === undefined ? false : v.reserved;
  if (typeof reserved !== "boolean") return null;
  const priceWas = v.priceWas === undefined ? null : v.priceWas;
  if (!isNumOrNull(priceWas)) return null;
  if (!isStr(v.publishedAt) || !isStr(v.categoryId)) return null;
  if (!isStrOrNull(v.locationId) || !isStrOrNull(v.locationNameEn)) return null;
  if (!isStrOrNull(v.locationNameAm)) return null;
  if (typeof v.step !== "number" || !Number.isInteger(v.step)) return null;
  if (v.step < 1 || v.step > ladderLength) return null;
  return {
    id: v.id,
    publicId,
    title: v.title,
    tier: v.tier as ListingTier,
    priceAmount: v.priceAmount,
    priceCurrency: v.priceCurrency,
    priceMode: v.priceMode,
    priceBp: v.priceBp,
    priceNegotiable: v.priceNegotiable,
    pricePeriod: v.pricePeriod,
    priceUnit: v.priceUnit,
    priceUnitText: v.priceUnitText,
    photosSoon: v.photosSoon,
    coverPhotoId,
    soldWord: soldWord as FeedSoldWord | null,
    reserved,
    priceWas,
    publishedAt: v.publishedAt,
    categoryId: v.categoryId,
    locationId: v.locationId,
    locationNameEn: v.locationNameEn,
    locationNameAm: v.locationNameAm,
    step: v.step,
  };
}

/** The page, or null on any mismatch (F4: a malformed answer is a failure). */
export function parseFeedPage(value: unknown): FeedPage | null {
  if (!isObject(value)) return null;
  const { cards, steps, ladder, next } = value;
  if (!Array.isArray(cards) || !Array.isArray(steps)) return null;
  if (!Array.isArray(ladder) || ladder.length === 0 || !ladder.every(isStr)) return null;
  if (!isStrOrNull(next)) return null;
  const parsed: FeedListing[] = [];
  for (const card of cards) {
    const one = parseCard(card, ladder.length);
    if (one === null) return null;
    parsed.push(one);
  }
  // DEC-195 — `coverLinks` is optional; a door from before it answers without
  // it, and the client then asks /api/media/photo-links as before.
  const coverLinks = linksOf({ links: value.coverLinks });
  return {
    cards: parsed,
    ladder: [...ladder],
    next,
    ...(Object.keys(coverLinks).length > 0 ? { coverLinks } : {}),
  };
}

/**
 * D127 (the operator, 2026-10-10): every heading says "in" — each wider place of the
 * ladder is named by itself ("Listings in {that place}"), never "near" the chosen
 * place; "all" is everywhere beyond the country.
 */
export type FeedSectionLabel = { kind: "place"; placeId: string } | { kind: "all" } | null;

export interface FeedSection {
  step: number;
  label: FeedSectionLabel;
  cards: FeedListing[];
}

function labelOf(step: number, ladder: string[]): FeedSectionLabel {
  if (step === 1) return null;
  const placeId = ladder[step - 1];
  if (placeId === undefined) return null;
  if (placeId === EVERYWHERE) return { kind: "all" };
  return { kind: "place", placeId };
}

/** D119 — the card shows while the chosen place holds fewer than this many listings. */
export const INVITE_BELOW = 4;

/**
 * D119 — true when the chosen place's own listings (ladder step 1) are fewer than
 * INVITE_BELOW. Step 1 always comes first and a page holds 20 cards, so a place
 * with fewer than 4 shows them all on page 1 and the answer never changes as
 * later pages load.
 */
export function inviteShown(cards: FeedListing[]): boolean {
  return placeCount(cards) < INVITE_BELOW;
}

/** D119 / D215 — where the page's one invitation card stands. */
export type InviteSpot = "alone" | "lead" | "afterPlace" | "end";

/**
 * D119 / D215 — the page's one invitation card. No cards: alone (place or none).
 * A chosen place holding fewer than INVITE_BELOW of its own (D119, unchanged):
 * first when it has none and wider places follow, else at the end of its row.
 * Otherwise the card is the list's last, once the last page has loaded; until
 * then null (the card waits for the end of the list).
 */
export function inviteSpot(
  cards: FeedListing[],
  hasPlace: boolean,
  hasMore: boolean,
): InviteSpot | null {
  if (cards.length === 0) return "alone";
  if (hasPlace && inviteShown(cards)) return (cards[0]?.step ?? 1) > 1 ? "lead" : "afterPlace";
  return hasMore ? null : "end";
}

/** D119 — how many of the chosen place's own listings (ladder step 1) are on screen. */
export function placeCount(cards: FeedListing[]): number {
  return cards.filter((card) => card.step === 1).length;
}

/**
 * Consecutive cards with the same step form one section, in the order received.
 * D127 (the operator, 2026-10-10): each wider place is headed by its own name, once —
 * the first section of a step carries its label, a later section of the same step none.
 */
export function feedSections(cards: FeedListing[], ladder: string[]): FeedSection[] {
  const sections: FeedSection[] = [];
  const named = new Set<number>();
  for (const card of cards) {
    const last = sections[sections.length - 1];
    if (last && last.step === card.step) {
      last.cards.push(card);
    } else {
      const label = named.has(card.step) ? null : labelOf(card.step, ladder);
      named.add(card.step);
      sections.push({ step: card.step, label, cards: [card] });
    }
  }
  return sections;
}

/**
 * The feed read's address for a page: the category, then the place, then the
 * cursor — the browser's read (use-feed.ts) and the server's first page
 * (D234 S5, src/server/first-screen.ts) build it here, so the server's answer
 * is handed over only when it is the very page the browser would ask for.
 */
export function feedPath(
  categoryId: string | null,
  placeId: string | null,
  after: string | null,
  size: number | null = null,
): `/api/${string}` {
  const params = new URLSearchParams();
  if (categoryId !== null) params.set("category", categoryId);
  if (placeId !== null) params.set("place", placeId);
  if (after !== null) params.set("after", after);
  // D234 S6 — a list that asks another page size (the similar ads, ad-page/similar.ts) says so.
  if (size !== null) params.set("size", String(size));
  const query = params.toString();
  return query === "" ? "/api/feed" : `/api/feed?${query}`;
}

/**
 * D234 S5 — THE FIRST PAGE THE SERVER ANSWERED INSIDE THE PAGE: the feed read's
 * address, its answer read by parseFeedPage (as the browser reads it), and the
 * first cards' cover links the page preloads. Handed to the browser's first read of the same address
 * once per page load (use-feed.ts).
 */
export interface FirstFeedPage {
  path: string;
  page: FeedPage;
  covers: string[];
  /** D234 S6 — the place path the server derived, so the page it draws is headed as the shell will head it. */
  places: ShellLocationNode[];
}
