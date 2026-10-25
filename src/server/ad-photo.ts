import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { clientAddress } from "@/server/catalog-find.server";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { anonymousClient, logRouteError } from "@/server/supabase/user-client";
import { signPublicPhotos } from "@/server/media/links";
import { ownValue } from "@/lib/own-key";
import { plain, redirect } from "@/server/answer";

/** The photo route's plain-text refusals (plain() carries nosniff and no-store). */
function photoRefusal(status: number, text: string): Response {
  return plain(text, status);
}

/**
 * Only photos admitted by the anonymous public document can be signed. The id
 * arrives `publicId`-shaped: the route's schema checked it before anything else.
 */
export async function adPhotoResponse(request: Request, id: string): Promise<Response> {
  const path = `/l/${id}/photo.jpg`;
  const rate = await spend(DIALS.listingPhotoAddress, clientAddress(request));
  if (!rate.allowed) return photoRefusal(429, "rate limited");
  const client = anonymousClient();
  if (client === null) {
    logRouteError(path, "supabase server env missing");
    return photoRefusal(500, "internal error");
  }
  const { data, error } = await client.rpc("public_listing", { p_public_id: id });
  if (error) {
    logRouteError(path, error.message);
    return photoRefusal(503, "upstream unavailable");
  }
  if (data === null) return photoRefusal(404, "not found");
  const doc = data as unknown as PublicListingDoc;
  const cover = doc.photos.find((photo) => photo.id === doc.cover_photo_id) ?? doc.photos[0];
  if (cover === undefined) return photoRefusal(404, "not found");
  // D234 S2 — the document's own photos are signed as they stand (signPublicPhotos).
  const links = await signPublicPhotos([cover], ["card"]);
  const link = ownValue(links, cover.id)?.card;
  if (link === undefined) return photoRefusal(404, "not found");
  return redirect(link, { status: 302, cache: "private, max-age=1800" });
}
