import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 4 (DEC-237) — THE PHOTO LINKS ON defineRoute (E2).
 */

const PHOTO = "22222222-2222-4222-8222-222222222222";

/** INC-1242 — the caller's reader: its own table read, the staff door's answer, and what was asked. */
type Answer = { data: unknown; error: { message: string; code?: string } | null };
const reader = vi.hoisted(() => ({
  own: { data: [], error: null } as Answer,
  door: { data: [], error: null } as Answer,
  doorCalls: [] as unknown[],
  signed: [] as string[][],
  logged: [] as unknown[],
}));

const state = {
  real: false,
  rateAllowed: true,
  rateCalls: [] as { action: string; key: string }[],
  reads: [] as { ids: readonly string[]; variants: readonly string[] }[],
};

function callerReader() {
  return {
    from: () => ({ select: () => ({ in: () => Promise.resolve(reader.own) }) }),
    rpc: (name: string, args: unknown) => {
      reader.doorCalls.push([name, args]);
      return Promise.resolve(reader.door);
    },
  };
}

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        createSignedUrls: async (keys: string[]) => {
          reader.signed.push(keys);
          return {
            data: keys.map((key) => ({
              path: key,
              signedUrl: `https://signed/${key}`,
              error: null,
            })),
            error: null,
          };
        },
      }),
    },
  },
}));

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: (_path: string, error: unknown) => {
      reader.logged.push(error);
    },
    userClientFromRequest: async () => ({
      supabase: callerReader(),
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => callerReader(),
    consumeRate: async (action: string, key: string) => {
      state.rateCalls.push({ action, key });
      return { allowed: state.rateAllowed, resetsAt: "2026-10-24T13:00:00Z", remaining: 0 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    upstreamFailed: () => false,
    upstreamUnavailable: () => routeJson({ error: "upstream unavailable" }, 503),
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/server/media/links", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/media/links")>()),
  readAndSignPhotoLinks: async (
    readerClient: never,
    ids: readonly string[],
    variants: readonly string[],
    options?: { staffDoor?: boolean },
  ) => {
    if (state.real) {
      const original = await importOriginal<typeof import("@/server/media/links")>();
      return original.readAndSignPhotoLinks(readerClient, ids, variants, options);
    }
    state.reads.push({ ids, variants });
    return { [ids[0]!]: { card: "https://storage.example/card" } };
  },
}));

const { Route } = await import("@/routes/api/media/photo-links");

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
const POST = (Route.options as unknown as { server: { handlers: { POST: Handler } } }).server
  .handlers.POST;

function post(body: unknown, signedIn: boolean): Promise<Response> {
  return POST({
    request: new Request("http://local/api/media/photo-links", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(signedIn ? { Authorization: "Bearer t" } : {}),
      },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.real = false;
  reader.own = { data: [], error: null };
  reader.door = { data: [], error: null };
  reader.doorCalls = [];
  reader.signed = [];
  reader.logged = [];
  state.rateAllowed = true;
  state.rateCalls = [];
  state.reads = [];
});

describe("/api/media/photo-links on defineRoute (E2)", () => {
  it("PLK-1 a malformed id answers the badShape verdict and no read", async () => {
    const response = await post({ photoIds: ["not-a-uuid"] }, false);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "photoIds", reason: "badShape" }],
    });
    expect(state.reads).toEqual([]);
  });

  it("PLK-2 an anonymous caller over the dial answers 200 {field:'rate'} and no read", async () => {
    state.rateAllowed = false;
    const response = await post({ photoIds: [PHOTO] }, false);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
    });
    // The one address reader's value, hashed (never the raw address).
    expect(state.rateCalls).toEqual([{ action: "photo-links:address", key: "hashed:203.0.113.9" }]);
    expect(state.reads).toEqual([]);
  });

  it("PLK-3 a signed-in caller spends no dial and gets its links", async () => {
    const response = await post({ photoIds: [PHOTO, PHOTO] }, true);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      links: { [PHOTO]: { card: "https://storage.example/card" } },
      expiresIn: 3600,
    });
    expect(state.rateCalls).toEqual([]);
    // A duplicate id is still deduplicated.
    expect(state.reads.map((read) => read.ids)).toEqual([[PHOTO]]);
  });

  it("PLK-4 variants default to all four", async () => {
    await post({ photoIds: [PHOTO] }, true);
    expect([...state.reads[0]!.variants].sort()).toEqual(["card", "cover", "mid", "thumb"]);
  });

  describe("INC-1242 the staff's rows, through their door", () => {
    const row = {
      id: PHOTO,
      paths: { card: { partition: "default", key: "default/u/l/p/card.webp" } },
      exif_stripped: true,
    };
    const link = `https://signed/${row.paths.card.key}`;

    it("PLK-5 a staff caller in reach gets a link: the ids its own read left out are asked once of the door and signed", async () => {
      state.real = true;
      reader.door = { data: [row], error: null };
      const response = await post({ photoIds: [PHOTO], variants: ["card"] }, true);
      expect(await response.json()).toEqual({
        ok: true,
        links: { [PHOTO]: { card: link } },
        expiresIn: 3600,
      });
      expect(reader.doorCalls).toEqual([["admin_photo_link_rows", { p_photo_ids: [PHOTO] }]]);
    });

    it("PLK-6 a signed-in caller who is not staff gets none, nothing was signed and no route error is logged", async () => {
      state.real = true;
      reader.door = { data: null, error: { message: "permissionDenied", code: "P0D01" } };
      const response = await post({ photoIds: [PHOTO] }, true);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ ok: true, links: {}, expiresIn: 3600 });
      expect(reader.signed).toEqual([]);
      expect(reader.logged).toEqual([]);
    });

    it("PLK-7 a staff caller out of the listing's country gets none: the door answers no row", async () => {
      state.real = true;
      reader.door = { data: [], error: null };
      const response = await post({ photoIds: [PHOTO] }, true);
      expect(await response.json()).toEqual({ ok: true, links: {}, expiresIn: 3600 });
      expect(reader.doorCalls).toHaveLength(1);
      expect(reader.signed).toEqual([]);
    });

    it("PLK-8 any other door failure is the 503 the route answers today, and is logged", async () => {
      state.real = true;
      reader.door = { data: null, error: { message: "connection reset" } };
      const response = await post({ photoIds: [PHOTO] }, true);
      expect(response.status).toBe(503);
      expect(reader.logged).toHaveLength(1);
      reader.door = { data: { rows: [] }, error: null };
      expect((await post({ photoIds: [PHOTO] }, true)).status).toBe(503);
    });

    it("PLK-9 no session means no door call; a photo the caller's own read answered is not asked again", async () => {
      state.real = true;
      reader.door = { data: [row], error: null };
      const anonymous = await post({ photoIds: [PHOTO] }, false);
      expect(await anonymous.json()).toEqual({ ok: true, links: {}, expiresIn: 3600 });
      expect(reader.doorCalls).toEqual([]);
      reader.own = { data: [row], error: null };
      const own = await post({ photoIds: [PHOTO] }, true);
      expect((await own.json()).links).toEqual({ [PHOTO]: { card: link } });
      expect(reader.doorCalls).toEqual([]);
    });
  });
});
