import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 11 (DEC-237, INC-860 part 1) — THE THREE EXPORTS ON THE ONE
 * BOUNDARY (EXR-1…6). The Supabase client is mocked under the REAL
 * user-client.ts and route.ts; EXR-4's bytes were computed by running the
 * categories export's own writer at 126fbb4c on the fixture below.
 */

const state = {
  user: "user-1" as string | null,
  allowed: true,
  rpc: [] as { name: string; args: unknown }[],
  payload: {} as unknown,
};

vi.mock("@supabase/supabase-js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@supabase/supabase-js")>();
  return {
    ...actual,
    createClient: () => ({
      auth: {
        getUser: async () =>
          state.user === null
            ? { data: { user: null }, error: { message: "bad jwt", status: 401 } }
            : { data: { user: { id: state.user } }, error: null },
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: { account_status: "active" }, error: null }),
          }),
        }),
      }),
      rpc: async (name: string, args: unknown) => {
        state.rpc.push({ name, args });
        if (name === "has_permission") return { data: state.allowed, error: null };
        return { data: state.payload, error: null };
      },
    }),
  };
});

const categories = (await import("./categories/export")).Route;
const attributes = (await import("./attributes/export")).Route;
const locations = (await import("./locations/export")).Route;

type Handler = (args: { request: Request; params: unknown }) => Promise<Response>;
const get = (route: unknown, url: string, bearer = true): Promise<Response> => {
  const handler = (route as { options: { server: { handlers: { GET: Handler } } } }).options.server
    .handlers.GET;
  return handler({
    request: new Request(`http://local${url}`, {
      headers: bearer ? { Authorization: "Bearer token" } : {},
    }),
    params: {},
  });
};
const exportCalls = () => state.rpc.filter((call) => call.name !== "has_permission");

const CATEGORY_ROWS = [
  {
    category_path: "Vehicles > Cars",
    category_slug: "cars",
    parent_slug: "vehicles",
    name_en: '=Cars, "new"',
    name_am: "መኪናዎች",
    display_order: 3,
    is_active: true,
    allow_listings: "true",
    is_catchall: null,
    price_enabled: "false",
    capabilities: "price|photos",
    listing_count: "-4",
    origin_scope: "@global",
    icon: "car",
    visible_from: "line\nbreak",
  },
  { category_slug: "+plus" },
];
const CATEGORY_BYTES_AT_START =
  '\ufeffcategory_path (read-only),category_slug,parent_slug,name_en,name_am,display_order,is_active,allow_listings,is_catchall (read-only),price_enabled,capabilities,default_price_period,price_period_locked,expiry_days,icon,visible_from,visible_until,excluded_country_codes,secondary_parents,listing_count (read-only),origin_scope (read-only)\r\nVehicles > Cars,cars,vehicles,"\'=Cars, ""new""",መኪናዎች,3,true,true,,false,price|photos,,,,car,"line\nbreak",,,,\'-4,\'@global\r\n,\'+plus,,,,,,,,,,,,,,,,,,,\r\n';

beforeEach(() => {
  process.env["SUPABASE_URL"] = "https://example.supabase.co";
  process.env["SUPABASE_PUBLISHABLE_KEY"] = "sb_publishable_test";
  state.user = "user-1";
  state.allowed = true;
  state.rpc = [];
  state.payload = {};
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-24T12:00:00Z"));
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("the three exports", () => {
  it("EXR-1 a caller without view is 403 forbidden and no export RPC runs", async () => {
    state.allowed = false;
    for (const [route, url, resource] of [
      [categories, "/api/admin/categories/export", "categories"],
      [attributes, "/api/admin/attributes/export?file=definitions", "categories"],
      [locations, "/api/admin/locations/export?file=countries", "locations"],
    ] as const) {
      state.rpc = [];
      const response = await get(route, url);
      expect(response.status).toBe(403);
      expect(await response.json()).toEqual({ error: "forbidden" });
      expect(state.rpc).toEqual([
        {
          name: "has_permission",
          args: { p_user_id: "user-1", p_resource: resource, p_action: "view" },
        },
      ]);
    }
  });

  it("EXR-2 anonymous is 401 — before a bad file is judged (CHANGE 5)", async () => {
    const response = await get(attributes, "/api/admin/attributes/export?file=nope", false);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "missing bearer token" });
    expect(state.rpc).toEqual([]);
  });

  it("EXR-3 a signed-in bad file is 400 with today's word, no export RPC", async () => {
    const response = await get(attributes, "/api/admin/attributes/export?file=nope");
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "file must be definitions or links" });
    const missing = await get(locations, "/api/admin/locations/export");
    expect(await missing.json()).toEqual({ error: "file must be countries or locations" });
    expect(exportCalls()).toEqual([]);
  });

  it("EXR-4 the categories 200 bytes equal the export's at 126fbb4c", async () => {
    state.payload = { categories: CATEGORY_ROWS };
    const response = await get(categories, "/api/admin/categories/export");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/csv; charset=utf-8");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    // Arrays, not Uint8Arrays: the test environment's realms differ.
    expect([...new Uint8Array(await response.arrayBuffer())]).toEqual([
      ...new TextEncoder().encode(CATEGORY_BYTES_AT_START),
    ]);
  });

  it("EXR-5 the locations and countries headers carry no action (CHANGE 6)", async () => {
    state.payload = { locations: [], countries: [] };
    const placesText = await (
      await get(locations, "/api/admin/locations/export?file=locations")
    ).text();
    const places = placesText.split("\r\n")[0];
    expect(places).toBe(
      "location_path (read-only),location_key,name_en,name_am,iso_3166_2,aliases,display_order,center_lat,center_lng,is_active,level (read-only),country_code (read-only),source (read-only),listing_count (read-only)",
    );
    const markets = (
      await (await get(locations, "/api/admin/locations/export?file=countries")).text()
    ).split("\r\n")[0];
    expect(markets).toBe(
      "country_code,name_en,is_active,unit_system,currency_code,display_order,root_order",
    );
  });

  it("EXR-6 the filename follows the one rule (CHANGE 7)", async () => {
    state.payload = { definitions: [], links: [], locations: [] };
    const disposition = async (route: unknown, url: string) =>
      (await get(route, url)).headers.get("Content-Disposition");
    expect(await disposition(categories, "/api/admin/categories/export?scope=cars")).toBe(
      `attachment; filename="ethio-cars-categories-2026-10-24.csv"; filename*=UTF-8''ethio-cars-categories-2026-10-24.csv`,
    );
    expect(await disposition(attributes, "/api/admin/attributes/export?file=links")).toBe(
      `attachment; filename="ethio-links-2026-10-24.csv"; filename*=UTF-8''ethio-links-2026-10-24.csv`,
    );
    expect(
      await disposition(locations, "/api/admin/locations/export?file=locations&scope=ET"),
    ).toBe(
      `attachment; filename="ethio-ET-locations-2026-10-24.csv"; filename*=UTF-8''ethio-ET-locations-2026-10-24.csv`,
    );
  });
});
