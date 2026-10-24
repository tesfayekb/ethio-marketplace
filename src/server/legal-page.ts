import { errorText } from "@/lib/error-text";
import { legalPageData, type LegalPageData } from "@/features/legal/legal-page-data";
import { anonymousClient } from "@/server/supabase/user-client";

export type { LegalPageData };

/**
 * Bundle 22 turn 3 — a public legal page's data: the version in force and the next one ahead of its date,
 * for all countries (no country) or, turn 32, a country's statement (`country`). A missing server environment or a door error logs one [ssr-error] line
 * and throws, so the page shows its error state, never a phantom "soon" (F4).
 * Foundations turn 1 (D5): the read itself is legal-reader.ts's legalPageData;
 * this is the anonymous SSR door onto it (terms, privacy, the public scratch
 * kinds — a publishing-class kind never reaches it, D236).
 */
export async function legalPage(kind: string, country?: string): Promise<LegalPageData> {
  const client = anonymousClient();
  if (client === null) {
    console.error(`[ssr-error] /${kind} serverEnv`);
    throw new Error("legal page: server environment missing");
  }
  try {
    return await legalPageData(client, kind, country);
  } catch (failure) {
    console.error(`[ssr-error] /${kind}`, errorText(String(failure)));
    throw failure;
  }
}
