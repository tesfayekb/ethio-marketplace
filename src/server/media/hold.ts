import type { AiGate } from "@/server/ai/meter";

/**
 * D158 item 3 (bundle 13 turn 6) — WHAT AN UPLOAD DOES WITH PHOTO SCREENING'S SWITCH.
 *
 * The operator's rule: when photo screening is off, photos are "saved, never shown
 * to buyers, until staff approve"; posting keeps working; staff approve them with
 * the ad (his answer of 2026-10-13: "Approve with the ad").
 *
 *   - on                                → `screen`: the policy pass, as before;
 *   - off by staff, on an ad whose next step is the screening queue (a draft, or
 *     a rejected ad sent again)        → `hold`: stored `unscreened`, no pass and
 *                                         nothing metered; approving the ad shows it;
 *   - off by staff, on an ad that is live or past the queue (active, reduced,
 *     held by staff, expired)          → `paused`: refused, because nothing would
 *                                         put the photo in front of staff;
 *   - a switch that could not be read  → `unavailable`: refused with a retry, as
 *                                         before (F4: it fails closed). A budget
 *                                         never switches photo screening off.
 */
export type PhotoScreenPlan = "screen" | "hold" | "paused" | "unavailable";

/**
 * The statuses whose ad may still gain, lose or change a photo: the upload route
 * (src/routes/api/upload/photo.ts) and background removal
 * (src/routes/api/listings/background.ts) read this one set.
 */
export const PHOTO_OPEN_STATUSES: ReadonlySet<string> = new Set([
  "draft",
  "active",
  "reduced",
  "rejected",
  "held",
  "expired",
]);
/** The statuses whose next step is the screening queue (publish_listing: draft and rejected). */
export const HOLD_STATUSES: ReadonlySet<string> = new Set(["draft", "rejected"]);

export function photoScreenPlan(gate: AiGate, status: string): PhotoScreenPlan {
  if (gate.on) return "screen";
  if (gate.reason !== "staff") return "unavailable";
  return HOLD_STATUSES.has(status) ? "hold" : "paused";
}
