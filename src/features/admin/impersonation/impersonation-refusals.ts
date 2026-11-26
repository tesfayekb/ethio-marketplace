import type { DoorFamily } from "@/lib/door-family";
import { readRefusal } from "@/lib/refusal";
import { ADMIN_WHEN, RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * Bundle 10b (D31) — View as's own words for `begin_impersonation`'s codes
 * (scripts/doors/manifest.txt: badLength, impersonateSelf, impersonateSuperAdmin, sessionActive,
 * unknownUser), and the reason field's blank mark. A code it does not name reads its generic.
 */
export const BEGIN_REFUSALS = {
  when: ADMIN_WHEN,
  words: {
    required: "post.refusal.required",
    rateLimited: RATE_LIMITED_KEY,
    impersonateSelf: "impersonation.error.self",
    impersonateSuperAdmin: "impersonation.error.superAdmin",
    unknownUser: "admin.users.error.unknownUser",
    badLength: "impersonation.reasonTooShort",
    sessionActive: "impersonation.error.sessionActive",
  },
  generic: "impersonation.failed",
} as const satisfies DoorFamily<{ doors: "begin_impersonation"; also: { required: "formGate" } }>;
