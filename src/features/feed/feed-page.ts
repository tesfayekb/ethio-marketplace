import type { ListingTier } from "./ranking";

/**
 * Bundle 10 E3b — THE ANSWER OF /api/feed AND ITS SECTIONS. Pure functions: no
 * React, no fetch. A malformed answer is refused whole (F4), never defaulted.
 */

/** The ladder's "everywhere" step (the nil-uuid key, D101). */
export const EVERYWHERE = "00000000-0000-0000-0000-000000000000";

/** One card — exactly the fields /api/feed returns. */
export interface FeedListing {
  id: string;
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

function parseCard(value: unknown, ladderLength: number): FeedListing | null {
  if (!isObject(value)) return null;
  const v = value;
  if (!isStr(v.id) || !isStr(v.title)) return null;
  if (!isStr(v.tier) || !TIERS.includes(v.tier)) return null;
  if (!isNumOrNull(v.priceAmount) || !isStrOrNull(v.priceCurrency)) return null;
  if (!isStr(v.priceMode) || !isNumOrNull(v.priceBp)) return null;
  if (typeof v.priceNegotiable !== "boolean" || !isStr(v.pricePeriod)) return null;
  if (!isStrOrNull(v.priceUnit) || !isStrOrNull(v.priceUnitText)) return null;
  if (typeof v.photosSoon !== "boolean") return null;
  if (!isStr(v.publishedAt) || !isStr(v.categoryId)) return null;
  if (!isStrOrNull(v.locationId) || !isStrOrNull(v.locationNameEn)) return null;
  if (!isStrOrNull(v.locationNameAm)) return null;
  if (typeof v.step !== "number" || !Number.isInteger(v.step)) return null;
  if (v.step < 1 || v.step > ladderLength) return null;
  return {
    id: v.id,
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
  return { cards: parsed, ladder: [...ladder], next };
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
