import { createFileRoute } from "@tanstack/react-router";

import { conditional, readFailure } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { versionCache } from "@/server/version-cache";
import { readFailed } from "@/lib/reader-failure";

/**
 * LOCATIONS ERA L4b — THE PUBLIC OPEN-MARKETS LIST.
 *
 *   GET /api/locations → { countries: [{ code, name_en, unit_system,
 *                          currency_code, display_order, anchor_slug, anchor_id }] }
 *
 * Foundations turn 6 (INC-862 T2): on `defineRoute` with `auth: "anon"`
 * (DEC-013 §10 — no bearer, no session), the one `versionCache` and the one
 * `conditional()` responder. The read is `get_open_countries()` (migration
 * efbee3c4); every visibility decision is settled there.
 *
 * The route has no version read: the "version" is a 15-second time bucket, so
 * the held list rebuilds once per 15 s (versionCache reuses an unmoved version).
 */

const PATH = "/api/locations";
const CACHE = "public, max-age=300, stale-while-revalidate=3600";
const BUCKET_MS = 15_000;

interface OpenCountry {
  code: string;
  name_en: string | null;
  unit_system: string | null;
  currency_code: string | null;
  display_order: number | null;
  anchor_slug: string | null;
  /** INC-217 — the market's anchor place, so its name resolves through the entity bundle. */
  anchor_id: string | null;
}

const OPEN = versionCache<"open", { body: unknown; etag: string }>({
  ttlMs: BUCKET_MS,
  max: 1,
});

/**
 * The validator is a HASH OF THE PAYLOAD (FNV-1a, 32-bit): opening or closing a
 * market changes the body and therefore the tag. The tag is strong: the body is
 * byte-identical for a given set of open markets.
 */
function payloadEtag(body: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < body.length; i += 1) {
    hash ^= body.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `"open-markets-${hash.toString(16)}"`;
}

/** The published fields and nothing else — no private column travels. */
function shapeCountry(row: OpenCountry): OpenCountry {
  return {
    code: (row.code ?? "").trim(),
    name_en: row.name_en,
    unit_system: row.unit_system,
    currency_code: row.currency_code,
    display_order: row.display_order,
    anchor_slug: row.anchor_slug,
    anchor_id: row.anchor_id,
  };
}

async function handler(ctx: RouteContext): Promise<Response> {
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  try {
    const held = await OPEN.get(
      "open",
      async () => String(Math.floor(Date.now() / BUCKET_MS)),
      async () => {
        const { data, error, status } = await supabase.rpc("get_open_countries");
        if (error) throw readFailed(error, status);
        const rows = Array.isArray(data) ? (data as OpenCountry[]) : [];
        const body = { countries: rows.map(shapeCountry) };
        return { body, etag: payloadEtag(JSON.stringify(body)) };
      },
    );
    if (held === null) throw new Error("open markets not built");
    return conditional(ctx.request, { etag: held.value.etag, body: held.value.body, cache: CACHE });
  } catch (error) {
    return readFailure(PATH, "open markets read", error);
  }
}

/** D234 S5 — the GET handler, also asked in-process by the server's first page (src/server/first-screen.ts). */
export const openMarketsGet = defineRoute({ path: PATH, auth: "anon", handler });

export const Route = createFileRoute("/api/locations")({
  server: { handlers: { GET: openMarketsGet } },
});
