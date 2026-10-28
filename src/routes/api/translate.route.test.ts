import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { errorText } from "@/lib/error-text";

/**
 * Foundations turn 19 — POST and GET /api/translate on defineRoute and aiCall
 * (CHANGE 3 and 4, rulings R2 and R3). The route, the boundary, the gateway
 * and the adapter are real; the caller's database client, the meter, the
 * audit door and the provider are fakes that record every call, so each
 * refusal proves what did NOT happen: no scope read, no provider call, no
 * spend, no audit row, no write.
 */

const KEY = "test-only-translate-key";
const LANGUAGE_LIST = {
  data: { languages: [{ language: "am", name: "Amharic" }, { language: "om" }] },
};

type Call = { name: string; args: Record<string, unknown> };

const state = vi.hoisted(() => ({
  permissions: new Set<string>(),
  scopeOk: true as boolean,
  /** The scope door's own failure text, when it fails. */
  scopeError: null as string | null,
  calls: [] as Call[],
  /** The writer's refusal text by key (UI) or entity id. */
  writerErrors: new Map<string, string>(),
  flaggedKeys: [] as string[],
  gate: { on: true } as { on: true } | { on: false; reason: "staff" | "budget" | "unavailable" },
  spends: [] as { feature: string; units: number }[],
  audits: [] as Record<string, unknown>[],
  fake: false,
  logs: [] as string[],
  /** The provider's answer for the Nth translate request (1-based); default: echo. */
  failChunk: new Map<number, "status" | "network">(),
  translateRequests: 0,
  pressAllowed: true,
  presses: [] as string[],
  languageRequests: 0,
}));

vi.mock("@/server/supabase/user-client", async (original) => {
  const actual = await original<typeof import("@/server/supabase/user-client")>();
  const client = {
    rpc: async (name: string, args: Record<string, unknown>) => {
      state.calls.push({ name, args });
      if (name === "translation_scope_ok") {
        return state.scopeError === null
          ? { data: state.scopeOk, error: null, status: 200 }
          : { data: null, error: { message: state.scopeError }, status: 500 };
      }
      if (name === "admin_machine_translation" || name === "admin_machine_entity_translation") {
        const id = String(name === "admin_machine_translation" ? args.p_key : args.p_id);
        const message = state.writerErrors.get(id);
        return { data: null, error: message === undefined ? null : { message }, status: 200 };
      }
      if (name === "admin_list_translations") {
        return { data: state.flaggedKeys.map((key) => ({ key })), error: null, status: 200 };
      }
      return { data: null, error: { message: `unexpected rpc ${name}` }, status: 400 };
    },
  };
  return {
    ...actual,
    userClientFromRequest: async () => ({
      supabase: client,
      userId: "e2e-translator",
      reason: null,
      message: "",
    }),
    callerHasPermission: async (_client: unknown, _user: string, permission: string) =>
      state.permissions.has(permission),
    logRouteError: (_path: string, error: unknown) => {
      state.logs.push(errorText(error));
    },
  };
});
vi.mock("@/server/ai/meter", async (original) => {
  const actual = await original<typeof import("@/server/ai/meter")>();
  return {
    ...actual,
    aiGate: async () => state.gate,
    recordAiSpend: async (feature: string, units: number) => {
      state.spends.push({ feature, units });
    },
  };
});
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    rpc: async (_door: string, args: Record<string, unknown>) => {
      state.audits.push(args);
      return { error: null };
    },
  },
}));
vi.mock("@/server/dials", () => ({
  spend: async (dial: { action: string }, key: string) => {
    state.presses.push(`${dial.action} ${key}`);
    return { allowed: state.pressAllowed, resetsAt: null, remaining: 0 };
  },
}));
vi.mock("@/server/stand-in", () => ({ standInMode: () => state.fake }));

const { Route } = await import("./translate");

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
const handlers = (Route.options as unknown as { server: { handlers: Record<string, Handler> } })
  .server.handlers;

function provider(): void {
  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.includes("/languages")) {
      state.languageRequests += 1;
      return new Response(JSON.stringify(LANGUAGE_LIST), { status: 200 });
    }
    state.translateRequests += 1;
    const failure = state.failChunk.get(state.translateRequests);
    if (failure === "network") throw new TypeError("fetch failed");
    if (failure === "status") {
      return new Response('{"error":{"message":"backend quota detail"}}', { status: 503 });
    }
    const q = new URLSearchParams(String(init?.body ?? "")).getAll("q");
    return new Response(
      JSON.stringify({
        data: { translations: q.map((text) => ({ translatedText: `T:${text}` })) },
      }),
      { status: 200 },
    );
  });
}

async function post(body: unknown, init?: { contentType?: string; raw?: string }) {
  const response = await handlers.POST({
    request: new Request("https://staging.example/api/translate", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-only-session",
        "Content-Type": init?.contentType ?? "application/json",
      },
      body: init?.raw ?? JSON.stringify(body),
    }),
    params: {},
  });
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

async function get() {
  const response = await handlers.GET({
    request: new Request("https://staging.example/api/translate", {
      headers: { Authorization: "Bearer test-only-session" },
    }),
    params: {},
  });
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

const items = (count: number, prefix = "e2e.trr") =>
  Array.from({ length: count }, (_, index) => ({
    key: `${prefix}.${index}`,
    source: `Text ${index}`,
  }));

const writes = () =>
  state.calls.filter(
    (call) =>
      call.name === "admin_machine_translation" || call.name === "admin_machine_entity_translation",
  );

beforeEach(() => {
  state.permissions = new Set(["translations:machine", "translations:manage"]);
  state.scopeOk = true;
  state.scopeError = null;
  state.calls = [];
  state.writerErrors = new Map();
  state.flaggedKeys = [];
  state.gate = { on: true };
  state.spends = [];
  state.audits = [];
  state.fake = false;
  state.logs = [];
  state.failChunk = new Map();
  state.translateRequests = 0;
  state.languageRequests = 0;
  vi.stubEnv("GOOGLE_TRANSLATE_API_KEY", KEY);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  provider();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/translate on defineRoute and aiCall (Foundations turn 19)", () => {
  it("TRR-1 a caller without translations:machine gets defineRoute's 403 and no scope read, provider call, spend or write", async () => {
    state.permissions = new Set(["translations:manage"]);
    expect(await post({ target_lang: "am", items: items(2) })).toEqual({
      status: 403,
      body: { error: "forbidden" },
    });
    expect(state.calls).toEqual([]);
    expect(state.translateRequests + state.languageRequests).toBe(0);
    expect(state.spends).toEqual([]);
    expect(state.audits).toEqual([]);
  });

  it("TRR-2 a translator outside the language gets 403 'not assigned to this language' with no provider call or spend", async () => {
    state.permissions = new Set(["translations:machine"]);
    state.scopeOk = false;
    expect(await post({ target_lang: "om", items: items(1) })).toEqual({
      status: 403,
      body: { error: "not assigned to this language" },
    });
    expect(state.calls).toEqual([{ name: "translation_scope_ok", args: { p_lang: "om" } }]);
    expect(state.translateRequests + state.languageRequests).toBe(0);
    expect(state.spends).toEqual([]);
    expect(state.audits).toEqual([]);
    // A scope read that fails keeps today's answer, its text in the log only.
    state.scopeError = "canceling statement due to statement timeout";
    const failed = await post({ target_lang: "om", items: items(1) });
    expect(failed).toEqual({ status: 500, body: { error: "internal error" } });
    expect(state.logs.some((line) => line.includes(state.scopeError ?? "-"))).toBe(true);
    expect(state.translateRequests).toBe(0);
    expect(state.spends).toEqual([]);
    expect(state.audits).toEqual([]);
  });

  it("TRR-3 switched off is 409 and an unreadable switch 503, with nothing written or translated", async () => {
    for (const [gate, status, reason] of [
      [{ on: false, reason: "staff" }, 409, "staff"],
      [{ on: false, reason: "budget" }, 409, "budget"],
      [{ on: false, reason: "unavailable" }, 503, "unavailable"],
    ] as const) {
      state.gate = gate;
      expect(await post({ target_lang: "am", items: items(150) })).toEqual({
        status,
        body: { error: `machine translation is switched off (${reason})` },
      });
    }
    expect(writes()).toEqual([]);
    expect(state.translateRequests).toBe(0);
    expect(state.spends).toEqual([]);
    // One audit row per refused first chunk, none for a second.
    expect(state.audits.map((row) => row.p_outcome)).toEqual([
      "featureOff",
      "budget",
      "unavailable",
    ]);
  });

  it("TRR-4 an unsupported target is 422 with no spend, no audit row and no write", async () => {
    expect(await post({ target_lang: "zz", items: items(3) })).toEqual({
      status: 422,
      body: { error: "target language zz is not supported by the provider" },
    });
    expect(state.translateRequests).toBe(0);
    expect(state.spends).toEqual([]);
    expect(state.audits).toEqual([]);
    expect(writes()).toEqual([]);
  });

  it("TRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk", async () => {
    state.failChunk.set(2, "status");
    const sent = items(150);
    const answer = await post({ target_lang: "am", items: sent });
    expect(answer.status).toBe(200);
    expect(answer.body).toEqual({
      done: 100,
      flagged: 0,
      failed: sent.slice(100).map((item) => ({ key: item.key, reason: "providerUnavailable" })),
    });
    expect(writes().map((call) => call.args.p_key)).toEqual(
      sent.slice(0, 100).map((item) => item.key),
    );
    expect(JSON.stringify(answer.body)).not.toContain("backend quota detail");
    // The first chunk's characters are metered; the refused one is not.
    expect(state.spends).toEqual([
      {
        feature: "translations",
        units: sent.slice(0, 100).reduce((sum, item) => sum + item.source.length, 0),
      },
    ]);
  });

  it("TRR-6 each writer refusal maps to its code, the text stays in the log and no reply carries it", async () => {
    const table: [string, string][] = [
      ["permission denied", "permission"],
      ["step-up required", "stepUp"],
      ["step-up required: no verified factor", "stepUp"],
      ["step-up required: verification expired", "stepUp"],
      ["not assigned to this language", "scope"],
      ["base language rows are sync-owned", "baseLocked"],
      ["unknown translation key", "unknownTarget"],
      ["unknown entity", "unknownTarget"],
      ["unknown entity field", "unknownTarget"],
      ["empty machine value", "emptyValue"],
      ["duplicate key value violates unique constraint", "writerFailed"],
    ];
    const sent = items(table.length);
    table.forEach(([message], index) => state.writerErrors.set(`e2e.trr.${index}`, message));
    const answer = await post({ target_lang: "am", items: sent });
    expect(answer).toEqual({
      status: 200,
      body: {
        done: 0,
        flagged: 0,
        failed: table.map(([, code], index) => ({ key: `e2e.trr.${index}`, reason: code })),
      },
    });
    const reply = JSON.stringify(answer.body);
    for (const [message] of table) {
      expect(reply).not.toContain(message);
      expect(state.logs.some((line) => line.includes(message))).toBe(true);
    }
    // The entity writer's refusals take the same table.
    const entity = [
      "0f0e0d0c-0b0a-4090-8000-000000000001",
      "0f0e0d0c-0b0a-4090-8000-000000000002",
      "0f0e0d0c-0b0a-4090-8000-000000000003",
    ];
    state.writerErrors.set(entity[0] ?? "", "unknown entity field");
    state.writerErrors.set(entity[1] ?? "", "empty machine value");
    const entityAnswer = await post({
      scope: "entity",
      target_lang: "am",
      items: entity.map((id) => ({
        key: `category:${id}`,
        source: "Cars",
        type: "category",
        id,
        field: "name",
      })),
    });
    expect(entityAnswer).toEqual({
      status: 200,
      body: {
        done: 1,
        flagged: 0,
        failed: [
          { key: `category:${entity[0]}`, reason: "unknownTarget" },
          { key: `category:${entity[1]}`, reason: "emptyValue" },
        ],
      },
    });
  });

  it("TRR-8 the body laws keep today's words for every refusal, before any scope read or provider call", async () => {
    const entityItem = {
      key: "category:x",
      source: "Cars",
      type: "category",
      id: "0f0e0d0c-0b0a-4090-8000-000000000001",
      field: "name",
    };
    const cases: [unknown, number, string][] = [
      [{ scope: "x", target_lang: "am", items: items(1) }, 400, "invalid scope"],
      [{ scope: null, target_lang: "am", items: items(1) }, 400, "invalid scope"],
      [{ scope: "x", target_lang: "!!", items: [] }, 400, "invalid scope"],
      [{ target_lang: "EN!", items: items(1) }, 400, "invalid target_lang"],
      [{ items: items(1) }, 400, "invalid target_lang"],
      [{ target_lang: 7, items: items(1) }, 400, "invalid target_lang"],
      [{ target_lang: "am", items: [] }, 400, "no items"],
      [{ target_lang: "am" }, 400, "no items"],
      [{ target_lang: "am", items: "x" }, 400, "no items"],
      [{ target_lang: "am", items: items(601) }, 413, "too many items (max 600)"],
      // Today's order: the count before any item.
      [{ target_lang: "am", items: [{ key: 5 }, ...items(600)] }, 413, "too many items (max 600)"],
      // Today's order: item by item — an earlier item's address before a later item's key.
      [
        {
          scope: "entity",
          target_lang: "am",
          items: [
            { key: "category:x", source: "Cars", type: "user", id: "1", field: "name" },
            { key: 5, source: "s", context: 5 },
          ],
        },
        400,
        "invalid entity item shape",
      ],
      [
        { target_lang: "am", items: [{ key: "k", source: "s", context: 5 }] },
        400,
        "context must be a string",
      ],
      [
        { target_lang: "am", items: [{ key: "k", source: "s", context: null }] },
        400,
        "context must be a string",
      ],
      [
        { target_lang: "am", items: [{ key: 5, source: "s", context: 5 }] },
        400,
        "context must be a string",
      ],
      [
        { target_lang: "am", items: [{ key: "k", source: "s", context: "x".repeat(501) }] },
        400,
        "context too long (max 500)",
      ],
      [{ target_lang: "am", items: [{ key: 5, source: "s" }] }, 400, "invalid item shape"],
      [{ target_lang: "am", items: [{ key: "k" }] }, 400, "invalid item shape"],
      [{ target_lang: "am", items: ["k"] }, 400, "invalid item shape"],
      [{ target_lang: "am", items: [null] }, 400, "invalid item shape"],
      [
        { scope: "entity", target_lang: "am", items: [{ ...entityItem, type: "user" }] },
        400,
        "invalid entity item shape",
      ],
      [
        { scope: "entity", target_lang: "am", items: [{ ...entityItem, id: "1" }] },
        400,
        "invalid entity item shape",
      ],
      [
        { scope: "entity", target_lang: "am", items: [{ ...entityItem, field: "" }] },
        400,
        "invalid entity item shape",
      ],
      [
        { scope: "entity", target_lang: "am", items: [{ key: "k", source: "s" }] },
        400,
        "invalid entity item shape",
      ],
    ];
    for (const [body, status, error] of cases) {
      expect(await post(body), JSON.stringify(body).slice(0, 120)).toEqual({
        status,
        body: { error },
      });
    }
    expect(await post(null, { raw: "{" })).toEqual({
      status: 400,
      body: { error: "invalid json body" },
    });
    // The shared boundary's laws (turn 18): strict keys, content type, size, UTF-8.
    expect(await post({ target_lang: "am", items: items(1), extra: true })).toEqual({
      status: 400,
      body: { error: "invalid json body" },
    });
    expect(await post({ target_lang: "am", items: [{ key: "k", source: "s", extra: 1 }] })).toEqual(
      {
        status: 400,
        body: { error: "invalid item shape" },
      },
    );
    expect(
      await post({ target_lang: "am", items: items(1) }, { contentType: "text/plain" }),
    ).toEqual({
      status: 415,
      body: { error: "unsupportedMediaType" },
    });
    expect(
      await post(null, {
        raw: JSON.stringify({
          target_lang: "am",
          items: [{ key: "k", source: "x".repeat(1_048_577) }],
        }),
      }),
    ).toEqual({ status: 413, body: { error: "payloadTooLarge" } });
    expect(state.calls).toEqual([]);
    expect(state.translateRequests + state.languageRequests).toBe(0);
    expect(state.spends).toEqual([]);
    // Today's normalisation still holds, and a UI item's entity fields are ignored.
    const accepted = await post({
      target_lang: " AM ",
      items: [{ key: "k", source: "s", context: "a note", type: "anything" }],
    });
    expect(accepted).toEqual({ status: 200, body: { done: 1, flagged: 0, failed: [] } });
    expect(state.calls[0]).toEqual({ name: "translation_scope_ok", args: { p_lang: "am" } });
  });

  it("TRR-9 a first-chunk provider network failure answers 200 with only that chunk's keys providerUnavailable and the second chunk written", async () => {
    state.failChunk.set(1, "network");
    const sent = items(150);
    const answer = await post({ target_lang: "am", items: sent });
    expect(answer).toEqual({
      status: 200,
      body: {
        done: 50,
        flagged: 0,
        failed: sent
          .slice(0, 100)
          .map((item) => ({ key: item.key, reason: "providerUnavailable" })),
      },
    });
    expect(writes().map((call) => call.args.p_key)).toEqual(
      sent.slice(100).map((item) => item.key),
    );
  });

  it("TRR-6b a flagged write is counted from the writer's own rows, as today", async () => {
    state.flaggedKeys = ["e2e.trr.1", "someone-else"];
    expect(await post({ target_lang: "am", items: items(2) })).toEqual({
      status: 200,
      body: { done: 2, flagged: 1, failed: [] },
    });
  });
});

describe("GET /api/translate on defineRoute (Foundations turn 19)", () => {
  it("TRR-7 GET without translations:manage is 403 and with it answers the provider's list", async () => {
    state.permissions = new Set(["translations:machine"]);
    expect(await get()).toEqual({ status: 403, body: { error: "forbidden" } });
    expect(state.languageRequests).toBe(0);
    state.permissions = new Set(["translations:manage"]);
    expect(await get()).toEqual({
      status: 200,
      body: {
        languages: [
          { code: "am", name: "Amharic" },
          { code: "om", name: "om" },
        ],
      },
    });
    expect(state.audits).toEqual([]);
    expect(state.spends).toEqual([]);
  });
});
