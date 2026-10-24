import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE PHOTO ROUTE ON defineRoute (D3).
 */

const PHOTO = "33333333-3333-4333-8333-333333333333";

const state = {
  rpcCalls: [] as string[],
  rateAllowed: true,
  photo: { id: PHOTO, listing_id: "l-1", paths: {}, storage_path: null } as unknown,
  listing: { id: "l-1" } as unknown,
  deletes: 0,
};

function builder(table: string) {
  const chain = {
    select: () => chain,
    eq: () => chain,
    maybeSingle: async () => ({
      data: table === "listing_photos" ? state.photo : state.listing,
      error: null,
    }),
  };
  return chain;
}

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: () => undefined,
    userClientFromRequest: async () => ({
      supabase: {
        rpc: async (name: string) => {
          state.rpcCalls.push(name);
          return { data: { ok: true }, error: null, status: 200 };
        },
        from: (table: string) => builder(table),
      },
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async () => ({
      allowed: state.rateAllowed,
      resetsAt: "2026-10-24T12:00:00Z",
      remaining: 0,
    }),
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
vi.mock("@/server/media/storage", () => ({
  objectRefsOf: () => [{ partition: "p", key: "k" }],
  deleteObject: async () => {
    state.deletes += 1;
  },
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { Route } = await import("@/routes/api/listings/photos.$id");

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
const handlers = (Route.options as unknown as { server: { handlers: Record<string, Handler> } })
  .server.handlers;

function call(method: "DELETE" | "POST", id: string, body?: unknown): Promise<Response> {
  return handlers[method]!({
    request: new Request(`http://local/api/listings/photos/${id}`, {
      method,
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    }),
    params: { id },
  });
}

beforeEach(() => {
  state.rpcCalls = [];
  state.rateAllowed = true;
  state.photo = { id: PHOTO, listing_id: "l-1", paths: {}, storage_path: null };
  state.listing = { id: "l-1" };
  state.deletes = 0;
});

describe("/api/listings/photos/$id on defineRoute (D3)", () => {
  it("PHT-1 a non-uuid id answers the verdict, and no rpc", async () => {
    const response = await call("DELETE", "not-a-uuid");
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.refusals[0]).toMatchObject({ field: "id", reason: "badShape" });
    expect(state.rpcCalls).toEqual([]);
  });

  it("PHT-2 a spent remove dial answers the photos rate verdict, and no rpc", async () => {
    state.rateAllowed = false;
    const response = await call("DELETE", PHOTO);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "photos", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
    });
    expect(state.rpcCalls).toEqual([]);
    expect(state.deletes).toBe(0);
  });

  it("PHT-3 a foreign photo answers the 403 verdict, and no storage call", async () => {
    state.listing = null;
    const response = await call("DELETE", PHOTO);
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "id", reason: "notYourListing" }],
    });
    expect(state.rpcCalls).toEqual([]);
    expect(state.deletes).toBe(0);
    // The owner's removal: the door first, then the storage cleanup.
    state.listing = { id: "l-1" };
    const removed = await call("DELETE", PHOTO);
    expect(await removed.json()).toEqual({ ok: true });
    expect(state.rpcCalls).toEqual(["remove_listing_photo"]);
    expect(state.deletes).toBe(1);
  });

  it("PHT-4 a move without a position answers badValue, and no rpc", async () => {
    const response = await call("POST", PHOTO, { action: "move" });
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "position", reason: "badValue" }],
    });
    expect(state.rpcCalls).toEqual([]);
  });
});
