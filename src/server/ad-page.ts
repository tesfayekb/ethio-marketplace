import { listingPath, parseAddressSegment } from "@/features/ad-page/address";
import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { clientAddress } from "@/server/catalog-find.server";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { anonymousClient } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";
import type { PhotoLinks } from "@/features/posting/photo-links";
import { signPublicPhotos } from "@/server/media/links";

export type AdPageAnswer =
  | { kind: "ad"; doc: PublicListingDoc; canonical: string; photoLinks: PhotoLinks | null }
  | { kind: "gone" }
  | { kind: "rate" };

/** The server-only public read; refusals never disclose whether a private ad exists. */
export async function readAdPage(request: Request, slug: string): Promise<AdPageAnswer> {
  if (slug.length > 200) return { kind: "gone" };
  const parsed = parseAddressSegment(slug);
  if (parsed === null) return { kind: "gone" };
  try {
    const rate = await spend(DIALS.listingReadAddress, clientAddress(request));
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
    return {
      kind: "ad",
      doc,
      canonical: listingPath(doc.title, doc.public_id),
      photoLinks: await signedPhotoLinks(doc),
    };
  } catch (error) {
    console.error("[ssr-error] /l", errorText(error));
    throw error;
  }
}

/**
 * D234 S2 — the ad's photo links, signed from the page's own public read: the
 * document holds only the photos the public policy admits, so they are signed as
 * they stand (signPublicPhotos, src/server/media/links.ts — no second read). A
 * failed or empty signing never fails the page: the answer carries no links (one
 * [ad-links] line) and the browser asks /api/media/photo-links as before — the
 * feed's `coverLinks` answer the same way (DEC-195, src/routes/api/feed.ts).
 */
async function signedPhotoLinks(doc: PublicListingDoc): Promise<PhotoLinks | null> {
  if (doc.photos.length === 0) return null;
  try {
    const links = await signPublicPhotos(doc.photos);
    if (Object.keys(links).length > 0) return links;
    console.error("[ad-links] /l signing answered no links");
  } catch (error) {
    console.error("[ad-links] /l", errorText(error));
  }
  return null;
}
