import type { MessageKey } from "@/i18n";
import { wholeNumber } from "@/lib/whole-number";

import { NOTE_MAX } from "./move-reasons";

/**
 * Turn T1 part B (D242, D276) — what staff's "Set tier" asks for and how the
 * door's refusals read.
 *
 * The door `admin_set_listing_tier(listing, tier, reason, note)` (T1 M1) is the
 * authority: listings:enforce with a fresh second factor, a tier among the
 * three, never a draft, a removed or the caller's own listing, a change, a
 * reason from its list, a note for Other (at most 500 characters — the move
 * door's note rules). The lists below mirror the door's so the dialog offers
 * only what it accepts; `tier-reasons.test.ts` reads them back from M1.
 * P-2 (b): the level's days (blank open-ended, 1…3650, none on the baseline).
 */

export const TIERS = ["premium", "featured", "regular"] as const;
export type TierValue = (typeof TIERS)[number];

export const TIER_REASONS: readonly string[] = ["promotion", "promotion_ended", "other"];

/** The tier's own word, the same on the console page, its badge and the dialog. */
export const TIER_LABEL: Record<TierValue, MessageKey> = {
  premium: "tier.premium",
  featured: "tier.featured",
  regular: "admin.listings.tier.regular",
};

/** P-2 (b) — where the ad's level came from (`listings.tier_source`), in words. */
export const LEVEL_SOURCE_LABEL: Readonly<Record<string, MessageKey>> = {
  launch: "admin.listings.level.source.launch",
  staff: "admin.listings.level.source.staff",
  money: "admin.listings.level.source.money",
  credits: "admin.listings.level.source.credits",
};

export function isTierValue(value: string): value is TierValue {
  return (TIERS as readonly string[]).includes(value);
}

/** Whether this listing can take a tier at all (the door's own rules, read before it is asked). */
export function mayTier(status: string): boolean {
  return status !== "removed" && status !== "draft";
}

/** P-2 (b) — the door's bound on a level's days (`admin_set_listing_tier`, badDays). */
export const TIER_DAYS_MAX = 3650;
/** The P-1 tier the door's baseline level is: it takes no days. */
const BASELINE_TIER: TierValue = "regular";

/**
 * P-2 (b) — the Days field: blank is open-ended (null); a whole number from 1
 * to 3650 is that many days; anything else is undefined (refused, never a default).
 */
export function tierDays(raw: string): number | null | undefined {
  if (raw.trim() === "") return null;
  const days = wholeNumber(raw);
  return days !== null && days >= 1 && days <= TIER_DAYS_MAX ? days : undefined;
}

/** What is still missing before the change can be sent; null when nothing is. */
export function tierProblem(
  tier: string,
  current: string | null,
  reason: string,
  note: string,
  days: string,
): MessageKey | null {
  if (!isTierValue(tier)) return "admin.listings.tier.error.unknown";
  if (tier === current) return "admin.listings.tier.error.same";
  if (reason === "") return "admin.listings.move.pickReason";
  if (reason === "other" && note.trim() === "") return "admin.listings.move.noteRequired";
  if (note.trim().length > NOTE_MAX) return "admin.listings.move.noteTooLong";
  const parsed = tierDays(days);
  if (parsed === undefined) return "admin.listings.level.error.days";
  if (parsed !== null && tier === BASELINE_TIER) return "admin.listings.level.error.baselineDays";
  return null;
}

/** The door's refusal, as the person reads it. */
export function tierErrorKey(message: string): MessageKey {
  if (message === "listing not found") return "admin.listings.move.error.notFound";
  if (message.startsWith("your own listing")) return "admin.listings.move.error.own";
  if (message === "a removed listing takes no tier") return "admin.listings.tier.error.removed";
  if (message === "nothing changed") return "admin.listings.tier.error.same";
  if (message === "unknown tier") return "admin.listings.tier.error.unknown";
  if (message === "noFreeSlot") return "admin.listings.error.noFreeSlot";
  if (message === "unknown reason") return "admin.listings.move.pickReason";
  if (message === "rateLimited") return "admin.listings.move.error.rateLimited";
  if (message === "permission denied") return "admin.listings.move.error.denied";
  if (message === "a note is required") return "admin.listings.move.noteRequired";
  if (message === "the note is too long") return "admin.listings.move.noteTooLong";
  if (message === "badDays") return "admin.listings.level.error.days";
  return "common.error";
}
