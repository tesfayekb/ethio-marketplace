import type { MessageKey } from "@/i18n/types";
import type { DoorFamily } from "@/lib/door-family";
import { failureSqlstate, readRefusal } from "@/lib/refusal";

/**
 * INC-1280 (10a-2, D30) — the account status and role doors' words (`admin_set_account_status`,
 * `assign_role`, `revoke_role`). A code with no line draws the block's own generic. Kept beside
 * the one person's page, so its words stay in the admin layer.
 */
export const ACCESS_REFUSALS = {
  words: {
    unknownUser: "admin.users.error.unknownUser",
    required: "post.refusal.required",
    roleReserved: "admin.users.roles.reserved",
    unknownRole: "admin.users.roles.unknown",
    badCountryCode: "admin.countries.error.badCountryCode",
  },
} as const satisfies DoorFamily<{
  doors: "admin_set_account_status" | "assign_role" | "revoke_role";
  unreachable: {
    badValue: "the status block sends an AccountStatus, the door's own statuses";
  };
}>;

/**
 * A status or role refusal as the words its block draws; null for a failure that is not a
 * door's refusal (a network or server failure), which the failure notice draws with its Retry.
 */
export function accessRefusalKey(error: unknown, block: "status" | "roles"): MessageKey | null {
  const generic = block === "status" ? "admin.users.status.failed" : "admin.users.roles.failed";
  const read = readRefusal(error, { ...ACCESS_REFUSALS, generic });
  if (read.silent) return null;
  if (read.branch === "family" || read.branch === "doorCode") return read.key;
  // A raised refusal (SQLSTATE class P0) with no line still draws the block's generic.
  return failureSqlstate(error)?.startsWith("P0") === true ? read.key : null;
}
