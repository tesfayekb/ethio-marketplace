import type { NavAlertId } from "@/config/panels.types";
import { useLegalReviewOverdue } from "@/features/admin/legal/use-legal";
import type { MessageKey } from "@/i18n";

/** Bundle 22 turn 20 (DEC-219) — the words each menu alert adds to its entry's accessible name. */
export const NAV_ALERT_LABELS: Record<NavAlertId, MessageKey> = {
  legalReview: "admin.nav.alert.legalReview",
};

/**
 * The admin menu's alerts: each is one server boolean (never a count); the server decides.
 * `legalReview` is read only for a caller holding legal:view.
 */
export function useNavAlerts(
  enabled: boolean,
  permissions: readonly string[],
): ReadonlySet<NavAlertId> {
  const legal = useLegalReviewOverdue(enabled && permissions.includes("legal:view"));
  return legal.data === true ? LEGAL_REVIEW : NONE;
}

const NONE: ReadonlySet<NavAlertId> = new Set();
const LEGAL_REVIEW: ReadonlySet<NavAlertId> = new Set(["legalReview"]);
