import { join, relative } from "node:path";

import ts from "typescript";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { TREE_SCAN_MS, typedProgram, walkFiles } from "../../scripts/conformance/kit";

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
  rpcAnswer: "allowed" as string,
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
    // Foundations turn 11 / DEC-465 — the one staff check, as the real one calls it (PRM-1 pins it).
    callerHasPermission: async (
      supabase: {
        rpc: (name: string, args: unknown) => Promise<{ data: unknown; error: unknown }>;
      },
      permission: string,
    ) => {
      const [resource, action] = permission.split(":");
      const { data, error } = await supabase.rpc("my_permission_answer", {
        p_resource: resource,
        p_action: action,
      });
      if (error) throw error;
      return data;
    },
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
  state.rpcAnswer = "allowed";
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

  it("RT-8 staff mode asks my_permission_answer as the caller: 403 on denied, the one 428 on a session without its second factor, the handler on allowed", async () => {
    const route = makeRoute({ auth: { staff: { resource: "listings", action: "manage" } } });
    const call = () => route({ request: post(JSON.stringify({ listingId: LISTING })), params: {} });
    state.rpcAnswer = "denied";
    const denied = await call();
    expect(denied.status).toBe(403);
    expect(await denied.json()).toEqual({ error: "forbidden" });
    expect(state.rpcCalls).toEqual([
      { name: "my_permission_answer", args: { p_resource: "listings", p_action: "manage" } },
    ]);
    state.rpcAnswer = "stepUp";
    const stepUp = await call();
    expect(stepUp.status).toBe(428);
    expect(await stepUp.json()).toEqual({ error: "step-up required", code: "P0009" });
    state.rpcAnswer = "stepUpNoFactor";
    const noFactor = await call();
    expect(noFactor.status).toBe(428);
    expect(await noFactor.json()).toEqual({
      error: "step-up required: no verified factor",
      code: "P0009",
    });
    // a refusal leaves no trace: the handler never ran, no dial was spent (RT-8, G38)
    expect(state.handlerCalls).toBe(0);
    expect(state.rates).toEqual([]);
    state.rpcAnswer = "allowed";
    const allowed = await call();
    expect(allowed.status).toBe(200);
    expect(state.handlerCalls).toBe(1);
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

  it("RT-21 an invalid UTF-8 body answers 400 invalidEncoding; no dial, no handler", async () => {
    const route = makeRoute({
      rate: [
        { dial: { action: "post", limit: { fallback: 5 }, windowSeconds: 86_400 }, key: "user" },
      ],
    });
    const prefix = new TextEncoder().encode('{"listingId":"');
    const bytes = new Uint8Array([...prefix, 0xc3, 0x28, 0x22, 0x7d]);
    const request = new Request("http://local/api/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: bytes,
    });
    const response = await route({ request, params: {} });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalidEncoding" });
    expect(state.handlerCalls).toBe(0);
    expect(state.rates).toEqual([]);
  });

  it("RT-22 a declared tooLarge word answers both 413 paths", async () => {
    const route = makeRoute({ limits: { bodyBytes: 10, tooLarge: "fileTooLarge" } });
    const byHeader = await route({
      request: post(JSON.stringify({ listingId: LISTING }), { "content-length": "999" }),
      params: {},
    });
    expect(byHeader.status).toBe(413);
    expect(await byHeader.json()).toEqual({ error: "fileTooLarge" });
    expect(state.callerCalls).toBe(0);
    const request = countedPost(JSON.stringify({ listingId: LISTING }));
    expect(request.headers.get("content-length")).toBeNull();
    const byReader = await route({ request, params: {} });
    expect(byReader.status).toBe(413);
    expect(await byReader.json()).toEqual({ error: "fileTooLarge" });
    expect(state.callerCalls).toBe(1);
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

  it("the declared clientError badShape answers 400 badShape", async () => {
    const route = makeRoute({ badShape: "clientError" });
    const response = await route({ request: post(JSON.stringify({ listingId: "x" })), params: {} });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "badShape" });
  });

  /**
   * INC-1352 / RT-23 — EVERY ROUTE REFUSAL CARRIES A CODE (INC-1354 widened it to the refusal passed
   * by name, cursor-bundle-8c-3b). The first argument of a `clientError(` call is the body's `error`,
   * which a screen reads as a refusal only when it is code-shaped; a literal with a space is a
   * sentence. The census reads every call under src/ by its syntax tree (a call split over lines, a
   * ternary of two words) and, where the first argument is not made of literals, by its TYPE through
   * the checker: a name typed by a union of literals is judged literal by literal (a sentence in the
   * union is a finding, whatever the name's own source — `const mode = ok ? "a b" : "c d"`), and a
   * name typed plain `string` is a RELAY, which needs its own allowance line (`file::<the name>`,
   * said as written) saying where its shape is judged.
   */
  type Refusal = { key: string; kind: "sentence" | "relay" };
  const refusalsOf = (program: ts.Program, path: string): Refusal[] => {
    const source = program.getSourceFile(join(process.cwd(), path));
    if (source === undefined) throw new Error(`${path} is not in the program`);
    const checker = program.getTypeChecker();
    const found: Refusal[] = [];
    const literalsOnly = (n: ts.Node): boolean =>
      ts.isStringLiteralLike(n) ||
      (ts.isConditionalExpression(n) && literalsOnly(n.whenTrue) && literalsOnly(n.whenFalse)) ||
      (ts.isParenthesizedExpression(n) && literalsOnly(n.expression));
    const visit = (node: ts.Node): void => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "clientError" &&
        node.arguments[0] !== undefined
      ) {
        const first = node.arguments[0];
        const sentence = (text: string) =>
          found.push({ key: `${path}::${text}`, kind: "sentence" });
        if (ts.isTemplateExpression(first) && first.head.text.includes(" "))
          sentence(first.head.text);
        else if (literalsOnly(first)) {
          const literals = (n: ts.Node) => {
            if (ts.isStringLiteralLike(n) && n.text.includes(" ")) sentence(n.text);
            ts.forEachChild(n, literals);
          };
          literals(first);
        } else {
          const type = checker.getTypeAtLocation(first);
          const parts = type.isUnion() ? type.types : [type];
          if (parts.every((part) => part.isStringLiteral())) {
            for (const part of parts)
              if (part.isStringLiteral() && part.value.includes(" ")) sentence(part.value);
          } else found.push({ key: `${path}::${first.getText()}`, kind: "relay" });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    return found;
  };
  const refusalsIn = (path: string, text: string): Refusal[] =>
    refusalsOf(typedProgram(process.cwd(), { path, text }), path);
  /**
   * `file::literal-or-name | reason | until` — a sentence still answered, or a relay. `until` is
   * `permanent` (a relay: its shape is judged where it is built, and the reason says where), an
   * ISO date no later than 2026-12-31, or the INC that owns the fix (`INC-n`, as
   * scripts/conformance/kit.ts takes it); an INC until needs a reason that names that INC.
   */
  const SENTENCE_UNTIL = "2026-12-31";
  const SENTENCE_ALLOW: ReadonlyArray<string> = [
    `src/server/answer.ts::refused.code | a relay: the code of a refusal a door marked (gateRefusal), a camelCase word by the door's own rule | permanent`,
    `src/server/route.ts::tooLarge | a relay: the route's declared limits.tooLarge word, a code by its declaration (the default is payloadTooLarge) | permanent`,
    `src/server/imports/route.ts::word | a relay: a door's refusal code, matched against CODE_WORD before it is answered | permanent`,
    `src/server/imports/route.ts::entry.match | a relay: IMPORT_REFUSALS' declared message, a typed table the import tests read | permanent`,
    `src/server/imports/route.ts::key | a relay: a nested door's translation key, matched against DOOR_KEY before it is answered | permanent`,
    `src/server/imports/route.ts::gate.error | a relay: the import gate's file-law word, a code each (IMPORT_WORDS lists them, IMD-6 judges them) | permanent`,
    `src/server/imports/gate.ts::law.error | a relay: exportScopeLaw's two refusals, the codes unknownFamily and badScope | permanent`,
    `src/routes/api/admin/categories/generate-image.ts::word | a sentence passed by name (an AI feature is off), found by RT-23's name reading in cursor-bundle-8c-3b; no screen reads it, its code is owed | 2026-12-31`,
    `src/routes/api/admin/categories/suggest-icon.ts::word | a sentence passed by name (an AI feature is off), found by RT-23's name reading in cursor-bundle-8c-3b; no screen reads it, its code is owed | 2026-12-31`,
    `src/routes/api/translate.ts::word | a sentence passed by name (machine translation is off), found by RT-23's name reading in cursor-bundle-8c-3b; no screen reads it, its code is owed | 2026-12-31`,
  ];
  /** What is wrong with one allowance line's reason and until (empty when the line is right). */
  const lineProblems = (key: string, reason: string, until: string, today: string): string[] => [
    ...(reason === "" ? [`${key}: no reason`] : []),
    ...(until === "permanent"
      ? []
      : /^INC-\d+$/.test(until)
        ? reason.includes(until)
          ? []
          : [`${key}: an INC until needs a reason that names ${until}`]
        : /^\d{4}-\d{2}-\d{2}$/.test(until) && until <= SENTENCE_UNTIL && until >= today
          ? []
          : [
              `${key}: until "${until}" is not permanent, an INC or a live date up to ${SENTENCE_UNTIL}`,
            ]),
  ];

  it(
    "RT-23 no route answers a refusal whose error is a sentence; a name is read by its type",
    () => {
      const keys = (found: Refusal[]) => found.map((refusal) => `${refusal.kind} ${refusal.key}`);
      // Planted: the boundary's own line 173 at f61239565.
      expect(
        keys(
          refusalsIn(
            "src/planted-refusals.ts",
            'declare function clientError(e: string, s: number): Response;\nexport function a(mode: string) {\n  if (mode === "clientError") return clientError("bad request", 400);\n}',
          ),
        ),
      ).toEqual(["sentence src/planted-refusals.ts::bad request"]);
      // Planted: the import factory's `modeSentence` as it stood at 3dc448dc3 — a const of two
      // sentences, passed by name.
      expect(
        keys(
          refusalsIn(
            "src/planted-refusals.ts",
            [
              "declare function clientError(e: string, s: number): Response;",
              "export function a(hasPreview: boolean) {",
              "  const modeSentence = hasPreview",
              '    ? "mode must be preview, commit or undo"',
              '    : "mode must be commit or undo";',
              "  return clientError(modeSentence, 400);",
              "}",
            ].join("\n"),
          ),
        ),
      ).toEqual([
        "sentence src/planted-refusals.ts::mode must be preview, commit or undo",
        "sentence src/planted-refusals.ts::mode must be commit or undo",
      ]);
      // Quiet: a code, a name typed by a union of codes, a code chosen by a ternary of codes, a call
      // split over lines, a property typed by a union of codes.
      expect(
        keys(
          refusalsIn(
            "src/planted-refusals.ts",
            [
              "declare function clientError(e: string, s: number): Response;",
              'declare const word: "badKey" | "badCursor";',
              'declare const held: { error: "badShape" | "noFile" };',
              "export function a(c: boolean) {",
              '  clientError("badShape", 400);',
              "  clientError(word, 409);",
              "  clientError(held.error, 400);",
              '  clientError(c ? "badCursor" : "badKey", 400);',
              '  return clientError(\n    "tooLarge",\n    413,\n  );',
              "}",
            ].join("\n"),
          ),
        ),
      ).toEqual([]);
      // Two words in a ternary are both read; a sentence in a typed property is read; a name typed
      // plain `string` is a relay, said as written.
      expect(
        keys(
          refusalsIn(
            "src/planted-refusals.ts",
            [
              "declare function clientError(e: string, s: number): Response;",
              'declare const held: { error: "invalid json body" | "badShape" };',
              "declare const text: string;",
              "export function a(c: string) {",
              '  clientError(c === "x" ? "invalid json body" : "no file", 400);',
              "  clientError(held.error, 400);",
              "  return clientError(text, 400);",
              "}",
            ].join("\n"),
          ),
        ),
      ).toEqual([
        "sentence src/planted-refusals.ts::invalid json body",
        "sentence src/planted-refusals.ts::no file",
        "sentence src/planted-refusals.ts::invalid json body",
        "relay src/planted-refusals.ts::text",
      ]);

      const program = typedProgram(process.cwd());
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
        relative(process.cwd(), file),
      );
      const found = files.flatMap((file) =>
        program.getSourceFile(join(process.cwd(), file)) === undefined
          ? []
          : refusalsOf(program, file).map((refusal) => refusal.key),
      );
      const allowed = new Map(
        SENTENCE_ALLOW.map((line) => {
          const [key = "", reason = "", until = ""] = line.split(" | ").map((cell) => cell.trim());
          return [key, { reason, until }] as const;
        }),
      );
      const today = new Date().toISOString().slice(0, 10);
      expect(found.filter((key) => !allowed.has(key))).toEqual([]);
      expect(
        [...allowed.entries()].flatMap(([key, { reason, until }]) => [
          ...(found.includes(key) ? [] : [`${key}: stale`]),
          ...lineProblems(key, reason, until, today),
        ]),
      ).toEqual([]);
    },
    TREE_SCAN_MS * 2,
  );

  it("RT-23b the allowance line's until takes permanent, an INC, a live date, and nothing else", () => {
    const today = "2026-06-01";
    expect(lineProblems("k", "a relay", "permanent", today)).toEqual([]);
    expect(lineProblems("k", "INC-1354 owns it", "INC-1354", today)).toEqual([]);
    expect(lineProblems("k", "owned elsewhere", "INC-1354", today)).toHaveLength(1);
    expect(lineProblems("k", "a reason", "2026-12-31", today)).toEqual([]);
    expect(lineProblems("k", "a reason", "2026-05-01", today)).toHaveLength(1);
    expect(lineProblems("k", "a reason", "soon", today)).toHaveLength(1);
    expect(lineProblems("k", "", "INC-1354", today)).toHaveLength(2);
  });

  it("unused imports stay referenced", () => {
    expect(typeof clientError).toBe("function");
    expect(typeof verdict).toBe("function");
  });
});
