import { errorText } from "@/lib/error-text";
import { getSupabase } from "@/lib/supabase-door";

export type Client = Awaited<ReturnType<typeof getSupabase>>;

/**
 * INC-915 (Foundations turn 34, ruling 2) — THE ONE PLACE THE AUTH FEATURE ASKS THE DOOR FOR
 * THE CLIENT. A failed download is a failed action: logged here, answered as null, and each
 * action returns its own failure answer — never a rejection that leaves a screen busy.
 *
 * INC-1069 (F1-1) — a leaf: it imports the door and nothing of the auth service, so the
 * provider's account-sync calls (preferred-language.ts) can share it without carrying the
 * whole service onto every page's first download.
 */
export async function authClient(): Promise<Client | null> {
  try {
    return await getSupabase();
  } catch (error) {
    console.error("[client-error] the sign-in code did not load:", errorText(error));
    return null;
  }
}
