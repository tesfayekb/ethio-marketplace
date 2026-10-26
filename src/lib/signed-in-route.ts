import { redirect } from "@tanstack/react-router";
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
  const { session } = await currentSession();
  const user = session?.user ?? null;
  if (user === null) throw redirect({ to: "/auth", search: { return: returnTo } });
  return { userId: user.id };
}
