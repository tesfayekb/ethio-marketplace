import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { uuid } from "@/lib/schemas/primitives";
import type { RouteContext } from "@/server/route";

/**
 * Foundations turn 2 (DEC-237) — THE BOUNDARY'S ORDER (RT-1…RT-10), on the
 * pattern of src/server/media/background-route.test.ts: user-client.ts is
 * mocked, and counters prove what a refusal never reached (G27/G38).
 */

const state = {
  caller: {
    supabase: null as unknown,
    userId: "user-1" as string | null,
    reason: null as string | null,
    message: "",
  },
  anonClient: { anon: true } as unknown,
  rates: [] as { action: string; key: string; limit: number; window: string }[],
  rateThrows: false,
  rateAllowed: true,
  rateResetsAt: null as string | null,
  callerCalls: 0,
  anonCalls: 0,
  pulls: 0,
  pullsAtRate: [] as number[],
  rpcCalls: [] as { name: string; args: unknown }[],
  rpcAnswer: true as boolean,
  logs: [] as string[],
  handlerCalls: 0,
};

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: (path: string, message: unknown) => {
      state.logs.push(`${path} ${String(message)}`);
    },
    userClientFromRequest: async () => {
      state.callerCalls += 1;
      return state.caller;
    },
    refuseUserClient: (_path: string, answer: { reason: string | null }) => {
      if (answer.reason === null) return null;
      if (answer.reason === "serverEnv") return routeJson({ error: "server error" }, 500);
      return routeJson({ error: "not signed in" }, 401);
    },
    anonymousClient: () => {
      state.anonCalls += 1;
      return state.anonClient;
    },
    consumeRate: async (action: string, key: string, limit: number, window: string) => {
      state.rates.push({ action, key, limit, window });
      state.pullsAtRate.push(state.pulls);
      if (state.rateThrows) throw new Error("counting down");
      return { allowed: state.rateAllowed, resetsAt: state.rateResetsAt, remaining: 9 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    upstreamUnavailable: (path: string, what: string, status: number) => {
      state.logs.push(`${path} ${what}: upstream unavailable (${status})`);
      return routeJson({ error: "upstream unavailable" }, 503);
    },
    upstreamFailed: () => false,
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { service: true } }));

const { defineRoute } = await import("@/server/route");
const { clientError, ok, verdict } = await import("@/server/answer");

const Body = z.object({ listingId: uuid, note: z.string().max(5).optional() }).strict();
const LISTING = "11111111-1111-4111-8111-111111111111";

function post(body: string, headers: Record<string, string> = {}): Request {
  return new Request("http://local/api/test", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

function makeRoute(overrides: Record<string, unknown> = {}) {
  return defineRoute({
    path: "/api/test",
    auth: "user",
    body: Body,
    handler: async (ctx: RouteContext) => {
      state.handlerCalls += 1;
      return ok({ got: ctx.body });
    },
    ...overrides,
  } as never);
}

beforeEach(() => {
  state.caller = { supabase: { rpc: rpcSpy }, userId: "user-1", reason: null, message: "" };
  state.rates = [];
  state.rateThrows = false;
  state.rateAllowed = true;
  state.rateResetsAt = null;
  state.callerCalls = 0;
  state.anonCalls = 0;
  state.anonClient = { anon: true };
  state.pulls = 0;
  state.pullsAtRate = [];
  state.rpcCalls = [];
  state.rpcAnswer = true;
  state.logs = [];
  state.handlerCalls = 0;
});

/** A body stream whose every pull is counted — proof of what was (not) read. */
function countedPost(text: string, headers: Record<string, string> = {}): Request {
  const encoded = new TextEncoder().encode(text);
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
    // No eager pull: a pull happens only when someone reads.
    { highWaterMark: 0 },
  );
  return new Request("http://local/api/test", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: stream,
    duplex: "half",
  } as RequestInit);
}

async function rpcSpy(name: string, args: unknown) {
  state.rpcCalls.push({ name, args });
  return { data: state.rpcAnswer, error: null };
}

describe("defineRoute — the one boundary (B4)", () => {
  it("RT-1 a Content-Length over the ceiling answers 413 and reads nothing", async () => {
    const route = makeRoute({ limits: { bodyBytes: 10 } });
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING }), { "content-length": "999" }),
      params: {},
    });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "payloadTooLarge" });
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-2 a visitor on user answers 401 and spends no dial", async () => {
    state.caller = { supabase: null, userId: null, reason: "notSignedIn", message: "" };
    const route = makeRoute({
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const response = await route({
      request: countedPost(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(401);
    expect(state.rates).toEqual([]);
    expect(state.handlerCalls).toBe(0);
    // INC-865: a visitor's body is never read.
    expect(state.pulls).toBe(0);
  });

  it("RT-3 a wrong content type answers 415", async () => {
    const route = makeRoute();
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING }), { "content-type": "text/plain" }),
      params: {},
    });
    expect(response.status).toBe(415);
    expect(await response.json()).toEqual({ error: "unsupportedMediaType" });
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-4 a malformed body answers the verdict with the schema path and spends no dial", async () => {
    const route = makeRoute({
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const response = await route({ request: post(JSON.stringify({ listingId: "x" })), params: {} });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "listingId", reason: "badShape", detail: "invalid_format" }],
    });
    expect(state.rates).toEqual([]);
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-5 a valid body reaches the handler with typed input and the dial consumed once", async () => {
    const route = makeRoute({
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ got: { listingId: LISTING } });
    expect(state.rates).toEqual([
      { action: "post", key: "user-1", limit: 5, window: "86400 seconds" },
    ]);
  });

  it("RT-6 beforeParse consumes before the body is read — a bad body still cost one", async () => {
    const route = makeRoute({
      rate: [
        {
          dial: { action: "upload", limit: { fallback: 3 }, windowSeconds: 60 },
          key: "address",
          when: "beforeParse",
        },
      ],
    });
    const response = await route({ request: post(JSON.stringify({ listingId: "x" })), params: {} });
    expect(response.status).toBe(200);
    expect(state.rates).toEqual([
      { action: "upload", key: "hashed:203.0.113.9", limit: 3, window: "60 seconds" },
    ]);
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-7 a handler that throws answers server error with an incident and no message text; the log carries the incident", async () => {
    const route = makeRoute({
      handler: async () => {
        throw new Error("secret internals");
      },
    });
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(500);
    const body = (await response.json()) as { error: string; incident: string };
    expect(body.error).toBe("server error");
    expect(JSON.stringify(body)).not.toContain("secret internals");
    expect(state.logs.join("\n")).toContain(body.incident);
    expect(state.logs.join("\n")).toContain("secret internals");
  });

  it("RT-8 staff mode calls has_permission as the caller and answers 403 on false", async () => {
    const route = makeRoute({ auth: { staff: { resource: "listings", action: "manage" } } });
    state.rpcAnswer = false;
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "forbidden" });
    expect(state.rpcCalls).toEqual([
      {
        name: "has_permission",
        args: { p_user_id: "user-1", p_resource: "listings", p_action: "manage" },
      },
    ]);
    expect(state.handlerCalls).toBe(0);
    state.rpcAnswer = true;
    const allowed = await route({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(allowed.status).toBe(200);
  });

  it("RT-9 anon with the server environment missing answers the serverEnv 500", async () => {
    state.anonClient = null;
    const route = makeRoute({ auth: "anon", body: undefined });
    const response = await route({ request: post("{}"), params: {} });
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "server error" });
    state.anonClient = { anon: true };
  });

  it("RT-10 a consumeRate throw answers 503, never 500", async () => {
    state.rateThrows = true;
    const route = makeRoute({
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const response = await route({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "upstream unavailable" });
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-11 a signed-in body over the ceiling without Content-Length answers 413 after the caller and before any dial", async () => {
    const route = makeRoute({
      limits: { bodyBytes: 10 },
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const request = countedPost(JSON.stringify({ listingId: LISTING }));
    expect(request.headers.get("content-length")).toBeNull();
    const response = await route({ request, params: {} });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "payloadTooLarge" });
    expect(state.callerCalls).toBe(1);
    expect(state.rates).toEqual([]);
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-12 a spent dial with refuseAs answers the 200 verdict; with a reason that reason; without refuseAs 429", async () => {
    state.rateAllowed = false;
    state.rateResetsAt = "2026-10-24T11:00:00Z";
    const asVerdict = makeRoute({
      rate: [
        {
          dial: { action: "assist", limit: { fallback: 5 }, windowSeconds: 3600 },
          key: "user",
          refuseAs: { verdict: { field: "rate" } },
        },
      ],
    });
    const spent = await asVerdict({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(spent.status).toBe(200);
    expect(await spent.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T11:00:00Z" }],
    });

    const withReason = makeRoute({
      rate: [
        {
          dial: { action: "assist", limit: { fallback: 5 }, windowSeconds: 3600 },
          key: "user",
          refuseAs: { verdict: { field: "photos", reason: "tooMany" } },
        },
      ],
    });
    const reasoned = await withReason({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(await reasoned.json()).toEqual({
      ok: false,
      refusals: [{ field: "photos", reason: "tooMany", detail: "2026-10-24T11:00:00Z" }],
    });

    const plain = makeRoute({
      rate: [
        { dial: { action: "assist", limit: { fallback: 5 }, windowSeconds: 3600 }, key: "user" },
      ],
    });
    const refused = await plain({
      request: post(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(refused.status).toBe(429);
    expect(await refused.json()).toEqual({
      error: "rateLimited",
      resetsAt: "2026-10-24T11:00:00Z",
    });
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-14 beforeParse dials are spent before the body is read", async () => {
    const route = makeRoute({
      rate: [
        {
          dial: { action: "assist", limit: { fallback: 5 }, windowSeconds: 3600 },
          key: "user",
          when: "beforeParse",
        },
      ],
    });
    const response = await route({
      request: countedPost(JSON.stringify({ listingId: LISTING })),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(state.pullsAtRate).toEqual([0]);
    expect(state.pulls).toBeGreaterThan(0);
  });

  it("RT-15 none ignores Authorization and builds neither client", async () => {
    const handler = vi.fn(async (ctx: RouteContext) => {
      expect(ctx.supabase).toBeNull();
      expect(ctx.userId).toBeNull();
      expect(await ctx.service()).toEqual({ service: true });
      return ok({ reached: true });
    });
    const route = makeRoute({ auth: "none", body: undefined, handler });
    const request = new Request("http://local/api/test", {
      headers: { Authorization: "Bearer ignored" },
    });
    const read = vi.spyOn(request.headers, "has");
    const response = await route({ request, params: {} });
    expect(await response.json()).toEqual({ reached: true });
    expect(handler).toHaveBeenCalledOnce();
    expect(state.callerCalls).toBe(0);
    expect(state.anonCalls).toBe(0);
    expect(read).not.toHaveBeenCalledWith("Authorization");
  });

  it("RT-16 none reaches the handler with the server environment missing", async () => {
    state.anonClient = null;
    const response = await makeRoute({ auth: "none", body: undefined })({
      request: post("{}"),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(state.handlerCalls).toBe(1);
    expect(state.anonCalls).toBe(0);
    expect(state.callerCalls).toBe(0);
  });

  it("RT-17 params passes its first issue to the route's own answer before query or body", async () => {
    const answer = clientError("badCountry", 400);
    const badShape = vi.fn(() => answer);
    const route = makeRoute({
      params: z.object({ id: uuid }).strict(),
      query: z.object({ q: z.string() }).strict(),
      badShape,
    });
    const response = await route({ request: post("not-json"), params: { id: "x" } });
    expect(response).toBe(answer);
    expect(badShape).toHaveBeenCalledExactlyOnceWith({
      part: "params",
      path: "id",
      code: "invalid_format",
    });
    expect(state.handlerCalls).toBe(0);
  });

  it("RT-18 query passes only its first bad key to the route's answer", async () => {
    const badShape = vi.fn(() => clientError("badQuery", 400));
    const route = makeRoute({
      body: undefined,
      query: z.object({ first: uuid, second: uuid }).strict(),
      badShape,
    });
    const response = await route({
      request: new Request("http://local/api/test?first=x&second=y"),
      params: {},
    });
    expect(response.status).toBe(400);
    expect(badShape).toHaveBeenCalledExactlyOnceWith({
      part: "query",
      path: "first",
      code: "invalid_format",
    });
  });

  it("RT-20 a handler that throws after the client left answers 499 with one client-aborted line", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const controller = new AbortController();
    const route = makeRoute({
      auth: "none",
      body: undefined,
      handler: async () => {
        controller.abort();
        throw new Error("The operation was aborted");
      },
    });
    const response = await route({
      request: new Request("http://local/api/test?x=1", { signal: controller.signal }),
      params: {},
    });
    expect(response.status).toBe(499);
    expect(await response.text()).toBe("");
    expect(log.mock.calls).toEqual([["[client-aborted]", "GET", "/api/test"]]);
    log.mockRestore();
  });

  it("RT-19 a non-strict query strips unknown keys before the handler", async () => {
    const route = makeRoute({
      auth: "none",
      body: undefined,
      query: z.object({ q: z.string() }),
      handler: async (ctx: RouteContext) => ok(ctx.query),
    });
    const response = await route({
      request: new Request("http://local/api/test?q=hello&tracking=ignored"),
      params: {},
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ q: "hello" });
  });

  it("a body issue and malformed JSON call the custom badShape without exposing messages", async () => {
    const badShape = vi.fn(() => clientError("badBody", 400));
    const route = makeRoute({ badShape });
    await route({ request: post(JSON.stringify({ listingId: "x" })), params: {} });
    expect(badShape).toHaveBeenLastCalledWith({
      part: "body",
      path: "listingId",
      code: "invalid_format",
    });
    await route({ request: post("not-json"), params: {} });
    expect(badShape).toHaveBeenLastCalledWith({ part: "body", path: "", code: "invalid_json" });
    expect(badShape).toHaveBeenCalledTimes(2);
  });

  it("an unreadable multipart body calls the custom badShape", async () => {
    const badShape = vi.fn(() => clientError("badForm", 400));
    const route = makeRoute({ body: undefined, form: { maxBytes: 1024 }, badShape });
    const response = await route({
      request: post("unreadable", { "content-type": "multipart/form-data" }),
      params: {},
    });
    expect(response.status).toBe(400);
    expect(badShape).toHaveBeenCalledExactlyOnceWith({
      part: "body",
      path: "body",
      code: "badShape",
    });
  });

  it("the declared clientError badShape answers 400 bad request", async () => {
    const route = makeRoute({ badShape: "clientError" });
    const response = await route({ request: post(JSON.stringify({ listingId: "x" })), params: {} });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "bad request" });
  });

  it("unused imports stay referenced", () => {
    expect(typeof clientError).toBe("function");
    expect(typeof verdict).toBe("function");
  });
});
