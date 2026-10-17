import { isPublicId } from "@/features/ad-page/address";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import {
  consumeRate,
  envDial,
  logRouteError,
  readJsonBody,
  routeJson,
  upstreamFailed,
  upstreamUnavailable,
  userClientFromRequest,
} from "@/server/supabase/user-client";

export const VIEW_LIMIT_PER_HOUR = 600;

/** D201 rule 10 — the address dial precedes the existing counter door. */
export async function countAdView(request: Request): Promise<Response> {
  const body = await readJsonBody(request);
  const publicId = body["publicId"];
  if (typeof publicId !== "string" || !isPublicId(publicId)) {
    return routeJson({ error: "bad request" }, 400);
  }
  const address = clientAddress(request);
  const rate = await consumeRate(
    "listing-view:address",
    address,
    envDial("RATE_LIMIT_LISTING_VIEW_PER_HOUR", VIEW_LIMIT_PER_HOUR),
    "1 hour",
  );
  if (!rate.allowed) return routeJson({ counted: false }, 200);
  const caller = await userClientFromRequest(request);
  const viewer = caller.userId;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, status } = await supabaseAdmin.rpc("count_listing_view", {
    p_public_id: publicId,
    p_rate_key: hashAddress(address),
    p_viewer: viewer ?? undefined,
  });
  if (upstreamFailed(error, status)) {
    return upstreamUnavailable("/api/listings/view", "view", status);
  }
  if (error) {
    logRouteError("/api/listings/view", error.message);
    return routeJson({ counted: false }, 200);
  }
  return routeJson({ counted: data === true }, 200);
}
