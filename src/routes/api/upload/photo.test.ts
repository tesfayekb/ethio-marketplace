import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 4 (DEC-237) — THE UPLOAD ON defineRoute (C4). The form path's
 * first consumer: a multipart Request built from a FormData reaches the handler
 * with its fields (A7 smoke, UPH-5).
 */

const LISTING = "11111111-1111-4111-8111-111111111111";

const state = {
  signedIn: true,
  rateAllowed: true,
  rateCalls: [] as string[],
  pulls: 0,
  reads: 0,
  storage: 0,
};

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: () => undefined,
    userClientFromRequest: async () =>
      state.signedIn
        ? {
            supabase: {
              from: () => {
                state.reads += 1;
                throw new Error("UPH: no read is expected");
              },
              rpc: async () => {
                state.reads += 1;
                throw new Error("UPH: no rpc is expected");
              },
            },
            userId: "seller-1",
            reason: null,
            message: "",
          }
        : { supabase: null, userId: null, reason: "noToken", message: "no bearer" },
    refuseUserClient: (_path: string, caller: { userId: string | null }) =>
      caller.userId === null ? routeJson({ error: "unauthorized" }, 401) : null,
    anonymousClient: () => null,
    consumeRate: async (action: string) => {
      state.rateCalls.push(action);
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
vi.mock("@/server/media/storage", () => ({
  objectKey: () => "k",
  objectRefsOf: () => [],
  putObject: async () => {
    state.storage += 1;
  },
  deleteObject: async () => {
    state.storage += 1;
  },
}));
vi.mock("@/server/media/policy", () => ({
  // Turn 17 — the gateway's answer, mapped: a verdict (or the held outcome).
  screenPhotoPolicy: async () => ({ kind: "verdict", verdict: { ok: true } }),
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { Route } = await import("@/routes/api/upload/photo");

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
const POST = (Route.options as unknown as { server: { handlers: { POST: Handler } } }).server
  .handlers.POST;

/** A multipart body whose every pull is counted — proof of what was (not) read. */
async function countedUpload(form: FormData, headers: Record<string, string> = {}) {
  const built = new Request("http://local/api/upload/photo", { method: "POST", body: form });
  const encoded = new Uint8Array(await built.arrayBuffer());
  let sent = false;
  const stream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        state.pulls += 1;
        if (sent) {
          controller.close();
          return;
        }
        sent = true;
        controller.enqueue(encoded);
      },
    },
    { highWaterMark: 0 },
  );
  return new Request("http://local/api/upload/photo", {
    method: "POST",
    headers: {
      "content-type": built.headers.get("content-type") ?? "",
      Authorization: "Bearer t",
      ...headers,
    },
    body: stream,
    duplex: "half",
  } as RequestInit);
}

function formOf(fields: Record<string, string>): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  form.set("cover", new File([new Uint8Array([1, 2, 3])], "cover.jpg", { type: "image/jpeg" }));
  return form;
}

beforeEach(() => {
  state.signedIn = true;
  state.rateAllowed = true;
  state.rateCalls = [];
  state.pulls = 0;
  state.reads = 0;
  state.storage = 0;
});

describe("/api/upload/photo on defineRoute (C4)", () => {
  it("UPH-1 a visitor answers 401 and the body's stream is never read", async () => {
    state.signedIn = false;
    const response = await POST({
      request: await countedUpload(formOf({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(401);
    expect(state.pulls).toBe(0);
    expect(state.rateCalls).toEqual([]);
    expect(state.storage).toBe(0);
  });

  it("UPH-2 the hourly dial spent answers 200 {field:'rate'} before the body is read", async () => {
    state.rateAllowed = false;
    const response = await POST({
      request: await countedUpload(formOf({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
    });
    expect(state.rateCalls).toEqual(["upload"]);
    expect(state.pulls).toBe(0);
    expect(state.reads).toBe(0);
    expect(state.storage).toBe(0);
  });

  it("UPH-3 a body over 2 MiB by Content-Length answers 413 and no storage call", async () => {
    const response = await POST({
      request: await countedUpload(formOf({ listingId: LISTING }), {
        "content-length": String(2 * 1024 * 1024 + 1),
      }),
      params: {},
    });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "payloadTooLarge" });
    expect(state.pulls).toBe(0);
    expect(state.rateCalls).toEqual([]);
    expect(state.storage).toBe(0);
  });

  it("UPH-4 a missing listingId answers {field:'listingId', reason:'required'}", async () => {
    const response = await POST({ request: await countedUpload(formOf({})), params: {} });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "listingId", reason: "required" }],
    });
    expect(state.reads).toBe(0);
    expect(state.storage).toBe(0);
  });

  it("UPH-5 a malformed `replaces` answers {field:'replaces', reason:'badValue'} and no storage call", async () => {
    const response = await POST({
      request: await countedUpload(formOf({ listingId: LISTING, replaces: "not-a-uuid" })),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "replaces", reason: "badValue" }],
    });
    // The form reached the handler: its listingId passed, its `replaces` was judged.
    expect(state.pulls).toBeGreaterThan(0);
    expect(state.reads).toBe(0);
    expect(state.storage).toBe(0);
  });
});
