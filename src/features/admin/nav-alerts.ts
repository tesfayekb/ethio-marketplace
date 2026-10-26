import type { NavAlertId } from "@/config/panels.types";
import { useQuery } from "@tanstack/react-query";
import { rpc } from "@/lib/supabase-door";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import type { MessageKey } from "@/i18n";

/** Bundle 22 turn 20 (DEC-219) — the words each menu alert adds to its entry's accessible name. */
export const NAV_ALERT_LABELS: Record<NavAlertId, MessageKey> = {
  legalReview: "admin.nav.alert.legalReview",
};

/** The menu mark's query key, under the admin legal key so a legal write re-reads it. */
export const LEGAL_REVIEW_OVERDUE_KEY = [
  AUTH_DERIVED_ROOT,
  "admin",
  "legal",
  "reviewOverdue",
] as const;

/**
 * The admin menu's alerts: each is one server boolean (never a count); the server decides.
 * `legalReview` is read only for a caller holding legal:view.
 */
export function useNavAlerts(
  enabled: boolean,
  permissions: readonly string[],
): ReadonlySet<NavAlertId> {
  const legal = useQuery({
    queryKey: LEGAL_REVIEW_OVERDUE_KEY,
    enabled: enabled && permissions.includes("legal:view"),
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await rpc("legal_review_overdue");
      if (error) throw error;
      if (typeof data !== "boolean") throw new Error("legal_review_overdue: invalid answer");
      return data;
    },
  });
  return legal.data === true ? LEGAL_REVIEW : NONE;
}

const NONE: ReadonlySet<NavAlertId> = new Set();
const LEGAL_REVIEW: ReadonlySet<NavAlertId> = new Set(["legalReview"]);
