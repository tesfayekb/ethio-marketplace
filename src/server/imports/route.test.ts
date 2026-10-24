import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 12 (DEC-237) — THE IMPORT ROUTE FACTORY (IMR-1…10). The
 * caller, has_permission, the RPCs and the dial are mocked; counters prove
 * what a refusal never reached (no body pull, no dial, no RPC, no refresh).
 * The gate (gate.ts) is the real one.
 */

const state = {
  allowed: true,
  dialAllowed: true,
  spends: [] as string[],
  rpcs: [] as { name: string; args: Record<string, unknown> }[],
  answers: {} as Record<string, { data: unknown; error: unknown }>,
  callerCalls: 0,
  pulls: 0,
  refreshes: [] as string[],
  logs: [] as string[],
};

async function rpc(name: string, args: Record<string, unknown>) {
  state.rpcs.push({ name, args });
  if (name === "has_permission") return { data: state.allowed, error: null };
  return state.answers[name] ?? { data: {}, error: null };
}

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: (path: string, message: unknown) => state.logs.push(`${path} ${String(message)}`),
    userClientFromRequest: async () => {
      state.callerCalls += 1;
      return { supabase: { rpc }, userId: "user-imr", reason: null, message: "" };
    },
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async () => ({ allowed: true, resetsAt: null, remaining: 1 }),
    envDial: (_name: string, fallback: number) => fallback,
    upstreamUnavailable: (_path: string, _what: string, _status: number) =>
      routeJson({ error: "upstream unavailable" }, 503),
    upstreamFailed: () => false,
    doorAnswer: (data: unknown) => data,
    callerHasPermission: async (
      supabase: { rpc: typeof rpc },
      userId: string,
      permission: string,
    ) => {
      const [resource, action] = permission.split(":");
      const { data } = await supabase.rpc("has_permission", {
        p_user_id: userId,
        p_resource: resource,
        p_action: action,
      });
      return data === true;
    },
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
  refreshCatalogFindAfterCommit: async () => {
    state.refreshes.push("catalogFind");
  },
  refreshNameFoldsAfterCommit: async () => {
    state.refreshes.push("nameFolds");
  },
}));
vi.mock("@/server/dials", () => ({
  spend: async (dial: { action: string }, key: string) => {
    state.spends.push(`${dial.action} ${key}`);
    return { allowed: state.dialAllowed, resetsAt: null, remaining: 0 };
  },
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { defineImportRoute } = await import("./route");
const { exportColumns } = await import("./csv");
const { digestOf } = await import("./gate");
const { familyOf, fileOf } = await import("./registry");

const header = (family: string, file: string) =>
  exportColumns(fileOf(familyOf(family)!, file)!)
    .map((column) => column.header)
    .join(",");
const CATEGORIES = `${header("categories", "categories")}\r\n,e2e-imr,,Probe,,10,true,true,,true,,,,30,,,,,,,\r\n`;
const COUNTRIES = `${header("locations", "countries")}\r\nZQ,Probe,false,metric,,0,\r\n`;
const STRINGS = `${header("translations", "strings")}\r\ne2e.imr.key,"src","value","note"\r\n`;

const categories = defineImportRoute("categories", {
  rpcs: {
    preview: "admin_preview_category_import",
    commit: "admin_commit_category_import",
    undo: "admin_undo_category_import",
  },
  args: (rows, scope) => ({ p_rows: rows["categories"] ?? [], p_scope: scope }),
  refresh: ["catalogFind", "nameFolds"],
  withRowValuesMap: { definitions: "categories" },
});
const locations = defineImportRoute("locations", {
  rpcs: {
    preview: "admin_preview_location_import",
    commit: "admin_commit_location_import",
    undo: "admin_undo_location_import",
  },
  args: (rows, scope) => ({
    p_countries: rows["countries"] ?? [],
    p_locations: rows["locations"] ?? [],
    p_scope: scope,
  }),
  refresh: ["nameFolds"],
});
const translations = defineImportRoute("translations", {
  rpcs: { commit: "admin_import_translations", undo: "admin_undo_import" },
  args: (rows, scope) => ({
    p_lang: scope ?? "",
    p_items: (rows["strings"] ?? []).map((row) => ({ key: row["key"], value: row["translation"] })),
  }),
  refresh: [],
});

/** A body stream whose every pull is counted. */
function post(body: string | Uint8Array, headers: Record<string, string> = {}): Request {
  const encoded = typeof body === "string" ? new TextEncoder().encode(body) : body;
  let sent = false;
  const stream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        state.pulls += 1;
        if (sent) return controller.close();
        sent = true;
        controller.enqueue(encoded);
      },
    },
    { highWaterMark: 0 },
  );
  return new Request("http://local/api/admin/x/import", {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: "Bearer t", ...headers },
    body: stream,
    duplex: "half",
  } as RequestInit);
}

const send = (route: typeof categories, body: unknown, headers?: Record<string, string>) =>
  route({ request: post(JSON.stringify(body), headers), params: {} });

const doorCalls = () =>
  state.rpcs.filter((call) => call.name !== "has_permission" && call.name !== "import_gate_audit");

beforeEach(() => {
  state.allowed = true;
  state.dialAllowed = true;
  state.spends = [];
  state.rpcs = [];
  state.answers = {};
  state.callerCalls = 0;
  state.pulls = 0;
  state.refreshes = [];
  state.logs = [];
});

describe("defineImportRoute", () => {
  it("IMR-1 a caller without the permission answers 403: no read, no dial, no RPC", async () => {
    state.allowed = false;
    const response = await send(categories, { categories: CATEGORIES });
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "forbidden" });
    expect(state.pulls).toBe(0);
    expect(state.spends).toEqual([]);
    expect(state.rpcs.map((call) => call.name)).toEqual(["has_permission"]);
    expect(state.rpcs[0]?.args).toMatchObject({ p_resource: "categories", p_action: "import" });
  });

  it("IMR-2 an invalid UTF-8 body answers 400 invalidEncoding before the gate", async () => {
    const bytes = new Uint8Array([...new TextEncoder().encode('{"categories":"'), 0xff, 0x22, 0x7d]);
    const response = await categories({ request: post(bytes), params: {} });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalidEncoding" });
    expect(state.spends).toEqual([]);
    expect(doorCalls()).toEqual([]);
  });

  it("IMR-3 a 5 MB Content-Length answers 413 fileTooLarge with nothing read", async () => {
    const response = await send(categories, { categories: CATEGORIES }, { "content-length": "5000000" });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "fileTooLarge" });
    expect(state.callerCalls).toBe(0);
    expect(state.pulls).toBe(0);
    expect(state.rpcs).toEqual([]);
  });

  it("IMR-4 an absent file key is the empty string (locations, countries only)", async () => {
    state.answers["admin_preview_location_import"] = {
      data: { counts: { adds: 1 }, refusals: [] },
      error: null,
    };
    const response = await send(locations, { countries: COUNTRIES });
    expect(response.status).toBe(200);
    const preview = doorCalls().find((call) => call.name === "admin_preview_location_import");
    expect(preview?.args["p_locations"]).toEqual([]);
    expect((preview?.args["p_countries"] as unknown[]).length).toBe(1);
    expect(preview?.args["p_scope"]).toBeNull();
    const body = (await response.json()) as Record<string, unknown>;
    expect(body["counts"]).toEqual({ adds: 1, refusals: 0 });
    expect(body["digest"]).toBe(await digestOf([COUNTRIES, ""]));
  });

  it("IMR-5 no file answers 400 no file: no dial, no RPC", async () => {
    const response = await send(categories, { mode: "preview", scope: null });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "no file" });
    expect(state.spends).toEqual([]);
    expect(doorCalls()).toEqual([]);
  });

  it("IMR-6 a spent dial on preview answers 429 rateLimited with no RPC; commit metering follows budgetModes", async () => {
    state.dialAllowed = false;
    const limited = await send(categories, { categories: CATEGORIES });
    expect(limited.status).toBe(429);
    expect(await limited.json()).toEqual({ error: "rateLimited" });
    expect(state.spends).toEqual(["import:categories user-imr"]);
    expect(doorCalls()).toEqual([]);

    state.spends = [];
    const digest = await digestOf([CATEGORIES]);
    const commit = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(commit.status).toBe(200);
    expect(state.spends).toEqual([]);

    state.spends = [];
    const strings = await send(translations, { lang: "am", strings: STRINGS });
    expect(strings.status).toBe(429);
    expect(state.spends).toEqual(["import:translations user-imr"]);
    expect(doorCalls()).toEqual([
      expect.objectContaining({ name: "admin_commit_category_import" }),
    ]);
  });

  it("IMR-7 a stale digest answers 409 fileChanged and the commit RPC is never called", async () => {
    const response = await send(categories, {
      mode: "commit",
      categories: CATEGORIES,
      digest: "stale",
    });
    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({ error: "fileChanged" });
    expect(doorCalls()).toEqual([]);
    expect(state.refreshes).toEqual([]);
  });

  it("IMR-8 a RAISE `unknownParent: shoes` answers 409 with the key and its detail", async () => {
    state.answers["admin_commit_category_import"] = {
      data: null,
      error: { message: "unknownParent: shoes", details: "internal", hint: "secret" },
    };
    const digest = await digestOf([CATEGORIES]);
    const response = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({ error: "unknownParent", detail: "shoes" });
  });

  it("IMR-9 an undeclared RAISE answers 500 with an incident and no message text", async () => {
    state.answers["admin_preview_category_import"] = {
      data: null,
      error: { message: "relation cat_secret does not exist", details: "pg detail" },
    };
    const response = await send(categories, { categories: CATEGORIES });
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(Object.keys(JSON.parse(text) as object).sort()).toEqual(["error", "incident"]);
    expect(text).not.toMatch(/cat_secret|pg detail/);
    expect(state.logs.join("\n")).toMatch(/cat_secret/);
  });

  it("IMR-10 the refresh runs only after a successful commit, never after a refused one", async () => {
    const digest = await digestOf([CATEGORIES]);
    state.answers["admin_commit_category_import"] = {
      data: null,
      error: { message: "import already running" },
    };
    const refused = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(refused.status).toBe(409);
    expect(await refused.json()).toEqual({ error: "import already running" });
    expect(state.refreshes).toEqual([]);

    state.answers["admin_commit_category_import"] = {
      data: { batch_id: "b-1", counts: { adds: 1 }, refusals: [] },
      error: null,
    };
    const done = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(done.status).toBe(200);
    expect(await done.json()).toEqual({ batch_id: "b-1", counts: { adds: 1 }, refusals: [] });
    expect(state.refreshes).toEqual(["catalogFind", "nameFolds"]);
  });
});
