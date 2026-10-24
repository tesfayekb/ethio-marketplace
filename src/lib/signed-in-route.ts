import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

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
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user ?? null;
  if (user === null) throw redirect({ to: "/auth", search: { return: returnTo } });
  return { userId: user.id };
}
