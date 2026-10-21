import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { errorText } from "@/lib/error-text";

/**
 * Bundle 19 turn 16 (D201 §12) — THE SELLER PAGE'S READ DOOR.
 *
 *   GET /api/seller?key=<key>[&after=<base64url cursor>]
 *     → { seller, cards, next }
 *
 * One page of the seller's live ads from `seller_feed_page` (feed_page's card
 * shape and order). The key is the seller's alias lower-cased, never an id.
 * `next` is base64url of the function's cursor JSON — the same encoding the
 * feed's door uses (src/routes/api/feed.ts); its helpers are module-local
 * there, so the identical implementation is kept here rather than importing
 * from a route file.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session.
 * The anon publishable client is built INSIDE the handler because workerd
 * injects bindings per request (F1). No in-process cache.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const PATH = "/api/seller";

/** INC-802 — every client refusal this route sends, as a closed set. */
type ClientCode = "badKey" | "badCursor" | "badSize" | "unknownSeller";

/** The database's error names mapped to this route's fixed codes. */
const BAD: Readonly<Record<string, ClientCode>> = {
  "seller_feed_page: badCursor": "badCursor",
  "seller_feed_page: badSize": "badSize",
};

function logRouteError(error: unknown): void {
  // INC-328, INC-625 — an upstream HTML error page is named, never dumped into the
  // log; an error with no message says so (src/lib/error-text.ts).
  const message = errorText(error);
  console.error("[ssr-error]", PATH, message);
}

function serverEnv(name: string): string {
  // Read INSIDE the handler: workerd injects bindings per request (F1).
  return process.env[name] ?? "";
}

/** INC-802 — a server failure: logged whole, answered with a fixed text. */
function serverFailure(detail: string, status: 500 | 502 | 503): Response {
  logRouteError(detail);
  // INC-447 — a server failure is logged whole; the reply names no raw message.
  return new Response(JSON.stringify({ error: "internal error" }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/** INC-802 — a client refusal: its code is one of the route's fixed codes. */
function clientFailure(code: ClientCode, status: 400 | 401 | 404 | 429): Response {
  return new Response(JSON.stringify({ error: code }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** The cursor object, or null when the value is not base64url of a JSON object. */
function fromCursor(value: string): Record<string, unknown> | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function handleGet(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;

  const key = params.get("key");
  if (key === null || key.length > 60) return clientFailure("badKey", 400);

  const afterRaw = params.get("after");
  let after: Record<string, unknown> | null = null;
  if (afterRaw !== null) {
    after = fromCursor(afterRaw);
    if (after === null) return clientFailure("badCursor", 400);
  }

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return serverFailure("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const started = Date.now();
  const { data, error } = await supabase.rpc("seller_feed_page", {
    p_seller_key: key,
    p_after: (after ?? undefined) as never,
    p_size: 20,
  } as never);
  const took = Date.now() - started;
  if (took > 5000) console.warn("[slow-rpc]", "seller_feed_page", took);

  if (error) {
    const message = error.message ?? "";
    if (message.includes("seller_feed_page: unknownSeller")) {
      return clientFailure("unknownSeller", 404);
    }
    for (const [name, code] of Object.entries(BAD)) {
      if (message.includes(name)) return clientFailure(code, 400);
    }
    return serverFailure(message, 502);
  }

  const page = data as {
    seller?: unknown;
    cards?: unknown;
    next?: unknown;
  } | null;
  // F4 — an answer without cards and without an error is a failure, never an
  // empty page.
  if (page === null || typeof page !== "object" || !Array.isArray(page.cards)) {
    return serverFailure("seller_feed_page returned no page", 502);
  }
  const body = {
    seller: page.seller ?? null,
    cards: page.cards,
    next:
      page.next === null || page.next === undefined ? null : toBase64Url(JSON.stringify(page.next)),
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      Vary: "Accept-Encoding",
    },
  });
}

export const Route = createFileRoute("/api/seller")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await handleGet(request);
        } catch (error) {
          logRouteError(error);
          return serverFailure(errorText(error), 500);
        }
      },
    },
  },
});
