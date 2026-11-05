import type { MessageKey } from "@/i18n";

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

export function isTierValue(value: string): value is TierValue {
  return (TIERS as readonly string[]).includes(value);
}

/** Whether this listing can take a tier at all (the door's own rules, read before it is asked). */
export function mayTier(status: string): boolean {
  return status !== "removed" && status !== "draft";
}

/** What is still missing before the change can be sent; null when nothing is. */
export function tierProblem(
  tier: string,
  current: string,
  reason: string,
  note: string,
): MessageKey | null {
  if (!isTierValue(tier)) return "admin.listings.tier.error.unknown";
  if (tier === current) return "admin.listings.tier.error.same";
  if (reason === "") return "admin.listings.move.pickReason";
  if (reason === "other" && note.trim() === "") return "admin.listings.move.noteRequired";
  if (note.trim().length > NOTE_MAX) return "admin.listings.move.noteTooLong";
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
  return "common.error";
}
