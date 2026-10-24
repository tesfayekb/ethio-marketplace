import { ok, upstreamFailed, upstreamUnavailable } from "@/server/answer";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { consumeRate, envDial, logRouteError } from "@/server/supabase/user-client";

export const VIEW_LIMIT_PER_HOUR = 600;
/** Turn 23 — ESTIMATE (band 20–60): counted views one carrier address may
    legitimately carry per ad per hour; env dial overrides. */
export const VIEW_LIMIT_PER_ADDRESS_AD = 30;

const SESSION_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

/** The typed context the route hands over: the parsed body, the verified caller. */
export type AdViewContext = {
  body: { publicId: string; session?: unknown };
  userId: string | null;
  request: Request;
};

/** D201 rule 10 — the address dial precedes the existing counter door.
    Turn 23: with a valid browser session id, one counted view per session
    and ad (24-hour gate), behind an address-and-ad hourly ceiling; without
    a session, the original one-per-address-and-ad-hour path is unchanged.
    Foundations turn 3: the shape and the caller are the route's (defineRoute);
    dials in the handler: the spent answer is {counted:false}, not an envelope — INC-859. */
export async function countAdView({ body, userId, request }: AdViewContext): Promise<Response> {
  const publicId = body.publicId;
  const address = clientAddress(request);
  const rate = await consumeRate(
    "listing-view:address",
    address,
    envDial("RATE_LIMIT_LISTING_VIEW_PER_HOUR", VIEW_LIMIT_PER_HOUR),
    "1 hour",
  );
  if (!rate.allowed) return ok({ counted: false });
  const rawSession = body.session;
  const session =
    typeof rawSession === "string" && SESSION_PATTERN.test(rawSession) ? rawSession : null;
  let rateKey = hashAddress(address);
  if (session) {
    const sessionKey = hashAddress(session);
    const sessionGate = await consumeRate(
      "listing-view:session",
      `${sessionKey}:${publicId}`,
      1,
      "24 hours",
    );
    if (!sessionGate.allowed) return ok({ counted: false });
    const ceiling = await consumeRate(
      "listing-view:address-ad",
      `${address}:${publicId}`,
      envDial("RATE_LIMIT_LISTING_VIEW_PER_ADDRESS_AD", VIEW_LIMIT_PER_ADDRESS_AD),
      "1 hour",
    );
    if (!ceiling.allowed) return ok({ counted: false });
    rateKey = `s:${sessionKey}`;
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, status } = await supabaseAdmin.rpc("count_listing_view", {
    p_public_id: publicId,
    p_rate_key: rateKey,
    p_viewer: userId ?? undefined,
  });
  if (upstreamFailed(error, status)) {
    return upstreamUnavailable("/api/listings/view", "view", status);
  }
  if (error) {
    logRouteError("/api/listings/view", error.message);
    return ok({ counted: false });
  }
  return ok({ counted: data === true });
}
