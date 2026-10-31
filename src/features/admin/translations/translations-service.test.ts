import { beforeEach, describe, expect, it, vi } from "vitest";

import type { RouteAnswer, RouteInit, RoutePath } from "@/lib/route-client";

/**
 * Foundations turn 19 — the machine-translation client on callRoute
 * (CHANGE 5, ruling R4): the route's per-item reason codes map to existing
 * keys and carry no detail line; every non-answered kind throws today's words.
 */
const route = vi.hoisted(() => ({
  answer: { kind: "signedOut" } as RouteAnswer,
  calls: [] as { path: RoutePath; init: RouteInit | undefined }[],
}));
vi.mock("@/lib/route-client", () => ({
  callRoute: async (path: RoutePath, init?: RouteInit) => {
    route.calls.push({ path, init });
    return route.answer;
  },
}));

const db = vi.hoisted(() => ({ calls: [] as string[], data: null as unknown }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: async (name: string) => {
      db.calls.push(name);
      return { data: db.data, error: null };
    },
  },
}));

import {
  fetchUiBundle,
  aiTranslate,
  aiTranslateEntities,
  listProviderLanguages,
  serverMessage,
  translationErrorKey,
} from "./translations-service";

function answered(status: number, payload: Record<string, unknown> | null): RouteAnswer {
  return {
    kind: "answered",
    status,
    ok: status >= 200 && status < 300,
    payload,
    error: typeof payload?.error === "string" ? payload.error : null,
    detail: null,
    headers: new Headers(),
    bytes: null,
  };
}

beforeEach(() => {
  route.answer = { kind: "signedOut" };
  route.calls = [];
});

describe("the machine-translation client (Foundations turn 19)", () => {
  it("TRS-1 each reason code maps to its key, and a code never becomes a detail line", () => {
    const table: [string, string][] = [
      ["providerUnavailable", "admin.translations.error.generic"],
      ["providerNoText", "admin.translations.error.generic"],
      ["permission", "admin.translations.error.permission"],
      ["stepUp", "admin.translations.error.stepUp"],
      ["scope", "admin.translations.error.scope"],
      ["baseLocked", "admin.translations.error.baseLocked"],
      ["unknownTarget", "admin.translations.error.generic"],
      ["emptyValue", "admin.translations.error.generic"],
      ["writerFailed", "admin.translations.error.generic"],
    ];
    for (const [code, key] of table) {
      expect(translationErrorKey(new Error(code)), code).toBe(key);
      expect(serverMessage(new Error(code)), code).toBeNull();
    }
    // The route-level words keep their text matches and their detail line.
    expect(translationErrorKey(new Error("not assigned to this language"))).toBe(
      "admin.translations.error.scope",
    );
    expect(serverMessage(new Error("not assigned to this language"))).toBe(
      "not assigned to this language",
    );
    // An inherited member is not a code (own-key rule).
    expect(translationErrorKey(new Error("constructor"))).toBe("admin.translations.error.generic");
    expect(serverMessage(new Error("constructor"))).toBe("constructor");
  });

  it("TRS-6 the press dial's 429 shows admin.translations.ai.rateLimited, with no detail line", async () => {
    route.answer = answered(429, { error: "rateLimited" });
    const failure = await aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] }).catch(
      (error: unknown) => error,
    );
    expect(translationErrorKey(failure)).toBe("admin.translations.ai.rateLimited");
    expect(serverMessage(failure)).toBeNull();
    // An import's own rateLimited refusal keeps its file key.
    expect(translationErrorKey(new Error("rateLimited"))).toBe(
      "admin.translations.error.fileTooMany",
    );
  });

  it("TRS-2 the three non-answered kinds and a refusal throw today's words", async () => {
    const translate = () => aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] });
    route.answer = { kind: "signedOut" };
    await expect(translate()).rejects.toThrow("not signed in");
    await expect(listProviderLanguages()).rejects.toThrow("not signed in");
    route.answer = { kind: "unreachable", reason: "timeout" };
    await expect(translate()).rejects.toThrow("translation request failed (0)");
    await expect(listProviderLanguages()).rejects.toThrow("language list failed (0)");
    route.answer = answered(403, { error: "not assigned to this language" });
    await expect(translate()).rejects.toThrow("not assigned to this language");
    route.answer = answered(502, null);
    await expect(translate()).rejects.toThrow("translation request failed (502)");
    await expect(listProviderLanguages()).rejects.toThrow("language list failed (502)");
    // The calls: POST with the JSON body, GET with none, both signed in.
    expect(route.calls[0]).toEqual({
      path: "/api/translate",
      init: {
        method: "POST",
        json: { scope: "ui", target_lang: "am", items: [{ key: "k", source: "s" }] },
        auth: "required",
      },
    });
    expect(route.calls[1]).toEqual({
      path: "/api/translate",
      init: { method: "GET", auth: "required" },
    });
  });

  it("TRS-3 a 2xx payload is narrowed by its shape, never cast", async () => {
    route.answer = answered(200, {
      done: 2,
      flagged: 1,
      failed: [{ key: "a", reason: "providerNoText" }, { key: 5 }, "x"],
    });
    expect(
      await aiTranslateEntities({
        lang: "am",
        items: [{ key: "category:x", source: "s", type: "category", id: "x", field: "name" }],
      }),
    ).toEqual({ done: 2, flagged: 1, failed: [{ key: "a", reason: "providerNoText" }] });
    route.answer = answered(200, {
      languages: [{ code: "am", name: "Amharic" }, { code: 1 }, null],
    });
    expect(await listProviderLanguages()).toEqual([{ code: "am", name: "Amharic" }]);
  });

  it("RFL-3 a flag read-back the route could not make reads as unknown (null), never 0", async () => {
    route.answer = answered(200, { done: 2, flagged: null, flagRead: "failed", failed: [] });
    expect(await aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] })).toEqual({
      done: 2,
      flagged: null,
      failed: [],
    });
    route.answer = answered(200, { done: 2, failed: [] });
    expect((await aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] })).flagged).toBe(
      null,
    );
    route.answer = answered(200, { done: 2, flagged: 0, failed: [] });
    expect((await aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] })).flagged).toBe(0);
  });
});

describe("the console's bundle read (INC-1023, turn D2)", () => {
  it("TRS-B1 reads get_ui_bundle_parts and joins the parts, written over copied", async () => {
    db.calls = [];
    db.data = { written: { a: "W", s: "W2" }, copied: { a: "C", b: "C2", e: "" } };
    expect(await fetchUiBundle("am")).toEqual({ a: "W", b: "C2", s: "W2" });
    expect(db.calls).toEqual(["get_ui_bundle_parts"]);
  });
});
