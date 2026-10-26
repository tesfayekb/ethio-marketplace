import { redirect } from "@tanstack/react-router";
import { errorText } from "@/lib/error-text";
import { currentSession } from "@/lib/supabase-door";

/**
 * The one door-step of a signed-in screen (INC-852): the session the browser
 * holds decides the screen; the door behind it stays the authority (AGENTS.md
 * line 16). Call it from beforeLoad with the path to return to, parameters
 * encoded.
 *
 * C2e.2 — the session the browser holds; no auth-server round trip. RLS and
 * the server routes stay the authority behind this screen choice.
 */
export async function requireSignedIn(returnTo: string): Promise<{ userId: string }> {
  // DEC-261 — through the client's door: a signed-out visitor is sent on without the client.
  const read = await currentSession();
  // INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN: the page
  // shows the route's error view, whose one cure is a refresh — never the sign-in page, which
  // a signed-in visitor would be sent to (and, holding a session, sent back from).
  if (read.failed) throw new Error(`the session could not be read: ${errorText(read.error)}`);
  const user = read.session?.user ?? null;
  if (user === null) throw redirect({ to: "/auth", search: { return: returnTo } });
  return { userId: user.id };
}
