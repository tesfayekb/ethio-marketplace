import { ok, upstreamFailed, upstreamUnavailable } from "@/server/answer";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { consumeRate, envDial, logRouteError } from "@/server/supabase/user-client";

export const SHARE_LIMIT_PER_HOUR = 120;

/** The typed context the route hands over: the parsed body, the verified caller. */
export type AdShareContext = {
  body: { publicId: string; channel: string };
  userId: string | null;
  request: Request;
};

/**
 * D201 rule 10 — the address dial precedes the existing counter door.
 * Foundations turn 3: the shape and the caller are the route's (defineRoute);
 * dials in the handler: the spent answer is {counted:false}, not an envelope — INC-859.
 */
export async function countAdShare({ body, userId, request }: AdShareContext): Promise<Response> {
  const address = clientAddress(request);
  const rate = await consumeRate(
    "listing-share:address",
    address,
    envDial("RATE_LIMIT_LISTING_SHARE_PER_HOUR", SHARE_LIMIT_PER_HOUR),
    "1 hour",
  );
  if (!rate.allowed) return ok({ counted: false });
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, status } = await supabaseAdmin.rpc("count_listing_share", {
    p_public_id: body.publicId,
    p_channel: body.channel,
    p_rate_key: hashAddress(address),
    p_viewer: userId ?? undefined,
  });
  if (upstreamFailed(error, status)) {
    return upstreamUnavailable("/api/listings/share", "share", status);
  }
  if (error) {
    logRouteError("/api/listings/share", error.message);
    return ok({ counted: false });
  }
  return ok({ counted: data === true });
}
