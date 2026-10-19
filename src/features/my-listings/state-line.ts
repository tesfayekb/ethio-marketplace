import { fill } from "@/features/posting/refusal-text";
import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";

import type { MyListingRow, SoldWord } from "./my-listings";

/**
 * Bundle 16 turn 3 — AN AD'S STATE IN WORDS, one line per status, shared by the
 * My listings page (each row) and one ad's page, so the two can never word the
 * same ad differently. It moved here from the list page unchanged (turn 2).
 */

/** The removal reasons a seller may be told (admin_move_listing's list for a removal). */
export const REMOVAL_REASON: Record<string, MessageKey> = {
  prohibited: "admin.listings.reason.prohibited",
  misleading: "admin.listings.reason.misleading",
  duplicate: "admin.listings.reason.duplicate",
  contact_in_text: "admin.listings.reason.contact_in_text",
  photo: "admin.listings.reason.photo",
  rules: "admin.listings.reason.rules",
  other: "admin.listings.reason.other",
};

/** Every reason staff may give a seller (a removal's, an edit's, a restore's), for the ad's history. */
export const REASON_WORD: Record<string, MessageKey> = {
  ...REMOVAL_REASON,
  wrong_category: "admin.listings.reason.wrong_category",
  removed_in_error: "admin.listings.reason.removed_in_error",
  appeal_accepted: "admin.listings.reason.appeal_accepted",
  undo: "admin.listings.reason.undo",
};

/** The line of a sold ad, by its word. */
export const SOLD_ON: Record<SoldWord, MessageKey> = {
  sold: "myListings.soldOn",
  rented: "myListings.rentedOn",
  filled: "myListings.filledOn",
};

/**
 * Bundle 16 turn 3c (D180) — WHAT BUYERS SEE OF THE AD, said on the seller's ad page. The rule is the database's
 * (the public reads and the feed, migration of bundle 16 turn 3c): a live ad is seen; a sold one is seen marked
 * with its word for 30 days after it sold, its contact closed; every other ad is not seen. Reach is staff's lever
 * and is not shown (spec: a reduced ad reads as live).
 */
export const SOLD_SHOWN_DAYS = 30;

export type Visibility = "seen" | "soldSeen" | "hidden";

export function visibilityOf(
  row: Pick<MyListingRow, "status" | "soldAt">,
  now: number = Date.now(),
  soldDays: number = SOLD_SHOWN_DAYS,
): Visibility {
  if (row.status === "active" || row.status === "reduced") return "seen";
  if (row.status === "sold" && row.soldAt !== null) {
    const soldAt = Date.parse(row.soldAt);
    if (Number.isFinite(soldAt) && now - soldAt < soldDays * 86_400_000) return "soldSeen";
  }
  return "hidden";
}

export function stateLine(
  row: MyListingRow,
  t: (key: MessageKey) => string,
  day: (iso: string | null) => string,
): string {
  switch (row.status) {
    case "active":
    case "reduced":
      if (row.daysLeft === null) return t("myListings.noEnd");
      if (row.daysLeft === 0) return t("myListings.endsToday");
      return fill(t("myListings.daysLeft"), { count: String(row.daysLeft) });
    case "screening":
    case "held":
      return t("myListings.inReview");
    case "rejected":
      return t("myListings.notApproved");
    case "removed": {
      const reason =
        row.removedReason === null ? undefined : ownValue(REMOVAL_REASON, row.removedReason);
      return reason === undefined
        ? t("myListings.removed")
        : fill(t("myListings.removedBecause"), { reason: t(reason) });
    }
    case "closed":
      return row.daysKept === null
        ? t("myListings.closedLine")
        : `${t("myListings.closedLine")} · ${fill(t("myListings.daysKept"), { count: String(row.daysKept) })}`;
    case "expired":
      return fill(t("myListings.expiredOn"), { date: day(row.expiresAt) });
    case "sold":
      // Turn 3b (call H) — Rented or Filled when the ad's category says so.
      return fill(t(SOLD_ON[row.soldWord]), { date: day(row.soldAt) });
    case "draft":
      return fill(t("myListings.savedOn"), { date: day(row.updatedAt ?? row.createdAt) });
    default:
      return "";
  }
}
