import type { ListingTier } from "@/features/feed/ranking";

import type { RibbonPalette } from "./ribbon-geometry";

/**
 * Sage S4 (spec §7, §8; G0 concern 1) — A CARD'S TIER IS DRAWN BY ONE MECHANISM. Every surface
 * that draws a listing card (the feed, the category pages, saved ads, similar ads, the seller
 * page) reads its tier's look here: the card's fill and frame over CARD_SURFACE, the place
 * line's divider and ink, the ribbon's palette, and for a paid card the mini flag and the
 * tier word (tier-flag.tsx). Every value is a token class or a token reference; a surface that
 * draws a tier its own way fails CF-TIER-1 (scripts/conformance/card-tiers.test.ts).
 */
export type PaidTier = Exclude<ListingTier, "regular">;

export interface PaidLook {
  /** The word beside the place, and the stars before it (spec §7). */
  word: string;
  star: string;
  stars: number;
  /** The flag: its length in picture units, its frame, fold and star stops (token references). */
  flag: { length: number; frame: string; fold: string; stops: readonly [string, string, string] };
  /** Spec §12 — the ad page's tier tag: its ring. */
  ring: string;
}

export interface CardLook {
  /** Over CARD_SURFACE: the tier's fill and its frame and glow in place of the card's lift. */
  surface: string;
  /** The place line: its divider, and its ink (D269: the Featured fill takes its own). */
  place: string;
  palette: RibbonPalette;
  paid: { tier: PaidTier; look: PaidLook } | null;
}

const REGULAR: CardLook = {
  surface: "",
  place: "border-card-rule text-leaf-ink",
  palette: "pearl",
  paid: null,
};

const PREMIUM: PaidLook = {
  word: "text-tier-premium-ink",
  star: "text-tier-premium-star",
  stars: 2,
  flag: {
    length: 64,
    frame: "var(--tier-premium-frame)",
    fold: "var(--tier-premium-fold)",
    stops: ["var(--flag-premium-1)", "var(--flag-premium-2)", "var(--flag-premium-3)"],
  },
  ring: "ring-tier-premium-ring",
};

const FEATURED: PaidLook = {
  word: "text-tier-featured-ink",
  star: "text-tier-featured-star",
  stars: 1,
  flag: {
    length: 44,
    frame: "var(--tier-featured-frame)",
    fold: "var(--tier-featured-fold)",
    stops: ["var(--flag-featured-1)", "var(--flag-featured-2)", "var(--flag-featured-3)"],
  },
  ring: "ring-tier-featured-ring",
};

/** The look a card of this tier takes. */
export function cardLookOf(tier: ListingTier): CardLook {
  switch (tier) {
    case "premium":
      return {
        surface: "bg-tier-premium shadow-premium",
        place: "border-tier-premium-rule text-leaf-ink",
        palette: "gold",
        paid: { tier, look: PREMIUM },
      };
    case "featured":
      return {
        surface: "bg-tier-featured shadow-featured",
        place: "border-tier-featured-rule text-tier-featured-ink",
        palette: "sage",
        paid: { tier, look: FEATURED },
      };
    case "regular":
      return REGULAR;
  }
}

/**
 * Sage S5 (spec §12, §13; ruling 1) — THE AD PAGE'S TIER LOOK, by the same rule as the card's:
 * on a paid ad only the title box is tinted, every other box of the ad body is white with the
 * tier frame, and the accents inside the body take the tier colour (Premium gold; Featured keeps
 * the site green). Each key is a class set merged over the page's own (cn), so the free entry is
 * empty where the page's own look is the free one. The safety box never reads it.
 */
export interface AdPageLook {
  /** The title box, over CARD_SURFACE: the tier's fill and frame. */
  titleBox: string;
  /** The ad body's other boxes and the section bar, over CARD_SURFACE: the tier frame. */
  box: string;
  /** The section bar's current tab, over BAND_TAB_CURRENT. */
  tab: string;
  /** The price, the links, Save, Share, Read more: the accent ink. */
  ink: string;
  /** Show contact, over the default button. */
  contact: string;
  /** The Negotiable chip, over its own look. */
  negotiable: string;
  /** A key-fact chip's edge. */
  chip: string;
  /** The dividers inside the boxes. */
  rule: string;
  /** The chosen thumbnail's edge. */
  thumbOn: string;
  /** Enlarge map's outline. */
  edge: string;
  palette: RibbonPalette;
}

const FREE_PAGE: AdPageLook = {
  titleBox: "",
  box: "",
  tab: "",
  ink: "text-primary",
  contact: "",
  negotiable: "",
  chip: "border-border",
  rule: "border-border",
  thumbOn: "border-primary",
  edge: "border-hairline",
  palette: "pearl",
};

/** The look the ad page of a listing of this tier takes; null (not known) is the free look. */
export function adPageLookOf(tier: ListingTier | null): AdPageLook {
  switch (tier) {
    case "premium":
      return {
        titleBox: "bg-tier-premium shadow-premium",
        box: "shadow-premium",
        tab: "bg-tier-premium text-tier-premium-ink ring-1 ring-inset ring-tier-premium-ring",
        ink: "text-tier-premium-ink",
        contact: "bg-gold text-gold-foreground shadow-contact-premium hover:bg-gold/90",
        negotiable: "bg-tier-premium-chip text-tier-premium-ink",
        chip: "border-tier-premium-ring",
        rule: "border-tier-premium-rule",
        thumbOn: "border-gold",
        edge: "border-tier-premium-edge",
        palette: "gold",
      };
    case "featured":
      return {
        ...FREE_PAGE,
        titleBox: "bg-tier-featured shadow-featured",
        box: "shadow-featured",
        rule: "border-tier-featured-rule",
        palette: "sage",
      };
    case "regular":
    case null:
      return FREE_PAGE;
  }
}

/** Every tier a card can have, for the fixture grid (/dev/style). */
export const CARD_TIERS: readonly ListingTier[] = ["regular", "premium", "featured"];

/**
 * Sage S5 (ruling 1, answer 1) — a tier read from outside: one of the three, or null when it is
 * not known (an unknown word is never taken for the free look's tier).
 */
export function tierOf(value: unknown): ListingTier | null {
  switch (value) {
    case "premium":
    case "featured":
    case "regular":
      return value;
    default:
      return null;
  }
}
