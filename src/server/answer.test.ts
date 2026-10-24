import { ReaderError } from "@/lib/reader-failure";
import { describe, expect, it, vi } from "vitest";

import {
  bytes,
  clientError,
  conditional,
  notModified,
  ok,
  plain,
  redirect,
  readFailure,
  serverError,
  verdict,
} from "@/server/answer";

/**
 * Foundations turn 2 (DEC-237) — the two envelopes (ANS-1…ANS-4);
 * Foundations turn 3 — the binary answer (ANS-5).
 */
describe("the route answers (B2)", () => {
  it("ANS-1 ok carries no-store unless a cache is declared", async () => {
    const plain = ok({ a: 1 });
    expect(plain.status).toBe(200);
    expect(plain.headers.get("Cache-Control")).toBe("no-store");
    expect(await plain.json()).toEqual({ a: 1 });
    const cached = ok({ a: 1 }, { cache: "public, max-age=300" });
    expect(cached.headers.get("Cache-Control")).toBe("public, max-age=300");
  });

  it("ANS-6 ok merges headers after its declared cache", async () => {
    const response = ok(
      { a: 1 },
      {
        status: 201,
        cache: "public, max-age=15",
        headers: {
          Vary: "Accept-Encoding",
          "Server-Timing": "db;dur=4",
          "Cache-Control": "private, max-age=5",
        },
      },
    );
    expect(response.status).toBe(201);
    expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    expect(response.headers.get("Server-Timing")).toBe("db;dur=4");
    expect(response.headers.get("Cache-Control")).toBe("private, max-age=5");
    expect(await response.json()).toEqual({ a: 1 });
  });

  it("ANS-7 conditional matches exact and list tags with bodyless 304; misses retain JSON and headers", async () => {
    const etag = '"cat-tree-12"';
    const cache = "public, max-age=15";
    for (const tag of [etag, '"other",  "cat-tree-12" , "third"']) {
      const response = conditional(
        new Request("https://example.test", { headers: { "If-None-Match": tag } }),
        { etag, cache, body: { version: 12 } },
      );
      expect(response.status).toBe(304);
      expect(response.body).toBeNull();
      expect(await response.text()).toBe("");
      expect(response.headers.get("ETag")).toBe(etag);
      expect(response.headers.get("Cache-Control")).toBe(cache);
      expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    }
    for (const tag of ['"other"', 'W/"cat-tree-12"', "*", ""]) {
      const response = conditional(
        new Request("https://example.test", { headers: { "If-None-Match": tag } }),
        { etag, cache, vary: "Accept-Language", body: { version: 12 } },
      );
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ version: 12 });
      expect(response.headers.get("ETag")).toBe(etag);
      expect(response.headers.get("Cache-Control")).toBe(cache);
      expect(response.headers.get("Vary")).toBe("Accept-Language");
    }
    const direct = notModified(etag, cache, "Accept-Language");
    expect(direct.status).toBe(304);
    expect(direct.body).toBeNull();
    expect(direct.headers.get("Vary")).toBe("Accept-Language");
  });

  it("ANS-8 redirect carries its safe Location, status, cache and nosniff and refuses open redirects", () => {
    const response = redirect("/photos/one", {});
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/photos/one");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    const secure = redirect("https://example.test/photo", {
      status: 307,
      cache: "public, max-age=60",
      headers: { Vary: "Accept", Location: "//evil.example" },
    });
    expect(secure.status).toBe(307);
    expect(secure.headers.get("Location")).toBe("https://example.test/photo");
    expect(secure.headers.get("Cache-Control")).toBe("public, max-age=60");
    expect(secure.headers.get("Vary")).toBe("Accept");
    for (const location of [
      "//evil.example",
      "javascript:alert(1)",
      "http://example.test",
      "relative",
      "/\\evil.example",
      "/\n/evil.example",
    ])
      expect(() => redirect(location, {})).toThrow();
  });

  it("ANS-9 plain carries its status, text content type, nosniff and cache", async () => {
    const response = plain("not found", 404);
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.text()).toBe("not found");
    expect(plain("ok", 200, { cache: "public, max-age=60" }).headers.get("Cache-Control")).toBe(
      "public, max-age=60",
    );
  });

  it("ANS-2 verdict's shape: ok false and the refusals, at 200 by default", async () => {
    const response = verdict([{ field: "listingId", reason: "badShape", detail: "invalid_type" }]);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "listingId", reason: "badShape", detail: "invalid_type" }],
    });
  });

  it("ANS-3 clientError's shape and status", async () => {
    const response = clientError("payloadTooLarge", 413, { ceiling: 1024 });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "payloadTooLarge", ceiling: 1024 });
  });

  it("ANS-4 serverError carries an incident id and never the error's message; the log carries the same id", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const response = serverError("/api/test", new Error("secret postgres detail"));
    expect(response.status).toBe(500);
    const body = (await response.json()) as { error: string; incident: string };
    expect(body.error).toBe("server error");
    expect(body.incident).toMatch(/^[0-9a-f-]{36}$/);
    expect(JSON.stringify(body)).not.toContain("secret postgres detail");
    const line = logged.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(line).toContain(body.incident);
    expect(line).toContain("secret postgres detail");
    logged.mockRestore();
  });

  it("ANS-10 readFailure maps typed and raw failures without detail", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      for (const error of [
        new ReaderError({ class: "server", status: 503, message: "database unavailable" }),
        { message: "<!DOCTYPE html>gateway detail", status: 0 },
      ]) {
        const response = readFailure("/api/test", "database read", error);
        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ error: "upstream unavailable" });
      }
      for (const error of [
        new ReaderError({ class: "server", status: 500, message: "secret detail" }),
        new Error("secret detail"),
      ]) {
        const response = readFailure("/api/test", "database read", error);
        expect(response.status).toBe(500);
        const body = await response.json();
        expect(body).toEqual({ error: "server error", incident: expect.stringMatching(/^[0-9a-f-]{36}$/) });
        expect(JSON.stringify(body)).not.toContain("secret detail");
      }
    } finally {
      logged.mockRestore();
    }
  });

  it("ANS-5 bytes carries the body, the content type, no-store, and a given header", async () => {
    const response = bytes(new Uint8Array([1, 2, 3]), "image/png", {
      headers: { "X-Kind": "cutout" },
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/png");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("X-Kind")).toBe("cutout");
    expect([...new Uint8Array(await response.arrayBuffer())]).toEqual([1, 2, 3]);
    const cached = bytes(new Uint8Array([9]).buffer, "image/webp", {
      status: 201,
      headers: { "Cache-Control": "public, max-age=60" },
    });
    expect(cached.status).toBe(201);
    expect(cached.headers.get("Cache-Control")).toBe("public, max-age=60");
  });
});
