import { currentSession, getSupabase } from "@/lib/supabase-door";

/**
 * INC-1264 — THE SIGNED-IN PERSON'S OWN STATUS READ GOES OUT ONLY WITH A SESSION ATTACHED, AND ITS
 * FAILURE IS NAMED.
 *
 * The read (the display name and `account_status` of the account's own profile row) used to go out
 * from inside the auth listener, before the client had attached the session: on ethio-prod it was
 * answered 401 fifty-three times in one night, and its error was dropped, so a failed read looked
 * like an active account. Now: the session is read through the door first (`currentSession`, which
 * reads its `failed`); no session → no read; a read that fails is an answer the caller names
 * and reports, never a quiet "nothing".
 *
 * INC-1266 — this module sits on every page's first download (use-auth.ts is in the entry's closure),
 * so it imports nothing from `@/lib/reader-failure`: that module carries the typed failure and,
 * through `refusal.ts`, `door-refused-key.ts`. The failed answer carries the error as it arrived;
 * its one caller hands it to `reportOnDemandFailure`, which names it and offers the page's Refresh.
 */
export type AccountStatusRead =
  | { kind: "read"; displayName: string | null; status: string | null }
  /** No session is attached (the person signed out meanwhile): nothing was sent. */
  | { kind: "noSession" }
  | { kind: "failed"; error: unknown };

export async function readAccountStatus(userId: string): Promise<AccountStatusRead> {
  const held = await currentSession();
  if (held.failed) return { kind: "failed", error: held.error };
  if (held.session === null || held.session.user.id !== userId) return { kind: "noSession" };
  let supabase: Awaited<ReturnType<typeof getSupabase>>;
  try {
    supabase = await getSupabase();
  } catch (error) {
    return { kind: "failed", error };
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, account_status")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return { kind: "failed", error };
  return {
    kind: "read",
    displayName: data?.display_name ?? null,
    status: data?.account_status ?? null,
  };
}
