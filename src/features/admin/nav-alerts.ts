import type { NavAlertId } from "@/config/panels.types";
import { useQuery } from "@tanstack/react-query";
import { getAal } from "@/features/auth/mfa/mfa-service";
import { rpc } from "@/lib/supabase-door";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

/** The menu mark's query key, under the admin legal key so a legal write re-reads it. */
export const LEGAL_REVIEW_OVERDUE_KEY = [
  AUTH_DERIVED_ROOT,
  "admin",
  "legal",
  "reviewOverdue",
] as const;

/**
 * The admin menu's alerts: each is one server boolean (never a count); the server decides.
 * `legalReview` is read only for a caller holding legal:view AND only when the held session is aal2
 * (DEC-461): at aal1 the question is not asked (`null`, never a "no alert" that outlives the factor —
 * its staleTime is 0, so the permission re-read after the factor asks it afresh). A level that could not be
 * read is unknown: the query fails and is retried.
 */
export function useNavAlerts(
  enabled: boolean,
  permissions: readonly string[],
): ReadonlySet<NavAlertId> {
  const legal = useQuery({
    queryKey: LEGAL_REVIEW_OVERDUE_KEY,
    enabled: enabled && permissions.includes("legal:view"),
    staleTime: (query) => (query.state.data === null ? 0 : 5 * 60 * 1000),
    queryFn: async () => {
      const level = await getAal();
      if (!level.ok) throw new Error("the session's assurance level could not be read");
      if (level.current !== "aal2") return null;
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
