import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import type { ReaderError } from "@/lib/reader-failure";
import { currentSession } from "@/lib/supabase-door";

import { authClient } from "./auth-client";

/**
 * D239 — THE ACCOUNT-SYNC SEAM (amends U4h).
 *
 * The account's `preferred_language` decides at session start when it is
 * published; an account with none receives the device's language. The
 * provider's account rule owns that precedence; these two calls are the only
 * DB seam it uses.
 *
 * INC-1069 (F1-1) — a LEAF the i18n provider imports: it reaches the door and
 * the auth feature's client helper only, never auth-service.ts (sign-up, OAuth,
 * passwords, identities), so the provider chunk every page downloads carries
 * these two calls and nothing of the service. A module every page loads imports
 * leaf modules, never a feature's service.
 *
 * Law F4 — never a silent swallow: a failed read is a typed `ReaderError`,
 * and signed out is its own answer, never a failure and never "no language".
 */
export type PreferredLanguageRead =
  | { ok: true; code: string | null }
  | { ok: false; signedOut: true }
  | { ok: false; signedOut: false; error: ReaderError };

// INC-864 — reader-failure stays off the first paint: it loads only when a read failed.
const readerFailureModule = loadOnce(() => import("@/lib/reader-failure"));
async function typedReadError(
  failure: { class: "auth" | "network"; message: string } | { error: unknown },
): Promise<ReaderError> {
  let mod: typeof import("@/lib/reader-failure");
  try {
    mod = await readerFailureModule.load();
  } catch (error) {
    // INC-911 — the shell's one notice offers Refresh; the caller keeps the device's choice.
    reportOnDemandFailure("reader-failure", error);
    throw error;
  }
  return new mod.ReaderError("error" in failure ? mod.readerFailure(failure.error) : failure);
}

export async function fetchPreferredLanguage(): Promise<PreferredLanguageRead> {
  // DEC-261 — the session through the door: a signed-out device fetches no client.
  const read = await currentSession();
  // INC-914 — a session that could not be read is not "no session".
  if (read.failed) {
    return {
      ok: false,
      signedOut: false,
      error: await typedReadError({ class: "auth", message: "the session could not be read" }),
    };
  }
  const userId = read.session?.user?.id;
  if (!userId) return { ok: false, signedOut: true };
  const supabase = await authClient();
  if (supabase === null) {
    return {
      ok: false,
      signedOut: false,
      error: await typedReadError({ class: "network", message: "the client did not load" }),
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return { ok: false, signedOut: false, error: await typedReadError({ error }) };
  return { ok: true, code: data?.preferred_language ?? null };
}

/**
 * Pushes the device ★ up to the account. Own-row only and publication-gated in
 * the database (`user_set_preferred_language`); the client never decides.
 */
export async function savePreferredLanguage(
  code: string | null,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  // DEC-261 — a signed-out device's star is the ordinary case: no client is fetched for it.
  const read = await currentSession();
  // INC-914 — a session that could not be read is not "no session".
  if (read.failed) return { ok: false, reason: "the session could not be read" };
  if (!read.session) return { ok: false, reason: "no session" };
  const supabase = await authClient();
  if (supabase === null) return { ok: false, reason: "the client did not load" };

  const { error } = await supabase.rpc("user_set_preferred_language", { p_code: code as string });
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}
