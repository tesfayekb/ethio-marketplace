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
  /** D1 M6 — a per-action cap: the n+1th spend of a capped action is refused. */
  caps: {} as Record<string, number>,
  spends: [] as string[],
  rpcs: [] as { name: string; args: Record<string, unknown> }[],
  answers: {} as Record<string, { data: unknown; error: unknown }>,
  callerCalls: 0,
  pulls: 0,
  refreshes: [] as string[],
  logs: [] as string[],
  auditError: null as { message: string } | null,
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
    logRouteError: (path: string, message: unknown) =>
      state.logs.push(`${path} ${String(message)}`),
    userClientFromRequest: async () => {
      state.callerCalls += 1;
      return { supabase: { rpc }, userId: "user-imr", reason: null, message: "" };
    },
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async () => ({ allowed: true, resetsAt: null, remaining: 1 }),
    // D1 M4b — the audit row goes through the server's client, recorded like a door call.
    writeImportAudit: async (entry: Record<string, unknown>) => {
      state.rpcs.push({ name: "import_gate_audit", args: entry });
      return state.auditError;
    },
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
    const cap = state.caps[dial.action];
    const used = state.spends.filter((line) => line.startsWith(`${dial.action} `)).length;
    const allowed = state.dialAllowed && (cap === undefined || used <= cap);
    return { allowed, resetsAt: null, remaining: 0 };
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
const DEFINITIONS = `${header("attributes", "definitions")}\r\n`;
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
const attributes = defineImportRoute("attributes", {
  rpcs: {
    preview: "admin_preview_attribute_import",
    commit: "admin_commit_attribute_import",
    undo: "admin_undo_attribute_import",
  },
  args: (rows, scope) => ({
    p_definitions: rows["definitions"] ?? [],
    p_links: rows["links"] ?? [],
    p_scope: scope,
  }),
  refresh: [],
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
  state.caps = {};
  state.spends = [];
  state.rpcs = [];
  state.answers = {};
  state.callerCalls = 0;
  state.pulls = 0;
  state.refreshes = [];
  state.logs = [];
  state.auditError = null;
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
    const bytes = new Uint8Array([
      ...new TextEncoder().encode('{"categories":"'),
      0xff,
      0x22,
      0x7d,
    ]);
    const response = await categories({ request: post(bytes), params: {} });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalidEncoding" });
    expect(state.spends).toEqual([]);
    expect(doorCalls()).toEqual([]);
  });

  it("IMR-3 a 5 MB Content-Length answers 413 fileTooLarge with nothing read", async () => {
    const response = await send(
      categories,
      { categories: CATEGORIES },
      { "content-length": "5000000" },
    );
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
    // D1 M6 — the family meter stays preview-only; the commit spends the shared dial.
    expect(state.spends).toEqual(["import:commit user-imr"]);

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

  it("IMR-11 an import that saves always has its audit row, written for the verified caller", async () => {
    const audits = () => state.rpcs.filter((call) => call.name === "import_gate_audit");
    const digest = await digestOf([CATEGORIES]);
    state.answers["admin_commit_category_import"] = {
      data: { batch_id: "b-1", counts: { adds: 1 }, refusals: [] },
      error: null,
    };
    const done = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(done.status).toBe(200);
    expect(audits()).toEqual([
      {
        name: "import_gate_audit",
        args: {
          actor: "user-imr",
          family: "categories",
          event: "commit",
          batch: "b-1",
          counts: { adds: 1, refusals: 0 },
        },
      },
    ]);

    state.rpcs = [];
    const undone = await send(categories, { mode: "undo", batchId: "b-1" });
    expect(undone.status).toBe(200);
    expect(audits().map((call) => call.args)).toEqual([
      { actor: "user-imr", family: "categories", event: "undo", batch: "b-1", counts: {} },
    ]);

    state.rpcs = [];
    state.answers["admin_commit_category_import"] = { data: null, error: { message: "nope" } };
    const refused = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
    expect(refused.status).toBe(500);
    expect(audits()).toEqual([]);
  });

  it("IMR-12 an audit row that cannot be written is logged (F4), and the saved import still answers", async () => {
    const errors: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((line: unknown) => {
      errors.push(String(line));
    });
    try {
      state.auditError = { message: "audit door down" };
      const digest = await digestOf([CATEGORIES]);
      state.answers["admin_commit_category_import"] = {
        data: { batch_id: "b-2", counts: {}, refusals: [] },
        error: null,
      };
      const done = await send(categories, { mode: "commit", categories: CATEGORIES, digest });
      expect(done.status).toBe(200);
      expect(errors.join("\n")).toMatch(/audit_failed audit door down/);
    } finally {
      spy.mockRestore();
    }
  });
  describe("IMR-13 (D1 M6, INC-951 3c) the n+1th commit or undo is refused before any write", () => {
    const families = [
      {
        id: "categories",
        route: categories,
        commit: "admin_commit_category_import",
        undo: "admin_undo_category_import",
        files: { categories: CATEGORIES },
        texts: [CATEGORIES],
      },
      {
        id: "attributes",
        route: attributes,
        commit: "admin_commit_attribute_import",
        undo: "admin_undo_attribute_import",
        files: { definitions: DEFINITIONS },
        texts: [DEFINITIONS, ""],
      },
      {
        id: "locations",
        route: locations,
        commit: "admin_commit_location_import",
        undo: "admin_undo_location_import",
        files: { countries: COUNTRIES },
        texts: [COUNTRIES, ""],
      },
      {
        id: "translations",
        route: translations,
        commit: "admin_import_translations",
        undo: "admin_undo_import",
        files: { lang: "am", strings: STRINGS },
        texts: null,
      },
    ] as const;
    const audits = () => state.rpcs.filter((call) => call.name === "import_gate_audit");

    for (const family of families) {
      it(`${family.id}: commit 2 of a 1-commit window answers 429 with no door call and no audit row`, async () => {
        state.caps = { "import:commit": 1 };
        state.answers[family.commit] = {
          data: { batch_id: "b-1", counts: {}, refusals: [], imported: 1 },
          error: null,
        };
        const digest = family.texts === null ? undefined : await digestOf([...family.texts]);
        const body = {
          mode: "commit",
          ...family.files,
          ...(digest === undefined ? {} : { digest }),
        };
        const first = await send(family.route, body);
        expect(first.status).toBe(200);
        expect(doorCalls().filter((call) => call.name === family.commit)).toHaveLength(1);

        state.rpcs = [];
        const second = await send(family.route, body);
        expect(second.status).toBe(429);
        expect(await second.json()).toEqual({ error: "rateLimited" });
        expect(doorCalls()).toEqual([]);
        expect(audits()).toEqual([]);
      });

      it(`${family.id}: undo 2 of a 1-undo window answers 429 with no door call and no audit row`, async () => {
        state.caps = { "import:undo": 1 };
        const first = await send(family.route, {
          mode: "undo",
          batchId: "b-1",
          ...(family.id === "translations" ? { lang: "am" } : {}),
        });
        expect(first.status).toBe(200);
        expect(doorCalls().filter((call) => call.name === family.undo)).toHaveLength(1);

        state.rpcs = [];
        const second = await send(family.route, {
          mode: "undo",
          batchId: "b-1",
          ...(family.id === "translations" ? { lang: "am" } : {}),
        });
        expect(second.status).toBe(429);
        expect(await second.json()).toEqual({ error: "rateLimited" });
        expect(doorCalls()).toEqual([]);
        expect(audits()).toEqual([]);
        expect(state.spends.filter((line) => line.startsWith("import:undo "))).toHaveLength(2);
      });
    }
  });
});
