import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { parseLegalVersion, type PublicLegalVersion } from "./legal-reader";

/**
 * Foundations turn 1, continuation 3 (INC-864) — the legal PAGE's data lives
 * here, off the first paint: the root's acceptance gate imports
 * legal-kinds.ts and legal-reader.ts, so page-only code in either reached the
 * entry's static closure. The gate and the acceptance screens keep reading
 * those two; the public and signed-in legal pages read this module.
 */

export type LegalPageData = {
  inForce: PublicLegalVersion | null;
  scheduled: PublicLegalVersion | null;
};

/**
 * Foundations turn 1 (D5) — the one page reader: the version in force and the
 * next one ahead of its date, for all countries (no country) or a country's
 * statement. A door error is a typed ReaderError (INC-847), never a bare
 * Error; the caller decides how the failure surfaces (the SSR reader logs its
 * [ssr-error] line, the signed-in page shows the class word).
 */
export async function legalPageData(
  client: SupabaseClient<Database>,
  kind: string,
  country?: string,
): Promise<LegalPageData> {
  const started = performance.now();
  const [inForce, scheduled] = await Promise.all([
    client.rpc("legal_in_force", country ? { p_kind: kind, p_country: country } : { p_kind: kind }),
    client.rpc(
      "legal_scheduled",
      country ? { p_kind: kind, p_country: country } : { p_kind: kind },
    ),
  ]);
  if (performance.now() - started > 5000) console.error(`[slow-rpc] /${kind} legal_page`);
  for (const answer of [inForce, scheduled]) {
    if (answer.error) throw new ReaderError(readerFailure(answer.error));
  }
  return {
    inForce: inForce.data == null ? null : parseLegalVersion(inForce.data, "legal_in_force"),
    scheduled: scheduled.data == null ? null : parseLegalVersion(scheduled.data, "legal_scheduled"),
  };
}
