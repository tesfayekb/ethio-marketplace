import { listingPath, parseAddressSegment } from "@/features/ad-page/address";
import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { clientAddress } from "@/server/catalog-find.server";
import { anonymousClient, consumeRate, envDial } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";

export const READ_LIMIT_PER_HOUR = 600;
export type AdPageAnswer =
  | { kind: "ad"; doc: PublicListingDoc; canonical: string }
  | { kind: "gone" }
  | { kind: "rate" };

/** The server-only public read; refusals never disclose whether a private ad exists. */
export async function readAdPage(request: Request, slug: string): Promise<AdPageAnswer> {
  if (slug.length > 200) return { kind: "gone" };
  const parsed = parseAddressSegment(slug);
  if (parsed === null) return { kind: "gone" };
  try {
    const rate = await consumeRate(
      "listing-read:address",
      clientAddress(request),
      envDial("RATE_LIMIT_LISTING_READ_PER_HOUR", READ_LIMIT_PER_HOUR),
      "1 hour",
    );
    if (!rate.allowed) return { kind: "rate" };
    const client = anonymousClient();
    if (client === null) {
      console.error("[ssr-error] /l serverEnv");
      return { kind: "gone" };
    }
    const started = performance.now();
    const { data, error } = await client.rpc("public_listing", { p_public_id: parsed.publicId });
    if (performance.now() - started > 5000) console.error("[slow-rpc] /l public_listing");
    if (error) throw new Error(`public_listing ${errorText(error.message)}`);
    if (data === null) return { kind: "gone" };
    const doc = data as unknown as PublicListingDoc;
    return { kind: "ad", doc, canonical: listingPath(doc.title, doc.public_id) };
  } catch (error) {
    console.error("[ssr-error] /l", errorText(error));
    throw error;
  }
}
