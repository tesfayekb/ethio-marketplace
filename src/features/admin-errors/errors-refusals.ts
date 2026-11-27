import type { MessageKey } from "@/i18n";
import type { DoorFamily } from "@/lib/door-family";
import { readRefusal } from "@/lib/refusal";

/**
 * DEC-474 Part F — THE ERROR REPORTS' WORDS FOR THEIR THREE STAFF DOORS. The doors answer the gate
 * codes (no second factor, no dial: signed out, deactivated, no permission) and `badValue:<field>`,
 * which the readers never provoke: they send bounded values only (errors-service.ts). Anything else
 * that reaches the page draws the server's line.
 */
export const ERROR_DOOR_REFUSALS = {
  words: {
    notSignedIn: "session.expired",
    permissionDenied: "failure.noAccess",
    accountDeactivated: "failure.noAccess",
  },
  generic: "failure.server",
} as const satisfies DoorFamily<{
  doors: "admin_error_groups" | "admin_error_occurrences" | "admin_error_stats";
  unreachable: {
    badValue: "never produced from the calling screen: errors-service.ts sends days clamped to 1–366, a kind from ERROR_KINDS, a group read back from the groups answer, a limit clamped to 1–100 and a cursor whole or absent";
  };
}>;

/** The words for a refusal of the error doors, read through the one reader. */
export function errorsRefusalKey(error: unknown): MessageKey {
  return readRefusal(error, ERROR_DOOR_REFUSALS).key;
}
