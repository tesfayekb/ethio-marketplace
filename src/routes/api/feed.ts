import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * Bundle 10 E2b — THE PUBLIC FEED'S READ DOOR.
 *
 *   GET /api/feed?category=<uuid>&place=<uuid>&size=<1..50>&after=<cursor>
 *     → { cards, ladder, steps, next }
 *
 * One page of cards from `feed_page` (D108 order, the widening ladder, paging
 * after the last card). `next` is base64url of the function's cursor JSON.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session, no
 * `has_permission`. The anon publishable client is built INSIDE the handler
 * because workerd injects bindings per request (F1). No in-process cache: the
 * answer depends on fresh listings; the browser and edge hold it for a minute.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const PATH = "/api/feed";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NOT_FOUND = ["feed_page: unknownCategory", "feed_page: unknownPlace"] as const;
const BAD = ["feed_page: badCursor", "feed_page: badSize"] as const;

function logRouteError(error: unknown): void {
  const raw = error instanceof Error ? error.message : String(error);
  // INC-328 — an upstream HTML error page is named, never dumped into the log.
  const status = /\b([45]\d\d)\b/.exec(raw)?.[1] ?? "unknown";
  const message = raw.trimStart().startsWith("<")
    ? `upstream returned an HTML error page (${status})`
    : raw;
  console.error("[ssr-error]", PATH, message);
}

function serverEnv(name: string): string {
  // Read INSIDE the handler: workerd injects bindings per request (F1).
  return process.env[name] ?? "";
}

function fail(error: string, status: number): Response {
  if (status >= 500) logRouteError(error);
  // INC-447 — a server failure is logged whole; the reply names no raw message.
  const shown = status >= 500 ? "internal error" : error;
  return new Response(JSON.stringify({ error: shown }), {
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

  const category = params.get("category");
  if (category !== null && !UUID.test(category)) return fail("badCategory", 400);
  const place = params.get("place");
  if (place !== null && !UUID.test(place)) return fail("badPlace", 400);

  const sizeRaw = params.get("size");
  let size = 20;
  if (sizeRaw !== null) {
    if (!/^\d+$/.test(sizeRaw)) return fail("badSize", 400);
    size = Number(sizeRaw);
    if (size < 1 || size > 50) return fail("badSize", 400);
  }

  const afterRaw = params.get("after");
  let after: Record<string, unknown> | null = null;
  if (afterRaw !== null) {
    after = fromCursor(afterRaw);
    if (after === null) return fail("badCursor", 400);
  }

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return fail("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const started = Date.now();
  const { data, error } = await supabase.rpc("feed_page", {
    p_category_id: category ?? undefined,
    p_location_id: place ?? undefined,
    p_after: (after ?? undefined) as never,
    p_size: size,
  });
  const took = Date.now() - started;
  if (took > 5000) console.warn("[slow-rpc]", "feed_page", took);

  if (error) {
    const message = error.message ?? "";
    for (const name of NOT_FOUND) {
      if (message.includes(name)) return fail(name.slice("feed_page: ".length), 404);
    }
    for (const name of BAD) {
      if (message.includes(name)) return fail(name.slice("feed_page: ".length), 400);
    }
    return fail(message, 502);
  }

  const page = (data ?? {}) as {
    cards?: unknown[];
    ladder?: unknown[];
    steps?: unknown[];
    next?: unknown;
  };
  const body = {
    cards: page.cards ?? [],
    ladder: page.ladder ?? [],
    steps: page.steps ?? [],
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

export const Route = createFileRoute("/api/feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await handleGet(request);
        } catch (error) {
          logRouteError(error);
          return fail(error instanceof Error ? error.message : "internal error", 500);
        }
      },
    },
  },
});
