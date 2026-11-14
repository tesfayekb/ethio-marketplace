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

const db = vi.hoisted(() => ({
  calls: [] as string[],
  data: null as unknown,
  error: null as unknown,
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: async (name: string) => {
      db.calls.push(name);
      return { data: db.data, error: db.error };
    },
  },
}));

import { StepUpCancelled } from "@/features/auth/mfa/mfa-service";

import {
  approveAllTranslations,
  deleteLanguage,
  fetchUiBundle,
  aiTranslate,
  aiTranslateEntities,
  importTranslations,
  listProviderLanguages,
  RpcShapeError,
  saveTranslation,
  serverMessage,
  syncUiKeys,
  TRANSLATION_REFUSALS,
  translationRefusalKey,
} from "./translations-service";

function answered(status: number, payload: Record<string, unknown> | null): RouteAnswer {
  return {
    kind: "answered",
    status,
    ok: status >= 200 && status < 300,
    payload,
    error: typeof payload?.error === "string" ? payload.error : null,
    detail: typeof payload?.detail === "string" ? payload.detail : null,
    headers: new Headers(),
    bytes: null,
  };
}

beforeEach(() => {
  route.answer = { kind: "signedOut" };
  route.calls = [];
  db.calls = [];
  db.data = null;
  db.error = null;
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
      expect(translationRefusalKey(new Error(code)), code).toBe(key);
      expect(serverMessage(new Error(code)), code).toBeNull();
    }
    // The route's own scope sentence keeps its key; a sentence the family words has no detail line.
    expect(translationRefusalKey(new Error("not assigned to this language"))).toBe(
      "admin.translations.error.scope",
    );
    expect(serverMessage(new Error("not assigned to this language"))).toBeNull();
    // An inherited member is not a code (own-key rule).
    expect(translationRefusalKey(new Error("constructor"))).toBe(
      "admin.translations.error.generic",
    );
    expect(serverMessage(new Error("constructor"))).toBe("constructor");
  });

  it("TRS-6 the press dial's 429 shows admin.translations.ai.rateLimited, with no detail line", async () => {
    route.answer = answered(429, { error: "rateLimited" });
    const failure = await aiTranslate({ lang: "am", items: [{ key: "k", source: "s" }] }).catch(
      (error: unknown) => error,
    );
    expect(translationRefusalKey(failure)).toBe("admin.translations.ai.rateLimited");
    expect(serverMessage(failure)).toBeNull();
    // An import's own rateLimited refusal keeps its file key.
    expect(translationRefusalKey(new Error("rateLimited"))).toBe(
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

describe("the family's doors on codes (DEC-333, F1-3)", () => {
  const coded = (message: string) => ({ code: "P0D01", message, details: null, hint: null });

  it("TRS-7 every code the family's doors raise reads its key through the one reader, with no detail line", () => {
    const table: [string, string][] = [
      ["permissionDenied", "admin.translations.error.permission"],
      ["permissionDenied:language", "admin.translations.error.scope"],
      ["baseLocked", "admin.translations.error.baseLocked"],
      ["translationFlagged", "admin.translations.error.flaggedApprove"],
      ["notFullyApproved", "admin.translations.error.coverage"],
      ["languagePublished", "admin.translations.error.deletePublished"],
      ["baseLanguage", "admin.translations.error.deleteBase"],
      ["catalogEmpty", "admin.translations.error.generic"],
      ["badValue:code", "admin.translations.error.codeInvalid"],
      ["badValue:action", "admin.translations.error.generic"],
      ["badValue:field", "admin.translations.error.generic"],
      ["tooManyRows", "admin.translations.error.fileTooMany"],
      ["rateLimited", "admin.translations.error.fileTooMany"],
      ["stepUpRequired", "admin.translations.error.stepUp"],
      ["badLanguage", "admin.translations.error.generic"],
      ["emptyList", "admin.translations.error.generic"],
      ["nameRequired", "admin.translations.error.generic"],
      ["pseudoLanguage", "admin.translations.error.generic"],
      ["required:value", "admin.translations.error.generic"],
      ["tooLong:context", "admin.translations.error.generic"],
      ["unknownBatch", "admin.translations.error.generic"],
      ["unknownEntity", "admin.translations.error.generic"],
      ["unknownKey", "admin.translations.error.generic"],
      ["unknownTranslation", "admin.translations.error.generic"],
      ["unknownUser", "admin.translations.error.generic"],
    ];
    for (const [message, key] of table) {
      expect(translationRefusalKey(coded(message)), message).toBe(key);
      expect(serverMessage(coded(message)), message).toBeNull();
    }
    // The shell's envelope: the code and its detail from the first refusal.
    const envelope = {
      ok: false,
      code: "P0D01",
      message: "permissionDenied:language",
      refusals: [{ reason: "permissionDenied", detail: "language" }],
    };
    expect(translationRefusalKey(envelope)).toBe("admin.translations.error.scope");
    expect(serverMessage(envelope)).toBeNull();
    // Step-up stays P0009's sentence; a cancelled step-up says nothing.
    expect(translationRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
      "admin.translations.error.stepUp",
    );
    expect(translationRefusalKey(new StepUpCancelled())).toBeNull();
    // A screen extends the family with its own layer's words for a code.
    const flags = {
      ...TRANSLATION_REFUSALS,
      words: { ...TRANSLATION_REFUSALS.words, catalogEmpty: "admin.translations.syncFirstTooltip" },
    } as const;
    expect(translationRefusalKey(coded("catalogEmpty"), flags)).toBe(
      "admin.translations.syncFirstTooltip",
    );
    expect(translationRefusalKey(coded("permissionDenied:language"), flags)).toBe(
      "admin.translations.error.scope",
    );
  });

  it("TRS-8 a failure the reader does not know is the generic key and keeps its own text beneath", () => {
    const failure = new Error("Failed to fetch");
    expect(translationRefusalKey(failure)).toBe("admin.translations.error.generic");
    expect(serverMessage(failure)).toBe("Failed to fetch");
    expect(serverMessage(new Error("  "))).toBeNull();
  });

  it("TRS-9 the import route's code keeps its detail: a translator outside the language reads the scope line", async () => {
    route.answer = answered(403, { error: "permissionDenied", detail: "language" });
    const failure = await importTranslations({ lang: "am", text: "x" }).catch((e: unknown) => e);
    expect(translationRefusalKey(failure)).toBe("admin.translations.error.scope");
    route.answer = answered(400, { error: "wrongFile", detail: "categories" });
    const shape = await importTranslations({ lang: "am", text: "x" }).catch((e: unknown) => e);
    expect(translationRefusalKey(shape)).toBe("admin.translations.error.fileShape");
    expect(serverMessage(shape)).toBeNull();
  });

  it("TRS-10 each door's answer passes its shape guard, or the call fails: never a count or a success assumed", async () => {
    db.data = { ok: true };
    await expect(saveTranslation({ key: "k", lang: "am", value: "v" })).resolves.toBeUndefined();
    for (const data of [null, {}, { ok: false }, { ok: "true" }]) {
      db.data = data;
      await expect(saveTranslation({ key: "k", lang: "am", value: "v" })).rejects.toBeInstanceOf(
        RpcShapeError,
      );
    }
    db.data = { approved: 3, skipped_flagged: "1" };
    expect(await approveAllTranslations("am")).toEqual({ approved: 3, skippedFlagged: 1 });
    db.data = { approved: 3 };
    await expect(approveAllTranslations("am")).rejects.toBeInstanceOf(RpcShapeError);
    db.data = { keys_added: 2, am_seeded: 1, languages: 4, en_upserted: 9 };
    expect(await syncUiKeys({ en: {}, am: {} })).toEqual({ inserted: 2, seeded: 1, languages: 4 });
    db.data = { en_upserted: 9 };
    await expect(syncUiKeys({ en: {}, am: {} })).rejects.toBeInstanceOf(RpcShapeError);
    db.data = { code: "zz", assignments: 1, ui_rows: 2, entity_rows: 0, revisions: 5 };
    expect(await deleteLanguage("zz")).toEqual({
      assignments: 1,
      uiRows: 2,
      entityRows: 0,
      revisions: 5,
    });
    db.data = { code: "zz" };
    await expect(deleteLanguage("zz")).rejects.toBeInstanceOf(RpcShapeError);
    route.answer = answered(200, {
      imported: 1,
      flagged: 0,
      unchanged: 2,
      skipped: 0,
      batch_id: null,
    });
    expect(await importTranslations({ lang: "am", text: "x" })).toEqual({
      imported: 1,
      flagged: 0,
      unchanged: 2,
      skipped: 0,
      batchId: null,
    });
    route.answer = answered(200, { imported: 1 });
    await expect(importTranslations({ lang: "am", text: "x" })).rejects.toBeInstanceOf(
      RpcShapeError,
    );
  });

  it("TRS-11 a door's refusal is thrown as it came, for the reader", async () => {
    db.error = coded("translationFlagged");
    const failure = await saveTranslation({ key: "k", lang: "am", value: "v" }).catch(
      (e: unknown) => e,
    );
    expect(failure).toBe(db.error);
    expect(translationRefusalKey(failure)).toBe("admin.translations.error.flaggedApprove");
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
