import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { bundleEtag } from "@/i18n/bundle";
import { readFailed } from "@/lib/reader-failure";
import { countryCodeLoose } from "@/lib/schemas/primitives";
import {
  clientError,
  conditional,
  notModified,
  readFailure,
} from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { versionCache } from "@/server/version-cache";

/**
 * L1c-C — THE PUBLIC PER-COUNTRY LOCATION TREE.
 *
 *   GET /api/locations/:country → { country, version, nodes: [...] }
 *
 * Foundations turn 6 (INC-862 T2): on `defineRoute` with `auth: "anon"`
 * (DEC-013 §10 — no bearer, no session), the one `versionCache` (bounded to
 * 64 countries) and the one `conditional()` responder. Every visibility
 * decision is settled in `get_location_tree` (migration efbee3c4).
 *
 * A CLOSED OR UNKNOWN MARKET IS A 404, NEVER AN EMPTY 200, and never cached —
 * opening a market must be visible on the next request.
 */

const PATH = "/api/locations/$country";
const CACHE = "public, max-age=300, stale-while-revalidate=3600";

interface TreeNode {
  id: string;
  parent_id: string | null;
  level: string;
  slug: string;
  iso_3166_2: string | null;
  region_id: string | null;
  city_id: string | null;
  display_order: number | null;
  center_lat: number | null;
  center_lng: number | null;
  name_en: string | null;
}

const params = z.object({ country: countryCodeLoose }).strict();

const TREES = versionCache<string, { body: unknown }>({ ttlMs: 15_000, max: 64 });

/** Law 5 — the eleven read columns and nothing else; names come from the entity overlay. */
function shapeNode(row: TreeNode): TreeNode {
  return {
    id: row.id,
    parent_id: row.parent_id,
    level: row.level,
    slug: row.slug,
    iso_3166_2: row.iso_3166_2,
    region_id: row.region_id,
    city_id: row.city_id,
    display_order: row.display_order,
    center_lat: row.center_lat,
    center_lng: row.center_lng,
    name_en: row.name_en,
  };
}

async function handler(ctx: RouteContext<unknown, z.infer<typeof params>>): Promise<Response> {
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  const country = ctx.params.country;
  const etagOf = (version: string) => bundleEtag(`loc-${country}`, version);
  let seen: string | null = null;
  let coldHit = false;
  try {
    const held = await TREES.get(
      country,
      async () => {
        const { data, error, status } = await supabase.rpc("get_location_tree_version", {
          p_country_code: country,
        });
        if (error) throw readFailed(error, status);
        seen = typeof data === "string" ? data : "";
        return seen;
      },
      async (version) => {
        // A cold conditional hit: the tree is not read and nothing is held.
        if (ctx.request.headers.get("If-None-Match") === etagOf(version)) {
          coldHit = true;
          return null;
        }
        const { data, error, status } = await supabase.rpc("get_location_tree", {
          p_country_code: country,
        });
        if (error) throw readFailed(error, status);
        const rows = Array.isArray(data) ? (data as TreeNode[]) : [];
        // Zero rows is the read's own answer for a closed or unknown market.
        if (rows.length === 0) return null;
        return { body: { country, version, nodes: rows.map(shapeNode) } };
      },
    );
    if (held === null) {
      if (coldHit && seen !== null) return notModified(etagOf(seen), CACHE);
      return clientError("closedOrUnknownMarket", 404);
    }
    return conditional(ctx.request, {
      etag: etagOf(held.version),
      body: held.value.body,
      cache: CACHE,
    });
  } catch (error) {
    return readFailure(PATH, "location tree read", error);
  }
}

export const Route = createFileRoute("/api/locations/$country")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        params,
        badShape: () => clientError("badCountry", 400),
        handler,
      }),
    },
  },
});
