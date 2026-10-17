import { anonymousClient } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";

const NAME_PATTERN = /^[A-Za-z0-9_]{1,60}$/;

/**
 * Bundle 19 turn 17 (DEC-107, DEC-108) — does a seller's page exist at
 * ethio.com/<name>? A malformed name is refused without a database call; a
 * well-formed one asks seller_feed_page for one card — the door's
 * "unknownSeller" refusal means no such seller. Any other failure throws so
 * the page reports an error, never a phantom 404 (F4).
 */
export async function sellerExists(name: string): Promise<boolean> {
  if (!NAME_PATTERN.test(name)) return false;
  const client = anonymousClient();
  if (client === null) {
    console.error("[ssr-error] /$name serverEnv");
    throw new Error("seller page: server environment missing");
  }
  const started = performance.now();
  const { error } = await client.rpc("seller_feed_page", {
    p_seller_key: name.toLowerCase(),
    p_after: null,
    p_size: 1,
  });
  if (performance.now() - started > 5000) console.error("[slow-rpc] /$name seller_feed_page");
  if (error === null) return true;
  if (error.message.startsWith("seller_feed_page: unknownSeller")) return false;
  console.error("[ssr-error] /$name", errorText(error.message));
  throw new Error(`seller_feed_page ${errorText(error.message)}`);
}
