import { expect, test } from "./fixtures";

import { adminClient } from "./helpers/users";

/**
 * L1c-C — THE PUBLIC PER-COUNTRY TREE ROUTE, PROVED AT THE HTTP SURFACE.
 *
 * No page, no identity, no bearer: `GET /api/locations/:country` is the anon
 * public path, so these are request-context tests only. That is itself part of
 * the proof — if the route ever needed a session, none of these would pass.
 *
 * J-LAWS: every scratch slug is namespaced run x shard x worker x project and
 * carries an `e2e-l1c-` segment (J1); real reference rows are never edited —
 * only scratch rows under the ET anchor, deleted child-first in `finally` (J3);
 * DB truth is read and written through the service client (J4); every row is
 * seeded BEFORE the first GET (J7); every poll is bounded well inside the test
 * budget and dumps the values it saw when it gives up (J4 dump law).
 */

const RUN = process.env["E2E_SHARD"] ?? "local";

function scratchSlug(kind: string): string {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  const project = test.info().project.name.slice(0, 2).toLowerCase();
  const run = RUN.replace(/[^a-z0-9]/gi, "").slice(0, 4) || "loc";
  return `e2e-l1c-${kind}-${run}${worker}${project}`.toLowerCase();
}

/** The route's in-process version TTL is 15s; this poll outlives it. */
const VERSION_POLL_MS = 60_000;

/** Exactly the eleven fields the route is allowed to serve (law 5). */
const NODE_FIELDS = [
  "id",
  "parent_id",
  "level",
  "slug",
  "iso_3166_2",
  "region_id",
  "city_id",
  "display_order",
  "center_lat",
  "center_lng",
  "name_en",
] as const;

interface TreePayload {
  country: string;
  version: string;
  nodes: Array<Record<string, unknown>>;
}

async function anchorId(): Promise<string> {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id")
    .eq("country_code", "ET")
    .eq("level", "country")
    .maybeSingle();
  if (error) throw new Error(`[e2e:l1c] reading the ET anchor failed: ${error.message}`);
  if (!data) throw new Error("[e2e:l1c] the ET anchor row is missing");
  return data.id;
}

test.describe("L1c · public per-country location tree", () => {
  test("LR-1 the open market answers, anchor first, and honours If-None-Match", async ({
    request,
  }) => {
    const first = await request.get("/api/locations/ET");
    expect(first.status(), "first GET /api/locations/ET").toBe(200);
    const etag = first.headers()["etag"];
    expect(etag, "the response carries a validator").toBeTruthy();

    const body = (await first.json()) as TreePayload;
    expect(body.country, "the upper-cased code is echoed").toBe("ET");
    expect(body.nodes.length, `nodes returned (payload=${JSON.stringify(body).slice(0, 400)})`,
    ).toBeGreaterThan(0);
    expect(body.nodes[0]?.["slug"], "the anchor is the first row").toBe("ethiopia");
    expect(body.nodes[0]?.["level"], "the first row is the country anchor").toBe("country");
    expect(
      body.nodes.filter((node) => node["level"] === "region").length,
      "at least one region is visible",
    ).toBeGreaterThan(0);

    const conditional = await request.get("/api/locations/ET", {
      headers: { "If-None-Match": etag ?? "" },
    });
    expect(conditional.status(), "If-None-Match is honoured").toBe(304);
    expect(conditional.headers()["etag"], "the 304 repeats the same validator").toBe(etag);
  });

  test("LR-2 a closed market is 404 and a malformed code is 400", async ({ request }) => {
    const closed = await request.get("/api/locations/CA");
    expect(closed.status(), "a closed market is never an empty 200").toBe(404);
    expect(((await closed.json()) as { error?: string }).error).toBe("closedOrUnknownMarket");

    const malformed = await request.get("/api/locations/xyz");
    expect(malformed.status(), "a three-letter code is refused").toBe(400);
    expect(((await malformed.json()) as { error?: string }).error).toBe("badCountry");
  });

  test("LR-3 a row disappears when an ancestor is retired, and the version moves", async ({
    request,
  }) => {
    test.setTimeout(150_000); // bounded polls across two 15s TTL windows + seeding.
    const supabase = adminClient();
    const anchor = await anchorId();
    const regionSlug = scratchSlug("region");
    const citySlug = scratchSlug("city");
    let regionId: string | null = null;
    let cityId: string | null = null;

    try {
      const { data: region, error: regionError } = await supabase
        .from("locations")
        .insert({
          country_code: "ET",
          level: "region",
          slug: regionSlug,
          name_en: "E2E L1c Region",
          parent_id: anchor,
          is_active: true,
        })
        .select("id")
        .single();
      if (regionError || !region) {
        throw new Error(`[e2e:l1c] seeding the region failed: ${regionError?.message ?? "no row"}`);
      }
      regionId = region.id;

      const { data: city, error: cityError } = await supabase
        .from("locations")
        .insert({
          country_code: "ET",
          level: "city",
          slug: citySlug,
          name_en: "E2E L1c City",
          parent_id: regionId,
          center_lat: 9.02,
          center_lng: 38.75,
          is_active: true,
        })
        .select("id")
        .single();
      if (cityError || !city) {
        throw new Error(`[e2e:l1c] seeding the city failed: ${cityError?.message ?? "no row"}`);
      }
      cityId = city.id;

      // J7 — seeded before the first navigate/GET, and polled on truth: the
      // route caches a version for 15s, so the seeded rows appear on a bounded
      // poll rather than an unbounded assumption.
      const seededDeadline = Date.now() + VERSION_POLL_MS;
      let seen: TreePayload | null = null;
      while (Date.now() < seededDeadline) {
        const response = await request.get("/api/locations/ET");
        expect(response.status()).toBe(200);
        seen = (await response.json()) as TreePayload;
        if (seen.nodes.some((node) => node["slug"] === citySlug)) break;
        await new Promise((resolve) => setTimeout(resolve, 2_000));
      }
      const seededCity = seen?.nodes.find((node) => node["slug"] === citySlug);
      expect(
        seededCity,
        `the seeded city is visible (slugs=${JSON.stringify(seen?.nodes.map((n) => n["slug"]))})`,
      ).toBeTruthy();
      expect(
        seen?.nodes.some((node) => node["slug"] === regionSlug),
        "the seeded region is visible",
      ).toBe(true);
      expect(seededCity?.["region_id"], "the city carries its region's id").toBe(regionId);
      const versionBefore = seen?.version;

      const { error: retireError } = await supabase
        .from("locations")
        .update({ is_active: false })
        .eq("id", regionId);
      if (retireError) throw new Error(`[e2e:l1c] retiring failed: ${retireError.message}`);

      const { data: cityRow, error: cityReadError } = await supabase
        .from("locations")
        .select("is_active")
        .eq("id", cityId)
        .maybeSingle();
      if (cityReadError) throw new Error(`[e2e:l1c] city read-back: ${cityReadError.message}`);
      expect(cityRow?.is_active, "DB truth: the city's own row is still active").toBe(true);

      const retiredDeadline = Date.now() + VERSION_POLL_MS;
      let after: TreePayload | null = null;
      while (Date.now() < retiredDeadline) {
        const response = await request.get("/api/locations/ET");
        expect(response.status()).toBe(200);
        after = (await response.json()) as TreePayload;
        if (after.version !== versionBefore) break;
        await new Promise((resolve) => setTimeout(resolve, 2_000));
      }
      expect(
        after?.version,
        `the version moved after the retire (before=${versionBefore} after=${after?.version})`,
      ).not.toBe(versionBefore);
      expect(
        after?.nodes.some((node) => node["slug"] === citySlug),
        `the city is hidden under a retired region ` +
          `(slugs=${JSON.stringify(after?.nodes.map((n) => n["slug"]))})`,
      ).toBe(false);
      expect(
        after?.nodes.some((node) => node["slug"] === regionSlug),
        "the retired region is hidden too",
      ).toBe(false);
    } finally {
      // Child first: the ancestry guard refuses orphaning a live child.
      if (cityId) await supabase.from("locations").delete().eq("id", cityId);
      if (regionId) await supabase.from("locations").delete().eq("id", regionId);
    }
  });

  test("LR-4 the payload carries the eleven read fields and nothing else", async ({ request }) => {
    const response = await request.get("/api/locations/ET");
    expect(response.status()).toBe(200);
    const body = (await response.json()) as TreePayload;
    expect(Object.keys(body).sort(), "the envelope").toEqual(["country", "nodes", "version"]);
    for (const node of body.nodes) {
      expect(node["name_am"], `no translated name is served (slug=${String(node["slug"])})`,
      ).toBeUndefined();
      expect(Object.keys(node).sort(), `node fields (slug=${String(node["slug"])})`).toEqual(
        [...NODE_FIELDS].sort(),
      );
    }
  });
});
