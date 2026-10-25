import type { PolicyVerdict } from "./policy";

/**
 * D158 item 3 (bundle 13 turn 6) — WHAT AN UPLOAD DOES WITH PHOTO SCREENING'S SWITCH.
 *
 * The operator's rule: when photo screening is off, photos are "saved, never shown
 * to buyers, until staff approve"; posting keeps working; staff approve them with
 * the ad (his answer of 2026-10-13: "Approve with the ad").
 *
 * Since Foundations turn 17 the switch, the site's day cap on paid screens
 * (D184) and the stand-in are the AI gateway's order (`aiCall("photo_screen")`,
 * src/server/media/policy.ts `screenPhotoPolicy`): off by staff or by budget —
 * the monthly budget's self-switch, or the day cap refused by the call's
 * reservation — and the photo is HELD on any ad (bundle 16 turn 4a, D178/D177:
 * stored hidden with a `held` review that staff see and decide in Admin); a
 * switch that could not be read fails closed as `providerUnavailable` with a
 * retry (F4). The plan mapping itself is `screenAnswerOf` beside the call.
 */

/**
 * The statuses whose ad may still gain, lose or change a photo: the upload route
 * (src/routes/api/upload/photo.ts) and background removal
 * (src/routes/api/listings/background.ts) read this one set.
 */
export const PHOTO_OPEN_STATUSES: ReadonlySet<string> = new Set([
  "draft",
  "active",
  "reduced",
  // Bundle 16 turn R2 (INC-631) — a closed ad ("No longer available", turn 1) is edited like a live one.
  "closed",
  "rejected",
  "held",
  "expired",
]);

/**
 * Bundle 16 turn 4a (D178, D183) — the fail codes a person may still allow: a photo
 * failed with one of these is STORED HIDDEN for staff. Nudity is refused at upload
 * and never stored (D183); a smaller copy showing another picture is refused too
 * (the stored sizes would disagree). The database holds the same list
 * (listing_photo_review_label, listing_photo_reviews_code_check).
 */
export const STORED_FAIL_CODES: ReadonlySet<string> = new Set([
  "violence",
  "weapon",
  "drugs",
  "hate_symbol",
  "personal_document",
  "contact_in_image",
  "stock_watermark",
  "not_a_photo",
]);

/**
 * Why a stored photo is hidden for a person (`listing_photo_reviews.label`, less
 * `held`); a type, not an interface, so it travels as the door's JSON argument.
 */
export type PhotoReview = {
  label: "unsure" | "not_right" | "fail";
  code?: string;
  evidence?: string;
};

/**
 * What the upload does with the screen's verdict (D178): `show` a clean pass;
 * `review` a photo the screen is unsure about, one that may not show what the ad
 * sells, or one it failed with a code a person may allow — stored hidden, with
 * its review; `refuse` nudity, a mismatched copy and the provider's own failure.
 */
export type PhotoOutcome =
  | { kind: "show" }
  | { kind: "review"; review: PhotoReview }
  | { kind: "refuse" };

export function photoOutcome(verdict: PolicyVerdict): PhotoOutcome {
  if (verdict.ok) {
    const warnings = verdict.warnings ?? [];
    if (warnings.includes("unsure")) {
      return {
        kind: "review",
        review: {
          label: "unsure",
          ...(verdict.evidence === undefined ? {} : { evidence: verdict.evidence }),
        },
      };
    }
    if (warnings.includes("not_relevant"))
      return { kind: "review", review: { label: "not_right" } };
    return { kind: "show" };
  }
  if (STORED_FAIL_CODES.has(verdict.code)) {
    return {
      kind: "review",
      review: {
        label: "fail",
        code: verdict.code,
        ...(verdict.evidence === "" ? {} : { evidence: verdict.evidence }),
      },
    };
  }
  return { kind: "refuse" };
}
