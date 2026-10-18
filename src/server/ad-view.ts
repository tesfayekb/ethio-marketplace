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
/** Turn 23 — ESTIMATE (band 20–60): counted views one carrier address may
    legitimately carry per ad per hour; env dial overrides. */
export const VIEW_LIMIT_PER_ADDRESS_AD = 30;

const SESSION_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

/** D201 rule 10 — the address dial precedes the existing counter door.
    Turn 23: with a valid browser session id, one counted view per session
    and ad (24-hour gate), behind an address-and-ad hourly ceiling; without
    a session, the original one-per-address-and-ad-hour path is unchanged. */
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
  const rawSession = body["session"];
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
    if (!sessionGate.allowed) return routeJson({ counted: false }, 200);
    const ceiling = await consumeRate(
      "listing-view:address-ad",
      `${address}:${publicId}`,
      envDial("RATE_LIMIT_LISTING_VIEW_PER_ADDRESS_AD", VIEW_LIMIT_PER_ADDRESS_AD),
      "1 hour",
    );
    if (!ceiling.allowed) return routeJson({ counted: false }, 200);
    rateKey = `s:${sessionKey}`;
  }
  const caller = await userClientFromRequest(request);
  const viewer = caller.userId;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, status } = await supabaseAdmin.rpc("count_listing_view", {
    p_public_id: publicId,
    p_rate_key: rateKey,
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
