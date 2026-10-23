import { errorText } from "@/lib/error-text";
import { parseLegalVersion, type PublicLegalVersion } from "@/features/legal/legal-reader";
import { anonymousClient } from "@/server/supabase/user-client";

export type LegalPageData = {
  inForce: PublicLegalVersion | null;
  scheduled: PublicLegalVersion | null;
};

/**
 * Bundle 22 turn 3 — a public legal page's data: the version in force and the next one ahead of its date,
 * for all countries (no country) or, turn 32, a country's statement (`country`). A missing server environment or a door error logs one [ssr-error] line
 * and throws, so the page shows its error state, never a phantom "soon" (F4).
 */
export async function legalPage(kind: string, country?: string): Promise<LegalPageData> {
  const client = anonymousClient();
  if (client === null) {
    console.error(`[ssr-error] /${kind} serverEnv`);
    throw new Error("legal page: server environment missing");
  }
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
    if (answer.error) {
      console.error(`[ssr-error] /${kind}`, errorText(answer.error.message));
      throw new Error(`legal page ${errorText(answer.error.message)}`);
    }
  }
  try {
    return {
      inForce: inForce.data == null ? null : parseLegalVersion(inForce.data, "legal_in_force"),
      scheduled:
        scheduled.data == null ? null : parseLegalVersion(scheduled.data, "legal_scheduled"),
    };
  } catch (failure) {
    console.error(`[ssr-error] /${kind}`, errorText(String(failure)));
    throw failure;
  }
}
