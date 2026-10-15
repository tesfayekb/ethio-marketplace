import { createClient } from "@supabase/supabase-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Database } from "@/integrations/supabase/types";

/**
 * INC-574 — AN UPSTREAM FAILURE IS NOT A VERDICT.
 *
 * Run 38250004537 (PW-59): the draft door's call answered an HTML error page,
 * the route sent it as `ok:false` / `doorError`, and the wizard showed a refusal
 * nobody made. These tests drive the real Supabase client with a stubbed
 * network, so the shapes they rely on (an error page's status and text, the
 * auth client's retryable error) are the library's own, not written by hand.
 */

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { rpc: async () => ({ data: null, error: null, status: 204 }) },
}));

const { logRouteError, refuseUserClient, upstreamFailed, userClientFromRequest } =
  await import("./user-client");
const { Route: DraftRoute } = await import("@/routes/api/listings/draft");
const { Route: IdentityRoute } = await import("@/routes/api/listings/identity");
const { Route: AliasRoute } = await import("@/routes/api/listings/alias");

const PAGE =
  "<html>\r\n<head><title>502 Bad Gateway</title></head>\r\n<body>gateway</body>\r\n</html>\r\n";
const USER_ID = "11111111-1111-4111-8111-111111111111";

type Answer = () => Response | Promise<Response>;
/** Bundle 16 turn S3 — the caller's own profile row, read by every route after the bearer (D189). */
const network: { auth: Answer; rpc: Answer; profile: Answer } = {
  auth: () => json({ id: USER_ID, aud: "authenticated" }, 200),
  rpc: () => json({ ok: true }, 200),
  profile: () => json({ account_status: "active" }, 200),
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function page(status: number): Response {
  return new Response(PAGE, { status, headers: { "content-type": "text/html" } });
}

const STUB_URL = "https://stub.supabase.co";

beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", STUB_URL);
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_stub");
  network.auth = () => json({ id: USER_ID, aud: "authenticated" }, 200);
  network.rpc = () => json({ ok: true }, 200);
  network.profile = () => json({ account_status: "active" }, 200);
  vi.stubGlobal("fetch", async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url.includes("/auth/v1/user")) return network.auth();
    if (url.includes("/rest/v1/rpc/")) return network.rpc();
    if (url.includes("/rest/v1/profiles")) return network.profile();
    throw new Error(`unexpected call ${url}`);
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function signedRequest(path: string, body: unknown): Request {
  return new Request(`http://local${path}`, {
    method: "POST",
    headers: { Authorization: "Bearer stub-token", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function rpcAnswer(answer: Answer) {
  network.rpc = answer;
  const client = createClient<Database>(STUB_URL, "sb_publishable_stub", {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client.rpc("submit_listing", {} as never);
}

describe("INC-574 — an upstream failure is not a verdict", () => {
  it("UP-1 an error page, a gateway status or no answer is an upstream failure; the door's own error is not", async () => {
    const htmlPage = await rpcAnswer(() => page(502));
    expect(htmlPage.status).toBe(502);
    expect(upstreamFailed(htmlPage.error, htmlPage.status)).toBe(true);

    const pageAt500 = await rpcAnswer(() => page(500));
    expect(upstreamFailed(pageAt500.error, pageAt500.status)).toBe(true);

    const noAnswer = await rpcAnswer(() => {
      throw new TypeError("fetch failed");
    });
    expect(noAnswer.status).toBe(0);
    expect(upstreamFailed(noAnswer.error, noAnswer.status)).toBe(true);

    for (const status of [503, 504, 522]) {
      const gateway = await rpcAnswer(() => json({ code: "PGRST000", message: "down" }, status));
      expect(upstreamFailed(gateway.error, gateway.status), String(status)).toBe(true);
    }

    const refused = await rpcAnswer(() =>
      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400),
    );
    expect(refused.status).toBe(400);
    expect(upstreamFailed(refused.error, refused.status)).toBe(false);

    const databaseError = await rpcAnswer(() =>
      json({ code: "57014", message: "canceling statement due to statement timeout" }, 500),
    );
    expect(upstreamFailed(databaseError.error, databaseError.status)).toBe(false);

    const answered = await rpcAnswer(() => json({ ok: true }, 200));
    expect(upstreamFailed(answered.error, answered.status)).toBe(false);
  });

  it("UP-2 the log names an error page and keeps what came before it", () => {
    const lines: unknown[][] = [];
    vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
      lines.push(args);
    });
    logRouteError("/api/x", `remove: ${PAGE}`);
    logRouteError("/api/x", "listing not found");
    expect(lines).toEqual([
      ["[ssr-error]", "/api/x", "remove: upstream returned an HTML error page (502)"],
      ["[ssr-error]", "/api/x", "listing not found"],
    ]);
  });

  it("UP-3 an auth server that does not answer is 'upstream' (503), a refused bearer stays 'not signed in' (401)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    network.auth = () => page(502);
    const down = await userClientFromRequest(signedRequest("/api/x", {}));
    expect(down.reason).toBe("upstream");
    expect(down.userId).toBeNull();
    const downAnswer = refuseUserClient("/api/x", down);
    expect(downAnswer?.status).toBe(503);
    expect(await downAnswer?.json()).toEqual({ error: "upstream unavailable" });

    network.auth = () => json({ code: 401, error_code: "bad_jwt", msg: "invalid JWT" }, 401);
    const refused = await userClientFromRequest(signedRequest("/api/x", {}));
    expect(refused.reason).toBe("notSignedIn");
    expect(refuseUserClient("/api/x", refused)?.status).toBe(401);

    network.auth = () => json({ id: USER_ID, aud: "authenticated" }, 200);
    const signedIn = await userClientFromRequest(signedRequest("/api/x", {}));
    expect(signedIn.reason).toBeNull();
    expect(signedIn.userId).toBe(USER_ID);
  });

  it("UP-4 the draft route answers an error page with 503, and the door's own exception as before", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const handlers = (
      DraftRoute.options as unknown as {
        server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
      }
    ).server.handlers;
    const save = () =>
      handlers.POST({
        request: signedRequest("/api/listings/draft", { step: 1, listingId: null }),
      });

    network.rpc = () => page(502);
    const down = await save();
    expect(down.status).toBe(503);
    expect(await down.json()).toEqual({ error: "upstream unavailable" });

    network.rpc = () =>
      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400);
    const refused = await save();
    expect(refused.status).toBe(200);
    expect(await refused.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "doorError" }],
    });
  });
});

type PostHandlers = {
  server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
};

/**
 * INC-578 — a door's own sentence never travels raw (INC-447). The identity and
 * alias routes sent a door's exception text as the refusal's reason ("account is
 * deactivated"); they now answer as every other posting route does: a machine
 * code is kept, anything else is `doorError`.
 */
describe("INC-578 — a door's own words never travel raw", () => {
  const sentence = () =>
    json({ code: "P0001", details: null, hint: null, message: "account is deactivated" }, 400);
  const machineCode = () =>
    json({ code: "P0001", details: null, hint: null, message: "aliasTaken" }, 400);

  it("UP-5 the identity route answers a door's sentence as doorError and keeps a machine code", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const handlers = (IdentityRoute.options as unknown as PostHandlers).server.handlers;
    const save = () => handlers.POST({ request: signedRequest("/api/listings/identity", {}) });

    network.rpc = sentence;
    const refused = await save();
    expect(refused.status).toBe(200);
    expect(await refused.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "doorError" }],
    });

    network.rpc = machineCode;
    expect(await (await save()).json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "aliasTaken" }],
    });
  });

  it("UP-6 the alias route answers a door's sentence as doorError", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const handlers = (AliasRoute.options as unknown as PostHandlers).server.handlers;
    network.rpc = sentence;
    const refused = await handlers.POST({
      request: signedRequest("/api/listings/alias", { alias: "e2e-alias" }),
    });
    expect(refused.status).toBe(200);
    expect(await refused.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "doorError" }],
    });
  });

  /**
   * Bundle 16 turn S3 (D189) — a deactivated account is refused at every route:
   * the caller check reads the bearer's own profile row; "deactivated" is 403,
   * a status it could not read is an upstream failure (503), never an open door.
   */
  it("UP-7 a deactivated bearer is refused at the caller check (403); an unreadable status is upstream (503)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    network.profile = () => json({ account_status: "deactivated" }, 200);
    const deactivated = await userClientFromRequest(signedRequest("/api/listings/draft", {}));
    expect(deactivated.reason).toBe("deactivated");
    expect(deactivated.userId).toBeNull();
    const refused = refuseUserClient("/api/listings/draft", deactivated);
    expect(refused?.status).toBe(403);
    expect(await refused?.json()).toEqual({ error: "account is deactivated" });

    const handlers = (DraftRoute.options as unknown as PostHandlers).server.handlers;
    const viaRoute = await handlers.POST({
      request: signedRequest("/api/listings/draft", { step: 1 }),
    });
    expect(viaRoute.status).toBe(403);

    network.profile = () => page(502);
    const unreadable = await userClientFromRequest(signedRequest("/api/listings/draft", {}));
    expect(unreadable.reason).toBe("upstream");
    expect(refuseUserClient("/api/listings/draft", unreadable)?.status).toBe(503);

    network.profile = () => json({ account_status: "active" }, 200);
    const active = await userClientFromRequest(signedRequest("/api/listings/draft", {}));
    expect(active.reason).toBeNull();
    expect(active.userId).toBe(USER_ID);
  });
});
