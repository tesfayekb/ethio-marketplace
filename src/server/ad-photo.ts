import { isPublicId } from "@/features/ad-page/address";
import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { clientAddress } from "@/server/catalog-find.server";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { anonymousClient, logRouteError } from "@/server/supabase/user-client";
import { signPhotoRows } from "@/server/media/links";
import { ownValue } from "@/lib/own-key";

function photoRefusal(status: number, text: string): Response {
  return new Response(text, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Only photos admitted by the anonymous public document can be signed. */
export async function adPhotoResponse(request: Request, id: string): Promise<Response> {
  if (!isPublicId(id)) return photoRefusal(404, "not found");
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
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const links = await signPhotoRows(
    supabaseAdmin,
    [{ id: cover.id, paths: cover.paths, exif_stripped: true }],
    ["card"],
  );
  const link = ownValue(links, cover.id)?.card;
  if (link === undefined) return photoRefusal(404, "not found");
  return new Response(null, {
    status: 302,
    headers: {
      Location: link,
      "Cache-Control": "private, max-age=1800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
