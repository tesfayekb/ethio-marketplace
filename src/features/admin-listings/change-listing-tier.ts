import { stepUpAbortKey, type GuardFn } from "@/features/auth/mfa/use-step-up";
import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

import { tierErrorKey } from "./tier-reasons";
import { setAdminListingTier } from "./use-admin-listing";

/**
 * P-1 W4 — how "Set tier" ends, the same from the ad's page and the table's
 * row menu: done; the second factor cancelled (the dialog stays as it was); or
 * a refusal in the person's words (`tierErrorKey`, the one mapper). Its own
 * file: `use-admin-listing.ts` rides the posting path (`use-edit-draft.ts`),
 * and the tier words must not.
 */
export type TierOutcome =
  | { ok: true; status: string }
  | { ok: false; cancelled: true }
  | { ok: false; cancelled: false; refusal: MessageKey };

/** The one runner of the tier door under the step-up guard. */
export async function changeListingTier(
  guard: GuardFn,
  listingId: string,
  tier: string,
  reason: string,
  note: string,
): Promise<TierOutcome> {
  try {
    // P-2 (a) M-1c — the level's days have no control yet: open-ended.
    const { status } = await guard(() => setAdminListingTier(listingId, tier, reason, note, null));
    return { ok: true, status };
  } catch (error) {
    const abort = stepUpAbortKey(error);
    if (abort === null) return { ok: false, cancelled: true };
    return { ok: false, cancelled: false, refusal: abort ?? tierErrorKey(errorText(error)) };
  }
}
