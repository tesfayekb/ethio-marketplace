import { errorText } from "@/lib/error-text";
import { forgetStoredSession } from "@/lib/supabase-door";

import { authClient } from "./auth-client";
import { CLIENT_FAILED } from "./auth-result";
import type { AuthResult } from "./types";

/**
 * DEC-348 (F1-1, ruling 5) — SIGN-OUT IS A LEAF. The shell's auth hook (use-auth.ts) owns the
 * session state and sign-out, nothing else: it imports this module, never auth-service.ts
 * (sign-up, OAuth, passwords, identities), so the service stays out of every page's first
 * download. The service re-exports `signOut` for its neighbours; the body is DEC-268's law,
 * unchanged.
 *
 * DEC-411 — sign-out ends the session on THIS device only (`scope: "local"`): the person's other
 * devices stay signed in. "Sign out other devices" and a credential change still end the others
 * (auth-service.ts, `scope: "others"`). Supersedes U0j's (INC-072) global sign-out.
 */
export async function signOut(): Promise<AuthResult> {
  const supabase = await authClient();
  // DEC-268 (Foundations turn 34b-1) — the session ends on this device whatever the answer: a
  // sign-out that could not reach the server, or whose client did not load, removes the stored
  // session itself, and answers its failure so the shell reloads to read that.
  if (supabase === null) {
    forgetStoredSession();
    return CLIENT_FAILED;
  }
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    forgetStoredSession();
    // INC-1153 — the shell reads only `ok` (app-shell, DEC-268), so the failure answers the one generic
    // line without the mapper (which would carry the reader into every page); the provider's own words
    // are logged once, here.
    console.warn(`[auth] the sign-out was not accepted: ${errorText(error)}`);
    return { ok: false, errorKey: "auth.errorGeneric" };
  }
  return { ok: true };
}
